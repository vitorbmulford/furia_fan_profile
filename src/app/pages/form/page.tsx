"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { createWorker } from 'tesseract.js';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cpf } from 'cpf-cnpj-validator';

const FormPage = () => {
    const { data: session } = useSession();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [cpfValue, setCpfValue] = useState('');
    const [interests, setInterests] = useState('');
    const [socialLinks, setSocialLinks] = useState<string>('');
    const [document, setDocument] = useState<File | null>(null);
    const [documentPreview, setDocumentPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [ocrProgress, setOcrProgress] = useState(0);

    useEffect(() => {
        if (session?.user && name === '') {
            setName(session.user.name || '');
        }
    }, [session, name]);

    const formatCpf = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 11) {
            return numericValue
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1');
        }
        return value;
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatCpf(e.target.value);
        setCpfValue(formattedValue);
    };

    const handleSocialLinks = (value: string) => {
        setSocialLinks(value.split(',').map(link => link.trim()).join(','));
    };

    const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setDocument(file);

            const reader = new FileReader();
            reader.onload = (event) => {
                setDocumentPreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const isNameInText = useCallback((userName: string, ocrText: string): boolean => {
        console.log("Verificando nome...");
        const normalize = (str: string) =>
            str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

        const normalizedUserName = normalize(userName);
        const normalizedText = normalize(ocrText);

        console.log("Nome normalizado:", normalizedUserName);
        console.log("Texto OCR normalizado:", normalizedText);

        const nameParts = normalizedUserName.split(' ').filter(p => p.length >= 3);
        const textWords = normalizedText.split(/\s+/);

        const blockedNames = ['teste', 'admin', 'nome', 'usuario', 'exemplo', 'faker', 'user'];

        if (blockedNames.some(bad => normalizedUserName.includes(bad))) {
            toast.error("Nome inválido detectado");
            return false;
        }

        if (nameParts.length < 2) {
            toast.error("Por favor, insira seu nome completo");
            return false;
        }

        let matches = 0;
        for (const part of nameParts) {
            if (textWords.some(word => word.includes(part))) {
                matches++;
            }
        }

        if (matches < Math.min(2, nameParts.length)) {
            toast.error(`Documento não contém nome completo. Encontrado: ${matches} de ${Math.min(2, nameParts.length)} partes necessárias.`);
            return false;
        }

        if (!normalizedUserName || normalizedUserName.length < 3) {
            console.log("Nome inválido ou muito curto detectado:", normalizedUserName);
            toast.error("Nome inválido ou muito curto.");
            return false;
        }

        return true;
    }, []);

    const validateDocument = async (documentUrl: string, userName: string) => {
        console.log("Validando documento para o nome:", userName);
        const worker = await createWorker({
            logger: ({ progress }) => {
                setOcrProgress(Math.round(progress * 100));
            }
        });

        try {
            await worker.loadLanguage('por+eng');
            await worker.initialize('por+eng');

            const { data: { text } } = await worker.recognize(documentUrl);
            return isNameInText(userName, text);
        } catch (error) {
            toast.warning("Falha no OCR local, tentando serviço externo...");
            console.error("Erro no OCR local:", error);
            try {
                const response = await fetch(
                    `https://api.ocr.space/parse/imageurl?apikey=${process.env.NEXT_PUBLIC_OCR_API_KEY}&url=${encodeURIComponent(documentUrl)}`
                );
                const data = await response.json();

                const ocrText = data.ParsedResults?.[0]?.ParsedText || '';
                return isNameInText(userName, ocrText);
            } catch (fallbackError) {
                toast.error("Falha ao ler o documento. Por favor, envie uma imagem mais legível.");
                console.error("Erro no serviço OCR externo:", fallbackError);
                return false;
            }
        } finally {
            await worker.terminate();
            setOcrProgress(0);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!document) {
            toast.error("Documento não selecionado.");
            return;
        }

        if (!name || !address || !cpfValue || !interests || !socialLinks) {
            toast.error("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (!cpf.isValid(cpfValue)) {
            toast.error("CPF inválido.");
            return;
        }

        if (name.trim().length < 3) {
            toast.error("Nome muito curto.");
            return;
        }

        setLoading(true);
        setUploadProgress(0);

        try {
            toast.info("Enviando documento...");

            const formData = new FormData();
            formData.append('file', document);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'furiafan');

            const xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 90);
                    setUploadProgress(percent);
                }
            });

            const documentUrl: string = await new Promise((resolve, reject) => {
                xhr.open('POST', `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`);
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        resolve(response.secure_url);
                    } else {
                        reject(new Error('Erro ao fazer upload do documento'));
                    }
                };
                xhr.onerror = () => reject(new Error('Erro de rede'));
                xhr.send(formData);
            });

            setUploadProgress(90);

            toast.info("Validando documento...");
            const isValid = await validateDocument(documentUrl, name);
            if (!isValid) {
                toast.error("O nome no documento não corresponde ao nome informado.");
                setLoading(false);
                setUploadProgress(0);
                setOcrProgress(0);
                return;
            }

            toast.info("Salvando dados...");
            setUploadProgress(95);

            const apiResponse = await fetch('/api/fans', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    address,
                    cpf: cpfValue.replace(/\D/g, ''),
                    interests,
                    socialLinks,
                    validation: true,
                    documentUrl,
                    email: session?.user?.email || null,
                    createdAt: new Date().toISOString()
                })
            });

            if (!apiResponse.ok) {
                throw new Error(await apiResponse.text());
            }

            setUploadProgress(100);
            toast.success("Perfil criado com sucesso!");

            setAddress('');
            setCpfValue('');
            setInterests('');
            setSocialLinks('');
            setDocument(null);
            setDocumentPreview(null);

        } catch (error) {
            console.error("Erro:", error);
            toast.error(`Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-start bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-12">
            <div className="w-full max-w-3xl p-6 sm:p-8 bg-gray-900 rounded-xl shadow-xl mt-16 mx-4 sm:mx-8">
                <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-8">
                    Crie seu perfil de fã da FURIA
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
                        <div className="md:w-1/2 space-y-2">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Seu nome completo"
                                className="bg-gray-800 text-white placeholder-gray-400"
                                minLength={3}
                                required
                            />
                        </div>

                        <div className="md:w-1/2 space-y-2">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input
                                id="cpf"
                                type="text"
                                value={cpfValue}
                                onChange={handleCpfChange}
                                placeholder="000.000.000-00"
                                className="bg-gray-800 text-white placeholder-gray-400"
                                maxLength={14}
                                required
                            />
                            {cpfValue && !cpf.isValid(cpfValue) && (
                                <p className="text-red-400 text-sm">CPF inválido</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
                        <div className="md:w-1/2 space-y-2">
                            <Label htmlFor="address">Endereço</Label>
                            <Input
                                id="address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Seu endereço completo"
                                className="bg-gray-800 text-white placeholder-gray-400"
                                required
                            />
                        </div>

                        <div className="md:w-1/2 space-y-2">
                            <Label htmlFor="interests">Interesses em eSports</Label>
                            <Input
                                id="interests"
                                type="text"
                                value={interests}
                                onChange={(e) => setInterests(e.target.value)}
                                placeholder="Ex: CS:GO, LoL, Dota 2"
                                className="bg-gray-800 text-white placeholder-gray-400"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="socialLinks">Links de Redes Sociais</Label>
                        <Input
                            id="socialLinks"
                            type="text"
                            value={socialLinks}
                            onChange={(e) => handleSocialLinks(e.target.value)}
                            placeholder="Ex: instagram.com/seuuser, twitter.com/seuuser"
                            className="bg-gray-800 text-white placeholder-gray-400"
                            required
                        />
                        <p className="text-gray-400 text-sm">Separe múltiplos links com vírgula</p>
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="document">Documento de Identificação</Label>
                        <Input
                            id="document"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleDocumentChange}
                            className="bg-gray-800 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                            required
                        />
                        {documentPreview && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-300 mb-1">Pré-visualização:</p>
                                <img
                                    src={documentPreview}
                                    alt="Preview do documento"
                                    className="max-h-60 rounded-md border border-gray-700"
                                />
                            </div>
                        )}
                    </div>

                    {(uploadProgress > 0 || ocrProgress > 0) && (
                        <div className="space-y-2">
                            {uploadProgress > 0 && (
                                <div>
                                    <Label>Progresso do upload: {uploadProgress}%</Label>
                                    <Progress value={uploadProgress} className="h-2" />
                                </div>
                            )}
                            {ocrProgress > 0 && (
                                <div>
                                    <Label>Processamento do documento: {ocrProgress}%</Label>
                                    <Progress value={ocrProgress} className="h-2" />
                                </div>
                            )}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 py-6 text-lg font-semibold"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processando...
                            </span>
                        ) : 'Criar Perfil'}
                    </Button>

                    {session ? (
                        <Button
                            onClick={() => signOut()}
                            variant="destructive"
                            className="mt-4 w-full py-6 text-lg font-semibold"
                        >
                            Sair da Conta
                        </Button>
                    ) : (
                        <Button
                            onClick={() => signIn("google")}
                            variant="outline"
                            className="mt-4 w-full py-6 text-lg font-semibold bg-white text-gray-900 hover:bg-gray-200"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="M12.3 7.4L12 7.1C11.4 7.1 10.8 7.3 10.3 7.6L9.3 8.5L9.1 9.4C9.1 9.9 9.3 10.3 9.6 10.6L9.9 11C10.4 11.5 11.2 11.6 11.7 11.3C12.1 11 12.2 10.4 11.9 10.1L10.7 9.5C11.1 8.8 11.7 8.6 12.3 8.8C12.9 9 13.2 9.5 13.2 10.1C13.2 10.5 13 11 12.7 11.3C12.4 11.5 12 11.6 11.6 11.6C11.2 11.6 10.8 11.4 10.6 11.1C10.5 11 10.3 10.8 10.1 10.7L10.3 10.4C10.6 10.3 11.1 10.1 11.4 9.8C11.7 9.5 12 9.2 12.2 8.9C12.4 8.6 12.6 8.2 12.7 7.9C12.8 7.7 13 7.5 13.2 7.2C13.3 7 13.2 6.7 12.9 6.6C12.6 6.5 12.4 6.5 12.3 7.4Z"></path>
                            </svg>
                            Entrar com Google
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default FormPage;

"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { createWorker } from 'tesseract.js';

const FormPage = () => {
    const { data: session } = useSession();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [cpf, setCpf] = useState('');
    const [interests, setInterests] = useState('');
    const [socialLinks, setSocialLinks] = useState<string>('');
    const [document, setDocument] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.user && name === '') {
            setName(session.user.name || '');
        }
    }, [session, name]);

    const handleSocialLinks = (value: string) => {
        setSocialLinks(value.split(',').map(link => link.trim()).join(','));
    };

    function isNameInText(userName: string, ocrText: string): boolean {
        const normalize = (str: string) =>
            str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

        const normalizedUserName = normalize(userName);
        const normalizedText = normalize(ocrText);

        const nameParts = normalizedUserName.split(' ').filter(p => p.length >= 3);
        const textWords = normalizedText.split(/\s+/);

        const blockedNames = ['teste', 'admin', 'nome', 'usuario', 'exemplo'];

        if (blockedNames.some(bad => normalizedUserName.includes(bad))) return false;

        if (nameParts.length < 2) return false;

        let matches = 0;
        for (const part of nameParts) {
            if (textWords.includes(part)) {
                matches++;
            }
        }

        return matches >= 2;
    }


    const validateDocument = async (documentUrl: string, userName: string) => {
        const worker = await createWorker({
            logger: ({ progress, status }) => {
                console.log(`Progresso: ${Math.round(progress * 100)}% - ${status}`);
            }
        });

        try {
            await worker.loadLanguage('por');
            await worker.initialize('por');

            const { data: { text } } = await worker.recognize(documentUrl);

            return isNameInText(userName, text);

        } catch (error) {
            console.error('Erro no OCR:', error);

            try {
                const response = await fetch(
                    `https://api.ocr.space/parse/imageurl?apikey=helloworld&url=${encodeURIComponent(documentUrl)}`
                );
                const data = await response.json();
                const ocrText = data.ParsedResults[0]?.ParsedText || '';
                return isNameInText(userName, ocrText);
            } catch (fallbackError) {
                console.error('Erro no fallback OCR:', fallbackError);
                return false;
            }

        } finally {
            await worker.terminate();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (name.trim().length < 3) {
            alert("Nome muito curto para validação.");
            setLoading(false);
            return;
        }

        if (!name || !address || !cpf || !interests || !socialLinks || !document) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            setLoading(false);
            return;
        }

        try {
            let documentUrl = "";
            let isValid = true;

            console.log('Documento detectado. Iniciando upload...', {
                nomeArquivo: document.name,
                tipo: document.type,
                tamanho: document.size
            });

            const formData = new FormData();
            formData.append('file', document);
            formData.append('upload_preset', 'furiafan');

            const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
            const response = await fetch(cloudinaryUrl, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Cloudinary error: ${errorData.error.message || 'Erro desconhecido'}`);
            }

            const data = await response.json();
            documentUrl = data.secure_url;

            isValid = await validateDocument(documentUrl, name);
            if (!isValid) {
                alert("O nome no documento não corresponde ao nome do usuário.");
                return;
            }

            console.log('Preparando dados para API local:', {
                name,
                address,
                cpf,
                interests,
                socialLinks,
                validation: isValid,
                documentUrl,
                email: session?.user?.email || null,
                createdAt: new Date().toISOString()
            });

            const apiResponse = await fetch('/api/fans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    address,
                    cpf,
                    interests,
                    socialLinks,
                    validation: isValid,
                    documentUrl,
                    email: session?.user?.email || null,
                    createdAt: new Date().toISOString()
                })
            });

            if (!apiResponse.ok) {
                throw new Error('Falha ao salvar os dados');
            }

            const responseData = await apiResponse.json();
            console.log('Dados salvos com sucesso:', responseData);
            alert("Perfil criado com sucesso!");

            setAddress('');
            setCpf('');
            setInterests('');
            setSocialLinks('');
            setDocument(null);

        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            alert(`Erro ao enviar dados: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex justify-center items-start bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-12">
            <div className="w-full max-w-lg sm:max-w-md md:max-w-lg p-6 sm:p-8 bg-gray-900 rounded-xl shadow-xl mt-16 mx-4 sm:mx-8">
                <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-8">
                    Crie seu perfil de fã da FURIA
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome Completo</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu nome completo"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-300">Endereço</label>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Seu endereço"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-300">CPF</label>
                        <input
                            id="cpf"
                            type="text"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="Seu CPF"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="interests" className="block text-sm font-medium text-gray-300">Interesses em eSports</label>
                        <input
                            id="interests"
                            type="text"
                            value={interests}
                            onChange={(e) => setInterests(e.target.value)}
                            placeholder="Ex: CS:GO, LoL, Dota 2"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="socialLinks" className="block text-sm font-medium text-gray-300">Links de Redes Sociais</label>
                        <input
                            id="socialLinks"
                            type="text"
                            value={socialLinks}
                            onChange={(e) => handleSocialLinks(e.target.value)}
                            placeholder="Ex: Instagram, Twitter, Facebook"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="document" className="block text-sm font-medium text-gray-300">Upload de Documento (Ex: Identidade)</label>
                        <input
                            id="document"
                            type="file"
                            onChange={(e) => setDocument(e.target.files ? e.target.files[0] : null)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                    </div>


                    {/* <div className="space-y-2">
                        <label htmlFor="validation" className="block text-sm font-medium text-gray-300">Validação de Identidade (AI)</label>
                        <input
                            id="validation"
                            type="text"
                            value={validation}
                            onChange={(e) => setValidation(e.target.value)}
                            placeholder="Código de validação ou ID"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                    </div> */}

                    <Button type="submit" disabled={loading} className="w-full mt-4">
                        {loading ? 'Enviando...' : 'Criar Perfil'}
                    </Button>
                    {session ? (
                        <Button
                            onClick={() => signOut()}
                            className="mt-4 w-full px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            Sair
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={() => signIn("google")}
                                className="mt-4 w-full px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                Entrar com Google
                            </Button>
                            {/* <Button
                                onClick={() => signIn("twitter")} 
                                className="mt-4 w-full px-6 py-3 bg-blue-700 text-white rounded-lg shadow-lg hover:bg-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                Entrar com X
                            </Button> */}
                        </>
                    )}
                    <Button type="button" onClick={() => signOut()} className="w-full mt-4">
                        Sair
                    </Button>

                </form>
            </div>
        </div>
    );
};

export default FormPage;



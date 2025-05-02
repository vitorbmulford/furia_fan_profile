"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FormPage = () => {
    const { data: session, status } = useSession();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [cpf, setCpf] = useState('');
    const [interests, setInterests] = useState('');
    const [socialLinks, setSocialLinks] = useState('');
    const [document, setDocument] = useState<File | null>(null);
    const [validation, setValidation] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.user && name === '') {
            setName(session.user.name || '');
        }
    }, [session, name]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !address || !cpf || !interests || !socialLinks || !validation) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        setLoading(true);

        try {
            let documentUrl = "";

            if (document) {
                const storageRef = ref(storage, `documents/${cpf}-${document.name}`);

                const snapshot = await uploadBytes(storageRef, document);

                documentUrl = await getDownloadURL(snapshot.ref);
            }

            await addDoc(collection(db, "fans"), {
                name,
                address,
                cpf,
                interests,
                socialLinks,
                validation,
                documentUrl,
                email: session?.user?.email || null,
                createdAt: new Date()
            });

            alert("Perfil criado com sucesso!");
            setAddress('');
            setCpf('');
            setInterests('');
            setSocialLinks('');
            setDocument(null);
            setValidation('');
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            alert("Erro ao enviar dados. Tente novamente.");
        }

        setLoading(false);
    };

    if (status === "loading") {
        return <p>Carregando...</p>;
    }

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
                            onChange={(e) => setSocialLinks(e.target.value)}
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

                    <div className="space-y-2">
                        <label htmlFor="validation" className="block text-sm font-medium text-gray-300">Validação de Identidade (AI)</label>
                        <input
                            id="validation"
                            type="text"
                            value={validation}
                            onChange={(e) => setValidation(e.target.value)}
                            placeholder="Código de validação ou ID"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 mt-6 ${loading
                            ? "bg-gray-700 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                            } text-white rounded-lg text-lg transition duration-200`}
                        disabled={loading}
                    >
                        {loading ? "Enviando..." : "Enviar"}
                    </button>
                </form>

                {session ? (
                    <Button onClick={() => signOut()} className="mt-4 w-full">
                        Sair
                    </Button>
                ) : (
                    <Button onClick={() => signIn("google")} className="mt-4 w-full">
                        Entrar com Google
                    </Button>
                )}
            </div>
        </div>
    );
};

export default FormPage;

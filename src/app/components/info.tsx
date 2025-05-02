'use client'

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "../components/icons";

const techFeatures = [
    {
        name: "Coleta & Validação de Dados",
        description: "Formulário completo com validação client/server e armazenamento seguro por usuário.",
        icon: Icons.form,
        items: [
            "Nome, CPF, endereço, interesses",
            "Eventos e produtos relacionados à FURIA",
            "Validação com Zod no frontend e backend",
            "Autenticação com Firebase Auth",
            "Armazenamento no Firebase Firestore"
        ],
    },
    {
        name: "Upload de Documentos + IA",
        description: "Documentos processados com OCR e validados com inteligência artificial.",
        icon: Icons.upload,
        items: [
            "Suporte a imagens e PDFs (RG, CNH, comprovantes)",
            "Upload seguro via Firebase Storage",
            "OCR com Google Cloud Vision API",
            "Validação semântica via Mistral 7B Instruct",
            "Extração de dados automatizada"
        ],
    },
    {
        name: "Engajamento e Redes",
        description: "Interações em redes sociais e perfis eSports analisados por IA para medir o fanatismo.",
        icon: Icons.activity,
        items: [
            "Links para Twitter, Instagram, etc.",
            "Leitura de postagens sobre eSports",
            "Análise do engajamento com a FURIA",
            "Perfis HLTV, Faceit, Liquipedia",
            "Classificação automática do perfil do fã"
        ],
    },
];

export default function Info() {
    return (
        <section id="architecture" className="py-24 px-6 bg-[#10194a] text-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-furia-blue-400 text-sm font-semibold uppercase mb-2 tracking-widest">
                        FURIA Fan Profiler
                    </h2>
                    <h3 className="text-3xl sm:text-5xl font-bold mb-4">
                        Reconhecimento de fãs com <span className="bg-gradient-to-r from-furia-blue-400 to-furia-red-500 bg-clip-text text-transparent">tecnologia</span>
                    </h3>
                    <p className="max-w-2xl mx-auto text-white">
                        Coleta, validação e análise de fãs da FURIA com IA, integração social e arquitetura moderna.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-[#0e1538] border-furia-blue-400/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-xl font-semibold text-white">
                                        <Icons.form className="w-5 h-5 text-furia-blue-400 mr-2" />
                                        Coleta & Validação
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-white mb-4">
                                        Formulário validado e sincronizado com Firebase para registrar o perfil do fã.
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {techFeatures[0].items.map((item, index) => (
                                            <div key={index} className="flex items-start p-3 bg-[#1e293b]/40 rounded-lg">
                                                <Icons.check className="h-4 w-4 mt-0.5 text-furia-blue-400 mr-2" />
                                                <span className="text-sm text-white">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="mt-8"
                        >
                            <Card className="bg-[#0e1538] border-furia-blue-400/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-xl font-semibold text-white">
                                        <Icons.activity className="w-5 h-5 text-furia-blue-400 mr-2" />
                                        Engajamento & Análise
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-white mb-4">
                                        IA avalia o envolvimento real do fã no cenário competitivo e nas redes sociais.
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 text-furia-blue-400">
                                        {techFeatures[2].items.map((item, index) => (
                                            <div key={index} className="flex items-start p-3 bg-[#1e293b]/40 rounded-lg">
                                                <Icons.check className="h-4 w-4 mt-0.5 text-furia-red-400 mr-2 flex-shrink-0" />
                                                <span className="text-sm text-white">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-[#0e1538] border-furia-blue-400/20 h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-xl font-semibold text-white">
                                        <Icons.upload className="w-5 h-5 text-furia-blue-400 mr-2" />
                                        Upload de Documentos + IA
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-white mb-4">
                                        Documentos processados por OCR e IA para validação de identidade e extração de dados.
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {techFeatures[1].items.map((item, index) => (
                                            <div key={index} className="flex items-start p-3 bg-[#1e293b]/40 rounded-lg">
                                                <Icons.check className="h-4 w-4 mt-0.5 text-furia-blue-400 mr-2" />
                                                <span className="text-sm text-white">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

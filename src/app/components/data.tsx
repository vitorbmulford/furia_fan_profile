'use client'

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "../components/icons";

const dataStructures = [
    {
        name: "Coleta de Dados Básicos",
        items: [
            "Nome, Endereço, CPF",
            "Interesses em eSports e Eventos",
            "Produtos comprados",
            "Formulários validados (client e server)",
            "Armazenamento no Json server",
        ],
    },
    {
        name: "Upload de Documentos",
        items: [
            "Documentos (RG, CNH, Comprovante de Endereço)",
            "Armazenamento seguro no Json server",
            "Vinculação automática ao perfil do usuário"
        ],
    },
    {
        name: "Validação com IA (Identidade)",
        items: [
            "Processamento de documentos com tesseract.js",
            "Análise de coerência dos documentos"
        ],
    },
    {
        name: "Integração com Redes Sociais",
        items: [
            "Links de redes sociais (Twitter, Instagram, etc.)",
            "Armazenamento no JSON server",
            "Análise do engajamento com eSports e FURIA"
        ],
    },
    {
        name: "Validação de Perfis em eSports",
        items: [
            "Perfis em HLTV, Faceit, Liquipedia, etc.",
            "Análise de relevância no universo competitivo",
            "Validação via IA"
        ],
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Data() {
    return (
        <section id="data" className="py-24 px-6 bg-[#0a0f2e]">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-furia-red-400 text-sm font-semibold uppercase mb-2 tracking-widest">
                        Estrutura de Dados
                    </h2>
                    <h3 className="text-3xl sm:text-5xl font-bold mb-4">
                        Organização <span className="bg-gradient-to-r from-furia-red-500 to-furia-blue-400 bg-clip-text text-transparent">eficiente</span>
                    </h3>
                    <p className="max-w-2xl mx-auto text-gray-300">
                        Modelagem de dados otimizada para todas as modalidades e interações dos fãs.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-6"
                >
                    {dataStructures.map((structure, index) => (
                        <motion.div
                            key={structure.name}
                            variants={item}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="bg-[#10194a] border-furia-blue-400/20 h-full text-furia-blue-400">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-furia-blue-400">
                                        {structure.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {structure.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start">
                                                <Icons.chevronRight className="h-5 w-5 text-furia-red-400 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-gray-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {index === 0 && (
                                        <div className="mt-6 p-3 bg-[#1e283b]/60 rounded-lg text-xs text-gray-400">
                                            <div className="font-mono">Dados de Fã: {"{"}</div>
                                            <div className="font-mono ml-4">nome: string,</div>
                                            <div className="font-mono ml-4">endereco: string,</div>
                                            <div className="font-mono ml-4">cpf: string,</div>
                                            <div className="font-mono ml-4">interesses: string[],</div>
                                            <div className="font-mono ml-4">produtos_comprados: string[],</div>
                                            <div className="font-mono">{"}"}</div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

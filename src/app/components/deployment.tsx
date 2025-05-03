'use client'

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "../components/icons";

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

export default function Deployment() {
    return (
        <section className="py-24 px-6 bg-gradient-to-b from-[#0a0f2e] via-[#10194a] to-[#0a0f2e]">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-furia-blue-400 text-sm font-semibold uppercase mb-2 tracking-widest">
                        Implantação
                    </h2>
                    <h3 className="text-3xl sm:text-5xl font-bold mb-4">
                        Infraestrutura <span className="bg-gradient-to-r from-furia-blue-400 to-furia-red-500 bg-clip-text text-transparent">confiável</span>
                    </h3>
                    <p className="max-w-2xl mx-auto text-gray-300">
                        Arquitetura escalável e segura para oferecer uma experiência única para os fãs da FURIA.
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 gap-8"
                >
                    <motion.div variants={item}>
                        <Card className="bg-[#0e1538] border-furia-blue-400/20 h-full">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-furia-red-300 flex items-center text-furia-blue-400">
                                    <Icons.database className="h-6 w-6 mr-2" />
                                    Front-end
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <Icons.check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="text-sm font-medium text-white">Next.js 15</span>
                                            <p className="text-xs text-gray-400">Edge Network global para performance e escalabilidade</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <Icons.check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="text-sm font-medium text-white">CI/CD com GitHub Actions</span>
                                            <p className="text-xs text-gray-400">Deploys automáticos e integrados</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <Icons.check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="text-sm font-medium text-white">Proteção com Firebase Auth</span>
                                            <p className="text-xs text-gray-400">Autenticação segura e escalável para usuários</p>
                                        </div>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={item}>
                        <Card className="bg-[#0e1538] border-furia-blue-400/20 h-full">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-furia-red-300 flex items-center text-furia-blue-400 ">
                                    <Icons.database className="h-6 w-6 mr-2 " />
                                    Backend & Banco de Dados
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <Icons.check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="text-sm font-medium text-white">API Routes</span>
                                            <p className="text-xs text-gray-400">Infraestrutura serverless, escalável sob demanda</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <Icons.check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="text-sm font-medium text-white">Json server </span>
                                            <p className="text-xs text-gray-400">Banco de dados em tempo real, fácil de escalar</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <Icons.check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <span className="text-sm font-medium text-white">Tesseract</span>
                                            <p className="text-xs text-gray-400">OCR para validação de documentos enviados</p>
                                        </div>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>


            </div>
        </section>
    );
}

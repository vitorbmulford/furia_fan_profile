'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "../components/icons";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 py-24 bg-gradient-to-b from-[#0a0f2e] via-[#10194a] to-[#0a0f2e]">
            <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] bg-repeat opacity-30"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex flex-col items-center space-y-10"
            >
                <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight">
                    <span className="bg-gradient-to-r from-furia-blue-400 to-furia-red-500 bg-clip-text text-transparent">
                        FURIA
                    </span>{" "}
                    Fan Profiler
                </h1>

                <p className="max-w-2xl text-lg text-gray-300 mx-auto">
                    Plataforma desenvolvida para identificar, validar e entender o verdadeiro fã da FURIA usando IA, OCR e dados comportamentais.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto text-gray-200 text-sm">
                    <div className="flex flex-col items-center space-y-3">
                        <Icons.brain className="h-8 w-8 text-furia-blue-400" />
                        <div className="font-semibold">IA Validativa</div>
                        <span className="text-xs text-gray-400 text-center">Análise e extração de dados de documentos reais</span>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                        <Icons.server className="h-8 w-8 text-furia-red-400" />
                        <div className="font-semibold">Integração Social</div>
                        <span className="text-xs text-gray-400 text-center">Leitura de redes e perfis em plataformas de eSports</span>
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                        <Icons.file className="h-8 w-8 text-furia-blue-300" />
                        <div className="font-semibold">Coleta Segura</div>
                        <span className="text-xs text-gray-400 text-center">Formulários validados e documentos armazenados com segurança</span>
                    </div>
                </div>

                <div className="mt-12 flex gap-4 justify-center">
                    <Button asChild className="bg-gradient-to-r from-furia-blue-500 to-furia-blue-600 hover:from-furia-blue-600 hover:to-furia-blue-700 text-white px-8 py-4 rounded-xl text-md shadow-lg hover:shadow-furia-blue-500/30 transition-all">
                        <Link href="#features">Ver Funcionalidades</Link>
                    </Button>
                </div>

                <Link href="#architecture" className="flex flex-col items-center gap-2 mt-24 animate-bounce">
                    <span className="text-white text-sm">Conheça o projeto</span>
                    <Icons.chevronDown className="h-8 w-8 text-blue-500" />
                </Link>
            </motion.div>
        </section>
    );
}

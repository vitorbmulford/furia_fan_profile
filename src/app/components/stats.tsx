'use client'

import { motion } from "framer-motion";

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

export default function Stats() {
    return (
        <section className="py-16 bg-[#0e1538]">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    <motion.div variants={item} className="bg-[#1e293b]/40 p-6 rounded-xl border border-furia-blue-400/20 text-center">
                        <div className="text-3xl font-bold text-furia-blue-400 mb-2">10x</div>
                        <div className="text-sm text-gray-300">Mais engajamento com eSports</div>
                    </motion.div>
                    <motion.div variants={item} className="bg-[#1e293b]/40 p-6 rounded-xl border border-furia-red-400/20 text-center">
                        <div className="text-3xl font-bold text-furia-red-400 mb-2">5</div>
                        <div className="text-sm text-gray-300">Modalidades de eSports com FURIA</div>
                    </motion.div>
                    <motion.div variants={item} className="bg-[#1e293b]/40 p-6 rounded-xl border border-furia-blue-400/20 text-center">
                        <div className="text-3xl font-bold text-furia-blue-400 mb-2">100%</div>
                        <div className="text-sm text-gray-300">Integração com as redes sociais</div>
                    </motion.div>
                    <motion.div variants={item} className="bg-[#1e293b]/40 p-6 rounded-xl border border-furia-red-400/20 text-center">
                        <div className="text-3xl font-bold text-furia-red-400 mb-2">AI</div>
                        <div className="text-sm text-gray-300">Experiência personalizada com IA</div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

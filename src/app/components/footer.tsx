"use client";
import { Twitter, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#0a0e23] border-t border-blue-500/30 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <span className="text-3xl font-barlow-condensed font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                            FURIA HUB
                        </span>
                    </div>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link
                            href="https://x.com/FURIA?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                            className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                        >
                            <Twitter className="w-6 h-6" />
                        </Link>
                        <Link
                            href="https://www.instagram.com/furiagg/?hl=pt-br"
                            className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                        >
                            <Instagram className="w-6 h-6" />
                        </Link>
                        <Link
                            href="https://www.youtube.com/channel/UCE4elIT7DqDv545IA71feHg"
                            className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                        >
                            <Youtube className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} FURIA Esports. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
}

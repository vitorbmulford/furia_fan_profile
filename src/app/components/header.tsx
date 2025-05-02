"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

const baseNavItems = [
    { label: "Início", href: "/" },
];

export default function Header() {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        getSession()
            .then((sess) => setSession(sess))
            .finally(() => setIsLoading(false));
    }, []);

    const navItems = [
        ...baseNavItems,
        session ? { label: "form", href: "/pages/form" } : { label: "Form", href: "/pages/form" },
    ];

    const formatName = (fullName: string) => {
        const names = fullName.split(" ");
        if (names.length <= 2) return fullName;
        return `${names[0]} ${names[names.length - 1]}`;
    };

    if (isLoading) {
        return (
            <header className="sticky top-0 z-50 bg-[#0a0e23]/95 backdrop-blur-lg border-b border-[#0a0e23]/30 shadow-lg shadow-blue-400/5">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-3 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-4"></Link>

                    <Button
                        variant="ghost"
                        className="md:hidden relative overflow-hidden group"
                        size="icon"
                        onClick={toggleMenu}
                        aria-label="Menu mobile"
                    >
                        <div className="absolute inset-0 bg-blue-400/10 group-hover:bg-blue-400/20 transition-all duration-500"></div>
                        <div className="absolute inset-0 border border-blue-300/30 rounded-md group-hover:border-blue-200/50 transition-all duration-500"></div>
                        <Menu className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-500 relative z-10" />
                    </Button>
                </div>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-50 bg-[#0a0e23]/95 backdrop-blur-lg border-b border-[#0a0e23]/30 shadow-lg shadow-blue-400/5">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-3 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-4">
                    <Image src="/images/logo_furia.png" alt="Logo FURIA" width={120} height={40} />
                </Link>

                <nav className="hidden md:flex gap-8">
                    {navItems.map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="relative text-white hover:text-blue-300 font-barlow-condensed text-sm uppercase tracking-wider group transition-all duration-300"
                        >
                            <span className="relative z-10">{label}</span>
                            <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-300 group-hover:w-full transition-all duration-500"></span>
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    {session ? (
                        <div className="flex items-center gap-3">
                            <Link href="/pages/profile" className="flex items-center gap-3 group">
                                {session.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt="Avatar"
                                        width={40}
                                        height={40}
                                        className="rounded-xl border-2 border-gray-700 hover:border-blue-500 transition-colors duration-300"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-medium">
                                        {session.user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="hidden md:flex flex-col">
                                    <span className="text-sm font-medium text-white">
                                        {session.user?.name && formatName(session.user.name)}
                                    </span>
                                    <span className="text-xs text-blue-300">Ver perfil</span>
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <Link
                            href="/pages/form"
                            className="text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-300"
                        >
                            Entrar
                        </Link>
                    )}
                </div>

                <Button
                    variant="ghost"
                    className="md:hidden relative overflow-hidden group"
                    size="icon"
                    onClick={toggleMenu}
                    aria-label="Menu mobile"
                >
                    <div className="absolute inset-0 bg-blue-400/10 group-hover:bg-blue-400/20 transition-all duration-500"></div>
                    <div className="absolute inset-0 border border-blue-300/30 rounded-xl group-hover:border-blue-200/50 transition-all duration-500"></div>
                    {isMenuOpen ? (
                        <X className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-500 relative z-10" />
                    ) : (
                        <Menu className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-500 relative z-10" />
                    )}
                </Button>
            </div>

            <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-blue-950/95 backdrop-blur-lg border-t border-blue-400/30`}>
                <nav className="flex flex-col items-center py-4 space-y-6">
                    {navItems.map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="relative text-white hover:text-blue-300 font-barlow-condensed text-sm uppercase tracking-wider group transition-all duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="relative z-10">{label}</span>
                            <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-300 group-hover:w-full transition-all duration-500"></span>
                        </Link>
                    ))}
                    {session && (
                        <div className="pt-4 border-t border-blue-400/20 w-full text-center">
                            <Link
                                href="pages/profile"
                                className="flex flex-col items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {session.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt="Avatar"
                                        width={48}
                                        height={48}
                                        className="rounded-full border-2 border-blue-500"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-medium">
                                        {session.user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <span className="text-sm font-medium text-white">
                                    {session.user?.name && formatName(session.user.name)}
                                </span>
                                <span className="text-xs text-blue-300">Meu perfil</span>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

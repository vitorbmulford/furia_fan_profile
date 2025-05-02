"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [about, setAbout] = useState("");
  const [achievements, setAchievements] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    console.log("Dados salvos:", {
      name: session?.user?.name,
      email: session?.user?.email,
      about,
      achievements,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }
  return (
    <div className="min-h-screen bg-[#0a0e23] py-16 px-4">
      <div className="max-w-4xl mx-auto bg-[#111a36] p-8 rounded-xl border border-blue-900/40 shadow-md">
        <div className="flex flex-col items-center text-center">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="Foto do perfil"
              width={100}
              height={100}
              className="rounded-full border-4 border-blue-500"
            />
          )}
          <h1 className="mt-4 text-3xl font-barlow-condensed font-bold text-white">
            {session?.user?.name || "Nome do Usuário"}
          </h1>
          <p className="text-blue-200">{session?.user?.email || "email@exemplo.com"}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-[#0a112b] rounded-lg p-6 border border-blue-900/30">
            <h3 className="font-bold text-white text-lg mb-2">Sobre</h3>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Clique para escrever algo sobre você..."
              className="w-full min-h-[100px] bg-[#0a112b] border border-blue-800/40 text-gray-200 placeholder:text-gray-500 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="bg-[#0a112b] rounded-lg p-6 border border-blue-900/30">
            <h3 className="font-bold text-white text-lg mb-2">Conquistas</h3>
            <textarea
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              placeholder="Compartilhe suas vitórias, glórias ou momentos marcantes..."
              className="w-full min-h-[100px] bg-[#0a112b] border border-blue-800/40 text-gray-200 placeholder:text-gray-500 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>


        <div className="mt-10 flex flex-col items-center">
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-white font-barlow-condensed text-lg rounded-xl shadow-md "
          >
            Salvar Alterações
          </Button>
          {saved && (
            <p className="mt-4 text-green-400 text-sm">
              Dados salvos com sucesso!
            </p>
          )}
          <Button
            variant="outline"
            onClick={() => signOut()}
            className="text-white bg-red-600 hover:bg-red-700 hover:text-red border border-red-500 rounded-xl  py-2 px-4 mt-4 transition-all duration-300"
          >
            Sair
          </Button>

        </div>
      </div>
    </div>
  );
}

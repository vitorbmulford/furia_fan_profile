"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import * as cheerio from "cheerio";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [about, setAbout] = useState("");
  const [achievements, setAchievements] = useState("");
  const [saved, setSaved] = useState(false);
  const [newLink, setNewLink] = useState("");
  const [esportsLinks, setEsportsLinks] = useState<
    { url: string; isRelevant: boolean; validationDetails: string }[]
  >([]);

  useEffect(() => {
    async function fetchUserData() {
      if (session?.user?.email) {
        try {
          const res = await fetch(`http://localhost:3001/fans?email=${session.user.email}`);
          const data = await res.json();
          if (data.length > 0) {
            const user = data[0];
            setAbout(user.about || "");
            setAchievements(user.achievements || "");
            setEsportsLinks(Array.isArray(user.socialLinks) ? user.socialLinks : []);
          }
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        }
      }
    }
    fetchUserData();
  }, [session]);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  async function validateLink(link: string) {
    try {
      const trustedDomains = ["hltv.org", "twitch.tv", "liquipedia.net", "esportsearnings.com"];
      const url = new URL(link);
      const isTrustedDomain = trustedDomains.some((domain) => url.hostname.includes(domain));

      if (isTrustedDomain && url.pathname.includes("/profile")) {
        return {
          url: link,
          isRelevant: true,
          validationDetails: `Perfil de usuário detectado em ${url.hostname}`,
        };
      }

      const response = await axios.get(link, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });

      const $ = cheerio.load(response.data);
      const pageContent = $("body").text().toLowerCase();

      const keywords = [
        "csgo", "counter-strike", "esports", "player", "team", "tournament",
        "streamer", "gaming", "furia", "blast", "iem",
      ];
      const isRelevant = keywords.some((keyword) => pageContent.includes(keyword));

      return {
        url: link,
        isRelevant,
        validationDetails: isRelevant
          ? "Conteúdo relacionado a e-sports detectado"
          : "Conteúdo não parece relacionado a e-sports",
      };
    } catch (error) {
      console.error("Erro ao validar link:", error);
      return {
        url: link,
        isRelevant: false,
        validationDetails: "Erro ao acessar o link",
      };
    }
  }

  async function handleAddLink() {
    if (!newLink || !isValidUrl(newLink)) {
      alert("Por favor, insira uma URL válida");
      return;
    }

    const validatedLink = await validateLink(newLink);
    setEsportsLinks((prev) => [...prev, validatedLink]);
    setNewLink("");
  }

  async function handleSave() {
    if (!session?.user?.email) return;

    const userData = {
      id: session.user.email,
      email: session.user.email,
      name: session.user.name,
      about,
      achievements,
      interests: "csgo",
      socialLinks: esportsLinks,
      validation: esportsLinks.every((link) => link.isRelevant),
      documentUrl: "",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`http://localhost:3001/fans/${session.user.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        await fetch("http://localhost:3001/fans", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
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

        <div className="mt-10">
          <h3 className="font-bold text-white text-lg mb-2">Perfis de e-Sports</h3>
          <div className="bg-[#0a112b] rounded-lg p-6 border border-blue-900/30">
            <div className="flex gap-4 mb-4">
              <input
                type="url"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="Adicione um link de perfil (ex.: HLTV, Twitch)"
                className="w-full bg-[#0a112b] border border-blue-800/40 text-gray-200 placeholder:text-gray-500 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={handleAddLink}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded-md"
              >
                Adicionar
              </Button>
            </div>
            <ul>
              {esportsLinks.map((link, index) => (
                <li key={`${link.url}-${index}`} className="text-gray-200 mb-2">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="underline">
                    {link.url}
                  </a>
                  <span className={link.isRelevant ? "text-green-400" : "text-red-400"}>
                    {" - "}{link.validationDetails}
                  </span>
                  <Button
                    onClick={() => setEsportsLinks(esportsLinks.filter((_, i) => i !== index))}
                    className="text-red-400 ml-2 bg-transparent hover:bg-red-900/20"
                  >
                    Remover
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-white font-barlow-condensed text-lg rounded-xl shadow-md"
          >
            Salvar Alterações
          </Button>
          {saved && (
            <p className="mt-4 text-green-400 text-sm">Dados salvos com sucesso!</p>
          )}
          <Button
            variant="outline"
            onClick={() => signOut()}
            className="text-white bg-red-600 hover:bg-red-700 border border-red-500 rounded-xl py-2 px-4 mt-4 transition-all duration-300"
          >
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}
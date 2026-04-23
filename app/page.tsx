"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { times } from "@/data/times";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import Bannerlateral from "@/components/lateral";


type Noticia = {
  id: string;
  titulo: string;
  resumo: string;
  imagem: string;
  data: string;
};

export default function Home() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const { data } = await supabase
      .from("noticias")
      .select("*")
      .order("data", { ascending: false })
      .limit(15);

    if (data) setNoticias(data);
  }

  const destaque = noticias[0];
  const timesRO = times
    .filter((t) => t.estado === "RO")
    .sort((a, b) => a.nome.localeCompare(b.nome));

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔥 HEADER */}
      <header className="bg-green-800 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Últimas Notícias</h1>
      </header>

      <div className="p-6 space-y-8 max-w-6xl mx-auto">


        {/* 🔥 GRID PRINCIPAL */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* 📰 NOTÍCIAS */}
          <div className="md:col-span-2 space-y-4">

            <h2 className="font-bold text-lg text-gray-800">
              {destaque && (
                <Link href={`/noticias/${destaque.id}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer">

                    <img
                      src={destaque.imagem}
                      className="w-full h-220px md:h-300px object-cover"

                    />

                    <div className="absolute bottom-0 p-6 bg-gradient-to from-black/80 to-transparent text-black">
                      <h2 className="text-2xl font-bold">
                        {destaque.titulo}
                      </h2>
                      <p className="text-sm opacity-90">
                        {destaque.resumo}
                      </p>
                    </div>

                  </div>
                </Link>
              )}
            </h2>



            {noticias.slice(1).map((n) => (


              <Link key={n.id} href={`/noticias/${n.id}`}>
                <div className="flex gap-3 bg-white rounded-xl overflow-hidden shadow hover:scale-[1.01] transition">

                  <img
                    src={n.imagem}
                    className="w-32 h-24 object-cover"

                  />

                  <div className="p-2">
                    <h3 className="font-bold text-sm text-black">
                      {n.titulo}
                    </h3>

                    <span className="text-xs text-gray-500">
                      {new Date(n.data).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                </div>
              </Link>
            ))}
            <Link href="/noticias">
              <h2 className="font-bold text-lg text-gray-800 cursor-pointer hover:underline">
                Ver todas as notícias →
              </h2>
            </Link>

            <AdBanner />
          </div>

          {/* ⚽ LATERAL */}
          <div className="space-y-6">

            {/* 🏆 COMPETIÇÕES */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-bold mb-3 text-black">
                Competições
              </h3>

              <div className="space-y-2 text-sm">
                <Link href="/campeonato/rondoniense">
                  <div className="font-bold p-2 bg-green-900 rounded cursor-pointer hover:scale-105 transition">
                    Campeonato Rondoniense
                  </div>
                </Link>

                <Link href="/campeonato/copa-verde">
                  <div className="font-bold p-2 bg-green-700 rounded cursor-pointer hover:scale-105 transition">
                    Copa Verde
                  </div>
                </Link>

                <Link href="/campeonato/serie-d">
                  <div className="font-bold p-2 bg-green-500 rounded cursor-pointer hover:scale-105 transition">
                    Brasileirão Série D
                  </div>
                </Link>

                <Link href="/campeonato/serie-a3">
                  <div className="font-bold p-2 bg-rose-400 rounded cursor-pointer hover:scale-105 transition">
                    Brasileirão Fem. A3
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-gray-200 p-6 rounded-xl text-center text-gray-600">
              Anuncie AQUI! entre em contato conosco!
            </div>

            {/* ⚽ TIMES */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-bold mb-3 text-black">
                Clubes de Rondônia
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {timesRO.map((t) => (
                  <Link href={`/times/${t.id}`} key={t.id}>
                    <div className="flex flex-col items-center text-xs cursor-pointer hover:scale-110 transition">

                      <img src={t.logo} className="w-10 h-10" />
                      <span className="text-black text-center">{t.nome}</span>

                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 💰 ESPAÇO ANÚNCIO */}
            <div className="bg-gray-200 p-6 rounded-xl text-center text-gray-600">
              <Bannerlateral />
            </div>


          </div>

        </div>

      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Noticia = {
  titulo: string;
  descricao: string;
  imagem: string;
  imagens: string;
  slug: string;
  resumo: string;
};

export default function Home() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const destaque = noticias[0];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("noticias") || "[]");
    setNoticias(data);
  }, []);

  return (
    <div >

      <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
        {noticias.slice(1).map((n) => (
          <div
            key={n.slug}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={n.imagens?.[0]}
              className="w-full h-40 object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h3 className="font-bold text-gray-900">
                {n.titulo}
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                {n.resumo}
              </p>
            </div>
          </div>
        ))}
      </div>


      {/* CONTEÚDO */}
      <main className="max-w-6xl mx-auto p-6 space-y-6">

        {/* DESTAQUE */}
        <div className="bg-green-700 text-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-2">Últimas notícias do esporte local</h2>
        </div>

        {/* NOTÍCIAS */}
        <div>

          <div className="grid rounded-xl md:grid-cols-3 gap-6">
            {noticias.map((n) => (
              <Link key={n.slug} href={`/noticias/${n.slug}`}>

                <div className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">

                  <img
                    src={n.imagem}
                    alt={n.titulo}
                    className="text-sm text-gray-800 mt-2"
                  />

                  <div className="p-4">
                    <h3 className="font-bold text-gray-800">{n.titulo}</h3>
                    <p className="text-sm text-black - 600 mt-2">
                      {n.resumo}
                    </p>
                  </div>

                </div>

              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
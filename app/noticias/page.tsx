"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AdBanner from "@/components/AdBanner";

type Noticia = {
  id: string;
  titulo: string;
  imagem: string;
  data: string;
};

const LIMIT = 15;

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [total, setTotal] = useState(0);

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    carregar();
  }, [page]);

  async function carregar() {
    const from = (page - 1) * LIMIT;
    const to = from + LIMIT - 1;

    const { data, count } = await supabase
      .from("noticias")
      .select("*", { count: "exact" })
      .order("data", { ascending: false })
      .range(from, to);

    if (data) setNoticias(data);
    if (count) setTotal(count);
  }

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold text-white">
        Todas as Notícias
      </h1>

      {/* LISTA */}
      <div className="space-y-4">

        

        {noticias.map((n) => (
          <Link key={n.id} href={`/noticias/${n.id}`}>
            <div className="flex gap-3 bg-white rounded-xl overflow-hidden shadow hover:scale-[1.01] transition">

              <img
                src={n.imagem}
                className="w-32 h-24 object-cover"
              />

              <div className="p-2">
                <h3 className="font-bold text-black">
                  {n.titulo}
                </h3>

                <span className="text-xs text-gray-500">
                  {new Date(n.data).toLocaleDateString("pt-BR")}
                </span>
              </div>

            </div>
          </Link>
        ))}
      </div>

      {/* PAGINAÇÃO */}
      <div className="flex justify-center gap-2">

        {page > 1 && (
          <Link href={`/noticias?page=${page - 1}`}>
            <button className="px-4 py-2 bg-gray-300 rounded">
              ← Anterior
            </button>
          </Link>
        )}

        <span className="px-4 py-2 bg-white rounded text-black">
          Página {page} de {totalPages}
        </span>

        {page < totalPages && (
          <Link href={`/noticias?page=${page + 1}`}>
            <button className="px-4 py-2 bg-green-600 text-white rounded">
              Próxima →
            </button>
          </Link>
        )}

      </div>

    </div>
  );
}
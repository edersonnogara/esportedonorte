"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

type Noticia = {
  id: string;
  titulo: string;
  resumo: string;
  imagem: string;
  conteudo: string;
  data: string;
};

export default function NoticiaPage() {
  const params = useParams();
  const id = params.id as string;

  const [noticia, setNoticia] = useState<Noticia | null>(null);

  useEffect(() => {
    carregar();
  }, [id]);

  async function carregar() {
    const { data, error } = await supabase
      .from("noticias")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setNoticia(data);
  }

  if (!noticia) {
    return <div className="p-6 text-white">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* 📰 TÍTULO */}
      <h1 className="text-3xl font-bold text-white">
        {noticia.titulo}
      </h1>

      {/* 📅 DATA */}
      <span className="text-sm text-gray-400">
        {new Date(noticia.data).toLocaleDateString("pt-BR")}
      </span>

      {/* 🖼️ IMAGEM */}
      <img
        src={noticia.imagem}
        className="w-full h-400px object-cover rounded-xl"
      />

      {/* 📝 RESUMO */}
      <p className="text-lg text-gray-200">
        {noticia.resumo}
      </p>

      {/* 💰 ANÚNCIO (IMPORTANTE) */}
      {/* <AdBanner /> */}

      {/* 📖 CONTEÚDO */}
      <div className="bg-white p-6 rounded-xl shadow text-black leading-relaxed space-y-4">
        {noticia.conteudo}
      </div>

    </div>
  );
}
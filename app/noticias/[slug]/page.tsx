"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Noticia = {
  titulo: string;
  descricao: string;
  imagem: string;
  slug: string;
};

export default function NoticiaPage() {
  const params = useParams();
  const router = useRouter();
  const [noticia, setNoticia] = useState<Noticia | null>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("noticias") || "[]");
    const encontrada = data.find((n: Noticia) => n.slug === params.slug);
    setNoticia(encontrada);
  }, [params.slug]);

  const handleDelete = () => {
    const data = JSON.parse(localStorage.getItem("noticias") || "[]");
    const filtradas = data.filter((n: Noticia) => n.slug !== params.slug);

    localStorage.setItem("noticias", JSON.stringify(filtradas));

    alert("Notícia excluída!");
    router.push("/");
  };

  if (!noticia) {
    return <p className="p-6">Carregando...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* TÍTULO */}
      <h1 className="text-3xl font-bold mb-4">
        {noticia.titulo}
      </h1>

      {/* IMAGEM */}
      <img
        src={noticia.imagem}
        className="w-full rounded-xl mb-6"
      />

      {/* TEXTO */}
      <p className="text-gray-700 leading-relaxed mb-6">
        {noticia.descricao}
      </p>

      {/* BOTÕES */}
      <div className="flex gap-4">
        
        <button
          onClick={() => router.push(`/admin?edit=${noticia.slug}`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Editar
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Excluir
        </button>

      </div>
    </div>
  );
}
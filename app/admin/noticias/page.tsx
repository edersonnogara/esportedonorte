"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Noticia = {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  imagem: string;
  data: string;
};

export default function AdminNoticias() {

  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState({
    titulo: "",
    resumo: "",
    conteudo: "",
    imagem: ""
  });

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const { data } = await supabase.from("noticias").select("*");

    if (data) setNoticias(data);
  }

  function limpar() {
    setForm({
      titulo: "",
      resumo: "",
      conteudo: "",
      imagem: ""
    });
    setEditId(null);
  }

  async function salvar() {
    if (!form.titulo) return alert("Digite o título");

    if (editId) {
      await supabase.from("noticias").update(form).eq("id", editId);
    } else {
      await supabase.from("noticias").insert([form]);
    }

    limpar();
    carregar();
  }

  async function excluir(id: string) {
    await supabase.from("noticias").delete().eq("id", id);
    carregar();
  }

  function editar(n: Noticia) {
    setEditId(n.id);
    setForm(n);
  }

  return (
    <div className="p-6 space-y-6 text-black">

      <h1 className="text-white text-xl font-bold">Admin Notícias</h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded-xl space-y-3">

        <input placeholder="Título" className="border p-2 w-full"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        />

        <input placeholder="Resumo" className="border p-2 w-full"
          value={form.resumo}
          onChange={(e) => setForm({ ...form, resumo: e.target.value })}
        />

        <textarea placeholder="Conteúdo" className="border p-2 w-full"
          value={form.conteudo}
          onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
        />

        <input placeholder="Imagem URL" className="border p-2 w-full"
          value={form.imagem}
          onChange={(e) => setForm({ ...form, imagem: e.target.value })}
        />

        <button onClick={salvar}
          className="bg-green-600 text-white px-4 py-2 rounded">
          {editId ? "Atualizar" : "Publicar"}
        </button>

      </div>

      {/* LISTA */}
      <div className="bg-white p-4 rounded-xl space-y-2">

        {noticias.map((n) => (
          <div key={n.id} className="flex justify-between border p-2">

            <span>{n.titulo}</span>

            <div className="flex gap-2">
              <button onClick={() => editar(n)}
                className="bg-yellow-500 px-2 text-white">
                Editar
              </button>

              <button onClick={() => excluir(n.id)}
                className="bg-red-600 px-2 text-white">
                Excluir
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
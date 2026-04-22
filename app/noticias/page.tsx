"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Noticia } from "@/types/noticias";

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
    carregarNoticias();
  }, []);

  async function carregarNoticias() {
    const { data, error } = await supabase
      .from("noticias")
      .select("*")
      .order("data", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setNoticias(data);
  }

  function limparForm() {
    setForm({
      titulo: "",
      resumo: "",
      conteudo: "",
      imagem: ""
    });
    setEditId(null);
  }

  async function salvar() {
    if (!form.titulo) {
      alert("Título obrigatório");
      return;
    }

    if (editId) {
      await supabase
        .from("noticias")
        .update(form)
        .eq("id", editId);
    } else {
      await supabase
        .from("noticias")
        .insert([form]);
    }

    limparForm();
    carregarNoticias();
  }

  async function excluir(id: string) {
    await supabase
      .from("noticias")
      .delete()
      .eq("id", id);

    carregarNoticias();
  }

  function editar(n: Noticia) {
    setEditId(n.id);
    setForm({
      titulo: n.titulo,
      resumo: n.resumo,
      conteudo: n.conteudo,
      imagem: n.imagem
    });
  }

  return (
    <div className="p-6 space-y-6 text-black">

      <h1 className="text-xl font-bold">Admin Notícias</h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded-xl space-y-3">

        <input
          placeholder="Título"
          className="w-full border p-2"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        />

        <input
          placeholder="Resumo"
          className="w-full border p-2"
          value={form.resumo}
          onChange={(e) => setForm({ ...form, resumo: e.target.value })}
        />

        <textarea
          placeholder="Conteúdo completo"
          className="w-full border p-2"
          rows={5}
          value={form.conteudo}
          onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
        />

        <input
          placeholder="URL da imagem"
          className="w-full border p-2"
          value={form.imagem}
          onChange={(e) => setForm({ ...form, imagem: e.target.value })}
        />

        <button
          onClick={salvar}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Atualizar" : "Publicar"}
        </button>

      </div>

      {/* LISTA */}
      <div className="bg-white p-4 rounded-xl space-y-3">

        {noticias.map((n) => (
          <div key={n.id} className="border p-3 flex justify-between items-center">

            <div>
              <h2 className="font-bold">{n.titulo}</h2>
              <span className="text-xs text-gray-500">
                {new Date(n.data).toLocaleString("pt-BR")}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editar(n)}
                className="bg-yellow-500 px-2 py-1 text-white rounded"
              >
                Editar
              </button>

              <button
                onClick={() => excluir(n.id)}
                className="bg-red-600 px-2 py-1 text-white rounded"
              >
                Excluir
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
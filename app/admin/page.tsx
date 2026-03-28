"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { times } from "@/data/times";

// 🧱 TIMES (com logos)

export default function Admin() {
  const [aba, setAba] = useState("noticias");

  // 📰 NOTÍCIAS
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [resumo, setResumo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagens, setImagens] = useState<string[]>([""]);

  // 👉 Regras:
  //Rodadas 1–20 → fase de grupos
  //Rodada 90 → semifinal
  //Rodada 100 → final (se quiser depois)

  // ⚽ JOGOS
  const [casa, setCasa] = useState("");
  const [fora, setFora] = useState("");
  const [golsCasa, setGolsCasa] = useState<number | null>(null);
  const [golsFora, setGolsFora] = useState<number | null>(null);
  const [rodada, setrodada] = useState(1);
  const [tipo, setTipo] = useState("fase");
  const [confronto, setConfronto] = useState(1);
  const [dataInput, setDataInput] = useState("");
  const [estadio, setEstadio] = useState("");
  const [jogos, setJogos] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const editSlug = searchParams.get("edit");

  // 🔄 carregar jogos
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("jogos") || "[]");
    setJogos(data);
  }, []);

  useEffect(() => {
    if (editSlug) {
      const data = JSON.parse(localStorage.getItem("noticias") || "[]");
      const noticia = data.find((n: any) => n.slug === editSlug);

      if (noticia) {
        setTitulo(noticia.titulo);
        setDescricao(noticia.descricao);
        setImagem(noticia.imagem);
      }
    }
  }, [editSlug]);

  // ⚽ SALVAR JOGO
  const salvarJogo = () => {
    const data = [...jogos];

    let rodadaFinal = rodada;

    if (tipo === "semi") rodadaFinal = 90;
    if (tipo === "final") rodadaFinal = 100;
    const novo = {
      casa: String(casa),
      fora: String(fora),
      golsCasa: Number(golsCasa),
      golsFora: Number(golsFora),
      rodada: rodadaFinal,
      data: String(dataInput),
      estadio,
      tipo,
      confronto,
    };

    if (editIndex !== null) {
      // ✏️ EDITAR
      data[editIndex] = novo;
      alert("Jogo atualizado!");
    } else {
      // ➕ NOVO
      data.push(novo);
      alert("Jogo criado!");
    }

    // 🔥 GARANTIA: remove qualquer coisa inválida
    const dadosLimpos = data.map((j) => ({
      casa: j.casa,
      fora: j.fora,
      golsCasa: j.golsCasa,
      golsFora: j.golsFora,
      rodada: j.rodada,
      data: j.data,
      estadio: j.estadio,
      tipo: j.tipo || "fase",
      confronto: j.confronto || 1,
    }));

    localStorage.setItem("jogos", JSON.stringify(dadosLimpos));
    setJogos(dadosLimpos);

    alert("Salvo com sucesso!");

    // reset
    setCasa("");
    setFora("");
    setGolsCasa(0);
    setGolsFora(0);
    setrodada(1);
    setDataInput("");
    setEstadio("");
    setEditIndex(null);
  };

  const editarJogo = (index: number) => {
    const jogo = jogos[index];

    setCasa(jogo.casa);
    setFora(jogo.fora);
    setGolsCasa(jogo.golsCasa);
    setGolsFora(jogo.golsFora);
    setrodada(jogo.rodada);
    setTipo(jogo.tipo || "fase");
    setConfronto(jogo.confronto || 1);
    setDataInput(jogo.data || "");
    setEstadio(jogo.estadio || "");
    setEditIndex(index);
  };

  const excluirJogo = (index: number) => {
    const novos = jogos.filter((_: any, i: number) => i !== index);

    setJogos(novos);
    localStorage.setItem("jogos", JSON.stringify(novos));
  };



  const handleSubmit = () => {
    const data = JSON.parse(localStorage.getItem("noticias") || "[]");

    if (editSlug) {
      // editar
      const atualizadas = data.map((n: any) =>
        n.slug === editSlug
          ? { ...n, titulo, resumo, conteudo, imagens }
          : n
      );

      localStorage.setItem("noticias", JSON.stringify(atualizadas));
      alert("Notícia atualizada!");
    } else {
      // nova
      const nova = {
        titulo,
        resumo,
        conteudo,
        imagens,
        slug: titulo.toLowerCase().replaceAll(" ", "-"),
      };

      data.push(nova);
      localStorage.setItem("noticias", JSON.stringify(data));
      alert("Notícia criada!");
      setTitulo("");
      setResumo("");
      setConteudo("");
      setImagens([""]);
    }


  };



  return (

    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <h1 className="text-2xl font-bold">Painel Admin</h1>

      {/* ABAS */}
      <div className="flex gap-4">
        <button onClick={() => setAba("noticias")} className="bg-green-600 text-white px-3 py-1 rounded">
          Notícias
        </button>

        <button onClick={() => setAba("jogos")} className="bg-blue-600 text-white px-3 py-1 rounded">
          Jogos
        </button>
      </div>

      {/* ================= NOTÍCIAS ================= */}
      {aba === "noticias" && (
        <div className="space-y-4">

          <input
            className="w-full border p-2 rounded"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="URL da imagem"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Resumo (até 100 caracteres)"
            maxLength={100}
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Conteúdo completo"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />

          {imagens.map((img, index) => (
            <input
              key={index}
              className="w-full border p-2 rounded"
              placeholder={`Imagem ${index + 1}`}
              value={img}
              onChange={(e) => {
                const novas = [...imagens];
                novas[index] = e.target.value;
                setImagens(novas);
              }}
            />
          ))}

          {imagens.length < 4 && (
            <button
              onClick={() => setImagens([...imagens, ""])}
              className="bg-gray-300 px-2 py-1 rounded"
            >
              + Adicionar imagem
            </button>
          )}



          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Publicar
          </button>
        </div>
      )};


      {/* ================= JOGOS ================= */}
      {aba === "jogos" && (
        <div className="space-y-4">

          {/* TIMES */}
          <select value={casa} onChange={(e) => setCasa(e.target.value)} className="border p-2 w-full text-white bg-black">
            <option value="">Time da casa</option>
            {times.map((t) => (
              <option key={t.nome}>{t.nome}</option>
            ))}
          </select>

          <select value={fora} onChange={(e) => setFora(e.target.value)} className="border p-2 w-full text-white bg-black">
            <option value="">Time visitante</option>
            {times.map((t) => (
              <option key={t.nome}>{t.nome}</option>
            ))}
          </select>

          <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
           className="border p-2 w-full text-black"
          >

            <select
            value={tipo}
             onChange={(e) => setTipo(e.target.value)}
             className="border p-2 w-full text-black"
            >
              <option value="fase">Fase de Grupos</option>
              <option value="semi">Semifinal</option>
              <option value="final">Final</option>
            </select>
          </select>



          {/* PLACAR */}
          <div className="flex gap-4">
            <input
              type="number"
              value={golsCasa ?? ""}
              onChange={(e) => setGolsCasa(Number(e.target.value))}
              className="border p-2 w-full"
            />

            <input
              type="number"
              value={golsFora ?? ""}
              onChange={(e) => setGolsFora(Number(e.target.value))}
              className="border p-2 w-full"
            />
          </div>
          {/* Rodada */}
          <div>

            <div>
              <label className="text-sm text-gray-600">Rodada</label>
              <input
                type="number"
                value={rodada}
                onChange={(e) => setrodada(Number(e.target.value))}
                className="border p-2 w-full rounded"
              />
            </div>
            )

          </div>
          <input
            type="datetime-local"
            value={dataInput || ""}
            onChange={(e) => setDataInput(e.target.value)}
            className="border p-2 w-full"
          />

          <input
            type="text"
            value={estadio || ""}
            onChange={(e) => setEstadio(e.target.value)}
            className="border p-2 w-full"
            placeholder="Estádio / Cidade"
          />

          {/* BOTAO SALVAR JOGO */}
          <button
            onClick={salvarJogo}
            className="bg-blue-700 text-white px-4 py-2 rounded"
          >
            {editIndex !== null ? "Atualizar Jogo" : "Salvar Jogo"}
          </button>

          {/* LISTA DE JOGOS */}
          <div className="text-white bg-black p-4 rounded shadow">
            <h2 className="font-bold mb-3">Jogos Salvos</h2>

            {jogos.map((j, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b py-2"
              >
                <span>
                  {j.casa} {j.golsCasa} x {j.golsFora} {j.fora} (Rodada {j.rodada})
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => editarJogo(i)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => excluirJogo(i)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
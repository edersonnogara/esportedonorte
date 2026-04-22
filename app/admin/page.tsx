
"use client";
import { useState, useEffect } from "react";
import { times, getEstadios } from "@/data/times";
import { supabase } from "@/lib/supabase";

export default function Admin() {

  type Jogo = {
    id: string;
    casa: string;
    fora: string;
    golsCasa?: number | null;
    golsFora?: number | null;
    rodada: number;
    tipo: string;
    confronto: number;
    data: string;
    estadio: string;
    competicao: string;
    grupo: string;
  };

  const atualizarJogo = async (id: string) => {
    await supabase
      .from("jogos")
      .update({
        casa,
        fora,
        gols_casa: golsCasa ?? null,
        gols_fora: golsFora ?? null,
        rodada,
        tipo,
        confronto,
        data: dataInput,
        estadio,
        competicao,
        grupo,
      })
      .eq("id", id);

    carregarJogos();
  };

  const [aba, setAba] = useState("jogos");

  // ⚽ STATES JOGO
  const [competicao, setCompeticao] = useState("Competição");
  const [casa, setCasa] = useState("");
  const [fora, setFora] = useState("");
  const [golsCasa, setGolsCasa] = useState<number | null>(null);
  const [golsFora, setGolsFora] = useState<number | null>(null);
  const [rodada, setRodada] = useState(1);
  const [tipo, setTipo] = useState("fase");
  const [confronto, setConfronto] = useState(1);
  const [dataInput, setDataInput] = useState("");
  const [estadio, setEstadio] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [jogos, setJogos] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [grupo, setGrupo] = useState("");


  const [timesDB, setTimesDB] = useState<any[]>([]);

  const carregarTimes = async () => {
    const { data, error } = await supabase
      .from("times")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setTimesDB(data || []);
  };

  useEffect(() => {
    carregarJogos();
    carregarTimes(); // 🔥 IMPORTANTE
  }, []);

  const carregarJogos = async () => {
    const { data, error } = await supabase
      .from("jogos")
      .select("*")
      .order("rodada", { ascending: true })
      .eq("competicao", "Copa Verde");

    if (error) {
      console.error(error);
      return;
    }

    const formatado = data.map((j: any) => ({
      id: j.id,
      casa: j.casa,
      fora: j.fora,
      golsCasa: j.gols_casa,
      golsFora: j.gols_fora,
      rodada: j.rodada,
      tipo: j.tipo,
      confronto: j.confronto,
      dataInput: j.data,
      estadio: j.estadio,
      competicao: j.competicao,
      grupo: j.grupo,
    }));

    setJogos(formatado);
  };

  useEffect(() => {
    if (casa) {
      const time = times.find(t => t.nome === casa);
      if (time) setEstadio(time.estadio);
    }
  }, [casa]);


  // 🔄 CARREGAR
  useEffect(() => {
    carregarJogos();
  }, []);

  // 🔎 FILTRAR TIMES POR COMPETIÇÃO
  const timesFiltrados = times.filter(t =>
    t.competicoes.some(c => c.nome === competicao)
  );

  // 💾 SALVAR JOGO
  const salvarJogo = async () => {

    if (!casa || !fora) {
      alert("Selecione os times");
      return;
    }

    if (editId) {
      // ✏️ UPDATE
      const { error } = await supabase
        .from("jogos")
        .update({
          casa,
          fora,
          gols_casa: golsCasa ?? null,
          gols_fora: golsFora ?? null,
          rodada,
          tipo,
          confronto,
          data: dataInput,
          estadio,
          competicao,
          grupo: competicao === "Copa Verde" ? grupo : null
        })
        .eq("id", editId);

      if (error) {
        console.error(error);
        alert("Erro ao atualizar");
        return;
      }

      alert("Jogo atualizado!");
    } else {
      // ➕ INSERT
      const { error } = await supabase.from("jogos").insert({
        casa,
        fora,
        gols_casa: golsCasa,
        gols_fora: golsFora,
        rodada,
        tipo,
        confronto,
        data: dataInput,
        estadio,
        competicao,
        grupo: competicao === "Copa Verde" ? grupo : null
      });

      if (error) {
        console.error(error);
        alert("Erro ao salvar");
        return;
      }

      alert("Jogo salvo com sucesso!");
    }

    const limparCampos = () => {
      setCasa("");
      setFora("");
      setGolsCasa(null);
      setGolsFora(null);
      setRodada(1);
      setTipo("fase");
      setConfronto(1);
      setDataInput("");
      setEstadio("");
      setCompeticao("");
      setEditId(null); // importante se estiver editando
      setGrupo("");
    };

    // 🔥 LIMPA TUDO
    limparCampos();

    // 🔄 atualiza lista
    carregarJogos();
  };

  const editarJogo = (jogo: Jogo) => {
    setCasa(jogo.casa);
    setFora(jogo.fora);
    setGolsCasa(jogo.golsCasa ?? null);
    setGolsFora(jogo.golsFora ?? null);
    setRodada(jogo.rodada);
    setTipo(jogo.tipo);
    setConfronto(jogo.confronto);
    setDataInput(jogo.data);
    setEstadio(jogo.estadio);
    setCompeticao(jogo.competicao);
    setGrupo(jogo.grupo);
    setEditId(jogo.id); // 🔥 ESSENCIAL
  };

  const excluirJogo = async (id: string) => {
    const { error } = await supabase
      .from("jogos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Erro ao excluir");
      return;
    }

    carregarJogos();
  };

  function selecionarTimeCasa(nome: string) {
    setCasa(nome);

    const time = timesDB.find(t => t.nome === nome);
    if (time) {
      setEstadio(time.estadio);
    }
  }


  //_______________________________________________________//
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <h1 className="text-2xl font-bold">Admin - Jogos</h1>


      {/* COMPETIÇÃO */}
      <select
        value={competicao}
        onChange={(e) => setCompeticao(e.target.value)}
        className="border p-2 w-full bg-purple-700 text-white rounded"
      >
        <option value="">Competição</option>
        <option value="Rondoniense">Rondoniense</option>
        <option value="Copa Verde">Copa Verde</option>
        <option value="Serie D">Serie D</option>
      </select>

      {/* 🔥 SÓ MOSTRA GRUPO SE FOR COPA VERDE */}
      {competicao === "Copa Verde" && (
        <select
          value={grupo}
          onChange={(e) => setGrupo(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Grupo</option>
          <option value="A">Grupo A</option>
          <option value="B">Grupo B</option>
        </select>
      )}

      {/* TIMES */}
      <select
        value={casa}
        onChange={(e) => setCasa(e.target.value)}
        className="border p-2 w-full  bg-green-600 text-white rounded"
      >
        <option value="">Time da casa</option>

        {times.map((t) => (
          <option key={t.id} value={t.nome}>
            {t.nome}
          </option>
        ))}
      </select>

      <select
        value={fora}
        onChange={(e) => setFora(e.target.value)}
        className="border p-2 w-full bg-blue-600 text-white rounded"
      >
        <option value="">Time visitante</option>

        {times.map((t) => (
          <option key={t.id} value={t.nome}>
            {t.nome}
          </option>
        ))}
      </select>

      {/* TIPO */}
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        className="border p-2 w-full bg-yellow-300 text-black rounded"
      >
        <option value="fase">Fase de Grupos</option>
        <option value="semi">Semifinal</option>
        <option value="final">Final</option>
      </select>

      {/* PLACAR */}
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Gols Casa"
          value={golsCasa ?? ""}
          onChange={(e) =>
            setGolsCasa(e.target.value === "" ? null : Number(e.target.value))
          }
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Gols Fora"
          value={golsFora ?? ""}
          onChange={(e) =>
            setGolsFora(e.target.value === "" ? null : Number(e.target.value))
          }
          className="border p-2 w-full"
        />
      </div>

      {/* RODADA */}
      <input
        type="number"
        value={rodada}
        onChange={(e) => setRodada(Number(e.target.value))}
        className="border p-2 w-full"
      />

      {/* DATA */}
      <input
        type="datetime-local"
        value={dataInput}
        onChange={(e) => setDataInput(e.target.value)}
        className="border p-2 w-full"
      />

      {/* ESTÁDIO */}
      <select
        value={estadio}
        onChange={(e) => setEstadio(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Selecione o estádio</option>

        {getEstadios().map((est, i) => (
          <option key={i} value={est}>
            {est}
          </option>
        ))}
      </select>

      {/* BOTÃO */}
      <button
        onClick={salvarJogo}
        className="bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        {editIndex !== null ? "Atualizar Jogo" : "Salvar Jogo"}
      </button>

      {/* LISTA */}
      <div className="bg-white p-4 rounded shadow text-black">
        <h2 className="font-bold mb-3">Jogos</h2>

        {jogos.map((j, i) => {
          const casaTime = times.find(t => t.id === j.casa || t.nome === j.casa);
          const foraTime = times.find(t => t.id === j.fora || t.nome === j.fora);

          return (
            <div key={i} className="flex justify-between border-b py-2">
              <span>
                {casaTime?.nome || j.casa} {j.golsCasa} x {j.golsFora} {foraTime?.nome || j.fora}
                {" "}({j.competicao})
              </span>

              <div className="flex gap-2">
                <button onClick={() => editarJogo(j)} className="bg-yellow-500 px-2 py-1 text-white rounded">
                  Editar
                </button>

                <button onClick={() => excluirJogo(j.id)} className="bg-red-600 px-2 py-1 text-white rounded">
                  Excluir
                </button>


              </div>
            </div>
          );
        })}
      </div>




    </div>
  );

}
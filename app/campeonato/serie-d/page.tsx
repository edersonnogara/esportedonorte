"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { times } from "@/data/times";

type Jogo = {
  id: string;
  casa: string;
  fora: string;
  golsCasa: number;
  golsFora: number;
  rodada: number;
  data: string;
  estadio: string;
  competicao: string;
  grupo: string;
  link_youtube?: string;
};

type TimeTabela = {
  nome: string;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  gp: number;
  gc: number;
  saldo: number;
};

export default function SerieDPage() {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [rodadaAtual, setRodadaAtual] = useState<number>(0);
  // 🔥 CARREGAR DO BANCO  
  async function carregarJogos() {
    const { data, error } = await supabase
      .from("jogos")
      .select("*")
      .eq("competicao", "SerieD");

    if (error) {
      console.error(error);
      return;
    }

    const formatado: Jogo[] = data.map((j: any) => ({
      id: j.id,
      casa: j.casa,
      fora: j.fora,
      golsCasa: j.gols_casa,
      golsFora: j.gols_fora,
      rodada: j.rodada,
      data: j.data,
      estadio: j.estadio,
      competicao: j.competicao,
      grupo: j.grupo,
      link_youtube: j.link_youtube
    }));

    setJogos(formatado);

    const ultimaRodada = formatado.length
      ? Math.max(...formatado.map(j => j.rodada))
      : 1;
    setRodadaAtual(ultimaRodada);
  }

  useEffect(() => {
    carregarJogos();
  }, []);

  // 🔧 NORMALIZAR
  function normalizar(nome: string): string {
    return nome?.toLowerCase().trim();
  }

  function getTime(nome: string) {
    return times.find(
      (t) => normalizar(t.nome) === normalizar(nome)
    );
  }

  // 🔹 TIMES POR GRUPO
  function getTimesGrupo(grupo: string) {
    return times.filter((t) =>
      t.competicoes?.some(
        (c) => c.nome === "Brasileirao Serie D" && c.grupo === "A2"
      )
    );
  }



  // 🔥 GERAR TABELA TIPADA
  function gerarTabelaGrupo(grupo: string): TimeTabela[] {
    const tabela: Record<string, TimeTabela> = {};
    const timesGrupo = getTimesGrupo(grupo);

    timesGrupo.forEach((t) => {
      tabela[t.nome] = {
        nome: t.nome,
        pontos: 0,
        jogos: 0,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        gp: 0,
        gc: 0,
        saldo: 0,
      };
    });

    jogos.forEach((j: Jogo) => {

      // ❌ IGNORA JOGO SEM RESULTADO
      if (j.golsCasa == null || j.golsFora == null) return;

      const chaveCasa = Object.keys(tabela).find(
        (k) => normalizar(k) === normalizar(j.casa)
      );

      const chaveFora = Object.keys(tabela).find(
        (k) => normalizar(k) === normalizar(j.fora)
      );

      if (!chaveCasa || !chaveFora) return;

      const casa = tabela[chaveCasa];
      const fora = tabela[chaveFora];

      casa.jogos++;
      fora.jogos++;

      casa.gp += j.golsCasa;
      casa.gc += j.golsFora;

      fora.gp += j.golsFora;
      fora.gc += j.golsCasa;

      casa.saldo = casa.gp - casa.gc;
      fora.saldo = fora.gp - fora.gc;

      if (j.golsCasa > j.golsFora) {
        casa.pontos += 3;
        casa.vitorias++;
        fora.derrotas++;
      } else if (j.golsFora > j.golsCasa) {
        fora.pontos += 3;
        fora.vitorias++;
        casa.derrotas++;
      } else {
        casa.pontos++;
        fora.pontos++;
        casa.empates++;
        fora.empates++;
      }
    });

    return Object.values(tabela).sort(
      (a, b) =>
        b.pontos - a.pontos ||
        b.saldo - a.saldo ||
        b.gp - a.gp
    );
  }

  function gerarTabela(jogosGrupo: Jogo[]) {
    const tabela: any = {};

    jogosGrupo.forEach(j => {
      if (!tabela[j.casa]) {
        tabela[j.casa] = { nome: j.casa, pontos: 0, saldo: 0 };
      }

      if (!tabela[j.fora]) {
        tabela[j.fora] = { nome: j.fora, pontos: 0, saldo: 0 };
      }

      if (j.golsCasa == null || j.golsFora == null) return;

      tabela[j.casa].saldo += j.golsCasa - j.golsFora;
      tabela[j.fora].saldo += j.golsFora - j.golsCasa;

      if (j.golsCasa > j.golsFora) {
        tabela[j.casa].pontos += 3;
      } else if (j.golsFora > j.golsCasa) {
        tabela[j.fora].pontos += 3;
      } else {
        tabela[j.casa].pontos += 1;
        tabela[j.fora].pontos += 1;
      }
    });

    return Object.values(tabela).sort(
      (a: any, b: any) => b.pontos - a.pontos || b.saldo - a.saldo
    );
  }

  // 🔄 AGRUPAR POR RODADA
  function agruparPorRodada(jogos: Jogo[]) {
    const grupos: Record<number, Jogo[]> = {};

    jogos.forEach((j) => {
      if (!grupos[j.rodada]) {
        grupos[j.rodada] = [];
      }
      grupos[j.rodada].push(j);
    });

    return Object.keys(grupos)
      .sort((a, b) => Number(a) - Number(b))
      .reduce((acc: Record<number, Jogo[]>, key) => {
        acc[Number(key)] = grupos[Number(key)];
        return acc;
      }, {});
  }
  // 🏆 CLASSIFICADOS
  function getClassificados(grupo: string): TimeTabela[] {
    return gerarTabelaGrupo(grupo).slice(0, 4);
  }

  // ================= DADOS =================
  const tabelaA = gerarTabelaGrupo("A2");
  const tabelaB = gerarTabelaGrupo("B");

  const jogosA = jogos.filter((j: Jogo) =>
    getTimesGrupo("A").some(
      (t) =>
        normalizar(t.nome) === normalizar(j.casa) ||
        normalizar(t.nome) === normalizar(j.fora)
    )
  );

  const jogosB = jogos.filter((j: Jogo) =>
    getTimesGrupo("B").some(
      (t) =>
        normalizar(t.nome) === normalizar(j.casa) ||
        normalizar(t.nome) === normalizar(j.fora)
    )
  );

  const rodadasA = agruparPorRodada(jogosA);
  const rodadasB = agruparPorRodada(jogosB);

  const classificadosA = getClassificados("A").slice(0, 2);
  const classificadosB = getClassificados("B").slice(0, 2);

  const semi = [
    { casa: classificadosA[0]?.nome, fora: classificadosB[1]?.nome },
    { casa: classificadosB[0]?.nome, fora: classificadosA[1]?.nome },
  ];
  const [rodadaAtualA, setRodadaAtualA] = useState(0);
  const listaRodadasA = Object.keys(rodadasA).map(Number);

  const rodadaAnteriorA = () => {
    setRodadaSelecionadaA((r) => Math.max(r - 1, 1));
  };

  const proximaRodadaA = () => {
    setRodadaSelecionadaA((r) =>
      Math.min(r + 1, Object.keys(rodadasA).length)
    );
  };

  const rodadaAnteriorB = () => {
    setRodadaSelecionadaB((r) => Math.max(r - 1, 1));
  };

  const proximaRodadaB = () => {
    setRodadaSelecionadaB((r) =>
      Math.min(r + 1, Object.keys(rodadasB).length)
    );
  };

  const [rodadaSelecionadaA, setRodadaSelecionadaA] = useState(1);
  const [rodadaSelecionadaB, setRodadaSelecionadaB] = useState(1);

  // ================= UI =================
  return (
    <div className="p-6 space-y-8">

      <h1 className="text-2xl font-bold text-white">
        Brasileirão Série D - Grupo dos Times de Rondônia
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* 🔥 TABELA */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-3 text-black">Classificação Grupo A2</h2>

          <div className="grid grid-cols-7 font-bold border-b pb-2 text-sm text-black">
            <span>#</span>
            <span className="col-span-2">Time</span>
            <span>Pts</span>
            <span>J</span>
            <span>SG</span>
            <span>GP</span>
          </div>

          {tabelaA.map((t, i) => {
            const info = getTime(t.nome);

            return (
              <div
                key={i}
                className={`grid grid-cols-7 p-2 border-b text-sm text-black
                ${i < 4 ? "bg-green-100 font-bold" : ""}
              `}
              >
                <span>{i + 1}</span>

                <div className="col-span-2 flex items-center gap-2">
                  <img src={info?.logo} className="w-5 h-5" />
                  {t.nome}
                </div>

                <span>{t.pontos}</span>
                <span>{t.jogos}</span>
                <span>{t.saldo}</span>
                <span>{t.gp}</span>
              </div>
            );
          })}
        </div>

        {/* 🔥 JOGOS */}
        <div className="bg-white p-4 rounded-xl">
          <h3 className="font-bold text-black mb-3">Jogos Grupo A2</h3>

          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={rodadaAnteriorA}
              className="px-3 py-1 text-green-700 rounded"
            >
              ◀
            </button>

            <h3 className="font-bold text-green-700">
              {rodadaSelecionadaA}ª Rodada
            </h3>

            <button
              onClick={proximaRodadaA}
              className="px-3 py-1 text-green-700 rounded"
            >
              ▶
            </button>
          </div>
          {/* 🔥 MOSTRA APENAS UMA RODADA */}
          {rodadasA[rodadaSelecionadaA]?.map((j: Jogo, i: number) => {
            const casa = getTime(j.casa);
            const fora = getTime(j.fora);

            return (
              <div key={i} className="border-b py-3 text-black text-sm">

                {/* DATA CENTRALIZADA */}
                <div className="text-center text-xs text-gray-600 mb-2">
                  {j.data
                    ? new Date(j.data).toLocaleString("pt-BR")
                    : "Sem data"}
                  {j.estadio && ` • ${j.estadio}`}



                </div>

                {/* LINHA DO JOGO */}
                <div className="grid grid-cols-4 items-center">

                  <div className="flex items-center gap-2 justify-end pr-2">
                    <span>{casa?.nome || j.casa}</span>
                    {casa?.logo ? (
                      <img src={casa.logo} className="w-5 h-5" />
                    ) : (
                      <div className="w-5 h-5 bg-gray-300 rounded" />
                    )}
                  </div>

                  <div className="text-center font-bold">
                    {j.golsCasa == null || j.golsFora == null
                      ? "vs"
                      : `${j.golsCasa} x ${j.golsFora}`}
                  </div>

                  <div className="flex items-center gap-2 pl-2">
                    {fora?.logo ? (
                      <img src={fora.logo} className="w-5 h-5" />
                    ) : (
                      <div className="w-5 h-5 bg-gray-300 rounded" />
                    )}
                    <span>{fora?.nome || j.fora}</span>
                  </div>
                  {j.link_youtube && (
                    <div className="text-center mt-2">
                      <a
                        href={j.link_youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 font-bold underline hover:text-red-800"
                      >
                        ▶ Assista
                      </a>
                    </div>
                  )}


                  
                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}
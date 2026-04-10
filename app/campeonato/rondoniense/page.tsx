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
};

export default function Rondoniense() {

    const [jogos, setJogos] = useState<Jogo[]>([]);

    // 🔥 BUSCAR DO BANCO
    const carregarJogos = async () => {
        const { data, error } = await supabase
            .from("jogos")
            .select("*")
            .eq("competicao", "Rondoniense");

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
            data: j.data,
            estadio: j.estadio,
            competicao: j.competicao
        }));

        setJogos(formatado);
    };

    useEffect(() => {
        carregarJogos();

        const channel = supabase
            .channel("jogos-realtime")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "jogos",
                },
                () => {
                    carregarJogos();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // 🔥 GERAR TABELA
    function gerarTabela() {
        const tabela: any = {};
        const timesCampeonato = getTimesPorCompeticao("Rondoniense");

        // 🔥 cria tabela com nomes normalizados
        timesCampeonato.forEach((t) => {
            tabela[normalizar(t.nome)] = {
                nome: t.nome,
                pontos: 0,
                saldo: 0,
                vitorias: 0,
            };
        });

        jogos
            .filter(j => j.competicao === "Rondoniense" && j.rodada <= 20)
            .forEach((j) => {

                const casaKey = normalizar(j.casa);
                const foraKey = normalizar(j.fora);

                const casa = tabela[casaKey];
                const fora = tabela[foraKey];

                // 🔥 evita quebrar e mostra erro real
                if (!casa || !fora) {
                    console.warn("Time não encontrado:", j.casa, j.fora);
                    return;
                }

                casa.saldo += j.golsCasa - j.golsFora;
                fora.saldo += j.golsFora - j.golsCasa;

                if (j.golsCasa > j.golsFora) {
                    casa.pontos += 3;
                    casa.vitorias += 1;
                } else if (j.golsFora > j.golsCasa) {
                    fora.pontos += 3;
                    fora.vitorias += 1;
                } else {
                    casa.pontos += 1;
                    fora.pontos += 1;
                }
            });

        return Object.values(tabela).sort(
            (a: any, b: any) =>
                b.pontos - a.pontos ||
                b.vitorias - a.vitorias ||
                b.saldo - a.saldo
        );
    }

    const tabela = gerarTabela();

    function getTime(nome: string) {
        if (!nome) return null;

        return times.find(
            (t) => normalizar(t.nome) === normalizar(nome)
        );
    }

    function gerarSemifinais(tabela: any[]) {
        if (tabela.length < 4) return null;

        const semi1 = {
            ida: { casa: tabela[3].nome, fora: tabela[0].nome },
            volta: { casa: tabela[0].nome, fora: tabela[3].nome }
        };

        const semi2 = {
            ida: { casa: tabela[2].nome, fora: tabela[1].nome },
            volta: { casa: tabela[1].nome, fora: tabela[2].nome }
        };

        return { semi1, semi2 };
    }

    function buscarJogosConfronto(timeA: string, timeB: string) {
        return jogos.filter(
            (j) =>
                (j.casa === timeA && j.fora === timeB) ||
                (j.casa === timeB && j.fora === timeA)
        );
    }

    function calcularAgregado(jogosConfronto: Jogo[], timeA: string, timeB: string) {
        if (!jogosConfronto || jogosConfronto.length === 0) {
            return "0 x 0";
        }

        let golsA = 0;
        let golsB = 0;

        jogosConfronto.forEach((j) => {
            if (j.casa === timeA) {
                golsA += j.golsCasa;
                golsB += j.golsFora;
            } else {
                golsA += j.golsFora;
                golsB += j.golsCasa;
            }
        });

        return `${golsA} x ${golsB}`;
    }

    function definirVencedor(jogosConfronto: Jogo[], timeA: string, timeB: string) {
        if (!jogosConfronto || jogosConfronto.length === 0) {
            return "A definir";
        }

        let golsA = 0;
        let golsB = 0;

        jogosConfronto.forEach((j) => {
            if (j.casa === timeA) {
                golsA += j.golsCasa;
                golsB += j.golsFora;
            } else {
                golsA += j.golsFora;
                golsB += j.golsCasa;
            }
        });

        if (golsA > golsB) return timeA;
        if (golsB > golsA) return timeB;

        return "Empate";
    }

    const semis = gerarSemifinais(tabela);

    function gerarFinal(semis: any) {
        if (!semis) return null;

        const jogos1 = buscarJogosConfronto(
            semis.semi1.ida.casa,
            semis.semi1.ida.fora
        );

        const jogos2 = buscarJogosConfronto(
            semis.semi2.ida.casa,
            semis.semi2.ida.fora
        );

        const vencedor1 = definirVencedor(
            jogos1,
            semis.semi1.ida.casa,
            semis.semi1.ida.fora
        );

        const vencedor2 = definirVencedor(
            jogos2,
            semis.semi2.ida.casa,
            semis.semi2.ida.fora
        );

        if (
            vencedor1 === "A definir" ||
            vencedor2 === "A definir" ||
            vencedor1 === "Empate" ||
            vencedor2 === "Empate"
        ) {
            return null;
        }

        return { casa: vencedor1, fora: vencedor2 };
    }



    const final = semis ? gerarFinal(semis) : null;



    function agruparPorRodada(jogos: any[]) {
        const grupos: any = {};

        jogos.forEach((j) => {
            if (!j.rodada) return;

            if (!grupos[j.rodada]) {
                grupos[j.rodada] = [];
            }

            grupos[j.rodada].push(j);
        });

        // ordenar rodadas (1, 2, 3...)
        return Object.keys(grupos)
            .sort((a, b) => Number(a) - Number(b))
            .reduce((acc: any, key) => {
                acc[key] = grupos[key];
                return acc;
            }, {});
    }


    const jogosFase = jogos.filter((j) => j.rodada <= 20);
    const rodadas = agruparPorRodada(jogosFase);

    function getTimesPorCompeticao(nome: string) {
        return times.filter(t =>
            t.competicoes?.some(c => c.nome === nome)
        );
    }


    function normalizar(nome: string) {
        return nome
            ?.toLowerCase()
            .trim()
            .replace("-", " ")
            .replace("ã", "a")
            .replace("ç", "c");
    }

    const jogosSemi = jogos.filter(j => j.rodada === 90);
    const rodadasSemi = agruparPorRodada(jogosSemi);

    //______________________________________________________________
    return (
        <div className="p-6 space-y-6">

            <h1 className="text-xl font-bold text-white">
                Campeonato Rondoniense
            </h1>

            {/* TABELA */}
            <div className="bg-white p-2 rounded-xl shadow">

                <h2 className="font-bold mb-3 text-black">
                    Classificação 1° Fase
                </h2>

                <div className="grid grid-cols-6 font-bold border-b pb-2 text-black text-sm">
                    <span>#</span>
                    <span className="col-span-2">Time</span>
                    <span>Pts</span>
                    <span>V</span>
                    <span>SG</span>
                </div>

                {tabela.map((t: any, i) => {
                    const timeInfo = times.find(
                        (x) => x.nome === t.nome
                    );

                    return (
                        <div
                            key={i}
                            className={`grid grid-cols-6 items-center p-2 border-b text-black text-sm
                                        ${i < 4 ? "bg-blue-100" : ""} 
                                        ${i === tabela.length - 1 ? "bg-red-100" : ""}
                                        `}
                        >
                            <span>{i + 1}</span>

                            <span className="col-span-2 flex items-center gap-2 font-medium">
                                <img src={timeInfo?.logo} className="w-5" />
                                {t.nome}
                            </span>

                            <span>{t.pontos}</span>
                            <span>{t.vitorias}</span>
                            <span>{t.saldo}</span>
                        </div>
                    );
                })}
            </div>

            {/* JOGOS POR RODADA */}
            <div className="bg-white p-4 rounded-xl">
                <h2 className="font-bold mb-3 text-black">
                    Jogos 1° Fase
                </h2>

                {Object.keys(rodadas).length === 0 && (
                    <p className="text-gray-400">Nenhum jogo cadastrado</p>
                )}

                {Object.keys(rodadas).map((r) => (
                    <div key={r} className="mb-4">

                        <h3 className="font-bold text-green-700 mb-2">
                            {r}ª Rodada
                        </h3>

                        {rodadas[r].map((j: any, i: number) => {

                            const casa = getTime(j.casa);
                            const fora = getTime(j.fora);

                            return (
                                <div
                                    key={i}
                                    className="grid grid-cols-4 items-center p-2 border-b text-black text-sm"
                                >

                                    {/* DATA + ESTÁDIO */}
                                    <div className="text-gray-600 text-xs">
                                        {j.data
                                            ? `${new Date(j.data).toLocaleString("pt-BR")} • ${j.estadio}`
                                            : "Data não informada"}
                                    </div>

                                    {/* CASA */}
                                    <div className="flex items-center gap-2 justify-end pr-2">
                                        <span>{casa?.nome || j.casa}</span>

                                        {casa?.logo ? (
                                            <img src={casa.logo} className="w-5 h-5" />
                                        ) : (
                                            <div className="w-5 h-5 bg-gray-300 rounded" />
                                        )}
                                    </div>

                                    {/* PLACAR */}
                                    <div className="text-center font-bold">
                                        {j.golsCasa == null || j.golsFora == null
                                            ? "vs"
                                            : `${j.golsCasa} x ${j.golsFora}`}
                                    </div>

                                    {/* FORA */}
                                    <div className="flex items-center gap-2 pl-2">
                                        {fora?.logo ? (
                                            <img src={fora.logo} className="w-5 h-5" />
                                        ) : (
                                            <div className="w-5 h-5 bg-gray-300 rounded" />
                                        )}

                                        <span>{fora?.nome || j.fora}</span>
                                    </div>

                                </div>
                            );
                        })}

                    </div>
                ))}
            </div>

            {/* 🔴 SEMIFINAIS */}
            <div className="bg-white p-4 rounded-xl">
                <h2 className="font-bold mb-3 text-black">
                    Semifinais
                </h2>

                {Object.keys(rodadasSemi).length === 0 && (
                    <p className="text-gray-400">Nenhum jogo cadastrado</p>
                )}

                {Object.keys(rodadasSemi).map((r) => (
                    <div key={r} className="mb-4">

                        <h3 className="font-bold text-green-700 mb-2">
                            {r === "90" ? "Ida" : "Volta"}
                        </h3>

                        {rodadasSemi[r].map((j: Jogo, i: number) => {

                            const casa = getTime(j.casa);
                            const fora = getTime(j.fora);

                            return (
                                <div
                                    key={i}
                                    className="grid grid-cols-4 items-center p-2 border-b text-black text-sm"
                                >

                                    {/* DATA + ESTÁDIO */}
                                    <div className="text-gray-600 text-xs">
                                        {j.data
                                            ? `${new Date(j.data).toLocaleString("pt-BR")} • ${j.estadio}`
                                            : "Data não informada"}
                                    </div>

                                    {/* CASA */}
                                    <div className="flex items-center gap-2 justify-end pr-2">
                                        <span>{casa?.nome || j.casa}</span>

                                        {casa?.logo ? (
                                            <img src={casa.logo} className="w-5 h-5" />
                                        ) : (
                                            <div className="w-5 h-5 bg-gray-300 rounded" />
                                        )}
                                    </div>

                                    {/* PLACAR */}
                                    <div className="text-center font-bold">
                                        {j.golsCasa == null || j.golsFora == null
                                            ? "vs"
                                            : `${j.golsCasa} x ${j.golsFora}`}
                                    </div>

                                    {/* FORA */}
                                    <div className="flex items-center gap-2 pl-2">
                                        {fora?.logo ? (
                                            <img src={fora.logo} className="w-5 h-5" />
                                        ) : (
                                            <div className="w-5 h-5 bg-gray-300 rounded" />
                                        )}

                                        <span>{fora?.nome || j.fora}</span>
                                    </div>

                                </div>
                            );
                        })}

                    </div>
                ))}
            </div>

            {
                final && (
                    <div className="bg-yellow-100 p-4 rounded-xl shadow">
                        <h2 className="font-bold mb-3 text-black">Final</h2>

                        <p className="font-bold text-lg">
                            {final.casa} x {final.fora}
                        </p>
                    </div>
                )
            }

        </div>
    );
}
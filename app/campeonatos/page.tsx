"use client";
import { useState, useEffect } from "react";
import { times } from "@/data/times";

type Jogo = {
    casa: string;
    fora: string;
    golsCasa: number;
    golsFora: number;
    rodada: number;
    tipo: "fase" | "semi" | "final";
    confronto: number;
    data: string;
    estadio: string;
};

export default function Campeonatos() {

    const [ativo, setAtivo] = useState("Rondoniense");
    const [jogos, setJogos] = useState<Jogo[]>([]);

    // ✅ AGORA ESTÁ CORRETO
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("jogos") || "[]");
        setJogos(data as Jogo[]);
    }, []);

    const faseGrupos = jogos.filter((j) => j.rodada <= 20);
    const semifinais = jogos.filter((j) => j.rodada === 90);
    const final = jogos.filter((j) => Number(j.rodada) === 95);


    // 🧮 TABELA
    function gerarTabela() {
        const tabela: any = {};

        times.forEach((t) => {
            tabela[t.nome] = {
                time: t.nome,
                pontos: 0,
                vitorias: 0,
                saldo: 0,
            };
        });

        jogos
            .filter((j) => j.rodada <= 20) // só fase de grupos
            .forEach((j) => {
                const casa = tabela[j.casa];
                const fora = tabela[j.fora];

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
                b.pontos - a.pontos || b.saldo - a.saldo
        );
    }

    const tabela = gerarTabela();

    // 🧠 AGRUPAR POR RODADA (NOVO 🔥)
    function agruparPorRodada(jogos: Jogo[]) {
        const grupos: any = {};

        jogos
            .filter((j) => j.rodada <= 20) // só fase de grupos
            .forEach((j) => {
                if (!grupos[j.rodada]) {
                    grupos[j.rodada] = [];
                }
                grupos[j.rodada].push(j);
            });

        // 🔥 ordenar rodadas (maior primeiro)
        const ordenado = Object.keys(grupos)
            .sort((a, b) => Number(b) - Number(a))
            .reduce((acc: any, key) => {
                acc[key] = grupos[key];
                return acc;
            }, {});

        return ordenado;
    }

    const rodadas = agruparPorRodada(faseGrupos);
    const rodadasSemi = agruparPorRodada(semifinais);
    const rodadasFinal = agruparPorRodada(final);




    const finalJogos = final;

    function calcularAgregado(jogos: any[]) {
        let totalCasa = 0;
        let totalFora = 0;

        jogos.forEach((j) => {
            totalCasa += j.golsCasa;
            totalFora += j.golsFora;
        });

        return `${totalCasa} x ${totalFora}`;
    }

    return (
        <div className="space-y-6">

            <h1 className="text-2xl font-bold text-white">
                Campeonatos
            </h1>

            {/* ABAS */}
            <div className="flex gap-4">
                {["Rondoniense", "Copa Verde", "Série D"].map((c) => (
                    <button
                        key={c}
                        onClick={() => setAtivo(c)}
                        className={`px-4 py-2 rounded ${ativo === c
                            ? "bg-green-700 text-white"
                            : "bg-gray-200 text-black"
                            }`}
                    >
                        {c}
                    </button>
                ))}
            </div>

            {/* RONDONIENSE */}
            {ativo === "Rondoniense" && (
                <div className="grid gap-6">
                    <h3 className="font-bold text-green-700 mb-2 border-l-4 border-green-700 pl-2">
                        Destaque da Rodada
                    </h3>

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
                            const timeInfo = times.find((time) => time.nome === t.time);

                            return (
                                <div
                                    key={i}
                                    className={`grid grid-cols-6 items-center p-2 border-b text-black text-sm
                                        ${i < 4 ? "bg-blue-100" : ""} 
                                        ${i === tabela.length - 1 ? "bg-red-100" : ""}
                                        `}
                                >
                                    <span>{i + 1}</span>

                                    <div className="col-span-2 flex items-center gap-2 font-medium">
                                        <img src={timeInfo?.logo} className="w-5 h-5" />
                                        <span>{t.time}</span>
                                    </div>

                                    <span>{t.pontos}</span>
                                    <span>{t.vitorias}</span>
                                    <span>{t.saldo}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* JOGOS POR RODADA 🔥 */}
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="font-bold mb-3 text-black">
                            Jogos 1° Fase
                        </h2>

                        {Object.keys(rodadas).map((r) => (
                            <div key={r} className="mb-4">

                                <h3 className="font-bold text-green-700 mb-2">
                                    {r}ª Rodada
                                </h3>

                                {rodadas[r].map((j: Jogo, i: number) => {
                                    const casa = times.find((t) => t.nome === j.casa);
                                    const fora = times.find((t) => t.nome === j.fora);

                                    return (
                                        <div
                                            key={i}
                                            className="grid grid-cols-4 items-center p-2 border-b text-black text-sm"
                                        >
                                            {/* DATA + ESTÁDIO NA MESMA LINHA */}
                                            <div className="text-xs text-gray-700">
                                                {new Date(j.data).toLocaleString("pt-BR")}
                                                <span className="text-gray-600"> • {j.estadio}</span>
                                            </div>

                                            {/* CASA */}
                                            <div className="flex items-center gap-2 justify-end pr-2">
                                                <span>{j.casa}</span>
                                                <img src={casa?.logo} className="w-5 h-5" />
                                            </div>

                                            {/* PLACAR */}
                                            <div className="text-center font-bold">
                                                {j.golsCasa === undefined && j.golsFora === undefined
                                                    ? "vs"
                                                    : `${j.golsCasa} x ${j.golsFora}`}
                                            </div>

                                            {/* FORA */}
                                            <div className="flex items-center gap-2 pl-2">
                                                <img src={fora?.logo} className="w-5 h-5" />
                                                <span>{j.fora}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* 🔴 SEMIFINAL */}
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="font-bold mb-3 text-black">
                            Semifinal
                        </h2>

                        <h3 className="font-bold text-green-700 mb-2">
                            Fase Eliminatória
                        </h3>

                        {semifinais.length === 0 && (
                            <p className="text-gray-400">Nenhum jogo cadastrado</p>
                        )}

                        {semifinais.map((j, i) => {
                            const casa = times.find((t) => t.nome === j.casa);
                            const fora = times.find((t) => t.nome === j.fora);
                            const semiFinal = jogos.filter((j) => j.rodada === 90);
                            // separa confrontos
                            const semi1 = semiFinal.filter((j) => j.confronto === 1);
                            const semi2 = semiFinal.filter((j) => j.confronto === 2);






                            return (
                                <div
                                    key={i}
                                    className="grid grid-cols-4 items-center p-2 border-b text-black text-sm"
                                >
                                    {/* DATA + ESTÁDIO */}
                                    <div className="text-xs text-gray-700">
                                        {new Date(j.data).toLocaleString("pt-BR")}
                                        <span className="text-gray-600"> • {j.estadio}</span>
                                    </div>

                                    {/* CASA */}
                                    <div className="flex items-center gap-2 justify-end pr-2">
                                        <span>{j.casa}</span>
                                        <img src={casa?.logo} className="w-5 h-5" />
                                    </div>

                                    {/* PLACAR */}
                                    <div className="text-center font-bold">
                                        {j.golsCasa === null || j.golsFora === null
                                            ? "vs"
                                            : `${j.golsCasa} x ${j.golsFora}`}
                                    </div>

                                    {/* FORA */}
                                    <div className="flex items-center gap-2 pl-2">
                                        <img src={fora?.logo} className="w-5 h-5" />
                                        <span>{j.fora}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* 🟡 FINAL */}
                    {final.length > 0 && (
                        <div className="bg-white p-4 rounded-xl shadow">

                            <h2 className="font-bold mb-3 text-black">
                                Final
                            </h2>

                            <h3 className="font-bold text-green-700 mb-2">
                                Fase Eliminatória
                            </h3>

                            {final.map((j: Jogo, i: number) => {
                                const casa = times.find((t) => t.nome === j.casa);
                                const fora = times.find((t) => t.nome === j.fora);

                                return (
                                    <div
                                        key={i}
                                        className="grid grid-cols-4 items-center p-2 border-b text-black text-sm"
                                    >
                                        {/* DATA + ESTÁDIO */}
                                        <div className="text-xs text-gray-700">
                                            {j.data
                                                ? new Date(j.data).toLocaleString("pt-BR")
                                                : "Data a definir"}
                                            <span className="text-gray-600">
                                                {" "}• {j.estadio || "Local a definir"}
                                            </span>
                                        </div>

                                        {/* CASA */}
                                        <div className="flex items-center gap-2 justify-end pr-2">
                                            <span>{j.casa}</span>
                                            <img src={casa?.logo} className="w-5 h-5" />
                                        </div>

                                        {/* PLACAR */}
                                        <div className="text-center font-bold">
                                            {j.golsCasa === null || j.golsFora === null
                                                ? "vs"
                                                : `${j.golsCasa} x ${j.golsFora}`}
                                        </div>

                                        {/* FORA */}
                                        <div className="flex items-center gap-2 pl-2">
                                            <img src={fora?.logo} className="w-5 h-5" />
                                            <span>{j.fora}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}
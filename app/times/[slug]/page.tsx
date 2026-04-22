// app/times/[slug]/page.tsx

import Image from "next/image";
import { notFound } from "next/navigation";

type Time = {
  nome: string;
  fundacao: string;
  cidade: string;
  estadio: string;
  capacidade: string;
  cores: string;
  competicao: string;
  titulos: string;
  descricao: string;
};

const times: Record<string, Time> = {
  "guapore-fc": {
    nome: "Guaporé Futebol Clube",
    fundacao: "21 de abril de 2014",
    cidade: "Rolim de Moura - RO",
    estadio: "Cassolão",
    capacidade: "7.300",
    cores: "Laranja, verde e branco",
    competicao: "Campeonato Rondoniense",
    titulos: "Campeão Rondoniense 2026",
    descricao:
      "O Guaporé Futebol Clube é um clube brasileiro sediado em Rolim de Moura, Rondônia. Fundado em 2014, suas cores são laranja, verde e branco.",
  },
};

export default async function TimePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 🔥 AGORA PRECISA DISSO
  const { slug } = await params;

  const time = times[slug];

  if (!time) {
    return notFound();
  }

  return (
    <div className="max-w-6xl mx-auto p-4">

      <h1 className="text-3xl font-bold border-b-4 border-orange-500 pb-2 mb-4">
        {time.nome}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* INFO BOX */}
        <div className="text-black bg-gray-100 p-4 rounded-xl shadow">
          <Image
            src={`/times/${slug}.png`}
            alt={time.nome}
            width={300}
            height={300}
            className="mb-4 mx-auto"
          />

          <h2 className="text-black xl font-black text-center mb-3">
            {time.nome}
          </h2>

          <p><b>Fundação:</b> {time.fundacao}</p>
          <p><b>Cidade:</b> {time.cidade}</p>
          <p><b>Estádio:</b> {time.estadio}</p>
          <p><b>Capacidade:</b> {time.capacidade}</p>
          <p><b>Cores:</b> {time.cores}</p>
          <p><b>Competição:</b> {time.competicao}</p>
          <p><b>Titulos:</b> {time.titulos}</p>

        </div>

        {/* CONTEÚDO */}
        <div className="md:col-span-2">

          <section className="mb-6">
            <p>{time.descricao}</p>
          </section>

        </div>
      </div>
    </div>
  );
}
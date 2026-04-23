"use client";

import { useParams } from "next/navigation";
import { times } from "@/data/times";

export default function TimePage() {
    const params = useParams();
    const id = params.id as string;

    const time = times.find((t) => t.id === id);

    if (!time) {
        return <div className="p-6 text-white">Time não encontrado</div>;
    }

    return (
        <div className="p-6 space-y-6">

            <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
                <img src={time.logo} className="w-16 h-16" />

                <div>
                    <h1 className="text-2xl font-bold text-black">
                        {time.nome}
                    </h1>

                    <p className="text-sm text-gray-600">
                        {time.cidade} - {time.estado}
                    </p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow text-black space-y-2">
                <p><b>Estádio:</b> {time.estadio}</p>
                
            </div>

            {/* 🔥 FUTURO */}
            <div className="bg-gray-100 p-4 rounded-xl text-gray-600">
                Em breve: jogos, elenco e notícias do clube
            </div>


        </div>
    );
}
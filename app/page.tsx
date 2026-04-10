// Futebol do Norte - Layout estilo Globo Esporte
// Next.js + Tailwind + mock data (versão evoluída)
"use client";
import { useEffect, useState } from "react";


function Highlight() {
  return (
    <div className="bg-green-700 text-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-2">
        Campeonato Rondoniense 2026
      </h2>
      <p className="text-green-100">
        Destaques
      </p>
    </div>
  );
}

function Destaques() {
  return (
    <div className="bg-white text-green-800 p-4 rounded-xl shadow">
      <div className="flex justify-between font-bold text-sm text-white-700">
        <span>Hoje - 19:00</span>
        <span className="text-green-800 font-bold">AO VIVO</span>
      </div>
      <p className="mt-2 font-semibold">
        Porto Velho x Ji-Paraná
      </p>
      <p className="text-lg font-bold mt-1">1 x 0</p>
    </div>
  );
}

export default function Home() {

  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("noticias") || "[]");
    setNoticias(data);
  }, []);

  return (
    <div className="bg-gray min-h-screen">

      <main className="p-6 space-y-6 max-w-6xl mx-auto">
        <Highlight />
      </main>

      <main className="grid md:grid-cols-3 gap-6 p-6 space-y-6 max-w-6xl mx-auto">
        <Destaques />
      </main>




    </div>
  );
}

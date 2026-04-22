
"use client";
import Link from "next/link";

export default function Campeonatos() {
  return (
    <div className="space-y-6 p-6">

      <h1 className="text-2xl font-bold text-white">
        Campeonatos
      </h1>

      <div className="flex gap-4">
        <Link href="/campeonato/rondoniense" className="bg-green-700 text-white px-4 py-2 rounded">
          Rondoniense
        </Link>

        <Link href="/campeonato/copa-verde" className="bg-green-700 text-white px-4 py-2 rounded">
          Copa Verde
        </Link>

        <Link href="/campeonato/serie-d" className="bg-green-700 text-white px-4 py-2 rounded">
          Série D
        </Link>
      </div>

    </div>
  );
}
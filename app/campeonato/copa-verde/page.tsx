"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { times } from "@/data/times";

export default function CopaVerde() {

  const [jogos, setJogos] = useState<any[]>([]);

  const carregar = async () => {
    const { data } = await supabase
      .from("jogos")
      .select("*")
      .eq("competicao", "Copa Verde");

    setJogos(data || []);
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold">Copa Verde</h1>

      <p className="mt-4">Tabela por grupos funcionando aqui 🔥</p>
    </div>
  );
}
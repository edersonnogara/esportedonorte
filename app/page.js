"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import CardJogo from "../components/CardJogo";

export default function Home() {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    fetchJogos();
  }, []);

  async function fetchJogos() {
    const { data } = await supabase.from("jogos").select("*");
    setJogos(data);
  }

  return (
    <main>
      <h1>⚽ Esporte do Norte</h1>

      <div>
        {jogos?.map((jogo) => (
          <CardJogo key={jogo.id} jogo={jogo} />
        ))}
      </div>
    </main>
  );
}
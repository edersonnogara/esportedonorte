"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminTimes() {

    const [nome, setNome] = useState("");
    const [logo, setLogo] = useState("");
    const [estadio, setEstadio] = useState("");
    const [times, setTimes] = useState<any[]>([]);
    const [editId, setEditId] = useState<string | null>(null);

    const carregarTimes = async () => {
        const { data, error } = await supabase
            .from("times")
            .select("*");

        if (error) {
            console.error(error);
            return;
        }

        setTimes(data);
    };

    useEffect(() => {
        carregarTimes();
    }, []);

    const salvarTime = async () => {

        if (editId) {
            await supabase
                .from("times")
                .update({ nome, logo, estadio })
                .eq("id", editId);

            alert("Atualizado!");
        } else {
            await supabase
                .from("times")
                .insert([{ nome, logo, estadio }]);

            alert("Criado!");
        }

        setNome("");
        setLogo("");
        setEstadio("");
        setEditId(null);

        carregarTimes();
    };

    const editarTime = (t: any) => {
        setNome(t.nome);
        setLogo(t.logo);
        setEstadio(t.estadio);
        setEditId(t.id);
    };

    const excluirTime = async (id: string) => {
        await supabase.from("times").delete().eq("id", id);
        carregarTimes();
    };

    return (
        <div className="p-6 space-y-4">

            <h1 className="text-xl font-bold">Admin Times</h1>

            <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
            <input placeholder="Logo (URL)" value={logo} onChange={e => setLogo(e.target.value)} />
            <input placeholder="Estádio" value={estadio} onChange={e => setEstadio(e.target.value)} />

            <button onClick={salvarTime}>
                {editId ? "Atualizar" : "Cadastrar"}
            </button>

            {times.map(t => (
                <div key={t.id} className="flex gap-2">
                    <span>{t.nome}</span>

                    <button onClick={() => editarTime(t)}>Editar</button>
                    <button onClick={() => excluirTime(t.id)}>Excluir</button>
                </div>
            ))}

        </div>
    );
}
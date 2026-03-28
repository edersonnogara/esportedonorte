"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Noticia = {
    titulo: string;
    resumo: string;
    conteudo: string;
    imagem: string;
    slug: string;
    imagens: string
};

export default function NoticiaPage() {
    const params = useParams();
    const router = useRouter();
    const [noticia, setNoticia] = useState<Noticia | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const admin = localStorage.getItem("admin");

            console.log("ADMIN:", admin); // 🔥 debug

            setIsAdmin(admin === "true");

            const data = JSON.parse(localStorage.getItem("noticias") || "[]");
            const encontrada = data.find((n: Noticia) => n.slug === params.slug);

            setNoticia(encontrada);
        }
    }, [params.slug]);

    const handleLogin = () => {
        if (user === "admin" && senha === "1234") {
            localStorage.setItem("admin", "true");
            setIsAdmin(true);
            setShowLogin(false);

            // ✅ LIMPAR CAMPOS
            setUser("");
            setSenha("");

            alert("Login realizado!");
        } else {
            alert("Usuário ou senha inválidos");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin");
        setIsAdmin(false);
    };


    const handleDelete = () => {
        const data = JSON.parse(localStorage.getItem("noticias") || "[]");
        const filtradas = data.filter((n: Noticia) => n.slug !== params.slug);

        localStorage.setItem("noticias", JSON.stringify(filtradas));

        alert("Notícia excluída!");
        router.push("/");
    };

    if (!noticia) {
        return <p className="p-6">Carregando...</p>;
    }

    return (

        <div className="max-w-4xl mx-auto p-6">

            {/* NAVBAR */}
            <nav className="bg-green-700 rounded-xl text-white shadow">
                <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
                    <h1 className="text-xl font-bold">{noticia.titulo}</h1>
                    <div className="flex gap-6 text-sm">
                        {isAdmin ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-3 py-1 rounded"
                            >
                                Sair
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowLogin(true)}
                                className="bg-green-300 px-3 py-1 rounded"
                            >
                                .
                            </button>
                        )}

                    </div>
                </div>
            </nav>

            {showLogin && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

                    <div className="bg-white p-6 rounded-xl space-y-4 w-80">
                        <h2 className="text-xl font-bold">Login Admin</h2>

                        <input
                            className="w-full border p-2 rounded"
                            placeholder="Usuário"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />

                        <input
                            type="password"
                            className="w-full border p-2 rounded"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <div className="flex justify-between">
                            <button
                                onClick={handleLogin}
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Entrar
                            </button>

                            <button
                                onClick={() => setShowLogin(false)}
                                className="text-gray-500"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>

                </div>
            )}



            {/* TÍTULO */}
            <p className="w-full rounded-xl"></p>
            {/* IMAGEM */}
            <div className="space-y-4 mb-6">
                {Array.isArray(noticia.imagens) && noticia.imagens.map((img, i) => (
                    <img key={i} src={img} className="w-full rounded-xl" />
                ))}
            </div>

            {/* TEXTO */}
            <div className="bg-amber-200 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
              
                <h2 className=" text-xl font-bold text-blue-900 leading-relaxed mb-6">
                    {noticia.resumo}
                </h2>

                <p className="text-black text-justify leading-relaxed mb-6">
                    {noticia.conteudo}
                </p>
            </div>
            {/* BOTÕES */}

            {isAdmin && (
                <div className="flex gap-4">

                    <button
                        onClick={() => router.push(`/admin?edit=${noticia.slug}`)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Editar
                    </button>

                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Excluir
                    </button>

                </div>
            )}
        </div>
    );
}
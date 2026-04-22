import { supabase } from "@/lib/supabase";

export default async function NoticiaPage({ params }: any) {

  const { data } = await supabase
    .from("noticias")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) {
    return <p className="text-white p-6">Notícia não encontrada</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">

      <h1 className="text-2xl font-bold text-white">
        {data.titulo}
      </h1>

      <span className="text-gray-400 text-sm">
        {new Date(data.data).toLocaleString("pt-BR")}
      </span>

      {data.imagem && (
        <img
          src={data.imagem}
          className="w-full rounded-xl"
        />
      )}

      <p className="text-white whitespace-pre-line">
        {data.conteudo}
      </p>

    </div>
  );
}
import Link from "next/link";

export default function Header() {
  return (
    <header style={{ padding: 20, background: "#111", color: "#fff" }}>
      <h2>Esporte do Norte</h2>

      <nav>
        <Link href="/">Home</Link> | 
        <Link href="/times">Times</Link> | 
        <Link href="/jogos">Jogos</Link> | 
        <Link href="/noticias">Notícias</Link>
      </nav>
    </header>
  );
}
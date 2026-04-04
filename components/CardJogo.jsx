export default function CardJogo({ jogo }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
      <h3>{jogo.time_casa} x {jogo.time_fora}</h3>
      <p>Data: {jogo.data}</p>
      <p>Placar: {jogo.placar}</p>
    </div>
  );
}
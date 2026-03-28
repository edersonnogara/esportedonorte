type Props = {
  params: { slug: string };
};

export default function Noticia({ params }: Props) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        PRIMEIRO JOGO DA FINAL DO CAMPEONATO RONDONIENSE 2026
      </h1>

      <img
        src="/noticias/fotoguaporéfinal.avif"
        className="w-full rounded-xl mb-4"
      />

      <p className="text-gray-700 leading-relaxed">
        O Guaporé largou na frente na disputa pelo título do Campeonato Rondoniense 2026. Jogando fora de casa, no estádio Aluízio Ferreira, em Porto Velho, o Jacaré venceu o Rondoniense por 1 a 0, neste sábado, e abriu vantagem na grande final.
        O gol da vitória saiu nos minutos finais do segundo tempo, em cobrança de pênalti convertida por Watthimen, após revisão do VAR.
        
        1° Tempo: A etapa inicial foi marcada por um início travado por falta de uma ambulância presente no estádio, como pede o protocolo de segurança. Depois de 20 minutos de paralisação, ainda assim o jogo iniciou com dificuldades com a bola.

        Quando a bola rolou com mais frequência, o Guaporé foi quem mais se impôs. A equipe de Rolim de Moura teve mais posse e chegou com perigo em diversas oportunidades, principalmente com o artilheiro Mano e o meia Will.

        O goleiro Marlon foi um dos destaques do Rondoniense, com boas defesas em finalizações de média e curta distância.

        O Rondoniense demorou a entrar no jogo, mas cresceu na reta final do primeiro tempo, equilibrando as ações e criando algumas chances, principalmente em jogadas pela lateral e bolas alçadas na área.

        Mesmo assim, o placar seguiu zerado até o intervalo.

        2° Tempo: O segundo tempo começou mais intenso, com o Guaporé voltando a pressionar e criando a melhor chance logo no início, em chute na trave.

        O Rondoniense respondeu com mais presença ofensiva, melhorando a circulação de bola e tentando ocupar o campo de ataque, mas ainda com dificuldade na finalização.

        A equipe da capital também reclamou de um possível pênalti. Após cruzamento na área, Lucas Gomes recebeu a bola e caiu após contato com o defensor do Guaporé. O lance foi revisado pelo VAR, mas a arbitragem decidiu pela não marcação da penalidade.

        A partida ganhou ainda mais emoção na reta final. O Guaporé chegou a balançar as redes com Watthimen logo após a entrada dele em campo, mas o gol foi anulado por impedimento após revisão do VAR.

        Pouco depois, em nova chegada pela área, o goleiro Marlon soltou a bola e, na sequência, Mano sofreu contato. O árbitro inicialmente marcou escanteio, mas foi chamado pelo VAR e, após análise, assinalou pênalti.

        Na cobrança, Watthimen bateu com firmeza e abriu o placar para o Guaporé.

        Nos minutos finais, o Jacaré ainda levou perigo em busca do segundo gol, enquanto o Rondoniense tentou pressionar, mas sem conseguir o empate.
      </p>
    </div>
  );
}
export type Time = {
  id: string;
  nome: string;
  estado: string;
  logo: string;
  estadio: string;
  competicoes: {
    nome: string;
    grupo?: string;
  }[];
};

export function getEstadios() {
  const lista = times.map((t) => t.estadio);

  return [...new Set(lista)]; // remove duplicados
}

export const times: Time[] = [
  {
    id: "porto-velho",
    nome: "Porto Velho",
    estado: "RO",
    logo: "/times/PortoVelhoEC.png",
    estadio: "Aluizão",
    competicoes: [{ nome: "Rondoniense" }, { nome: "Copa Verde", grupo: "B" }],
  },
  {
    id: "Ji-Paraná",
    nome: "Ji-Paraná",
    estado: "RO",
    logo: "/times/JiParana1.png",
    estadio: "Biancão",
    competicoes: [{ nome: "Rondoniense" }],
  },
  {
    id: "guapore",
    nome: "Guaporé",
    estado: "RO",
    logo: "/times/Guaporé_FC.png",
    estadio: "Cassolão",
    competicoes: [{ nome: "Rondoniense" }, { nome: "Copa Verde", grupo: "A" }],
  },

  {
    id: "rolimdemoura",
    nome: "Rolim de Moura",
    estado: "RO",
    logo: "/times/RolimDeMouraEC.png",
    estadio: "Cassolão",
    competicoes: [{ nome: "BrasileiraoA3", grupo: "A" }],
  },

  {
    id: "itapuensero",
    nome: "Itapuense",
    estado: "RO",
    logo: "/times/itapuensero.png",
    estadio: "Aluizão",
    competicoes: [{ nome: "BrasileiraoA3", grupo: "A" }],
  },

  {
    id: "genus",
    nome: "Genus",
    estado: "RO",
    logo: "/times/SCGenus.png",
    estadio: "Aluizão",
    competicoes: [{ nome: "Rondoniense" }],
  },
  {
    id: "rondoniense",
    nome: "Rondoniense",
    estado: "RO",
    logo: "/times/RondonienseSocialClube.png",
    estadio: "Aluizão",
    competicoes: [{ nome: "Rondoniense" }],
  },
  {
    id: "barcelona-ro",
    nome: "Barcelona-RO",
    estado: "RO",
    logo: "/times/BarcelonaRO.png",
    estadio: "Aluizão",
    competicoes: [{ nome: "Rondoniense" }],
  },
  {
    id: "uniao-cacoalense",
    nome: "União Cacoalense",
    estado: "RO",
    logo: "/times/UniaoCacoalense.png",
    estadio: "Aglair Tonelli",
    competicoes: [{ nome: "Rondoniense" }],
  },

  //times da copa verde

  {
    id: "Nacional-AM",
    nome: "Nacional-AM",
    estado: "AM",
    logo: "/times/Nacional_FC_Amazonas.png",
    estadio: "Arena da Amazônia",
    competicoes: [{ nome: "Copa Verde", grupo: "A" }],
  },

  {
    id: "Trem",
    nome: "Trem",
    estado: "AP",
    logo: "/times/Trem.png",
    estadio: "Zerão",
    competicoes: [{ nome: "Copa Verde", grupo: "A" }],
  },

  {
    id: "GAS",
    nome: "GAS",
    estado: "RR",
    logo: "/times/GASampaioRR.png",
    estadio: "Canarinho",
    competicoes: [{ nome: "Copa Verde", grupo: "A" }],
  },

  {
    id: "Paysandu",
    nome: "Paysandu",
    estado: "PA",
    logo: "/times/PaysanduSC.png",
    estadio: "Curuzu",
    competicoes: [{ nome: "Copa Verde", grupo: "A" }],
  },

  {
    id: "Independencia",
    nome: "Independência",
    estado: "AC",
    logo: "/times/independenciafc.png",
    estadio: "Tonicão",
    competicoes: [{ nome: "Copa Verde", grupo: "A" }],
  },

  {
    id: "Amazonas",
    nome: "Amazonas",
    estado: "AM",
    logo: "/times/AmazonasFC.png",
    estadio: "Carlos Zamith",
    competicoes: [{ nome: "Copa Verde", grupo: "B" }],
  },

  {
    id: "AguiadeMarabA",
    nome: "Águia de Marabá",
    estado: "PA",
    logo: "/times/Águia_de_Marabá.png",
    estadio: "Zinho de Oliveira",
    competicoes: [{ nome: "Copa Verde", grupo: "B" }],
  },

  {
    id: "Remo",
    nome: "Remo",
    estado: "PA",
    logo: "/times/Remo.png",
    estadio: "Mangueirão",
    competicoes: [{ nome: "Copa Verde", grupo: "B" }],
  },

  {
    id: "MonteRoraima",
    nome: "Monte Roraima",
    estado: "RR",
    logo: "/times/MonteRoraima.png",
    estadio: "Canarinho",
    competicoes: [{ nome: "Copa Verde", grupo: "B" }],
  },

  {
    id: "Galvez",
    nome: "Galvez",
    estado: "AC",
    logo: "/times/Galvez.png",
    estadio: "Tonicão",
    competicoes: [{ nome: "Copa Verde", grupo: "B" }],
  },
];

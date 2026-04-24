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
  cidade: string;
  
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
    competicoes: [
      { nome: "Rondoniense" }, 
      { nome: "Copa Verde", grupo: "B" }, 
      { nome: "Brasileirao Serie D", grupo: "A2" }],
    cidade: "Porto Velho"
  },
  {
    id: "Ji-Paraná",
    nome: "Ji-Paraná",
    estado: "RO",
    logo: "/times/JiParana1.png",
    estadio: "Biancão",
    competicoes: [{ nome: "Rondoniense" }],
    cidade: "Ji-Paraná",
  },
  {
    id: "guapore",
    nome: "Guaporé",
    estado: "RO",
    logo: "/times/Guapore_FC.png",
    estadio: "Cassolão",
    competicoes: [
      { nome: "Rondoniense" }, { nome: "Copa Verde", grupo: "A" }, { nome: "Brasileirao Serie D", grupo: "A2" }
    ],
    cidade: "Rolim de Moura",
  },

  {
    id: "rolimdemoura",
    nome: "Rolim de Moura",
    estado: "RO",
    logo: "/times/RolimDeMouraEC.png",
    estadio: "Cassolão",
    competicoes: [{ nome: "BrasileiraoA3", grupo: "A" }],
    cidade: "Rolim de Moura",
  },

  {
    id: "itapuensero",
    nome: "Itapuense",
    estado: "RO",
    logo: "/times/itapuensero.png",
    estadio: "Aluizão",
    competicoes: [{ nome: "BrasileiraoA3", grupo: "A" }],
    cidade: "Itapuã",
  },

  {
    id: "genus",
    nome: "Genus",
    estado: "RO",
    logo: "/times/SCGenus.png",
    estadio: "Aluizão",
    competicoes: [{ nome: "Rondoniense" }],
    cidade: "Porto Velho"
  },
  {
    id: "rondoniense",
    nome: "Rondoniense",
    estado: "RO",
    logo: "/times/RondonienseSocialClube.png",
    estadio: "Aluizão",
    competicoes: [{ nome: "Rondoniense" }],
    cidade: "Porto Velho"
  },
  {
    id: "barcelona-ro",
    nome: "Barcelona-RO",
    estado: "RO",
    logo: "/times/BarcelonaRO.png",
    estadio: "Aluizão",
    competicoes: [{ nome: "Rondoniense" }],
    cidade: "Porto Velho"
  },
  {
    id: "uniao-cacoalense",
    nome: "União Cacoalense",
    estado: "RO",
    logo: "/times/UniaoCacoalense.png",
    estadio: "Aglair Tonelli",
    competicoes: [{ nome: "Rondoniense" }],
    cidade: "Cacoal"
  },

  //times da copa verde

  {
    id: "Nacional-AM",
    nome: "Nacional-AM",
    estado: "AM",
    logo: "/times/Nacional_FC_Amazonas.png",
    estadio: "Arena da Amazônia",
    competicoes: [{ nome: "Copa Verde", grupo: "A" }],
    cidade: "Manaus"
  },

  {
    id: "Trem",
    nome: "Trem",
    estado: "AP",
    logo: "/times/Trem.png",
    estadio: "Zerão",
    competicoes: [{ nome: "Copa Verde", grupo: "A" }],
    cidade: "Macapá"
  },

  {
    id: "GAS",
    nome: "GAS",
    estado: "RR",
    logo: "/times/GASampaioRR.png",
    estadio: "Canarinho",
    competicoes: [{ nome: "Copa Verde", grupo: "A" }],
    cidade: "Boa Vista"
  },

  {
    id: "Paysandu",
    nome: "Paysandu",
    estado: "PA",
    logo: "/times/PaysanduSC.png",
    estadio: "Curuzu",
    competicoes: [{ nome: "Copa Verde", grupo: "A" }],
    cidade: "Belém"
  },

  {
    id: "Independencia",
    nome: "Independência",
    estado: "AC",
    logo: "/times/independenciafc.png",
    estadio: "Tonicão",
    competicoes: [{ nome: "Copa Verde", grupo: "A" },{ nome: "Brasileirao Serie D", grupo: "A2" }],
    cidade: "Rio Branco"
  },

  {
    id: "Amazonas",
    nome: "Amazonas",
    estado: "AM",
    logo: "/times/AmazonasFC.png",
    estadio: "Carlos Zamith",
    competicoes: [{ nome: "Copa Verde", grupo: "B" }],
    cidade: "Manaus"
  },

  {
    id: "AguiadeMarabA",
    nome: "Águia de Marabá",
    estado: "PA",
    logo: "/times/Águia_de_Marabá.png",
    estadio: "Zinho de Oliveira",
    competicoes: [{ nome: "Copa Verde", grupo: "B" }],
    cidade: "Marabá"
  },

  {
    id: "Remo",
    nome: "Remo",
    estado: "PA",
    logo: "/times/Remo.png",
    estadio: "Mangueirão",
    competicoes: [{ nome: "Copa Verde", grupo: "B" }],
    cidade: "Belém"
  },

  {
    id: "MonteRoraima",
    nome: "Monte Roraima",
    estado: "RR",
    logo: "/times/MonteRoraima.png",
    estadio: "Canarinho",
    competicoes: [{ nome: "Copa Verde", grupo: "B" }],
    cidade: "Boa Vista"
  },

  {
    id: "Galvez",
    nome: "Galvez",
    estado: "AC",
    logo: "/times/Galvez.png",
    estadio: "Tonicão",
    competicoes: [{ nome: "Copa Verde", grupo: "B" },{ nome: "Brasileirao Serie D", grupo: "A2" }],
    cidade: "Rio Branco"
  },

  {
    id: "Araguaina",
    nome: "Araguaína",
    estado: "TO",
    logo: "/times/Araguaina.png",
    estadio: "Mirandão",
    competicoes: [{ nome: "Brasileirao Serie D", grupo: "A2" }],
    cidade: "Palmas"
  },

  {
    id: "Humaita",
    nome: "Humaitá",
    estado: "AC",
    logo: "/times/Humaita.png",
    estadio: "Arena da Floresta",
    competicoes: [{ nome: "Brasileirao Serie D", grupo: "A2" }],
    cidade: "Rio Branco"
  },
];

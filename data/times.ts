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
  const lista = times.map(t => t.estadio);

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
    id: "genus",
    nome: "Genus",
    estado: "RO",
    logo: "/times/SCGenus.png",
    estadio: "Aluizão",
    competicoes: [{ nome: "Rondoniense" } ],
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
    estadio: "Aglair Tonelli",
    competicoes: [{ nome: "Copa Verde", grupo: "A" }],
  },




];

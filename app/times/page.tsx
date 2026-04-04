import Image from "next/image";
import Link from "next/link";

export default function Times() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Times de Rondônia</h1>

      <div className="grid md:grid-cols-4 gap-6">

        {/* Porto Velho */}
        <Link href="/times/porto-velho" className="bg-white p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 transition">
          <Image src="/times/PortoVelhoEC.png" width={40} height={40} alt="Porto Velho" />
          <h2 className="font-bold text-gray-800">Porto Velho</h2>
        </Link>

        {/* Ji-Paraná */}
        <Link href="/times/ji-parana" className="bg-white p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 transition">
          <Image src="/times/JiParana1.png" width={40} height={40} alt="Ji-Paraná" />
          <h2 className="font-bold text-gray-800">Ji-Paraná</h2>
        </Link>

        {/* Guaporé FC */}
        <Link href="/times/guapore-fc" className="bg-white p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 transition">
          <Image src="/times/Guaporé_FC.png" width={40} height={40} alt="Guaporé FC" />
          <h2 className="font-bold text-gray-800">Guaporé FC</h2>
        </Link>

        {/* Rondoniense */}
        <Link href="/times/rondoniense" className="bg-white p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 transition">
          <Image src="/times/RondonienseSocialClube.png" width={40} height={40} alt="Rondoniense" />
          <h2 className="font-bold text-gray-800">Rondoniense</h2>
        </Link>

        {/* Barcelona */}
        <Link href="/times/barcelona-ro" className="bg-white p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 transition">
          <Image src="/times/BarcelonaRO.png" width={40} height={40} alt="Barcelona-RO" />
          <h2 className="font-bold text-gray-800">Barcelona-RO</h2>
        </Link>

        {/* União Cacoalense */}
        <Link href="/times/uniao-cacoalense" className="bg-white p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 transition">
          <Image src="/times/UniaoCacoalense.png" width={40} height={40} alt="União Cacoalense" />
          <h2 className="font-bold text-gray-800">União Cacoalense</h2>
        </Link>

        {/* Genus */}
        <Link href="/times/genus" className="bg-white p-4 rounded-xl shadow flex items-center gap-4 hover:scale-105 transition">
          <Image src="/times/SCGenus.png" width={40} height={40} alt="Genus FC" />
          <h2 className="font-bold text-gray-800">Genus FC</h2>
        </Link>

      </div>
    </div>
  );
}
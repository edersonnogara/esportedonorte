import { Suspense } from "react";
import NoticiasClient from "./NoticiasClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-white">Carregando...</div>}>
      <NoticiasClient />
    </Suspense>
  );
}
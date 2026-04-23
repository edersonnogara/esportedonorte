"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function Bannerlateral() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("AdSense erro:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-1929109766263245"
      data-ad-slot="7946331442"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />

    
  );
}
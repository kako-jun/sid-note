"use client";

import { initSidFret } from "@/utils/wasmLoader";
import React from "react";

const WasmContext = React.createContext(false);

export function useWasmReady(): boolean {
  return React.useContext(WasmContext);
}

export default function WasmProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    initSidFret().then(() => setReady(true));
  }, []);

  return <WasmContext.Provider value={ready}>{children}</WasmContext.Provider>;
}

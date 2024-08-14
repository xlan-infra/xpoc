"use client";
import { Printer } from "lucide-react";
import { Button } from "./ui/button";

function PrintButton() {
  return (
    <Button variant={"link"} className="text-black p-0" onClick={() => window.print()}>
      <Printer size={14} className="mr-1" /> Imprimir
    </Button>
  );
}

export default PrintButton;

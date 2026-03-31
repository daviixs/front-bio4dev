import React from "react";
import { Gear } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="relative w-full bg-[#221e1b] text-[#ece5d9]">
      {/* Hero image with overlays */}
      <div className="relative w-full overflow-hidden" style={{ height: "80vh" }}>
        <img
          src="/images/Imagefooter.jpg"
          alt="Paisagem com dispositivo destacando o produto"
          className="h-full w-full object-cover"
        />
        {/* Gradient dissolve */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#221e1b_0%,rgba(34,30,27,0.8)_18%,rgba(34,30,27,0)_42%,rgba(34,30,27,0)_70%,rgba(34,30,27,0.8)_88%,#221e1b_100%)]" />
        {/* Side vignettes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[18%] bg-[linear-gradient(to_right,rgba(34,30,27,0.65),rgba(34,30,27,0))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[18%] bg-[linear-gradient(to_left,rgba(34,30,27,0.65),rgba(34,30,27,0))]" />
      </div>

      {/* Links block */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-[#ece5d9]">
            Produto
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-[13px] text-[#ece5d9]/50">
            <a href="#comunidade" className="hover:text-[#ece5d9] transition-colors duration-300">
              Comunidade
            </a>
            <a href="#aulas" className="hover:text-[#ece5d9] transition-colors duration-300">
              Aulas Gravadas
            </a>
            <a href="#recursos" className="hover:text-[#ece5d9] transition-colors duration-300">
              Recursos Exclusivos
            </a>
            <a href="#mentoria" className="hover:text-[#ece5d9] transition-colors duration-300">
              Mentoria ao Vivo
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-[#ece5d9]">
            Legal
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-[13px] text-[#ece5d9]/50">
            <a href="#termos" className="hover:text-[#ece5d9] transition-colors duration-300">
              Termos de Serviço
            </a>
            <a href="#privacidade" className="hover:text-[#ece5d9] transition-colors duration-300">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>

      {/* Floating gear button */}
      <button
        className="fixed bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-[#ece5d9]/30 bg-transparent text-[#ece5d9]/60 backdrop-blur-sm transition-all duration-300 hover:text-[#ece5d9] hover:border-[#ece5d9]/60"
        aria-label="Configurações"
      >
        <Gear size={18} weight="bold" />
      </button>
    </footer>
  );
}

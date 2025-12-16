import React from 'react';
import { LoginImage } from './LoginImage';
import { LoginForm } from './LoginForm';

export function LoginLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Coluna Esquerda - Imagem (apenas desktop) */}
      <div className="hidden lg:block lg:w-[60%] relative">
        <LoginImage />
      </div>

      {/* Coluna Direita - Formulário */}
      <div className="flex-1 lg:w-[40%] flex flex-col justify-center bg-white px-6 py-8 lg:px-12 lg:py-12 relative">
        <div className="w-full max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

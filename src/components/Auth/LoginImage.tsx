import React from 'react';

export function LoginImage() {
  return (
    <div className="hidden lg:block relative h-screen w-full overflow-hidden">
      {/* Imagem de fundo - substituir com a imagem real do Figma */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/login-bg.jpg)',
          // Fallback caso a imagem não carregue - substituir com a imagem real do Figma
          backgroundColor: '#4A90E2',
        }}
      >
        {/* Overlay sutil opcional */}
        <div className="absolute inset-0 bg-black/10" />
      </div>
      
      {/* Crédito da foto no canto inferior esquerdo */}
      <div className="absolute bottom-6 left-6 text-white text-sm font-medium">
        Photo by Alexandr Popadin
      </div>
    </div>
  );
}

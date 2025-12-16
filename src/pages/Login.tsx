import React from 'react';
import { LoginLayout } from '@/components/Auth/LoginLayout';

export default function Login() {
  return (
    <div className="min-h-screen bg-white relative">
      <LoginLayout />
      
      {/* Footer Desktop - Logo e Copyright (apenas na coluna direita) */}
      <footer className="hidden lg:block absolute bottom-6 right-0 lg:w-[40%] px-12 z-10">
        <div className="flex items-center justify-between">
          {/* Logo pequeno */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xs">U</span>
            </div>
            <span className="text-sm font-medium text-gray-600">@uiunicorn</span>
          </div>
          
          {/* Copyright */}
          <span className="text-sm text-gray-500">© Perfect Login 2021</span>
        </div>
      </footer>

      {/* Footer Mobile */}
      <footer className="lg:hidden px-6 py-6 bg-white border-t border-gray-100">
        <div className="flex flex-col items-center gap-4 mb-6">
          {/* Logo principal mobile */}
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-gray-900">UI Unicorn</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          {/* Logo pequeno */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">U</span>
            </div>
            <span className="text-xs font-medium text-gray-600">@uiunicorn</span>
          </div>
          
          {/* Copyright */}
          <span className="text-xs text-gray-500">© Perfect Login 2021</span>
        </div>
      </footer>
    </div>
  );
}

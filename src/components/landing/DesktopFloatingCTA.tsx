import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

const PLACEHOLDERS = ['seu-nome'];

export function DesktopFloatingCTA() {
  const [username, setUsername] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const type = () => {
      const currentWord = PLACEHOLDERS[wordIndex];
      
      if (isDeleting) {
        setPlaceholder(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setPlaceholder(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 70 : 150;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1500; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % PLACEHOLDERS.length;
        typeSpeed = 500; // Pause before new word
      }

      timer = setTimeout(type, typeSpeed);
    };

    timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/profile/type?username=${encodeURIComponent(username.trim())}`);
    } else {
      navigate('/profile/type');
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 z-50 hidden -translate-x-1/2 items-center justify-between gap-4 rounded-full border border-[#c3986b]/35 bg-[#2c2621]/90 p-3 pl-8 shadow-[0_18px_40px_-26px_rgba(195,152,107,0.6)] backdrop-blur-xl lg:flex transition-all duration-300 hover:border-[#c3986b]/60 hover:bg-[#2c2621] hover:scale-[1.02]">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="flex items-center text-[#ece5d9] font-medium text-xl">
          <span className="opacity-60">bio4dev.com/</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={placeholder}
            className="w-48 sm:w-72 bg-transparent text-[#ece5d9] placeholder-[#ece5d9]/30 outline-none border-none focus:ring-0 px-0 ml-0.5"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-[#c3986b] px-8 py-3.5 text-base font-bold text-[#221e1b] transition-all duration-300 hover:bg-[#b1835f] active:scale-95"
        >
          Criar portfólio
          <ArrowRight size={22} weight="bold" />
        </button>
      </form>
    </div>
  );
}

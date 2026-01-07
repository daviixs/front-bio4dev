
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0F0F0F] border-t border-white/10 py-12 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[#AAAAAA] text-sm">
          &copy; {new Date().getFullYear()} • Handcrafted with passion and code.
        </p>
        <div className="flex gap-8 text-[#AAAAAA] text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">RSS Feed</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

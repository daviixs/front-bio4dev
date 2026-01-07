
import React from 'react';
import { Github, Twitter, Youtube, Mail, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Contact</h2>
        <p className="text-xl text-[#AAAAAA] mb-12 leading-relaxed font-light">
          I’m currently open for freelance projects, full-time opportunities, or just a friendly chat about tech. Feel free to reach out anytime!
        </p>
        
        <a 
          href="mailto:hello@developer.me" 
          className="group inline-flex items-center gap-4 text-2xl md:text-4xl font-bold text-white hover:text-[#C084FC] transition-colors mb-16"
        >
          hello@developer.me
          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </a>

        <div className="flex justify-center gap-8">
          <a href="#" className="p-4 bg-[#1A1A1A] rounded-2xl border border-white/5 hover:border-[#C084FC]/50 transition-all duration-300 hover:-translate-y-2 group shadow-lg">
            <Github size={28} className="group-hover:text-[#C084FC] transition-colors" />
          </a>
          <a href="#" className="p-4 bg-[#1A1A1A] rounded-2xl border border-white/5 hover:border-[#C084FC]/50 transition-all duration-300 hover:-translate-y-2 group shadow-lg">
            <Twitter size={28} className="group-hover:text-[#C084FC] transition-colors" />
          </a>
          <a href="#" className="p-4 bg-[#1A1A1A] rounded-2xl border border-white/5 hover:border-[#C084FC]/50 transition-all duration-300 hover:-translate-y-2 group shadow-lg">
            <Youtube size={28} className="group-hover:text-[#C084FC] transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

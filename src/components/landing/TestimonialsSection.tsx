import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/components/ui/utils';

const testimonials = [
  {
    quote: '" Criei meu portfólio Bio4Dev em menos de 10 minutos e já recebi 3 convites para entrevistas. O template Neon é simplesmente incrível e me destacou dos outros candidatos. "',
    author: 'Lucas Mendes',
    company: 'Desenvolvedor Full Stack',
  },
  {
    quote: '" Finalmente tenho um lugar para mostrar todos os meus projetos de forma profissional. O dashboard é super intuitivo e a URL personalizada faz toda a diferença no LinkedIn. "',
    author: 'Ana Carolina',
    company: 'Frontend Developer',
  },
  {
    quote: '" Como dev júnior, precisava de algo para me destacar. O Bio4Dev me deu exatamente isso: um portfólio bonito, responsivo e fácil de atualizar sempre que termino um novo projeto. "',
    author: 'Pedro Santos',
    company: 'Backend Developer',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-slate-100 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-400 shadow-md transition-colors hover:bg-slate-50 hover:text-slate-600 lg:h-12 lg:w-12"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>

          {/* Content */}
          <div className="grid flex-1 items-center gap-8 lg:grid-cols-2 lg:gap-20">
            {/* Image */}
            <div className="relative flex justify-center">
              <div className="relative h-[200px] w-[200px] overflow-hidden rounded-2xl shadow-xl lg:h-[480px] lg:w-[480px] lg:rounded-3xl">
                {/* Inserir imagem do Figma aqui */}
                <div className="h-full w-full bg-gradient-to-br from-blue-400 to-purple-500" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-4 -right-4 h-[60px] w-[80px] overflow-hidden rounded-lg border-2 border-dashed border-red-500 bg-white p-1 shadow-lg lg:-bottom-6 lg:-right-6 lg:h-[113px] lg:w-[189px] lg:p-2">
                {/* Inserir imagem do Figma aqui */}
                <div className="h-full w-full rounded bg-gradient-to-br from-rose-200 to-rose-300" />
              </div>
            </div>

            {/* Quote */}
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 lg:text-sm">
                Depoimentos
              </span>
              <blockquote className="mt-4 text-lg leading-relaxed text-slate-900 lg:text-2xl lg:leading-relaxed">
                {currentTestimonial.quote}
              </blockquote>
              <div className="mt-6 text-base leading-relaxed text-slate-600 lg:text-lg">
                <p>{currentTestimonial.author},</p>
                <p>{currentTestimonial.company}</p>
              </div>

              {/* Dots indicator */}
              <div className="mt-8 flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'h-2 rounded-full transition-all',
                      index === currentIndex
                        ? 'w-8 bg-blue-600'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-400 shadow-md transition-colors hover:bg-slate-50 hover:text-slate-600 lg:h-12 lg:w-12"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}


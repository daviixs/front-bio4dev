interface HeroProps {
  title: string;
  gradientTitle: string;
  description: string;
  avatarUrl: string;
}

export default function Hero({
  title,
  gradientTitle,
  description,
  avatarUrl,
}: HeroProps) {
  return (
    <div className="mt-8 md:mt-5">
      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#FF1493] to-[#8A2BE2] mb-6 flex items-center justify-center overflow-hidden p-1 mx-auto md:mx-0">
        <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <h1 className="text-4xl md:text-[42px] leading-[1.1] font-extrabold mb-4 text-center md:text-left">
        {title}
        <br />
        <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF1493] bg-clip-text text-transparent">
          {gradientTitle}
        </span>
      </h1>

      <p className="text-[#a0a0a0] text-sm md:text-[14px] leading-[1.5] mb-6 max-w-md mx-auto md:mx-0 text-center md:text-left">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
        <button className="px-6 py-2.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-gray-200 transition-colors">
          Get In Touch
        </button>
        <button className="px-6 py-2.5 rounded-full text-sm font-semibold border border-white text-white hover:bg-white/10 transition-colors">
          Download CV
        </button>
      </div>
    </div>
  );
}

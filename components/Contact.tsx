interface ContactProps {
  translations: {
    title: string;
    cta: string;
  };
}

export default function Contact({ translations }: ContactProps) {
  return (
    <section id="contact" className="min-h-screen flex items-center py-24 md:py-32 bg-zinc-950">
      <div className="container mx-auto px-8 md:px-20 lg:px-32 max-w-[1600px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Title Section */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-white tracking-tight leading-[0.95]">
              {translations.title}
            </h2>
            <div className="mt-8 md:mt-12 h-px w-20 md:w-24 bg-gradient-to-r from-white/60 to-transparent" />
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-7 space-y-12 md:space-y-16">
            <div className="space-y-8 md:space-y-10">
              <div className="space-y-2">
                <p className="text-xs text-white/40 font-light tracking-[0.2em] uppercase">Email</p>
                <a
                  href="mailto:valentin.larbre@gmail.com"
                  className="block text-2xl md:text-3xl lg:text-4xl text-white/80 hover:text-white font-light transition-colors duration-500 leading-tight"
                >
                  valentin.larbre@gmail.com
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-white/40 font-light tracking-[0.2em] uppercase">Instagram</p>
                <a
                  href="https://www.instagram.com/studiolarbre/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-2xl md:text-3xl lg:text-4xl text-white/80 hover:text-white font-light transition-colors duration-500 leading-tight"
                >
                  @studiolarbre
                </a>
              </div>

              <div className="pt-4 md:pt-6">
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
                <p className="text-sm md:text-base text-white/50 font-light mt-6">
                  Paris, France
                </p>
              </div>
            </div>

            <a
              href="https://www.instagram.com/studiolarbre/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block px-12 md:px-16 py-5 md:py-6 bg-white text-black font-light text-xs tracking-[0.25em] uppercase hover:bg-white/90 transition-all duration-500 border border-white/10"
            >
              {translations.cta}
              <span className="inline-block ml-4 transition-transform duration-500 group-hover:translate-x-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

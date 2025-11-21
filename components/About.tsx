interface AboutProps {
  translations: {
    title: string;
    intro: string;
    description: string;
    features: {
      title: string;
      mixing: string;
      recording: string;
      atmos: string;
      mastering: string;
    };
  };
}

export default function About({ translations }: AboutProps) {
  const features = [
    { label: translations.features.recording },
    { label: translations.features.mixing },
    { label: translations.features.atmos },
    { label: translations.features.mastering },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-24 md:py-32 bg-black">
      <div className="container mx-auto px-8 md:px-20 lg:px-32 max-w-[1600px]">
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
          <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-white tracking-tight leading-[0.95]">
            {translations.title}
          </h2>
        </div>

        {/* Content */}
        <div className="max-w-6xl space-y-16 md:space-y-24">
          <p className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight text-white leading-[1.5] tracking-tight">
            {translations.intro}
          </p>

          <p className="text-base md:text-lg lg:text-xl text-white/50 font-light leading-[1.8] max-w-4xl">
            {translations.description}
          </p>

          {/* Features - Minimal List */}
          <div className="pt-12 md:pt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-10 lg:gap-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="border-l border-white/20 pl-6 hover:border-white/40 transition-colors duration-500"
                >
                  <span className="text-xs md:text-sm text-white/60 font-light tracking-[0.15em] uppercase">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';

interface StudiosProps {
  title: string;
}

export default function Studios({ title }: StudiosProps) {
  const studios = [
    {
      id: 1,
      name: 'Main Studio',
      description: 'Recording & Production',
      image: '/images/studio/cover.jpg',
    },
    {
      id: 2,
      name: 'Control Room',
      description: 'Mixing & Mastering',
      image: '/images/studio/door.jpg',
    },
    {
      id: 3,
      name: 'Live Room',
      description: 'Acoustique Exceptionnelle',
      image: '/images/studio/wall2.jpg',
    },
  ];

  return (
    <section id="studios" className="min-h-screen flex items-center py-24 md:py-32 bg-black">
      <div className="container mx-auto px-8 md:px-20 lg:px-32 max-w-[1600px]">
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
          <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-white tracking-tight leading-[0.95]">
            {title}
          </h2>
        </div>

        {/* Studios Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-10">
          {studios.map((studio) => (
            <div
              key={studio.id}
              className="group relative overflow-hidden bg-zinc-950/20 border border-white/[0.07] hover:border-white/20 transition-all duration-700"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-black">
                {/* Studio Image */}
                <Image
                  src={studio.image}
                  alt={studio.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-extralight text-white mb-3 tracking-tight leading-tight">
                  {studio.name}
                </h3>
                <p className="text-xs text-white/60 font-light tracking-[0.15em] uppercase">
                  {studio.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PromoBanner() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden bg-secondary h-48 md:h-64 flex items-center">
          {/* Background Pattern/Image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>

          <div className="relative z-10 p-8 md:p-12 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full mb-4">
              OFERTA RELÂMPAGO
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Até 50% OFF em Eletrônicos
            </h2>
            <p className="text-gray-200 mb-6 max-w-md">
              Aproveite descontos imperdíveis em smartphones, notebooks e
              acessórios. Oferta por tempo limitado!
            </p>
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/50">
              Aproveitar Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

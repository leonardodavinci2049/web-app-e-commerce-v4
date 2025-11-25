export function Newsletter() {
  return (
    <section className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">
              Fique por dentro das novidades!
            </h2>
            <p className="opacity-90">
              Cadastre-se e receba ofertas exclusivas diretamente no seu e-mail.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-grow px-4 py-3 rounded-lg text-foreground border-none focus:ring-2 focus:ring-accent outline-none"
                required
              />
              <button
                type="submit"
                className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-bold hover:bg-accent/90 transition-colors whitespace-nowrap"
              >
                CADASTRAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

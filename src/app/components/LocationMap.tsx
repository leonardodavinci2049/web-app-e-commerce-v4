import { MapPin, Phone, Clock, Mail } from "lucide-react";

export function LocationMap() {
  return (
    <section className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-foreground">
          Visite Nossa Loja Física
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold text-foreground">Endereço</h3>
                <p className="text-muted-foreground">
                  Rua das Ferramentas, 123
                  <br />
                  Centro - São Paulo, SP
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold text-foreground">Contato</h3>
                <p className="text-muted-foreground">
                  (11) 9999-9999
                  <br />
                  (11) 98888-8888 (WhatsApp)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold text-foreground">
                  Horário de Funcionamento
                </h3>
                <p className="text-muted-foreground">
                  Segunda a Sexta: 8h às 18h
                  <br />
                  Sábado: 8h às 12h
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold text-foreground">E-mail</h3>
                <p className="text-muted-foreground">
                  vendas@mundialmegastore.com.br
                </p>
              </div>
            </div>

            <button className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
              Como Chegar
            </button>
          </div>

          <div className="h-[300px] bg-muted rounded-xl overflow-hidden relative">
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-800">
              <span className="text-muted-foreground font-medium">
                Mapa Google Maps
              </span>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197586021576!2d-46.65219368502227!3d-23.56134958468295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1623345678901!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="opacity-80 hover:opacity-100 transition-opacity"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

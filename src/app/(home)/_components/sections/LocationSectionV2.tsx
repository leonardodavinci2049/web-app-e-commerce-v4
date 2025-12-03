import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { envs } from "@/core/config/envs";

export function LocationSectionV2() {
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
                  {envs.NEXT_PUBLIC_COMPANY_ADDRESS}

                  <br />
                  {envs.NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold text-foreground">Contato</h3>
                <p className="text-muted-foreground">
                  {envs.NEXT_PUBLIC_COMPANY_PHONE}
                  <br />
                  {envs.NEXT_PUBLIC_COMPANY_WHATSAPP} (WhatsApp)
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
                  Segunda a Sexta: {envs.NEXT_PUBLIC_COMPANY_OPENING_HOURS}
                  <br />
                  Sábado: {envs.NEXT_PUBLIC_COMPANY_OPENING_SATURDAY}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold text-foreground">E-mail</h3>
                <p className="text-muted-foreground">
                  {envs.NEXT_PUBLIC_COMPANY_EMAIL}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
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
              title="Mapa da Loja"
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

import { Clock, MapPin, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { envs } from "@/core/config";
import { cn } from "@/lib/utils";

interface LocationSectionProps {
  className?: string;
}

export function LocationSectionV1({ className }: LocationSectionProps) {
  return (
    <section className={cn("py-16 bg-muted/50", className)}>
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="mb-3 text-2xl font-bold text-foreground md:mb-4 md:text-3xl">
            Visite Nossa Loja Física
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-base leading-relaxed md:text-lg">
            Venha conhecer nosso showroom com mais de{" "}
            {envs.NEXT_PUBLIC_COMPANY_QT_PRODUCTS} produtos em exposição. Nossa
            equipe especializada está pronta para atendê-lo com os melhores
            preços e condições especiais para revendedores.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-2">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-800">
              <iframe
                src={envs.NEXT_PUBLIC_COMPANY_MAPS_URL}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[300px] w-full md:h-[400px]"
                title={`Localização da ${process.env.NEXT_PUBLIC_COMPANY_NAME}`}
              />
            </div>
          </div>

          {/* Location Info */}
          <div className="order-1 space-y-6 lg:order-2">
            <div>
              <h3 className="mb-4 text-xl font-bold text-foreground md:mb-6 md:text-2xl">
                {process.env.NEXT_PUBLIC_COMPANY_NAME}
              </h3>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 md:h-12 md:w-12">
                      <MapPin className="h-5 w-5 text-primary md:h-6 md:w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-semibold text-foreground md:text-base">
                      Endereço
                    </h4>
                    <p className="text-muted-foreground text-sm whitespace-pre-line md:text-base">
                      {envs.NEXT_PUBLIC_COMPANY_ADDRESS}

                      <br />
                      {envs.NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 md:h-12 md:w-12">
                      <Phone className="h-5 w-5 text-primary md:h-6 md:w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-semibold text-foreground md:text-base">
                      Telefone
                    </h4>
                    <p className="text-muted-foreground text-sm md:text-base">
                      {envs.NEXT_PUBLIC_COMPANY_WHATSAPP} (WhatsApp)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 md:h-12 md:w-12">
                      <Clock className="h-5 w-5 text-primary md:h-6 md:w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-semibold text-foreground md:text-base">
                      Horário de Funcionamento
                    </h4>
                    <div className="text-muted-foreground space-y-1 text-sm md:text-base">
                      <p className="text-muted-foreground">
                        Segunda a Sexta:{" "}
                        {envs.NEXT_PUBLIC_COMPANY_OPENING_HOURS}
                        <br />
                        Sábado: {envs.NEXT_PUBLIC_COMPANY_OPENING_SATURDAY}
                        <br />
                        Domingo: Fechado
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:gap-4">
              <Button
                asChild
                size="lg"
                className="flex h-12 min-h-[3rem] flex-1 items-center justify-center whitespace-nowrap cursor-pointer"
              >
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${envs.NEXT_PUBLIC_COMPANY_ADDRESS} ${envs.NEXT_PUBLIC_COMPANY_ADDRESS_LOCATION}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Abrir no Google Maps
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="flex h-12 min-h-[3rem] flex-1 items-center justify-center whitespace-nowrap cursor-pointer"
              >
                <a
                  href={`https://api.whatsapp.com/send/?phone=55${envs.NEXT_PUBLIC_COMPANY_WHATSAPP.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Ligar Agora
                </a>
              </Button>
            </div>

            <Card className="border-border bg-card">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-3">
                  <div className="shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 md:h-10 md:w-10">
                      <Star className="h-4 w-4 text-primary md:h-5 md:w-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-foreground md:text-base">
                      Agende sua Visita
                    </h4>
                    <p className="text-muted-foreground mb-3 text-xs leading-relaxed md:text-sm">
                      Recomendamos agendar uma visita para apresentarmos nossos
                      produtos e condições especiais para revendedores.
                    </p>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="text-xs md:text-sm cursor-pointer"
                    >
                      <a
                        href={`https://api.whatsapp.com/send/?phone=55${envs.NEXT_PUBLIC_COMPANY_WHATSAPP.replace(/\D/g, "")}&text&type=phone_number&app_absent=0`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Agendar Visita
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

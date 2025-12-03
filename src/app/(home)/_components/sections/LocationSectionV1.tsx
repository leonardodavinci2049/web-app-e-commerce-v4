import { Clock, MapPin, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ContactInfo } from "@/types/home-type";

const CONTACT_INFO: ContactInfo = {
  address: "Av. Caramuru, 1008 - Jardim Sumaré\nRibeirão Preto - SP, 14025-080",
  phone: "(16) 3434-1400",
  email: "contato@mundialrevenda.com.br",
  hours: {
    weekdays: "Segunda a Sexta: 8h às 18h",
    saturday: "Sábado: 8h às 12h",
    sunday: "Domingo: Fechado",
  },
} as const;

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
            Venha conhecer nosso showroom com mais de 5.000 produtos em
            exposição. Nossa equipe especializada está pronta para atendê-lo com
            os melhores preços e condições especiais para revendedores.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-2">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.889900010886!2d-47.82531012429679!3d-21.27618998043697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b9b8d3f8e8e8e9%3A0x86ec04742ff10b99!2sMundial!5e0!3m2!1spt-BR!2sbr"
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
                      {CONTACT_INFO.address}
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
                      {CONTACT_INFO.phone}
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
                      <p>{CONTACT_INFO.hours.weekdays}</p>
                      <p>{CONTACT_INFO.hours.saturday}</p>
                      <p>{CONTACT_INFO.hours.sunday}</p>
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
                  href="https://www.google.com/maps/search/?api=1&query=Av.+Caramuru,+1008+-+Jardim+Sumaré+Ribeirão+Preto+-+SP"
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
                  href="https://api.whatsapp.com/send/?phone=5516997275438&text&type=phone_number&app_absent=0"
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
                      size="sm"
                      variant="outline"
                      className="text-xs md:text-sm"
                    >
                      Agendar Visita
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

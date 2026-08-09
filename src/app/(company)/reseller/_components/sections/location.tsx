import { Clock, MapPin, Phone, Star } from "lucide-react";
import { TrackedContactLink } from "@/components/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { envs } from "@/core/config/envs";
import { cn } from "@/lib/utils";
import type { ContactInfo } from "@/types/home-type";

const CONTACT_INFO: ContactInfo = {
  address: "Av. Caramuru, 1008 - Jardim Sumaré\nRibeirão Preto - SP, 14025-080",
  phone: envs.NEXT_PUBLIC_COMPANY_PHONE,
  email: envs.NEXT_PUBLIC_COMPANY_EMAIL,
  hours: {
    weekdays: "Segunda a Sexta: 8h às 18h",
    saturday: "Sábado: 8h às 12h",
    sunday: "Domingo: Fechado",
  },
} as const;

interface LocationSectionProps {
  className?: string;
}

export function LocationSection({ className }: LocationSectionProps) {
  return (
    <section className={cn("bg-muted/50 py-16 sm:py-20", className)}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl lg:text-4xl">
            Visite Nossa Loja Física
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-base sm:text-lg lg:text-xl">
            Venha conhecer nosso showroom com mais de 5.000 produtos em
            exposição. Nossa equipe especializada está pronta para atendê-lo com
            os melhores preços e condições especiais para revendedores.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 sm:gap-12 lg:grid-cols-2">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.889900010886!2d-47.82531012429679!3d-21.27618998043697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b9b8d3f8e8e8e9%3A0x86ec04742ff10b99!2sMundial!5e0!3m2!1spt-BR!2sbr"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-75 w-full sm:h-87.5 lg:h-100"
                title={`Localização da ${envs.NEXT_PUBLIC_COMPANY_NAME}`}
              />
            </div>
          </div>

          {/* Location Info */}
          <div className="order-1 space-y-6 sm:space-y-8 lg:order-2">
            <div>
              <h3 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">
                {envs.NEXT_PUBLIC_COMPANY_NAME}
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 sm:h-12 sm:w-12">
                      <MapPin className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-semibold sm:text-base">
                      Endereço
                    </h4>
                    <p className="text-muted-foreground text-sm whitespace-pre-line sm:text-base">
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 sm:h-12 sm:w-12">
                      <Phone className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-semibold sm:text-base">
                      Telefone
                    </h4>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {CONTACT_INFO.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 sm:h-12 sm:w-12">
                      <Clock className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-semibold sm:text-base">
                      Horário de Funcionamento
                    </h4>
                    <div className="text-muted-foreground space-y-1 text-sm sm:text-base">
                      <p>{CONTACT_INFO.hours.weekdays}</p>
                      <p>{CONTACT_INFO.hours.saturday}</p>
                      <p>{CONTACT_INFO.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                asChild
                size="lg"
                className="flex h-12 min-h-12 flex-1 items-center justify-center whitespace-nowrap cursor-pointer"
              >
                <TrackedContactLink
                  href="https://www.google.com/maps/search/?api=1&query=Av.+Caramuru,+1008+-+Jardim+Sumaré+Ribeirão+Preto+-+SP"
                  method="map"
                  location="reseller_location"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Abrir no Google Maps
                </TrackedContactLink>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="flex h-12 min-h-12 flex-1 items-center justify-center bg-transparent whitespace-nowrap cursor-pointer"
              >
                <TrackedContactLink
                  href="https://api.whatsapp.com/send/?phone=5516997275438&text&type=phone_number&app_absent=0"
                  method="whatsapp"
                  location="reseller_location"
                  lead
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5 " />
                  Falar no WhatsApp
                </TrackedContactLink>
              </Button>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start space-x-3">
                  <div className="shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 sm:h-10 sm:w-10">
                      <Star className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-semibold sm:text-base">
                      Agende sua Visita
                    </h4>
                    <p className="text-muted-foreground mb-3 text-xs sm:text-sm">
                      Recomendamos agendar uma visita para apresentarmos nossos
                      produtos e condições especiais para revendedores.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent text-xs sm:text-sm"
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

import { MapPin, MessageSquare, Phone } from "lucide-react";
import { TrackedContactLink } from "@/components/analytics";
import { Card, CardContent } from "@/components/ui/card";
import { envs } from "@/core/config/envs";
import { cn } from "@/lib/utils";

const getContactData = () =>
  [
    {
      icon: Phone,
      title: "Televendas",
      info: envs.NEXT_PUBLIC_COMPANY_WHATSAPP.replace(/^55/, "").replace(
        /(\d{2})(\d{5})(\d{4})/,
        "($1) $2-$3",
      ),
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      info: envs.NEXT_PUBLIC_COMPANY_WHATSAPP.replace(
        /(\d{2})(\d{2})(\d{5})(\d{4})/,
        "$1 $2 $3-$4",
      ),
      href: `https://wa.me/${envs.NEXT_PUBLIC_COMPANY_WHATSAPP}`,
    },
    {
      icon: MapPin,
      title: "Localização",
      info: "Ribeirão Preto, SP",
    },
  ] as const;

interface ContactSectionProps {
  className?: string;
}

export function ContactSection({ className }: ContactSectionProps) {
  const contactData = getContactData();

  return (
    <section id="contato" className={cn("py-16 sm:py-20", className)}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl lg:text-4xl">
            Entre em Contato
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg lg:text-xl">
            Nossa equipe está pronta para atender você
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {contactData.map((contact) => {
            const Icon = contact.icon;
            return (
              <Card key={contact.title} className="border-border bg-card">
                <CardContent className="p-4 text-center sm:p-6">
                  <Icon className="mx-auto mb-3 h-6 w-6 text-primary sm:mb-4 sm:h-8 sm:w-8" />
                  <h3 className="mb-2 text-sm font-semibold sm:text-base">
                    {contact.title}
                  </h3>
                  {"href" in contact ? (
                    <TrackedContactLink
                      href={contact.href}
                      method="whatsapp"
                      location="reseller_contact"
                      lead
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground text-sm hover:underline sm:text-base"
                    >
                      {contact.info}
                    </TrackedContactLink>
                  ) : (
                    <p className="text-muted-foreground text-sm sm:text-base">
                      {contact.info}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

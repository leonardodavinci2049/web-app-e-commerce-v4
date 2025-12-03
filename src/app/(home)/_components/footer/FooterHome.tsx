"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  Truck,
  CreditCard,
  Send,
} from "lucide-react";
import { useState } from "react";

export default function FooterHome() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de inscrição na newsletter
    setIsSubscribed(true);
    setEmail("");

    // Reset após 3 segundos
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Seção principal do footer */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Coluna 1: Sobre a empresa */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logo/logo-horizontal-footer.png"
                  alt={process.env.NEXT_PUBLIC_COMPANY_NAME || "Logo"}
                  width={140}
                  height={44}
                  className="h-10 w-auto brightness-0 invert filter transition-opacity hover:opacity-80"
                />
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Distribuidora Atacadista especializada em eletrônicos, informática
              e perfumes importados. Atendemos todo o Brasil com qualidade e
              confiança.
            </p>

            {/* Redes sociais */}
            <div className="flex space-x-4">
              <Link
                href="#"
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Coluna 2: Links rápidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/catalog"
                  className="text-sm text-gray-400 transition-colors hover:text-white cursor-pointer"
                >
                  Catálogo de Produtos
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link
                  href="/return"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Política de Devolução
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Área do Cliente
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Informações de contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400" />
                <div className="text-sm">
                  <p className="text-gray-400">Av. Caramuru, 1008</p>
                  <p className="text-gray-400">Jardim Sumare</p>
                  <p className="text-gray-400">Ribeirão Preto - SP</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-blue-400" />
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {process.env.NEXT_PUBLIC_COMPANY_PHONE}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-blue-400" />
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {process.env.NEXT_PUBLIC_COMPANY_EMAIL}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 flex-shrink-0 text-blue-400" />
                <div className="text-sm">
                  <p className="text-gray-400">Seg - Sex: 8h às 18h</p>
                  <p className="text-gray-400">Sáb: 8h às 12h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-sm text-gray-400">
              Receba novidades, promoções exclusivas e lançamentos diretamente
              no seu e-mail.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <span className="flex items-center justify-center space-x-2">
                    <span>✓ Inscrito!</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Inscrever-se</span>
                  </span>
                )}
              </Button>
            </form>

            {/* Badges de confiança */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Dados protegidos</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>Sem spam garantido</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de garantias/diferenciais */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
              <Shield className="h-5 w-5 text-green-400" />
              <span>Produtos Originais</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
              <Truck className="h-5 w-5 text-blue-400" />
              <span>Entrega Nacional</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
              <CreditCard className="h-5 w-5 text-purple-400" />
              <span>Pagamento Seguro</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
              <Clock className="h-5 w-5 text-orange-400" />
              <span>Suporte Especializado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} {process.env.NEXT_PUBLIC_COMPANY_NAME}. Todos
              os direitos reservados - Build 0.2.0
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/antispam"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política Anti-Spam
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

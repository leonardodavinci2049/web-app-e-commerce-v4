import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted pt-16 border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Institutional */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">
              MUNDIAL MEGASTORE
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Sua parceira em ferramentas e equipamentos. Qualidade e confiança
              que você já conhece.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Quem Somos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Nossas Lojas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Trabalhe Conosco
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: My Account */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Minha Conta</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Login / Cadastro
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Meus Pedidos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Lista de Desejos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Rastreamento
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Central de Ajuda
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="font-bold text-primary">(11) 9999-9999</span>
              </li>
              <li>vendas@mundialmegastore.com.br</li>
              <li>Rua das Ferramentas, 123</li>
              <li>Seg a Sex: 8h às 18h</li>
              <li>Sáb: 8h às 12h</li>
            </ul>
          </div>
        </div>

        {/* Payment Methods Bar */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-sm font-medium text-foreground">
                Formas de Pagamento
              </span>
              <div className="flex gap-2">
                {/* Payment Icons Placeholder */}
                <div className="flex gap-2 text-muted-foreground">
                  <CreditCard className="w-8 h-8" />
                  <CreditCard className="w-8 h-8" />
                  <CreditCard className="w-8 h-8" />
                </div>
              </div>
              <span className="text-xs text-accent font-bold">
                5% de desconto no PIX
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card px-4 py-2 rounded-full border border-border">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <span>Site 100% seguro - SSL</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border py-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 MUNDIAL MEGASTORE - Todos os direitos reservados | CNPJ:
            XX.XXX.XXX/0001-XX
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import DOMPurify from "isomorphic-dompurify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductTabsProps {
  description: string;
  specifications: Record<string, string>;
  shipping: {
    freeShippingMinValue: number;
    estimatedDays: string;
    returnDays: number;
  };
}

/**
 * Sanitizes HTML content to prevent XSS attacks
 */
function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "b",
      "i",
      "em",
      "u",
      "s",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
      "span",
      "div",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class", "style"],
  });
}

/**
 * Checks if the content contains HTML tags
 */
function containsHtml(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content);
}

export function ProductTabs({
  description,
  specifications,
  shipping,
}: ProductTabsProps) {
  const isHtmlContent = containsHtml(description);
  const sanitizedDescription = isHtmlContent
    ? sanitizeHtml(description)
    : description;

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Descrição</TabsTrigger>
        <TabsTrigger value="specifications">Especificações</TabsTrigger>
        <TabsTrigger value="shipping">Entrega</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h3 className="text-lg font-semibold mb-4">Sobre o Produto</h3>
          {isHtmlContent ? (
            <div
              className="
                text-muted-foreground
                [&>p]:mb-4 [&>p]:leading-relaxed
                [&>br]:block [&>br]:content-[''] [&>br]:mb-2
                [&>div]:mb-4
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul]:space-y-1
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol]:space-y-1
                [&_li]:mb-1
                [&>h1]:text-xl [&>h1]:font-bold [&>h1]:mb-3 [&>h1]:mt-4
                [&>h2]:text-lg [&>h2]:font-bold [&>h2]:mb-3 [&>h2]:mt-4
                [&>h3]:text-base [&>h3]:font-semibold [&>h3]:mb-2 [&>h3]:mt-3
                [&>h4]:text-sm [&>h4]:font-semibold [&>h4]:mb-2 [&>h4]:mt-3
                [&>a]:text-primary [&>a]:underline [&>a]:hover:opacity-80
                [&>strong]:font-semibold [&>b]:font-semibold
                [&>em]:italic [&>i]:italic
                [&>table]:w-full [&>table]:border-collapse [&>table]:mb-4
                [&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:bg-muted [&_th]:text-left
                [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2
                leading-relaxed
              "
              // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML is sanitized via DOMPurify
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          ) : (
            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">
            Características Principais
          </h3>
          <div className="border border-border rounded-lg divide-y divide-border">
            {Object.entries(specifications).map(([key, value]) => (
              <div
                key={key}
                className="grid grid-cols-2 gap-4 p-4 hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground">{key}</span>
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="shipping" className="mt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Informações de Entrega</h3>
          <div className="space-y-3 text-muted-foreground">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium text-foreground">
                  Política de Devolução
                </p>
                <p className="text-sm">
                  Devolução gratuita em até {shipping.returnDays} dias úteis
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="font-medium text-foreground">Garantia</p>
                <p className="text-sm">
                  Garantia de fábrica de 12 meses + 3 meses de garantia
                  estendida
                </p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

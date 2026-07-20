"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { envs } from "@/core/config/envs";

interface ProductTabsProps {
  /** Pre-sanitized description HTML (sanitized on the server) */
  description: string;
  /** Whether the description contains HTML tags */
  isHtmlContent: boolean;
  specifications: Record<string, string>;
}

const DESCRIPTION_HTML_CLASS_NAME = [
  "text-muted-foreground",
  "[&>p]:mb-4",
  "[&>p]:leading-relaxed",
  "[&>br]:block",
  "[&>br]:content-['']",
  "[&>br]:mb-2",
  "[&>ul]:list-disc",
  "[&>ul]:pl-6",
  "[&>ul]:mb-4",
  "[&>ul]:space-y-1",
  "[&>ol]:list-decimal",
  "[&>ol]:pl-6",
  "[&>ol]:mb-4",
  "[&>ol]:space-y-1",
  "[&_li]:mb-1",
  // h3 = downgraded from h2 in API content
  "[&>h3]:text-lg",
  "[&>h3]:font-bold",
  "[&>h3]:mb-3",
  "[&>h3]:mt-4",
  // h4 = downgraded from h3 in API content
  "[&>h4]:text-base",
  "[&>h4]:font-semibold",
  "[&>h4]:mb-2",
  "[&>h4]:mt-3",
  "[&>h5]:text-sm",
  "[&>h5]:font-semibold",
  "[&>h5]:mb-2",
  "[&>h5]:mt-3",
  "[&>a]:text-primary",
  "[&>a]:underline",
  "[&>a]:hover:opacity-80",
  "[&>strong]:font-semibold",
  "[&>b]:font-semibold",
  "[&>em]:italic",
  "[&>i]:italic",
  "[&>table]:w-full",
  "[&>table]:border-collapse",
  "[&>table]:mb-4",
  "[&_th]:border",
  "[&_th]:border-border",
  "[&_th]:px-3",
  "[&_th]:py-2",
  "[&_th]:bg-muted",
  "[&_th]:text-left",
  "[&_td]:border",
  "[&_td]:border-border",
  "[&_td]:px-3",
  "[&_td]:py-2",
  "leading-relaxed",
].join(" ");

export function ProductTabs({
  description,
  isHtmlContent,
  specifications,
}: ProductTabsProps) {
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
              className={DESCRIPTION_HTML_CLASS_NAME}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML is sanitized server-side via DOMPurify
              dangerouslySetInnerHTML={{ __html: description }}
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
              <p>
                <strong>WhatsApp:</strong> {envs.NEXT_PUBLIC_COMPANY_WHATSAPP}
              </p>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

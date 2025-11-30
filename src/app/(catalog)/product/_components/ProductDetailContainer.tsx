import { notFound } from "next/navigation";
import {
  fetchCategoriesAction,
  fetchProductBySlugAction,
  fetchRelatedProductsAction,
} from "@/app/actions/product";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { RelatedProducts } from "./RelatedProducts";

interface ProductDetailContainerProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function ProductDetailContainer({
  params,
}: ProductDetailContainerProps) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    fetchProductBySlugAction(slug),
    fetchCategoriesAction(),
  ]);

  if (!product) {
    notFound();
  }

  // resolve nomes de categoria / subcategoria a partir dos IDs
  const getCategoryName = (categoryId?: string) =>
    categories.find((c) => c.id === categoryId)?.name || "—";

  const getSubcategoryName = (categoryId?: string, subId?: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat || !cat.subcategories) return "—";
    // subId nos produtos é o sufixo (ex: "1"), sub.id em CATEGORIES é "2-1"
    return (
      cat.subcategories.find(
        (s) =>
          s.id === `${categoryId}-${subId}` ||
          s.id.split("-")[1] === String(subId),
      )?.name || "—"
    );
  };

  // Buscar produtos relacionados
  const relatedRaw = await fetchRelatedProductsAction(
    product.id,
    product.categoryId,
  );

  // adiciona campos category/subcategory com nomes para compatibilidade dos componentes
  const productWithNames = {
    ...product,
    category: getCategoryName(product.categoryId),
    subcategory: getSubcategoryName(product.categoryId, product.subcategoryId),
  };

  const relatedWithNames = relatedRaw.map((p) => ({
    ...p,
    category: getCategoryName(p.categoryId),
    subcategory: getSubcategoryName(p.categoryId, p.subcategoryId),
  }));

  // Dados padrão para especificações e entrega se não existirem
  const defaultSpecifications = {
    Marca: product.brand || "Genérica",
    Categoria: getCategoryName(product.categoryId),
    Subcategoria: getSubcategoryName(product.categoryId, product.subcategoryId),
    Condição: product.isNew ? "Novo" : "Usado",
  };

  const defaultShipping = {
    freeShippingMinValue: 199.9,
    estimatedDays: "3 a 7 dias úteis",
    returnDays: 7,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap">
        <a href="/" className="hover:text-primary transition-colors">
          Home
        </a>
        <span className="mx-2">/</span>
        <a href="/products" className="hover:text-primary transition-colors">
          Produtos
        </a>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Galeria de Imagens */}
        <ProductImageGallery
          images={product.image ? [product.image] : []}
          productName={product.name}
        />

        {/* Informações do Produto */}
        <ProductInfo product={productWithNames} />
      </div>

      {/* Tabs de Informações */}
      <div className="mb-16">
        <ProductTabs
          description={product.description || "Sem descrição disponível."}
          specifications={product.specifications || defaultSpecifications}
          shipping={product.shipping || defaultShipping}
        />
      </div>

      {/* Produtos Relacionados */}
      <RelatedProducts products={relatedWithNames} />
    </div>
  );
}

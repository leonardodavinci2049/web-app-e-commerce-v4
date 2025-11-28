import { PRODUCTS } from "@/data/mock-data";

/**
 * Gera um slug SEO-friendly a partir do nome do produto e ID
 * @param name Nome do produto
 * @param id ID do produto
 * @returns Slug no formato "nome-do-produto-id"
 */
export function generateSlug(name: string, id: string): string {
  const slugName = name
    .toLowerCase()
    .normalize("NFD") // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-") // Remove hífens duplicados
    .trim();

  return `${slugName}-${id}`;
}

/**
 * Encontra um produto pelo slug
 * @param slug Array de partes do slug (do Next.js catch-all route)
 * @returns Produto encontrado ou undefined
 */
export function findProductBySlug(slug: string[]) {
  // O slug vem como array, ex: ["smartphone-galaxy-s24-ultra-512gb", "1"]
  // Ou pode vir como ["smartphone-galaxy-s24-ultra-512gb-1"]
  const fullSlug = slug.join("/");

  // Extrai o ID do final do slug
  const parts = fullSlug.split("-");
  const id = parts[parts.length - 1];

  // Busca o produto pelo ID
  const product = PRODUCTS.find((p) => p.id === id);

  return product;
}

/**
 * Gera o caminho completo para a página de detalhes do produto
 * @param name Nome do produto
 * @param id ID do produto
 * @returns Caminho no formato "/product/nome-do-produto-id"
 */
export function getProductPath(name: string, id: string): string {
  return `/product/${generateSlug(name, id)}`;
}

/**
 * Converte uma string em um slug SEO-friendly
 * @param text Texto para converter
 * @returns Slug formatado
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

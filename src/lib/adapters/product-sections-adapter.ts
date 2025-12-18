/**
 * Product Section Adapter
 * Transforms ProductWebSectionItem data to UI ProductWithMetadata
 */

import type {
  ProductWebListItem,
  ProductWebSectionItem,
} from "@/services/api-main/product/types/product-types";
import type { ProductWithMetadata } from "@/types/product";
import { adaptProductFromApi } from "./product-adapter";

function normalizePriceValue(value?: number | string | null): string {
  if (typeof value === "number") {
    return value.toFixed(6);
  }

  if (typeof value === "string" && value.trim() !== "") {
    return value;
  }

  return "0";
}

function normalizeDateValue(value?: Date | string | null): string | null {
  if (!value) {
    return null;
  }

  try {
    const dateInstance = value instanceof Date ? value : new Date(value);
    return Number.isNaN(dateInstance.getTime())
      ? null
      : dateInstance.toISOString();
  } catch {
    return null;
  }
}

function adaptSectionItemToListItem(
  item: ProductWebSectionItem,
): ProductWebListItem {
  return {
    ID_PRODUTO: item.ID_PRODUTO,
    SKU: item.SKU ?? item.ID_PRODUTO,
    PRODUTO: item.PRODUTO ?? "Produto indisponivel",
    DESCRICAO_TAB: item.DESCRICAO_TAB ?? null,
    ETIQUETA: item.ETIQUETA ?? null,
    REF: item.REF ?? null,
    MODELO: item.MODELO ?? null,
    TIPO: item.TIPO ?? null,
    MARCA: item.MARCA ?? null,
    PATH_IMAGEM_MARCA: item.PATH_IMAGEM_MARCA ?? null,
    PATH_IMAGEM: item.PATH_IMAGEM ?? null,
    SLUG: item.SLUG ?? null,
    ESTOQUE_LOJA: item.ESTOQUE_LOJA ?? 0,
    OURO: normalizePriceValue(item.OURO),
    PRATA: normalizePriceValue(item.PRATA),
    BRONZE: normalizePriceValue(item.BRONZE),
    VL_ATACADO: normalizePriceValue(item.VL_ATACADO),
    VL_CORPORATIVO: normalizePriceValue(item.VL_CORPORATIVO),
    VL_VAREJO: normalizePriceValue(item.VL_VAREJO),
    DECONTO: normalizePriceValue(item.DECONTO),
    IMPORTADO: item.IMPORTADO ?? 0,
    PROMOCAO: item.PROMOCAO ?? 0,
    LANCAMENTO: item.LANCAMENTO ?? 0,
    TEMPODEGARANTIA_DIA: item.TEMPODEGARANTIA_DIA ?? 0,
    DESCRICAO_VENDA: item.DESCRICAO_VENDA ?? null,
    DATADOCADASTRO: normalizeDateValue(item.DATADOCADASTRO),
  };
}

export function adaptHomeSectionProduct(
  item: ProductWebSectionItem,
): ProductWithMetadata {
  return adaptProductFromApi(adaptSectionItemToListItem(item));
}

export function adaptHomeSectionProducts(
  items: ProductWebSectionItem[],
): ProductWithMetadata[] {
  return items.map(adaptHomeSectionProduct);
}

"use server";

import { cacheLife, cacheTag } from "next/cache";
import { envs } from "@/core/config/envs";
import { createLogger } from "@/core/logger";
import { adaptHomeSectionProducts } from "@/lib/adapters/product-sections-adapter";
import { CACHE_TAGS } from "@/lib/cache-config";

import { ProductWebServiceApi } from "@/services/api-main/product/product-service-api";
import type { ProductWebSectionsRequest } from "@/services/api-main/product/types/product-types";
import type { ProductWithMetadata } from "@/types/product";

const logger = createLogger("HomeSectionsActions");

const DEFAULT_SECTION_LIMIT = 8;
const DEFAULT_PAGE_ID = 1;
const DEFAULT_COLUMN_ID = 1;
const DEFAULT_ORDER_ID = 1;

/**
 * Fetch section products with Next.js 16 cache component support
 * Uses 'use cache' directive to enable proper caching
 */
async function fetchSectionProducts(
  params: Partial<ProductWebSectionsRequest>,
  sectionName: string,
): Promise<ProductWithMetadata[]> {
  "use cache";
  cacheLife("frequent");
  cacheTag(CACHE_TAGS.products);

  try {
    const response = await ProductWebServiceApi.findProductWebSections(params);
    const sectionItems = ProductWebServiceApi.extractProductSections(response);

    if (!sectionItems || sectionItems.length === 0) {
      return [];
    }

    return adaptHomeSectionProducts(sectionItems);
  } catch (error) {
    logger.error(`Erro ao carregar seção ${sectionName}`, error);
    return [];
  }
}

function withDefaultParams(
  overrides: Partial<ProductWebSectionsRequest>,
): Partial<ProductWebSectionsRequest> {
  return {
    pe_qt_registros: DEFAULT_SECTION_LIMIT,
    pe_pagina_id: DEFAULT_PAGE_ID,
    pe_coluna_id: DEFAULT_COLUMN_ID,
    pe_ordem_id: DEFAULT_ORDER_ID,
    ...overrides,
  };
}

export async function getHighlightSectionProducts(): Promise<
  ProductWithMetadata[]
> {
  return fetchSectionProducts(
    withDefaultParams({
      pe_id_taxonomy: 0,
      pe_flag_highlight: 1,
      pe_flag_promotions: 0,
      pe_flag_lancamento: 0,
    }),
    "destaques",
  );
}

export async function getPromotionSectionProducts(): Promise<
  ProductWithMetadata[]
> {
  return fetchSectionProducts(
    withDefaultParams({
      pe_id_taxonomy: 0,
      pe_flag_highlight: 0,
      pe_flag_promotions: 1,
      pe_flag_lancamento: 0,
    }),
    "promocoes",
  );
}

export async function getNewReleasesSectionProducts(): Promise<
  ProductWithMetadata[]
> {
  return fetchSectionProducts(
    withDefaultParams({
      pe_id_taxonomy: 0,
      pe_flag_highlight: 0,
      pe_flag_promotions: 0,
      pe_flag_lancamento: 1,
      pe_coluna_id: 2,
      pe_ordem_id: 2,
    }),
    "novidades",
  );
}

export async function getCategoryOneSectionProducts(): Promise<
  ProductWithMetadata[]
> {
  return fetchSectionProducts(
    withDefaultParams({
      pe_id_taxonomy: envs.HOME_CATEGORY1_ID,
      pe_flag_highlight: 0,
      pe_flag_promotions: 0,
      pe_flag_lancamento: 0,
    }),
    "categoria1",
  );
}

export async function getCategoryTwoSectionProducts(): Promise<
  ProductWithMetadata[]
> {
  return fetchSectionProducts(
    withDefaultParams({
      pe_id_taxonomy: envs.HOME_CATEGORY2_ID,
      pe_flag_highlight: 0,
      pe_flag_promotions: 0,
      pe_flag_lancamento: 0,
    }),
    "categoria2",
  );
}

export async function getCategoryThreeSectionProducts(): Promise<
  ProductWithMetadata[]
> {
  return fetchSectionProducts(
    withDefaultParams({
      pe_id_taxonomy: envs.HOME_CATEGORY3_ID,
      pe_flag_highlight: 0,
      pe_flag_promotions: 0,
      pe_flag_lancamento: 0,
    }),
    "categoria3",
  );
}

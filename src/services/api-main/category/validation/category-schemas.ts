/**
 * Schemas de validação para o serviço Category
 */

import { z } from "zod";

/**
 * Schema para buscar menu hierárquico de taxonomias
 */
export const TaxonomyWebMenuSchema = z.object({
  pe_id_tipo: z
    .number()
    .int()
    .min(0, { message: "pe_id_tipo deve ser um número não-negativo" }),
  pe_parent_id: z
    .number()
    .int()
    .min(0, { message: "pe_parent_id deve ser um número não-negativo" })
    .optional(),
});

/**
 * Schema para buscar taxonomia por ID ou slug
 */
export const TaxonomyFindIdSchema = z
  .object({
    pe_id_taxonomy: z.number().int().positive().optional(),
    pe_slug_taxonomy: z.string().trim().min(1).max(300).optional(),
  })
  .refine(
    (data) =>
      data.pe_id_taxonomy !== undefined || data.pe_slug_taxonomy !== undefined,
    {
      message:
        "Informe pe_id_taxonomy ou pe_slug_taxonomy para buscar a taxonomia",
      path: ["pe_id_taxonomy"],
    },
  );

export type TaxonomyWebMenuInput = z.infer<typeof TaxonomyWebMenuSchema>;
export type TaxonomyFindIdInput = z.infer<typeof TaxonomyFindIdSchema>;

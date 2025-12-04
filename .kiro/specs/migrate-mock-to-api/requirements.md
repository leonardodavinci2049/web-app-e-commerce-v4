# Requirements Document

## Introduction

Este documento especifica os requisitos para migrar os dados mockados de produtos e categorias para dados reais obtidos via API REST. Atualmente, as páginas de listagem de produtos, detalhe de produto e listagem por categoria utilizam dados estáticos do arquivo `mock-data.ts`. A migração visa integrar os serviços de API existentes (`ProductWebServiceApi` e `CategoryServiceApi`) através de server actions, mantendo a estrutura de cache e a experiência do usuário.

## Glossary

- **Sistema**: Aplicação Next.js de e-commerce
- **Server Action**: Função assíncrona do Next.js executada no servidor, utilizada para buscar dados da API
- **ProductWebServiceApi**: Serviço de API para operações de produtos (`findProducts`, `findProductById`)
- **CategoryServiceApi**: Serviço de API para operações de categorias (`findMenu`)
- **Menu de Categoria**: Estrutura hierárquica de três níveis (família, grupo, subgrupo) retornada pelo endpoint `taxonomy-find-menu`
- **ProductWebListItem**: Tipo de dados retornado pela API para listagem de produtos
- **ProductWebDetail**: Tipo de dados retornado pela API para detalhes de um produto
- **TblTaxonomyWebMenu**: Tipo de dados retornado pela API para menu de categorias

## Requirements

### Requirement 1

**User Story:** As a developer, I want to replace mock product data with real API data, so that the product listing page displays actual products from the database.

#### Acceptance Criteria

1. WHEN the products page loads THEN the Sistema SHALL fetch products using `ProductWebServiceApi.findProducts` method
2. WHEN the API returns product data THEN the Sistema SHALL transform `ProductWebListItem` to the format expected by UI components
3. WHEN the API call fails THEN the Sistema SHALL return an empty array and log the error
4. WHEN products are fetched THEN the Sistema SHALL maintain the existing cache strategy using `cacheLife` and `cacheTag`

### Requirement 2

**User Story:** As a developer, I want to replace mock product detail data with real API data, so that the product detail page displays actual product information.

#### Acceptance Criteria

1. WHEN a product detail page loads THEN the Sistema SHALL fetch product using `ProductWebServiceApi.findProductById` method with product ID and slug
2. WHEN the API returns product detail THEN the Sistema SHALL transform `ProductWebDetail` to the format expected by UI components
3. WHEN the product is not found THEN the Sistema SHALL return undefined to trigger the not-found page
4. WHEN fetching related products THEN the Sistema SHALL use the taxonomy ID from the product detail response

### Requirement 3

**User Story:** As a developer, I want to replace mock category menu data with real API data, so that the category navigation displays actual categories from the database.

#### Acceptance Criteria

1. WHEN the category menu is requested THEN the Sistema SHALL fetch categories using `CategoryServiceApi.findMenu` method
2. WHEN the API returns menu data THEN the Sistema SHALL transform `TblTaxonomyWebMenu` hierarchical structure to the format expected by UI components
3. WHEN transforming categories THEN the Sistema SHALL preserve the three-level hierarchy (família, grupo, subgrupo)
4. WHEN the API call fails THEN the Sistema SHALL return an empty array and log the error

### Requirement 4

**User Story:** As a developer, I want to fetch products filtered by category, so that the category page displays only products belonging to that category.

#### Acceptance Criteria

1. WHEN a category page loads THEN the Sistema SHALL fetch products using `ProductWebServiceApi.findProducts` with `pe_id_taxonomy` parameter
2. WHEN filtering by subcategory THEN the Sistema SHALL use the subcategory taxonomy ID as the filter parameter
3. WHEN no products match the category THEN the Sistema SHALL return an empty array

### Requirement 5

**User Story:** As a developer, I want to find a category by its slug, so that the category page can resolve the correct category from the URL.

#### Acceptance Criteria

1. WHEN resolving a category slug THEN the Sistema SHALL search the hierarchical menu structure for a matching slug
2. WHEN a category slug matches THEN the Sistema SHALL return the category object with its parent hierarchy
3. WHEN a subcategory slug is provided THEN the Sistema SHALL return both the parent category and the matching subcategory
4. WHEN no category matches the slug THEN the Sistema SHALL return null

### Requirement 6

**User Story:** As a developer, I want the data transformation to be consistent and type-safe, so that the UI components receive properly formatted data.

#### Acceptance Criteria

1. WHEN transforming product data THEN the Sistema SHALL map API fields to UI fields consistently (e.g., `ID_PRODUTO` to `id`, `PRODUTO` to `name`)
2. WHEN transforming category data THEN the Sistema SHALL generate proper `href` paths based on slug hierarchy
3. WHEN transforming prices THEN the Sistema SHALL convert string values to numbers using `VL_VAREJO` as the primary price field
4. WHEN transforming images THEN the Sistema SHALL use `PATH_IMAGEM` or provide a fallback placeholder image


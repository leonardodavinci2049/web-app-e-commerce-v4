# Implementation Plan

- [x] 1. Create data transformer module




  - [ ] 1.1 Create `src/lib/transformers.ts` with UI type definitions
    - Define `UIProduct`, `UICategory`, `UISubcategory` interfaces


    - Export placeholder image constant
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - [ ] 1.2 Implement `transformProductListItem` function
    - Map `ProductWebListItem` fields to `UIProduct`
    - Handle price conversion from string to number
    - Handle image fallback to placeholder
    - Handle stock boolean conversion


    - _Requirements: 1.2, 6.1, 6.3, 6.4_
  - [ ]* 1.3 Write property test for product list transformation
    - **Property 1: Product list transformation completeness**
    - **Validates: Requirements 1.2, 6.1, 6.3, 6.4**
  - [x] 1.4 Implement `transformProductDetail` function

    - Map `ProductWebDetail` fields to `UIProduct`

    - Include additional detail fields (specifications, shipping)
    - _Requirements: 2.2_
  - [ ]* 1.5 Write property test for product detail transformation
    - **Property 2: Product detail transformation completeness**
    - **Validates: Requirements 2.2**
  - [ ] 1.6 Implement `transformCategoryMenu` function
    - Transform `TblTaxonomyWebMenu[]` to `UICategory[]`
    - Preserve three-level hierarchy (família, grupo, subgrupo)

    - Generate proper href paths based on slug hierarchy

    - _Requirements: 3.2, 3.3, 6.2_
  - [ ]* 1.7 Write property test for category transformation
    - **Property 3: Category transformation preserves hierarchy**
    - **Validates: Requirements 3.2, 3.3**
  - [x]* 1.8 Write property test for category href generation

    - **Property 5: Category href generation follows slug hierarchy pattern**
    - **Validates: Requirements 6.2**
  - [x] 1.9 Implement `findCategoryBySlug` function




    - Search hierarchical structure for matching slug
    - Return category with parent hierarchy
    - Handle subcategory slug resolution

    - _Requirements: 5.1, 5.2, 5.3_
  - [ ]* 1.10 Write property test for slug resolution
    - **Property 4: Slug resolution finds correct category with parent hierarchy**
    - **Validates: Requirements 5.1, 5.2, 5.3**


- [ ] 2. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.


- [ ] 3. Update product service to use real API
  - [ ] 3.1 Update `getProducts` function
    - Replace mock data with `ProductWebServiceApi.findProducts`
    - Apply `transformProductListItem` to results

    - Maintain cache strategy with `cacheLife` and `cacheTag`



    - _Requirements: 1.1, 1.4_
  - [x] 3.2 Update `getProductById` function

    - Replace mock data with `ProductWebServiceApi.findProductById`
    - Apply `transformProductDetail` to result
    - Handle not-found case returning undefined
    - _Requirements: 2.1, 2.3_

  - [ ] 3.3 Update `getProductBySlug` function
    - Extract product ID from slug
    - Use `ProductWebServiceApi.findProductById` with extracted ID

    - Apply transformation to result
    - _Requirements: 2.1, 2.2_
  - [ ] 3.4 Update `getRelatedProducts` function
    - Use taxonomy ID from product detail




    - Fetch products with `pe_id_taxonomy` parameter
    - Filter out current product from results
    - _Requirements: 2.4_


- [ ] 4. Update category service to use real API
  - [ ] 4.1 Update `getCategories` function
    - Replace mock data with `CategoryServiceApi.findMenu`



    - Apply `transformCategoryMenu` to results
    - Maintain cache strategy
    - _Requirements: 3.1, 3.4_
  - [ ] 4.2 Update `getCategoryBySlug` function
    - Fetch categories using `getCategories`
    - Use `findCategoryBySlug` to resolve slug
    - Return category and subcategory objects
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  - [ ] 4.3 Update `getProductsByCategory` function
    - Use `ProductWebServiceApi.findProducts` with `pe_id_taxonomy`
    - Apply transformation to results
    - Handle empty results
    - _Requirements: 4.1, 4.2, 4.3_

- [ ] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Update server actions error handling
  - [ ] 6.1 Update `fetchProductsAction` error handling
    - Ensure proper error logging
    - Return empty array on failure
    - _Requirements: 1.3_
  - [ ] 6.2 Update `fetchCategoriesAction` error handling
    - Ensure proper error logging
    - Return empty array on failure
    - _Requirements: 3.4_
  - [ ] 6.3 Update `fetchProductBySlugAction` error handling
    - Handle not-found case
    - Return undefined on failure
    - _Requirements: 2.3_

- [ ] 7. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.


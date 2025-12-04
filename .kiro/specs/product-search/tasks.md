# Implementation Plan

- [x] 1. Create SearchInput client component




  - [ ] 1.1 Create SearchInput component with form handling and validation
    - Create `src/components/search/SearchInput.tsx` as a Client Component
    - Implement form with controlled input state
    - Add validation to reject empty and whitespace-only terms
    - Implement navigation to `/products?q={encodedTerm}` on submit
    - Support both Enter key and button click submission
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [ ]* 1.2 Write property test for valid search term navigation
    - **Property 1: Valid search term navigation**
    - **Validates: Requirements 1.1, 1.4**
  - [x]* 1.3 Write property test for invalid search term rejection




    - **Property 2: Invalid search term rejection**
    - **Validates: Requirements 1.2, 1.3**



- [ ] 2. Update product service and actions to support search
  - [ ] 2.1 Update getProducts service function to accept searchTerm parameter
    - Modify `src/services/product.ts` getProducts function
    - Add `searchTerm` parameter to function signature
    - Pass `pe_produto` to `ProductWebServiceApi.findProducts` when searchTerm is provided
    - _Requirements: 2.1_



  - [-] 2.2 Update fetchProductsAction to accept searchTerm parameter

    - Modify `src/app/actions/product.ts` fetchProductsAction function
    - Add `searchTerm` parameter to params object
    - Pass searchTerm to getProducts service
    - _Requirements: 2.1_


  - [ ]* 2.3 Write property test for search term API propagation
    - **Property 3: Search term API propagation**
    - **Validates: Requirements 2.1**

- [ ] 3. Update products page to handle search query parameter
  - [ ] 3.1 Update ProductsPage to receive and process searchParams
    - Modify `src/app/(catalog)/products/page.tsx`
    - Add searchParams prop to page component
    - Extract `q` parameter from searchParams




    - Pass searchTerm to ProductListingContainer
    - Update page title to show search term when present
    - _Requirements: 2.1, 4.1, 4.2, 4.3_


  - [ ] 3.2 Update ProductListingContainer to accept searchTerm prop
    - Modify `src/app/(catalog)/products/_components/ProductListingContainer.tsx`
    - Add searchTerm prop to component interface


    - Pass searchTerm to fetchProductsAction
    - _Requirements: 2.1, 2.2_
  - [ ]* 3.3 Write property test for search results display consistency
    - **Property 4: Search results display consistency**
    - **Validates: Requirements 2.2**
  - [ ]* 3.4 Write property test for search term display in title
    - **Property 5: Search term display in title**
    - **Validates: Requirements 4.1, 4.2**

- [ ] 4. Integrate SearchInput into header components
  - [ ] 4.1 Replace search input in MainHeader with SearchInput component
    - Modify `src/app/(home)/_components/header/MainHeader.tsx`


    - Import and use SearchInput component
    - Remove existing inline input markup
    - _Requirements: 3.1, 3.3_
  - [ ] 4.2 Replace search input in MobileMainHeader with SearchInput component
    - Modify `src/app/(home)/_components/header/MobileMainHeader.tsx`
    - Import and use SearchInput component
    - Remove existing inline input markup
    - _Requirements: 3.2, 3.3_

- [ ] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ]* 6. Write unit tests for search functionality
  - [ ]* 6.1 Write unit tests for SearchInput component
    - Test form submission with valid term
    - Test rejection of empty and whitespace terms
    - Test URL encoding of special characters
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [ ]* 6.2 Write unit tests for product service search integration
    - Test getProducts with searchTerm parameter
    - Test fetchProductsAction with searchTerm parameter
    - _Requirements: 2.1_

- [ ] 7. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

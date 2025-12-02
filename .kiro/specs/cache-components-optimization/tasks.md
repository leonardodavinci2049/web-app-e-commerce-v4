# Implementation Plan

- [x] 1. Set up cache infrastructure and configuration


  - [x] 1.1 Create cache configuration file with tags and durations


    - Create `src/lib/cache-config.ts` with CACHE_TAGS and CACHE_DURATIONS constants
    - Define tag generator functions for products and categories
    - _Requirements: 4.1, 4.2, 6.1, 6.2, 6.3, 6.4, 6.5_


  - [x] 1.2 Create cache revalidation Server Actions

    - Create `src/app/actions/cache.ts` with revalidateProductAction, revalidateCategoryAction, revalidateNavigationAction
    - Implement safeRevalidateTag with error handling
    - _Requirements: 4.3, 4.4, 4.5_


- [x] 2. Create Skeleton components for Suspense fallbacks



  - [ ] 2.1 Create ProductCardSkeleton component
    - Create `src/components/skeletons/ProductCardSkeleton.tsx`


    - Implement animated placeholder matching ProductCard layout
    - _Requirements: 1.1, 2.1_



  - [ ] 2.2 Create ProductGridSkeleton component
    - Create `src/components/skeletons/ProductGridSkeleton.tsx`
    - Accept count prop for number of skeleton cards


    - _Requirements: 1.1_

  - [x] 2.3 Create NavigationSkeleton component


    - Create `src/components/skeletons/NavigationSkeleton.tsx`
    - Match DepartmentNavigation layout
    - _Requirements: 5.1, 5.2_




  - [x] 2.4 Create HeroBannerSkeleton component


    - Create `src/components/skeletons/HeroBannerSkeleton.tsx`
    - Match HeroBanner dimensions
    - _Requirements: 6.3_




  - [ ] 2.5 Create ProductDetailSkeleton component
    - Create `src/components/skeletons/ProductDetailSkeleton.tsx`

    - Include gallery, info, and tabs skeleton sections


    - _Requirements: 2.1_

  - [x] 2.6 Create skeletons barrel export


    - Create `src/components/skeletons/index.ts` exporting all skeletons
    - _Requirements: 1.1, 2.1_



- [ ] 3. Refactor Service layer with cache
  - [ ] 3.1 Update product service with React cache and unstable_cache
    - Update `src/services/product.ts` to use `cache()` from React for request deduplication

    - Wrap functions with `unstable_cache` for persistent cache with tags

    - Add cache tags and revalidation periods per CACHE_DURATIONS
    - _Requirements: 1.3, 1.4, 2.2, 2.3_



- [x] 4. Refactor Server Actions to use cached services

  - [x] 4.1 Update product actions to use cached service methods


    - Update `src/app/actions/product.ts` to call cached service methods
    - Ensure all data access goes through service layer
    - _Requirements: 1.3, 2.2_

- [x] 5. Create Client Island components (isolated interactivity)


  - [x] 5.1 Create AddToCartButton client component

    - Create `src/components/product/actions/AddToCartButton.tsx`

    - Minimal client component with only cart interaction logic

    - _Requirements: 3.1, 3.2_

  - [x] 5.2 Create WishlistButton client component

    - Create `src/components/product/actions/WishlistButton.tsx`

    - Minimal client component with only wishlist toggle logic

    - _Requirements: 3.1, 3.3_



  - [ ] 5.3 Create BannerCarousel client component
    - Create `src/components/banner/BannerCarousel.tsx`
    - Client wrapper for carousel navigation, receives server-rendered children


    - _Requirements: 3.1_


  - [x] 5.4 Create UserActions client component


    - Create `src/components/header/UserActions.tsx`
    - Minimal client component for cart count, user menu
    - _Requirements: 5.3_




  - [ ] 5.5 Create LoadMoreProducts client component
    - Create `src/components/product/LoadMoreProducts.tsx`
    - Client component for pagination, calls Server Action for more products


    - _Requirements: 3.1_


- [x] 6. Refactor ProductCard to Server Component with Client Islands


  - [ ] 6.1 Convert ProductCard to async Server Component
    - Refactor `src/app/(home)/_components/ProductCard.tsx` to Server Component
    - Remove "use client" directive


    - Import AddToCartButton and WishlistButton as client islands
    - Keep all static rendering (image, name, price) in server component

    - _Requirements: 3.1, 3.2, 3.3, 3.4_




  - [ ] 6.2 Update ProductCard imports across the application
    - Update all files importing ProductCard to use new structure


    - _Requirements: 3.1_


- [x] 7. Refactor ProductGrid to Server Component with Suspense

  - [-] 7.1 Convert ProductGrid to async Server Component

    - Refactor `src/app/(home)/_components/ProductGrid.tsx` to async Server Component


    - Remove "use client" directive


    - Fetch products via Server Action inside component
    - _Requirements: 1.1, 1.2, 1.3_

  - [ ] 7.2 Create category ProductGrid variant
    - Refactor `src/app/(catalog)/category/_components/product-grid.tsx`
    - Convert to Server Component with LoadMoreProducts client island
    - _Requirements: 1.1, 1.2_

- [ ] 8. Refactor Navigation components to Server Components
  - [ ] 8.1 Convert DepartmentNavigation to async Server Component
    - Refactor `src/app/(home)/_components/DepartmentNavigation.tsx`
    - Remove "use client" directive
    - Fetch categories via Server Action
    - _Requirements: 5.1, 5.2_

  - [ ] 8.2 Convert MainHeader to Server Component with UserActions island
    - Refactor header components to Server Components
    - Keep UserActions as client island for user-specific content
    - _Requirements: 5.1, 5.3_

- [ ] 9. Refactor HeroBanner to Server Component with BannerCarousel island
  - [ ] 9.1 Convert HeroBanner to async Server Component
    - Refactor `src/app/(home)/_components/HeroBanner.tsx`
    - Move slide data fetching to server
    - Use BannerCarousel client island for navigation controls
    - _Requirements: 6.3_

- [ ] 10. Refactor Product Detail page with cache and Suspense
  - [ ] 10.1 Update ProductDetailContainer with Suspense boundaries
    - Add Suspense boundaries around ProductImageGallery and ProductInfo
    - Use ProductDetailSkeleton as fallback
    - _Requirements: 2.1, 2.4_

  - [ ] 10.2 Convert ProductInfo to Server Component with client islands
    - Refactor ProductInfo to Server Component
    - Extract interactive elements to client islands
    - _Requirements: 2.1, 3.1_

- [ ] 11. Update page components with Suspense boundaries
  - [ ] 11.1 Update home page with Suspense boundaries
    - Wrap async components in Suspense with skeleton fallbacks
    - Ensure page shell is static
    - _Requirements: 7.1_

  - [ ] 11.2 Update category page with Suspense boundaries
    - Add Suspense around product grid and sidebar
    - _Requirements: 7.2_

  - [ ] 11.3 Update product detail page with Suspense boundaries
    - Add Suspense around product detail sections
    - _Requirements: 2.1_

- [ ] 12. Implement static generation for popular pages
  - [ ] 12.1 Add generateStaticParams for category pages
    - Implement generateStaticParams in category page to pre-render top categories
    - _Requirements: 7.2_

  - [ ] 12.2 Add generateStaticParams for product pages
    - Implement generateStaticParams in product page to pre-render all products
    - _Requirements: 7.4_

- [ ] 13. Implement stale-while-revalidate behavior
  - [ ] 13.1 Configure stale-while-revalidate in service cache
    - Ensure unstable_cache is configured with appropriate revalidate times
    - Verify stale content is served while revalidating
    - _Requirements: 2.3, 7.3_

- [ ] 14. Create AsyncErrorBoundary component
  - [ ] 14.1 Implement AsyncErrorBoundary client component
    - Create `src/components/error/AsyncErrorBoundary.tsx`
    - Handle errors in async Server Components gracefully
    - _Requirements: 1.4_

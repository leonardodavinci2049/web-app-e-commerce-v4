# Implementation Plan

- [x] 1. Criar tipos e função de transformação de dados


  - [x] 1.1 Criar interface TransformedProduct e CategoryMap em arquivo de tipos


    - Adicionar tipos em `src/types/product.ts` ou criar arquivo dedicado
    - _Requirements: 1.2_

  - [x] 1.2 Criar função `transformProducts` para resolver IDs em nomes

    - Criar em `src/lib/product-utils.ts`
    - Função recebe RawProduct[] e Category[], retorna TransformedProduct[]
    - _Requirements: 1.1, 1.2_
  - [x] 1.3 Criar função `extractCategoryMap` para gerar mapa de categorias/subcategorias

    - Retorna objeto com categoria -> subcategorias[]
    - _Requirements: 2.1_
  - [ ]* 1.4 Escrever property test para transformação de produtos
    - **Property 1: Transformação preserva todos os produtos**
    - **Validates: Requirements 1.2**

- [x] 2. Criar componente ProductListingClient


  - [x] 2.1 Criar arquivo `src/app/(catalog)/products/_components/components/ProductListingClient.tsx`


    - Mover lógica de estado e filtragem do ProductListing atual
    - Usar "use client" apenas neste componente
    - _Requirements: 2.1, 3.1, 4.2_
  - [x] 2.2 Implementar lógica de filtragem usando dados já transformados

    - Filtrar por category (string) em vez de categoryId
    - _Requirements: 5.1_
  - [x] 2.3 Implementar lógica de paginação e contador

    - Manter displayCount e hasMore
    - _Requirements: 3.2, 3.3, 5.2_
  - [ ]* 2.4 Escrever property test para filtragem
    - **Property 2: Filtragem por categoria retorna subconjunto correto**
    - **Validates: Requirements 5.1**
  - [ ]* 2.5 Escrever property test para paginação
    - **Property 3: Paginação retorna quantidade correta**
    - **Validates: Requirements 3.2, 5.2**

- [x] 3. Refatorar ProductListing para Server Component


  - [x] 3.1 Remover "use client" do ProductListing


    - Remover useEffect e useProductStore do componente
    - _Requirements: 4.1_

  - [ ] 3.2 Adicionar transformação de dados no ProductListing
    - Usar funções criadas na tarefa 1
    - Passar dados transformados para ProductListingClient

    - _Requirements: 1.1, 4.3_
  - [x] 3.3 Integrar ProductListingClient como filho


    - Passar products, categories e categoryMap como props



    - _Requirements: 4.2_


- [ ] 4. Checkpoint - Garantir que tudo funciona
  - Ensure all tests pass, ask the user if questions arise.




- [ ] 5. Ajustar store e componentes dependentes
  - [ ] 5.1 Simplificar useProductStore se necessário
    - Remover setInitialData se não for mais usado
    - _Requirements: 2.2_
  - [ ] 5.2 Verificar ProductFilters funciona com novos dados
    - Ajustar se necessário para usar nomes em vez de IDs
    - _Requirements: 2.1_

- [ ] 6. Final Checkpoint - Garantir funcionamento completo
  - Ensure all tests pass, ask the user if questions arise.

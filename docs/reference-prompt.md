# Implementar funcionalidade do carrinho

## Contexto

- No projeto atual temos as seguintes rotas com cards de produtos, em que o usuário tem disponibilidade, por meio de um botão, de adicionar o produto ao carrinho (ainda não implementado).

1. / (Home)
2. /products (lista de produto) `src/app/(catalog)/products/page.tsx` 
3. /category/ `src/app/(catalog)/category/[...slug]/page.tsx`
4. /product/perfume-versace-eros-edt-100ml-36 `src/app/(catalog)/product/[...slug]/page.tsx`

## Objetivo

- Implementar o painel direito do Carrinho, que lista os produtos adicionados pelo usuário.
- Implementar funcionalidade ao botão do card dos produtos para adicionar ao carrinho;
- Implementar funcionalidade do minicart; 
    1. ShoppingCart no header para telas grande `src/app/(home)/_components/header/components/UserActions.tsx`
    2. Icon Minicard no painel de navegação `src/app/(home)/_components/footer/MobileBottomMenu.tsx`
- O fechamento do carrinho será por meio do WHATSAPP.

## Fluxo da operação

- O usuário navega pelas rotas, onde lista ou exibe o produto.
- Clica no botão "Adicionar" e o produto é adicionado à lista dos itens do carrinho.
- O carrinho é exibido quando o usuário clica nos ícones de Minicart.
- O painel do carrinho é exibido do lado direito da tela.
- Quando o usuário clicar no botão de fechar o pedido
- Será formatada a lista que está no carrinho e enviada para um link do telefone no WhatsApp.
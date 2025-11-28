/**
 * Mock data for Account Dashboard
 * Simulates customer data, orders, and stats
 */

import type {
  Customer,
  DashboardStat,
  Order,
  QuickAction,
  SalesConsultant,
} from "@/types/account";

// Customer data
export const mockCustomer: Customer = {
  id: "1",
  name: "Mauro Augusto Ramalli",
  email: "mauro.ramalli@email.com",
  phone: "(11) 91234-5678",
  cpf: "123.456.789-00",
  type: "PF",
  memberSince: "2023-01-15",
};

// Dashboard stats
export const mockDashboardStats: DashboardStat[] = [
  {
    id: "1",
    title: "Quantidade de Pedidos",
    value: "0",
    description: "Nenhum pedido ainda",
    icon: "package",
    iconColor: "text-blue-500",
  },
  {
    id: "2",
    title: "Quantidade de Itens",
    value: "0",
    description: "Nenhum item comprado",
    icon: "box",
    iconColor: "text-green-500",
  },
  {
    id: "3",
    title: "Ticket Médio",
    value: "R$ 0,00",
    description: "Sem compras ainda",
    icon: "trending-up",
    iconColor: "text-purple-500",
  },
  {
    id: "4",
    title: "Total Compras",
    value: "R$ 0,00",
    description: "Comece suas compras!",
    icon: "wallet",
    iconColor: "text-orange-500",
  },
];

// Recent orders
export const mockRecentOrders: Order[] = [
  {
    id: "1",
    orderNumber: "471957",
    date: "2024-01-05",
    status: "CONFIRMED",
    statusLabel: "Pedido CONFIRMADO",
    statusBadgeVariant: "success",
    itemCount: 1,
    total: 3445.0,
    deliveryDate: "2024-01-08",
  },
  {
    id: "2",
    orderNumber: "470635",
    date: "2024-01-03",
    status: "CONFIRMED",
    statusLabel: "Pedido CONFIRMADO",
    statusBadgeVariant: "success",
    itemCount: 1,
    total: 106.0,
  },
  {
    id: "3",
    orderNumber: "469735",
    date: "2024-01-02",
    status: "CONFIRMED",
    statusLabel: "Pedido CONFIRMADO",
    statusBadgeVariant: "success",
    itemCount: 2,
    total: 186.0,
  },
  {
    id: "4",
    orderNumber: "469634",
    date: "2023-12-30",
    status: "PENDING",
    statusLabel: "Pedido PENDENTE",
    statusBadgeVariant: "default",
    itemCount: 1,
    total: 756.0,
  },
  {
    id: "5",
    orderNumber: "461333",
    date: "2023-12-28",
    status: "CONFIRMED",
    statusLabel: "Entrega EM ABERTO",
    statusBadgeVariant: "secondary",
    itemCount: 1,
    total: 198.0,
  },
];

// Quick actions
export const mockQuickActions: QuickAction[] = [
  {
    id: "1",
    title: "Novo Pedido",
    description: "Explorar catálogo",
    icon: "shopping-cart",
    href: "/products",
    iconColor: "text-blue-500",
  },
  {
    id: "2",
    title: "Buscar Produtos",
    description: "Retomar itens",
    icon: "search",
    href: "/products",
    iconColor: "text-green-500",
  },
  {
    id: "3",
    title: "Repetir Pedido",
    description: "Último pedido",
    icon: "rotate-ccw",
    href: "/account/orders",
    iconColor: "text-orange-500",
  },
  {
    id: "4",
    title: "Promoções",
    description: "Produtos validos",
    icon: "tag",
    href: "/products?filter=promo",
    iconColor: "text-red-500",
  },
  {
    id: "5",
    title: "Serviços",
    description: "Serviços Técnicos Especializados",
    icon: "wrench",
    href: "/services",
    iconColor: "text-purple-500",
  },
  {
    id: "6",
    title: "Suporte",
    description: "Falar com consultor",
    icon: "headphones",
    href: "/contact",
    iconColor: "text-indigo-500",
  },
];

// Sales consultant
export const mockSalesConsultant: SalesConsultant = {
  id: "1",
  name: "Wellington de Freitas",
  role: "Consultor de Vendas",
  phone: "5454141414",
  email: "wellington@mundialarevenda.com.br",
  isAvailable: true,
};

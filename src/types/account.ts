/**
 * Types for Account Dashboard
 * All interfaces for customer account area
 */

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  type: "PF" | "PJ"; // Pessoa Física ou Jurídica
  avatar?: string;
  memberSince: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  itemCount: number;
  total: number;
  deliveryDate?: string;
  statusLabel: string;
  statusBadgeVariant: "default" | "secondary" | "success" | "destructive";
}

export interface DashboardStat {
  id: string;
  title: string;
  value: string | number;
  description: string;
  icon: string;
  iconColor: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  iconColor: string;
}

export interface SalesConsultant {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar?: string;
  isAvailable: boolean;
}

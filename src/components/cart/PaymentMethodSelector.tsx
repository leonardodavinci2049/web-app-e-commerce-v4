"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PaymentMethod } from "@/types/cart";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const paymentMethods: { value: PaymentMethod; label: string; icon: string }[] =
  [
    { value: "PIX", label: "PIX", icon: "💳" },
    { value: "Cartão", label: "Cartão - Consulte Taxas de Parcelamentos", icon: "💳" },
    { value: "Dinheiro", label: "Dinheiro", icon: "💵" },
  ];

export function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="payment-method"
        className="text-sm font-medium text-foreground"
      >
        Forma de Pagamento
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="payment-method" className="w-full">
          <SelectValue placeholder="Selecione a forma de pagamento" />
        </SelectTrigger>
        <SelectContent>
          {paymentMethods.map((method) => (
            <SelectItem key={method.value} value={method.value}>
              <span className="flex items-center gap-2">
                <span>{method.icon}</span>
                <span>{method.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

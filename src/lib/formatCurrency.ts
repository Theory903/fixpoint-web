export function formatCurrency(amount: number): string {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  
export const businessTypes = [
  { value: 'retail', label: 'Retail store' },
  { value: 'supermarket', label: 'Supermarket / hypermarket' },
  { value: 'grocery', label: 'Grocery / kirana store' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'cafe', label: 'Cafe / bakery' },
  { value: 'pharmacy', label: 'Pharmacy' },
  { value: 'clothing', label: 'Clothing / footwear / cosmetics' },
  { value: 'electronics', label: 'Electronics / mobile shop' },
  { value: 'wholesale', label: 'Wholesaler / distributor' },
  { value: 'multi-branch', label: 'Multi-branch / chain' },
  { value: 'other', label: 'Other' },
] as const;

export const branchRanges = [
  { value: '1', label: '1 store' },
  { value: '2-3', label: '2 - 3 stores' },
  { value: '4-10', label: '4 - 10 stores' },
  { value: '11-50', label: '11 - 50 stores' },
  { value: '50+', label: 'More than 50 stores' },
] as const;

export const softwareNeeds = [
  { value: 'pos-billing', label: 'POS billing & GST invoices' },
  { value: 'inventory', label: 'Inventory & stock management' },
  { value: 'restaurant', label: 'Restaurant / cafe POS' },
  { value: 'pharmacy', label: 'Pharmacy POS' },
  { value: 'multi-branch', label: 'Multi-branch / chain management' },
  { value: 'accounting', label: 'Accounting, expenses & reports' },
  { value: 'full-suite', label: 'Complete suite (everything)' },
  { value: 'not-sure', label: 'Not sure yet - need advice' },
] as const;

export const timeSlots = [
  { value: 'morning', label: 'Morning (10:00 - 13:00)' },
  { value: 'afternoon', label: 'Afternoon (13:00 - 16:00)' },
  { value: 'evening', label: 'Evening (16:00 - 19:00)' },
] as const;

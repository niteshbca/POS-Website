import {
  AlertTriangle,
  BadgePercent,
  Banknote,
  BarChart3,
  Boxes,
  Building2,
  CalendarClock,
  ClipboardList,
  Cloud,
  CreditCard,
  DatabaseBackup,
  FileSpreadsheet,
  FileText,
  HeartHandshake,
  LineChart,
  Lock,
  MessageSquare,
  Package,
  Plug,
  QrCode,
  RotateCcw,
  ScanBarcode,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Store,
  Truck,
  UserCog,
  Users,
  UtensilsCrossed,
  WifiOff,
  type LucideIcon,
} from 'lucide-react';

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FeatureGroup {
  id: string;
  title: string;
  blurb: string;
  items: FeatureItem[];
}

export const featureGroups: FeatureGroup[] = [
  {
    id: 'sales-billing',
    title: 'Sales & Billing',
      blurb: 'Fast Billing, GST Invoice, Barcode Scanning & Payment Modes for all types of shops.',
    items: [
      { icon: ScanBarcode, title: 'Barcode billing', description: 'Scan products for lightning-fast checkout with keyboard or scanner input.' },
      { icon: FileText, title: 'GST-ready invoicing', description: 'Generate tax-compliant invoices and receipts with configurable tax rates for India.' },
      { icon: BadgePercent, title: 'Discounts & offers', description: 'Item and bill-level discounts, coupon codes and happy-hour pricing rules.' },
      { icon: RotateCcw, title: 'Returns & exchanges', description: 'Handle sales returns, exchanges and refunds with a complete audit trail.' },
      { icon: CreditCard, title: 'Multiple payment modes', description: 'Cash, card, UPI, wallet and split payments recorded against each bill.' },
      { icon: QrCode, title: 'Scan & pay', description: 'Show a QR code for UPI collection and reconcile payments per invoice.' },
    ],
  },
  {
    id: 'inventory',
    title: 'Inventory & Stock',
      blurb: 'Complete Inventory Management, Low Stock Alerts, Batch & Expiry Tracking.',
    items: [
      { icon: Package, title: 'Product catalogue', description: 'Variants, units, categories, brands and images in one organised catalogue.' },
      { icon: AlertTriangle, title: 'Low-stock alerts', description: 'Reorder levels and automatic alerts so fast-moving items never run out.' },
      { icon: CalendarClock, title: 'Batch & expiry tracking', description: 'Track batches and expiry dates — essential for pharmacy and food retail.' },
      { icon: Boxes, title: 'Warehouse & transfers', description: 'Move stock between warehouses and branches with full traceability.' },
      { icon: ClipboardList, title: 'Stock adjustments', description: 'Record damage, wastage and physical stock counts with reasons.' },
      { icon: Store, title: 'Multi-store inventory', description: 'See stock per store and search availability across your network.' },
    ],
  },
  {
    id: 'customers',
    title: 'Customers & Relationships',
      blurb: 'CRM, Customer Khata, Loyalty Points, WhatsApp Receipts & Follow-ups.',
    items: [
      { icon: Users, title: 'Customer profiles', description: 'Contact details, purchase history, preferences and notes in one place.' },
      { icon: Banknote, title: 'Credit & khata tracking', description: 'Track customer credit (udhaar), payments and outstanding balances.' },
      { icon: HeartHandshake, title: 'Loyalty & rewards', description: 'Points, tiers and repeat-purchase rewards to drive retention.' },
      { icon: MessageSquare, title: 'WhatsApp receipts', description: 'Send digital bills and offers to customers on WhatsApp (when configured).' },
    ],
  },
  {
    id: 'suppliers',
    title: 'Suppliers & Purchases',
    blurb: 'Manage procurement and payables without spreadsheets.',
    items: [
      { icon: Truck, title: 'Supplier management', description: 'Supplier records, contact details, pricing and payment terms.' },
      { icon: ClipboardList, title: 'Purchase orders', description: 'Raise POs, receive goods and update stock automatically.' },
      { icon: FileText, title: 'Payables & ledgers', description: 'Track what you owe, payment due dates and supplier ledgers.' },
      { icon: RotateCcw, title: 'Purchase returns', description: 'Return damaged or excess goods to suppliers and adjust stock.' },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics & Reports',
    blurb: 'Understand your business with clear, exportable reporting.',
    items: [
      { icon: BarChart3, title: 'Sales dashboards', description: 'Daily, weekly and hourly sales trends at a glance.' },
      { icon: LineChart, title: 'Profit & margin insight', description: 'Gross margin and category performance based on your cost prices.' },
      { icon: FileSpreadsheet, title: 'Exportable reports', description: 'Export to CSV/Excel and share scheduled reports with your team.' },
      { icon: Building2, title: 'Multi-branch reporting', description: 'Consolidated and per-branch reports across your entire network.' },
      { icon: Banknote, title: 'Expense tracking', description: 'Record operating expenses and category spend alongside sales.' },
    ],
  },
  {
    id: 'team-platform',
    title: 'Team & Platform',
      blurb: 'Staff Roles, Multi-Branch, Cloud/On-Premise, Website Integration & CRM Dashboard.',
    items: [
      { icon: UserCog, title: 'Staff roles & permissions', description: 'Granular roles so each person only sees what they should.' },
      { icon: Smartphone, title: 'Mobile friendly', description: 'Use on tablets, phones and desktops with a responsive interface.' },
      { icon: WifiOff, title: 'Offline-first billing', description: 'Keep billing when the internet drops and sync when you reconnect.' },
      { icon: Cloud, title: 'Cloud & on-premise options', description: 'Choose the deployment model that fits your business.' },
      { icon: Plug, title: 'Integrations & API', description: 'Connect payment, accounting and hardware — see the integrations page.' },
      { icon: DatabaseBackup, title: 'Backups & recovery', description: 'Regular backups with restore options to protect your data.' },
    ],
  },
];

export const highlightFeatures = [
  featureGroups[0].items[0],
  featureGroups[0].items[1],
  featureGroups[1].items[1],
  featureGroups[4].items[3],
  featureGroups[5].items[0],
  featureGroups[2].items[1],
];

export interface Solution {
  icon: LucideIcon;
  id: string;
  name: string;
  summary: string;
  points: string[];
}

export const solutions: Solution[] = [
  {
    icon: ShoppingBag,
    id: 'retail',
    name: 'Retail Stores',
    summary: 'Fast billing, tidy inventory and customer insights for single or multi-counter shops.',
    points: ['Barcode checkout', 'Variant & size support', 'Loyalty programmes', 'Daily sales reports'],
  },
  {
    icon: Store,
    id: 'supermarkets',
    name: 'Supermarkets & Grocery',
    summary: 'High-volume billing with weighing support, batch tracking and reorder automation.',
    points: ['Scale / weighing integration', 'Expiry & batch tracking', 'Low-stock reordering', 'Bulk pricing'],
  },
  {
    icon: UtensilsCrossed,
    id: 'restaurants',
    name: 'Restaurants & Cafes',
    summary: 'Table orders, kitchen workflows and quick-serve billing for busy outlets.',
    points: ['Table & takeaway orders', 'KOT to kitchen', 'Modifiers & combos', 'Split bills'],
  },
  {
    icon: ShieldCheck,
    id: 'pharmacy',
    name: 'Pharmacies',
    summary: 'Batch, expiry and prescription-aware billing designed for regulated retail.',
    points: ['Batch & expiry alerts', 'Schedule awareness', 'Substitute suggestions', 'Purchase returns'],
  },
  {
    icon: Package,
    id: 'clothing',
    name: 'Clothing & Footwear',
    summary: 'Colour, size and style matrices with season and stock-age analytics.',
    points: ['Size & colour variants', 'Style barcodes', 'Festival discounts', 'Dead-stock reports'],
  },
  {
    icon: Truck,
    id: 'wholesale',
    name: 'Wholesalers & Distribution',
    summary: 'Bulk orders, credit ledgers and route-friendly operations for distributors.',
    points: ['Credit & ledgers', 'Bulk pricing tiers', 'Delivery challans', 'Salesman tracking'],
  },
  {
    icon: Building2,
    id: 'multi-branch',
    name: 'Multi-branch Businesses',
    summary: 'Consolidated reporting and central control across every location.',
    points: ['Central dashboard', 'Inter-branch transfers', 'Role-based access', 'Consolidated GST reports'],
  },
];

export interface Audience {
  icon: LucideIcon;
  name: string;
  /** One simple, plain-language line a shop owner can understand at a glance. */
  benefit: string;
}

/**
 * Plain-language "who is this for" list. Keep each benefit short, honest and
 * mapped to a real feature (no invented capabilities).
 */
export const audiences: Audience[] = [
  {
    icon: Store,
    name: 'Kirana & General Stores',
    benefit: 'Bill faster, avoid stock-outs and track customer udhaar (credit) easily.',
  },
  {
    icon: ShoppingBag,
    name: 'Garments, Footwear & Cosmetics',
    benefit: 'Manage size, colour and brand stock and run festival discounts.',
  },
  {
    icon: Truck,
    name: 'Wholesalers & Distributors',
    benefit: 'Bulk billing, credit khata and delivery challans with complete reports.',
  },
  {
    icon: Smartphone,
    name: 'Electronics & Mobile Shops',
    benefit: 'Barcode billing, quick returns/exchange and clear profit margin reports.',
  },
  {
    icon: ShieldCheck,
    name: 'Medical Store & Pharmacy',
    benefit: 'Batch & Expiry Alerts with GST-ready billing and inventory control.',
  },
  {
    icon: Package,
    name: 'Clothing & Fashion Shops',
    benefit: 'Size-Color Variants, Season Stock & Dead-Stock Reports in one click.',
  },
  {
    icon: UtensilsCrossed,
    name: 'Restaurants & Cafes',
    benefit: 'Table Orders, Kitchen Tickets (KOT), Takeaway & Quick Billing in rush hours.',
  },
  {
    icon: Building2,
    name: 'Multi-branch & Chains',
    benefit: 'One CRM Dashboard to manage, track & control every store from anywhere.',
  },
];

export interface Integration {
  category: string;
  items: string[];
}

/**
 * Integration categories are shown as EXAMPLES only. Availability depends on
 * your plan, region and the third-party provider — confirm with our team.
 */
export const integrationGroups: Integration[] = [
  { category: 'Payments', items: ['Card terminals', 'UPI / QR payments', 'Payment gateways', 'Wallets'] },
  { category: 'Accounting & Tax', items: ['Accounting export (CSV/Tally-style)', 'GST filing data export', 'Bank statement import'] },
  { category: 'Hardware', items: ['Barcode scanners', 'Thermal receipt printers', 'Cash drawers', 'Weighing scales', 'Label printers'] },
  { category: 'Online & Delivery', items: ['Website / online store orders', 'Food-delivery aggregators', 'Marketplace sync'] },
  { category: 'Communication', items: ['WhatsApp receipts (provider-dependent)', 'Email service', 'SMS gateway'] },
  { category: 'Data & API', items: ['REST API access', 'Webhooks', 'CSV import / export', 'Custom integrations'] },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    id: 'faq-setup',
    question: 'How long does it take to set up NiteshPro POS?',
    answer:
      'Most single-store businesses are billing within a day: add your products, set tax rates and start scanning. Multi-store rollouts usually involve a short onboarding plan with data import — timelines depend on your catalogue and branches.',
  },
  {
    id: 'faq-gst',
    question: 'Is NiteshPro POS GST-ready for India?',
    answer:
      'Yes. Invoices are designed to be tax-compliant with configurable tax rates, HSN/SAC fields and GST summaries. Please confirm the exact formats you need with our team so we can map them to your workflow.',
  },
  {
    id: 'faq-offline',
    question: 'What happens if my internet connection goes down?',
    answer:
      'NiteshPro POS supports offline-first billing: you can keep selling and fuel the data syncs automatically when the connection is restored. Behaviour depends on your deployment and plan — we will confirm the details during onboarding.',
  },
  {
    id: 'faq-hardware',
    question: 'Do I need special hardware?',
    answer:
      'You can start with a desktop, laptop or tablet. Barcode scanners, thermal printers, cash drawers and weighing scales are supported through standard interfaces — check the integrations page or ask our team about your specific models.',
  },
  {
    id: 'faq-migrate',
    question: 'Can you migrate my existing product and customer data?',
    answer:
      'Yes, data migration from CSV/Excel is supported and larger migrations can be handled as part of onboarding. Share a sample of your data and we will advise on the best approach.',
  },
  {
    id: 'faq-support',
    question: 'What support do I get?',
    answer:
      'Support channels and response times depend on your plan, ranging from email support to priority chat and a dedicated account manager. Contact us and we will match a plan to your needs.',
  },
  {
    id: 'faq-trial',
    question: 'Is there a free trial or demo?',
    answer:
      'We offer a guided demo so you can see NiteshPro POS with your own workflow. Trial availability is confirmed by our team — book a demo and we will walk you through options.',
  },
  {
    id: 'faq-pricing',
    question: 'How is pricing calculated?',
    answer:
      'Pricing generally depends on the number of stores, counters and the modules you need. The plans shown are indicative examples — request a quote for exact pricing for your business.',
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

/**
 * Testimonials are PLACEHOLDERS. Replace them with real, permission-based
 * customer quotes before launch. They are rendered with a visible
 * "placeholder" label so no fabricated review is presented as real.
 */
export const testimonials: Testimonial[] = [
  {
    quote: 'NiteshPro POS ne hamara billing ka kaam bahut fast kar diya hai. Stock bhi ab easily track ho jata hai.',
    author: 'Shri Ram Grocery Store',
    role: 'Grocery Store - Delhi',
  },
  {
    quote: 'Medical store ke liye batch aur expiry tracking bahut helpful hai. Ab kabhi expiry product nahi chhootta.',
    author: 'New Star Medical Store',
    role: 'Pharmacy - Noida',
  },
  {
    quote: 'Hamari garment shop me size-color manage karna easy ho gaya. Report bhi clear milti hai.',
    author: 'Royal Garments',
    role: 'Clothing Store - Ghaziabad',
  },
  {
    quote: 'Multi-counter par bhi billing smooth chalti hai. Staff bhi easily manage ho jate hain.',
    author: 'City Mart Supermarket',
    role: 'Supermarket - Faridabad',
  },
  {
    quote: 'Udhaar/Khata tracking se hamara paisa time par collect ho jata hai. Bohat acha software hai.',
    author: 'Krishna General Store',
    role: 'General Store - Gurgaon',
  },
  {
    quote: 'Restaurant me table billing aur KOT system bahut efficient hai. Customer bhi khush hain.',
    author: 'Green Valley Restaurant',
    role: 'Restaurant - Delhi NCR',
  },
];

export interface TrustPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Security statements describe how the product is DESIGNED. No specific
 * certification is claimed. Confirm concrete guarantees with our team.
 */
export const trustPoints: TrustPoint[] = [
  { icon: Lock, title: 'Secure access controls', description: 'Role-based permissions and authenticated access to protect sensitive data.' },
  { icon: ShieldCheck, title: 'Data protection focus', description: 'Encryption in transit and practice-based safeguards designed into the platform.' },
  { icon: DatabaseBackup, title: 'Backups & recovery', description: 'Regular backups with restore options to keep your business running.' },
  { icon: UserCog, title: 'Granular roles', description: 'Decide exactly what each staff member can see and do at every store.' },
  { icon: Cloud, title: 'Reliable infrastructure', description: 'Built on scalable cloud infrastructure with uptime monitoring.' },
  { icon: FileText, title: 'Audit-friendly records', description: 'Complete transaction history and exportable reports for your records.' },
];

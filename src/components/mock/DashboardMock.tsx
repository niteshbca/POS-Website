import { useState } from 'react';
import {
  BarChart3,
  Bell,
  Boxes,
  LayoutDashboard,
  Package,
  ScanBarcode,
  Search,
  Settings,
  Truck,
  Users,
} from 'lucide-react';
import { cx } from '@/lib/cx';
import { AreaChart } from './AreaChart';
import { Bars } from './Bars';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'billing', label: 'Billing' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'analytics', label: 'Analytics' },
] as const;

type TabId = (typeof tabs)[number]['id'];

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: ScanBarcode, label: 'Billing' },
  { icon: Package, label: 'Products' },
  { icon: Boxes, label: 'Inventory' },
  { icon: Users, label: 'Customers' },
  { icon: Truck, label: 'Suppliers' },
  { icon: BarChart3, label: 'Reports' },
  { icon: Settings, label: 'Settings' },
];

const kpis = [
  { label: "Today's sales", value: '₹1,24,560', delta: '+12.4%', up: true },
  { label: 'Orders', value: '342', delta: '+48', up: true },
  { label: 'Avg. basket', value: '₹364', delta: '+3.1%', up: true },
  { label: 'Low stock', value: '7 items', delta: 'action', up: false },
];

const weekly = [
  { label: 'Mon', value: 62 },
  { label: 'Tue', value: 78 },
  { label: 'Wed', value: 55 },
  { label: 'Thu', value: 90 },
  { label: 'Fri', value: 120 },
  { label: 'Sat', value: 142, highlight: true },
  { label: 'Sun', value: 96 },
];

const recentSales = [
  { id: 'INV-2041', amount: '₹2,480', method: 'UPI' },
  { id: 'INV-2040', amount: '₹640', method: 'Cash' },
  { id: 'INV-2039', amount: '₹5,120', method: 'Card' },
  { id: 'INV-2038', amount: '₹1,150', method: 'UPI' },
];

const lowStock = [
  { name: 'Butter 500g', left: 4 },
  { name: 'Basmati Rice 5kg', left: 3 },
  { name: 'Toothpaste 100g', left: 6 },
];

const cart = [
  { item: 'Basmati Rice 5kg', qty: 1, rate: 620, amount: 620 },
  { item: 'Sunflower Oil 1L', qty: 2, rate: 165, amount: 330 },
  { item: 'Butter 500g', qty: 1, rate: 275, amount: 275 },
  { item: 'Tea Powder 250g', qty: 1, rate: 145, amount: 145 },
];

const inventory = [
  { name: 'Basmati Rice 5kg', sku: 'GRC-1001', stock: 3, status: 'Low' },
  { name: 'Sunflower Oil 1L', sku: 'GRC-1014', stock: 48, status: 'In stock' },
  { name: 'Butter 500g', sku: 'DRY-2007', stock: 4, status: 'Low' },
  { name: 'Green Tea 100g', sku: 'BEV-3011', stock: 62, status: 'In stock' },
];

const categories = [
  { label: 'Grocery', pct: 42 },
  { label: 'Dairy', pct: 24 },
  { label: 'Beverages', pct: 18 },
  { label: 'Snacks', pct: 16 },
];

function StatusPill({ children, tone }: { children: string; tone: 'ok' | 'warn' }) {
  return (
    <span
      className={cx(
        'rounded-full px-2 py-0.5 text-[10px] font-semibold',
        tone === 'ok' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700',
      )}
    >
      {children}
    </span>
  );
}

function Overview() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="grid gap-4 lg:col-span-2">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-navy-100 bg-white p-3">
              <p className="text-[10px] font-medium uppercase tracking-wide text-navy-400">{kpi.label}</p>
              <p className="mt-1 text-lg font-bold text-navy-950">{kpi.value}</p>
              <p className={cx('mt-0.5 text-[10px] font-semibold', kpi.up ? 'text-emerald-600' : 'text-amber-600')}>
                {kpi.delta}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-navy-900">Sales this week</p>
              <p className="text-[11px] text-navy-400">Sample data for illustration</p>
            </div>
            <span className="rounded-full bg-electric-50 px-2 py-1 text-[10px] font-semibold text-electric-700">
              ₹6.4L
            </span>
          </div>
          <div className="mt-4 h-32">
            <Bars data={weekly} />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-xl border border-navy-100 bg-white p-4">
          <p className="text-sm font-semibold text-navy-900">Recent sales</p>
          <ul className="mt-3 space-y-2.5">
            {recentSales.map((sale) => (
              <li key={sale.id} className="flex items-center justify-between text-xs">
                <span className="font-medium text-navy-600">#{sale.id}</span>
                <span className="flex items-center gap-2">
                  <span className="text-navy-400">{sale.method}</span>
                  <span className="font-semibold text-navy-900">{sale.amount}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
          <p className="text-sm font-semibold text-amber-900">Low-stock alerts</p>
          <ul className="mt-3 space-y-2">
            {lowStock.map((item) => (
              <li key={item.name} className="flex items-center justify-between text-xs text-amber-900">
                <span>{item.name}</span>
                <span className="font-semibold">{item.left} left</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Billing() {
  const subtotal = cart.reduce((sum, line) => sum + line.amount, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="flex items-center gap-2 rounded-xl border border-navy-100 bg-navy-50/60 px-3 py-2">
          <ScanBarcode className="h-4 w-4 text-electric-600" aria-hidden="true" />
          <span className="text-xs text-navy-500">Scan barcode or search product…</span>
        </div>
        <div className="mt-3 overflow-hidden rounded-xl border border-navy-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-50 text-[10px] uppercase tracking-wide text-navy-400">
              <tr>
                <th className="px-3 py-2 font-semibold">Item</th>
                <th className="px-3 py-2 text-center font-semibold">Qty</th>
                <th className="px-3 py-2 text-right font-semibold">Rate</th>
                <th className="px-3 py-2 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100 bg-white">
              {cart.map((line) => (
                <tr key={line.item}>
                  <td className="px-3 py-2 font-medium text-navy-800">{line.item}</td>
                  <td className="px-3 py-2 text-center text-navy-600">{line.qty}</td>
                  <td className="px-3 py-2 text-right text-navy-600">₹{line.rate}</td>
                  <td className="px-3 py-2 text-right font-semibold text-navy-900">₹{line.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="rounded-xl border border-navy-100 bg-white p-4">
          <p className="text-sm font-semibold text-navy-900">Bill summary</p>
          <p className="text-[11px] text-navy-400">GST-ready invoice preview</p>
          <dl className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between text-navy-600">
              <dt>Subtotal</dt>
              <dd>₹{subtotal.toLocaleString('en-IN')}</dd>
            </div>
            <div className="flex justify-between text-navy-600">
              <dt>CGST 9%</dt>
              <dd>₹{Math.round(tax / 2).toLocaleString('en-IN')}</dd>
            </div>
            <div className="flex justify-between text-navy-600">
              <dt>SGST 9%</dt>
              <dd>₹{Math.round(tax / 2).toLocaleString('en-IN')}</dd>
            </div>
            <div className="flex justify-between border-t border-navy-100 pt-2 text-sm font-bold text-navy-950">
              <dt>Total</dt>
              <dd>₹{total.toLocaleString('en-IN')}</dd>
            </div>
          </dl>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {['Cash', 'Card', 'UPI'].map((method, index) => (
              <span
                key={method}
                className={cx(
                  'grid place-items-center rounded-lg py-2 text-xs font-semibold',
                  index === 2 ? 'bg-gradient-to-r from-electric-600 to-violet-600 text-white' : 'bg-navy-50 text-navy-600',
                )}
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Inventory() {
  return (
    <div className="overflow-hidden rounded-xl border border-navy-100">
      <table className="w-full text-left text-xs">
        <thead className="bg-navy-50 text-[10px] uppercase tracking-wide text-navy-400">
          <tr>
            <th className="px-3 py-2 font-semibold">Product</th>
            <th className="px-3 py-2 font-semibold">SKU</th>
            <th className="px-3 py-2 text-center font-semibold">Stock</th>
            <th className="px-3 py-2 text-right font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100 bg-white">
          {inventory.map((product) => (
            <tr key={product.sku}>
              <td className="px-3 py-2.5 font-medium text-navy-800">{product.name}</td>
              <td className="px-3 py-2.5 text-navy-500">{product.sku}</td>
              <td className="px-3 py-2.5 text-center text-navy-700">{product.stock}</td>
              <td className="px-3 py-2.5 text-right">
                <StatusPill tone={product.status === 'Low' ? 'warn' : 'ok'}>{product.status}</StatusPill>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Analytics() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-xl border border-navy-100 bg-white p-4 lg:col-span-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-navy-900">Monthly revenue trend</p>
          <span className="text-[10px] text-navy-400">Last 12 weeks</span>
        </div>
        <div className="mt-4 h-28">
          <AreaChart points={[28, 34, 30, 42, 38, 52, 48, 60, 57, 68, 74, 82]} label="Sample monthly revenue trend" />
        </div>
      </div>
      <div className="rounded-xl border border-navy-100 bg-white p-4">
        <p className="text-sm font-semibold text-navy-900">Top categories</p>
        <ul className="mt-3 space-y-3">
          {categories.map((category) => (
            <li key={category.label}>
              <div className="flex justify-between text-xs text-navy-600">
                <span>{category.label}</span>
                <span className="font-semibold text-navy-900">{category.pct}%</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-navy-100">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-electric-500 to-violet-500"
                  style={{ width: `${category.pct}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function DashboardMock({ className }: { className?: string }) {
  const [tab, setTab] = useState<TabId>('overview');

  return (
    <div className={cx('overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card', className)}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-navy-100 bg-navy-50/70 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </span>
        <div className="mx-auto flex items-center gap-2 rounded-md bg-white px-3 py-1 text-[10px] text-navy-400 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          app.niteshpro.com
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[190px_1fr]">
        {/* Sidebar */}
        <aside className="hidden border-r border-navy-100 bg-white p-3 md:block">
          <div className="flex items-center gap-2 px-1 py-1">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-electric-600 to-violet-600 text-[11px] font-bold text-white">
              N
            </span>
            <span className="text-xs font-bold text-navy-950">NiteshPro</span>
          </div>
          <nav className="mt-3 space-y-0.5">
            {sidebarItems.map((item, index) => {
              const active = index === 0;
              return (
                <span
                  key={item.label}
                  className={cx(
                    'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium',
                    active ? 'bg-electric-50 text-electric-700' : 'text-navy-500',
                  )}
                >
                  <item.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.label}
                </span>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <div className="min-w-0 bg-navy-50/40">
          <div className="flex items-center justify-between gap-3 border-b border-navy-100 bg-white px-4 py-3">
            <div>
              <p className="text-sm font-bold text-navy-950">Main Store</p>
              <p className="text-[10px] text-navy-400">Wed, 14 Oct · Staff: Counter 1</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full border border-navy-200 px-2.5 py-1.5 text-[10px] text-navy-400 sm:flex">
                <Search className="h-3 w-3" aria-hidden="true" />
                Search
              </span>
              <span className="relative grid h-7 w-7 place-items-center rounded-full border border-navy-200 text-navy-500">
                <Bell className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-electric-500" />
              </span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-electric-500 text-[10px] font-bold text-white">
                RS
              </span>
            </div>
          </div>

          <div className="flex gap-1 overflow-x-auto border-b border-navy-100 bg-white px-4 no-scrollbar">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                aria-pressed={tab === item.id}
                className={cx(
                  'whitespace-nowrap border-b-2 px-3 py-2.5 text-xs font-semibold transition',
                  tab === item.id
                    ? 'border-electric-600 text-electric-700'
                    : 'border-transparent text-navy-400 hover:text-navy-700',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="p-4">
            {tab === 'overview' && <Overview />}
            {tab === 'billing' && <Billing />}
            {tab === 'inventory' && <Inventory />}
            {tab === 'analytics' && <Analytics />}
          </div>
        </div>
      </div>
    </div>
  );
}

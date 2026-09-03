import { useState, useEffect, useCallback } from 'react';
import logoImg from '../imports/WhatsApp_Image_2026-08-11_at_11.55.15_PM.jpeg';

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

// ─── helpers ─────────────────────────────────────────────────────────────────
function token() {
  return localStorage.getItem('4b_admin_token') ?? '';
}

async function apiFetch(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
      ...(opts.headers ?? {}),
    },
  });
  return res.json();
}

// ─── types ────────────────────────────────────────────────────────────────────
interface Order {
  _id: string;
  orderNumber: string;
  orderType: string;
  customerName: string;
  phone: string;
  address?: string;
  pickupTime?: string;
  status: string;
  total: number;
  subtotal: number;
  deliveryCharge: number;
  items: {
    name: string;
    quantity: number;
    itemTotal: number;
    selectedAddons: { name: string; price: number }[];
  }[];
  createdAt: string;
}
interface Product {
  _id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  category: { name: string } | string;
  description: string;
  image?: string;
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 800;
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > MAX) {
            h = Math.round((h * MAX) / w);
            w = MAX;
          }
        } else {
          if (h > MAX) {
            w = Math.round((w * MAX) / h);
            h = MAX;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
interface Category {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  order: number;
}
interface Addon {
  _id: string;
  name: string;
  price: number;
  isActive: boolean;
}
interface DashStats {
  total: number;
  pending: number;
  confirmed: number;
  preparing: number;
  completed: number;
  cancelled: number;
  revenue: number;
  recentOrders: Order[];
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ size = 40 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <img
        src={logoImg}
        alt="4B Foods"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────
function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (data.success) onLogin(data.token);
    else setError(data.message ?? 'Login failed');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: '#F9F5EF' }}
    >
      <form
        onSubmit={submit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-6">
          <Logo size={64} />
          <h1 className="font-black text-xl mt-3" style={{ color: '#1C0D04' }}>
            4B Foods Admin
          </h1>
          <p className="text-sm text-gray-400">Sign in to your dashboard</p>
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400"
            style={{ borderColor: '#E8DDD0' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400"
            style={{ borderColor: '#E8DDD0' }}
          />
          <button
            type="submit"
            disabled={loading}
            className="py-3 rounded-xl font-bold text-sm mt-1 disabled:opacity-60"
            style={{ background: '#1C0D04', color: '#C9A84C' }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'orders', label: 'Orders', icon: '📋' },
  { id: 'products', label: 'Products', icon: '🥙' },
  { id: 'categories', label: 'Categories', icon: '🗂️' },
  { id: 'addons', label: 'Add-ons', icon: '➕' },
];

function Sidebar({
  active,
  onNav,
  onLogout,
}: {
  active: string;
  onNav: (id: string) => void;
  onLogout: () => void;
}) {
  return (
    <aside
      className="flex flex-col h-full"
      style={{ background: '#1C0D04', width: 220, flexShrink: 0 }}
    >
      <div
        className="flex items-center gap-3 p-5 border-b"
        style={{ borderColor: '#2C1A0C' }}
      >
        <Logo size={36} />
        <div>
          <p className="font-black text-sm" style={{ color: '#C9A84C' }}>
            4B Foods
          </p>
          <p className="text-xs text-white/40">Admin Panel</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {NAV.map((n) => (
          <button
            key={n.id}
            onClick={() => onNav(n.id)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-colors"
            style={
              active === n.id
                ? { background: '#C9A84C', color: '#1C0D04' }
                : { color: 'rgba(255,255,255,0.6)' }
            }
          >
            <span>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>
      <button
        onClick={onLogout}
        className="m-3 py-2 rounded-xl text-xs font-semibold text-white/40 hover:text-white transition-colors"
      >
        Sign Out
      </button>
    </aside>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="font-black text-2xl" style={{ color: color ?? '#1C0D04' }}>
        {value}
      </p>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  pending: '#F59E0B',
  confirmed: '#3B82F6',
  preparing: '#8B5CF6',
  ready: '#10B981',
  completed: '#6B7280',
  cancelled: '#EF4444',
};
function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-bold text-white capitalize"
      style={{ background: STATUS_COLORS[status] ?? '#9CA3AF' }}
    >
      {status}
    </span>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard() {
  const [stats, setStats] = useState<DashStats | null>(null);

  useEffect(() => {
    apiFetch('/orders/dashboard').then((d) => d.success && setStats(d.data));
  }, []);

  if (!stats) return <div className="p-6 text-gray-400 text-sm">Loading…</div>;

  return (
    <div className="p-6 flex flex-col gap-6">
      <h2 className="font-black text-xl" style={{ color: '#1C0D04' }}>
        Dashboard
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Orders" value={stats.total} />
        <StatCard label="Pending" value={stats.pending} color="#F59E0B" />
        <StatCard label="Completed" value={stats.completed} color="#10B981" />
        <StatCard
          label="Revenue (confirmed+)"
          value={`Rs. ${stats.revenue.toLocaleString()}`}
          color="#8B5E3C"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Confirmed" value={stats.confirmed} color="#3B82F6" />
        <StatCard label="Preparing" value={stats.preparing} color="#8B5CF6" />
        <StatCard label="Cancelled" value={stats.cancelled} color="#EF4444" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h3 className="font-bold text-sm mb-4" style={{ color: '#1C0D04' }}>
          Recent Orders
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr
              className="text-xs text-gray-400 border-b"
              style={{ borderColor: '#F3F4F6' }}
            >
              <th className="text-left pb-2">Order #</th>
              <th className="text-left pb-2">Customer</th>
              <th className="text-left pb-2">Type</th>
              <th className="text-left pb-2">Total</th>
              <th className="text-left pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentOrders.map((o) => (
              <tr
                key={o._id}
                className="border-b"
                style={{ borderColor: '#F9F5EF' }}
              >
                <td
                  className="py-2 font-mono font-bold text-xs"
                  style={{ color: '#C9A84C' }}
                >
                  #{o.orderNumber}
                </td>
                <td className="py-2">{o.customerName}</td>
                <td className="py-2 capitalize text-gray-500">{o.orderType}</td>
                <td className="py-2 font-semibold">
                  Rs. {o.total.toLocaleString()}
                </td>
                <td className="py-2">
                  <StatusBadge status={o.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Orders ───────────────────────────────────────────────────────────────────
function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [updating, setUpdating] = useState(false);

  const load = useCallback(() => {
    const q = statusFilter ? `?status=${statusFilter}` : '';
    apiFetch(`/orders${q}`).then((d) => d.success && setOrders(d.data));
  }, [statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(true);
    await apiFetch(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    setUpdating(false);
    load();
    if (selected?._id === id)
      setSelected((prev) => (prev ? { ...prev, status } : null));
  };

  const STATUSES = [
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'completed',
    'cancelled',
  ];

  return (
    <div className="p-6 flex gap-4 h-full">
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="flex items-center gap-3">
          <h2
            className="font-black text-xl flex-1"
            style={{ color: '#1C0D04' }}
          >
            Orders
          </h2>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-3 py-2 text-sm outline-none"
            style={{ borderColor: '#E8DDD0' }}
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={load}
            className="px-3 py-2 rounded-xl text-sm font-semibold"
            style={{ background: '#E8DDD0', color: '#5C4A1E' }}
          >
            Refresh
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-sm overflow-auto flex-1">
          <table className="w-full text-sm">
            <thead style={{ background: '#F9F5EF' }}>
              <tr className="text-xs text-gray-400">
                <th className="text-left p-3">Order #</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o._id}
                  onClick={() => setSelected(o)}
                  className="border-t cursor-pointer hover:bg-amber-50 transition-colors"
                  style={{
                    borderColor: '#F9F5EF',
                    background: selected?._id === o._id ? '#FEF9EC' : undefined,
                  }}
                >
                  <td
                    className="p-3 font-mono font-bold text-xs"
                    style={{ color: '#C9A84C' }}
                  >
                    #{o.orderNumber}
                  </td>
                  <td className="p-3 font-semibold">{o.customerName}</td>
                  <td className="p-3 capitalize text-gray-500">
                    {o.orderType}
                  </td>
                  <td className="p-3 font-bold">
                    Rs. {o.total.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="p-3 text-gray-400 text-xs">
                    {new Date(o.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="text-center py-10 text-gray-400 text-sm">
              No orders found
            </p>
          )}
        </div>
      </div>

      {/* Order detail panel */}
      {selected && (
        <div
          className="w-80 bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4 overflow-y-auto flex-shrink-0"
          style={{ maxHeight: 'calc(100vh - 80px)' }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base" style={{ color: '#1C0D04' }}>
              #{selected.orderNumber}
            </h3>
            <button
              onClick={() => setSelected(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="text-sm flex flex-col gap-1 text-gray-600">
            <p>
              <span className="font-semibold">Customer:</span>{' '}
              {selected.customerName}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {selected.phone}
            </p>
            <p>
              <span className="font-semibold">Type:</span>{' '}
              <span className="capitalize">{selected.orderType}</span>
            </p>
            {selected.address && (
              <p>
                <span className="font-semibold">Address:</span>{' '}
                {selected.address}
              </p>
            )}
            {selected.pickupTime && (
              <p>
                <span className="font-semibold">Pick-up:</span>{' '}
                {selected.pickupTime}
              </p>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
              Items
            </p>
            {selected.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">
                  {item.name} ×{item.quantity}
                </span>
                <span className="font-semibold">
                  Rs. {item.itemTotal.toLocaleString()}
                </span>
              </div>
            ))}
            <div
              className="border-t mt-2 pt-2"
              style={{ borderColor: '#E8DDD0' }}
            >
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>Rs. {selected.subtotal.toLocaleString()}</span>
              </div>
              {selected.deliveryCharge > 0 && (
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span>Rs. {selected.deliveryCharge}</span>
                </div>
              )}
              <div
                className="flex justify-between font-black text-base mt-1"
                style={{ color: '#1C0D04' }}
              >
                <span>Total</span>
                <span>Rs. {selected.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
              Update Status
            </p>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  disabled={updating || selected.status === s}
                  onClick={() => updateStatus(selected._id, s)}
                  className="px-2 py-1 rounded-full text-xs font-bold capitalize transition-opacity disabled:opacity-40"
                  style={{
                    background: STATUS_COLORS[s] ?? '#9CA3AF',
                    color: 'white',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-auto">
            <StatusBadge status={selected.status} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────
function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    apiFetch('/products/admin/all').then(
      (d) => d.success && setProducts(d.data),
    );
    apiFetch('/categories/admin/all').then(
      (d) => d.success && setCategories(d.data),
    );
  };
  useEffect(load, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const isNew = !editing._id;
    const body = {
      name: editing.name,
      description: editing.description,
      price: Number(editing.price),
      category: (editing.category as Category)?._id ?? editing.category,
      isAvailable: editing.isAvailable,
      isFeatured: editing.isFeatured,
      isPopular: editing.isPopular,
      image: editing.image ?? '',
    };
    if (isNew)
      await apiFetch('/products', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    else
      await apiFetch(`/products/${editing._id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
    setSaving(false);
    setEditing(null);
    load();
  };

  const toggle = async (id: string, field: string, val: boolean) => {
    await apiFetch(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ [field]: val }),
    });
    load();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await apiFetch(`/products/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h2 className="font-black text-xl flex-1" style={{ color: '#1C0D04' }}>
          Products
        </h2>
        <button
          onClick={() =>
            setEditing({
              isAvailable: true,
              isFeatured: false,
              isPopular: false,
              image: '',
            })
          }
          className="px-4 py-2 rounded-xl text-sm font-bold"
          style={{ background: '#1C0D04', color: '#C9A84C' }}
        >
          + Add Product
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-auto">
        <table className="w-full text-sm">
          <thead style={{ background: '#F9F5EF' }}>
            <tr className="text-xs text-gray-400">
              <th className="text-left p-3">Photo</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Available</th>
              <th className="text-left p-3">Featured</th>
              <th className="text-left p-3">Popular</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-t"
                style={{ borderColor: '#F9F5EF' }}
              >
                <td className="p-3">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-xl object-cover border"
                      style={{ borderColor: '#E8DDD0' }}
                    />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-[10px] text-gray-400 border border-dashed"
                      style={{ borderColor: '#E8DDD0', background: '#F9F5EF' }}
                    >
                      No img
                    </div>
                  )}
                </td>
                <td className="p-3 font-semibold">{p.name}</td>
                <td className="p-3 text-gray-500">
                  {typeof p.category === 'object'
                    ? p.category.name
                    : p.category}
                </td>
                <td className="p-3 font-bold" style={{ color: '#8B5E3C' }}>
                  Rs. {Number(p.price).toLocaleString()}
                </td>
                <td className="p-3">
                  <Toggle
                    checked={p.isAvailable}
                    onChange={(v) => toggle(p._id, 'isAvailable', v)}
                  />
                </td>
                <td className="p-3">
                  <Toggle
                    checked={p.isFeatured}
                    onChange={(v) => toggle(p._id, 'isFeatured', v)}
                  />
                </td>
                <td className="p-3">
                  <Toggle
                    checked={p.isPopular}
                    onChange={(v) => toggle(p._id, 'isPopular', v)}
                  />
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => setEditing(p)}
                    className="text-xs px-2 py-1 rounded-lg font-semibold"
                    style={{ background: '#E8DDD0', color: '#5C4A1E' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => del(p._id)}
                    className="text-xs px-2 py-1 rounded-lg font-semibold bg-red-100 text-red-500"
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editing !== null && (
        <Modal
          title={editing._id ? 'Edit Product' : 'Add Product'}
          onClose={() => setEditing(null)}
        >
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Item Photo
              </label>
              {editing.image ? (
                <div
                  className="flex items-center gap-3 p-3 rounded-xl border"
                  style={{ borderColor: '#E8DDD0', background: '#FDFBF8' }}
                >
                  <img
                    src={editing.image}
                    alt="Preview"
                    className="w-16 h-16 rounded-xl object-cover border flex-shrink-0"
                    style={{ borderColor: '#E8DDD0' }}
                  />
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <p className="text-xs text-green-700 font-semibold flex items-center gap-1">
                      <span>✓</span> Photo selected
                    </p>
                    <div className="flex gap-2">
                      <label
                        className="px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-opacity hover:opacity-80 inline-block text-center"
                        style={{ background: '#1C0D04', color: '#C9A84C' }}
                      >
                        Change Photo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const b64 = await compressImage(file);
                              setEditing((prev) => ({ ...prev!, image: b64 }));
                            }
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setEditing((prev) => ({ ...prev!, image: '' }))
                        }
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <label
                  className="flex flex-col items-center justify-center p-5 rounded-xl border-2 border-dashed cursor-pointer hover:bg-amber-50/50 transition-colors"
                  style={{ borderColor: '#C9A84C', background: '#FDFBF8' }}
                >
                  <span className="text-2xl mb-1">📸</span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: '#1C0D04' }}
                  >
                    Click to upload food photo
                  </span>
                  <span className="text-[11px] text-gray-400 mt-0.5">
                    JPG, PNG, or WebP from your device
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const b64 = await compressImage(file);
                        setEditing((prev) => ({ ...prev!, image: b64 }));
                      }
                    }}
                  />
                </label>
              )}
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Or paste image URL here..."
                  value={editing.image ?? ''}
                  onChange={(e) =>
                    setEditing((prev) => ({ ...prev!, image: e.target.value }))
                  }
                  className="w-full border rounded-xl px-3 py-2 text-xs outline-none focus:border-amber-400"
                  style={{ borderColor: '#E8DDD0' }}
                />
              </div>
            </div>
            <Field
              label="Name"
              value={editing.name ?? ''}
              onChange={(v) => setEditing((e) => ({ ...e!, name: v }))}
            />
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                Category
              </label>
              <select
                value={(editing.category as Category)?._id ?? ''}
                onChange={(e) =>
                  setEditing((prev) => ({
                    ...prev!,
                    category: categories.find((c) => c._id === e.target.value),
                  }))
                }
                className="w-full border rounded-xl px-3 py-2 text-sm outline-none"
                style={{ borderColor: '#E8DDD0' }}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <Field
              label="Price (Rs.)"
              value={String(editing.price ?? '')}
              onChange={(v) => setEditing((e) => ({ ...e!, price: Number(v) }))}
              type="number"
            />
            <Field
              label="Description"
              value={editing.description ?? ''}
              onChange={(v) => setEditing((e) => ({ ...e!, description: v }))}
            />
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!editing.isAvailable}
                  onChange={(e) =>
                    setEditing((prev) => ({
                      ...prev!,
                      isAvailable: e.target.checked,
                    }))
                  }
                />{' '}
                Available
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!editing.isFeatured}
                  onChange={(e) =>
                    setEditing((prev) => ({
                      ...prev!,
                      isFeatured: e.target.checked,
                    }))
                  }
                />{' '}
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!editing.isPopular}
                  onChange={(e) =>
                    setEditing((prev) => ({
                      ...prev!,
                      isPopular: e.target.checked,
                    }))
                  }
                />{' '}
                Popular
              </label>
            </div>
            <button
              onClick={save}
              disabled={saving}
              className="w-full py-2.5 rounded-xl font-bold text-sm disabled:opacity-60"
              style={{ background: '#1C0D04', color: '#C9A84C' }}
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Categories ───────────────────────────────────────────────────────────────
function Categories() {
  const [cats, setCats] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Partial<Category> | null>(null);
  const [saving, setSaving] = useState(false);
  const load = async () => {
    const d = await apiFetch('/categories/admin/all');
    if (d.success) {
      setCats(d.data);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const body = {
      name: editing.name,
      slug: editing.slug,
      isActive: editing.isActive,
      order: editing.order,
    };
    if (!editing._id)
      await apiFetch('/categories', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    else
      await apiFetch(`/categories/${editing._id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
    setSaving(false);
    setEditing(null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    await apiFetch(`/categories/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h2 className="font-black text-xl flex-1" style={{ color: '#1C0D04' }}>
          Categories
        </h2>
        <button
          onClick={() => setEditing({ isActive: true, order: 0 })}
          className="px-4 py-2 rounded-xl text-sm font-bold"
          style={{ background: '#1C0D04', color: '#C9A84C' }}
        >
          + Add Category
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-auto">
        <table className="w-full text-sm">
          <thead style={{ background: '#F9F5EF' }}>
            <tr className="text-xs text-gray-400">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Slug</th>
              <th className="text-left p-3">Order</th>
              <th className="text-left p-3">Active</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cats.map((c) => (
              <tr
                key={c._id}
                className="border-t"
                style={{ borderColor: '#F9F5EF' }}
              >
                <td className="p-3 font-semibold">{c.name}</td>
                <td className="p-3 text-gray-400 font-mono text-xs">
                  {c.slug}
                </td>
                <td className="p-3 text-gray-500">{c.order}</td>
                <td className="p-3">
                  <Toggle
                    checked={c.isActive}
                    onChange={(v) => {
                      apiFetch(`/categories/${c._id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ isActive: v }),
                      });
                      load();
                    }}
                  />
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => setEditing(c)}
                    className="text-xs px-2 py-1 rounded-lg font-semibold"
                    style={{ background: '#E8DDD0', color: '#5C4A1E' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => del(c._id)}
                    className="text-xs px-2 py-1 rounded-lg font-semibold bg-red-100 text-red-500"
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editing !== null && (
        <Modal
          title={editing._id ? 'Edit Category' : 'Add Category'}
          onClose={() => setEditing(null)}
        >
          <div className="flex flex-col gap-3">
            <Field
              label="Name"
              value={editing.name ?? ''}
              onChange={(v) => setEditing((e) => ({ ...e!, name: v }))}
            />
            <Field
              label="Slug"
              value={editing.slug ?? ''}
              onChange={(v) => setEditing((e) => ({ ...e!, slug: v }))}
            />
            <Field
              label="Display Order"
              value={String(editing.order ?? 0)}
              onChange={(v) => setEditing((e) => ({ ...e!, order: Number(v) }))}
              type="number"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!editing.isActive}
                onChange={(e) =>
                  setEditing((prev) => ({
                    ...prev!,
                    isActive: e.target.checked,
                  }))
                }
              />{' '}
              Active
            </label>
            <button
              onClick={save}
              disabled={saving}
              className="w-full py-2.5 rounded-xl font-bold text-sm disabled:opacity-60"
              style={{ background: '#1C0D04', color: '#C9A84C' }}
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Addons ───────────────────────────────────────────────────────────────────
function Addons() {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [editing, setEditing] = useState<Partial<Addon> | null>(null);
  const [saving, setSaving] = useState(false);
  const load = async () => {
    const d = await apiFetch('/addons/admin/all');
    if (d.success) {
      setAddons(d.data);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const body = {
      name: editing.name,
      price: Number(editing.price),
      isActive: editing.isActive,
    };
    if (!editing._id)
      await apiFetch('/addons', { method: 'POST', body: JSON.stringify(body) });
    else
      await apiFetch(`/addons/${editing._id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
    setSaving(false);
    setEditing(null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this add-on?')) return;
    await apiFetch(`/addons/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h2 className="font-black text-xl flex-1" style={{ color: '#1C0D04' }}>
          Add-ons
        </h2>
        <button
          onClick={() => setEditing({ isActive: true })}
          className="px-4 py-2 rounded-xl text-sm font-bold"
          style={{ background: '#1C0D04', color: '#C9A84C' }}
        >
          + Add Addon
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-auto">
        <table className="w-full text-sm">
          <thead style={{ background: '#F9F5EF' }}>
            <tr className="text-xs text-gray-400">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Active</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {addons.map((a) => (
              <tr
                key={a._id}
                className="border-t"
                style={{ borderColor: '#F9F5EF' }}
              >
                <td className="p-3 font-semibold">{a.name}</td>
                <td className="p-3 font-bold" style={{ color: '#8B5E3C' }}>
                  Rs. {a.price}
                </td>
                <td className="p-3">
                  <Toggle
                    checked={a.isActive}
                    onChange={(v) => {
                      apiFetch(`/addons/${a._id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ isActive: v }),
                      });
                      load();
                    }}
                  />
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => setEditing(a)}
                    className="text-xs px-2 py-1 rounded-lg font-semibold"
                    style={{ background: '#E8DDD0', color: '#5C4A1E' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => del(a._id)}
                    className="text-xs px-2 py-1 rounded-lg font-semibold bg-red-100 text-red-500"
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editing !== null && (
        <Modal
          title={editing._id ? 'Edit Add-on' : 'Add Add-on'}
          onClose={() => setEditing(null)}
        >
          <div className="flex flex-col gap-3">
            <Field
              label="Name"
              value={editing.name ?? ''}
              onChange={(v) => setEditing((e) => ({ ...e!, name: v }))}
            />
            <Field
              label="Price (Rs.)"
              value={String(editing.price ?? '')}
              onChange={(v) => setEditing((e) => ({ ...e!, price: Number(v) }))}
              type="number"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!editing.isActive}
                onChange={(e) =>
                  setEditing((prev) => ({
                    ...prev!,
                    isActive: e.target.checked,
                  }))
                }
              />{' '}
              Active
            </label>
            <button
              onClick={save}
              disabled={saving}
              className="w-full py-2.5 rounded-xl font-bold text-sm disabled:opacity-60"
              style={{ background: '#1C0D04', color: '#C9A84C' }}
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-10 h-5 rounded-full relative transition-colors"
      style={{ background: checked ? '#C9A84C' : '#E8DDD0' }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all"
        style={{ left: checked ? 'calc(100% - 18px)' : '2px' }}
      />
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-amber-400"
        style={{ borderColor: '#E8DDD0' }}
      />
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-base" style={{ color: '#1C0D04' }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function AdminApp() {
  const [tok, setTok] = useState(localStorage.getItem('4b_admin_token') ?? '');
  const [page, setPage] = useState('dashboard');

  useEffect(() => {
    document.title = '4B Foods - Admin Portal';
  }, []);

  const handleLogin = (t: string) => {
    localStorage.setItem('4b_admin_token', t);
    setTok(t);
  };
  const handleLogout = () => {
    localStorage.removeItem('4b_admin_token');
    setTok('');
  };

  if (!tok) return <Login onLogin={handleLogin} />;

  const PAGES: Record<string, React.ReactNode> = {
    dashboard: <Dashboard />,
    orders: <Orders />,
    products: <Products />,
    categories: <Categories />,
    addons: <Addons />,
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: '#F9F5EF' }}
    >
      <Sidebar active={page} onNav={setPage} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto">{PAGES[page]}</main>
    </div>
  );
}

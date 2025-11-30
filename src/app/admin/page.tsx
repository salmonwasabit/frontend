"use client";
import { API_BASE_URL } from "@/lib/config";

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import AdminRoute from '@/components/AdminRoute';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  LogOut,
  Package,
  TrendingUp,
  Users,
  BarChart3,
  Filter,
  X,
  Tag,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  created_at: string;
  updated_at: string | null;
}

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  recentProducts: number;
  averagePrice: number;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้? การดำเนินการนี้ไม่สามารถยกเลิกได้')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('ไม่สามารถลบสินค้าได้');
      }

      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ไม่สามารถลบสินค้าได้');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  // Calculate dashboard stats
  const stats: DashboardStats = useMemo(() => {
    const totalProducts = products.length;
    const categories = new Set(products.map(p => p.category).filter(Boolean));
    const totalCategories = categories.size;
    const recentProducts = products.filter(p =>
      new Date(p.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;
    const averagePrice = products.length > 0
      ? products.reduce((sum, p) => sum + p.price, 0) / products.length
      : 0;

    return { totalProducts, totalCategories, recentProducts, averagePrice };
  }, [products]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.description?.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean));
    return Array.from(cats);
  }, [products]);

  const StatCard = ({ title, value, icon: Icon, color }: {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color: string;
  }) => (
    <div className="bg-card border border-border rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center">
        <div className={cn("p-3 rounded-xl", color)}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <AdminRoute>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">กำลังโหลดแดชบอร์ด...</p>
          </div>
        </div>
      </AdminRoute>
    );
  }

  if (error) {
    return (
      <AdminRoute>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-8 max-w-md">
              <div className="text-destructive mb-4">
                <X className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-base font-medium text-destructive mb-2">เกิดข้อผิดพลาดในการโหลดแดชบอร์ด</h3>
              <p className="text-destructive/80 mb-4">{error}</p>
              <button
                onClick={fetchProducts}
                className="bg-destructive text-destructive-foreground px-4 py-2 rounded-xl hover:bg-destructive/90 transition-colors"
              >
                ลองใหม่
              </button>
            </div>
          </div>
        </div>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-background flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-center h-16 px-4 bg-primary border-b border-border">
              <h1 className="text-m font-semibold text-primary-foreground">แผงควบคุมผู้ดูแลระบบ</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <Link
                href="/admin"
                className="flex items-center px-4 py-3 text-foreground rounded-xl hover:bg-accent transition-colors bg-accent"
              >
                <Package className="h-5 w-5 mr-3" />
                จัดการสินค้า
              </Link>
              <Link
                href="/admin/categories"
                className="flex items-center px-4 py-3 text-muted-foreground rounded-xl hover:bg-accent hover:text-foreground transition-colors"
              >
                <Tag className="h-5 w-5 mr-3" />
                จัดการหมวดหมู่
              </Link>
              <Link
                href="/admin/products/new"
                className="flex items-center px-4 py-3 text-muted-foreground rounded-xl hover:bg-accent hover:text-foreground transition-colors"
              >
                <Plus className="h-5 w-5 mr-3" />
                เพิ่มสินค้า
              </Link>
              <button
                onClick={async () => {
                  if (confirm('คุณต้องการเพิ่มข้อมูลสินค้าตัวอย่างหรือไม่? ข้อมูลเดิมจะถูกลบ')) {
                    try {
                      const response = await fetch(`${API_BASE_URL}/api/populate`, {
                        method: 'POST',
                      });
                      if (response.ok) {
                        alert('เพิ่มข้อมูลสินค้าตัวอย่างสำเร็จ!');
                        fetchProducts(); // Refresh the products list
                      } else {
                        alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
                      }
                    } catch (err) {
                      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
                    }
                  }
                }}
                className="flex items-center px-4 py-3 text-muted-foreground rounded-xl hover:bg-accent hover:text-foreground transition-colors"
              >
                <Package className="h-5 w-5 mr-3" />
                เติมข้อมูลตัวอย่าง
              </button>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-border">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-destructive rounded-xl hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3" />
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="bg-card border-b border-border px-4 py-4 lg:px-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <BarChart3 className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-semibold text-card-foreground">แดชบอร์ด</h1>
              </div>
              <div className="text-sm text-muted-foreground">
                ยินดีต้อนรับกลับ, ผู้ดูแลระบบ
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="สินค้าทั้งหมด"
                value={stats.totalProducts}
                icon={Package}
                color="bg-primary"
              />
              <StatCard
                title="หมวดหมู่"
                value={stats.totalCategories}
                icon={BarChart3}
                color="bg-green-600"
              />
              <StatCard
                title="สินค้าใหม่"
                value={stats.recentProducts}
                icon={TrendingUp}
                color="bg-purple-600"
              />
              <StatCard
                title="ราคาเฉลี่ย"
                value={`$${stats.averagePrice.toFixed(2)}`}
                icon={Users}
                color="bg-orange-600"
              />
            </div>

            {/* Products Section */}
            <div className="bg-card border border-border rounded-xl shadow-sm">
              <div className="px-6 py-4 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-medium text-card-foreground mb-4 sm:mb-0">สินค้า</h2>

                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="ค้นหาสินค้า..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
                      />
                    </div>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="all">หมวดหมู่ทั้งหมด</option>
                        {categories.map(category => (
                          <option key={category || 'null'} value={category || ''}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="p-12 text-center">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-base font-medium text-card-foreground mb-2">
                    {products.length === 0 ? 'ยังไม่มีสินค้า' : 'ไม่พบสินค้า'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {products.length === 0
                      ? 'เริ่มต้นโดยการเพิ่มสินค้าชิ้นแรกของคุณ'
                      : 'ลองปรับการค้นหาหรือเงื่อนไขการกรอง'
                    }
                  </p>
                  {products.length === 0 && (
                    <Link
                      href="/admin/products/new"
                      className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      เพิ่มสินค้า
                    </Link>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          สินค้า
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          หมวดหมู่
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          ราคา
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          สร้างเมื่อ
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          การดำเนินการ
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-card-foreground">{product.name}</div>
                              <div className="text-sm text-muted-foreground line-clamp-1 max-w-xs">
                                {product.description || 'ไม่มีคำอธิบาย'}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                              {product.category || 'ไม่ได้จัดหมวดหมู่'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-card-foreground">
                            {`$${product.price.toFixed(2)}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                            {new Date(product.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`/admin/products/${product.id}/edit`}
                                className="text-primary hover:text-primary/80 p-2 rounded-xl hover:bg-primary/10 transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </Link>
                              <button
                                onClick={() => deleteProduct(product.id)}
                                className="text-destructive hover:text-destructive/80 p-2 rounded-xl hover:bg-destructive/10 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}

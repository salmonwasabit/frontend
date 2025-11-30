'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminRoute from '@/components/AdminRoute';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search, X, LayoutDashboard, Package, Tag, BarChart3, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { API_BASE_URL } from "@/lib/config";

interface Category {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string | null;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/categories`);
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }
      const data = await response.json();
      setCategories(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingCategory ? `${API_BASE_URL}/api/categories/${editingCategory.id}` : `${API_BASE_URL}/api/categories`;
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save category');
      }

      await fetchCategories();
      setShowAddForm(false);
      setEditingCategory(null);
      setFormData({ name: '', description: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description || '' });
    setShowAddForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <AdminRoute>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">กำลังโหลดหมวดหมู่...</p>
          </div>
        </div>
      </AdminRoute>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-8 max-w-md">
            <div className="text-destructive mb-4">
              <X className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-destructive mb-2">เกิดข้อผิดพลาดในการโหลดหมวดหมู่</h3>
            <p className="text-destructive/80 mb-4">{error}</p>
            <button
              onClick={fetchCategories}
              className="bg-destructive text-destructive-foreground px-4 py-2 rounded-xl hover:bg-destructive/90 transition-colors"
            >
              ลองใหม่
            </button>
          </div>
        </div>
      </div>
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
              <h1 className="text-lg font-semibold text-primary-foreground">แผงควบคุมผู้ดูแลระบบ</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              <Link
                href="/admin"
                className="flex items-center px-4 py-3 text-muted-foreground rounded-xl hover:bg-accent hover:text-foreground transition-colors"
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                แดชบอร์ด
              </Link>
              <Link
                href="/admin/products"
                className="flex items-center px-4 py-3 text-muted-foreground rounded-xl hover:bg-accent hover:text-foreground transition-colors"
              >
                <Package className="h-5 w-5 mr-3" />
                จัดการสินค้า
              </Link>
              <Link
                href="/admin/categories"
                className="flex items-center px-4 py-3 text-foreground rounded-xl hover:bg-accent transition-colors bg-accent"
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
                <h1 className="text-xl font-semibold text-card-foreground ml-4 lg:ml-0">จัดการหมวดหมู่</h1>
              </div>
              <div className="text-sm text-muted-foreground">
                ยินดีต้อนรับกลับ, ผู้ดูแลระบบ
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="mt-2 text-muted-foreground">จัดการหมวดหมู่สินค้าของคุณ</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    เพิ่มหมวดหมู่
                  </button>
                </div>
              </div>
            </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="ค้นหาหมวดหมู่..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="mb-6 bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-card-foreground">
                  {editingCategory ? 'แก้ไขหมวดหมู่' : 'เพิ่มหมวดหมู่ใหม่'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCategory(null);
                    setFormData({ name: '', description: '' });
                  }}
                  className="text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-accent transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">ชื่อหมวดหมู่</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">คำอธิบาย</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
                  >
                    {editingCategory ? 'อัปเดต' : 'เพิ่ม'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingCategory(null);
                      setFormData({ name: '', description: '' });
                    }}
                    className="px-6 py-3 bg-muted text-muted-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors"
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div key={category.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">{category.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {category.description || 'ไม่มีคำอธิบาย'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      สร้างเมื่อ: {new Date(category.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">ไม่พบหมวดหมู่</h3>
              <p className="text-muted-foreground mb-4">
                {categories.length === 0
                  ? 'เริ่มต้นโดยการเพิ่มหมวดหมู่แรกของคุณ'
                  : 'ลองปรับคำค้นหา'
                }
              </p>
              {categories.length === 0 && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  เพิ่มหมวดหมู่
                </button>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}

'use client';

import { useState } from 'react';
import AdminRoute from '@/components/AdminRoute';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';
import { API_BASE_URL } from "@/lib/config";
import { LayoutDashboard, Package, Tag, BarChart3, LogOut, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageData {
  id: number;
  filename: string;
  url: string;
  thumbnail_url: string;
  width: number;
  height: number;
  size: number;
  mime_type: string;
  alt_text?: string;
}

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });
  const [uploadedImages, setUploadedImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create product first
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description || null,
          price: parseFloat(formData.price),
          category: formData.category || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const productData = await response.json();

      // Associate uploaded images with the product
      if (uploadedImages.length > 0) {
        for (const image of uploadedImages) {
          await fetch(`${API_BASE_URL}/api/images/${image.id}?entity_id=${productData.id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
        }
      }

      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'บุหรี่ไฟฟ้าทิ้ง',
    'ระบบพอต',
    'โมดส์',
    'น้ำยาสูบ',
    'อุปกรณ์เสริม',
    'อื่นๆ'
  ];

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

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
                className="flex items-center px-4 py-3 text-muted-foreground rounded-xl hover:bg-accent hover:text-foreground transition-colors"
              >
                <Tag className="h-5 w-5 mr-3" />
                จัดการหมวดหมู่
              </Link>
              <Link
                href="/admin/products/new"
                className="flex items-center px-4 py-3 text-foreground rounded-xl hover:bg-accent transition-colors bg-accent"
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
                <h1 className="text-xl font-semibold text-card-foreground ml-4 lg:ml-0">เพิ่มสินค้าใหม่</h1>
              </div>
              <div className="text-sm text-muted-foreground">
                ยินดีต้อนรับกลับ, ผู้ดูแลระบบ
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4">
                <Link
                  href="/admin"
                  className="text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-accent transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
                <div>
                  <p className="text-muted-foreground">สร้างสินค้าการสูบไอใหม่</p>
                </div>
              </div>
            </div>

          {/* Form */}
          <div className="bg-card border border-border rounded-xl p-8">
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  ชื่อสินค้า *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="ป้อนชื่อสินค้า"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                  คำอธิบาย
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="ป้อนคำอธิบายสินค้า"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-foreground mb-2">
                  ราคา *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                  หมวดหมู่
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">เลือกหมวดหมู่</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  รูปภาพสินค้า
                </label>
                <ImageUpload
                  entityType="products"
                  onUploadSuccess={(imageData) => {
                    setUploadedImages(prev => [...prev, imageData]);
                  }}
                  onUploadError={(error) => {
                    setError(error);
                  }}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                      กำลังสร้าง...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      สร้างสินค้า
                    </>
                  )}
                </button>

                <Link
                  href="/admin"
                  className="bg-muted text-muted-foreground px-6 py-3 rounded-xl hover:bg-muted/80 transition-colors"
                >
                  ยกเลิก
                </Link>
              </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}

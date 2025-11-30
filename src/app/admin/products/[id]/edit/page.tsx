'use client';
import { API_BASE_URL } from "@/lib/config";

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import AdminRoute from '@/components/AdminRoute';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';
import { LayoutDashboard, Package, Tag, BarChart3, LogOut, Edit, Plus } from 'lucide-react';
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

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  created_at: string;
  updated_at: string | null;
  images?: ImageData[];
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { logout } = useAuth();
  const productId = params.id as string;
  const productIdNum = parseInt(productId);

  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });
  const [existingImages, setExistingImages] = useState<ImageData[]>([]);
  const [uploadedImages, setUploadedImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productIdNum}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const data = await response.json();
      setProduct(data);
      setFormData({
        name: data.name,
        description: data.description || '',
        price: data.price.toString(),
        category: data.category || ''
      });
      setExistingImages(data.images || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [productIdNum]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Validate productId after hooks
  if (isNaN(productIdNum) || productIdNum <= 0) {
    return (
      <AdminRoute>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-destructive">Invalid product ID</div>
        </div>
      </AdminRoute>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Update product
      const response = await fetch(`${API_BASE_URL}/api/products/${productIdNum}`, {
        method: 'PUT',
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
        throw new Error('Failed to update product');
      }

      // Associate newly uploaded images with the product
      if (uploadedImages.length > 0) {
        for (const image of uploadedImages) {
          await fetch(`${API_BASE_URL}/api/images/${image.id}?entity_id=${productIdNum}`, {
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
      setSaving(false);
    }
  };

  if (loading) {
    return (
    <AdminRoute>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">กำลังโหลด...</p>
        </div>
      </div>
      </AdminRoute>
  );
  }

  if (error && !product) {
    return (
    <AdminRoute>
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-destructive mb-4">
            <i className="fas fa-exclamation-triangle text-4xl"></i>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-foreground">เกิดข้อผิดพลาด</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
      </AdminRoute>
  );
  }

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
                href={`/admin/products/${productId}/edit`}
                className="flex items-center px-4 py-3 text-foreground rounded-xl hover:bg-accent transition-colors bg-accent"
              >
                <Edit className="h-5 w-5 mr-3" />
                แก้ไขสินค้า
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
                <h1 className="text-xl font-semibold text-card-foreground ml-4 lg:ml-0">แก้ไขสินค้า</h1>
              </div>
              <div className="text-sm text-muted-foreground">
                ยินดีต้อนรับกลับ, ผู้ดูแลระบบ
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-4">
                <Link
                  href="/admin"
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-accent rounded-lg"
                >
                  <i className="fas fa-arrow-left"></i>
                </Link>
                <div>
                  <p className="text-muted-foreground">อัปเดตข้อมูลสินค้า</p>
                </div>
              </div>
            </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-8"
        >
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
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
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
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
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground resize-none"
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
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
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
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              >
                <option value="">เลือกหมวดหมู่</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-4">
                  รูปภาพปัจจุบัน ({existingImages.length})
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {existingImages.map((image, index) => (
                    <div key={`existing-${index}`} className="relative group">
                      <img
                        src={image.url}
                        alt={image.alt_text || `รูปภาพปัจจุบัน ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          // Remove image association
                          setExistingImages(prev => prev.filter((_, i) => i !== index));
                        }}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center hover:bg-destructive/90 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <i className="fas fa-times text-xs"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Images */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                เพิ่มรูปภาพใหม่
              </label>
              <ImageUpload
                entityType="products"
                entityId={productIdNum}
                onUploadSuccess={(imageData) => {
                  setUploadedImages(prev => [...prev, imageData]);
                }}
                onUploadError={(error) => {
                  setError(error);
                }}
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium hover:shadow-lg hover:shadow-primary/25"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                    กำลังบันทึก...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i>
                    อัปเดตสินค้า
                  </>
                )}
              </button>

              <Link
                href="/admin"
                className="bg-muted text-muted-foreground border border-border px-6 py-3 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200 font-medium"
              >
                ยกเลิก
              </Link>
            </div>
          </form>
        </motion.div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}

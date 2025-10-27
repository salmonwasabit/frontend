'use client';
import { API_BASE_URL } from "@/lib/config";

import { useState, useEffect, useCallback } from 'react';
import AdminRoute from '@/components/AdminRoute';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';

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
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-red-600">Invalid product ID</div>
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black">Loading...</div>
      </div>
      </AdminRoute>
  );
  }

  if (error && !product) {
    return (
    <AdminRoute>
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
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

  return (
    <AdminRoute>
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-black text-white rounded-lg p-8 mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <i className="fas fa-arrow-left"></i>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">แก้ไขสินค้า</h1>
              <p className="text-gray-300">อัปเดตข้อมูลสินค้า</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อสินค้า *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                placeholder="ป้อนชื่อสินค้า"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                คำอธิบาย
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                placeholder="ป้อนคำอธิบายสินค้า"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                หมวดหมู่
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รูปภาพปัจจุบัน ({existingImages.length})
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {existingImages.map((image, index) => (
                    <div key={`existing-${index}`} className="relative">
                      <img
                        src={image.url}
                        alt={image.alt_text || `รูปภาพปัจจุบัน ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          // Remove image association
                          setExistingImages(prev => prev.filter((_, i) => i !== index));
                        }}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition-colors"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
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
                className="bg-white text-black border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </AdminRoute>
  );
}

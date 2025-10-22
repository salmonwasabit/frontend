'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminRoute from '@/components/AdminRoute';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string | null;
}

export default function EditCategoryPage() {
  const [category, setCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;

  const fetchCategory = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error('Category not found');
      }
      const data = await response.json();
      setCategory(data);
      setFormData({
        name: data.name,
        description: data.description || ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const response = await fetch(`http://localhost:8000/api/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description || null
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      router.push('/admin/categories');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">กำลังโหลด...</p>
          </div>
        </div>
      </AdminRoute>
    );
  }

  if (error && !category) {
    return (
      <AdminRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
              <X className="h-12 w-12 mx-auto text-red-600 mb-4" />
              <h3 className="text-lg font-medium text-red-900 mb-2">เกิดข้อผิดพลาด</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <Link
                href="/admin/categories"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors inline-block"
              >
                กลับไปหน้าหมวดหมู่
              </Link>
            </div>
          </div>
        </div>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/categories"
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">แก้ไขหมวดหมู่</h1>
                <p className="text-gray-600">อัปเดตข้อมูลหมวดหมู่</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <X className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อหมวดหมู่ *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="กรอกชื่อหมวดหมู่"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="กรอกคำอธิบายหมวดหมู่ (ไม่บังคับ)"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      กำลังบันทึก...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      บันทึกการเปลี่ยนแปลง
                    </>
                  )}
                </button>

                <Link
                  href="/admin/categories"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <X className="h-4 w-4" />
                  ยกเลิก
                </Link>
              </div>
            </form>
          </div>

          {/* Category Info */}
          {category && (
            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="text-sm font-medium text-gray-900 mb-4">ข้อมูลหมวดหมู่</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">สร้างเมื่อ:</span>
                  <p className="text-gray-900">{new Date(category.created_at).toLocaleDateString('th-TH')}</p>
                </div>
                <div>
                  <span className="text-gray-600">อัปเดตล่าสุด:</span>
                  <p className="text-gray-900">
                    {category.updated_at
                      ? new Date(category.updated_at).toLocaleDateString('th-TH')
                      : 'ยังไม่มีการอัปเดต'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminRoute>
  );
}

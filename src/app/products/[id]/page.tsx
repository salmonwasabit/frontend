"use client";
import { API_BASE_URL } from "@/lib/config";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Battery,
  Droplets,
  Zap,
  Palette,
  Weight,
  Ruler,
  Award,
  CheckCircle,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LineButton from "@/components/LineButton";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  brand?: string;
  product_type?: string;
  nicotine_strength?: string;
  battery_capacity?: string;
  tank_capacity?: string;
  coil_resistance?: string;
  flavor_profile?: string;
  pg_vg_ratio?: string;
  colors?: string[];
  dimensions?: string;
  weight?: string;
  charging_method?: string;
  warranty?: string;
  compatibility?: string;
  in_stock?: boolean;
  rating?: number;
  review_count?: number;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareClicked, setShareClicked] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found");
          }
          throw new Error(`Failed to fetch product: ${response.status}`);
        }
        const data = await response.json();

        // Add mock vape-specific data for demo
        const enhancedProduct: Product = {
          ...data,
          brand: data.brand || "Premium Vape Co.",
          product_type: data.product_type || "E-Cigarette",
          nicotine_strength: data.nicotine_strength || "0mg, 3mg, 6mg, 12mg",
          battery_capacity: data.battery_capacity || "650mAh",
          tank_capacity: data.tank_capacity || "2.0ml",
          coil_resistance: data.coil_resistance || "1.2Ω",
          flavor_profile: data.flavor_profile || "Fruit, Dessert, Tobacco",
          pg_vg_ratio: data.pg_vg_ratio || "30/70",
          colors: data.colors || ["Black", "White", "Silver", "Blue"],
          dimensions: data.dimensions || "110mm x 20mm x 20mm",
          weight: data.weight || "45g",
          charging_method: data.charging_method || "USB-C",
          warranty: data.warranty || "6 months",
          compatibility: data.compatibility || "510 thread",
          in_stock: data.in_stock !== undefined ? data.in_stock : true,
          rating: data.rating || 4.5,
          review_count: data.review_count || 127
        };

        setProduct(enhancedProduct);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">กำลังโหลดสินค้า...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <i className="fas fa-exclamation-triangle text-4xl"></i>
          </div>
          <h2 className="text-xl font-semibold mb-2">ไม่พบสินค้า</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <div className="space-x-4">
            <Button onClick={() => router.push("/products")} variant="outline">
              กลับไปหน้ารายการสินค้า
            </Button>
            <Button onClick={() => window.location.reload()}>
              ลองใหม่
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setShareClicked(true);
      setTimeout(() => setShareClicked(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy URL:', err);
      // Fallback for older browsers
      const url = window.location.href;
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setShareClicked(true);
        setTimeout(() => setShareClicked(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">หน้าแรก</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground transition-colors">สินค้า</Link>
            {product.category && (
              <>
                <span>/</span>
                <Link href={`/categories/${encodeURIComponent(product.category)}`} className="hover:text-foreground transition-colors">
                  {product.category}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="aspect-square bg-muted rounded-xl overflow-hidden relative group">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center">
                            <div class="text-center">
                              <div class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-2 mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-8 h-8 text-gray-500">
                                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                                </svg>
                              </div>
                              <span class="text-sm text-gray-500 font-medium">รูปภาพสินค้า</span>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-2 mx-auto">
                        <Star className="w-8 h-8 text-gray-500" />
                      </div>
                      <span className="text-sm text-gray-500 font-medium">รูปภาพสินค้า</span>
                    </div>
                  </div>
                )}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>

              {/* Thumbnail Images - Hidden for now since products have only one image */}
              {/* Uncomment when adding multiple product images
              <div className="flex space-x-2 overflow-x-auto">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Img</span>
                    </div>
                  </button>
                ))}
              </div>
              */}
            </motion.div>

            {/* Product Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                    {product.brand && (
                      <p className="text-lg text-muted-foreground mb-2">โดย {product.brand}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleShare}
                    className={`transition-colors relative ${shareClicked ? 'text-green-600' : ''}`}
                    title={shareClicked ? 'คัดลอกลิงก์แล้ว!' : 'แชร์สินค้า'}
                  >
                    <Share2 className={`h-4 w-4 ${shareClicked ? 'scale-110' : ''} transition-transform`} />
                    {shareClicked && (
                      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        คัดลอกแล้ว!
                      </span>
                    )}
                  </Button>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.review_count} รีวิว)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-4xl font-bold text-primary">฿{product.price.toFixed(2)}</p>
                  {product.in_stock && (
                    <Badge variant="secondary" className="mt-2">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      มีสินค้า
                    </Badge>
                  )}
                </div>
              </div>

              {/* Quick Specs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ข้อมูลเบื้องต้น</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {product.product_type && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ประเภท:</span>
                      <span className="font-medium">{product.product_type}</span>
                    </div>
                  )}
                  {product.nicotine_strength && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">นิโคติน:</span>
                      <span className="font-medium">{product.nicotine_strength}</span>
                    </div>
                  )}
                  {product.battery_capacity && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">แบตเตอรี่:</span>
                      <span className="font-medium">{product.battery_capacity}</span>
                    </div>
                  )}
                  {product.tank_capacity && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ถังน้ำยา:</span>
                      <span className="font-medium">{product.tank_capacity}</span>
                    </div>
                  )}
                </CardContent>
              </Card>


              {/* Contact Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    สนใจสินค้านี้หรือไม่?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    ติดต่อเราได้ทาง LINE สำหรับข้อมูลเพิ่มเติม การสั่งทำพิเศษ หรือราคาส่ง
                  </p>
                  <LineButton
                    productName={product.name}
                    productId={product.id.toString()}
                    price={product.price}
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="specifications">ข้อมูลจำเพาะ</TabsTrigger>
              <TabsTrigger value="description">คำอธิบาย</TabsTrigger>
              <TabsTrigger value="reviews">รีวิว</TabsTrigger>
              <TabsTrigger value="shipping">การจัดส่ง</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>ข้อมูลจำเพาะทางเทคนิค</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Battery className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">ความจุแบตเตอรี่</p>
                          <p className="text-sm text-muted-foreground">{product.battery_capacity || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Droplets className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">ความจุถังน้ำยา</p>
                          <p className="text-sm text-muted-foreground">{product.tank_capacity || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Zap className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">ความต้านทานคอยล์</p>
                          <p className="text-sm text-muted-foreground">{product.coil_resistance || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Palette className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">สีที่เลือกได้</p>
                          <p className="text-sm text-muted-foreground">{product.colors?.join(", ") || "N/A"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Ruler className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">ขนาด</p>
                          <p className="text-sm text-muted-foreground">{product.dimensions || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Weight className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">น้ำหนัก</p>
                          <p className="text-sm text-muted-foreground">{product.weight || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Award className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">การรับประกัน</p>
                          <p className="text-sm text-muted-foreground">{product.warranty || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">ความเข้ากันได้</p>
                          <p className="text-sm text-muted-foreground">{product.compatibility || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">ตัวเลือกนิโคติน</h4>
                      <p className="text-sm text-muted-foreground">{product.nicotine_strength || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">โปรไฟล์รสชาติ</h4>
                      <p className="text-sm text-muted-foreground">{product.flavor_profile || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">อัตราส่วน PG/VG</h4>
                      <p className="text-sm text-muted-foreground">{product.pg_vg_ratio || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">วิธีการชาร์จ</h4>
                      <p className="text-sm text-muted-foreground">{product.charging_method || "N/A"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>คำอธิบายสินค้า</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.description ? (
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {product.description}
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      ไม่มีคำอธิบายสำหรับสินค้านี้
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>รีวิวจากลูกค้า</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      ฟีเจอร์รีวิวจะมาเร็วๆ นี้ กลับมาดูใหม่นะ!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>การจัดส่งและการคืนสินค้า</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">จัดส่งเร็ว</h4>
                      <p className="text-sm text-muted-foreground">
                        จัดส่งฟรีสำหรับคำสั่งซื้อมากกว่า 1,500 บาท มีบริการส่งด่วน
                      </p>
                    </div>
                    <div className="text-center">
                      <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">บรรจุภัณฑ์ปลอดภัย</h4>
                      <p className="text-sm text-muted-foreground">
                        บรรจุภัณฑ์แบบไม่เปิดเผยเพื่อความเป็นส่วนตัวและความปลอดภัยของสินค้า
                      </p>
                    </div>
                    <div className="text-center">
                      <RotateCcw className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">การคืนสินค้าทาง่าย</h4>
                      <p className="text-sm text-muted-foreground">
                        นโยบายคืนสินค้าภายใน 30 วันสำหรับสินค้าทั้งหมด ไม่มีเงื่อนไข
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

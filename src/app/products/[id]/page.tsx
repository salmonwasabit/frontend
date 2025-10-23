"use client";

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
  ChevronLeft,
  ChevronRight,
  Eye,
  ShoppingCart
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
  created_at: string;
  updated_at?: string;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Mock product images - in real app, these would come from API
  const productImages = [
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600"
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`);
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
          <p className="text-muted-foreground">Loading product...</p>
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
          <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <div className="space-x-4">
            <Button onClick={() => router.push("/products")} variant="outline">
              Back to Products
            </Button>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-card/50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
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
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground text-lg">Product Image</span>
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>

              {/* Thumbnail Images */}
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
                      <p className="text-lg text-muted-foreground mb-2">by {product.brand}</p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
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
                    {product.rating} ({product.review_count} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
                  {product.in_stock && (
                    <Badge variant="secondary" className="mt-2">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      In Stock
                    </Badge>
                  )}
                </div>
              </div>

              {/* Quick Specs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {product.product_type && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{product.product_type}</span>
                    </div>
                  )}
                  {product.nicotine_strength && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nicotine:</span>
                      <span className="font-medium">{product.nicotine_strength}</span>
                    </div>
                  )}
                  {product.battery_capacity && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Battery:</span>
                      <span className="font-medium">{product.battery_capacity}</span>
                    </div>
                  )}
                  {product.tank_capacity && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tank:</span>
                      <span className="font-medium">{product.tank_capacity}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium">Quantity:</label>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1" size="lg">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Contact Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Interested in this product?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Contact us via LINE for more information, custom orders, or bulk pricing.
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
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Battery className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Battery Capacity</p>
                          <p className="text-sm text-muted-foreground">{product.battery_capacity || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Droplets className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Tank Capacity</p>
                          <p className="text-sm text-muted-foreground">{product.tank_capacity || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Zap className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Coil Resistance</p>
                          <p className="text-sm text-muted-foreground">{product.coil_resistance || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Palette className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Available Colors</p>
                          <p className="text-sm text-muted-foreground">{product.colors?.join(", ") || "N/A"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Ruler className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Dimensions</p>
                          <p className="text-sm text-muted-foreground">{product.dimensions || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Weight className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Weight</p>
                          <p className="text-sm text-muted-foreground">{product.weight || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Award className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Warranty</p>
                          <p className="text-sm text-muted-foreground">{product.warranty || "N/A"}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Compatibility</p>
                          <p className="text-sm text-muted-foreground">{product.compatibility || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Nicotine Options</h4>
                      <p className="text-sm text-muted-foreground">{product.nicotine_strength || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Flavor Profile</h4>
                      <p className="text-sm text-muted-foreground">{product.flavor_profile || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">PG/VG Ratio</h4>
                      <p className="text-sm text-muted-foreground">{product.pg_vg_ratio || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Charging Method</h4>
                      <p className="text-sm text-muted-foreground">{product.charging_method || "N/A"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Description</CardTitle>
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
                      No description available for this product.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Reviews feature coming soon. Check back later!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping & Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">Fast Shipping</h4>
                      <p className="text-sm text-muted-foreground">
                        Free shipping on orders over $50. Express delivery available.
                      </p>
                    </div>
                    <div className="text-center">
                      <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">Secure Packaging</h4>
                      <p className="text-sm text-muted-foreground">
                        Discreet packaging ensures privacy and product safety.
                      </p>
                    </div>
                    <div className="text-center">
                      <RotateCcw className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">Easy Returns</h4>
                      <p className="text-sm text-muted-foreground">
                        30-day return policy on all products. No questions asked.
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

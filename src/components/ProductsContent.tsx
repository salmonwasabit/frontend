"use client";
import { API_BASE_URL } from "@/lib/config";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  Heart,
  Eye,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'newest' | 'oldest';
type ViewMode = 'grid' | 'list';

interface ProductsContentProps {
  initialCategory?: string;
}

export default function ProductsContent({ initialCategory }: ProductsContentProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // View state - show brands or products
  const [showBrands, setShowBrands] = useState(!initialCategory);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // UI states
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Always use grid view (removed toggle functionality)
  const viewMode: ViewMode = 'grid';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Set initial category when component mounts
  useEffect(() => {
    if (initialCategory && selectedCategories.length === 0) {
      setSelectedCategories([initialCategory]);
      setShowBrands(false); // Show products directly if category is specified
    }
  }, [initialCategory, selectedCategories.length]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean));
    return Array.from(cats).sort() as string[];
  }, [products]);

  // Get price range for filters
  const priceBounds = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map(p => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.description?.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategories.length === 0 ||
                            (product.category && selectedCategories.includes(product.category));

      // Price filter
      const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
      const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategories, priceRange, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '' });
    setSortBy('newest');
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  // Brand data - map to actual product categories with same images as homepage
  const brands = [
    {
      name: "Esko Switch",
      category: "Starter Kit", // Map to actual category
      logo: "/brands/esko/ESKOBAR_Switch_15Flavors_AD.jpg", // Same as homepage
      description: "Starter Kit และ Cartridge หลากหลายรสชาติ",
      productCount: products.filter(p => p.category === "Starter Kit").length
    },
    {
      name: "Pikka Pod",
      category: "Pod", // Map to actual category
      logo: "/brands/pikka/PIKKA POD All Product AD 3-01.jpg", // Same as homepage
      description: "Pod ระบบปิดพร้อมรสชาติพรีเมียม",
      productCount: products.filter(p => p.category === "Pod").length
    },
    {
      name: "Vortex Pro",
      category: "Device", // Map to actual category
      logo: "/brands/vortex/Starter Kit AD 1200x800-01.jpg", // Same as homepage
      description: "อุปกรณ์สูบไอระดับพรีเมียม",
      productCount: products.filter(p => p.category === "Device").length
    }
  ];

  const selectBrand = (category: string) => {
    setSelectedCategories([category]);
    setShowBrands(false);
  };

  const goBackToBrands = () => {
    setSelectedCategories([]);
    setShowBrands(true);
    setSearchTerm('');
    setPriceRange({ min: '', max: '' });
    setSortBy('newest');
  };

  const ProductCard = ({ product, index, isListView = false }: {
    product: Product;
    index: number;
    isListView?: boolean;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-lg",
        isListView ? "flex flex-col sm:flex-row" : "hover:scale-[1.02]"
      )}>
        <Link href={`/products/${product.id}`} className="block flex-1">
          <div className={cn(
            "relative overflow-hidden",
            isListView ? "sm:w-48 h-48 sm:h-auto" : "aspect-square"
          )}>
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
                      <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
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
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <Star className="w-8 h-8 text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-500 font-medium">รูปภาพสินค้า</span>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          <CardContent className={cn("p-6", isListView && "flex-1")}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
                {product.category && (
                  <Badge variant="secondary" className="mt-1">
                    {product.category}
                  </Badge>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(product.id);
                }}
                className="ml-2 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-colors",
                    favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
                  )}
                />
              </button>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-primary">
                ฿{product.price.toFixed(2)}
              </span>
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="w-4 h-4 mr-1" />
                ดูรายละเอียด
              </div>
            </div>

            {product.description && (
              <p className={cn(
                "text-sm text-muted-foreground line-clamp-2",
                isListView ? "mb-0" : "mb-4"
              )}>
                {product.description}
              </p>
            )}
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">กำลังโหลดสินค้าที่น่าสนใจ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <X className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">เกิดข้อผิดพลาด!</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-6"
          >
            ลองใหม่
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
          >
            {showBrands ? "เลือกแบรนด์สินค้า" : "คอลเลกชั่นพรีเมียมของเรา"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {showBrands
              ? "เลือกแบรนด์ที่คุณสนใจเพื่อดูสินค้าที่มีให้เลือก"
              : "ค้นพบสินค้าบุหรี่ไฟฟ้าพรีเมียมที่เราคัดสรรมาอย่างพิถีพิถัน เพื่อคุณภาพและประสิทธิภาพที่ยอดเยี่ยม"
            }
          </motion.p>
          {!showBrands && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <Button
                onClick={goBackToBrands}
                variant="outline"
                className="hover:bg-accent"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                กลับไปเลือกแบรนด์
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {showBrands ? (
        /* Brands View */
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {brands.map((brand, index) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  onClick={() => selectBrand(brand.category)}
                >
                  <div className="aspect-[4/3] bg-primary/5 flex items-center justify-center overflow-hidden">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} brand image`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {brand.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {brand.productCount} สินค้า
                      </span>
                      <div className="flex items-center text-primary font-medium">
                        <span>ดูสินค้า</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Products View */
        <>
          {/* Filters and Search */}
          <section className="py-8 px-4 border-b bg-background">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาสินค้า..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <div className="relative">
                    <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                      <SelectTrigger className="w-[180px] bg-background border-border text-foreground hover:bg-accent focus:ring-2 focus:ring-primary/20">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border shadow-lg">
                        <SelectItem value="newest" className="text-foreground hover:bg-accent focus:bg-accent cursor-pointer">
                          ใหม่ล่าสุด
                        </SelectItem>
                        <SelectItem value="oldest" className="text-foreground hover:bg-accent focus:bg-accent cursor-pointer">
                          เก่าที่สุด
                        </SelectItem>
                        <SelectItem value="name-asc" className="text-foreground hover:bg-accent focus:bg-accent cursor-pointer">
                          ชื่อ ก-ฮ
                        </SelectItem>
                        <SelectItem value="name-desc" className="text-foreground hover:bg-accent focus:bg-accent cursor-pointer">
                          ชื่อ ฮ-ก
                        </SelectItem>
                        <SelectItem value="price-asc" className="text-foreground hover:bg-accent focus:bg-accent cursor-pointer">
                          ราคาต่ำ-สูง
                        </SelectItem>
                        <SelectItem value="price-desc" className="text-foreground hover:bg-accent focus:bg-accent cursor-pointer">
                          ราคาสูง-ต่ำ
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>


                  {/* Filter Toggle */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="relative">
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">ตัวกรอง</span>
                        {(selectedCategories.length > 0 || priceRange.min || priceRange.max) && (
                          <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                            {(selectedCategories.length + (priceRange.min ? 1 : 0) + (priceRange.max ? 1 : 0))}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="bg-background border-border">
                      <SheetHeader>
                        <SheetTitle>ตัวกรอง</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 space-y-6">
                        {/* Categories */}
                        <div>
                          <h4 className="font-medium mb-3">หมวดหมู่</h4>
                          <div className="space-y-2">
                            {categories.map(category => (
                              <div key={category} className="flex items-center space-x-2">
                                <Checkbox
                                  id={category}
                                  checked={selectedCategories.includes(category)}
                                  onCheckedChange={() => toggleCategory(category)}
                                />
                                <label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  {category}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Price Range */}
                        <div>
                          <h4 className="font-medium mb-3">ช่วงราคา</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm text-muted-foreground">ราคาต่ำสุด</label>
                              <Input
                                type="number"
                                placeholder={`${priceBounds.min} บาท`}
                                value={priceRange.min}
                                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                              />
                            </div>
                            <div>
                              <label className="text-sm text-muted-foreground">ราคาสูงสุด</label>
                              <Input
                                type="number"
                                placeholder={`${priceBounds.max} บาท`}
                                value={priceRange.max}
                                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Clear Filters */}
                        <Button onClick={clearFilters} variant="outline" className="w-full">
                          ล้างตัวกรองทั้งหมด
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Active Filters - More prominent display */}
              {(selectedCategories.length > 0 || priceRange.min || priceRange.max) && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">ตัวกรอง</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {(selectedCategories.length + (priceRange.min ? 1 : 0) + (priceRange.max ? 1 : 0))}
                      </Badge>
                    </div>
                    <Button
                      onClick={clearFilters}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ล้างทั้งหมด
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(category => (
                      <span key={category} className="inline-flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-md text-sm font-medium">
                        {category}
                        <button
                          onClick={() => toggleCategory(category)}
                          className="hover:bg-muted rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {priceRange.min && (
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-md text-sm font-medium">
                        ต่ำสุด: ฿{priceRange.min}
                        <button
                          onClick={() => setPriceRange(prev => ({ ...prev, min: '' }))}
                          className="hover:bg-muted rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {priceRange.max && (
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-md text-sm font-medium">
                        สูงสุด: ฿{priceRange.max}
                        <button
                          onClick={() => setPriceRange(prev => ({ ...prev, max: '' }))}
                          className="hover:bg-muted rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-muted-foreground">
                  แสดง {filteredAndSortedProducts.length} จาก {products.length} สินค้า
                </p>
              </div>

              {filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-muted-foreground mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">ไม่พบสินค้า</h3>
                  <p className="text-muted-foreground mb-6">
                    ลองปรับคำค้นหาหรือเงื่อนไขตัวกรอง
                  </p>
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                  >
                    ล้างตัวกรอง
                  </Button>
                </div>
              ) : (
                <div className={cn(
                  viewMode === 'grid'
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-6"
                )}>
                  {filteredAndSortedProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      isListView={false}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

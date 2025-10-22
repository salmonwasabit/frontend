"use client";

import { useState } from "react";

// Extend window interface for gtag
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

interface LineButtonProps {
  productName?: string;
  productId?: string;
  price?: number;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function LineButton({
  productName,
  productId,
  price,
  variant = "primary",
  className = "",
}: LineButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLineClick = () => {
    setIsLoading(true);

    // Legacy Google Analytics tracking (if available)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        event_category: "line_chat",
        event_label: productName || "general",
        value: price,
      });
    }

    const userAgent = navigator.userAgent || navigator.vendor || (window as Window & { opera?: string }).opera || "";
    const lineId = "@YOUR_LINE_ID"; // Replace with actual LINE ID
    const lineScheme = `line://ti/p/${lineId}`;

    // Prefilled message
    const message = productName
      ? `สวัสดีครับ/ค่ะ สนใจสั่ง ${productName} (รหัส: ${productId}) จำนวน: 1 ชิ้น รบกวนแจ้งราคา/ค่าส่งด้วยครับ`
      : "สวัสดีครับ/ค่ะ สนใจสินค้าของคุณ";

    const messageLink = `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;

    // Try to open LINE app first
    if (/android|iphone|ipad|ipod/i.test(userAgent)) {
      const now = Date.now();
      window.location.href = lineScheme;

      // Fallback to web link if app doesn't open
      setTimeout(() => {
        if (Date.now() - now < 1200) {
          window.open(messageLink, "_blank");
        }
      }, 800);
    } else {
      // Desktop: open web LINE
      window.open(messageLink, "_blank");
    }

    setTimeout(() => setIsLoading(false), 1000);
  };

  const baseClasses = "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors";
  const variantClasses = variant === "primary"
    ? "bg-green-500 text-white hover:bg-green-600"
    : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button
      onClick={handleLineClick}
      disabled={isLoading}
      className={`${baseClasses} ${variantClasses} ${className} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      {isLoading ? "Opening LINE..." : "สั่งซื้อผ่าน LINE"}
    </button>
  );
}
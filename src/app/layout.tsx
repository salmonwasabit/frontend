import type { Metadata } from "next";
import { AuthProvider } from "@/lib/AuthContext";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import GSAPAnimations from "@/components/GSAPAnimations";
import LineButton from "@/components/LineButton";
import AgeVerification from "@/components/AgeVerification";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PODZOON By Cake",
  description:
    "เราเป็นร้านขายบุหรี่ไฟฟ้าที่มีหลากหลายยี่ห้อให้คุณเลือก มีบริการส่งด่วนในพื้นที่กรุงเทพทุกวัน และจัดส่งแบบพัสดุ จันทร์-เสาร์ มีการรับประกันสินค้า สั่งซื้อกับทางเราลูกค้ามั่นใจได้แน่นอนว่าจะได้รับของตามที่สั่ง ไม่มีเก็บเงินปลายทาง ไม่ขายให้เด็กต่ำกว่า 18 ปี",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <AgeVerification />
          <ClientHeader />
          <GSAPAnimations />
          <main className="pt-16">{children}</main>
          <Footer />
          <LineButton sticky />
        </AuthProvider>
      </body>
    </html>
  );
}

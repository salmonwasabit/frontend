export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            เงื่อนไขการใช้งาน
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              ยินดีต้อนรับสู่ podzoon
              กรุณาอ่านเงื่อนไขการใช้งานเหล่านี้อย่างละเอียดก่อนใช้บริการของเรา
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              การยอมรับเงื่อนไข
            </h2>
            <p className="text-gray-600 mb-6">
              การเข้าถึงและใช้งานเว็บไซต์นี้ถือว่าคุณยอมรับและตกลงที่จะปฏิบัติตามเงื่อนไขการใช้งานเหล่านี้
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              การใช้งาน
            </h2>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>
                เว็บไซต์นี้ใช้สำหรับการขายสินค้าอิเล็กทรอนิกส์สำหรับผู้สูบไอ
              </li>
              <li>ผู้ใช้ต้องมีอายุอย่างน้อย 20 ปีขึ้นไป</li>
              <li>ห้ามใช้เว็บไซต์เพื่อวัตถุประสงค์ที่ผิดกฎหมาย</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              คำสั่งซื้อและการชำระเงิน
            </h2>
            <p className="text-gray-600 mb-6">
              การสั่งซื้อสินค้าถือเป็นการทำสัญญาซื้อขายที่มีผลผูกพันทางกฎหมาย
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              การจัดส่ง
            </h2>
            <p className="text-gray-600 mb-6">
              เรา致力于提供及时准确的配送服务。配送时间可能因地区和产品而异。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              นโยบายการคืนสินค้า
            </h2>
            <p className="text-gray-600 mb-6">
              สินค้าสามารถคืนได้ภายใน 7 วันหลังจากได้รับสินค้า
              โดยสินค้าต้องอยู่ในสภาพเดิม
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              ข้อจำกัดความรับผิดชอบ
            </h2>
            <p className="text-gray-600">
              podzoon
              ไม่รับผิดชอบต่อความเสียหายที่เกิดจากการใช้งานสินค้าอย่างไม่ถูกต้อง
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

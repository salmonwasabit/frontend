export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">การคืนสินค้า</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              เราต้องการให้คุณมั่นใจในการซื้อสินค้าของเรา ดังนั้นเราจึงมีนโยบายการคืนสินค้าที่เอื้ออำนวย
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">เงื่อนไขการคืนสินค้า</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>สินค้าต้องอยู่ในสภาพเดิมและไม่ได้ใช้งาน</li>
              <li>ต้องมีใบเสร็จหรือหลักฐานการซื้อ</li>
              <li>คืนสินค้าได้ภายใน 7 วันหลังจากได้รับสินค้า</li>
              <li>สินค้าบางประเภทอาจไม่สามารถคืนได้เนื่องจากเหตุผลด้านสุขอนามัย</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">ขั้นตอนการคืนสินค้า</h2>
            <ol className="list-decimal pl-6 text-gray-600 mb-6">
              <li>ติดต่อฝ่ายบริการลูกค้าเพื่อแจ้งความต้องการคืนสินค้า</li>
              <li>แพ็คสินค้าให้ปลอดภัยในบรรจุภัณฑ์เดิม</li>
              <li>ส่งสินค้าคืนมาที่ที่อยู่ที่เราระบุ</li>
              <li>รอการตรวจสอบและอนุมัติจากทางเรา</li>
              <li>ได้รับเงินคืนภายใน 3-5 วันทำการหลังจากได้รับสินค้า</li>
            </ol>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">การคืนเงิน</h2>
            <p className="text-gray-600 mb-6">
              การคืนเงินจะดำเนินการผ่านช่องทางเดียวกับที่ใช้ชำระเงินเดิม
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">ติดต่อเรา</h2>
            <p className="text-gray-600">
              หากมีคำถามเกี่ยวกับการคืนสินค้า กรุณาติดต่อเราได้ที่ 
              <a href="mailto:support@vapelife.com" className="text-indigo-600 hover:text-indigo-800">
                support@vapelife.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">คำถามที่พบบ่อย</h1>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">สินค้าของคุณปลอดภัยหรือไม่?</h3>
              <p className="text-gray-600">ใช่ สินค้าทั้งหมดของเราได้รับการตรวจสอบคุณภาพและปลอดภัยสำหรับใช้งาน</p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ใช้เวลาจัดส่งกี่วัน?</h3>
              <p className="text-gray-600">โดยปกติแล้วจะใช้เวลา 2-5 วันทำการ ขึ้นกับพื้นที่จัดส่ง</p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">มีนโยบายการคืนสินค้าหรือไม่?</h3>
              <p className="text-gray-600">ใช่ เรามีนโยบายการคืนสินค้าภายใน 7 วัน หากสินค้าได้รับความเสียหาย</p>
            </div>
            
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">วิธีการชำระเงิน?</h3>
              <p className="text-gray-600">เรารับชำระเงินผ่านบัตรเครดิต, โอนเงินผ่านธนาคาร, และช่องทางอื่นๆ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

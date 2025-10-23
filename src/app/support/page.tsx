export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">การสนับสนุน</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              เรามีทีมงานที่พร้อมให้การสนับสนุนคุณเสมอ หากคุณมีคำถามหรือต้องการความช่วยเหลือ
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">ช่องทางการติดต่อ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">อีเมล</h3>
                <p className="text-gray-600">support@vapelife.com</p>
                <p className="text-sm text-gray-500 mt-2">ตอบกลับภายใน 24 ชั่วโมง</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">โทรศัพท์</h3>
                <p className="text-gray-600">+66 123 456 789</p>
                <p className="text-sm text-gray-500 mt-2">จันทร์-ศุกร์ 9:00-18:00 น.</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">คำถามที่พบบ่อย</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold text-gray-900">วิธีการสั่งซื้อสินค้า?</h4>
                <p className="text-gray-600 mt-1">เลือกสินค้าที่ต้องการ แล้วคลิก &quot;เพิ่มลงตะกร้า&quot; และดำเนินการชำระเงิน</p>
              </div>
              
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold text-gray-900">สินค้าหมดหรือไม่?</h4>
                <p className="text-gray-600 mt-1">คุณสามารถตรวจสอบจำนวนสินค้าคงเหลือได้ในหน้ารายละเอียดสินค้า</p>
              </div>
              
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold text-gray-900">ต้องการเปลี่ยนที่อยู่จัดส่ง?</h4>
                <p className="text-gray-600 mt-1">กรุณาติดต่อเราโดยเร็วที่สุดหลังจากสั่งซื้อ หากสินค้ายังไม่ได้จัดส่ง</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">ต้องการความช่วยเหลือด่วน?</h3>
              <p className="text-indigo-700">
                สำหรับปัญหาที่เร่งด่วน กรุณาติดต่อเราโดยตรงทางโทรศัพท์ 
                <span className="font-semibold">+66 123 456 789</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

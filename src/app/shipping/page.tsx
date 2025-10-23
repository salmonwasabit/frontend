export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">การจัดส่ง</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              เรามุ่งมั่นที่จะจัดส่งสินค้าให้ถึงมือคุณอย่างรวดเร็วและปลอดภัย
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">เวลาจัดส่ง</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>กรุงเทพฯ และปริมณฑล: 1-2 วันทำการ</li>
              <li>ต่างจังหวัด: 2-5 วันทำการ</li>
              <li>ภาคอีสาน/เหนือ/ใต้: 3-7 วันทำการ</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">ค่าจัดส่ง</h2>
            <p className="text-gray-600 mb-6">
              ค่าจัดส่งเริ่มต้นที่ 50 บาท สำหรับคำสั่งซื้อมากกว่า 1,000 บาท จัดส่งฟรี
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">การติดตามพัสดุ</h2>
            <p className="text-gray-600 mb-6">
              คุณสามารถติดตามสถานะการจัดส่งได้ผ่านทางอีเมลหรือทางโทรศัพท์
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">ติดต่อเรา</h2>
            <p className="text-gray-600">
              หากมีคำถามเกี่ยวกับการจัดส่ง กรุณาติดต่อเราได้ที่ 
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

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            นโยบายความเป็นส่วนตัว
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              podzoon เคารพความเป็นส่วนตัวของผู้ใช้ทุกคน
              และมุ่งมั่นที่จะปกป้องข้อมูลส่วนบุคคลของคุณ
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              ข้อมูลที่เราเก็บรวบรวม
            </h2>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>ข้อมูลการสั่งซื้อและการชำระเงิน</li>
              <li>ข้อมูลติดต่อ (ชื่อ, อีเมล, ที่อยู่)</li>
              <li>ข้อมูลการใช้งานเว็บไซต์</li>
              <li>ข้อมูลการสนับสนุนลูกค้า</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              การใช้ข้อมูล
            </h2>
            <p className="text-gray-600 mb-6">เราใช้ข้อมูลของคุณเพื่อ:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>ดำเนินการสั่งซื้อและการจัดส่ง</li>
              <li>ให้บริการสนับสนุนลูกค้า</li>
              <li>ปรับปรุงเว็บไซต์และบริการ</li>
              <li>ส่งข้อมูลโปรโมชั่น (หากคุณยินยอม)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              การแบ่งปันข้อมูล
            </h2>
            <p className="text-gray-600 mb-6">
              เราไม่ขายหรือให้เช่าข้อมูลส่วนบุคคลของคุณให้กับบุคคลที่สาม
              ยกเว้นในกรณีที่จำเป็นสำหรับการดำเนินธุรกิจ เช่น การจัดส่งสินค้า
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              ความปลอดภัย
            </h2>
            <p className="text-gray-600 mb-6">
              เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของคุณ
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              ติดต่อเรา
            </h2>
            <p className="text-gray-600">
              หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้
              กรุณาติดต่อเราได้ที่
              <a
                href="mailto:support@podzoon.com"
                className="text-indigo-600 hover:text-indigo-800"
              >
                support@podzoon.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

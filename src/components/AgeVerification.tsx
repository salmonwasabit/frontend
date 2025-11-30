"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AgeVerification() {
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("ageVerified");
    if (verified === "true") {
      setIsVerified(true);
    } else {
      setShowModal(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("ageVerified", "true");
    setIsVerified(true);
    setShowModal(false);
  };

  const handleDeny = () => {
    window.location.href = "https://www.google.com"; // Redirect to safe site
  };

  if (isVerified) return null;

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Header with soft gradient background */}
            <div className="bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/40 px-8 py-8">
              <div className="flex items-center justify-center mb-5">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center shadow-sm">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-blue-600"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
                ยินดีต้อนรับ
              </h2>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                เพื่อให้มั่นใจว่าคุณมีอายุเหมาะสมกับเนื้อหาในเว็บไซต์
              </p>
            </div>

            {/* Content */}
            <div className="px-8 py-8">
              <div className="text-center mb-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  คุณมีอายุ 18 ปีขึ้นไปหรือไม่?
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  การเข้าชมเว็บไซต์นี้ต้องมีอายุอย่างน้อย 18 ปี
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleConfirm}
                  className="w-full px-8 py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-3xl font-semibold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border-2 border-blue-400/30 hover:border-blue-400/50"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-white">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                    </div>
                    <span>ใช่ ฉันอายุ 18 ปีขึ้นไป</span>
                  </div>
                </button>
                <button
                  onClick={handleDeny}
                  className="w-full px-8 py-5 bg-white/90 text-gray-600 rounded-3xl font-medium text-base hover:bg-white hover:shadow-lg transition-all duration-300 border-2 border-gray-200/50 hover:border-gray-300/70 hover:scale-[1.01] active:scale-[0.98] backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-600">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                    <span>ไม่ใช่ ฉันอายุต่ำกว่า 18 ปี</span>
                  </div>
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-xs text-gray-400 leading-relaxed">
                  การเลือก &ldquo;ใช่&rdquo; หมายถึงคุณยอมรับและเข้าใจเงื่อนไขนี้
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

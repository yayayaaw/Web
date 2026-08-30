// Taruh file ini di: src/admin/tabs/AnalyticsTab.tsx
import React from 'react';

export function AnalyticsTab() {
  return (
    <section className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-[#F4EFE6] shadow-sm text-center space-y-4">
        <i className="fa-solid fa-chart-line text-4xl text-[#6F4E37]"></i>
        <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Data Pengunjung Real
        </h3>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Statistik pengunjung harian/bulanan yang akurat akan tersedia setelah web
          dihubungkan ke layanan analitik (misalnya Google Analytics atau Firebase Analytics).
          Bagian ini disiapkan sebagai placeholder dulu — beri tahu saya kapan mau diaktifkan.
        </p>
      </div>
    </section>
  );
}

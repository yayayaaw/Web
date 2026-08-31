// Taruh file ini di: src/components/WelcomeSection.tsx
import React from 'react';

export const WelcomeSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-brand-ivory relative">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center space-y-4">
        <span className="text-[11px] uppercase tracking-[0.3em] text-brand-charcoal/70 font-semibold block">
          Welcome to Élysée
        </span>
        <h2 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-light text-brand-charcoal leading-snug">
          Selamat datang di rumah kedua untuk secangkir ketenangan
        </h2>
        <p className="text-sm text-gray-500 font-light leading-relaxed">
          Kami membuka pintu setiap hari untuk siapa pun yang mencari jeda dari rutinitas —
          ditemani kopi pilihan dan suasana yang dirancang untuk membuat Anda betah berlama-lama.
        </p>
      </div>
    </section>
  );
};

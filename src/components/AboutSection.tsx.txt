import React from 'react';
import { Coffee, Utensils, Armchair, Wifi, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      icon: Coffee,
      title: 'Biji Kopi Terpilih',
      desc: 'Biji kopi Arabika single-origin yang dipanggang secara presisi oleh roaster berpengalaman.',
    },
    {
      icon: Utensils,
      title: 'Bahan Segar & Alami',
      desc: 'Setiap hidangan dimasak fresh dengan sayuran segar dan bahan organik suplier lokal.',
    },
    {
      icon: Armchair,
      title: 'Ruang Hangat & Nyaman',
      desc: 'Tata letak ergonomis, pencahayaan temaram hangat, serta alunan musik santai akustik.',
    },
    {
      icon: Wifi,
      title: 'Koneksi Wi-Fi 100 Mbps',
      desc: 'Dukungan internet cepat dan ketersediaan stopkontak di setiap sudut meja untuk produktivitas Anda.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-brand-cream/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image composition with Floating Badge */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-ivory">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=900"
                alt="Élysée Café Interior with Warm Light"
                className="w-full h-[420px] sm:h-[500px] object-cover hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Secondary photo inset for depth */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-32 sm:w-44 h-32 sm:h-44 rounded-2xl overflow-hidden border-2 border-brand-ivory shadow-xl hidden xs:block">
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=400"
                  alt="Barista Pour Over"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-6 order-1 lg:order-2">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-brand-brown font-semibold block mb-2">
                Our Story & Philosophy
              </span>
              <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal leading-[1.18]">
                Harmoni Rasa dalam <br className="hidden sm:inline" />
                <span className="italic font-normal text-brand-brown">Suasana yang Tenang</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              Lahir dari kecintaan mendalam pada budaya slow living dan seni secangkir kopi, <strong>Élysée Café & Bistro</strong> hadir sebagai ruang jeda yang menenangkan di tengah dinamika hiruk pikuk kota Jakarta.
            </p>

            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              Kami memadukan seduhan kopi berstandar specialty dengan santapan comfort food bergaya kontemporer. Mulai dari biji kopi yang diseleksi langsung dari petani hingga saus pasta buatan tangan, setiap hidangan kami persiapkan dengan ketelitian dan rasa hormat terhadap bahan alami.
            </p>

            {/* Highlight Items Grid */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-brand-ivory/80 border border-brand-beige/60 shadow-xs hover:shadow-md hover:bg-brand-ivory transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-brand-cream text-brand-charcoal group-hover:bg-brand-charcoal group-hover:text-brand-ivory flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-serif-title text-base font-bold text-brand-charcoal">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

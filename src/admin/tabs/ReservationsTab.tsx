// Taruh file ini di: src/admin/tabs/ReservationsTab.tsx
import React from 'react';

interface ReservationRow {
  id: string;
  dateLabel: string;
  timeLabel: string;
  name: string;
  phone: string;
  guests: number;
  area: string;
  note: string;
  status: 'Menunggu' | 'Terkonfirmasi';
}

const SEED_RESERVATIONS: ReservationRow[] = [
  { id: '1', dateLabel: '28 Ags 2026', timeLabel: '19:00 WIB', name: 'Budi Santoso', phone: '08123456789', guests: 4, area: 'Indoor Main Hall', note: 'Minta meja dekat jendela', status: 'Menunggu' },
];

export function ReservationsTab() {
  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Daftar Reservasi Masuk</h3>
        <p className="text-xs text-gray-500">Kelola konfirmasi meja untuk pengunjung website.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#F4EFE6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F4EFE6]/60 border-b border-[#F4EFE6] text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                <th className="p-4">Tanggal & Jam</th><th className="p-4">Pemesan</th><th className="p-4">Tamu</th>
                <th className="p-4">Area</th><th className="p-4">Catatan</th><th className="p-4">Status</th><th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4EFE6] text-xs">
              {SEED_RESERVATIONS.map(r => (
                <tr key={r.id}>
                  <td className="p-4 font-semibold">{r.dateLabel}<br /><span className="text-[10px] text-gray-400">{r.timeLabel}</span></td>
                  <td className="p-4 font-bold text-[#1A1A1A]">{r.name}<br /><span className="text-[10px] font-normal text-gray-400">{r.phone}</span></td>
                  <td className="p-4">{r.guests} Orang</td>
                  <td className="p-4">{r.area}</td>
                  <td className="p-4 text-gray-500 italic">{r.note}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${r.status === 'Terkonfirmasi' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <a href={`https://wa.me/62${r.phone.replace(/^0/, '')}`} target="_blank" rel="noreferrer"
                       className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-[11px] font-medium hover:bg-emerald-700">
                      <i className="fa-brands fa-whatsapp mr-1"></i> Chat WA
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-[11px] text-gray-400">
        Catatan: data di atas masih contoh statis. Perlu form reservasi di web utama yang mengirim data ke sini
        supaya reservasi asli pengunjung otomatis muncul di tabel ini.
      </p>
    </section>
  );
}

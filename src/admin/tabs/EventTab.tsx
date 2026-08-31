// Taruh file ini di: src/admin/tabs/EventTab.tsx
import React, { useState } from 'react';
import { getContent, setContent, EventContent } from '../../lib/contentStore';
import { ImagePicker } from '../components/ImagePicker';

export function EventTab() {
  const [event, setEvent] = useState<EventContent>(() => getContent().event);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setContent('event', event);
    alert('Section Event berhasil disimpan!');
  }

  return (
    <section className="space-y-6">
      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#F4EFE6] pb-4">
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Event Akhir Pekan
            </h3>
            <p className="text-xs text-gray-500">Bagian highlight event (mis. Jazz Night) di homepage.</p>
          </div>
          <button type="submit" className="bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-800">
            Simpan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Label Badge</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none"
                value={event.badgeLabel}
                onChange={e => setEvent({ ...event, badgeLabel: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Judul Event</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none"
                value={event.title}
                onChange={e => setEvent({ ...event, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Deskripsi</label>
              <textarea
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none"
                value={event.description}
                onChange={e => setEvent({ ...event, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Tanggal & Jam</label>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none"
                  value={event.dateStr}
                  onChange={e => setEvent({ ...event, dateStr: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Info Pintu Buka</label>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-[#FDFBF7] outline-none"
                  value={event.timeStr}
                  onChange={e => setEvent({ ...event, timeStr: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start">
            <ImagePicker
              label="Foto Latar Event"
              value={event.image}
              onChange={url => setEvent({ ...event, image: url })}
              aspectRatio="16/9"
            />
          </div>
        </div>
      </form>
    </section>
  );
}

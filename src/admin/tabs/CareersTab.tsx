// Taruh file ini di: src/admin/tabs/CareersTab.tsx
import React, { useState } from 'react';
import { AdminJobPosition } from '../adminTypes';

const SEED_JOBS: AdminJobPosition[] = [
  { id: '1', title: 'Barista', department: 'Operasional', location: 'Jakarta Selatan', type: 'Full-time', description: 'Meracik kopi artisan dan melayani pelanggan dengan ramah.' },
];

export function CareersTab() {
  const [jobs, setJobs] = useState<AdminJobPosition[]>(SEED_JOBS);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', department: '', location: '', type: 'Full-time', description: '' });

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setJobs([{ id: Date.now().toString(), ...form }, ...jobs]);
    setForm({ title: '', department: '', location: '', type: 'Full-time', description: '' });
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    if (confirm('Hapus lowongan ini?')) setJobs(jobs.filter(j => j.id !== id));
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#F4EFE6] shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Lowongan Karir</h3>
          <p className="text-xs text-gray-500">Kelola posisi yang dibuka di halaman Karir.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="bg-[#1A1A1A] text-white text-xs font-semibold px-4 py-2.5 rounded-xl">
          + Buka Lowongan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.length === 0 && <p className="col-span-full text-center text-gray-400 py-6">Belum ada lowongan dibuka.</p>}
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-[#1A1A1A]">{job.title}</h4>
                <p className="text-[11px] text-gray-400">{job.department} • {job.location} • {job.type}</p>
              </div>
              <button onClick={() => handleDelete(job.id)} className="text-red-500 hover:text-red-700 text-xs"><i className="fa-solid fa-trash"></i></button>
            </div>
            <p className="text-xs text-gray-600">{job.description}</p>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative border border-[#E6DEC8]">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400"><i className="fa-solid fa-xmark text-xl"></i></button>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Buka Lowongan Baru</h3>
            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Posisi *</label>
                <input required className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Departemen</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Tipe</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Magang</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Lokasi</label>
                <input className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Deskripsi Tugas</label>
                <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setModalOpen(false)} className="w-1/2 py-3 rounded-xl border font-bold">Batal</button>
                <button type="submit" className="w-1/2 py-3 rounded-xl bg-[#1A1A1A] text-white font-bold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

// Taruh file ini di: src/admin/tabs/CareersTab.tsx
import React, { useEffect, useState } from 'react';
import { JobPosition } from '../../types';
import { getContent, setContent } from '../../lib/contentStore';

type JobForm = {
  title: string;
  department: JobPosition['department'];
  type: JobPosition['type'];
  location: string;
  salaryRange: string;
  experience: string;
  urgent: boolean;
  shortDescription: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
};

const EMPTY_FORM: JobForm = {
  title: '',
  department: 'barista',
  type: 'Full-Time',
  location: 'Senopati, Jakarta Selatan',
  salaryRange: '',
  experience: '',
  urgent: false,
  shortDescription: '',
  responsibilities: [''],
  requirements: [''],
  benefits: [''],
};

const DEPARTMENTS: { value: JobPosition['department']; label: string }[] = [
  { value: 'barista', label: 'Barista & Kopi' },
  { value: 'kitchen', label: 'Dapur & Pastry' },
  { value: 'floor', label: 'Layanan & Floor' },
  { value: 'creative', label: 'Konten & Kreatif' },
];

const JOB_TYPES: { value: JobPosition['type']; label: string }[] = [
  { value: 'Full-Time', label: 'Full-Time' },
  { value: 'Part-Time', label: 'Part-Time' },
  { value: 'Internship', label: 'Magang / Internship' },
];

function ListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  function updateItem(i: number, value: string) {
    const next = [...items];
    next[i] = value;
    onChange(next);
  }
  function removeItem(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-xl border border-[#F4EFE6] bg-white outline-none text-xs"
              value={item}
              placeholder={`${label} #${i + 1}`}
              onChange={(e) => updateItem(i, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="text-red-500 hover:text-red-700 px-2"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="mt-2 text-xs font-semibold text-[#6F4E37] hover:underline"
      >
        + Tambah {label}
      </button>
    </div>
  );
}

export function CareersTab() {
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<JobForm>(EMPTY_FORM);

  useEffect(() => {
    setJobs(getContent().jobPositions);
  }, []);

  function persist(next: JobPosition[]) {
    setJobs(next);
    setContent('jobPositions', next); // langsung sinkron ke web utama
  }

  function openAddModal() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEditModal(job: JobPosition) {
    setEditingId(job.id);
    setForm({
      title: job.title,
      department: job.department,
      type: job.type,
      location: job.location,
      salaryRange: job.salaryRange,
      experience: job.experience,
      urgent: Boolean(job.urgent),
      shortDescription: job.shortDescription,
      responsibilities: job.responsibilities.length ? job.responsibilities : [''],
      requirements: job.requirements.length ? job.requirements : [''],
      benefits: job.benefits.length ? job.benefits : [''],
    });
    setModalOpen(true);
  }

  function cleanList(list: string[]) {
    return list.map((s) => s.trim()).filter(Boolean);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: JobPosition = {
      id: editingId ?? `job-${Date.now()}`,
      title: form.title.trim(),
      department: form.department,
      type: form.type,
      location: form.location.trim(),
      salaryRange: form.salaryRange.trim(),
      experience: form.experience.trim(),
      urgent: form.urgent,
      shortDescription: form.shortDescription.trim(),
      responsibilities: cleanList(form.responsibilities),
      requirements: cleanList(form.requirements),
      benefits: cleanList(form.benefits),
    };

    if (editingId) {
      persist(jobs.map((j) => (j.id === editingId ? payload : j)));
    } else {
      persist([payload, ...jobs]);
    }
    setModalOpen(false);
    setForm(EMPTY_FORM);
    setEditingId(null);
  }

  function handleDelete(id: string) {
    if (confirm('Hapus lowongan ini?')) persist(jobs.filter((j) => j.id !== id));
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#F4EFE6] shadow-sm">
        <div>
          <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Lowongan Karir</h3>
          <p className="text-xs text-gray-500">Kelola posisi yang dibuka di halaman Karir. Perubahan langsung tampil di web utama.</p>
        </div>
        <button onClick={openAddModal} className="bg-[#1A1A1A] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shrink-0">
          + Buka Lowongan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.length === 0 && <p className="col-span-full text-center text-gray-400 py-6">Belum ada lowongan dibuka.</p>}
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-3">
            <div className="flex justify-between items-start gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-[#1A1A1A]">{job.title}</h4>
                  {job.urgent && (
                    <span className="text-[10px] font-bold uppercase tracking-wide text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Urgent</span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400">
                  {DEPARTMENTS.find(d => d.value === job.department)?.label ?? job.department} • {job.location} • {job.type}
                </p>
                <p className="text-[11px] text-gray-400 font-mono mt-0.5">{job.salaryRange}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => openEditModal(job)} className="text-gray-500 hover:text-[#1A1A1A] text-xs"><i className="fa-solid fa-pen"></i></button>
                <button onClick={() => handleDelete(job.id)} className="text-red-500 hover:text-red-700 text-xs"><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
            <p className="text-xs text-gray-600">{job.shortDescription}</p>
            <div className="flex flex-wrap gap-3 text-[11px] text-gray-400 pt-1 border-t border-[#F4EFE6]">
              <span>{job.responsibilities.length} tanggung jawab</span>
              <span>•</span>
              <span>{job.requirements.length} persyaratan</span>
              <span>•</span>
              <span>{job.benefits.length} benefit</span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start sm:items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 relative border border-[#E6DEC8] my-8">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400"><i className="fa-solid fa-xmark text-xl"></i></button>
            <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {editingId ? 'Edit Lowongan' : 'Buka Lowongan Baru'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Posisi *</label>
                <input required className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Departemen</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={form.department} onChange={e => setForm({ ...form, department: e.target.value as JobPosition['department'] })}>
                    {DEPARTMENTS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Tipe</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as JobPosition['type'] })}>
                    {JOB_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Lokasi</label>
                <input className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Rentang Gaji</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" placeholder="Rp 5.000.000 – Rp 7.000.000 + Tips" value={form.salaryRange} onChange={e => setForm({ ...form, salaryRange: e.target.value })} />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Pengalaman</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" placeholder="Min. 2 tahun di ..." value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} />
                </div>
              </div>

              <label className="flex items-center gap-2 font-semibold">
                <input type="checkbox" checked={form.urgent} onChange={e => setForm({ ...form, urgent: e.target.checked })} />
                Tandai sebagai Urgent Hiring
              </label>

              <div>
                <label className="block font-semibold mb-1">Deskripsi Singkat</label>
                <textarea rows={2} className="w-full px-4 py-3 rounded-xl border border-[#F4EFE6] bg-white outline-none" value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} />
              </div>

              <ListEditor label="Tanggung Jawab" items={form.responsibilities} onChange={(v) => setForm({ ...form, responsibilities: v })} />
              <ListEditor label="Persyaratan" items={form.requirements} onChange={(v) => setForm({ ...form, requirements: v })} />
              <ListEditor label="Fasilitas & Tunjangan" items={form.benefits} onChange={(v) => setForm({ ...form, benefits: v })} />

              <div className="pt-2 flex gap-3 sticky bottom-0 bg-[#FDFBF7] pb-1">
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

// Taruh file ini di: src/admin/tabs/AnalyticsTab.tsx
import React, { useEffect, useState } from 'react';
import {
  getContent,
  setContent,
  AnalyticsData,
  AnalyticsTrendPoint,
  AnalyticsSectionStat,
  AnalyticsPeakHour,
} from '../../lib/contentStore';

function StatCard({ label, value, sub, icon }: { label: string; value: string | number; sub?: string; icon: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">{label}</span>
        <i className={`fa-solid ${icon} text-[#6F4E37]/60 text-xs`}></i>
      </div>
      <p className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {value}
      </p>
      {sub && <p className="text-[11px] text-gray-500">{sub}</p>}
    </div>
  );
}

function MiniLineChart({ points }: { points: AnalyticsTrendPoint[] }) {
  if (points.length === 0) return null;
  const width = 560;
  const height = 160;
  const padding = 20;
  const max = Math.max(...points.map((p) => p.value), 1);

  const coords = points.map((p, i) => {
    const x = padding + (i * (width - padding * 2)) / Math.max(points.length - 1, 1);
    const y = height - padding - (p.value / max) * (height - padding * 2);
    return { x, y };
  });

  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
      <defs>
        <linearGradient id="analyticsAreaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6F4E37" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6F4E37" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#analyticsAreaFill)" />
      <path d={linePath} fill="none" stroke="#6F4E37" strokeWidth="2" />
      {coords.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r="3.5" fill="#6F4E37" />
      ))}
      {points.map((p, i) => (
        <text key={p.id} x={coords[i].x} y={height - 4} textAnchor="middle" fontSize="10" fill="#8a7d6d">
          {p.label}
        </text>
      ))}
    </svg>
  );
}

export function AnalyticsTab() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setData(getContent().analytics);
  }, []);

  function persist(next: AnalyticsData) {
    setData(next);
    setContent('analytics', next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }

  if (!data) return null;

  function updateField<K extends keyof AnalyticsData>(key: K, value: AnalyticsData[K]) {
    if (!data) return;
    setData({ ...data, [key]: value });
  }

  function updateTrend(i: number, field: 'label' | 'value', value: string) {
    if (!data) return;
    const next = [...data.trend7Days];
    next[i] = { ...next[i], [field]: field === 'value' ? Number(value) || 0 : value };
    setData({ ...data, trend7Days: next });
  }

  function updateSection(i: number, field: keyof AnalyticsSectionStat, value: string) {
    if (!data) return;
    const next = [...data.topSections];
    next[i] = {
      ...next[i],
      [field]: field === 'name' ? value : Number(value) || 0,
    };
    setData({ ...data, topSections: next });
  }

  function addSection() {
    if (!data) return;
    setData({
      ...data,
      topSections: [...data.topSections, { id: `sec-${Date.now()}`, name: '', views: 0, percent: 0 }],
    });
  }

  function removeSection(i: number) {
    if (!data) return;
    setData({ ...data, topSections: data.topSections.filter((_, idx) => idx !== i) });
  }

  function updatePeak(i: number, field: keyof AnalyticsPeakHour, value: string) {
    if (!data) return;
    const next = [...data.peakHours];
    next[i] = {
      ...next[i],
      [field]: field === 'percent' ? Number(value) || 0 : value,
    };
    setData({ ...data, peakHours: next });
  }

  function addPeak() {
    if (!data) return;
    setData({
      ...data,
      peakHours: [...data.peakHours, { id: `ph-${Date.now()}`, range: '', label: '', percent: 0 }],
    });
  }

  function removePeak(i: number) {
    if (!data) return;
    setData({ ...data, peakHours: data.peakHours.filter((_, idx) => idx !== i) });
  }

  return (
    <section className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-1">
        <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Analitik Pengunjung
        </h3>
        <p className="text-xs text-gray-500">
          Karena web belum terhubung ke Google Analytics/Firebase, angka-angka di sini diisi & diperbarui manual dari sini. Dashboard di bawah menampilkan pratinjau langsung dari data yang tersimpan.
        </p>
      </div>

      {/* ===== PRATINJAU DASHBOARD ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Pengunjung" value={data.totalVisitors.toLocaleString('id-ID')} sub={data.totalVisitorsGrowthLabel} icon="fa-users" />
        <StatCard label="Pengunjung Hari Ini" value={data.todayVisitors.toLocaleString('id-ID')} sub={data.todayVisitorsLabel} icon="fa-clock" />
        <StatCard label="Minggu Ini" value={data.weekVisitors.toLocaleString('id-ID')} sub={data.weekGrowthLabel} icon="fa-calendar-week" />
        <StatCard label="Bulan Ini" value={data.monthVisitors.toLocaleString('id-ID')} sub={data.monthLabel} icon="fa-chart-column" />
      </div>

      <StatCard label="Total Page Views" value={data.totalPageViews.toLocaleString('id-ID')} sub={data.avgViewsLabel} icon="fa-eye" />

      <div className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-3">
        <h4 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
          <i className="fa-solid fa-chart-line text-[#6F4E37]"></i> Grafik Tren Kunjungan (7 Hari Terakhir)
        </h4>
        <MiniLineChart points={data.trend7Days} />
      </div>

      <div className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-3">
        <h4 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
          <i className="fa-solid fa-layer-group text-[#6F4E37]"></i> Section Paling Diminati
        </h4>
        <div className="space-y-2.5">
          {data.topSections.map((s) => (
            <div key={s.id}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-[#1A1A1A]">{s.name || '(belum diisi)'}</span>
                <span className="text-gray-500">{s.views.toLocaleString('id-ID')} views ({s.percent}%)</span>
              </div>
              <div className="w-full h-1.5 bg-[#F4EFE6] rounded-full overflow-hidden">
                <div className="h-full bg-[#6F4E37] rounded-full" style={{ width: `${Math.min(s.percent, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-3">
          <h4 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
            <i className="fa-solid fa-mobile-screen text-[#6F4E37]"></i> Distribusi Perangkat
          </h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#F4EFE6]">
              <p className="text-lg font-bold text-[#1A1A1A]">{data.deviceDistribution.mobile}%</p>
              <p className="text-[10px] text-gray-500">Smartphone</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#F4EFE6]">
              <p className="text-lg font-bold text-[#1A1A1A]">{data.deviceDistribution.desktop}%</p>
              <p className="text-[10px] text-gray-500">Desktop</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#F4EFE6]">
              <p className="text-lg font-bold text-[#1A1A1A]">{data.deviceDistribution.tablet}%</p>
              <p className="text-[10px] text-gray-500">Tablet</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-3">
          <h4 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
            <i className="fa-solid fa-business-time text-[#6F4E37]"></i> Jam Sibuk Akses Online
          </h4>
          <div className="space-y-2">
            {data.peakHours.map((p) => (
              <div key={p.id} className="text-xs">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-[#1A1A1A]">{p.range} — {p.label || '(belum diisi)'}</span>
                </div>
                <div className="w-full h-1.5 bg-[#F4EFE6] rounded-full overflow-hidden">
                  <div className="h-full bg-[#6F4E37] rounded-full" style={{ width: `${Math.min(p.percent, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== FORM EDIT ===== */}
      <div className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-[#1A1A1A]">Edit Angka Ringkasan</h4>
          <button
            onClick={() => persist(data)}
            className="bg-[#1A1A1A] text-white text-xs font-semibold px-4 py-2.5 rounded-xl"
          >
            {saved ? 'Tersimpan ✓' : 'Simpan Semua'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-semibold mb-1">Total Pengunjung</label>
            <input type="number" className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] outline-none" value={data.totalVisitors} onChange={(e) => updateField('totalVisitors', Number(e.target.value) || 0)} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Label Pertumbuhan Total</label>
            <input className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] outline-none" placeholder="+12.4% bln ini" value={data.totalVisitorsGrowthLabel} onChange={(e) => updateField('totalVisitorsGrowthLabel', e.target.value)} />
          </div>

          <div>
            <label className="block font-semibold mb-1">Pengunjung Hari Ini</label>
            <input type="number" className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] outline-none" value={data.todayVisitors} onChange={(e) => updateField('todayVisitors', Number(e.target.value) || 0)} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Label Hari Ini</label>
            <input className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] outline-none" placeholder="Aktif sesi terkini" value={data.todayVisitorsLabel} onChange={(e) => updateField('todayVisitorsLabel', e.target.value)} />
          </div>

          <div>
            <label className="block font-semibold mb-1">Pengunjung Minggu Ini</label>
            <input type="number" className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] outline-none" value={data.weekVisitors} onChange={(e) => updateField('weekVisitors', Number(e.target.value) || 0)} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Label Pertumbuhan Minggu</label>
            <input className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] outline-none" placeholder="+8.2% vs lalu" value={data.weekGrowthLabel} onChange={(e) => updateField('weekGrowthLabel', e.target.value)} />
          </div>

          <div>
            <label className="block font-semibold mb-1">Pengunjung Bulan Ini</label>
            <input type="number" className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] outline-none" value={data.monthVisitors} onChange={(e) => updateField('monthVisitors', Number(e.target.value) || 0)} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Label Bulan</label>
            <input className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] outline-none" placeholder="Agustus 2026" value={data.monthLabel} onChange={(e) => updateField('monthLabel', e.target.value)} />
          </div>

          <div>
            <label className="block font-semibold mb-1">Total Page Views</label>
            <input type="number" className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] outline-none" value={data.totalPageViews} onChange={(e) => updateField('totalPageViews', Number(e.target.value) || 0)} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Label Rata-rata View</label>
            <input className="w-full px-3 py-2.5 rounded-xl border border-[#F4EFE6] outline-none" placeholder="Rata-rata 3.1 view/tamu" value={data.avgViewsLabel} onChange={(e) => updateField('avgViewsLabel', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-3">
        <h4 className="font-bold text-[#1A1A1A]">Grafik Tren 7 Hari</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {data.trend7Days.map((p, i) => (
            <div key={p.id} className="space-y-1">
              <input className="w-full px-2 py-2 rounded-lg border border-[#F4EFE6] outline-none text-center" value={p.label} onChange={(e) => updateTrend(i, 'label', e.target.value)} />
              <input type="number" className="w-full px-2 py-2 rounded-lg border border-[#F4EFE6] outline-none text-center" value={p.value} onChange={(e) => updateTrend(i, 'value', e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-[#1A1A1A]">Section Paling Diminati</h4>
          <button onClick={addSection} className="text-xs font-semibold text-[#6F4E37] hover:underline">+ Tambah Baris</button>
        </div>
        <div className="space-y-2">
          {data.topSections.map((s, i) => (
            <div key={s.id} className="grid grid-cols-[2fr_1fr_1fr_auto] gap-2 text-xs items-center">
              <input className="px-2 py-2 rounded-lg border border-[#F4EFE6] outline-none" placeholder="Nama section" value={s.name} onChange={(e) => updateSection(i, 'name', e.target.value)} />
              <input type="number" className="px-2 py-2 rounded-lg border border-[#F4EFE6] outline-none" placeholder="Views" value={s.views} onChange={(e) => updateSection(i, 'views', e.target.value)} />
              <input type="number" className="px-2 py-2 rounded-lg border border-[#F4EFE6] outline-none" placeholder="%" value={s.percent} onChange={(e) => updateSection(i, 'percent', e.target.value)} />
              <button onClick={() => removeSection(i)} className="text-red-500 hover:text-red-700 px-1"><i className="fa-solid fa-xmark"></i></button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-3">
        <h4 className="font-bold text-[#1A1A1A]">Distribusi Perangkat (%)</h4>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <label className="block font-semibold mb-1">Smartphone</label>
            <input type="number" className="w-full px-2 py-2 rounded-lg border border-[#F4EFE6] outline-none" value={data.deviceDistribution.mobile} onChange={(e) => updateField('deviceDistribution', { ...data.deviceDistribution, mobile: Number(e.target.value) || 0 })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Desktop</label>
            <input type="number" className="w-full px-2 py-2 rounded-lg border border-[#F4EFE6] outline-none" value={data.deviceDistribution.desktop} onChange={(e) => updateField('deviceDistribution', { ...data.deviceDistribution, desktop: Number(e.target.value) || 0 })} />
          </div>
          <div>
            <label className="block font-semibold mb-1">Tablet</label>
            <input type="number" className="w-full px-2 py-2 rounded-lg border border-[#F4EFE6] outline-none" value={data.deviceDistribution.tablet} onChange={(e) => updateField('deviceDistribution', { ...data.deviceDistribution, tablet: Number(e.target.value) || 0 })} />
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-[#F4EFE6] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-[#1A1A1A]">Jam Sibuk Akses Online</h4>
          <button onClick={addPeak} className="text-xs font-semibold text-[#6F4E37] hover:underline">+ Tambah Baris</button>
        </div>
        <div className="space-y-2">
          {data.peakHours.map((p, i) => (
            <div key={p.id} className="grid grid-cols-[1fr_2fr_1fr_auto] gap-2 text-xs items-center">
              <input className="px-2 py-2 rounded-lg border border-[#F4EFE6] outline-none" placeholder="08:00 - 11:00" value={p.range} onChange={(e) => updatePeak(i, 'range', e.target.value)} />
              <input className="px-2 py-2 rounded-lg border border-[#F4EFE6] outline-none" placeholder="Nama slot" value={p.label} onChange={(e) => updatePeak(i, 'label', e.target.value)} />
              <input type="number" className="px-2 py-2 rounded-lg border border-[#F4EFE6] outline-none" placeholder="%" value={p.percent} onChange={(e) => updatePeak(i, 'percent', e.target.value)} />
              <button onClick={() => removePeak(i)} className="text-red-500 hover:text-red-700 px-1"><i className="fa-solid fa-xmark"></i></button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => persist(data)}
        className="w-full py-3 rounded-xl bg-[#1A1A1A] text-white font-bold text-sm sticky bottom-4"
      >
        {saved ? 'Tersimpan ✓' : 'Simpan Semua Perubahan'}
      </button>
    </section>
  );
                       }

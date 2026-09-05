// Taruh file ini di: src/admin/tabs/AnalyticsTab.tsx
import React, { useEffect, useState } from 'react';
import {
  getContent,
  setContent,
  generateDummyAnalytics,
  AnalyticsData,
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

function MiniLineChart({ points }: { points: AnalyticsData['trend7Days'] }) {
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
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // getContent() sudah otomatis regenerate kalau data basi/kosong,
    // jadi di sini kita tinggal baca -- ga ada input manual sama sekali.
    setData(getContent().analytics);
  }, []);

  function handleRefresh() {
    setRefreshing(true);
    const fresh = generateDummyAnalytics();
    setContent('analytics', fresh);
    setData(fresh);
    setTimeout(() => setRefreshing(false), 500);
  }

  if (!data) return null;

  return (
    <section className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-[#F4EFE6] shadow-sm flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Analitik Pengunjung
          </h3>
          <p className="text-xs text-gray-500 max-w-md">
            Data ini dummy otomatis (belum terhubung ke Google Analytics/Firebase). Diperbarui otomatis setiap hari, atau tekan "Refresh Data" untuk generate ulang sekarang.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="shrink-0 flex items-center gap-2 bg-[#1A1A1A] text-white text-xs font-semibold px-4 py-2.5 rounded-xl"
        >
          <i className={`fa-solid fa-arrows-rotate ${refreshing ? 'animate-spin' : ''}`}></i>
          Refresh Data
        </button>
      </div>

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
                <span className="font-medium text-[#1A1A1A]">{s.name}</span>
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
                  <span className="font-medium text-[#1A1A1A]">{p.range} — {p.label}</span>
                </div>
                <div className="w-full h-1.5 bg-[#F4EFE6] rounded-full overflow-hidden">
                  <div className="h-full bg-[#6F4E37] rounded-full" style={{ width: `${Math.min(p.percent, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
    }

import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Phone,
  Mail,
  Coffee,
  GraduationCap,
  Award,
  Utensils,
  ShieldCheck,
  Heart,
  Sparkles,
  ArrowRight,
  Send,
  UserCheck,
  CalendarCheck,
  FileCheck,
  Flame,
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { JobPosition, JobApplication, PageId } from '../types';
import { CAFE_INFO } from '../data/mockData';
import { useContent } from '../lib/contentStore';

interface CareersPageProps {
  onNavigate: (page: PageId) => void;
  onOpenApplyModal: (job: JobPosition) => void;
  applications: JobApplication[];
}

export const CareersPage: React.FC<CareersPageProps> = ({
  onNavigate,
  onOpenApplyModal,
  applications,
}) => {
  const JOB_POSITIONS = useContent('jobPositions');
  const careersHeader = useContent('careersHeader');
  const CAREER_PERKS = useContent('careerPerks');

  const [activeDepartment, setActiveDepartment] = useState<string>('all');
  const [activeType, setActiveType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedJobIds, setExpandedJobIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (jobId: string) => {
    setExpandedJobIds((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    JOB_POSITIONS.forEach((j) => {
      allExpanded[j.id] = true;
    });
    setExpandedJobIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedJobIds({});
  };

  // Filter logic
  const filteredJobs = JOB_POSITIONS.filter((job) => {
    const matchesDept = activeDepartment === 'all' || job.department === activeDepartment;
    const matchesType = activeType === 'all' || job.type === activeType;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requirements.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDept && matchesType && matchesSearch;
  });

  const departmentCounts = {
    all: JOB_POSITIONS.length,
    barista: JOB_POSITIONS.filter((j) => j.department === 'barista').length,
    kitchen: JOB_POSITIONS.filter((j) => j.department === 'kitchen').length,
    floor: JOB_POSITIONS.filter((j) => j.department === 'floor').length,
    creative: JOB_POSITIONS.filter((j) => j.department === 'creative').length,
  };

  return (
    <div className="space-y-0">
      {/* Page Header */}
      <PageHeader
        eyebrow={careersHeader.pageEyebrow}
        title={careersHeader.pageTitle}
        description={careersHeader.pageDescription}
        breadcrumbs={[{ label: 'Karir & Lowongan' }]}
        onNavigate={onNavigate}
        bgImage="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1920"
      />

      {/* Why Join Us / Culture & Perks */}
      <section className="py-20 bg-brand-cream border-b border-brand-charcoal/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-charcoal/70 font-semibold block">
              Budaya & Keuntungan Staf
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-light text-brand-charcoal">
              Mengapa Berkarir di Élysée Café?
            </h2>
            <p className="text-xs sm:text-sm text-brand-charcoal/80 font-light leading-relaxed">
              Kami percaya bahwa kualitas setiap cangkir kopi dan hidangan bermula dari tim yang bahagia, dihargai, dan senantiasa berkembang.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAREER_PERKS.map((perk) => (
              <div
                key={perk.id}
                className="p-6 rounded-3xl bg-brand-cream border border-brand-charcoal/15 shadow-xs space-y-3 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-cream text-brand-charcoal border border-brand-charcoal/20 flex items-center justify-center group-hover:bg-brand-charcoal group-hover:text-brand-cream transition-colors">
                  {perk.icon === 'Coffee' && <Coffee className="w-6 h-6" />}
                  {perk.icon === 'GraduationCap' && <GraduationCap className="w-6 h-6" />}
                  {perk.icon === 'Award' && <Award className="w-6 h-6" />}
                  {perk.icon === 'Utensils' && <Utensils className="w-6 h-6" />}
                  {perk.icon === 'ShieldCheck' && <ShieldCheck className="w-6 h-6" />}
                  {perk.icon === 'Heart' && <Heart className="w-6 h-6" />}
                </div>
                <h3 className="font-serif-title text-base font-bold text-brand-charcoal">
                  {perk.title}
                </h3>
                <p className="text-xs text-brand-charcoal/70 font-light leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Job Listings Section */}
      <section id="lowongan" className="py-20 md:py-28 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 space-y-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-charcoal/10">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-brand-charcoal/70 font-semibold block">
                Peluang Tersedia • {JOB_POSITIONS.length} Posisi
              </span>
              <h2 className="font-serif-title text-3xl sm:text-4xl font-light text-brand-charcoal">
                Daftar Posisi & Kualifikasi Lowongan
              </h2>
              <p className="text-xs sm:text-sm text-brand-charcoal/80 font-light max-w-xl">
                Temukan peran yang sesuai dengan minat dan keahlian Anda. Pelamar yang lolos seleksi berkas akan langsung diundang untuk sesi interview & uji keterampilan.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={expandAll}
                className="text-xs text-brand-charcoal hover:underline font-medium px-3 py-1.5 rounded-lg hover:bg-brand-charcoal/5 transition-colors"
              >
                Buka Semua Detail
              </button>
              <span className="text-brand-charcoal/30">|</span>
              <button
                onClick={collapseAll}
                className="text-xs text-brand-charcoal/70 hover:underline font-medium px-3 py-1.5 rounded-lg hover:bg-brand-charcoal/5 transition-colors"
              >
                Tutup Detail
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Department Tabs */}
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setActiveDepartment('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeDepartment === 'all'
                    ? 'bg-brand-charcoal text-brand-cream shadow-xs'
                    : 'bg-brand-cream text-brand-charcoal border border-brand-charcoal/20 hover:bg-brand-charcoal/10'
                }`}
              >
                Semua Departemen
              </button>
              <button
                onClick={() => setActiveDepartment('barista')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeDepartment === 'barista'
                    ? 'bg-brand-charcoal text-brand-cream shadow-xs'
                    : 'bg-brand-cream text-brand-charcoal border border-brand-charcoal/20 hover:bg-brand-charcoal/10'
                }`}
              >
                Barista & Kopi
              </button>
              <button
                onClick={() => setActiveDepartment('kitchen')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeDepartment === 'kitchen'
                    ? 'bg-brand-charcoal text-brand-cream shadow-xs'
                    : 'bg-brand-cream text-brand-charcoal border border-brand-charcoal/20 hover:bg-brand-charcoal/10'
                }`}
              >
                Dapur & Pastry
              </button>
              <button
                onClick={() => setActiveDepartment('floor')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeDepartment === 'floor'
                    ? 'bg-brand-charcoal text-brand-cream shadow-xs'
                    : 'bg-brand-cream text-brand-charcoal border border-brand-charcoal/20 hover:bg-brand-charcoal/10'
                }`}
              >
                Layanan & Floor
              </button>
              <button
                onClick={() => setActiveDepartment('creative')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeDepartment === 'creative'
                    ? 'bg-brand-charcoal text-brand-cream shadow-xs'
                    : 'bg-brand-cream text-brand-charcoal border border-brand-charcoal/20 hover:bg-brand-charcoal/10'
                }`}
              >
                Konten & Kreatif
              </button>
            </div>

            {/* Sub Filters: Search & Job Type */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-brand-charcoal/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari lowongan atau keahlian..."
                  className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal outline-none text-brand-charcoal placeholder:text-brand-charcoal/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-charcoal/60 hover:text-brand-charcoal"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-xs text-brand-charcoal/70 font-medium">Tipe:</span>
                <button
                  onClick={() => setActiveType('all')}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                    activeType === 'all'
                      ? 'bg-brand-charcoal text-brand-cream font-semibold'
                      : 'bg-brand-cream text-brand-charcoal/70 hover:bg-brand-charcoal/10 hover:text-brand-charcoal border border-brand-charcoal/10'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setActiveType('Full-Time')}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                    activeType === 'Full-Time'
                      ? 'bg-brand-charcoal text-brand-cream font-semibold'
                      : 'bg-brand-cream text-brand-charcoal/70 hover:bg-brand-charcoal/10 hover:text-brand-charcoal border border-brand-charcoal/10'
                  }`}
                >
                  Full-Time
                </button>
                <button
                  onClick={() => setActiveType('Part-Time')}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                    activeType === 'Part-Time'
                      ? 'bg-brand-charcoal text-brand-cream font-semibold'
                      : 'bg-brand-cream text-brand-charcoal/70 hover:bg-brand-charcoal/10 hover:text-brand-charcoal border border-brand-charcoal/10'
                  }`}
                >
                  Part-Time
                </button>
              </div>
            </div>
          </div>

          {/* Job Cards */}
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-brand-cream rounded-3xl border border-brand-charcoal/15 space-y-3">
              <Briefcase className="w-10 h-10 text-brand-charcoal/40 mx-auto" />
              <h3 className="font-serif-title text-lg font-bold text-brand-charcoal">
                Tidak Ada Posisi yang Sesuai
              </h3>
              <p className="text-xs text-brand-charcoal/60 max-w-sm mx-auto">
                Coba sesuaikan kata kunci pencarian atau pilih filter departemen lain.
              </p>
              <button
                onClick={() => {
                  setActiveDepartment('all');
                  setActiveType('all');
                  setSearchQuery('');
                }}
                className="text-xs text-brand-charcoal font-semibold underline mt-2"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job) => {
                const isExpanded = Boolean(expandedJobIds[job.id]);

                return (
                  <div
                    key={job.id}
                    className="rounded-3xl bg-brand-cream border border-brand-charcoal/15 shadow-xs hover:border-brand-charcoal/40 hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* Main Card Summary */}
                    <div className="p-6 sm:p-8 space-y-5">
                      {/* Job Metadata */}
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-brand-charcoal/60">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-semibold text-brand-charcoal">
                            {job.department === 'barista' && 'Barista & Kopi'}
                            {job.department === 'kitchen' && 'Kitchen & Pastry'}
                            {job.department === 'floor' && 'Hospitality & Floor'}
                            {job.department === 'creative' && 'Media & Kreatif'}
                          </span>
                          <span>•</span>
                          <span>{job.type}</span>
                          {job.urgent && (
                            <>
                              <span>•</span>
                              <span className="text-brand-charcoal font-semibold">Urgent Hiring</span>
                            </>
                          )}
                        </div>

                        <span className="font-mono font-semibold text-brand-charcoal">
                          {job.salaryRange}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-2">
                        <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-brand-charcoal">
                          {job.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-brand-charcoal/70 font-light leading-relaxed">
                          {job.shortDescription}
                        </p>
                      </div>

                      {/* Specs Row */}
                      <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-brand-charcoal/60 pt-1">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-brand-charcoal" />
                          <span>{job.location}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-brand-charcoal" />
                          <span>{job.experience}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Coffee className="w-3.5 h-3.5 text-brand-charcoal" />
                          <span>Free Coffee Specialty Daily</span>
                        </span>
                      </div>

                      {/* Expanded Section (Responsibilities & Requirements) */}
                      {isExpanded && (
                        <div className="pt-6 mt-6 border-t border-brand-charcoal/15 space-y-6 animate-in slide-in-from-top-2 duration-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Responsibilities */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-brand-charcoal" />
                                <span>Tanggung Jawab Utama (Job Descriptions)</span>
                              </h4>
                              <ul className="space-y-2 text-xs text-brand-charcoal/70 font-light">
                                {job.responsibilities.map((resp, i) => (
                                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-charcoal shrink-0 mt-1.5"></span>
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Requirements */}
                            <div className="space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-brand-charcoal" />
                                <span>Persyaratan & Kualifikasi (Requirements)</span>
                              </h4>
                              <ul className="space-y-2 text-xs text-brand-charcoal/70 font-light">
                                {job.requirements.map((req, i) => (
                                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-charcoal shrink-0 mt-1.5"></span>
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Benefits Box */}
                          <div className="p-4 rounded-2xl bg-brand-cream border border-brand-charcoal/15 space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                              Fasilitas & Tunjangan Posisi Ini:
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-brand-charcoal/70">
                              {job.benefits.map((b, i) => (
                                <span key={i} className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-charcoal shrink-0" />
                                  <span>{b}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Card Footer Actions */}
                      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-charcoal/15">
                        <button
                          type="button"
                          onClick={() => toggleExpand(job.id)}
                          className="text-xs font-medium text-brand-charcoal hover:underline flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                        >
                          {isExpanded ? (
                            <>
                              <span>Sembunyikan Syarat & Kualifikasi</span>
                              <ChevronUp className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              <span>Lihat Syarat & Kualifikasi Lengkap</span>
                              <ChevronDown className="w-4 h-4" />
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <a
                            href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Halo%20Élysée,%20saya%20tertarik%20bertanya%20tentang%20posisi%20*${encodeURIComponent(
                              job.title
                            )}*.%20Apakah%20lowongan%20ini%20masih%20terbuka?`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full border border-brand-charcoal/30 text-xs font-semibold text-brand-charcoal hover:bg-brand-charcoal/5 transition-colors text-center"
                          >
                            Tanya HR via WA
                          </a>

                          <button
                            type="button"
                            onClick={() => onOpenApplyModal(job)}
                            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-brand-charcoal text-brand-cream hover:bg-black text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all"
                          >
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>Lamar Sekarang</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Hiring Roadmap Section */}
      <section className="py-20 bg-brand-charcoal text-brand-cream border-t border-brand-cream/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-brand-cream/70 font-semibold block">
              Alur Rekrutmen Transparan
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-light text-brand-cream">
              4 Langkah Menjadi Bagian Dari Kami
            </h2>
            <p className="text-xs sm:text-sm text-brand-cream/80 font-light">
              Proses seleksi kami dirancang transparan, cepat, dan mengedepankan keramahan serta uji keterampilan nyata.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-brand-cream/5 border border-brand-cream/15 space-y-3 relative">
              <div className="w-10 h-10 rounded-2xl bg-brand-cream/15 text-brand-cream flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-serif-title text-base font-bold text-brand-cream">
                Kirim Berkas Online
              </h3>
              <p className="text-xs text-brand-cream/70 font-light leading-relaxed">
                Isi formulir aplikasi online dengan melampirkan CV dan portofolio keahlian Anda.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-brand-cream/5 border border-brand-cream/15 space-y-3 relative">
              <div className="w-10 h-10 rounded-2xl bg-brand-cream/15 text-brand-cream flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-serif-title text-base font-bold text-brand-cream">
                Seleksi & Review Cepat
              </h3>
              <p className="text-xs text-brand-cream/70 font-light leading-relaxed">
                Tim HR memeriksa berkas Anda dalam waktu 1–2 hari kerja dan mengirimkan undangan via WhatsApp.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-brand-cream/5 border border-brand-cream/15 space-y-3 relative">
              <div className="w-10 h-10 rounded-2xl bg-brand-cream/15 text-brand-cream flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-serif-title text-base font-bold text-brand-cream">
                Interview & Skill Trial
              </h3>
              <p className="text-xs text-brand-cream/70 font-light leading-relaxed">
                Percakapan santai di kafe Senopati serta sesi demo seduhan kopi atau cooking trial bersama Head Chef.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-brand-cream/5 border border-brand-cream/15 space-y-3 relative">
              <div className="w-10 h-10 rounded-2xl bg-brand-cream/15 text-brand-cream flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="font-serif-title text-base font-bold text-brand-cream">
                Penawaran & Onboarding
              </h3>
              <p className="text-xs text-brand-cream/70 font-light leading-relaxed">
                Penandatanganan kontrak kerja resmi, pengenalan seragam, dan program mentoring intensif.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Applications Tracker (If user has submitted any applications) */}
      {applications.length > 0 && (
        <section className="py-16 bg-brand-cream border-b border-brand-charcoal/10">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-charcoal/70 font-bold block">
                  Riwayat Pengajuan Lamaran Anda
                </span>
                <h3 className="font-serif-title text-xl font-bold text-brand-charcoal">
                  Lamaran yang Telah Terkirim ({applications.length})
                </h3>
              </div>
              <span className="text-xs text-brand-charcoal/60">Tersimpan di sesi ini</span>
            </div>

            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-brand-cream border border-brand-charcoal/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-charcoal">
                        {app.id}
                      </span>
                      <span className="text-xs text-brand-charcoal font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Sedang Ditinjau Tim HR
                      </span>
                    </div>
                    <h4 className="font-serif-title text-base font-bold text-brand-charcoal">
                      {app.positionTitle} ({app.jobType})
                    </h4>
                    <p className="text-xs text-brand-charcoal/70">
                      Pelamar: <strong>{app.fullName}</strong> • Dikirim pada {app.submittedAt}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Halo%20HR%20Élysée,%20saya%20ingin%20menanyakan%20status%20lamaran%20kerja%20saya%20dengan%20ID%20*${app.id}*%20untuk%20posisi%20*${encodeURIComponent(
                      app.positionTitle
                    )}*.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-brand-charcoal text-brand-cream hover:bg-black text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Follow-Up via WA</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* General Open Application & Inquiries */}
      <section className="py-16 bg-brand-cream border-t border-brand-charcoal/10">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-brand-cream border border-brand-charcoal/15 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs uppercase tracking-widest text-brand-charcoal/70 font-bold">
                Spontaneous Application
              </span>
              <h3 className="font-serif-title text-2xl font-bold text-brand-charcoal">
                Belum Menemukan Posisi yang Tepat?
              </h3>
              <p className="text-xs sm:text-sm text-brand-charcoal/80 font-light max-w-lg leading-relaxed">
                Kami selalu tertarik berkolaborasi dengan talenta unik. Kirimkan surat pengantar dan CV terbuka Anda langsung ke email rekrutmen kami.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href={`mailto:${CAFE_INFO.email}?subject=Lamaran%20Kerja%20Terbuka%20-%20Élysée%20Bistro&body=Halo%20Tim%20Rekrutmen%20Élysée,%0A%0ASaya%20tertarik%20mengajukan%20CV%20terbuka%20untuk%20bekerja%20di%20Élysée%20Café%20%26%20Bistro.%0ANama:%20%0ANomor%20HP/WA:%20%0APosisi%20yang%20diminati:%20`}
                className="px-6 py-3 rounded-full bg-brand-charcoal text-brand-cream hover:bg-black text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-cream" />
                <span>Kirim Email ke HRD</span>
              </a>

              <a
                href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Halo%20HRD%20Élysée,%20saya%20ingin%20mengajukan%20CV%20terbuka.`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-brand-cream text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-charcoal" />
                <span>Chat Rekrutmen WA</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

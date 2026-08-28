import React, { useState, useEffect } from 'react';
import {
  X,
  Briefcase,
  UploadCloud,
  CheckCircle2,
  FileText,
  Trash2,
  ArrowRight,
  Phone,
  Mail,
  User,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { JobPosition, JobApplication } from '../../types';
import { CAFE_INFO } from '../../data/mockData';

interface ApplyJobModalProps {
  job: JobPosition | null;
  allJobs: JobPosition[];
  isOpen: boolean;
  onClose: () => void;
  onSubmitApplication: (app: JobApplication) => void;
}

export const ApplyJobModal: React.FC<ApplyJobModalProps> = ({
  job,
  allJobs,
  isOpen,
  onClose,
  onSubmitApplication,
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(job ? job.id : allJobs[0]?.id || '');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobType, setJobType] = useState<'Full-Time' | 'Part-Time'>('Full-Time');
  const [experienceYears, setExperienceYears] = useState('1-2 Tahun');
  const [currentStatus, setCurrentStatus] = useState('Siap Bergabung Segera');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<JobApplication | null>(null);

  // Sync selected job when prop changes
  useEffect(() => {
    if (job) {
      setSelectedJobId(job.id);
      setJobType(job.type === 'Part-Time' ? 'Part-Time' : 'Full-Time');
    }
  }, [job]);

  // Reset or initialize state
  useEffect(() => {
    if (isOpen && !submittedApp) {
      // keep form intact or reset if previously finished
    }
  }, [isOpen, submittedApp]);

  if (!isOpen) return null;

  const currentJob = allJobs.find((j) => j.id === selectedJobId) || job || allJobs[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setFileSize(`${sizeInMB} MB`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setFileSize(`${sizeInMB} MB`);
    }
  };

  const handleRemoveFile = () => {
    setFileName('');
    setFileSize('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const appId = `ELY-HR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newApp: JobApplication = {
        id: appId,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        positionId: currentJob.id,
        positionTitle: currentJob.title,
        jobType,
        experienceYears,
        currentStatus,
        portfolioLink: portfolioLink.trim() || undefined,
        fileName: fileName || 'CV_Curriculum_Vitae.pdf',
        fileSize: fileSize || '1.4 MB',
        coverNote: coverNote.trim() || undefined,
        submittedAt: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'review',
      };

      onSubmitApplication(newApp);
      setSubmittedApp(newApp);
      setIsSubmitting(false);
    }, 600);
  };

  const handleResetAndClose = () => {
    setSubmittedApp(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setFileName('');
    setFileSize('');
    setCoverNote('');
    setPortfolioLink('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-brand-cream w-full max-w-2xl rounded-3xl shadow-2xl border border-brand-charcoal/20 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand-charcoal text-brand-cream px-6 py-5 flex items-center justify-between border-b border-brand-cream/15 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-cream/10 text-brand-cream flex items-center justify-center border border-brand-cream/15">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-brand-cream/70">
                  Formulir Rekrutmen Resmi
                </span>
                <span className="text-[10px] bg-brand-cream/15 text-brand-cream px-2 py-0.5 rounded-full font-medium">
                  Lowongan Aktif
                </span>
              </div>
              <h3 className="font-serif-title text-lg sm:text-xl font-bold text-brand-cream leading-tight">
                {submittedApp ? 'Lamaran Berhasil Terkirim' : 'Lamar Pekerjaan di Élysée'}
              </h3>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            aria-label="Tutup Form Lamaran"
            className="w-8 h-8 rounded-full bg-brand-cream/10 hover:bg-brand-cream/20 text-brand-cream/70 hover:text-brand-cream flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {submittedApp ? (
            /* Success View */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-3xl bg-brand-cream border border-brand-charcoal/20 text-brand-charcoal flex items-center justify-center mx-auto shadow-xs animate-in zoom-in-75">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <span className="text-xs uppercase tracking-widest font-semibold text-brand-charcoal block">
                  Aplikasi Diterima
                </span>
                <h4 className="font-serif-title text-2xl font-bold text-brand-charcoal">
                  Terima Kasih, {submittedApp.fullName}!
                </h4>
                <p className="text-xs sm:text-sm text-brand-charcoal/80 font-light leading-relaxed">
                  Berkas lamaran Anda untuk posisi <strong>{submittedApp.positionTitle}</strong> telah tercatat di sistem rekrutmen Élysée Café & Bistro Senopati.
                </p>
              </div>

              {/* Application Details Summary Card */}
              <div className="p-5 rounded-2xl bg-brand-cream border border-brand-charcoal/15 text-left space-y-3 max-w-lg mx-auto">
                <div className="flex items-center justify-between pb-3 border-b border-brand-charcoal/10">
                  <span className="text-xs text-brand-charcoal/60">ID Registrasi Lamaran:</span>
                  <span className="text-xs font-mono font-bold text-brand-charcoal px-2.5 py-1 rounded-lg bg-brand-cream border border-brand-charcoal/20">
                    {submittedApp.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-brand-charcoal/60 block">Posisi:</span>
                    <span className="font-medium text-brand-charcoal">{submittedApp.positionTitle}</span>
                  </div>
                  <div>
                    <span className="text-brand-charcoal/60 block">Tipe & Pengalaman:</span>
                    <span className="font-medium text-brand-charcoal">
                      {submittedApp.jobType} • {submittedApp.experienceYears}
                    </span>
                  </div>
                  <div>
                    <span className="text-brand-charcoal/60 block">Status Lamaran:</span>
                    <span className="inline-flex items-center gap-1 font-medium text-brand-charcoal bg-brand-charcoal/10 px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3" /> Sedang Ditinjau Tim HR
                    </span>
                  </div>
                  <div>
                    <span className="text-brand-charcoal/60 block">Waktu Submit:</span>
                    <span className="text-brand-charcoal">{submittedApp.submittedAt}</span>
                  </div>
                </div>

                {submittedApp.fileName && (
                  <div className="pt-2 border-t border-brand-charcoal/10 flex items-center justify-between text-xs text-brand-charcoal/80">
                    <span className="flex items-center gap-1.5 truncate">
                      <FileText className="w-3.5 h-3.5 text-brand-charcoal" />
                      {submittedApp.fileName} ({submittedApp.fileSize})
                    </span>
                    <span className="text-[11px] text-brand-charcoal font-medium">Tersimpan</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${CAFE_INFO.whatsappNumber}?text=Halo%20Tim%20HR%20Élysée,%20saya%20telah%20mengirimkan%20lamaran%20kerja%20untuk%20posisi%20*${encodeURIComponent(
                    submittedApp.positionTitle
                  )}*%20dengan%20ID%20*${submittedApp.id}*%20atas%20nama%20*${encodeURIComponent(
                    submittedApp.fullName
                  )}*.%20Mohon%20info%20tahapan%20selanjutnya.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-charcoal text-brand-cream hover:bg-black text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all border border-brand-cream/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>Konfirmasi HRD via WhatsApp</span>
                </a>

                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-charcoal text-brand-cream hover:bg-black text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <span>Tutup & Selesai</span>
                </button>
              </div>

              <p className="text-[11px] text-brand-charcoal/70 italic">
                *Tim HR Élysée akan menghubungi Anda via WhatsApp atau Email dalam 1–2 hari kerja untuk jadwal interview.
              </p>
            </div>
          ) : (
            /* Form View */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Position selector */}
              <div className="p-4 rounded-2xl bg-brand-cream border border-brand-charcoal/15 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-brand-charcoal" />
                    <span>Pilih Posisi Lowongan</span>
                  </label>
                  <span className="text-[11px] text-brand-charcoal font-medium">
                    {currentJob.salaryRange}
                  </span>
                </div>

                <select
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal outline-none text-brand-charcoal"
                >
                  {allJobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} ({j.type}) — {j.location}
                    </option>
                  ))}
                </select>

                <p className="text-[11px] text-brand-charcoal/70 font-light">
                  {currentJob.shortDescription}
                </p>
              </div>

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-charcoal flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-brand-charcoal/70" />
                    <span>Nama Lengkap *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal text-brand-charcoal placeholder:text-brand-charcoal/40 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-charcoal flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-brand-charcoal/70" />
                    <span>Nomor WhatsApp Aktif *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal text-brand-charcoal placeholder:text-brand-charcoal/40 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-charcoal flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-brand-charcoal/70" />
                    <span>Alamat Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@anda.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal text-brand-charcoal placeholder:text-brand-charcoal/40 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-charcoal flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-charcoal/70" />
                    <span>Pengalaman Terkait</span>
                  </label>
                  <select
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal text-brand-charcoal outline-none"
                  >
                    <option value="Fresh Graduate / Belum Ada Pengalaman">Fresh Graduate / Pemula</option>
                    <option value="Kurang dari 1 Tahun">&lt; 1 Tahun Pengalaman</option>
                    <option value="1-2 Tahun">1 – 2 Tahun Pengalaman</option>
                    <option value="3-5 Tahun">3 – 5 Tahun Pengalaman</option>
                    <option value="Lebih dari 5 Tahun">&gt; 5 Tahun (Senior)</option>
                  </select>
                </div>
              </div>

              {/* Status & Work Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-charcoal">
                    Tipe Pekerjaan yang Diinginkan
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setJobType('Full-Time')}
                      className={`flex-1 py-2 text-xs rounded-xl border transition-all ${
                        jobType === 'Full-Time'
                          ? 'bg-brand-charcoal text-brand-cream border-brand-charcoal font-semibold'
                          : 'bg-brand-cream text-brand-charcoal/70 border-brand-charcoal/20 hover:bg-brand-charcoal/5'
                      }`}
                    >
                      Full-Time
                    </button>
                    <button
                      type="button"
                      onClick={() => setJobType('Part-Time')}
                      className={`flex-1 py-2 text-xs rounded-xl border transition-all ${
                        jobType === 'Part-Time'
                          ? 'bg-brand-charcoal text-brand-cream border-brand-charcoal font-semibold'
                          : 'bg-brand-cream text-brand-charcoal/70 border-brand-charcoal/20 hover:bg-brand-charcoal/5'
                      }`}
                    >
                      Part-Time
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brand-charcoal">
                    Ketersediaan Mulai Bekerja
                  </label>
                  <select
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal text-brand-charcoal outline-none"
                  >
                    <option value="Siap Bergabung Segera">Siap Bergabung Segera (Immediately)</option>
                    <option value="1 Minggu Setelah Diterima">1 Minggu Setelah Diterima</option>
                    <option value="1 Bulan (Notice Period)">1 Bulan (Masih bekerja / Notice period)</option>
                    <option value="Mahasiswa Aktif (Jadwal Menyesuaikan)">Mahasiswa (Jadwal Menyesuaikan)</option>
                  </select>
                </div>
              </div>

              {/* Portfolio Link (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-charcoal flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5 text-brand-charcoal/70" />
                    <span>Link Portofolio / LinkedIn / Akun Instagram (Opsional)</span>
                  </span>
                  <span className="text-[11px] text-brand-charcoal/60 font-light">Membantu proses kurasi</span>
                </label>
                <input
                  type="url"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  placeholder="https://linkedin.com/in/... atau link Google Drive"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal text-brand-charcoal placeholder:text-brand-charcoal/40 outline-none"
                />
              </div>

              {/* CV File Upload Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-charcoal flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-brand-charcoal/70" />
                    <span>Unggah CV / Resume (PDF / DOC / DOCX) *</span>
                  </span>
                  <span className="text-[11px] text-brand-charcoal/60 font-light">Maksimal 10MB</span>
                </label>

                {fileName ? (
                  <div className="p-3.5 rounded-2xl bg-brand-cream border border-brand-charcoal/20 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-brand-charcoal text-brand-cream flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-brand-charcoal truncate">
                          {fileName}
                        </p>
                        <p className="text-[11px] text-brand-charcoal/70">
                          {fileSize} • Siap diunggah
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1.5 text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-brand-charcoal/10 rounded-lg transition-colors"
                      aria-label="Hapus file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-brand-charcoal bg-brand-charcoal/5'
                        : 'border-brand-charcoal/30 hover:border-brand-charcoal bg-brand-cream'
                    }`}
                  >
                    <input
                      type="file"
                      id="cvFileInput"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-2xl bg-brand-cream text-brand-charcoal border border-brand-charcoal/20 flex items-center justify-center mx-auto">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-brand-charcoal">
                          Tarik & lepas file CV ke sini, atau{' '}
                          <span className="text-brand-charcoal underline">klik untuk memilih</span>
                        </p>
                        <p className="text-[11px] text-brand-charcoal/60 mt-0.5">
                          Format: PDF, Word (DOCX) disarankan
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cover Note / Motivation */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-charcoal">
                  Ceritakan Singkat Mengapa Anda Tertarik Bergabung di Élysée
                </label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Ceritakan motivasi, pengalaman paling berkesan, atau antusiasme Anda di dunia kopi/kuliner..."
                  className="w-full text-xs p-3 rounded-xl bg-brand-cream border border-brand-charcoal/20 focus:border-brand-charcoal text-brand-charcoal placeholder:text-brand-charcoal/40 outline-none resize-none"
                />
              </div>

              {/* Data Safety Note */}
              <div className="p-3 rounded-xl bg-brand-cream border border-brand-charcoal/15 text-[11px] text-brand-charcoal/70 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-charcoal shrink-0 mt-0.5" />
                <span>
                  Data pribadi Anda bersifat rahasia dan hanya digunakan oleh tim manajemen rekrutmen Élysée Café & Bistro.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-brand-charcoal/10">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 rounded-full border border-brand-charcoal/30 text-xs font-medium text-brand-charcoal hover:bg-brand-charcoal/5 transition-colors"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-2.5 rounded-full bg-brand-charcoal text-brand-cream hover:bg-black text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-brand-cream border-t-transparent rounded-full animate-spin"></span>
                      <span>Mengirim Berkas...</span>
                    </>
                  ) : (
                    <>
                      <span>Kirim Lamaran Sekarang</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

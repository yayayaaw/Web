// Taruh file ini di: src/admin/components/ImagePicker.tsx
import React, { useRef } from 'react';

interface ImagePickerProps {
  label: string;
  value: string;
  onChange: (dataUrl: string) => void;
  aspectRatio?: string;
}

export function ImagePicker({ label, value, onChange, aspectRatio = '16/9' }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = ''; // biar bisa pilih file yang sama lagi kalau perlu
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation(); // jangan ikut trigger buka file picker
    onChange('');
  }

  return (
    <div>
      <label className="block font-semibold mb-1 text-xs">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        style={{ aspectRatio }}
        className="w-full max-w-[220px] mx-auto rounded-xl border-2 border-dashed border-[#E6DEC8] bg-[#FDFBF7] flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#6F4E37] transition-colors relative group"
      >
        {value ? (
          <img src={value} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-gray-400 p-4">
            <i className="fa-solid fa-image text-2xl mb-2"></i>
            <p className="text-[11px]">Tap untuk pilih foto dari galeri</p>
          </div>
        )}
        {value && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white text-xs font-semibold">Ganti Foto</span>
          </div>
        )}
        {value && (
          <button
            type="button"
            onClick={handleRemove}
            title="Hapus foto (pakai foto asli)"
            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center text-xs hover:bg-red-600 z-10"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

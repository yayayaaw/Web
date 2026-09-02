// Taruh file ini di: src/admin/components/PriceInput.tsx
//
// Input harga yang AMAN dari bug titik-ribuan. Sebelumnya pakai <input type="number">
// yang membaca "21.000" sebagai angka desimal 21 (titik dianggap koma desimal oleh
// browser), bukan 21 ribu. Sekarang pakai teks biasa + auto-format titik ribuan,
// tapi nilai aslinya selalu disimpan sebagai angka bersih (tanpa titik).
import React from 'react';

interface PriceInputProps {
  value: number | '';
  onChange: (value: number) => void;
  className?: string;
  placeholder?: string;
}

export function PriceInput({ value, onChange, className, placeholder }: PriceInputProps) {
  const displayValue = value === '' || value === undefined ? '' : Number(value).toLocaleString('id-ID');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, '');
    onChange(digitsOnly ? Number(digitsOnly) : 0);
  }

  return (
    <input
      type="text"
      inputMode="numeric"
      className={className}
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
    />
  );
}

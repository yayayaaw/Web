import { CAFE_INFO } from '../data/mockData';
import { CartItem, ReservationData } from '../types';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount).replace('IDR', 'Rp');
}

export function createWhatsAppUrl(text: string, phone: string = CAFE_INFO.whatsappNumber): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function generateItemOrderWhatsApp(itemName: string, price: number): string {
  const message = `Halo ${CAFE_INFO.name} Café & Bistro,\n\nSaya ingin memesan menu:\n- *${itemName}* (${formatRupiah(price)})\n\nMohon info ketersediaannya. Terima kasih!`;
  return createWhatsAppUrl(message);
}

export function generateCartWhatsApp(items: CartItem[], orderType: 'dine-in' | 'takeaway', tableOrTime: string, notes?: string): string {
  const subtotal = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const itemsText = items
    .map(i => `• ${i.quantity}x ${i.item.name} (${formatRupiah(i.item.price * i.quantity)})${i.notes ? ` [Catatan: ${i.notes}]` : ''}`)
    .join('\n');

  const message = `Halo ${CAFE_INFO.name} Café & Bistro,\n\nSaya ingin memesan menu berikut:\n${itemsText}\n\n*Total:* ${formatRupiah(subtotal)}\n*Tipe:* ${orderType === 'dine-in' ? `Dine-In (Meja ${tableOrTime || '-'})` : `Takeaway (Estimasi Jam: ${tableOrTime || '-'})`}\n${notes ? `*Catatan Tambahan:* ${notes}\n` : ''}\nMohon konfirmasi pesanan saya. Terima kasih!`;

  return createWhatsAppUrl(message);
}

export function generateReservationWhatsApp(res: ReservationData): string {
  const message = `Halo ${CAFE_INFO.name} Café & Bistro, saya ingin melakukan reservasi tempat:\n\n` +
    `*Nama:* ${res.name}\n` +
    `*No. WA:* ${res.phone}\n` +
    (res.email ? `*Email:* ${res.email}\n` : '') +
    `*Tanggal:* ${res.date}\n` +
    `*Jam:* ${res.time} WIB\n` +
    `*Jumlah Tamu:* ${res.guests}\n` +
    `*Pilihan Area:* ${res.area}\n` +
    `*Catatan Khusus:* ${res.notes || '-'}`;

  return createWhatsAppUrl(message);
}

export function generateTicketWhatsApp(eventTitle: string, name: string, phone: string, qty: number, total: number): string {
  const message = `Halo ${CAFE_INFO.name} Café & Bistro,\n\nSaya ingin memesan tiket acara eksklusif:\n` +
    `*Acara:* ${eventTitle}\n` +
    `*Nama Pemesan:* ${name}\n` +
    `*No. WhatsApp:* ${phone}\n` +
    `*Jumlah Tiket:* ${qty} Pax\n` +
    `*Total Tagihan:* ${formatRupiah(total)}\n\n` +
    `Mohon petunjuk instruksi pembayaran & e-ticket seat saya. Terima kasih!`;

  return createWhatsAppUrl(message);
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      textArea.remove();
      return Promise.resolve(true);
    } catch {
      textArea.remove();
      return Promise.resolve(false);
    }
  }
}

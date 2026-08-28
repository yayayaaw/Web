import React from 'react';
import { Heart, Instagram, ExternalLink } from 'lucide-react';
import { INSTAGRAM_POSTS, CAFE_INFO } from '../data/mockData';

export const SocialShowcase: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-ivory border-t border-b border-brand-cream/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 mb-8 text-center space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-brown font-semibold block">
          #ElyseeMoments
        </span>
        <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-brand-charcoal">
          Cerita Hangat dari Pengunjung Kami
        </h2>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Bagikan momen santai Anda dan tag <strong>@{CAFE_INFO.instagram}</strong> untuk kesempatan tampil di feed kurasi kami.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 px-4 sm:px-8 max-w-7xl mx-auto">
        {INSTAGRAM_POSTS.map((post) => (
          <a
            key={post.id}
            href={`https://instagram.com/${CAFE_INFO.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg transition-all"
          >
            <img
              src={post.image}
              alt={post.tag}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-brand-cream space-y-1.5 p-3 text-center">
              <Instagram className="w-5 h-5 text-brand-beige mb-1" />
              <div className="flex items-center gap-1 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-brand-cream text-brand-cream" />
                <span>{post.likes}</span>
              </div>
              <span className="text-[10px] text-brand-cream/80 font-mono">
                {post.tag}
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center mt-8">
        <a
          href={`https://instagram.com/${CAFE_INFO.instagram}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-brown hover:text-brand-darkBrown border-b border-brand-brown pb-1 transition-colors"
        >
          <Instagram className="w-4 h-4" /> Ikuti @{CAFE_INFO.instagram} di Instagram
        </a>
      </div>
    </section>
  );
};

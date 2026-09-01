import React from 'react';
import { useContent } from '../lib/contentStore';

export const WelcomeSection: React.FC = () => {
  const welcome = useContent('welcome');

  return (
    <section className="py-16 md:py-20 bg-brand-ivory relative">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center space-y-4">
        <span className="text-[11px] uppercase tracking-[0.3em] text-brand-charcoal/70 font-semibold block">
          {welcome.eyebrow}
        </span>
        <h2 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-light text-brand-charcoal leading-snug">
          {welcome.title}
        </h2>
        <p className="text-sm text-gray-500 font-light leading-relaxed">
          {welcome.paragraph}
        </p>
      </div>
    </section>
  );
};

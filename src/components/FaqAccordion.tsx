"use client";

import { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";
import { HOME_FAQS } from "@/data/blog";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto divide-y divide-white/20">
      {HOME_FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={faq.question} className="py-5">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-4 text-left group"
            >
              <span className="font-heading text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                {faq.question}
              </span>
              {isOpen ? (
                <MinusCircle className="w-5 h-5 text-white/80 shrink-0" />
              ) : (
                <PlusCircle className="w-5 h-5 text-white/80 shrink-0" />
              )}
            </button>

            {isOpen && (
              <div className="mt-4 pl-2 pr-6 text-xs sm:text-sm text-white/90 space-y-2.5 animate-in fade-in duration-150">
                <p className="font-bold text-white">{faq.intro}</p>
                <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                  {faq.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}


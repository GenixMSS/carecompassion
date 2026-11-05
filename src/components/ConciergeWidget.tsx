"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquareHeart,
  X,
  Phone,
  Calendar,
  Send,
  CheckCircle2,
  Stethoscope,
} from "lucide-react";

export function ConciergeWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"chat" | "schedule">("chat");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  const handleQuickSend = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        overallService: tab === "schedule" ? "Clinical Assessment Booking" : "Live Concierge Chat",
        message: text,
      }),
    });
    setSent(true);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50">
      {open ? (
        <div className="w-[calc(100vw-2rem)] max-w-[380px] rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-genix-navy text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-genix-crimson flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-white">
                  Genix Care Concierge
                </p>
                <p className="text-[11px] text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>24/7 Clinical Support Online</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
              aria-label="Close Concierge"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 border-b border-slate-100 bg-slate-50 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setTab("chat");
                setSent(false);
              }}
              className={`py-2.5 text-center border-b-2 transition-colors ${
                tab === "chat"
                  ? "border-genix-crimson text-genix-navy bg-white"
                  : "border-transparent text-slate-500 hover:text-genix-navy"
              }`}
            >
              Instant Care Message
            </button>
            <button
              type="button"
              onClick={() => {
                setTab("schedule");
                setSent(false);
              }}
              className={`py-2.5 text-center border-b-2 transition-colors ${
                tab === "schedule"
                  ? "border-genix-crimson text-genix-navy bg-white"
                  : "border-transparent text-slate-500 hover:text-genix-navy"
              }`}
            >
              Book Assessment
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            {sent ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="font-heading font-bold text-base text-genix-navy">
                  We&apos;ve Got Your Request!
                </p>
                <p className="text-xs text-slate-600">
                  A Genix Care Coordinator will call or text you at{" "}
                  <span className="font-bold">{phone}</span> within 15 minutes.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setText("");
                  }}
                  className="text-xs font-bold text-genix-crimson underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickSend} className="space-y-3">
                <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 leading-relaxed border border-slate-100">
                  {tab === "chat"
                    ? "Hi! Looking for in-home daily care, memory support, or urgent facility staffing? Leave your number and a Care Coordinator will connect right away."
                    : "Schedule a complimentary Comprehensive Clinical Assessment (in-home or virtual) with our nursing director."}
                </div>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Name *"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-genix-navy focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number (for callback/SMS) *"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-genix-navy focus:outline-none"
                />
                <textarea
                  rows={2}
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={
                    tab === "chat"
                      ? "How can our care team help your family or facility?"
                      : "Preferred date/time & city in Metro Atlanta..."
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-genix-navy focus:outline-none"
                />

                <button
                  type="submit"
                  className="w-full rounded-lg bg-genix-navy hover:bg-genix-crimson text-white py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  {tab === "chat" ? (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Connect With Care Team</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Request Assessment Slot</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <a
                href="tel:3344972713"
                className="inline-flex items-center gap-1 font-bold text-genix-navy hover:text-genix-crimson"
              >
                <Phone className="w-3 h-3 text-genix-crimson" />
                <span>Call (334) 497-2713</span>
              </a>
              <Link
                href="/portal"
                onClick={() => setOpen(false)}
                className="font-semibold text-genix-blue hover:underline"
              >
                Open Care Portal →
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 rounded-full bg-genix-navy hover:bg-genix-crimson text-white pl-4 pr-5 py-3.5 shadow-2xl border border-white/20 transition-all duration-200 hover:scale-105"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-genix-crimson group-hover:bg-white group-hover:text-genix-crimson transition-colors">
            <MessageSquareHeart className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-genix-navy" />
          </span>
          <div className="text-left">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-amber-300 leading-none">
              24/7 Care Support
            </span>
            <span className="block font-heading text-xs font-bold text-white mt-0.5">
              Chat or Book Assessment
            </span>
          </div>
        </button>
      )}
    </div>
  );
}


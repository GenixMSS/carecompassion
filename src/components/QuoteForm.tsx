"use client";

import { useState, useEffect } from "react";
import { ArrowRightCircle, CheckCircle2, Calendar, Clock } from "lucide-react";
import { SERVICE_PILLARS } from "@/data/services";

interface QuoteFormProps {
  defaultCategory?: string;
  defaultSubService?: string;
  title?: string;
  compact?: boolean;
}

export function QuoteForm({
  defaultCategory = "",
  defaultSubService = "",
  title = "Contact Us",
  compact = false,
}: QuoteFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [overallService, setOverallService] = useState(defaultCategory);
  const [specificService, setSpecificService] = useState(defaultSubService);
  const [visitDate, setVisitDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  useEffect(() => {
    if (defaultCategory) setOverallService(defaultCategory);
    if (defaultSubService) setSpecificService(defaultSubService);
  }, [defaultCategory, defaultSubService]);

  const currentPillar = SERVICE_PILLARS.find(
    (p) => p.slug === overallService || p.title === overallService
  );

  const availableSubServices = currentPillar
    ? currentPillar.subServices
    : SERVICE_PILLARS.flatMap((p) => p.subServices);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          overallService,
          specificService,
          visitDate,
          timeSlot,
          message,
        }),
      });
      const data = await res.json();
      setReferenceId(data.referenceId || "GNX-" + Math.floor(100000 + Math.random() * 900000));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-slate-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-genix-navy">
          Consultation Request Received
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-bold text-genix-navy">{name}</span>. A Genix
          Clinical Care Coordinator has been assigned to your inquiry (Reference{" "}
          <span className="font-mono font-bold text-genix-crimson">{referenceId}</span>)
          and will reach out shortly at <span className="font-bold">{phone}</span>.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setPhone("");
            setMessage("");
          }}
          className="btn-primary mt-2"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {title && (
        <h3 className="font-heading text-base font-bold text-genix-crimson">{title}</h3>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Name <span className="text-genix-crimson">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="YOUR NAME"
            className="w-full border-b border-slate-300 bg-transparent py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-genix-navy focus:outline-none transition-colors"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Phone Number <span className="text-genix-crimson">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(000) 000-0000"
            className="w-full border-b border-slate-300 bg-transparent py-2.5 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-genix-navy focus:outline-none transition-colors"
          />
        </div>

        {/* Overall Services */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Overall Services
          </label>
          <select
            value={overallService}
            onChange={(e) => {
              setOverallService(e.target.value);
              setSpecificService("");
            }}
            className="w-full border-b border-slate-300 bg-transparent py-2.5 text-xs font-bold uppercase tracking-wider text-slate-800 focus:border-genix-navy focus:outline-none transition-colors"
          >
            <option value="">SELECT</option>
            {SERVICE_PILLARS.map((pillar) => (
              <option key={pillar.slug} value={pillar.slug}>
                {pillar.title.toUpperCase()}
              </option>
            ))}
            <option value="facility-staffing">FACILITY MEDICAL STAFFING</option>
          </select>
        </div>

        {/* Specific Services */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Specific Services
          </label>
          <select
            value={specificService}
            onChange={(e) => setSpecificService(e.target.value)}
            className="w-full border-b border-slate-300 bg-transparent py-2.5 text-xs font-bold uppercase tracking-wider text-slate-800 focus:border-genix-navy focus:outline-none transition-colors"
          >
            <option value="">SELECT...</option>
            {availableSubServices.map((sub) => (
              <option key={sub.slug} value={sub.slug}>
                {sub.shortTitle.toUpperCase()}
              </option>
            ))}
            <option value="rn-lpn-cna-staffing">RN / LPN / CNA FACILITY COVERAGE</option>
            <option value="custom-assessment">COMPREHENSIVE CLINICAL ASSESSMENT</option>
          </select>
        </div>

        {/* Preferred Visit Date */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Preferred visit date
          </label>
          <div className="relative">
            <input
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="w-full border-b border-slate-300 bg-transparent py-2.5 text-xs font-bold text-slate-800 focus:border-genix-navy focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Time Slot */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Time slot
          </label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full border-b border-slate-300 bg-transparent py-2.5 text-xs font-bold text-slate-800 focus:border-genix-navy focus:outline-none transition-colors"
          >
            <option value="">-- : -- --</option>
            <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM – 12:00 PM)</option>
            <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM – 4:00 PM)</option>
            <option value="Evening (4:00 PM - 8:00 PM)">Evening (4:00 PM – 8:00 PM)</option>
            <option value="Urgent / Immediate 24-Hr Need">Urgent / Immediate 24-Hr Need</option>
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Email Address (Optional for Confirmation)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yourname@example.com"
            className="w-full border-b border-slate-300 bg-transparent py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-genix-navy focus:outline-none transition-colors"
          />
        </div>
      )}

      {/* Message */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">Message</label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your loved one's care needs or your facility's staffing request..."
          className="w-full border-b border-slate-300 bg-transparent py-2 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-genix-navy focus:outline-none transition-colors resize-y"
        />
      </div>

      <div className="pt-2">
        <button type="submit" disabled={submitting} className="btn-primary">
          <span>{submitting ? "SENDING..." : "SEND"}</span>
          <ArrowRightCircle className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}


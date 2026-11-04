"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FolderLock,
  Loader2,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export interface PortalDocumentRow {
  id: number;
  uploaded_by: string | null;
  portal_scope: "family" | "admin" | "careers";
  category: string;
  title: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  uploader_email: string | null;
  notes: string | null;
  created_at: string;
}

interface PortalDocumentVaultProps {
  portalScope: "family" | "admin";
  userId: string;
  userEmail: string;
  initialDocuments: PortalDocumentRow[];
}

const FAMILY_CATEGORIES = [
  "Physician Orders / Plan of Care",
  "Insurance / Medicaid Authorization",
  "Medical Power of Attorney / Consent",
  "Medication List & Discharge Summary",
  "General Care Document",
];

const ADMIN_CATEGORIES = [
  "Clinical Policy / Staff Protocol",
  "Client Care Plan / Assessment Packet",
  "Clinician Credential / License Verification",
  "Facility Staffing Agreement / Addendum",
  "HR & Onboarding Packet",
];

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function resolveMimeType(file: File): string {
  if (ALLOWED_MIME_TYPES.includes(file.type)) {
    return file.type;
  }
  const lower = file.name.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".doc")) return "application/msword";
  if (lower.endsWith(".docx")) {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  return file.type || "application/octet-stream";
}

function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function PortalDocumentVault({
  portalScope,
  userId,
  userEmail,
  initialDocuments,
}: PortalDocumentVaultProps) {
  const router = useRouter();
  const categories =
    portalScope === "family" ? FAMILY_CATEGORIES : ADMIN_CATEGORIES;

  const [documents, setDocuments] =
    useState<PortalDocumentRow[]>(initialDocuments);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [notes, setNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setStatusMessage(null);
    if (!file) {
      setSelectedFile(null);
      return;
    }

    const lowerName = file.name.toLowerCase();
    const validExt = ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
    if (!validExt) {
      setStatusMessage({
        type: "error",
        text: "Only PDF (.pdf) and Microsoft Word (.doc, .docx) files are accepted.",
      });
      e.target.value = "";
      setSelectedFile(null);
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setStatusMessage({
        type: "error",
        text: "File size exceeds the 15 MB maximum limit.",
      });
      e.target.value = "";
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    if (!title.trim()) {
      setTitle(file.name.replace(/\.(pdf|docx|doc)$/i, ""));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setStatusMessage({
        type: "error",
        text: "Please select a PDF or Word (.doc, .docx) document to upload.",
      });
      return;
    }

    setUploading(true);
    setStatusMessage(null);

    try {
      const supabase = createClient();
      const safeFileName = selectedFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const storagePath = `${portalScope}/${userId}/${Date.now()}_${safeFileName}`;
      const mimeType = resolveMimeType(selectedFile);

      const { error: uploadError } = await supabase.storage
        .from("portal-documents")
        .upload(storagePath, selectedFile, {
          contentType: mimeType,
          upsert: true,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const docTitle =
        title.trim() || selectedFile.name.replace(/\.(pdf|docx|doc)$/i, "");

      const { data: insertedRow, error: dbError } = await supabase
        .from("portal_documents")
        .insert({
          uploaded_by: userId,
          portal_scope: portalScope,
          category,
          title: docTitle,
          file_name: selectedFile.name,
          file_path: storagePath,
          file_size: selectedFile.size,
          mime_type: mimeType,
          uploader_email: userEmail,
          notes: notes.trim() || null,
        })
        .select("*")
        .single();

      if (dbError) {
        throw new Error(dbError.message);
      }

      if (insertedRow) {
        setDocuments((prev) => [insertedRow as PortalDocumentRow, ...prev]);
      }

      setTitle("");
      setNotes("");
      setSelectedFile(null);
      setStatusMessage({
        type: "success",
        text: `"${selectedFile.name}" uploaded securely to the Genix Document Vault.`,
      });
      router.refresh();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to upload document.";
      setStatusMessage({
        type: "error",
        text: msg,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (doc: PortalDocumentRow) => {
    setDownloadingId(doc.id);
    setStatusMessage(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.storage
        .from("portal-documents")
        .createSignedUrl(doc.file_path, 3600, {
          download: doc.file_name,
        });

      if (error || !data?.signedUrl) {
        throw new Error(error?.message || "Could not generate download link.");
      }

      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      setStatusMessage({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "Unable to download document right now.",
      });
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (doc: PortalDocumentRow) => {
    setDeletingId(doc.id);
    setStatusMessage(null);
    try {
      const supabase = createClient();
      await supabase.storage.from("portal-documents").remove([doc.file_path]);
      const { error } = await supabase
        .from("portal_documents")
        .delete()
        .eq("id", doc.id);

      if (error) {
        throw new Error(error.message);
      }

      setDocuments((prev) => prev.filter((item) => item.id !== doc.id));
      setStatusMessage({
        type: "success",
        text: `"${doc.file_name}" removed.`,
      });
      router.refresh();
    } catch (err) {
      setStatusMessage({
        type: "error",
        text:
          err instanceof Error ? err.message : "Failed to remove document.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-genix-navy text-white flex items-center justify-center shrink-0">
            <FolderLock className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-extrabold text-genix-navy">
              {portalScope === "family"
                ? "Family Care Document Vault (PDF & Word Upload)"
                : "Clinical & Operations Document Vault (PDF & Word Upload)"}
            </h2>
            <p className="text-xs text-slate-500">
              {portalScope === "family"
                ? "Securely upload & download Physician Orders, Medical Power of Attorney, Insurance authorizations, or care documents (.pdf, .doc, .docx)."
                : "Upload staff policies, client care packets, and review documents uploaded by families and clinical applicants (.pdf, .doc, .docx)."}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-800">
          <span>Accepted: .PDF, .DOC, .DOCX (Max 15 MB)</span>
        </span>
      </div>

      {statusMessage && (
        <div
          className={`rounded-xl p-3.5 flex items-start gap-2.5 text-xs border ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Upload Form */}
      <form
        onSubmit={handleUpload}
        className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Document Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                portalScope === "family"
                  ? "e.g., Updated Physician Plan of Care"
                  : "e.g., 2026 Clinical Onboarding Packet"
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Document Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold focus:border-genix-navy focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-7">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select PDF or Word File (.pdf, .doc, .docx) *
            </label>
            <label className="flex items-center justify-center gap-2.5 w-full border-2 border-dashed border-slate-300 hover:border-genix-navy rounded-xl bg-white px-4 py-3 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-genix-blue shrink-0" />
              <span className="text-xs font-semibold text-slate-700 truncate">
                {selectedFile
                  ? `${selectedFile.name} (${formatFileSize(selectedFile.size)})`
                  : "Click to choose a PDF or Word (.doc / .docx) document"}
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="sm:col-span-5">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Optional Note
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Signed by Dr. Patel on Nov 3"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={uploading}
            className="btn-primary text-xs px-5 py-2.5"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>UPLOADING DOCUMENT...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>UPLOAD PDF / WORD DOCUMENT</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Uploaded Documents List */}
      <div className="space-y-3">
        <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-500">
          Uploaded Documents ({documents.length})
        </h3>

        {documents.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/70 text-center text-xs text-slate-500">
            No PDF or Word documents have been uploaded yet. Use the form above to
            upload your first file.
          </div>
        ) : (
          <div className="space-y-2.5">
            {documents.map((doc) => {
              const isPdf =
                doc.file_name.toLowerCase().endsWith(".pdf") ||
                doc.mime_type === "application/pdf";
              return (
                <div
                  key={doc.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shrink-0 mt-0.5 ${
                        isPdf
                          ? "bg-red-100 text-red-800 border border-red-200"
                          : "bg-blue-100 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {isPdf ? "PDF" : "WORD"}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-heading text-xs sm:text-sm font-bold text-genix-navy">
                          {doc.title}
                        </p>
                        <span className="rounded-full bg-white border border-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                          {doc.category}
                        </span>
                        {portalScope === "admin" && (
                          <span className="rounded-full bg-genix-navy/10 px-2 py-0.5 text-[10px] font-bold uppercase text-genix-navy">
                            {doc.portal_scope}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                          <FileText className="w-3 h-3 text-genix-blue" />
                          {doc.file_name}
                        </span>
                        <span>•</span>
                        <span>{formatFileSize(doc.file_size)}</span>
                        <span>•</span>
                        <span>
                          {new Date(doc.created_at).toLocaleDateString()}
                        </span>
                        {doc.uploader_email && (
                          <>
                            <span>•</span>
                            <span>By {doc.uploader_email}</span>
                          </>
                        )}
                      </p>
                      {doc.notes && (
                        <p className="text-xs text-slate-600 pt-0.5">
                          Note: {doc.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleDownload(doc)}
                      disabled={downloadingId === doc.id}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-genix-navy hover:bg-genix-crimson text-white px-3.5 py-2 text-xs font-bold transition-colors"
                    >
                      {downloadingId === doc.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                      <span>Download</span>
                    </button>

                    {(portalScope === "admin" ||
                      doc.uploaded_by === userId) && (
                      <button
                        type="button"
                        onClick={() => handleDelete(doc)}
                        disabled={deletingId === doc.id}
                        className="inline-flex items-center gap-1 rounded-lg bg-white hover:bg-red-50 text-red-600 border border-slate-200 hover:border-red-200 px-2.5 py-2 text-xs font-bold transition-colors"
                        title="Delete Document"
                      >
                        {deletingId === doc.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


# Genix Medical Staffing Services — Next.js Platform

Full-stack web application for **Genix Medical Staffing Services** built with **Next.js 15 (App Router)**, **Tailwind CSS**, **Supabase (Database, Auth & Storage)**, and **Hostinger SMTP Email Notifications**.

---

## Key Features

- **Home Care & Clinical Services Catalog**: Dedicated service category and specialty pages across 11 Metro Atlanta counties.
- **Consultation Quote Intake (`/contact`)**: Saves inquiries to Supabase (`public.quotes`) and dispatches HTML/text notifications via Hostinger SMTP.
- **B2B Facility Staffing Requisitions (`/facility-staffing`)**: Rapid-dispatch shift ordering (`public.staffing_requests`) with instant SMTP alerts.
- **Clinical Careers & Resume Upload (`/careers`)**: Accepts `.pdf`, `.doc`, and `.docx` resumes into the private `portal-documents` Supabase Storage bucket (`public.job_applications` + `public.portal_documents`).
- **Client & Family Care Portal (`/portal` & `/portal/dashboard`)**: Protected care plan dashboard with live vitals, shift ADL logs, and a PDF/Word Document Vault.
- **Admin & Staff Operations Portal (`/login` & `/admin`)**: Protected intake center for managing staffing orders, quotes, job applications, and the PDF/Word Document Vault.

---

## Hostinger Cloud Enterprise (Next.js) Deployment

1. **Connect GitHub Repository** in Hostinger hPanel (**Websites → Add Website → Node.js Web App → Import from GitHub**).
2. **Build & Runtime Settings**:
   - **Node.js Version**: `20.x` (or `22.x`)
   - **Framework Preset**: `Next.js`
   - **Install Command**: `npm install`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
3. **Environment Variables** (copy from `.env.example` into Hostinger's Environment Variables panel):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://vcbxbuobodrgspfugwsl.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_vI67Y01f_jzXkqAqveNS2Q_4oNM5RF3
   MAIL_TO=info@genixmedicalstaffing.com
   MAIL_FROM=info@genixmedicalstaffing.com
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_USER=info@genixmedicalstaffing.com
   SMTP_PASS=your_real_hostinger_email_password
   ```

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

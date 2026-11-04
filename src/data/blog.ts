export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  image: string;
  content: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "hospital-to-home-preventing-readmissions-after-discharge",
    title: "Hospital to Home: 5 Clinical Steps to Prevent Readmissions in the First 30 Days",
    excerpt:
      "The first 72 hours after leaving the hospital are critical. Learn how structured transitional care, medication reconciliation, and daily vital monitoring protect your loved one's recovery at home.",
    category: "Transitional Care",
    date: "October 24, 2026",
    readTime: "6 min read",
    author: "Mateo",
    authorRole: "Director of Clinical Governance & Safety",
    image: "/assets/services/Hospital to Home Care.webp",
    content: [
      {
        heading: "Why the First 72 Hours Post-Discharge Matter Most",
        paragraphs: [
          "Leaving the hospital after surgery, cardiac care, or an acute illness brings relief—but it also introduces a sudden shift in responsibility. In the hospital, nurses monitor vitals around the clock, administer medications on exact schedules, and assist with every transfer out of bed.",
          "Once home, families often face complex new prescription regimens, unfamiliar wound or mobility guidelines, and profound physical fatigue. Nearly 1 in 5 Medicare patients are readmitted within 30 days, and over half of those readmissions are preventable with structured home support.",
        ],
      },
      {
        heading: "The Genix 5-Point Transitional Care Protocol",
        paragraphs: [
          "At Genix Medical Staffing Services, our Hospital-to-Home pathway bridges the gap between inpatient oversight and comfortable home recovery across Metro Atlanta:",
        ],
        bullets: [
          "Same-Day Medication Reconciliation: Comparing new discharge prescriptions against prior home medications to prevent accidental duplication or missed doses.",
          "Red-Flag Symptom & Vital Tracking: Daily logging of blood pressure, pulse oximetry, weight, temperature, and incision appearance.",
          "Fall-Safe Mobility & Bathroom Transfers: Providing steady standby and gait-belt support while muscles are deconditioned after bed rest.",
          "Recovery Nutrition & Hydration: Preparing anti-inflammatory, low-sodium, or high-protein meals that accelerate tissue healing.",
          "7-Day Physician Follow-Up Escort: Door-through-door transportation and clinical note-taking at the crucial first post-discharge appointment.",
        ],
      },
      {
        heading: "Partnering With Metro Atlanta Hospital Discharge Planners",
        paragraphs: [
          "Whether your loved one is discharging from Wellstar, Piedmont, Northside, Grady, or Emory, our Care Coordination team works directly with social workers and case managers to have a vetted caregiver ready at home before the ambulance or family car arrives in the driveway.",
        ],
      },
    ],
  },
  {
    slug: "recognizing-early-signs-memory-change-vs-normal-aging",
    title: "Understanding Memory Care: Distinguishing Normal Aging from Early Cognitive Decline",
    excerpt:
      "Misplacing keys is normal; forgetting what keys are used for signals a deeper change. Discover how early, dignified in-home memory support preserves independence and calms anxiety.",
    category: "Memory Care",
    date: "October 18, 2026",
    readTime: "7 min read",
    author: "Lea",
    authorRole: "Head of Care Systems Design",
    image: "/assets/services/Genix MSS Memory Care Hero Image.webp",
    content: [
      {
        heading: "Why Home Remains the Best Environment for Memory Care",
        paragraphs: [
          "For individuals experiencing Mild Cognitive Impairment (MCI), Alzheimer's disease, or vascular dementia, sudden relocation to an unfamiliar institutional setting can accelerate confusion and agitation.",
          "Remaining in one's own home—surrounded by decades of familiar photographs, favorite armchairs, and neighborhood sights—anchors long-term procedural memory and emotional security.",
        ],
      },
      {
        heading: "Key Signs Your Loved One May Benefit from Structured Memory Support",
        paragraphs: [
          "During family visits, look beyond conversation and observe subtle indicators in the kitchen, mail pile, and daily routine:",
        ],
        bullets: [
          "Medication Confusion: Pill bottles with too many or too few tablets remaining for the time of month.",
          "Kitchen & Nutritional Shifts: Expired groceries, scorched pots, or unexplained weight loss.",
          "Late-Afternoon Restlessness (Sundowning): Increased pacing, anxiety, or confusion as daylight fades.",
          "Withdrawal from Favorite Hobbies: Giving up reading, church outings, or social clubs due to overwhelm.",
        ],
      },
      {
        heading: "How Genix Memory Caregivers Create Calm & Connection",
        paragraphs: [
          "Our caregivers are trained in validation therapy, sensory reminiscence, and gentle redirection. Rather than correcting or arguing, we step into your loved one's world with warmth—establishing predictable daily rhythms that restore peace to the entire household.",
        ],
      },
    ],
  },
  {
    slug: "solving-healthcare-facility-staffing-shortages-in-georgia",
    title: "How Clinical-First Medical Staffing Elevates Patient Outcomes in Healthcare Facilities",
    excerpt:
      "When hospitals, rehab centers, and senior living communities face urgent shift gaps, speed cannot come at the expense of clinical vetting. Here is how Genix delivers both within 24–48 hours.",
    category: "Medical Staffing",
    date: "October 10, 2026",
    readTime: "5 min read",
    author: "Jamal",
    authorRole: "Director of Care Delivery Systems",
    image: "/assets/services/Genix M Staffing S Clinical Assessment Image.webp",
    content: [
      {
        heading: "Bridging the Gap Between Urgent Coverage and Clinical Excellence",
        paragraphs: [
          "Healthcare administrators across Georgia know the strain of unexpected census spikes and last-minute call-outs. Yet filling a shift with an unvetted clinician creates friction for charge nurses and compromises patient continuity.",
          "At Genix Medical Staffing Services, we built our clinical bench around a rigorous multi-stage credentialing and competency model—achieving a 92% time-to-fill rate and a 94% client satisfaction score.",
        ],
      },
      {
        heading: "What Sets the Genix Vetting Standard Apart",
        paragraphs: [
          "Every Registered Nurse (RN), Licensed Practical Nurse (LPN), Certified Nursing Assistant (CNA), and Allied Health professional in our network undergoes:",
        ],
        bullets: [
          "Primary-Source License & Credential Verification across Georgia and compact states.",
          "Comprehensive Background, OIG/SAM Exclusion, and Drug Screening.",
          "Specialty-Specific Clinical Competency Testing (ICU, Med-Surg, Telemetry, LTC, Memory Care, Rehab).",
          "Behavioral & Compassion Interviews ensuring alignment with our patient-first culture.",
        ],
      },
      {
        heading: "Seamless Integration With Your Facility Team",
        paragraphs: [
          "From per-diem PRN shifts and urgent 24–48 hour coverage to 13-week travel/local contracts and temp-to-perm placements, Genix acts as an extension of your clinical leadership team.",
        ],
      },
    ],
  },
  {
    slug: "family-caregiver-burnout-why-respite-care-is-essential",
    title: "Protecting the Family Caregiver: Why Respite Care Is a Clinical Necessity, Not a Luxury",
    excerpt:
      "Over 60% of family caregivers report high emotional and physical exhaustion. Learn how scheduled weekly respite care strengthens family bonds and improves long-term care outcomes.",
    category: "Family Support",
    date: "October 2, 2026",
    readTime: "5 min read",
    author: "Sara",
    authorRole: "Director of Care Partnerships & Advocacy",
    image: "/assets/services/Respite Care Page Image.webp",
    content: [
      {
        heading: "Caring for Someone Alone Can Be Straining",
        paragraphs: [
          "When a spouse or aging parent needs daily support, family members step up out of deep love. Over months and years, however, sleepless nights, heavy physical transfers, and constant worry take a measurable toll on the caregiver's own cardiovascular health and immune system.",
          "Respite care is not 'giving up'—it is the strategic foundation that makes sustainable, loving home care possible for the long haul.",
        ],
      },
      {
        heading: "How Families Use Genix Respite Care",
        paragraphs: [
          "Our flexible respite pathways adapt to your schedule:",
        ],
        bullets: [
          "Weekly Recharge Blocks: 2 to 3 afternoons a week so you can attend your own doctor visits, exercise, or enjoy lunch with friends.",
          "Awake Overnight Relief: A professional night caregiver who handles bathroom trips and wandering so you can sleep 8 uninterrupted hours.",
          "Vacation & Event Coverage: Multi-day or 24/7 care when you travel for graduations, weddings, or family vacations.",
        ],
      },
    ],
  },
];

export const TEAM_MEMBERS = [
  {
    name: "Alex",
    role: "Staff Success & Support Liaison",
    bio: "Dedicated to matching our nurses and caregivers with placements where they thrive, providing 24/7 clinician support and scheduling advocacy.",
    image: "/assets/services/Genix M Staffing S Successfull Image 1.webp",
  },
  {
    name: "Nina",
    role: "Resource Data & Analytics Coordinator",
    bio: "Oversees real-time shift tracking, clinical quality metrics, and staffing response analytics to ensure 94%+ client satisfaction.",
    image: "/assets/services/Genix M Staffing S Successfull Image 2.webp",
  },
  {
    name: "Lea",
    role: "Head of Care Systems Design",
    bio: "Architects personalized care pathways and cognitive engagement frameworks tailored to each family's lifestyle and independence goals.",
    image: "/assets/services/Genix M Staffing S Successfull Image 3.webp",
  },
  {
    name: "Jamal",
    role: "Director of Care Delivery Systems",
    bio: "Leads operational execution across private home care and hospital/facility staffing partnerships throughout Metro Atlanta.",
    image: "/assets/services/Genix M Staffing S Strategic Care Image.webp",
  },
  {
    name: "Mateo",
    role: "Director of Clinical Governance & Safety",
    bio: "Directs clinical vetting, infection control standards, and the Genix Proven Care Method's comprehensive clinical assessments.",
    image: "/assets/services/Genix M Staffing S Clinical Assessment Image.webp",
  },
  {
    name: "Sara",
    role: "Director of Care Partnerships & Advocacy",
    bio: "Partners closely with families, hospital discharge planners, and community organizations to make dignified care accessible and transparent.",
    image: "/assets/services/Genix M Staffing S Skilled Nurse Image 3.webp",
  },
];

export const HOME_FAQS = [
  {
    question: "How quickly can Genix fill our open medical positions, especially during urgent staffing shortages?",
    intro: "Focusing on Speed and Efficiency:",
    bullets: [
      "Genix understands the urgency of staffing shortages. Our streamlined process and extensive network of qualified professionals allow us to fill critical positions rapidly, often within 24–48 hours.",
      "We specialize in quick placements. Our dedicated team is on standby to respond immediately to your urgent needs, minimizing disruption to your patient care.",
    ],
  },
  {
    question: "What specific qualifications and screening processes do you use to ensure the quality of your medical professionals?",
    intro: "Rigorous Clinical Vetting & Credentialing:",
    bullets: [
      "Every RN, LPN, CNA, and Home Care Professional undergoes multi-state background checks, OIG/SAM verification, drug screening, and primary-source license validation.",
      "We conduct hands-on clinical competency assessments, reference checks, and compassion-focused interviews so only the top tier of caregivers enter your facility or home.",
    ],
  },
  {
    question: "Can Genix provide staffing solutions tailored to our specific facility's needs and specialties?",
    intro: "Customized Multi-Disciplinary Staffing:",
    bullets: [
      "Yes. We coordinate over 30 clinical specializations—including Med-Surg, ICU, Telemetry, Long-Term Care, Memory Care, Rehabilitation, and Private Duty Home Care.",
      "Whether you need PRN shift relief, block booking, local contracts, or temp-to-perm placements, we align with your exact clinical protocols.",
    ],
  },
  {
    question: "What are your pricing structures, and how do they compare to other medical staffing agencies?",
    intro: "Total Clinical & Financial Transparency:",
    bullets: [
      "Staffing Genix offers competitive, transparent rates for top-tier medical talent without hidden administrative fees or surprise add-ons.",
      "Following your complimentary consultation or clinical assessment, we provide a clear, itemized quote tailored to the exact level of care and schedule required.",
    ],
  },
  {
    question: "How does Genix ensure ongoing communication and support after a placement is made?",
    intro: "Continuous Care Delivery & 24/7 Oversight:",
    bullets: [
      "Our partnership doesn't stop once a shift starts. We provide ongoing clinical supervision, real-time shift updates, vitals tracking, and proactive check-ins.",
      "Families and facility directors have 24/7 access to a dedicated Genix Care Coordinator to adjust schedules or care plans at any time.",
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Genix provided expert staff promptly, meeting our urgent needs perfectly. Their team was professional, understanding our unique demands. We found their service reliable, ensuring patient care remained at its highest standard. They truly are a partner in healthcare excellence.",
    name: "Clementine Fisher",
    role: "Healthcare Partner & Client",
    image: "/assets/services/Genix M Staffing S Family Support One Image.webp",
  },
  {
    quote:
      "Working with Genix was a profound relief for our family. Their attention to my mother's specific needs and their dedication to her dignity and comfort were outstanding. We cannot recommend their care team highly enough!",
    name: "Paige Montoya",
    role: "Family Care Client — Atlanta, GA",
    image: "/assets/services/Genix M Staffing S Family Support Two Image.webp",
  },
  {
    quote:
      "After my father's stroke discharge from Wellstar, we were overwhelmed. Genix stepped in within 24 hours with a compassionate caregiver who handled his mobility transfers, medication reminders, and meals seamlessly.",
    name: "Marcus & Elena Vance",
    role: "Post-Hospital Recovery Family — Marietta, GA",
    image: "/assets/services/Genix M Staffing S Family Support Three Image.webp",
  },
];


export interface SubService {
  slug: string;
  title: string;
  shortTitle: string;
  categorySlug: "home-care" | "memory-care" | "specialized-care" | "daily-activities";
  categoryName: string;
  summary: string;
  heroDescription: string;
  image: string;
  secondaryImage?: string;
  clinicalHighlights: string[];
  whatIsIncluded: {
    title: string;
    description: string;
  }[];
  whoItHelps: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface ServicePillar {
  slug: "home-care" | "memory-care" | "specialized-care" | "daily-activities";
  title: string;
  cardHeadline: string;
  cardSubtitle: string;
  description: string;
  heroImage: string;
  cardImage: string;
  iconName: string;
  highlights: string[];
  subServices: SubService[];
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    slug: "home-care",
    title: "Home Care",
    cardHeadline: "HOME CARE",
    cardSubtitle: "Our High-Quality In-Home Care Includes:",
    description:
      "Personalized, compassionate in-home support pathways that empower individuals to live safely, comfortably, and independently in the familiarity of their own homes.",
    heroImage: "/assets/services/Genix MMS In Home Daily Living Hero Image.webp",
    cardImage: "/assets/services/HomeCareHomePageImage.webp",
    iconName: "Home",
    highlights: [
      "Companionship",
      "Help At Home",
      "Respite Care",
      "24/7 Care",
      "One-on-One Care",
    ],
    subServices: [
      {
        slug: "companionship",
        title: "Compassionate Companionship Care",
        shortTitle: "Companionship",
        categorySlug: "home-care",
        categoryName: "Home Care",
        summary:
          "Meaningful social interaction, emotional support, and daily encouragement to combat isolation and enrich quality of life at home.",
        heroDescription:
          "Loneliness and social isolation can significantly impact physical and cognitive wellness. Our vetted Genix caregivers provide warm, engaging companionship tailored to your loved one's personality, hobbies, and daily rhythm.",
        image: "/assets/services/Companionship Page Image.webp",
        secondaryImage: "/assets/services/Genix M Staffing S Happy Loved Ones Image.webp",
        clinicalHighlights: [
          "Matched by personality, shared interests, and communication style",
          "Proactive monitoring of mood, appetite, and cognitive alertness",
          "Consistent daily routines that foster emotional security",
          "Real-time shift notes and updates shared with family members",
        ],
        whatIsIncluded: [
          {
            title: "Engaging Conversation & Active Listening",
            description:
              "Sharing stories, reading aloud, discussing current events, and offering genuine friendship throughout the day.",
          },
          {
            title: "Hobbies, Games & Recreational Activities",
            description:
              "Playing cards, puzzles, arts and crafts, gardening, or enjoying favorite music and films together.",
          },
          {
            title: "Accompanied Walks & Fresh Air",
            description:
              "Safe, supervised strolls around the neighborhood, local parks, or porch relaxation to encourage gentle mobility.",
          },
          {
            title: "Community & Family Connection",
            description:
              "Helping seniors stay connected with grandchildren and friends via video calls, letters, and social visits.",
          },
        ],
        whoItHelps: [
          "Seniors living alone who miss daily conversation and social warmth",
          "Individuals recovering from bereavement or life transitions",
          "Older adults whose family members work full-time or live out of town",
          "Clients experiencing mild mood changes or withdrawal",
        ],
        faqs: [
          {
            question: "How do you match a companion caregiver with my loved one?",
            answer:
              "During our Comprehensive Clinical Assessment, we learn about your loved one's background, favorite pastimes, cultural preferences, and daily schedule so we can pair them with a caregiver who truly clicks.",
          },
          {
            question: "Can a companion caregiver also help with light household tasks?",
            answer:
              "Absolutely. Our companion care seamlessly blends social engagement with meal preparation, light housekeeping, errands, and medication reminders.",
          },
        ],
      },
      {
        slug: "help-at-home",
        title: "Help at Home & Personal Support",
        shortTitle: "Help At Home",
        categorySlug: "home-care",
        categoryName: "Home Care",
        summary:
          "Reliable day-to-day household and personal assistance that removes the strain of independent living while preserving dignity.",
        heroDescription:
          "When everyday chores and routines become physically taxing, Genix provides dependable Help at Home. We step in gently to manage household flow, safety, and daily comfort so your home remains a sanctuary.",
        image: "/assets/services/Help at Home page Image.webp",
        secondaryImage: "/assets/services/Genix M Staffing S Home Support Image One.webp",
        clinicalHighlights: [
          "Flexible scheduling from a few hours a week to daily visits",
          "Fall-prevention awareness and home hazard monitoring",
          "Support with morning wake-up and evening tuck-in routines",
          "Seamless coordination with family and clinical care teams",
        ],
        whatIsIncluded: [
          {
            title: "Morning & Evening Routine Assistance",
            description:
              "Helping clients start and end their day safely—getting out of bed, dressing, preparing breakfast, and settling in at night.",
          },
          {
            title: "Household Organization & Tidying",
            description:
              "Keeping living areas clutter-free, managing laundry, changing bed linens, and maintaining a sanitary environment.",
          },
          {
            title: "Grocery Planning & Nutritional Prep",
            description:
              "Checking pantry staples, organizing grocery lists, and preparing fresh, wholesome meals tailored to dietary needs.",
          },
          {
            title: "Safety & Wellness Check-Ins",
            description:
              "Ensuring appliances are off, doors are secure, hydration is maintained, and any health changes are documented.",
          },
        ],
        whoItHelps: [
          "Older adults who want to remain independent at home with extra support",
          "Individuals managing arthritis, fatigue, or limited mobility",
          "Spouses caring for a partner who need reliable household backup",
        ],
        faqs: [
          {
            question: "Is there a minimum number of hours required for Help at Home?",
            answer:
              "We customize every schedule around your family's exact needs—whether that means three mornings a week or comprehensive daily support.",
          },
        ],
      },
      {
        slug: "respite-care",
        title: "Respite Care for Family Caregivers",
        shortTitle: "Respite Care",
        categorySlug: "home-care",
        categoryName: "Home Care",
        summary:
          "Short-term, professional relief for family caregivers so you can rest, recharge, travel, or attend to personal responsibilities with total peace of mind.",
        heroDescription:
          "Caring for someone alone can be straining without a support team. Genix Respite Care steps in seamlessly as an extension of your family—upholding your exact routines and clinical standards while you take well-deserved time to recharge.",
        image: "/assets/services/Respite Care Page Image.webp",
        secondaryImage: "/assets/services/Genix M Staffing S Family Support One Image.webp",
        clinicalHighlights: [
          "Zero disruption to your loved one's established home routine",
          "Available for afternoon breaks, weekends, vacations, or emergencies",
          "Trained in complex medical, mobility, and memory care protocols",
          "Transparent shift handoffs and real-time family updates",
        ],
        whatIsIncluded: [
          {
            title: "Seamless Care Handoff",
            description:
              "We review your loved one's exact schedule, medication times, dietary preferences, and comfort habits prior to every respite shift.",
          },
          {
            title: "Full Personal & Clinical Support",
            description:
              "Assistance with bathing, mobility transfers, meals, continence care, and specialized cognitive or medical oversight.",
          },
          {
            title: "Planned or Urgent Coverage",
            description:
              "Book recurring weekly relief hours to prevent caregiver burnout or schedule multi-day coverage for family events and travel.",
          },
          {
            title: "Detailed Peace-of-Mind Reporting",
            description:
              "Receive real-time updates and a complete summary of meals, activities, and wellness observations while you are away.",
          },
        ],
        whoItHelps: [
          "Primary family caregivers experiencing exhaustion or burnout",
          "Working professionals balancing career demands with parent care",
          "Families traveling for holidays, weddings, or business trips",
        ],
        faqs: [
          {
            question: "How quickly can Genix arrange respite care?",
            answer:
              "We can often arrange respite coverage within 24 to 48 hours, or set up a recurring weekly schedule so you always have dedicated personal time.",
          },
        ],
      },
      {
        slug: "24-hour-care",
        title: "24/7 Around-the-Clock Home Care",
        shortTitle: "24/7 Care",
        categorySlug: "home-care",
        categoryName: "Home Care",
        summary:
          "Continuous day-and-night supervision, clinical vigilance, and immediate assistance for individuals requiring full-time safety at home.",
        heroDescription:
          "When a loved one cannot be left alone due to fall risks, nighttime wandering, or complex medical needs, Genix delivers coordinated 24/7 Around-the-Clock Care. Our rotating caregiver teams ensure an awake, alert professional is always by their side.",
        image: "/assets/services/24-Hour Home Care Page Image.png",
        secondaryImage: "/assets/services/Genix M Staffing S Continuous Care Image.webp",
        clinicalHighlights: [
          "Coordinated rotating shifts with awake, alert overnight caregivers",
          "Immediate nighttime assistance with toileting, repositioning, and calming",
          "Hospital-grade safety protocols in the comfort of home",
          "Dedicated Care Manager overseeing the 24/7 staffing team",
        ],
        whatIsIncluded: [
          {
            title: "Awake Overnight Vigilance",
            description:
              "Continuous monitoring throughout the night to prevent falls, respond to restlessness, and assist with bathroom trips.",
          },
          {
            title: "Complete Daily Living & Nutritional Management",
            description:
              "All meals, hydration tracking, personal hygiene, dressing, housekeeping, and medication reminders handled around the clock.",
          },
          {
            title: "Bed Repositioning & Skin Integrity Care",
            description:
              "Scheduled turning and posture adjustments for bedbound or mobility-limited clients to prevent pressure injuries.",
          },
          {
            title: "Team Continuity & Shift Briefings",
            description:
              "A small, consistent team of caregivers who conduct structured clinical handoffs between day and night shifts.",
          },
        ],
        whoItHelps: [
          "Individuals with advanced dementia or nighttime wandering (sundowning)",
          "Clients returning home after major surgery, stroke, or hospitalization",
          "Seniors at high risk of falls who require two-person or constant standby transfers",
          "Families seeking an alternative to nursing home or assisted living placement",
        ],
        faqs: [
          {
            question: "What is the difference between 24-hour care and live-in care?",
            answer:
              "With 24/7 rotating care, caregivers work in scheduled 8-to-12-hour shifts so someone is always awake and alert—even at 3:00 AM.",
          },
        ],
      },
      {
        slug: "one-on-one-care",
        title: "Dedicated One-on-One Personal Care",
        shortTitle: "One-on-One Care",
        categorySlug: "home-care",
        categoryName: "Home Care",
        summary:
          "Individually focused, undivided clinical and personal attention—at home or as supplemental bedside support inside a facility.",
        heroDescription:
          "Unlike busy facilities where staff divide their attention among dozens of residents, Genix One-on-One Care provides 100% dedicated focus on a single individual—whether in a private residence, assisted living community, or hospital room.",
        image: "/assets/services/One On One Care Service.png",
        secondaryImage: "/assets/services/Genxis M Staffing S Personalized Care Image.webp",
        clinicalHighlights: [
          "1:1 caregiver-to-client ratio for immediate responsiveness",
          "Available in private homes, assisted living, rehab centers, or hospitals",
          "Tailored to the client's exact pace, preferences, and dignity",
          "Strong, trusting bond built with a dedicated care professional",
        ],
        whatIsIncluded: [
          {
            title: "Undivided Personal Attention",
            description:
              "No waiting for call bells—your caregiver is dedicated solely to your loved one's comfort, safety, and requests.",
          },
          {
            title: "Supplemental Facility Sitters & Advocates",
            description:
              "Bedside companionship, fall prevention, and advocacy during hospital stays or rehabilitation placements.",
          },
          {
            title: "Customized Daily Pacing",
            description:
              "Meals, walks, bathing, and rest happen on your loved one's natural schedule rather than an institutional timetable.",
          },
          {
            title: "Direct Family Communication Line",
            description:
              "Your caregiver acts as your eyes and ears, updating you promptly on doctors' rounds, therapy progress, or daily wellness.",
          },
        ],
        whoItHelps: [
          "Hospitalized or rehab patients who need a dedicated bedside advocate",
          "Assisted living residents requiring extra 1-on-1 memory or fall support",
          "Homebound individuals who thrive with consistent, individualized care",
        ],
        faqs: [
          {
            question: "Can Genix provide One-on-One care inside an assisted living facility or hospital?",
            answer:
              "Yes. Many families hire Genix to provide dedicated 1-on-1 bedside support inside hospitals, skilled nursing facilities, and senior living communities across Metro Atlanta.",
          },
        ],
      },
    ],
  },
  {
    slug: "memory-care",
    title: "Memory Care",
    cardHeadline: "MEMORY CARE",
    cardSubtitle: "Our Caregivers Are Expertly Trained To Support:",
    description:
      "Specialized, evidence-based cognitive and dementia support programs designed to preserve dignity, reduce anxiety, and maintain a calm, familiar home environment.",
    heroImage: "/assets/services/Genix MSS Memory Care Hero Image.webp",
    cardImage: "/assets/services/Memory Care Homepage Service Image.webp",
    iconName: "Brain",
    highlights: [
      "Mild Cognitive Impairment",
      "Alzheimer's Disease",
      "Vascular Dementia",
      "Lewy Body Dementia",
      "Frontotemporal Dementia",
      "Parkinson's Disease Dementia",
    ],
    subServices: [
      {
        slug: "mild-cognitive-impairment",
        title: "Mild Cognitive Impairment (MCI) Support",
        shortTitle: "Mild Cognitive Impairment",
        categorySlug: "memory-care",
        categoryName: "Memory Care",
        summary:
          "Proactive cognitive engagement, structured organization, and gentle reminders that preserve independence for individuals with early memory changes.",
        heroDescription:
          "A diagnosis of Mild Cognitive Impairment (MCI) doesn't mean losing independence. Genix provides respectful, empowering support that reinforces daily habits, stimulates neuroplasticity, and keeps life running smoothly.",
        image: "/assets/services/MCI Page Image.webp",
        secondaryImage: "/assets/services/Genix MSS Memory Care Image One.webp",
        clinicalHighlights: [
          "Dignity-first reminders that support autonomy without taking over",
          "Brain-healthy nutrition, hydration, and physical exercise routines",
          "Appointment, medication, and household calendar coordination",
          "Baseline cognitive tracking to share with neurologists and physicians",
        ],
        whatIsIncluded: [
          {
            title: "Cognitive Stimulation & Memory Exercises",
            description:
              "Daily brain games, reading, music therapy, and structured problem-solving activities designed to keep neural pathways active.",
          },
          {
            title: "Calendar, Medication & Bill Organization",
            description:
              "Setting up visual cues, pill organizers, and reliable systems so appointments and doses are never missed.",
          },
          {
            title: "Heart & Brain-Healthy Meal Prep",
            description:
              "Preparing Mediterranean-style, nutrient-dense meals rich in antioxidants and omega-3s to support cognitive longevity.",
          },
          {
            title: "Safe Transportation & Errands",
            description:
              "Reliable accompaniment to medical visits, social clubs, and shopping when driving becomes stressful.",
          },
        ],
        whoItHelps: [
          "Adults noticing early short-term memory slips or organizational challenges",
          "Individuals diagnosed with MCI seeking proactive lifestyle interventions",
          "Families wanting early peace of mind and safety checks",
        ],
        faqs: [
          {
            question: "How do caregivers assist someone with MCI without making them feel micromanaged?",
            answer:
              "Our caregivers are trained in collaborative support—working alongside the client as a helpful partner rather than taking away tasks they can still enjoy doing.",
          },
        ],
      },
      {
        slug: "alzheimers-disease",
        title: "Alzheimer's Disease In-Home Care",
        shortTitle: "Alzheimer's Disease",
        categorySlug: "memory-care",
        categoryName: "Memory Care",
        summary:
          "Compassionate, stage-appropriate Alzheimer's care focused on familiar routines, wandering prevention, emotional reassurance, and family relief.",
        heroDescription:
          "Remaining in a familiar home environment surrounded by cherished memories is deeply beneficial for individuals living with Alzheimer's disease. Genix caregivers bring specialized dementia training, patience, and structured calm to every stage of the journey.",
        image: "/assets/services/Alzheimer's Page Image.webp",
        secondaryImage: "/assets/services/Genix MSS Memory Care Image Two.webp",
        clinicalHighlights: [
          "Specialized training in validation therapy and gentle redirection",
          "Proactive management of late-afternoon 'sundowning' and agitation",
          "Home environment safety audits and wandering prevention",
          "Adaptable care plans that evolve from early-stage to late-stage needs",
        ],
        whatIsIncluded: [
          {
            title: "Structured, Calming Daily Routines",
            description:
              "Consistent wake, meal, activity, and rest times that reduce confusion and create a predictable sense of safety.",
          },
          {
            title: "Sensory & Reminiscence Therapy",
            description:
              "Using photo albums, familiar music from their youth, and tactile activities to spark joy and long-term memories.",
          },
          {
            title: "Dignified Personal Hygiene & Dressing",
            description:
              "Step-by-step cueing and calm, unhurried assistance with bathing, grooming, and continence care.",
          },
          {
            title: "24/7 Safety & Wandering Prevention",
            description:
              "Close supervision of exits, kitchen appliances, and nighttime movement to keep your loved one secure at home.",
          },
        ],
        whoItHelps: [
          "Individuals with early, middle, or late-stage Alzheimer's disease",
          "Clients experiencing sundowning, confusion, or exit-seeking behaviors",
          "Spouses and adult children needing expert dementia care partnership",
        ],
        faqs: [
          {
            question: "How do Genix caregivers handle agitation or confusion in Alzheimer's clients?",
            answer:
              "We never argue or harshly correct. Instead, our caregivers use validation therapy, calm vocal tones, and gentle redirection toward soothing activities.",
          },
        ],
      },
      {
        slug: "vascular-dementia",
        title: "Vascular Dementia Care & Recovery Support",
        shortTitle: "Vascular Dementia",
        categorySlug: "memory-care",
        categoryName: "Memory Care",
        summary:
          "Integrated cognitive and cardiovascular support tailored to individuals managing vascular dementia or post-stroke cognitive changes.",
        heroDescription:
          "Because vascular dementia often involves stepped changes in cognition alongside cardiovascular or mobility needs, Genix combines memory care expertise with attentive physical rehabilitation and heart-healthy oversight.",
        image: "/assets/services/Vascular Dementia Page Image.webp",
        secondaryImage: "/assets/services/Genix MSS Memory Care Image Three.webp",
        clinicalHighlights: [
          "Dual focus on cognitive support and cardiovascular risk management",
          "Blood pressure, hydration, and medication adherence support",
          "Safe mobility transfers and physical therapy homework encouragement",
          "Close monitoring for sudden stepped changes in cognition or speech",
        ],
        whatIsIncluded: [
          {
            title: "Cardiovascular & Medication Vigilance",
            description:
              "Timely reminders for blood pressure, anticoagulant, and cholesterol medications alongside daily vital logging.",
          },
          {
            title: "Executive Function & Planning Assistance",
            description:
              "Breaking multi-step daily tasks into simple, manageable steps to prevent frustration and fatigue.",
          },
          {
            title: "Mobility & Fall Prevention Support",
            description:
              "Steady assistance with walkers, canes, and transfers for clients with post-stroke weakness or balance changes.",
          },
          {
            title: "Low-Sodium, Heart-Smart Nutrition",
            description:
              "Freshly prepared meals aligned with physician-recommended cardiac and diabetic dietary guidelines.",
          },
        ],
        whoItHelps: [
          "Individuals diagnosed with vascular dementia or post-stroke cognitive decline",
          "Seniors managing both cardiovascular conditions and memory changes",
        ],
        faqs: [
          {
            question: "Can caregivers help with physical therapy exercises at home?",
            answer:
              "Yes. Our caregivers encourage and supervise prescribed home exercise routines from your physical or occupational therapist to maintain strength and circulation.",
          },
        ],
      },
      {
        slug: "lewy-body-dementia",
        title: "Lewy Body Dementia (LBD) Specialized Care",
        shortTitle: "Lewy Body Dementia",
        categorySlug: "memory-care",
        categoryName: "Memory Care",
        summary:
          "Highly attuned care for Lewy Body Dementia, addressing fluctuating alertness, visual hallucinations, sleep disturbances, and Parkinsonian movement symptoms.",
        heroDescription:
          "Lewy Body Dementia requires specialized clinical awareness because symptoms can fluctuate dramatically from hour to hour. Genix caregivers understand the unique interplay of cognitive shifts, visual perceptions, and motor stiffness in LBD.",
        image: "/assets/services/Lewy Body Dementia Page Image.webp",
        secondaryImage: "/assets/services/Genix MSS Meory Care Image Four.webp",
        clinicalHighlights: [
          "Trained to respond calmly and reassuringly to visual hallucinations",
          "Adaptive scheduling that works around good hours and fatigued periods",
          "Specialized fall prevention for Parkinsonian gait and orthostatic dizziness",
          "Awake overnight support for REM sleep behavior disturbances",
        ],
        whatIsIncluded: [
          {
            title: "Hallucination & Perception Reassurance",
            description:
              "Validating feelings without escalating fear, adjusting lighting to reduce shadows, and maintaining a peaceful visual environment.",
          },
          {
            title: "Motor & Balance Assistance",
            description:
              "Hands-on standby support for shuffling gait, muscle rigidity, tremors, and safe sit-to-stand transitions.",
          },
          {
            title: "Flexible 'Good Day / Hard Day' Pacing",
            description:
              "Adapting bathing, meals, and activities to match fluctuations in attention and alertness.",
          },
          {
            title: "Overnight Sleep & Safety Monitoring",
            description:
              "Protecting clients from injury during vivid dreams, nighttime confusion, or sudden blood pressure drops when standing.",
          },
        ],
        whoItHelps: [
          "Individuals diagnosed with Dementia with Lewy Bodies (DLB)",
          "Clients experiencing visual hallucinations, fluctuating cognition, and movement changes",
        ],
        faqs: [
          {
            question: "Why does Lewy Body Dementia require specialized caregiver training?",
            answer:
              "Unlike Alzheimer's, LBD often causes early visual hallucinations, sudden alertness shifts, and Parkinson-like stiffness. Our caregivers know how to adjust lighting, pacing, and mobility support accordingly.",
          },
        ],
      },
      {
        slug: "frontotemporal-dementia",
        title: "Frontotemporal Dementia (FTD) Care & Behavioral Support",
        shortTitle: "Frontotemporal Dementia",
        categorySlug: "memory-care",
        categoryName: "Memory Care",
        summary:
          "Patient, non-judgmental behavioral and communication support for individuals living with Frontotemporal Dementia.",
        heroDescription:
          "Because Frontotemporal Dementia primarily impacts personality, behavior, and language rather than early memory, families often face unique emotional and communication challenges. Genix provides structured, compassionate behavioral support.",
        image: "/assets/services/FrontoTemporal Dementia Page Image.webp",
        secondaryImage: "/assets/services/Genix MSS Specialized Behavioral Support Services Image.webp",
        clinicalHighlights: [
          "Positive behavioral redirection and environmental cueing",
          "Speech and alternative communication support for primary progressive aphasia",
          "Structured active outlets to channel restlessness safely",
          "Dedicated respite and emotional relief for spouses and families",
        ],
        whatIsIncluded: [
          {
            title: "Behavioral Redirection & Calm Structure",
            description:
              "Managing impulsivity, repetitive habits, or emotional blunting with patience, humor, and predictable routines.",
          },
          {
            title: "Communication & Language Adaptation",
            description:
              "Using visual boards, simplified phrasing, and non-verbal cues when speech or word-finding becomes difficult.",
          },
          {
            title: "Nutritional & Dietary Monitoring",
            description:
              "Managing sweet cravings, hyperorality, or swallowing changes common in FTD with safe, pre-portioned meals.",
          },
          {
            title: "Active Engagement & Purposeful Walks",
            description:
              "Providing safe physical outlets and structured hobbies for younger-onset or physically active FTD clients.",
          },
        ],
        whoItHelps: [
          "Individuals with behavioral-variant FTD or Primary Progressive Aphasia (PPA)",
          "Families navigating early-onset dementia in adults in their 50s, 60s, or 70s",
        ],
        faqs: [
          {
            question: "How do caregivers handle uncharacteristic behaviors in FTD?",
            answer:
              "Our caregivers understand that behavioral changes are symptoms of neurology, not intentional choices. They remain calm, avoid triggers, and use structured redirection.",
          },
        ],
      },
      {
        slug: "parkinsons-disease-dementia",
        title: "Parkinson's Disease Dementia Care",
        shortTitle: "Parkinson's Disease Dementia",
        categorySlug: "memory-care",
        categoryName: "Memory Care",
        summary:
          "Synchronized movement and memory care addressing tremors, freezing of gait, precise medication timing, and cognitive changes.",
        heroDescription:
          "When Parkinson's disease progresses to affect memory, attention, and processing speed, coordinated care becomes essential. Genix blends specialized mobility safety with gentle cognitive cueing and strict on-time medication support.",
        image: "/assets/services/Parkinson's Disease Dementia Page Image.webp",
        secondaryImage: "/assets/services/Genix MSS Safety and Supervision Service Image.webp",
        clinicalHighlights: [
          "Strict adherence to time-sensitive dopaminergic medication schedules",
          "Cueing techniques to overcome 'freezing of gait' and prevent falls",
          "Swallowing-safe meal preparation and adaptive utensils",
          "Patient communication allowing ample time for slow information processing",
        ],
        whatIsIncluded: [
          {
            title: "On-the-Dot Medication Reminders",
            description:
              "Parkinson's medications must be taken on a precise schedule to avoid 'off' periods—our caregivers track every dose religiously.",
          },
          {
            title: "Safe Mobility & Transfer Cueing",
            description:
              "Hands-on gait belt assistance, rhythmic stepping cues, and safe transfers from bed, chairs, and bathrooms.",
          },
          {
            title: "Dysphagia-Friendly Nutrition",
            description:
              "Preparing easy-to-swallow, high-calorie meals and monitoring upright posture during eating and drinking.",
          },
          {
            title: "Unhurried Cognitive & Speech Support",
            description:
              "Giving clients extra time to formulate responses and supporting vocal projection exercises (such as LSVT homework).",
          },
        ],
        whoItHelps: [
          "Individuals living with Parkinson's Disease Dementia (PDD)",
          "Seniors experiencing both motor tremors/rigidity and cognitive slowing",
        ],
        faqs: [
          {
            question: "Why is exact medication timing so important in Parkinson's care?",
            answer:
              "Even a 30-minute delay in Parkinson's medication can increase stiffness, tremors, and confusion. We build the entire daily routine around exact dose times.",
          },
        ],
      },
    ],
  },
  {
    slug: "specialized-care",
    title: "Specialized Care",
    cardHeadline: "SPECIALIZED CARE",
    cardSubtitle: "The Best Care So Our Clients Can Live Safely At Home:",
    description:
      "Hospital-grade clinical oversight and multi-disciplinary care pathways for complex chronic conditions, post-operative recovery, and high-acuity home support.",
    heroImage: "/assets/services/Genix MSS Specialized Care Hero Image.webp",
    cardImage: "/assets/services/Specialized Care Homepage Service Image.webp",
    iconName: "Stethoscope",
    highlights: [
      "Parkinson's Disease",
      "Heart Health",
      "After A Stroke",
      "Cancer",
      "End-Of-Life Care",
      "Hospital To Home",
    ],
    subServices: [
      {
        slug: "parkinsons-disease",
        title: "Parkinson's Disease Specialized Home Support",
        shortTitle: "Parkinson's Disease",
        categorySlug: "specialized-care",
        categoryName: "Specialized Care",
        summary:
          "Dedicated mobility, exercise, nutrition, and daily living support designed around the motor symptoms of Parkinson's disease.",
        heroDescription:
          "Living well with Parkinson's disease requires consistency, safe movement, and proactive energy management. Genix caregivers empower clients to stay active, avoid falls, and maintain their independence at home.",
        image: "/assets/services/Parkinson's Disease Page Image.webp",
        secondaryImage: "/assets/services/Genix M Staffing S Specialized Medical One.webp",
        clinicalHighlights: [
          "Fall-prevention home workflows and transfer assistance",
          "Support with fine-motor tasks (buttoning, grooming, writing, eating)",
          "Encouragement of daily stretching, balance, and walking programs",
          "Precision tracking of 'on/off' symptom windows for physician review",
        ],
        whatIsIncluded: [
          {
            title: "Mobility & Fall Prevention",
            description:
              "Clearing pathways, assisting with walkers and canes, and providing steady standby support during movement.",
          },
          {
            title: "Fine-Motor Personal Care",
            description:
              "Respectful help with shaving, dental care, fastening clothing, and meal cutting when tremors interfere.",
          },
          {
            title: "Exercise & Therapy Reinforcement",
            description:
              "Assisting with prescribed physical, occupational, and speech therapy exercises to preserve mobility and voice strength.",
          },
          {
            title: "Energy Conservation Pacing",
            description:
              "Scheduling demanding activities during peak medication effectiveness and building in restorative rest periods.",
          },
        ],
        whoItHelps: [
          "Individuals at any stage of Parkinson's disease or movement disorders",
          "Clients recovering from Deep Brain Stimulation (DBS) or therapy adjustments",
        ],
        faqs: [
          {
            question: "Can Genix adapt care as Parkinson's symptoms change over time?",
            answer:
              "Yes. Our Continuous Care Delivery model adjusts hours and clinical skill levels seamlessly as mobility or support needs evolve.",
          },
        ],
      },
      {
        slug: "heart-health",
        title: "Cardiac & Heart Health Home Care",
        shortTitle: "Heart Health",
        categorySlug: "specialized-care",
        categoryName: "Specialized Care",
        summary:
          "Clinical monitoring, low-sodium nutritional prep, vital tracking, and energy-conserving support for congestive heart failure (CHF) and cardiac recovery.",
        heroDescription:
          "Managing Congestive Heart Failure (CHF), hypertension, or post-cardiac surgery recovery at home requires daily vigilance. Genix helps prevent hospital readmissions through consistent vital tracking, heart-smart nutrition, and symptom awareness.",
        image: "/assets/services/Heart Health Page Image.webp",
        secondaryImage: "/assets/services/Genix M Staffing S Specialized Medical Two.webp",
        clinicalHighlights: [
          "Daily weight, blood pressure, and pulse oximetry logging",
          "Monitoring for early fluid retention (edema) or shortness of breath",
          "Strict low-sodium, fluid-managed meal preparation",
          "Paced physical activity aligned with cardiac rehab guidelines",
        ],
        whatIsIncluded: [
          {
            title: "Daily Vital & Weight Tracking",
            description:
              "Recording morning weights and blood pressure to catch fluid retention early and alert family or clinical providers.",
          },
          {
            title: "Cardiac-Friendly Culinary Prep",
            description:
              "Cooking flavorful, low-sodium meals from scratch and reading nutrition labels carefully during grocery shopping.",
          },
          {
            title: "Medication & Diuretic Schedule Support",
            description:
              "Ensuring cardiac medications are taken consistently and coordinating bathroom safety when diuretics are active.",
          },
          {
            title: "Paced Activity & Fatigue Management",
            description:
              "Handling heavy chores like laundry, stairs, and housekeeping so clients conserve energy for recovery.",
          },
        ],
        whoItHelps: [
          "Adults managing Congestive Heart Failure (CHF), arrhythmias, or coronary artery disease",
          "Patients recovering at home after bypass surgery, stent placement, or valve repair",
        ],
        faqs: [
          {
            question: "How does Genix help reduce cardiac hospital readmissions?",
            answer:
              "By tracking daily weight changes, swelling, medication adherence, and sodium intake—the top preventable triggers for cardiac readmissions.",
          },
        ],
      },
      {
        slug: "after-a-stroke",
        title: "Post-Stroke Recovery & Rehabilitation Support",
        shortTitle: "After A Stroke",
        categorySlug: "specialized-care",
        categoryName: "Specialized Care",
        summary:
          "Dedicated post-stroke home care supporting one-sided weakness, speech recovery, safe transfers, and daily rehabilitation milestones.",
        heroDescription:
          "The weeks and months following a stroke are critical for regaining function and confidence. Genix provides skilled, encouraging in-home support that bridges hospital rehabilitation and independent living.",
        image: "/assets/services/After A Stroke Page Image.webp",
        secondaryImage: "/assets/services/Genix M Staffing S Specialized Medical Three.webp",
        clinicalHighlights: [
          "Safe transfer assistance for hemiparesis (one-sided weakness)",
          "Repetitive daily practice of PT, OT, and speech therapy exercises",
          "Dysphagia (swallowing safety) awareness and adaptive dining",
          "Emotional encouragement to combat post-stroke frustration",
        ],
        whatIsIncluded: [
          {
            title: "Safe Transfers & Gait Support",
            description:
              "Trained assistance with bed-to-wheelchair transfers, shower benches, and walking stability.",
          },
          {
            title: "Rehabilitation Homework Partner",
            description:
              "Helping clients complete daily range-of-motion, grip, and speech exercises prescribed by their rehab team.",
          },
          {
            title: "One-Handed ADL Assistance",
            description:
              "Supporting bathing, grooming, and dressing while encouraging the client to safely engage their affected side.",
          },
          {
            title: "Transportation to Outpatient Therapy",
            description:
              "Reliable door-to-door accompaniment to neurology and physical therapy appointments across Metro Atlanta.",
          },
        ],
        whoItHelps: [
          "Stroke survivors transitioning home from inpatient rehabilitation",
          "Individuals managing long-term mobility or speech changes after a TIA or stroke",
        ],
        faqs: [
          {
            question: "Can Genix coordinate directly with our home health physical therapist?",
            answer:
              "Yes! Our Strategic Care Coordination model aligns our daily care schedule and exercises directly with your PT, OT, and speech therapists.",
          },
        ],
      },
      {
        slug: "cancer-care-support",
        title: "Compassionate Cancer Care & Oncology Support",
        shortTitle: "Cancer",
        categorySlug: "specialized-care",
        categoryName: "Specialized Care",
        summary:
          "Gentle, infection-conscious in-home support for individuals undergoing chemotherapy, radiation, immunotherapy, or oncology recovery.",
        heroDescription:
          "Cancer treatment takes an immense physical and emotional toll on both patients and families. Genix provides sanitized, restful, and deeply compassionate home support so you can focus entirely on healing.",
        image: "/assets/services/Cancer Care Support Page Image.webp",
        secondaryImage: "/assets/services/Genix M Staffing S Specialized Medical Four.webp",
        clinicalHighlights: [
          "Infection-control protocols for immunocompromised clients",
          "Nausea-friendly, nutrient-dense small meal and hydration support",
          "Accompaniment and comfort during chemotherapy or radiation visits",
          "Complete household management so the patient can rest",
        ],
        whatIsIncluded: [
          {
            title: "Sanitized, Restful Home Environment",
            description:
              "Metaculous housekeeping, linen changes, and infection-conscious hygiene practices to protect weakened immune systems.",
          },
          {
            title: "Appetite & Hydration Support",
            description:
              "Preparing gentle smoothies, broths, and favorite comfort foods tailored around treatment-related taste or nausea changes.",
          },
          {
            title: "Treatment Transportation & Advocacy",
            description:
              "Driving to oncology centers (Winship, Piedmont, Northside, Grady, etc.), taking notes, and ensuring a safe return home.",
          },
          {
            title: "Fatigue & Personal Care Relief",
            description:
              "Gentle assistance with bathing, dressing, and medication tracking when treatment fatigue sets in.",
          },
        ],
        whoItHelps: [
          "Patients undergoing active chemotherapy, radiation, or surgical oncology recovery",
          "Families needing reliable support during treatment weeks",
        ],
        faqs: [
          {
            question: "Are caregivers trained in infection control for immunocompromised patients?",
            answer:
              "Yes. We follow strict hand hygiene, masking (when requested), and home sanitization standards to protect oncology patients.",
          },
        ],
      },
      {
        slug: "end-of-life-care",
        title: "Dignified End-of-Life & Palliative Home Support",
        shortTitle: "End-Of-Life Care",
        categorySlug: "specialized-care",
        categoryName: "Specialized Care",
        summary:
          "Peaceful, comfort-focused bedside care working alongside hospice teams to honor your loved one's dignity and support your family.",
        heroDescription:
          "During life's most sacred chapters, families deserve to simply be present as sons, daughters, and spouses—rather than exhausted caregivers. Genix works hand-in-hand with your hospice provider to deliver continuous bedside comfort and peace.",
        image: "/assets/services/End of Life Care Page Image.webp",
        secondaryImage: "/assets/services/Genix MSS End-of-Life Support Image.webp",
        clinicalHighlights: [
          "Seamless collaboration with local hospice nurses and physicians",
          "Gentle repositioning, mouth care, skin care, and comfort measures",
          "Continuous 24/7 bedside presence so no one is ever alone",
          "Compassionate emotional and practical support for the entire family",
        ],
        whatIsIncluded: [
          {
            title: "Continuous Bedside Comfort Care",
            description:
              "Gentle turning, pillow positioning, soothing skin care, oral swabs, and maintaining a serene, peaceful room.",
          },
          {
            title: "Hospice Team Coordination",
            description:
              "Monitoring comfort levels and immediately notifying hospice nurses when pain or symptom adjustments are needed.",
          },
          {
            title: "Household & Visitor Support",
            description:
              "Managing laundry, light meals, and household tidiness so visiting family members can focus on meaningful time together.",
          },
          {
            title: "Overnight Vigil & Family Relief",
            description:
              "Staying awake by the bedside through the night so exhausted family members can sleep knowing they will be woken if needed.",
          },
        ],
        whoItHelps: [
          "Individuals enrolled in home hospice or palliative care",
          "Families seeking 8-to-24-hour bedside support to supplement periodic hospice nurse visits",
        ],
        faqs: [
          {
            question: "Does hospice cover 24-hour caregiving at home?",
            answer:
              "Standard hospice provides periodic nurse visits and equipment, while Genix provides the continuous hours of hands-on bedside caregiving that keep your loved one comfortable around the clock.",
          },
        ],
      },
      {
        slug: "hospital-to-home",
        title: "Hospital-to-Home Transitional Care",
        shortTitle: "Hospital To Home",
        categorySlug: "specialized-care",
        categoryName: "Specialized Care",
        summary:
          "Structured post-discharge transitional care that bridges hospital discharge and full recovery at home, preventing costly readmissions.",
        heroDescription:
          "The first 72 hours to 30 days after leaving the hospital are the most vulnerable period in recovery. Genix Hospital-to-Home Care coordinates discharge instructions, prescriptions, follow-up appointments, and home safety from day one.",
        image: "/assets/services/Hospital to Home Care.webp",
        secondaryImage: "/assets/services/Genix MSS Post-Hospital Image.webp",
        clinicalHighlights: [
          "Pre-discharge planning with hospital case managers and social workers",
          "Pharmacy pickup, home preparation, and grocery stocking on discharge day",
          "Strict adherence to discharge instructions and red-flag symptom monitoring",
          "Follow-up physician and physical therapy transportation",
        ],
        whatIsIncluded: [
          {
            title: "Safe Discharge Day Transition",
            description:
              "Meeting you at discharge, picking up new prescriptions, preparing the bedroom, and settling the patient safely at home.",
          },
          {
            title: "Discharge Plan & Medication Reconciliation",
            description:
              "Organizing new medication schedules, wound care reminders, and dietary restrictions outlined by the hospital.",
          },
          {
            title: "Mobility, Bathing & Surgical Recovery Support",
            description:
              "Preventing falls while weakened from hospitalization and assisting safely with incision-conscious showering and dressing.",
          },
          {
            title: "Follow-Up Appointment Escort",
            description:
              "Ensuring the crucial 7-day and 14-day post-discharge doctor visits are attended on time.",
          },
        ],
        whoItHelps: [
          "Patients discharging from Piedmont, Wellstar, Grady, Northside, Emory, or rehab facilities",
          "Adults recovering from orthopedic joint replacement, abdominal surgery, pneumonia, or sepsis",
        ],
        faqs: [
          {
            question: "Can Genix start care the same day my loved one is discharged?",
            answer:
              "Yes. Call us as soon as a discharge date is discussed—we coordinate directly with hospital discharge planners to have a caregiver ready at home.",
          },
        ],
      },
    ],
  },
  {
    slug: "daily-activities",
    title: "Daily Activities",
    cardHeadline: "DAILY ACTIVITIES",
    cardSubtitle: "Comprehensive Assistance With Daily Living:",
    description:
      "Dignified, hands-on support with Activities of Daily Living (ADLs) and Instrumental Activities of Daily Living (IADLs) to keep everyday life safe, nutritious, and joyful.",
    heroImage: "/assets/services/Daily Activities Home Page Image.webp",
    cardImage: "/assets/services/Genix MSS Homepage In-Home Daily Living Services Image.webp",
    iconName: "HeartHandshake",
    highlights: [
      "Companionship",
      "Cognitive Engagement",
      "Personal Care and Hygiene",
      "Medication Reminders",
      "Transport and Errands",
      "Activities and Social Connection",
      "Light Housekeeping",
      "Meal Prep and Nutrition",
    ],
    subServices: [
      {
        slug: "cognitive-engagement",
        title: "Cognitive Engagement & Therapeutic Activities",
        shortTitle: "Cognitive Engagement",
        categorySlug: "daily-activities",
        categoryName: "Daily Activities",
        summary:
          "Purposeful daily mental stimulation, creative hobbies, and structured therapeutic activities that keep the mind sharp and spirits lifted.",
        heroDescription:
          "Mental vitality thrives on curiosity, purpose, and daily engagement. Genix designs personalized cognitive activity plans that transform passive screen time into joyful, brain-stimulating days.",
        image: "/assets/services/Cognitive Engagement Page Image.webp",
        secondaryImage: "/assets/services/Genix MSS Cognitive Stimulation and Therapeutic Activities Services Image.webp",
        clinicalHighlights: [
          "Customized around lifelong career interests, hobbies, and skill levels",
          "Supports memory retention, focus, and positive circadian rhythms",
          "Combines creative arts, trivia, music, and reminiscence",
          "Tracked daily so families can see what activities bring the most joy",
        ],
        whatIsIncluded: [
          {
            title: "Brain Games, Puzzles & Word Challenges",
            description:
              "Crosswords, Sudoku, jigsaw puzzles, strategy games, and memory cards tailored to the client's sweet spot of challenge.",
          },
          {
            title: "Music, Art & Creative Expression",
            description:
              "Curated playlists, painting, scrapbooking, knitting, or culinary projects that engage the senses.",
          },
          {
            title: "Life Story & Legacy Projects",
            description:
              "Organizing family photographs, recording oral histories, or compiling favorite family recipes.",
          },
          {
            title: "Current Events & Book Discussions",
            description:
              "Reading morning newspapers, magazines, or novels together and discussing topics of interest.",
          },
        ],
        whoItHelps: [
          "Seniors spending too many hours alone watching television",
          "Individuals seeking proactive brain health and mental stimulation",
        ],
        faqs: [
          {
            question: "What if my parent is hesitant to participate in activities at first?",
            answer:
              "Our caregivers start naturally by tapping into what your parent already loves—whether that is classic sports, gardening, jazz music, or sorting family tools—building trust organically.",
          },
        ],
      },
      {
        slug: "personal-care-and-hygiene",
        title: "Personal Care, Bathing & Hygiene Assistance",
        shortTitle: "Personal Care and Hygiene",
        categorySlug: "daily-activities",
        categoryName: "Daily Activities",
        summary:
          "Respectful, privacy-conscious assistance with bathing, showering, grooming, dressing, toileting, and personal hygiene.",
        heroDescription:
          "The bathroom is the number-one location for household falls, yet accepting help with personal hygiene can feel sensitive. Genix caregivers approach every personal care routine with clinical skill, warmth, and the utmost respect for modesty and dignity.",
        image: "/assets/services/Genix MSS Personal Care and Hygiene Service Image.webp",
        secondaryImage: "/assets/services/Bathing and Hygiene Page Image.png",
        clinicalHighlights: [
          "Safe shower transfers, bath bench setup, and non-slip vigilance",
          "Dignity-preserving towel draping and privacy techniques",
          "Skin integrity checks, lotion application, and diabetic foot awareness",
          "Complete grooming, oral care, hair styling, and dressing support",
        ],
        whatIsIncluded: [
          {
            title: "Safe Showering, Tub & Bed Baths",
            description:
              "Steady physical support entering and exiting the shower, water temperature checks, and gentle washing.",
          },
          {
            title: "Grooming, Hair, Shaving & Oral Hygiene",
            description:
              "Brushing teeth or dentures, shaving with electric razors, hair washing/styling, and nail filing so clients feel fresh and confident.",
          },
          {
            title: "Dressing & Wardrobe Selection",
            description:
              "Helping clients choose weather-appropriate outfits and assisting with buttons, zippers, compression stockings, and footwear.",
          },
          {
            title: "Continence & Toileting Support",
            description:
              "Discreet, compassionate assistance with bathroom trips, commodes, incontinence briefs, and perineal skin care.",
          },
        ],
        whoItHelps: [
          "Seniors afraid of slipping in the shower or tub",
          "Individuals with arthritis, stroke weakness, or post-surgical mobility limits",
          "Adult children who prefer a professional handle intimate bathing routines for a parent",
        ],
        faqs: [
          {
            question: "How do caregivers make a modest parent comfortable with bathing help?",
            answer:
              "We match caregiver gender preferences, use warm towels for privacy draping, explain every step beforehand, and encourage the client to wash what they can independently.",
          },
        ],
      },
      {
        slug: "medication-reminders",
        title: "Timely Medication Reminders & Routine Tracking",
        shortTitle: "Medication Reminders",
        categorySlug: "daily-activities",
        categoryName: "Daily Activities",
        summary:
          "Reliable daily medication cueing, hydration pairing, and adherence logging to prevent missed doses or accidental double-dosing.",
        heroDescription:
          "Managing multiple prescriptions with different schedules and food instructions is one of the biggest challenges of aging at home. Genix provides structured medication reminders and real-time documentation so every regimen stays on track.",
        image: "/assets/services/Medication Reminders Page Image.png",
        secondaryImage: "/assets/services/Medication Reminder Service.png",
        clinicalHighlights: [
          "Prevents missed doses and dangerous medication mix-ups",
          "Coordinates 'take with food' or 'empty stomach' meal timing",
          "Monitors for new side effects, dizziness, or appetite changes",
          "Alerts family when prescription refills are running low",
        ],
        whatIsIncluded: [
          {
            title: "Scheduled Visual & Verbal Reminders",
            description:
              "Prompting clients at exact prescribed times for morning, midday, evening, and bedtime medications.",
          },
          {
            title: "Meal & Hydration Pairing",
            description:
              "Providing a full glass of water or appropriate snack so medications are taken safely and comfortably.",
          },
          {
            title: "Container & Pillbox Assistance",
            description:
              "Helping open child-proof caps or blister packs for clients with arthritis or hand weakness.",
          },
          {
            title: "Digital Adherence & Refill Logging",
            description:
              "Recording every completed reminder in the care log and notifying family ahead of pharmacy refill dates.",
          },
        ],
        whoItHelps: [
          "Seniors managing complex multi-prescription regimens",
          "Individuals with mild memory slips who forget whether they took their morning pills",
        ],
        faqs: [
          {
            question: "What if we also need skilled nursing medication setup?",
            answer:
              "Genix can coordinate licensed nurses (RN/LPN) to set up weekly pill organizers alongside daily caregiver reminders.",
          },
        ],
      },
      {
        slug: "transport-and-errands",
        title: "Safe Transportation, Errands & Doctor's Appointments",
        shortTitle: "Transport and Errands",
        categorySlug: "daily-activities",
        categoryName: "Daily Activities",
        summary:
          "Door-through-door accompanied transportation for medical appointments, pharmacy runs, grocery shopping, and social outings.",
        heroDescription:
          "Giving up the car keys shouldn't mean giving up freedom or missing vital healthcare visits. Unlike standard rideshares that drop at the curb, Genix provides true 'door-through-door' accompaniment.",
        image: "/assets/services/Shopping, Errands, and Transportation Page Image.png",
        secondaryImage: "/assets/services/Doctors Appointments Page Image.png",
        clinicalHighlights: [
          "Door-through-door physical assistance from living room to exam room",
          "Note-taking during physician consultations for family transparency",
          "Full grocery shopping, pharmacy pickup, and dry-cleaning errands",
          "Fully vetted, insured drivers with clean driving records",
        ],
        whatIsIncluded: [
          {
            title: "Accompanied Medical & Dental Visits",
            description:
              "Helping the client dress, assisting them into the vehicle, checking in at the clinic, taking doctor notes, and escorting them safely back home.",
          },
          {
            title: "Grocery Shopping & Put-Away",
            description:
              "Shopping together or picking up groceries from a list, carrying bags inside, and organizing fresh items in the refrigerator.",
          },
          {
            title: "Pharmacy & Prescription Pickups",
            description:
              "Promptly collecting prescriptions, medical supplies, and over-the-counter essentials.",
          },
          {
            title: "Personal & Lifestyle Outings",
            description:
              "Rides to hair salons, barber shops, places of worship, senior centers, and family gatherings.",
          },
        ],
        whoItHelps: [
          "Seniors who no longer drive or avoid Atlanta highway traffic",
          "Adult children who cannot take off work for every parent doctor visit",
        ],
        faqs: [
          {
            question: "Will the caregiver stay with my parent during the doctor's appointment?",
            answer:
              "Yes! Our caregivers accompany your parent into the waiting and exam rooms (as desired), write down the doctor's summary, and pick up any new prescriptions on the way home.",
          },
        ],
      },
      {
        slug: "activities-and-social-connection",
        title: "Activities, Community & Social Connection",
        shortTitle: "Activities and Social Connection",
        categorySlug: "daily-activities",
        categoryName: "Daily Activities",
        summary:
          "Supporting active participation in community life, faith groups, family celebrations, and meaningful social connections.",
        heroDescription:
          "Staying woven into the fabric of community and family life is one of the strongest predictors of healthy aging. Genix helps clients participate confidently in the outings, clubs, and traditions they love.",
        image: "/assets/services/Social Connection Page Image.webp",
        secondaryImage: "/assets/services/Genix MSS Community and Social Participation Image.webp",
        clinicalHighlights: [
          "Reduces loneliness and promotes emotional resilience",
          "Safe mobility and stamina support during community events",
          "Encourages outdoor recreation and senior center participation",
          "Helps hosts prepare for visiting family and grandchildren",
        ],
        whatIsIncluded: [
          {
            title: "Community & Faith Outings",
            description:
              "Accompanying clients to church services, community centers, botanical gardens, museums, or local parks.",
          },
          {
            title: "Family Event Companion Support",
            description:
              "Attending weddings, graduations, or holiday dinners to handle mobility, restroom trips, and pacing so the whole family can celebrate.",
          },
          {
            title: "Technology & Video Call Assistance",
            description:
              "Setting up FaceTime, Zoom, tablets, and digital photo frames to stay in daily touch with loved ones.",
          },
          {
            title: "At-Home Social Hosting",
            description:
              "Preparing tea, snacks, and a tidy living room so friends and neighbors can visit comfortably.",
          },
        ],
        whoItHelps: [
          "Socially active seniors who need a steady arm or driver to attend events",
          "Homebound older adults wanting more connection with family and neighbors",
        ],
        faqs: [
          {
            question: "Can a caregiver accompany my parent to a family wedding or reunion?",
            answer:
              "Yes—this is one of our most popular requests. A caregiver ensures your parent can attend safely and return home whenever they get tired.",
          },
        ],
      },
      {
        slug: "light-housekeeping",
        title: "Light Housekeeping, Laundry & Home Organization",
        shortTitle: "Light Housekeeping",
        categorySlug: "daily-activities",
        categoryName: "Daily Activities",
        summary:
          "Maintaining a clean, sanitary, clutter-free, and hazard-free home environment that promotes health and pride of place.",
        heroDescription:
          "A clean, organized home isn't just about comfort—it's critical for infection prevention, respiratory health, and fall safety. Genix handles daily domestic upkeep with care and attention to detail.",
        image: "/assets/services/Genix MSS Domestic Assistance Service Image.webp",
        secondaryImage: "/assets/services/Housekeeping Page Image.png",
        clinicalHighlights: [
          "Eliminates trip hazards, clutter, and slippery surfaces",
          "Fresh bed linens and sanitized kitchens/bathrooms",
          "Mail sorting, paperwork organization, and package handling",
          "Respects the client's personal belongings and organizational preferences",
        ],
        whatIsIncluded: [
          {
            title: "Kitchen & Bathroom Sanitization",
            description:
              "Washing dishes, wiping counters, cleaning appliances, sanitizing sinks, and keeping bathroom floors dry and safe.",
          },
          {
            title: "Laundry, Ironing & Fresh Linens",
            description:
              "Washing, drying, folding, and putting away clothes, plus regularly changing and making bed sheets.",
          },
          {
            title: "Vacuuming, Dusting & Floor Care",
            description:
              "Keeping high-traffic walkways, living rooms, and bedrooms clean, dust-free, and clear of cords or clutter.",
          },
          {
            title: "Mail, Paperwork & Trash Management",
            description:
              "Bringing in the mail, organizing important letters for family review, watering plants, and taking out trash/recycling.",
          },
        ],
        whoItHelps: [
          "Seniors for whom bending, lifting laundry baskets, or scrubbing has become unsafe",
          "Clients recovering from surgery or illness who need a spotless environment",
        ],
        faqs: [
          {
            question: "Do caregivers also help organize mail and household paperwork?",
            answer:
              "Yes. We sort incoming mail, discard obvious junk mail with permission, and neatly organize bills and medical statements in a designated folder for you or your family.",
          },
        ],
      },
      {
        slug: "meal-prep-and-nutrition",
        title: "Custom Meal Preparation & Senior Nutrition",
        shortTitle: "Meal Prep and Nutrition",
        categorySlug: "daily-activities",
        categoryName: "Daily Activities",
        summary:
          "Wholesome, freshly cooked meals and hydration management tailored to medical diets, cultural traditions, and personal tastes.",
        heroDescription:
          "Proper nutrition and hydration are the foundation of physical strength, wound healing, and cognitive clarity. Genix caregivers turn mealtime back into a nourishing, enjoyable highlight of the day.",
        image: "/assets/services/Meal Prep Page Image.png",
        secondaryImage: "/assets/services/Meal Prep Service.png",
        clinicalHighlights: [
          "Tailored to diabetic, low-sodium cardiac, renal, or soft/pureed diets",
          "Proactive daily hydration encouragement to prevent UTIs and dizziness",
          "Food safety checks for expired items in the refrigerator",
          "Warm mealtime companionship that boosts appetite",
        ],
        whatIsIncluded: [
          {
            title: "Fresh Breakfast, Lunch & Dinner Cooking",
            description:
              "Preparing warm, balanced meals from scratch using fresh ingredients and the client's favorite recipes.",
          },
          {
            title: "Batch Prep & Labeled Refrigerator Meals",
            description:
              "Preparing and clearly labeling nutritious meals and snacks for hours when a caregiver is not on-site.",
          },
          {
            title: "Hydration & Electrolyte Tracking",
            description:
              "Offering water, herbal teas, fruit, and hydrating beverages throughout the day—especially important during Georgia summers.",
          },
          {
            title: "Feeding Assistance & Kitchen Cleanup",
            description:
              "Respectful dining assistance if needed, followed by complete dishwashing and kitchen cleanup.",
          },
        ],
        whoItHelps: [
          "Seniors skipping meals or relying on processed frozen foods",
          "Individuals with diabetes, heart disease, weight loss, or swallowing difficulties",
        ],
        faqs: [
          {
            question: "Can caregivers cook according to a doctor's specific dietary plan?",
            answer:
              "Absolutely. Whether your physician recommends a low-sodium DASH diet, carbohydrate-controlled diabetic meals, or mechanical soft textures, we follow those guidelines closely.",
          },
        ],
      },
      {
        slug: "transfer-and-posture",
        title: "Safe Mobility, Transfer & Posture Assistance",
        shortTitle: "Transfer and Posture",
        categorySlug: "daily-activities",
        categoryName: "Daily Activities",
        summary:
          "Positioning, ergonomic transfers, gait assistance, and posture support that improve digestion, circulation, and fall prevention.",
        heroDescription:
          "Positioning—in addition to helping our clients with regular movement around the home or around town—concentrates on making sure each client maintains proper posture for eating, reading, or resting. This helps with digestion, circulation, and skin health, alongside safe assistance getting in and out of bed or the bathroom.",
        image: "/assets/services/Transfer & Posture Page Image.png",
        secondaryImage: "/assets/services/Continence Page Image.png",
        clinicalHighlights: [
          "Trained in ergonomic body mechanics, gait belts, and Hoyer lifts",
          "Proper upright positioning during meals to aid digestion and prevent aspiration",
          "Scheduled repositioning to boost circulation and prevent pressure sores",
          "Safe transitions between bed, recliner, wheelchair, shower, and car",
        ],
        whatIsIncluded: [
          {
            title: "Bed, Chair & Bathroom Transfers",
            description:
              "Steady, confident physical support during the highest-risk moments of standing up, pivoting, and sitting down.",
          },
          {
            title: "Ergonomic Posture & Pillow Support",
            description:
              "Ensuring clients maintain healthy upright posture while eating, reading, or watching television to support breathing and digestion.",
          },
          {
            title: "Walkers, Wheelchairs & Mechanical Lifts",
            description:
              "Skilled handling of rollators, wheelchairs, transfer boards, sit-to-stand lifts, and Hoyer lifts.",
          },
          {
            title: "Circulation & Range-of-Motion Walks",
            description:
              "Encouraging safe, regular movement around the home to prevent joint stiffness and blood clots.",
          },
        ],
        whoItHelps: [
          "Clients with weakness, balance instability, or wheelchair dependency",
          "Seniors recovering from hip/knee surgery or prolonged bed rest",
        ],
        faqs: [
          {
            question: "Are Genix caregivers trained to use Hoyer lifts and gait belts?",
            answer:
              "Yes. We match clients requiring mechanical lifts or hands-on transfers with caregivers specifically trained and competency-verified in safe transfer mechanics.",
          },
        ],
      },
    ],
  },
];

export function getAllSubServices(): SubService[] {
  return SERVICE_PILLARS.flatMap((pillar) => pillar.subServices);
}

export function getPillarBySlug(slug: string): ServicePillar | undefined {
  return SERVICE_PILLARS.find((p) => p.slug === slug);
}

export function getSubServiceBySlugs(
  categorySlug: string,
  serviceSlug: string
): SubService | undefined {
  const pillar = getPillarBySlug(categorySlug);
  if (!pillar) return undefined;
  return pillar.subServices.find((s) => s.slug === serviceSlug);
}


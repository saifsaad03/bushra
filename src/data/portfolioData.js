/**
 * SAMIHA BUSHRA — MEDICAL & ART PORTFOLIO CONFIGURATION
 */

export const initialPortfolioData = {
  personal: {
    fullName: "Samiha Bushra",
    nickname: "Bushra",
    title: "Future Physician in the Making ♡ & Artist at Heart",
    shortBio: "Healing lives through science and empathy; capturing the quiet poetry of life through sketches and colors. Learning to care, one chapter at a time.",
    statusLabel: "MBBS JOURNEY · IN PROGRESS",
    handwrittenAnnotation: "One day, Dr. Samiha ♡",
    avatar: "/images/avatar.jpg",
    bannerImage: "/assets/banner.jpg",
    bannerCaption: "Where Medicine Meets Art 🩺🎨 · The Studio of a Future Healer",
    quote: "Art teaches the eyes to observe; medicine teaches the heart to heal.",
  },

  // Medical Journey Visual Progress (100% / 5 Years = 20% per year)
  journey: {
    heading: "My Medical Journey",
    subheading: "The Journey to Dr. Samiha",
    totalYears: 5,
    currentPercentage: 20, // 20% = 1st year done, 2nd year in progress
    currentYearLabel: "Year 02 · Pre-Clinical to Clinical Transition",
    statusNote: "Phase I (Anatomy, Physiology & Biochemistry) Conquered ♡",
    stages: [
      { year: "Year 01", label: "Foundations & Dissection Hall", percent: 20, done: true },
      { year: "Year 02", label: "Pharmacology & Pathology Foundations", percent: 40, done: false, active: true },
      { year: "Year 03", label: "Microbiology & Community Health", percent: 60, done: false },
      { year: "Year 04", label: "Medicine, Surgery & Gynae Clerkships", percent: 80, done: false },
      { year: "Year 05", label: "Rotational Internship & Hippocratic Oath", percent: 100, done: false },
    ]
  },

  // Her Art Studio (Glimpses of the Journey - Autosliding + Clickable Showcase)
  artworks: [
    {
      id: 1,
      title: "The Anatomy of a Heart in Bloom",
      medium: "Watercolor & Fine-line Ink",
      year: "2026",
      image: "/images/medical_flatlay.jpg",
      description: "Anatomical ventricles intertwined with soft blush peonies and wild eucalyptus. Dedicated to every heartbeat that fights to survive.",
      category: "Medical Art"
    },
    {
      id: 2,
      title: "Late Night Anatomy Notes & Cappuccino",
      medium: "Pastel Gouache & Digital Wash",
      year: "2026",
      image: "/images/avatar.jpg",
      description: "Capturing the serene solitude of 2:00 AM study sessions, memorizing cranial nerves surrounded by warm amber desk light.",
      category: "Study Journal"
    },
    {
      id: 3,
      title: "A Stethoscope Waiting for its Calling",
      medium: "Soft Acrylic & Pencil on Canvas",
      year: "2025",
      image: "/images/scrubs.jpg",
      description: "A rose gold Littmann stethoscope resting quietly on folded lilac scrubs beside fresh baby's breath blossoms.",
      category: "Still Life"
    }
  ],

  about: {
    heading: "A Little About Me",
    supportingLine: "Medical student by day, sketch artist by heart.",
    introParagraphs: [
      "Welcome to my little digital haven. I am an MBBS student walking the demanding yet deeply fulfilling road to becoming a physician. Alongside my medical studies, drawing and painting are where I breathe, reflect, and capture the quiet poetry of life.",
      "To me, medicine and art are sister disciplines: both require sharp observation, delicate hands, endless patience, and above all, deep empathy for the human experience."
    ],
    details: [
      { label: "Current Focus", value: "2nd Year MBBS · Clinical Correlations" },
      { label: "Creative Passions", value: "Medical Illustrations, Botanical Watercolors" },
      { label: "Core Values", value: "Kindness, Curiosity & Quiet Resilience" },
      { label: "Studio Comfort", value: "Rainy afternoons, acoustic playlists & herbal tea" }
    ]
  },

  // Academic Foundations (Includes SSC, HSC, MBBS)
  education: {
    heading: "Academic Foundations",
    supportingLine: "The stepping stones that anchor the dream of becoming a physician.",
    items: [
      {
        degree: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
        institution: "[Medical College / University Name]",
        period: "Class of ~2030 (4 Years Ahead)",
        status: "Currently in 2nd Year (20% Completed)",
        description: "Pursuing rigorous 5-year medical curriculum followed by 1-year mandatory rotational clinical internship. Conquered Phase I exams with dedication.",
        isCurrent: true,
        tag: "In Progress 🩺"
      },
      {
        degree: "Higher Secondary Certificate (HSC) / Pre-Medical",
        institution: "[Add College / Institution Name]",
        period: "Completed with Distinction",
        status: "Graduated with Honors",
        description: "Concentrated science curriculum with high distinction in Biology, Chemistry, and Physics. Solidified the childhood aspiration to serve in healthcare.",
        isCurrent: false,
        tag: "GPA 5.0 / Golden 🌟"
      },
      {
        degree: "Secondary School Certificate (SSC)",
        institution: "[Add High School Name]",
        period: "Completed with Excellence",
        status: "Graduated with Distinction",
        description: "Strong foundational academic record in general sciences and mathematics that laid the groundwork for pre-medical discipline and scientific curiosity.",
        isCurrent: false,
        tag: "GPA 5.0 🎓"
      }
    ]
  },

  // Skills & Clinical Competencies
  skills: {
    heading: "Skills & Competencies",
    supportingLine: "Medical knowledge, clinical touch, and artistic vision blended together.",
    categories: [
      {
        name: "Medical & Pre-Clinical",
        icon: "Microscope",
        items: [
          { name: "Anatomical Dissection", level: "Skilled" },
          { name: "Histology Slide Identification", level: "Proficient" },
          { name: "Physiological Concept Modeling", level: "Solid" },
          { name: "Medical Terminology Mastery", level: "Advanced" }
        ]
      },
      {
        name: "Clinical & Practical Touch",
        icon: "HeartHandshake",
        items: [
          { name: "Vital Signs & Blood Pressure", level: "Trained" },
          { name: "Patient History Taking", level: "Practicing" },
          { name: "Basic Life Support (BLS)", level: "Certified" },
          { name: "Auscultation & Stethoscope Skills", level: "Developing" }
        ]
      },
      {
        name: "Artistic & Creative Vision",
        icon: "Palette",
        items: [
          { name: "Medical & Anatomical Illustration", level: "Passionate" },
          { name: "Botanical Watercolor Painting", level: "Advanced" },
          { name: "Visual Study Guides & Infographics", level: "Creative" },
          { name: "Fine-Line Ink Sketching", level: "Expressive" }
        ]
      },
      {
        name: "Humanistic Strengths",
        icon: "Sparkles",
        items: [
          { name: "Empathetic Communication", level: "Core Strength" },
          { name: "Patience & Calm Composure", level: "High" },
          { name: "Meticulous Attention to Detail", level: "Natural" },
          { name: "Diligence Under Pressure", level: "Growing Daily" }
        ]
      }
    ]
  },

  // A Gentle Glimpse (Redesigned Scrapbook & Personal Corner)
  personalCorner: {
    heading: "A Gentle Glimpse",
    supportingLine: "Little comforts, favorite petals, and quiet inspirations that make me, me.",
    cards: [
      {
        tag: "Studio Comfort",
        title: "Pencils & Palettes",
        icon: "🎨",
        content: "Winsor & Newton watercolor pigments, 0.05 Sakura micron pens, and rough-grain sketchbooks filled with anatomical doodles and wild florals.",
        tapeColor: "rgba(232, 143, 164, 0.55)",
        tilt: "-1.5deg"
      },
      {
        tag: "Pages that Heal",
        title: "Comfort Reads",
        icon: "📖",
        content: "‘When Breath Becomes Air’ by Paul Kalanithi, Oliver Sacks essays, and gentle poetry books read on quiet Sunday mornings with hot cinnamon tea.",
        tapeColor: "rgba(157, 132, 183, 0.55)",
        tilt: "1.5deg"
      },
      {
        tag: "Botanical Soul",
        title: "Gentle Petals",
        icon: "🌷",
        content: "Blush pink tulips, white baby's breath, and tiny eucalyptus leaves dried and carefully tucked between heavy chapters of Netter's Anatomy Atlas.",
        tapeColor: "rgba(122, 154, 120, 0.55)",
        tilt: "-1deg"
      },
      {
        tag: "Daily Rhythm",
        title: "The Quiet Hour",
        icon: "☕",
        content: "Early mornings before hospital wards wake up—hot vanilla latte, soft acoustic cello music, and fifteen quiet minutes of gratitude.",
        tapeColor: "rgba(226, 167, 111, 0.55)",
        tilt: "2deg"
      }
    ],
    favoriteQuote: "“Wherever the art of Medicine is loved, there is also a love of Humanity.”",
    quoteAuthor: "Hippocrates"
  }
};

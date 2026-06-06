/* =============================================================================
   AZ GenAI Guidance — Companion data
   Single source of content for the website (index.html) and the document (doc.html).
   ALL page numbers verified against the v26.01 PDF's own Table of Contents.
   Edit text here; the design lives in styles.css. Everything is plain data so a
   designer or editor can update it without touching app logic.
   ============================================================================= */
window.AZ_DATA = {
  meta: {
    title: "Generative Artificial Intelligence in K-12 Education",
    subtitle: "Guidance for Arizona Schools and School Systems",
    tagline: "A Call for AI Literacy",
    version: "26.01",
    versionDate: "June 2026",
    baselineVersion: "25.01",
    baselineDate: "May 2025",
    pages: 41,
    // Every "open the guidance" link points here (the official live link).
    pdfUrl: "https://azk12.ai",
    publisher: "Arizona Institute for Education & the Economy, Northern Arizona University",
    // Shared baseline every role reads first.
    startHere: [
      { label: "Introduction & Orientation", pages: "6" },
      { label: "Understanding GenAI", pages: "8–9" }
    ],
    stats: [
      { figure: "26.01", label: "A full rewrite (was “A Balanced Perspective”)" },
      { figure: "41", label: "pages in the new guidance" },
      { figure: "8", label: "ethical considerations (up from 5)" },
      { figure: "7", label: "role-based reading routes" }
    ],
    // Per-role overview media. Paste a YouTube / Google Drive / audio URL to enable;
    // leave blank to show a "coming soon" note (or set mediaPlaceholder:false to hide).
    mediaPlaceholder: true,
    media: {
      superintendent: { videoUrl: "", podcastUrl: "", min: "5" },
      curriculum:     { videoUrl: "", podcastUrl: "", min: "6" },
      edtech:         { videoUrl: "", podcastUrl: "", min: "6" },
      it:             { videoUrl: "", podcastUrl: "", min: "5" },
      principal:      { videoUrl: "", podcastUrl: "", min: "5" },
      operations:     { videoUrl: "", podcastUrl: "", min: "4" },
      teachers:       { videoUrl: "", podcastUrl: "", min: "5" }
    },
    // Optional usage analytics (Supabase). Fill both to enable; blank = disabled (no-op).
    analytics: { supabaseUrl: "", supabaseAnonKey: "", table: "events" }
  },

  // Authentic voices pulled from the guidance — used as design callouts.
  studentQuotes: [
    { text: "I don’t use AI for my school work because it can be biased and give false information.", who: "Arizona Student, 11th Grade" }
  ],
  pullQuote: {
    text: "It is not the technology itself that determines a positive or negative outcome; what matters most is purposeful instructional design.",
    cite: "Powerful Teaching and Learning, p. 21"
  },
  state48Skills: [
    "Knowledge & Literacy", "Digital Fluency", "Critical Thinking & Problem Solving",
    "Creative & Innovative Thinking", "Self-Awareness & Management",
    "Adaptability & Lifelong Learning", "Collaboration & Communication", "Ethics & Impact"
  ],

  /* ---------------------------------------------------------------------------
     SECTIONS — the verified v26.01 structure (Explore mode + page lookups).
     level 1 = chapter, level 2 = sub-section.
     --------------------------------------------------------------------------- */
  sections: [
    { id: "intro", title: "Introduction and Orientation", pages: "6", level: 1, chapter: "Front", roles: ["superintendent","principal"], tags: ["orientation","future-ready"], summary: "Frames GenAI as “arrival technology” reshaping work, learning, and decision-making, and connects the work to the State 48 Graduate Profile.", whatsNew: "Fully rewritten around AI literacy and student future-readiness." },
    { id: "about", title: "About This Document", pages: "7", level: 1, chapter: "Front", roles: ["superintendent","edtech"], tags: ["orientation"], summary: "Explains the document’s purpose, organization, and its guiding principle of human agency and oversight.", whatsNew: "Names human agency as the throughline of the guidance." },

    { id: "understanding", title: "Understanding GenAI", pages: "8–9", level: 1, chapter: "Understanding GenAI", roles: ["superintendent","curriculum","edtech","it","principal","operations","teachers"], tags: ["explainer","ai-literacy"], summary: "Explains AI, generative AI, multimodal and reasoning models, agentic AI, model limitations, and the “chef” analogy for how outputs are shaped.", whatsNew: "Adds multimodal, reasoning, and agentic AI for 2026." },

    { id: "responsible", title: "Responsible and Ethical Implementation", pages: "10", level: 1, chapter: "Responsible & Ethical", roles: ["superintendent","it","principal","curriculum"], tags: ["guardrails","ethics"], summary: "The ethics chapter overview. Now appears before the teaching chapter and expands from five considerations to eight.", whatsNew: "Moved earlier and expanded from 5 to 8 considerations." },
    { id: "bias", title: "Consideration #1: Bias", pages: "11", level: 2, chapter: "Responsible & Ethical", roles: ["curriculum","it"], tags: ["guardrails","equity"], summary: "Data, model, and human bias, plus sycophancy in AI responses.", whatsNew: null },
    { id: "false", title: "Consideration #2: False & Misleading Content", pages: "12", level: 2, chapter: "Responsible & Ethical", roles: ["curriculum","principal"], tags: ["guardrails"], summary: "Hallucinations, synthetic and misrepresented content, and where it comes from.", whatsNew: null },
    { id: "ip", title: "Consideration #3: Intellectual Property", pages: "13", level: 2, chapter: "Responsible & Ethical", roles: ["it","curriculum"], tags: ["guardrails"], summary: "Copyright, ownership, and cultural responsibility around AI-generated work.", whatsNew: "Adds cultural responsibility." },
    { id: "privacy", title: "Consideration #4: Data and Information Privacy", pages: "14–15", level: 2, chapter: "Responsible & Ethical", roles: ["it","operations","principal"], tags: ["privacy","guardrails"], summary: "The illusion of privacy in chatbots and the data authority of Arizona’s 22 sovereign tribal nations.", whatsNew: "Adds chatbot privacy illusion and tribal data sovereignty." },
    { id: "access", title: "Consideration #5: Equitable Access", pages: "16", level: 2, chapter: "Responsible & Ethical", roles: ["curriculum","principal"], tags: ["equity"], summary: "Access gaps and accessibility (ADA/WCAG) review for AI tools.", whatsNew: null },
    { id: "wellbeing", title: "Consideration #6: Mental Well-Being", pages: "17", level: 2, chapter: "Responsible & Ethical", roles: ["principal","curriculum"], tags: ["new","wellbeing"], summary: "AI companions, anthropomorphism, sycophancy, and adolescent developmental risks.", whatsNew: "New standalone consideration." },
    { id: "environmental", title: "Consideration #7: Environmental Impact", pages: "18", level: 2, chapter: "Responsible & Ethical", roles: ["operations","curriculum"], tags: ["new"], summary: "Data-center energy and water use, with Arizona relevance and student concern.", whatsNew: "New standalone consideration." },
    { id: "cybersecurity", title: "Consideration #8: Cybersecurity", pages: "19", level: 2, chapter: "Responsible & Ethical", roles: ["it","operations"], tags: ["new","privacy"], summary: "AI-enhanced attacks, agentic attack surfaces, prompt injection, and access controls.", whatsNew: "New standalone consideration." },
    { id: "addressing", title: "Addressing Ethical Considerations", pages: "20", level: 2, chapter: "Responsible & Ethical", roles: ["superintendent","it","principal"], tags: ["guardrails"], summary: "Ten recommendations for putting the eight considerations into practice.", whatsNew: null },

    { id: "teaching", title: "Powerful Teaching and Learning", pages: "21", level: 1, chapter: "Teaching & Learning", roles: ["curriculum","edtech","teachers"], tags: ["teaching"], summary: "The teaching chapter overview, organized as three moves: the Imperative, the Practice, and the Redesign.", whatsNew: "Reorganized into Imperative / Practice / Redesign." },
    { id: "ai_literacy", title: "The Imperative: AI Literacy", pages: "22–23", level: 2, chapter: "Teaching & Learning", roles: ["superintendent","curriculum","edtech"], tags: ["ai-literacy"], summary: "Defines AI literacy and aligns Arizona AI Literacy Goals to AZ Academic Standards and the State 48 Essential Skills.", whatsNew: "New alignment to standards and State 48." },
    { id: "integration", title: "The Practice: AI Integration", pages: "24", level: 2, chapter: "Teaching & Learning", roles: ["curriculum","teachers","edtech"], tags: ["teaching"], summary: "How AI shows up in instruction, framed around designing for learner variability.", whatsNew: null },
    { id: "teacher_use", title: "Teacher Use Cases", pages: "24", level: 2, chapter: "Teaching & Learning", roles: ["teachers","edtech"], tags: ["teaching"], summary: "Concrete, classroom-ready ways teachers use AI to support planning and instruction.", whatsNew: null },
    { id: "student_use", title: "Student Use Cases", pages: "25", level: 2, chapter: "Teaching & Learning", roles: ["teachers","curriculum"], tags: ["teaching"], summary: "Ways students can use AI to learn, with human thinking kept visible.", whatsNew: null },
    { id: "risks", title: "Risks of Teacher and Student Use", pages: "26", level: 2, chapter: "Teaching & Learning", roles: ["teachers","curriculum"], tags: ["teaching","guardrails"], summary: "Where classroom AI use can go wrong and how to anticipate it.", whatsNew: null },
    { id: "classroom", title: "Responsible Classroom Use", pages: "26–28", level: 2, chapter: "Teaching & Learning", roles: ["teachers","curriculum","principal"], tags: ["teaching","guardrails"], summary: "Cognitive offloading, feedback and grading, citation and disclosure, and AI detectors — beyond a cheating frame.", whatsNew: "Broadens academic integrity into responsible use." },
    { id: "redesign", title: "The Redesign: AI Inspiration", pages: "29", level: 2, chapter: "Teaching & Learning", roles: ["teachers","curriculum"], tags: ["future-ready"], summary: "Invites authentic creation, inquiry, community-connected work, portfolios, and exhibitions.", whatsNew: "New section — the optimistic heart of the update." },

    { id: "admin", title: "School and Administrative Use", pages: "30–31", level: 1, chapter: "Administrative Use", roles: ["principal","operations","it"], tags: ["operations"], summary: "Distinguishes enhancing existing work from transforming workflows, including agentic AI and operational risks.", whatsNew: "Expanded with an Enhance / Transform frame." },

    { id: "implementation", title: "Implementation Recommendations", pages: "32–36", level: 1, chapter: "Implementation", roles: ["superintendent","edtech","principal","operations","it"], tags: ["implementation"], summary: "The “boat” framework: build cross-functional leadership, engage stakeholders, set the 3ssentials, write policy and guidelines, and invest in professional learning.", whatsNew: "Replaces the old stage model with an Arizona-specific boat framework." },
    { id: "boat1", title: "Ensure your boat is structurally sound", pages: "33", level: 2, chapter: "Implementation", roles: ["superintendent","it"], tags: ["implementation"], summary: "Leadership, position statements, and the foundations to start safely.", whatsNew: null },
    { id: "boat2", title: "Move your boat into the water", pages: "34", level: 2, chapter: "Implementation", roles: ["edtech","principal"], tags: ["implementation"], summary: "The 3ssentials: approved tools, guardrails training, and clear use expectations.", whatsNew: null },
    { id: "boat3", title: "Keep Paddling", pages: "35", level: 2, chapter: "Implementation", roles: ["edtech","superintendent"], tags: ["implementation"], summary: "Ongoing monitoring, professional learning, and adaptive governance.", whatsNew: null },

    { id: "next", title: "Conclusion and Next Steps", pages: "37", level: 1, chapter: "Closing", roles: ["superintendent","principal"], tags: ["big-picture"], summary: "Points leaders to the 3ssentials, the AI Learning Network, the State 48 Graduate Profile, and AZ Academic Standards.", whatsNew: null },
    { id: "resources", title: "Additional Resources", pages: "38", level: 1, chapter: "Closing", roles: ["edtech","curriculum","operations"], tags: ["reference"], summary: "Curated resources for AI literacy, ethics, mental well-being, privacy, PD, and family engagement.", whatsNew: null },
    { id: "references", title: "References", pages: "39–40", level: 1, chapter: "Closing", roles: [], tags: ["reference"], summary: "Full citations for the guidance.", whatsNew: null }
  ],

  /* ---------------------------------------------------------------------------
     ROLES — the 7 reading routes (Core 6 + Teachers).
     readFirst / readNext items: { label, pages }
     --------------------------------------------------------------------------- */
  roles: [
    {
      id: "superintendent",
      role: "Superintendent & Cabinet",
      short: "Superintendent",
      audience: "System leaders setting direction and public tone",
      time: "12–18 min",
      priority: "District vision, public trust, and implementation momentum",
      readFirst: [
        { label: "Introduction & Orientation", pages: "6" },
        { label: "Understanding GenAI", pages: "8–9" },
        { label: "The Imperative: AI Literacy & State 48 alignment", pages: "22–23" },
        { label: "Conclusion & Next Steps (the big picture)", pages: "37" }
      ],
      readNext: [
        { label: "Implementation Recommendations", pages: "32–36" },
        { label: "Responsible & Ethical overview + Addressing Considerations", pages: "10, 20" }
      ],
      prompt: "What position statement would help our community understand why we’re moving forward thoughtfully — and how AI literacy connects to the State 48 Graduate Profile?",
      teaser: "The 2026 Arizona AI Guidance is no longer mainly about using new tools — it’s a call to build AI literacy and human judgment across our system. Start with the Introduction and Understanding GenAI (pp. 6, 8–9), then skip to the State 48 connection (pp. 22–23) and the next steps (p. 37). 10 minutes will tell you what to say publicly."
    },
    {
      id: "curriculum",
      role: "Curriculum & Instruction",
      short: "Curriculum",
      audience: "Teaching & learning leaders, standards and assessment",
      time: "20–25 min",
      priority: "AI literacy, instructional design, assessment, and academic integrity",
      readFirst: [
        { label: "Understanding GenAI", pages: "8–9" },
        { label: "Powerful Teaching and Learning", pages: "21–29" },
        { label: "The Imperative: AI Literacy table", pages: "22–23" }
      ],
      readNext: [
        { label: "Responsible & Ethical Implementation", pages: "10–20" },
        { label: "Responsible Classroom Use", pages: "26–28" }
      ],
      prompt: "Which learning tasks should AI support, and which thinking must remain visibly human?",
      teaser: "The teaching chapter was reorganized around AI literacy, integration, and redesign — and the integrity conversation grew well beyond cheating. Read Understanding GenAI and Powerful Teaching and Learning (pp. 8–9, 21–29), then Responsible & Ethical (pp. 10–20). It maps directly to standards and the State 48 Essential Skills."
    },
    {
      id: "edtech",
      role: "EdTech & Instructional Coaches",
      short: "EdTech",
      audience: "Instructional technologists and coaches supporting teachers",
      time: "22–30 min",
      priority: "Practical adoption, teacher support, approved tools, and PD",
      readFirst: [
        { label: "Understanding GenAI", pages: "8–9" },
        { label: "Powerful Teaching and Learning", pages: "21–29" },
        { label: "Implementation Recommendations", pages: "32–36" }
      ],
      readNext: [
        { label: "Additional Resources: AI literacy & PD", pages: "38" },
        { label: "School & Administrative Use", pages: "30–31" }
      ],
      prompt: "What reusable models, examples, and guardrails help educators move from fear or novelty to purposeful use?",
      teaser: "You’re the bridge from guidance to classroom. Read Understanding GenAI, Powerful Teaching and Learning, and the Implementation “boat” framework (pp. 8–9, 21–29, 32–36), then grab the resources and PD list (p. 38). The 3ssentials (approved tools, guardrails training, use expectations) are your rollout checklist."
    },
    {
      id: "it",
      role: "IT, Cybersecurity & Data Privacy",
      short: "IT / Security",
      audience: "CTOs, IT, security, and data-privacy leads",
      time: "15–22 min",
      priority: "Data protection, cybersecurity, vendor review, and agentic risk",
      readFirst: [
        { label: "Understanding GenAI (esp. agentic AI)", pages: "8–9" },
        { label: "Data and Information Privacy", pages: "14–15" },
        { label: "Cybersecurity", pages: "19" },
        { label: "Addressing Ethical Considerations", pages: "20" }
      ],
      readNext: [
        { label: "School & Administrative Use risks", pages: "30–31" },
        { label: "Implementation: approved tools & policy", pages: "34–36" }
      ],
      prompt: "Where do permissions, integrations, and data exposure create the highest risk?",
      teaser: "2026 adds a standalone Cybersecurity consideration and sharper privacy guidance (chatbot privacy illusion, tribal data sovereignty). Read Understanding GenAI, Data & Information Privacy, and Cybersecurity (pp. 8–9, 14–15, 19), then the recommendations on p. 20. This is your vendor-review and policy backbone."
    },
    {
      id: "principal",
      role: "Principal & Site Administrator",
      short: "Principal",
      audience: "Building leaders setting school-level expectations",
      time: "15–20 min",
      priority: "School norms, staff clarity, classroom use, and family trust",
      readFirst: [
        { label: "Introduction & Orientation", pages: "6" },
        { label: "Understanding GenAI", pages: "8–9" },
        { label: "Responsible Classroom Use", pages: "26–28" },
        { label: "School and Administrative Use", pages: "30–31" }
      ],
      readNext: [
        { label: "Responsible & Ethical Implementation", pages: "10–20" },
        { label: "Implementation: 3ssentials & guidelines", pages: "34–36" }
      ],
      prompt: "What common expectations would reduce confusion for teachers, students, and families?",
      teaser: "Your teachers and families want clear, consistent expectations. Read the Introduction and Understanding GenAI (pp. 6, 8–9), then Responsible Classroom Use and School & Administrative Use (pp. 26–28, 30–31). The 3ssentials give you a simple, shared starting point for your building."
    },
    {
      id: "operations",
      role: "Operations, HR & Finance",
      short: "Operations",
      audience: "HR, finance, operations, communications, facilities",
      time: "10–15 min",
      priority: "Workflow enhancement, multilingual communication, and human oversight",
      readFirst: [
        { label: "Understanding GenAI", pages: "8–9" },
        { label: "School and Administrative Use", pages: "30–31" },
        { label: "Data and Information Privacy", pages: "14–15" }
      ],
      readNext: [
        { label: "Cybersecurity", pages: "19" },
        { label: "Implementation Recommendations", pages: "32–36" }
      ],
      prompt: "Which workflow has clear rules, repeated steps, and low-risk data where AI could safely help?",
      teaser: "The new School & Administrative Use chapter separates enhancing today’s work from transforming workflows. Read Understanding GenAI and that chapter (pp. 8–9, 30–31), plus the privacy pages (14–15). Start with one low-risk, rule-based workflow and keep a human in the loop."
    },
    {
      id: "teachers",
      role: "Teachers",
      short: "Teachers",
      audience: "Classroom educators",
      time: "15–22 min",
      priority: "Instructional practice, student agency, and responsible use",
      readFirst: [
        { label: "Teacher Use Cases", pages: "24" },
        { label: "Student Use Cases", pages: "25" },
        { label: "Responsible Classroom Use", pages: "26–28" },
        { label: "The Redesign: AI Inspiration", pages: "29" }
      ],
      readNext: [
        { label: "Understanding GenAI", pages: "8–9" },
        { label: "Responsible & Ethical overview", pages: "10" }
      ],
      prompt: "How can AI be a coach or thought partner without becoming an assignment’s easy button?",
      teaser: "Start where it’s most concrete: Teacher and Student Use Cases and Responsible Classroom Use (pp. 24–28), then The Redesign for inspiration (p. 29). The guidance treats AI as a thought partner — and helps you keep student thinking visible."
    }
  ],

  /* ---------------------------------------------------------------------------
     CHANGES — the 10 "what changed" cards (filterable by tag).
     --------------------------------------------------------------------------- */
  changeTags: ["Big picture","AI literacy","Explainer","Guardrails","New sections","Privacy","Teaching and learning","Future-ready learning","Operations","Implementation"],
  changes: [
    { id: "rewrite", title: "A full rewrite, not a refresh", tag: "Big picture", pages: "Cover & throughout", body: "Version 26.01 is explicitly a rewrite and shifts the public frame from “A Balanced Perspective” to “A Call for AI Literacy.”", why: "Lead with optimism: Arizona isn’t just reacting to AI — it’s helping leaders build literacy, judgment, and human agency." },
    { id: "literacy", title: "AI literacy becomes the center of gravity", tag: "AI literacy", pages: "22–23", body: "AI literacy is treated as a core, cross-disciplinary competency connected to AZ Academic Standards and the State 48 Essential Skills.", why: "It gives curriculum and leadership teams a concrete instructional anchor." },
    { id: "explainer", title: "Understanding GenAI is modernized", tag: "Explainer", pages: "8–9", body: "The explainer now covers multimodal tools, reasoning models, agentic AI, model limitations, and the “chef” analogy for how outputs are shaped.", why: "Leaders need enough technical understanding to decide well — without becoming AI engineers." },
    { id: "ethics-earlier", title: "Ethics moves earlier and expands", tag: "Guardrails", pages: "10–20", body: "Responsible and Ethical Implementation now appears before the teaching chapter and expands from five considerations to eight.", why: "Safety, trust, privacy, and human oversight become the entry point, not an afterthought." },
    { id: "three-new", title: "Three new ethical considerations", tag: "New sections", pages: "17–19", body: "Mental Well-Being (p. 17), Environmental Impact (p. 18), and Cybersecurity (p. 19) are added as explicit considerations.", why: "The guidance now reflects the AI realities schools are actually facing in 2026." },
    { id: "privacy", title: "Privacy becomes more sophisticated", tag: "Privacy", pages: "14–15", body: "Privacy guidance now includes the illusion of privacy in chatbot interactions and the data authority of Arizona’s 22 sovereign tribal nations.", why: "It strengthens the document for district policy, vendor review, and community trust." },
    { id: "classroom", title: "Classroom guidance matures beyond cheating", tag: "Teaching and learning", pages: "26–28", body: "Academic integrity broadens into responsible classroom use: cognitive offloading, grading and feedback, disclosure, and AI detectors.", why: "It helps educators design learning instead of simply policing tools." },
    { id: "redesign", title: "Teaching points toward redesign", tag: "Future-ready learning", pages: "29", body: "The new “AI Inspiration” section invites authentic creation, inquiry, community-connected work, portfolios, and exhibitions.", why: "The optimistic heart of the update: AI can push schools toward learning we already value." },
    { id: "admin", title: "Administrative use becomes clearer", tag: "Operations", pages: "30–31", body: "School & Administrative Use now separates enhancing existing work from transforming workflows, including agentic AI.", why: "It gives non-classroom leaders a thoughtful path into AI productivity without losing human judgment." },
    { id: "implementation", title: "Implementation gets Arizona-specific", tag: "Implementation", pages: "32–36", body: "The old stage model becomes a “boat” framework: local pacing, shared leadership, the 3ssentials, policy and guidelines, and ongoing learning.", why: "It makes implementation feel achievable, flexible, and grounded in local context." }
  ],

  // Share Kit — a generic announcement leaders can paste anywhere.
  shareKit: {
    announcement: "Arizona’s GenAI guidance for K-12 has been rewritten for 2026 — “A Call for AI Literacy.” We built a 5-minute companion: pick your role to get a short, page-numbered reading route, or scan what changed. Explore it here, then open the full guidance at azk12.ai.",
    note: "Each role below has a ready-to-send teaser. Copy the one that fits your audience."
  }
};

import pptxgen from "pptxgenjs";

const pptx = new pptxgen();

// ── Branding Constants ──
const GREEN = "58CC02";
const DARK_GREEN = "357B00";
const BLACK = "1A1A1A";
const GRAY = "666666";
const LIGHT_GRAY = "F0F4F0";
const WHITE = "FFFFFF";

pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
pptx.author = "Lingo Flow Team";
pptx.title = "Lingo Flow – Application Walkthrough";

// Log available shapes for debugging
console.log("Available shapes:", Object.keys(pptx.shapes || {}).join(", "));

// ── Helper: green bottom strip ──
function addBottomStrip(slide) {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 7.0, w: 13.33, h: 0.5,
    fill: { color: GREEN },
  });
}

// ── Helper: slide number ──
function addSlideNumber(slide, num) {
  slide.addText(String(num).padStart(2, "0"), {
    x: 12.3, y: 7.05, w: 0.8, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: WHITE, bold: true,
    align: "right",
  });
}

// ── Helper: title bar at top ──
function addTitleBar(slide, icon, title) {
  // thin green line under title
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 1.15, w: 12.13, h: 0.035,
    fill: { color: GREEN },
  });
  // title text
  slide.addText(`${icon}  ${title}`, {
    x: 0.6, y: 0.3, w: 10, h: 0.75,
    fontSize: 28, fontFace: "Arial",
    color: GREEN, bold: true,
  });
}

// ── Helper: left body bullets ──
function addBody(slide, bullets, opts = {}) {
  const textRows = bullets.map((b) => ({
    text: b,
    options: {
      fontSize: opts.fontSize || 14,
      fontFace: "Arial",
      color: BLACK,
      bullet: { code: "2022", color: GREEN },
      paraSpaceAfter: 6,
      lineSpacingMultiple: 1.3,
    },
  }));

  slide.addText(textRows, {
    x: opts.x || 0.8,
    y: opts.y || 1.5,
    w: opts.w || 5.8,
    h: opts.h || 5.2,
    valign: "top",
  });
}

// ── Helper: numbered bullets ──
function addNumberedBullets(slide, bullets, opts = {}) {
  const textRows = bullets.map((b, i) => ({
    text: b,
    options: {
      fontSize: 14,
      fontFace: "Arial",
      color: BLACK,
      bullet: { type: "number", color: GREEN, numberStartAt: i === 0 ? 1 : undefined },
      paraSpaceAfter: 6,
      lineSpacingMultiple: 1.3,
    },
  }));

  slide.addText(textRows, {
    x: opts.x || 0.8,
    y: opts.y || 1.5,
    w: opts.w || 11.5,
    h: opts.h || 5.2,
    valign: "top",
  });
}

// ── Helper: right feature box ──
function addFeatureBox(slide, title, items, opts = {}) {
  const x = opts.x || 7.0;
  const y = opts.y || 1.5;
  const w = opts.w || 5.6;
  const h = opts.h || 5.2;

  // box background
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: LIGHT_GRAY },
    rectRadius: 0.15,
    line: { color: GREEN, width: 1.5 },
  });

  // box title
  slide.addText(title, {
    x: x + 0.3, y: y + 0.15, w: w - 0.6, h: 0.45,
    fontSize: 15, fontFace: "Arial",
    color: GREEN, bold: true,
  });

  // box items
  const featureRows = items.map((item) => ({
    text: item,
    options: {
      fontSize: 12,
      fontFace: "Arial",
      color: BLACK,
      bullet: { code: "2713", color: GREEN },
      paraSpaceAfter: 4,
      lineSpacingMultiple: 1.25,
    },
  }));

  slide.addText(featureRows, {
    x: x + 0.3, y: y + 0.7, w: w - 0.6, h: h - 1.0,
    valign: "top",
  });
}

// ═════════════════════════════════════════
// SLIDE 1: COVER
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };

  // Top green accent
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 13.33, h: 0.12,
    fill: { color: GREEN },
  });

  // Circle decoration
  slide.addShape(pptx.shapes.OVAL, {
    x: 4.9, y: 1.0, w: 3.5, h: 3.5,
    fill: { color: LIGHT_GRAY },
    line: { color: GREEN, width: 2.5 },
  });

  // Globe emoji
  slide.addText("🌍", {
    x: 5.4, y: 1.5, w: 2.5, h: 2.5,
    fontSize: 72, align: "center", valign: "middle",
  });

  // Title
  slide.addText("LINGO FLOW", {
    x: 1, y: 4.7, w: 11.33, h: 0.9,
    fontSize: 48, fontFace: "Arial",
    color: GREEN, bold: true, align: "center",
  });

  // Subtitle
  slide.addText("Easy, Flexible & Fun Language Learning", {
    x: 2, y: 5.5, w: 9.33, h: 0.5,
    fontSize: 20, fontFace: "Arial",
    color: BLACK, align: "center",
  });

  // Divider
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 5.16, y: 6.15, w: 3, h: 0.03,
    fill: { color: GREEN },
  });

  // Footer
  slide.addText("Application Walkthrough Presentation", {
    x: 2, y: 6.3, w: 9.33, h: 0.4,
    fontSize: 14, fontFace: "Arial",
    color: GRAY, align: "center", italic: true,
  });

  addBottomStrip(slide);
}

// ═════════════════════════════════════════
// SLIDE 2: TABLE OF CONTENTS
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };
  addTitleBar(slide, "📋", "Table of Contents");

  addNumberedBullets(slide, [
    "Landing Page – First impression & value proposition",
    "Authentication – User sign-in and account creation",
    "Language Selection – Onboarding & course setup",
    "Learner Dashboard – Central learning hub & progress tracking",
    "Interactive Lessons – MCQ, listening & translation exercises",
    "Community Hub – Social feed for peer practice",
    "AI Tutor (Coach Lingo) – 24/7 conversational practice",
    "Pro Upgrade & Payment – Subscription & monetization flow",
    "Admin Login – Secure admin authentication",
    "Admin Dashboard – Platform analytics & KPIs",
    "Admin User Management – Learner directory & controls",
    "Admin Community Moderation – Post review & deletion",
    "Technology Stack – Architecture & tools overview",
  ]);

  addBottomStrip(slide);
  addSlideNumber(slide, 1);
}

// ═════════════════════════════════════════
// SLIDE 3: LANDING PAGE
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };
  addTitleBar(slide, "🏠", "Landing Page");

  addBody(slide, [
    "Hero section with animated bouncing mascot logo and bold uppercase headline",
    'Two primary CTAs: "Get Started" (green) and "I Already Have an Account" (outlined)',
    "Clean fixed navbar with logo, Login link, and dark/light theme toggle",
    "Three feature cards showcasing core value propositions:",
    "   🔥 Play & Learn – Gamified streaks, points, and achievements",
    "   ✨ Friendly AI Coach – Personalized bite-sized lessons",
    "   📖 Practice Speaking – Real conversations in 6 languages",
    'Green footer CTA banner: "Start your language journey today"',
  ]);

  addFeatureBox(slide, "Key Design Choices", [
    "Duolingo-inspired green brand color (#58CC02)",
    "Rounded buttons with 3D border-bottom press effect",
    "Responsive layout with mobile-first design approach",
    "Dark mode support via CSS custom properties",
    "Lucide React icon library for crisp SVG vectors",
    "SEO-ready with semantic HTML5 structure",
  ]);

  addBottomStrip(slide);
  addSlideNumber(slide, 2);
}

// ═════════════════════════════════════════
// SLIDE 4: AUTHENTICATION
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };
  addTitleBar(slide, "🔐", "Authentication Page");

  addBody(slide, [
    "Unified login/signup flow toggled via a single button",
    "Username-based auth (internally mapped to @lingoflow.ai email)",
    "Password field with show/hide toggle for usability",
    "Real-time error feedback with styled red alert banners",
    "On signup, full_name is auto-set from the chosen username",
    "Successful auth triggers full page redirect for clean session initialization",
    "Powered by Supabase Auth with server-side cookie session management",
  ]);

  addFeatureBox(slide, "Technical Highlights", [
    "Supabase SSR cookies for persistent sessions",
    "Middleware-based route protection on all pages",
    "No email confirmation required (instant access)",
    "Clean card UI with 48px border radius and 2px borders",
    "Loading spinner on submit to prevent double-clicks",
    "Back arrow in header navigates to landing page",
  ]);

  addBottomStrip(slide);
  addSlideNumber(slide, 3);
}

// ═════════════════════════════════════════
// SLIDE 5: LANGUAGE SELECTION
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };
  addTitleBar(slide, "🌐", "Language Selection (Onboarding)");

  addBody(slide, [
    "First screen after signup – mandatory before dashboard access",
    "Six languages displayed in a responsive 3-column grid:",
    "   🇦🇪 Arabic   ·   🇩🇪 German   ·   🇫🇷 French",
    "   🇺🇬 Runyankore   ·   🇰🇪 Kiswahili   ·   🇺🇬 Luganda",
    "Selected card shows green border glow and animated checkmark icon",
    '"Continue" button stays disabled until a language is chosen',
    "Also accessible from dashboard for switching languages anytime",
    "Uses Supabase upsert to handle both new and returning users",
  ]);

  addFeatureBox(slide, "UX Details", [
    "Large flag emojis for instant visual recognition",
    "3D button press effect (border-bottom + translateY)",
    "Back button visible when accessed from settings",
    "Loading spinner during profile update save",
    "Router.push + router.refresh for Next.js cache invalidation",
    "Route: /setup or /setup?source=settings",
  ]);

  addBottomStrip(slide);
  addSlideNumber(slide, 4);
}

// ═════════════════════════════════════════
// SLIDE 6: LEARNER DASHBOARD
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };
  addTitleBar(slide, "📊", "Learner Dashboard");

  addBody(slide, [
    'Personalized welcome banner with animated mascot: "Welcome, [Name]!"',
    "Displays current language, daily streak 🔥, XP 🏆, and PRO badge",
    "Resume Progress card to continue the last incomplete lesson",
    "Learning path with 12 units across two structured levels:",
    "   Level 1 (Foundations): Greetings → Advanced (6 units)",
    "   Level 2 (Mastery): Workplace → Expert (6 units)",
    "Vertical path with progress nodes, checkmarks, and locked states",
    "Right sidebar: Community Hub, AI Coach, Progress, Leagues, Account",
  ]);

  addFeatureBox(slide, "Dashboard Widgets", [
    "🟢 Community Hub – Quick link to language-specific feed",
    "🤖 Coach Lingo – AI tutor shortcut with mascot avatar",
    "📈 Course Progress – % completion bar with unit count",
    "🏅 Leagues – Bronze league gamification progress",
    "⚙️ Account – Manage subscription & sign out",
    "👑 PRO badge for subscribed premium users",
    "🎉 Champion banner when all 12 units completed",
  ]);

  addBottomStrip(slide);
  addSlideNumber(slide, 5);
}

// ═════════════════════════════════════════
// SLIDE 7: LESSON PAGE
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };
  addTitleBar(slide, "📝", "Interactive Lessons");

  addBody(slide, [
    "Three exercise types: Multiple Choice (MCQ), Listening, and Translation",
    "Questions fetched from Supabase database with static fallback data",
    "Animated mascot reacts to answers: celebrate, think, or idle states",
    "Click any word in a question to hear its pronunciation via TTS",
    "Options displayed in shuffled 2-column grid with 3D press effect",
    "Instant feedback: green bar (correct) or red bar with correct answer",
    "Mistake Review Loop: missed items are replayed until fully mastered",
    "Lesson complete screen: XP earned (+10) and accuracy percentage",
  ]);

  addFeatureBox(slide, "Learning Engine", [
    "Web Audio API for correct/wrong/finish sound effects",
    "Progress bar tracks completion percentage in real-time",
    "Resume support via last_lesson_index in user profile",
    "Module completion tracked in completed_modules array",
    "Offline detection: Level 2 requires internet connection",
    "Hearts system displayed (visual gamification element)",
    '"Continue to Next Module" for sequential flow',
  ]);

  addBottomStrip(slide);
  addSlideNumber(slide, 6);
}

// ═════════════════════════════════════════
// SLIDE 8: COMMUNITY HUB
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };
  addTitleBar(slide, "👥", "Community Hub");

  addBody(slide, [
    "Language-specific social feed for peer practice and Q&A",
    "Filter tabs: All Posts, Peer Practice, and Questions",
    "Create Post modal with post type selection and text input",
    "Each post shows author avatar, name, content, and timestamp",
    "Like system with optimistic UI updates via REST API",
    "Reply/thread support for discussions under each post",
    'Empty state with friendly prompt: "Be the First to Post"',
    "Fixed header with back navigation and current language hub badge",
  ]);

  addFeatureBox(slide, "Community Features", [
    "Posts stored in Supabase community_posts table",
    "Real-time feed refresh after creating a new post",
    "Language hub indicator with flag emoji badge",
    "Smooth loading animations with spinner states",
    "Responsive card layout with consistent styling",
    "API routes: /api/community (GET/POST)",
    "Like API: /api/community/like (POST)",
  ]);

  addBottomStrip(slide);
  addSlideNumber(slide, 7);
}

// ═════════════════════════════════════════
// SLIDE 9: AI TUTOR
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };
  addTitleBar(slide, "🤖", "AI Tutor – Coach Lingo");

  addBody(slide, [
    "24/7 AI-powered conversational language practice coach",
    "Real-time chat UI with message bubbles (user=green, bot=white)",
    "Animated mascot reacts: idle (floating) and thinking (wiggling)",
    "Quick prompt buttons for beginners: greetings, study tips, etc.",
    "Lingo Tips: contextual yellow tip boxes with grammar/culture notes",
    "Chat history persisted in Supabase and loaded on return visits",
    "Subscription paywall: free users see upgrade prompt before chatting",
  ]);

  addFeatureBox(slide, "Technical Details", [
    "Powered by Google Gemini AI (@google/generative-ai)",
    "API route: /api/tutor (POST) with language context",
    "History API: /api/tutor/history (GET) per language",
    "Typing indicator with animated bouncing dots",
    "Offline detection disables input automatically",
    "Three subscription tiers: Weekly, Monthly, Family",
    "Smooth auto-scroll-to-bottom on new messages",
  ]);

  addBottomStrip(slide);
  addSlideNumber(slide, 8);
}

// ═════════════════════════════════════════
// SLIDE 10: PAYMENT / PRO UPGRADE
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };
  addTitleBar(slide, "💳", "Pro Upgrade & Payment");

  addBody(slide, [
    "Three-step checkout flow: Plan Selection → Payment → Processing",
    "Four pricing tiers with clear value differentiation:",
    '   💰 Weekly: $2.99/week',
    '   ⭐ Monthly: $9.99/month – marked as "POPULAR"',
    '   👨‍👩‍👧‍👦 Family: $14.99/month – up to 5 people',
    '   🏆 Yearly: $59.99/year – "BEST DEAL / Save 50%"',
    "Payment methods: Credit Card and Mobile Money (M-PESA/MTN/Airtel)",
    "Animated processing spinner followed by success checkmark animation",
  ]);

  addFeatureBox(slide, "Payment Flow", [
    "Full-screen modal with backdrop blur overlay",
    'Step 1: Choose plan → "Continue to Payment"',
    'Step 2: Pick payment method → "Pay Now"',
    "Step 3: 3-second simulated payment processing",
    "Success updates subscription_tier in Supabase",
    "PRO badge appears immediately on dashboard",
    "SSL security badge for user confidence",
    "ProCard widget on dashboard prompts free users",
  ]);

  addBottomStrip(slide);
  addSlideNumber(slide, 9);
}

// ═════════════════════════════════════════
// SLIDE 11: ADMIN LOGIN
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };
  addTitleBar(slide, "🛡️", "Admin Login");

  addBody(slide, [
    "Dedicated admin authentication page at /admin/login",
    "Animated green glow background effects for premium feel",
    "Username + Password form with icon prefixes (User, Lock)",
    "Default superadmin account: superadmin@lingoflow.ai",
    "Auto-bootstrap: creates admin account on first login attempt",
    "Admin rights verified via user_metadata.isAdmin flag",
    "Non-admin users immediately signed out with access denied error",
    "Clears all stale sessions/cookies before each new login attempt",
  ]);

  addFeatureBox(slide, "Security Measures", [
    "Supabase Auth with isAdmin metadata verification",
    "Full session clearing (localStorage + sessionStorage)",
    "Auto-provisions admin profile with default language",
    "Email confirmation bypass handling",
    "Detailed error messages for admin debugging",
    "Password show/hide visibility toggle",
    "Theme toggle accessible from login screen",
  ]);

  addBottomStrip(slide);
  addSlideNumber(slide, 10);
}

// ═════════════════════════════════════════
// SLIDE 12: ADMIN DASHBOARD
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };
  addTitleBar(slide, "📈", "Admin Dashboard – Overview");

  addBody(slide, [
    "Platform health monitoring with four KPI cards:",
    "   👥 Total Learners – Count of all registered users",
    "   🏆 Global XP – Sum of all experience points earned platform-wide",
    "   🔥 Total Active Streaks – Combined daily streak days",
    "   🌍 Most Popular Language – Top language by enrollment",
    "Language Distribution section with horizontal progress bars",
    "Each bar shows percentage of users learning that language",
    "Sync Database button to migrate lesson data from static files to DB",
  ]);

  addFeatureBox(slide, "Admin Layout", [
    "Sidebar navigation with 4 main sections:",
    "   📊 Overview – KPI analytics dashboard",
    "   👥 Users – Learner directory & management",
    "   ⚙️ Settings – Platform configuration",
    "   💬 Community – Post moderation tools",
    "Responsive: sidebar collapses to top bar on mobile",
    "Admin guard: non-admins redirected to /admin/login",
    'Exit Admin button with sign-out action',
  ]);

  addBottomStrip(slide);
  addSlideNumber(slide, 11);
}

// ═════════════════════════════════════════
// SLIDE 13: ADMIN USERS
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };
  addTitleBar(slide, "👥", "Admin – User Management");

  addBody(slide, [
    '"Learner Directory" with a full table of all registered users',
    "Columns: Learner, Target Language, Stats (XP + Streak), Modules Won, Joined",
    "Users sorted by XP descending (top performers shown first)",
    "Each row shows avatar initial, green badge, and language chip",
    "Total user count displayed as green badge in page header",
    "One-click Pro toggle: admin can grant or revoke Pro status per user",
    "Pro users show a gold PRO badge next to their row actions",
  ]);

  addFeatureBox(slide, "Management Actions", [
    "⭐ Upgrade to Pro – One-click subscription grant",
    "❌ Revoke Pro – Remove premium access instantly",
    "API: PATCH /api/admin/users with userId & tier",
    "Admin auth verified on every API request",
    "Optimistic UI with router.refresh() after action",
    "Hover states and responsive table overflow scroll",
    "Empty state message for zero-user scenarios",
  ]);

  addBottomStrip(slide);
  addSlideNumber(slide, 12);
}

// ═════════════════════════════════════════
// SLIDE 14: ADMIN COMMUNITY
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };
  addTitleBar(slide, "💬", "Admin – Community Moderation");

  addBody(slide, [
    "Review all community posts across every language hub",
    "Table columns: Post Content (author + text), Metadata, Actions",
    "Metadata shows: post type tag, language hub name, and creation date",
    "Author avatar with initial letter and full name displayed",
    "Total post count shown as green badge in the page header",
    "Posts ordered by newest first (descending created_at)",
    "Supabase join: community_posts linked with profiles for author names",
  ]);

  addFeatureBox(slide, "Moderation Tools", [
    "🗑️ Delete Post – Permanent removal with confirmation dialog",
    "DeletePostButton: client component with loading spinner",
    "API: DELETE /api/admin/community?id=postId",
    "Confirm() prompt prevents accidental deletions",
    "Page auto-refreshes after successful deletion",
    "Admin auth verified server-side on every request",
    "Clean table UI with hover row highlights",
  ]);

  addBottomStrip(slide);
  addSlideNumber(slide, 13);
}

// ═════════════════════════════════════════
// SLIDE 15: TECH STACK
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };
  addTitleBar(slide, "⚙️", "Technology Stack");

  addBody(slide, [
    "Frontend: Next.js 16 (App Router + Turbopack build)",
    "Language: TypeScript with React 19",
    "Styling: Tailwind CSS v4 with CSS custom properties for theming",
    "Icons: Lucide React (tree-shakeable SVG icon library)",
    "Theming: next-themes with dark/light mode toggle",
    "Backend: Supabase (Auth, PostgreSQL Database, Row Level Security)",
    "AI Engine: Google Gemini via @google/generative-ai SDK",
    "PWA: Serwist for offline-first service worker support",
  ]);

  addFeatureBox(slide, "Architecture Highlights", [
    "Server Components for data-fetching pages (zero JS)",
    "Client Components for interactive UI elements",
    "Middleware for auth-based route protection",
    "API Routes for admin actions & AI tutor endpoints",
    "Supabase SSR for secure cookie-based sessions",
    "Timeout wrappers on all data fetches (5–8s limits)",
    "Static fallback data for offline lesson access",
    "Responsive mobile-first design approach",
  ]);

  addBottomStrip(slide);
  addSlideNumber(slide, 14);
}

// ═════════════════════════════════════════
// SLIDE 16: THANK YOU
// ═════════════════════════════════════════
{
  const slide = pptx.addSlide();
  slide.background = { fill: WHITE };

  // Top accent
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 13.33, h: 0.12,
    fill: { color: GREEN },
  });

  // Globe emoji
  slide.addText("🌍", {
    x: 5.4, y: 1.5, w: 2.5, h: 2.5,
    fontSize: 72, align: "center", valign: "middle",
  });

  // Thank you text
  slide.addText("Thank You!", {
    x: 1, y: 3.9, w: 11.33, h: 0.9,
    fontSize: 48, fontFace: "Arial",
    color: GREEN, bold: true, align: "center",
  });

  // Tagline
  slide.addText("Lingo Flow – Making Language Learning Accessible to Everyone", {
    x: 2, y: 4.8, w: 9.33, h: 0.5,
    fontSize: 18, fontFace: "Arial",
    color: BLACK, align: "center",
  });

  // Divider
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 5.16, y: 5.5, w: 3, h: 0.03,
    fill: { color: GREEN },
  });

  // Tech footer
  slide.addText("Built with Next.js  ·  Supabase  ·  Google Gemini AI  ·  Tailwind CSS", {
    x: 2, y: 5.7, w: 9.33, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: GRAY, align: "center", italic: true,
  });

  addBottomStrip(slide);
}

// ── EXPORT ──
const outputPath = "Lingo_Flow_Presentation.pptx";
await pptx.writeFile({ fileName: outputPath });
console.log(`\n✅ Presentation saved: ${outputPath}`);
console.log(`   Total slides: ${pptx.slides.length}`);

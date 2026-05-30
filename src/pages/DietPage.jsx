import { useState } from "react";

const profile = {
  calories: "~2,100 kcal", protein: "190 g", carbs: "~185 g", fat: "~58 g",
  deficit: "~1,100 kcal/day", eatWindow: "9 AM – 7 PM", fast: "7 PM – 9 AM",
  water: "4 L/day", sleep: "7–8 hrs", goal: "87 kg → 74 kg",
  timeline: "5–6 months", pace: "~0.65–0.8 kg/week",
};

const schedule = [
  { time: "6:30 AM", label: "Pre-Workout (Tue–Sun)", icon: "☕", cal: "0 kcal", note: "Black coffee + water only. Still fasting. Skip on Monday (rest day)." },
  { time: "6:45–8:00 AM", label: "GYM (Tue–Sun)", icon: "🏋️", cal: "—", note: "6-day PPL split — see Workout tab. Monday is rest day (no gym)." },
  { time: "8:15 AM", label: "Post-Workout Shake", icon: "🥤", cal: "~190 kcal", note: "Whey 1 scoop + Creatine 5g + Banana small (80g) + 300ml water. Skip shake on Monday — take creatine with breakfast instead." },
  { time: "10:00 AM", label: "Breakfast", icon: "🌅", cal: "~565 kcal", note: "50g P · 62g C · 14g F. Protein held, carbs trimmed vs v5. Rotate every 2 weeks." },
  { time: "1:00 PM", label: "Lunch", icon: "🥗", cal: "~580 kcal", note: "45–48g P · 75g C · 12g F. Rice portion reduced to 100g cooked. Dal to 120g cooked." },
  { time: "4:00 PM", label: "Snack", icon: "🥜", cal: "~295 kcal", note: "28–35g P. Nut portions trimmed. Whey samples unchanged." },
  { time: "6:30 PM", label: "Dinner", icon: "🍛", cal: "~480 kcal", note: "42–44g P · 48g C · 13g F. Roti cut to 1 (35g atta). Rice to 80g cooked." },
  { time: "7:00 PM", label: "Fast Begins", icon: "🌙", cal: "0 kcal", note: "Water, plain green tea or black coffee only until 9 AM." },
];

const meals = {
  breakfast: {
    title: "Breakfast — 10:00 AM", icon: "🌅",
    target: "~565 kcal | 50 g P | 62 g C | 14 g F",
    kcal: "~565 kcal",
    note: "Protein samples unchanged. Carb portions trimmed ~10%. Fruit stays — micronutrients non-negotiable.",
    samples: [
      { id: "B1", label: "Pintola Protein Oats Bowl", color: "#22c55e", macros: "~565 kcal | 51g P | 63g C | 14g F", badge: "Zero cooking",
        items: [
          { ing: "Pintola HP Oats (Chocolate)", amt: "55g", change: "↓ from 70g", note: "Saves ~65 kcal" },
          { ing: "Toned milk (cold)", amt: "200ml", change: "↓ from 250ml", note: "Saves ~30 kcal" },
          { ing: "Whey protein", amt: "1 scoop", change: "—", note: "Unchanged" },
          { ing: "Apple (sliced)", amt: "1 medium (~150g)", change: "—", note: "Keep skin on" },
          { ing: "Cinnamon powder", amt: "pinch", change: "—", note: "" },
        ], tip: "Stir oats into cold milk, wait 5 min. Add whey AFTER — never to hot milk. Refrigerate overnight for creamier set." },
      { id: "B2", label: "Moong Dal Chilla + Shake", color: "#f97316", macros: "~570 kcal | 50g P | 59g C | 15g F", badge: "Highest fiber",
        items: [
          { ing: "Yellow moong dal (dry)", amt: "50g", change: "↓ from 60g", note: "Soak 4h, blend thick" },
          { ing: "Low-fat paneer (stuffing)", amt: "40g", change: "↓ from 50g", note: "Amul Lite only" },
          { ing: "Onion + coriander", amt: "30g", change: "—", note: "" },
          { ing: "Cooking oil", amt: "5ml", change: "—", note: "Brush pan, don't pour" },
          { ing: "Whey in 200ml toned milk", amt: "1 scoop", change: "—", note: "" },
          { ing: "Apple", amt: "1 medium (~150g)", change: "—", note: "" },
        ], tip: "Batter thick like dosa. Soak moong 4+ hrs or overnight. Brush pan with oil — pouring adds ~50 kcal." },
      { id: "B3", label: "Besan Chilla + Paneer + Shake", color: "#3b82f6", macros: "~565 kcal | 47g P | 61g C | 15g F", badge: "Quick prep",
        items: [
          { ing: "Besan (chickpea flour)", amt: "45g", change: "↓ from 55g", note: "Saves ~38 kcal" },
          { ing: "Low-fat paneer (stuffing)", amt: "50g", change: "—", note: "Amul Lite (16% fat)" },
          { ing: "Onion + tomato + coriander", amt: "40g", change: "—", note: "" },
          { ing: "Cooking oil", amt: "5ml", change: "—", note: "1 tsp, brushed" },
          { ing: "Whey in 200ml toned milk", amt: "1 scoop", change: "—", note: "" },
          { ing: "Banana (small)", amt: "~100g", change: "—", note: "" },
        ], tip: "Old besan tastes bitter — use Tata Sampann or Aashirvaad. Batter runny = flat chilla." },
      { id: "B4", label: "Pintola Smoothie Bowl + Besan Toast", color: "#a855f7", macros: "~555 kcal | 50g P | 65g C | 13g F", badge: "Prep night before",
        items: [
          { ing: "Pintola HP Oats", amt: "35g", change: "↓ from 40g", note: "Blended" },
          { ing: "Whey protein", amt: "1 scoop", change: "—", note: "" },
          { ing: "Toned milk", amt: "200ml", change: "—", note: "Blended" },
          { ing: "Banana (small, frozen)", amt: "~100g", change: "—", note: "Freeze night before" },
          { ing: "Chia seeds", amt: "5g (1 tsp)", change: "—", note: "Soak 5 min first" },
          { ing: "Besan toast (1 slice)", amt: "25g besan on tawa", change: "↓ from 30g", note: "With ajwain + onion" },
        ], tip: "Blend everything except whey first. Add whey last on low speed. Freeze banana for ice-cream texture." },
    ],
  },
  lunch: {
    title: "Lunch — 1:00 PM", icon: "🥗",
    target: "~580 kcal | 45–48 g P | 75 g C | 12 g F",
    kcal: "~580 kcal",
    note: "Rice cut from 150g → 100g cooked. Dal from 150g → 120g cooked. Protein sources unchanged — only carb carriers trimmed.",
    samples: [
      { id: "L1", label: "Soya Curry + Rice + Dal", color: "#22c55e", macros: "~575 kcal | 48g P | 77g C | 5g F", badge: "Highest protein",
        items: [
          { ing: "Soya chunks (dry)", amt: "55g", change: "—", note: "Soak 10 min hot water, squeeze" },
          { ing: "Onion + tomato", amt: "80g", change: "—", note: "" },
          { ing: "Ginger-garlic paste", amt: "1 tsp", change: "—", note: "" },
          { ing: "Cooking oil", amt: "5ml", change: "—", note: "Hard cap" },
          { ing: "Cooked rice", amt: "100g (=33g dry)", change: "↓ from 150g", note: "Saves ~75 kcal" },
          { ing: "Dal cooked (toor/moong)", amt: "120g (=20g dry)", change: "↓ from 150g", note: "" },
          { ing: "Cucumber-tomato salad", amt: "full portion", change: "—", note: "See Salad Builder" },
        ], tip: "Highest protein lunch — use with any snack. Squeeze lemon on dal for 2× iron absorption." },
      { id: "L2", label: "Chole-Tofu + Rice + Raita", color: "#f97316", macros: "~580 kcal | 47g P | 78g C | 13g F", badge: "Most filling",
        items: [
          { ing: "Chana (dry, soaked overnight)", amt: "50g", change: "—", note: "Pressure cook 4 whistles" },
          { ing: "Firm tofu (cubed)", amt: "100g", change: "—", note: "Press water 5 min first" },
          { ing: "Onion + tomato", amt: "80g", change: "—", note: "" },
          { ing: "Cooking oil", amt: "5ml", change: "—", note: "" },
          { ing: "Cooked rice", amt: "100g (=33g dry)", change: "↓ from 150g", note: "" },
          { ing: "Plain curd (raita)", amt: "100g + cucumber", change: "—", note: "" },
          { ing: "Cucumber-tomato salad", amt: "full portion", change: "—", note: "" },
        ], tip: "Soak chana overnight — pressure cook 4 whistles. Tofu + chana = complete amino profile." },
      { id: "L3", label: "Rajma + Paneer + Jeera Rice", color: "#3b82f6", macros: "~580 kcal | 46g P | 73g C | 14g F", badge: "Iron-rich",
        items: [
          { ing: "Rajma (dry, soaked overnight)", amt: "55g", change: "—", note: "Pressure cook 5–6 whistles" },
          { ing: "Low-fat paneer (cubed)", amt: "70g", change: "—", note: "Amul Lite only" },
          { ing: "Onion + tomato", amt: "80g", change: "—", note: "" },
          { ing: "Cooking oil", amt: "5ml", change: "—", note: "" },
          { ing: "Cooked jeera rice", amt: "100g (33g dry + ½ tsp jeera)", change: "↓ from 150g", note: "" },
          { ing: "Plain curd", amt: "100g", change: "—", note: "" },
          { ing: "Cucumber-tomato salad", amt: "full portion", change: "—", note: "" },
        ], tip: "Rajma has the highest iron of the legumes. Pair with lemon — vitamin C doubles iron absorption." },
      { id: "L4", label: "Mixed Dal + Quinoa + Tofu + Sabzi", color: "#a855f7", macros: "~575 kcal | 47g P | 70g C | 14g F", badge: "Complete protein",
        items: [
          { ing: "Mixed dal (toor+moong+masoor, dry)", amt: "30g", change: "—", note: "" },
          { ing: "Firm tofu (cubed)", amt: "120g", change: "—", note: "Press 5 min" },
          { ing: "Quinoa (dry)", amt: "40g (=~120g cooked)", change: "↓ from 50g", note: "Rinse well before cooking" },
          { ing: "Sabzi", amt: "1 portion", change: "—", note: "See Sabzi Builder" },
          { ing: "Cooking oil", amt: "5ml total", change: "—", note: "Includes sabzi" },
          { ing: "Cucumber-tomato salad", amt: "full portion", change: "—", note: "" },
        ], tip: "Quinoa + dal = complete amino acid profile. Rinse quinoa 2× to remove bitter saponins." },
    ],
  },
  snack: {
    title: "Snack — 4:00 PM", icon: "🥜",
    target: "~295 kcal | 28–35 g P | 22 g C | 10 g F",
    kcal: "~295 kcal",
    note: "Nuts trimmed across all samples (10g almonds max, walnuts removed). Whey samples fully unchanged.",
    samples: [
      { id: "S1", label: "Hung Curd + Nuts + Fruit", color: "#22c55e", macros: "~295 kcal | 22g P | 24g C | 12g F", badge: "Lower protein",
        items: [
          { ing: "Hung curd", amt: "200g", change: "—", note: "Strain dahi 2–3 hrs through muslin" },
          { ing: "Almonds", amt: "10g (~8 nuts)", change: "↓ from 15g", note: "Weigh — don't eyeball" },
          { ing: "Walnuts", amt: "0g", change: "↓ removed", note: "Saves ~55 kcal" },
          { ing: "Orange or apple", amt: "1 medium (~150g)", change: "—", note: "" },
        ], tip: "Use on a soya-lunch (L1) day only. Strain regular full-fat dahi = Greek yogurt at ⅓ the cost." },
      { id: "S2", label: "Low-Fat Paneer Chaat + Nuts", color: "#f97316", macros: "~295 kcal | 23g P | 15g C | 16g F", badge: "Lower protein",
        items: [
          { ing: "Low-fat paneer (cubed)", amt: "100g", change: "—", note: "Amul Lite (16% fat)" },
          { ing: "Onion + tomato", amt: "80g", change: "—", note: "" },
          { ing: "Almonds", amt: "10g", change: "↓ walnuts removed", note: "" },
          { ing: "Lemon + chaat masala", amt: "to taste", change: "—", note: "" },
          { ing: "Orange", amt: "1 medium (~150g)", change: "—", note: "" },
        ], tip: "Use on a soya-lunch (L1) day. No-cook, ready in 3 min." },
      { id: "S3", label: "Sprouts Chaat + Whey Shake", color: "#3b82f6", macros: "~300 kcal | 35g P | 27g C | 5g F", badge: "High protein ✓",
        items: [
          { ing: "Mixed sprouts (cooked)", amt: "150g (moong + chana)", change: "—", note: "Boil 5 min — food safety" },
          { ing: "Onion + tomato + cucumber", amt: "80g", change: "—", note: "" },
          { ing: "Lemon + chaat masala", amt: "to taste", change: "—", note: "" },
          { ing: "Almonds", amt: "10g", change: "↓ from 15g", note: "" },
          { ing: "Whey in 200ml water", amt: "1 scoop", change: "—", note: "Unchanged" },
          { ing: "Apple (small)", amt: "~120g", change: "—", note: "" },
        ], tip: "Best with rice-bowl lunches (L2/L3/L4). Always boil sprouts — raw sprouts can carry bacteria." },
      { id: "S4", label: "Roasted Chana + Almonds + Whey", color: "#a855f7", macros: "~310 kcal | 34g P | 27g C | 9g F", badge: "High protein ✓",
        items: [
          { ing: "Roasted chana (plain)", amt: "30g", change: "—", note: "Tata Sampann / Haldiram's plain" },
          { ing: "Almonds", amt: "15g (~12 nuts)", change: "↓ from 20g", note: "Saves ~35 kcal" },
          { ing: "Whey in 200ml water", amt: "1 scoop", change: "—", note: "" },
          { ing: "Apple (medium)", amt: "~150g", change: "—", note: "Cinnamon pinch" },
        ], tip: "Best with rice-bowl lunches. Most convenient high-protein snack — everything is portable." },
    ],
  },
  dinner: {
    title: "Dinner — 6:30 PM", icon: "🍛",
    target: "~480 kcal | 42–44 g P | 48 g C | 13 g F",
    kcal: "~480 kcal",
    note: "Rotis cut from 2 → 1 (35g atta). Rice from 100g → 80g cooked. Protein sources identical — only carb sides trimmed.",
    samples: [
      { id: "D1", label: "Paneer Bhurji + Roti + Sabzi", color: "#22c55e", macros: "~480 kcal | 42g P | 46g C | 14g F", badge: "Comfort meal",
        items: [
          { ing: "Low-fat paneer (crumbled)", amt: "100g", change: "—", note: "Amul Lite — non-negotiable" },
          { ing: "Firm tofu (crumbled, mixed in)", amt: "60g", change: "—", note: "Leaner than extra paneer" },
          { ing: "Onion + tomato + capsicum", amt: "80g", change: "—", note: "" },
          { ing: "Cooking oil", amt: "5ml", change: "—", note: "Total including sabzi" },
          { ing: "Roti (whole wheat)", amt: "1 medium (35g atta)", change: "↓ from 2 rotis", note: "No ghee/butter on top" },
          { ing: "Sabzi", amt: "1 portion", change: "—", note: "See Sabzi Builder" },
          { ing: "Big green salad", amt: "full portion", change: "—", note: "Non-negotiable" },
        ], tip: "Regular paneer (28% fat) ruins macros here. 100g regular = 28g fat vs 16g with Amul Lite — saves ~110 kcal." },
      { id: "D2", label: "Tofu Stir-Fry + Sweet Potato", color: "#f97316", macros: "~475 kcal | 44g P | 48g C | 12g F", badge: "Lowest carb",
        items: [
          { ing: "Firm tofu (cubed)", amt: "200g", change: "—", note: "Press water 5 min first" },
          { ing: "Bell peppers + broccoli + garlic", amt: "100g", change: "—", note: "" },
          { ing: "Soy sauce + lemon + black pepper", amt: "to taste", change: "—", note: "" },
          { ing: "Cooking oil", amt: "5ml", change: "—", note: "" },
          { ing: "Sweet potato (baked)", amt: "150g", change: "↓ from 200g", note: "Baked/boiled — not fried" },
          { ing: "Toor/moong dal (cooked)", amt: "120g (20g dry)", change: "↓ from 150g", note: "" },
          { ing: "Big green salad", amt: "full portion", change: "—", note: "" },
        ], tip: "Bake sweet potato — no butter or sugar. Press tofu well for good sear." },
      { id: "D3", label: "Soya Keema + Roti + Raita", color: "#3b82f6", macros: "~475 kcal | 43g P | 56g C | 7g F", badge: "Lowest fat",
        items: [
          { ing: "Soya granules (dry)", amt: "50g", change: "—", note: "Nutrela/Fortune — soak hot 10 min, squeeze fully" },
          { ing: "Onion + tomato", amt: "80g", change: "—", note: "" },
          { ing: "Ginger-garlic paste + spices", amt: "1 tsp", change: "—", note: "" },
          { ing: "Cooking oil", amt: "4ml", change: "—", note: "" },
          { ing: "Roti (whole wheat)", amt: "1 medium (35g atta)", change: "↓ from 2 rotis", note: "No ghee/butter" },
          { ing: "Curd raita", amt: "100g + cucumber", change: "—", note: "" },
          { ing: "Big green salad", amt: "full portion", change: "—", note: "" },
        ], tip: "Squeeze soya granules HARD after soaking — water left in = mushy keema texture." },
      { id: "D4", label: "Besan-Tofu Curry + Jeera Rice", color: "#a855f7", macros: "~490 kcal | 42g P | 52g C | 14g F", badge: "Most variety",
        items: [
          { ing: "Firm tofu (cubed)", amt: "150g", change: "—", note: "" },
          { ing: "Besan (for gravy)", amt: "25g", change: "—", note: "" },
          { ing: "Onion + tomato + spices", amt: "80g", change: "—", note: "" },
          { ing: "Cooking oil", amt: "5ml", change: "—", note: "" },
          { ing: "Cooked jeera rice", amt: "80g (=27g dry)", change: "↓ from 100g", note: "Saves ~35 kcal" },
          { ing: "Sabzi (light)", amt: "½ portion", change: "—", note: "" },
          { ing: "Big green salad", amt: "full portion", change: "—", note: "" },
        ], tip: "Besan gravy gives body to the curry without extra oil. Tofu absorbs spices best when pressed dry." },
    ],
  },
};

const workoutWeek = [
  { day: "MON", name: "REST", icon: "🌿", accent: "#14b8a6", note: "Active recovery. 30–45 min walk. No lifting." },
  { day: "TUE", name: "Push A", icon: "💪", accent: "#3b82f6", note: "Chest + Side Delts + Triceps · LISS 15 min" },
  { day: "WED", name: "Pull A", icon: "🏋️", accent: "#f97316", note: "Back Thickness + Lower Back + Biceps · HIIT 10 min" },
  { day: "THU", name: "Legs A", icon: "🦵", accent: "#22c55e", note: "Quad Focus (Hack Squat + Leg Press) · Walk" },
  { day: "FRI", name: "Push B", icon: "🎯", accent: "#a855f7", note: "Shoulders (all 3 heads) + Chest + Triceps · LISS 15 min" },
  { day: "SAT", name: "Pull B", icon: "🔱", accent: "#ec4899", note: "Back Width + Lower Back + Biceps · HIIT 10 min" },
  { day: "SUN", name: "Legs B", icon: "🍑", accent: "#f59e0b", note: "Hamstrings + Glutes + Calves · Walk" },
];

const salads = {
  bigGreen: {
    label: "Big Green Salad (Dinner)", macros: "~75 kcal | 4g P | 16g C | 0.5g F",
    rows: [
      { ing: "Iceberg/romaine (shredded)", amt: "50g", why: "Crunch, volume, near-zero calories" },
      { ing: "Cucumber (sliced)", amt: "100g", why: "Hydration, fiber" },
      { ing: "Tomato (diced)", amt: "100g", why: "Vitamin C, lycopene" },
      { ing: "Red onion (thin sliced)", amt: "30g", why: "Fiber, prebiotics" },
      { ing: "Carrot (grated)", amt: "40g", why: "Beta-carotene, crunch" },
      { ing: "Bell pepper (diced)", amt: "50g", why: "Vitamin C boost" },
      { ing: "Lemon juice", amt: "10ml", why: "Dressing + iron absorption" },
      { ing: "Black salt, pepper, roasted jeera", amt: "to taste", why: "~0 calories" },
      { ing: "Olive oil", amt: "SKIP", why: "Dinner already has oil" },
    ],
  },
  cucumberTomato: {
    label: "Cucumber-Tomato Salad (Lunch)", macros: "~55 kcal | 2g P | 12g C | 0g F",
    rows: [
      { ing: "Cucumber (sliced)", amt: "100g", why: "~half a medium" },
      { ing: "Tomato (diced)", amt: "100g", why: "~1 medium" },
      { ing: "Red onion (sliced thin)", amt: "30g", why: "Optional" },
      { ing: "Lemon juice", amt: "½ lemon (~10ml)", why: "Squeeze fresh" },
      { ing: "Black salt + chaat masala", amt: "to taste", why: "¼ tsp each" },
      { ing: "Coriander leaves", amt: "5g", why: "Vitamin C, garnish" },
    ],
  },
};

const sabziVegs = [
  { veg: "Palak (spinach)", best: "Iron, very low calorie", tip: "Don't overcook — nutrients lost fast" },
  { veg: "Bhindi (okra)", best: "Fiber, vitamin C", tip: "High heat, no lid — avoids slime" },
  { veg: "Lauki (bottle gourd)", best: "Hydration, ultra-low calorie", tip: "Pair with chana dal mix" },
  { veg: "Baingan (eggplant)", best: "Antioxidants, fiber", tip: "Use less oil than bharta style" },
  { veg: "Gobi (cauliflower)", best: "Vitamin C, volume food", tip: "Dry sabzi style, not creamy" },
  { veg: "Methi (fenugreek)", best: "Iron, bitter-green benefits", tip: "Pair with potato or paneer" },
  { veg: "Mixed veg", best: "Covers all bases", tip: "Carrot + beans + peas + cauliflower" },
];

const supplements = [
  { name: "Creatine Monohydrate", dose: "5g/day", timing: "Post-workout or with breakfast", note: "Take every day — rest days too. Loading not needed." },
  { name: "Whey Protein", dose: "1–2 scoops/day", timing: "Post-workout shake + snack if needed", note: "Unflavoured or chocolate. Check label: ≥22g P per scoop." },
  { name: "Vitamin D3", dose: "2000–4000 IU/day", timing: "Morning with fat-containing meal", note: "Most Indians are deficient. Essential for muscle function." },
  { name: "Omega-3 (Fish Oil)", dose: "1g EPA+DHA/day", timing: "With any meal", note: "Anti-inflammatory, joint health. Algae-based if vegetarian." },
  { name: "Magnesium Glycinate", dose: "200–400mg/day", timing: "Before bed", note: "Improves sleep quality and muscle recovery." },
];

const tabs = ["Meals", "Schedule", "Workout", "Salads", "Supps", "Profile"];

// ─── COMPONENTS ────────────────────────────────────────────────────────────

function MacroBadge({ text, color }) {
  return (
    <span style={{
      background: color + "22",
      color: color,
      border: `1px solid ${color}55`,
      borderRadius: 6,
      fontSize: 11,
      fontWeight: 700,
      padding: "2px 9px",
      whiteSpace: "nowrap",
      letterSpacing: "0.02em",
    }}>{text}</span>
  );
}

function MealCard({ s, expanded, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: "#111c14",
        border: `1px solid #1e2a1f`,
        borderLeft: `3px solid ${s.color}`,
        borderRadius: 12,
        marginBottom: 10,
        cursor: "pointer",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ color: "#f0fdf4", fontWeight: 700, fontSize: 15 }}>{s.label}</span>
            <MacroBadge text={s.badge} color={s.color} />
          </div>
          <div style={{ color: "#6b7f6e", fontSize: 12, marginTop: 4, fontFamily: "monospace" }}>{s.macros}</div>
        </div>
        <span style={{ color: "#4ade80", fontSize: 16, marginLeft: 10, flexShrink: 0 }}>{expanded ? "▾" : "▸"}</span>
      </div>

      {expanded && (
        <div style={{ padding: "0 16px 16px", borderTop: "1px solid #1e2a1f" }}>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
            {s.items.map((it, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                background: "#0d160e", borderRadius: 8, padding: "8px 11px", gap: 8,
              }}>
                <div style={{ flex: 1 }}>
                  <span style={{ color: "#d1fae5", fontSize: 13, fontWeight: 600 }}>{it.ing}</span>
                  {it.note && <div style={{ color: "#6b7f6e", fontSize: 11, marginTop: 2 }}>{it.note}</div>}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ color: "#4ade80", fontSize: 13, fontWeight: 700 }}>{it.amt}</div>
                  {it.change !== "—" && (
                    <div style={{ color: "#f97316", fontSize: 10, marginTop: 1 }}>{it.change}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 12, background: "#0a2212", border: "1px solid #1a3a1e",
            borderRadius: 8, padding: "10px 12px",
          }}>
            <span style={{ color: "#86efac", fontSize: 12, fontStyle: "italic" }}>💡 {s.tip}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function MealsTab() {
  const mealKeys = ["breakfast", "lunch", "snack", "dinner"];
  const mealLabels = { breakfast: "🌅", lunch: "🥗", snack: "🥜", dinner: "🍛" };
  const mealShort = { breakfast: "Breakfast", lunch: "Lunch", snack: "Snack", dinner: "Dinner" };
  const mealKcal = { breakfast: "~565 kcal", lunch: "~580 kcal", snack: "~295 kcal", dinner: "~480 kcal" };

  const [activeMeal, setActiveMeal] = useState("breakfast");
  const [expanded, setExpanded] = useState({});

  const meal = meals[activeMeal];

  const toggle = (id) => setExpanded(e => ({ ...e, [id]: !e[id] }));

  return (
    <div>
      {/* Meal selector tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, overflowX: "auto", paddingBottom: 2 }}>
        {mealKeys.map(k => (
          <button
            key={k}
            onClick={() => setActiveMeal(k)}
            style={{
              flexShrink: 0,
              background: activeMeal === k ? "#0d2e14" : "#0f1a10",
              border: activeMeal === k ? "2px solid #22c55e" : "1px solid #1e2a1f",
              borderRadius: 10,
              padding: "10px 14px",
              cursor: "pointer",
              textAlign: "center",
              minWidth: 80,
            }}
          >
            <div style={{ fontSize: 18 }}>{mealLabels[k]}</div>
            <div style={{ color: activeMeal === k ? "#4ade80" : "#6b7f6e", fontSize: 12, fontWeight: 700, marginTop: 2 }}>{mealShort[k]}</div>
            <div style={{ color: activeMeal === k ? "#86efac" : "#374d39", fontSize: 11, marginTop: 1 }}>{mealKcal[k]}</div>
          </button>
        ))}
      </div>

      {/* Target bar */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ color: "#6b7f6e", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4, textTransform: "uppercase" }}>Target</div>
        <div style={{ color: "#4ade80", fontSize: 16, fontWeight: 800, letterSpacing: "-0.01em" }}>{meal.target}</div>
      </div>

      {/* Note box */}
      <div style={{
        background: "#0d1f0f", border: "1px solid #1a3320",
        borderRadius: 10, padding: "10px 13px", marginBottom: 16,
        color: "#86efac", fontSize: 13,
      }}>
        🥄 {meal.note}
      </div>

      {/* Meal cards */}
      {meal.samples.map(s => (
        <MealCard key={s.id} s={s} expanded={!!expanded[s.id]} onToggle={() => toggle(s.id)} />
      ))}
    </div>
  );
}

function ScheduleTab() {
  return (
    <div>
      <div style={{ color: "#6b7f6e", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 14, textTransform: "uppercase" }}>Daily Timeline</div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 28, top: 20, bottom: 20, width: 2, background: "#1a2e1c", borderRadius: 2 }} />
        {schedule.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 16, marginBottom: 14, position: "relative" }}>
            <div style={{
              width: 42, height: 42, background: "#0d1f0f", border: "2px solid #22c55e33",
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, flexShrink: 0, zIndex: 1,
            }}>{s.icon}</div>
            <div style={{ background: "#0f1a10", border: "1px solid #1a2e1c", borderRadius: 10, padding: "10px 13px", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 4 }}>
                <div>
                  <div style={{ color: "#d1fae5", fontWeight: 700, fontSize: 14 }}>{s.label}</div>
                  <div style={{ color: "#4ade80", fontSize: 11, marginTop: 2, fontFamily: "monospace" }}>{s.time}</div>
                </div>
                {s.cal !== "—" && (
                  <span style={{
                    background: "#0a2212", border: "1px solid #1a3320",
                    color: "#86efac", borderRadius: 6, fontSize: 11, fontWeight: 700,
                    padding: "2px 8px", flexShrink: 0,
                  }}>{s.cal}</span>
                )}
              </div>
              <div style={{ color: "#6b7f6e", fontSize: 12, marginTop: 6 }}>{s.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkoutTab() {
  return (
    <div>
      <div style={{ color: "#6b7f6e", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 14, textTransform: "uppercase" }}>Weekly PPL Split</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {workoutWeek.map((w, i) => (
          <div key={i} style={{
            background: "#0f1a10", border: `1px solid ${w.accent}33`,
            borderLeft: `3px solid ${w.accent}`, borderRadius: 12, padding: "13px 16px",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{ fontSize: 26, flexShrink: 0 }}>{w.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                <span style={{ color: w.accent, fontSize: 12, fontWeight: 800, letterSpacing: "0.1em" }}>{w.day}</span>
                <span style={{ color: "#d1fae5", fontWeight: 700, fontSize: 15 }}>{w.name}</span>
              </div>
              <div style={{ color: "#6b7f6e", fontSize: 12, marginTop: 3 }}>{w.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SaladsTab() {
  const [activeS, setActiveS] = useState("bigGreen");
  const sal = salads[activeS];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[["bigGreen", "🥬 Big Green"], ["cucumberTomato", "🥒 Cucumber-Tomato"]].map(([k, lbl]) => (
          <button key={k} onClick={() => setActiveS(k)} style={{
            flex: 1, background: activeS === k ? "#0d2e14" : "#0f1a10",
            border: activeS === k ? "2px solid #22c55e" : "1px solid #1e2a1f",
            borderRadius: 10, padding: "10px 8px", cursor: "pointer",
            color: activeS === k ? "#4ade80" : "#6b7f6e", fontWeight: 700, fontSize: 13,
          }}>{lbl}</button>
        ))}
      </div>
      <div style={{ background: "#0a2212", border: "1px solid #1a3320", borderRadius: 8, padding: "8px 12px", marginBottom: 14 }}>
        <span style={{ color: "#86efac", fontSize: 12, fontWeight: 700 }}>{sal.label}</span>
        <span style={{ color: "#4ade80", fontSize: 11, marginLeft: 10, fontFamily: "monospace" }}>{sal.macros}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {sal.rows.map((r, i) => (
          <div key={i} style={{
            background: "#0f1a10", border: "1px solid #1a2e1c", borderRadius: 8,
            padding: "9px 12px", display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          }}>
            <div>
              <div style={{ color: "#d1fae5", fontSize: 13, fontWeight: 600 }}>{r.ing}</div>
              <div style={{ color: "#6b7f6e", fontSize: 11, marginTop: 2 }}>{r.why}</div>
            </div>
            <div style={{ color: "#4ade80", fontSize: 13, fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>{r.amt}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ color: "#6b7f6e", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12, textTransform: "uppercase" }}>Sabzi Options</div>
        {sabziVegs.map((v, i) => (
          <div key={i} style={{
            background: "#0f1a10", border: "1px solid #1a2e1c", borderRadius: 10,
            padding: "11px 13px", marginBottom: 8,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
              <span style={{ color: "#d1fae5", fontWeight: 700, fontSize: 14 }}>{v.veg}</span>
              <span style={{ background: "#0a2212", border: "1px solid #1a3320", color: "#4ade80", borderRadius: 6, fontSize: 11, padding: "2px 8px" }}>{v.best}</span>
            </div>
            <div style={{ color: "#6b7f6e", fontSize: 12, marginTop: 4 }}>💡 {v.tip}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SuppsTab() {
  return (
    <div>
      <div style={{ color: "#6b7f6e", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 14, textTransform: "uppercase" }}>Supplement Stack</div>
      {supplements.map((s, i) => (
        <div key={i} style={{
          background: "#0f1a10", border: "1px solid #1a2e1c",
          borderLeft: "3px solid #22c55e", borderRadius: 12, padding: "13px 16px", marginBottom: 10,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
            <span style={{ color: "#d1fae5", fontWeight: 700, fontSize: 15 }}>{s.name}</span>
            <span style={{ background: "#0a2212", border: "1px solid #1a3320", color: "#4ade80", borderRadius: 6, fontSize: 11, fontWeight: 700, padding: "2px 9px" }}>{s.dose}</span>
          </div>
          <div style={{ color: "#86efac", fontSize: 12, marginBottom: 4 }}>⏰ {s.timing}</div>
          <div style={{ color: "#6b7f6e", fontSize: 12 }}>{s.note}</div>
        </div>
      ))}
    </div>
  );
}

function ProfileTab() {
  const rows = [
    ["🎯 Goal", profile.goal],
    ["⏱ Timeline", profile.timeline],
    ["📉 Pace", profile.pace],
    ["🔥 Calories", profile.calories],
    ["🥩 Protein", profile.protein],
    ["🌾 Carbs", profile.carbs],
    ["🫒 Fat", profile.fat],
    ["📊 Deficit", profile.deficit],
    ["🕘 Eating Window", profile.eatWindow],
    ["🌙 Fast", profile.fast],
    ["💧 Water", profile.water],
    ["😴 Sleep", profile.sleep],
  ];
  return (
    <div>
      <div style={{ color: "#6b7f6e", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 14, textTransform: "uppercase" }}>Profile & Targets</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {rows.map(([k, v], i) => (
          <div key={i} style={{
            background: "#0f1a10", border: "1px solid #1a2e1c", borderRadius: 10,
            padding: "11px 14px", display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ color: "#6b7f6e", fontSize: 13 }}>{k}</span>
            <span style={{ color: "#4ade80", fontWeight: 700, fontSize: 14 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────

export default function DietPage() {
  const [activeTab, setActiveTab] = useState("Meals");

  const tabComponents = {
    Meals: <MealsTab />,
    Schedule: <ScheduleTab />,
    Workout: <WorkoutTab />,
    Salads: <SaladsTab />,
    Supps: <SuppsTab />,
    Profile: <ProfileTab />,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#060d07",
      color: "#d1fae5",
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      maxWidth: 480,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        background: "#0a1a0c",
        borderBottom: "1px solid #1a2e1c",
        padding: "18px 20px 14px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{
            width: 36, height: 36, background: "#14532d", border: "2px solid #22c55e",
            borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>💪</div>
          <div>
            <div style={{ color: "#f0fdf4", fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>Vivek's Diet Plan</div>
            <div style={{ color: "#4ade80", fontSize: 11, fontFamily: "monospace" }}>v6 · 2,100 kcal · IF 14:10</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ color: "#22c55e", fontSize: 11, fontWeight: 700 }}>{profile.goal}</div>
            <div style={{ color: "#6b7f6e", fontSize: 10 }}>{profile.timeline}</div>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 2 }}>
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                flexShrink: 0,
                background: activeTab === t ? "#14532d" : "transparent",
                border: activeTab === t ? "1px solid #22c55e" : "1px solid #1a2e1c",
                borderRadius: 8,
                padding: "6px 13px",
                color: activeTab === t ? "#4ade80" : "#6b7f6e",
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >{t}</button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "20px 16px 40px", overflowY: "auto" }}>
        {tabComponents[activeTab]}
      </div>
    </div>
  );
}

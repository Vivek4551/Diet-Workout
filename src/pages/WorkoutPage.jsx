import { useState, useEffect } from "react";

// ─── FULL DATA FROM PDF ───────────────────────────────────────────────────────
const DAYS = [
  {
    id: 1, label: "Mon", name: "Rest", emoji: "😴",
    focus: "Active Recovery", subtitle: "No lifting",
    accent: "#94a3b8", accentDim: "#1e2530",
    isRest: true,
    exercises: [], core: [], cardio: null, cooldown: [],
    tip: "Rest from LIFTING, not movement. Active recovery speeds up muscle repair vs lying on the couch.",
    restActivities: [
      { icon: "🚶", label: "Easy walk", detail: "30-45 min outdoors or treadmill. Normal conversation pace." },
      { icon: "🚴", label: "Casual cycle", detail: "30-40 min at relaxed pace, no intervals." },
      { icon: "🧘", label: "Mobility / yoga", detail: "15-20 min full-body stretching (YouTube)." },
      { icon: "🫧", label: "Foam rolling", detail: "10-15 min on lats, IT band, quads, calves, upper back." },
      { icon: "🏸", label: "Sports / recreation", detail: "Casual swim, badminton, hiking." },
    ],
    restNot: ["No lifting (even 'just a little arms')", "No HIIT or sprint work", "No long runs over 45 min"],
    foodNote: "Stick to rest-day calories (~2,200 kcal). Skip post-workout shake. Most muscle growth happens during rest.",
  },
  {
    id: 2, label: "Tue", name: "Push A", emoji: "💪",
    focus: "Chest Focus", subtitle: "Upper / Middle / Lower",
    duration: "~90 min", accent: "#4ade80", accentDim: "#1a3d28",
    keyEmphasis: "Chest hit from three angles: flat bench (middle), incline (upper), dips (lower). Lateral raises (#5) are the biggest payoff exercise — light weight, strict form.",
    warmup: {
      cardio: "3-4 min light cardio (treadmill walk 5-6 km/h). Heart rate to ~110 bpm.",
      dynamic: ["Arm circles fwd×15 + back×15", "Cross-body swings×15 each", "Wall slides×10", "Band pull-aparts×15 (no band? → light DB rear delt fly 2-3 kg×15, OR bodyweight scapular squeezes×15)", "Light push-ups×10", "Cat-cow×8"],
      warmupSets: "On Bench Press: 2 pyramid sets — empty bar×10, 40 kg×5, then working sets.",
    },
    exercises: [
      { id: "2a", name: "Barbell Bench Press", tag: "Strength Anchor", tagColor: "#facc15", targets: "Middle chest, front delts, triceps", sets: 4, reps: "6-8", rest: "2 min", star: "" },
      { id: "2b", name: "Incline Barbell Press OR Incline DB Press", tag: "Fastest Results", tagColor: "#4ade80", targets: "Upper chest, front delts", sets: 3, reps: "8-10", rest: "90 sec", star: "★★" },
      { id: "2c", name: "Weighted Dips OR Bodyweight Dips OR Decline DB Press", tag: null, targets: "Lower chest, triceps", sets: 3, reps: "8-10", rest: "90 sec", star: "" },
      { id: "2d", name: "Pec Deck (Jerai)", tag: null, targets: "Inner / middle chest (squeeze)", sets: 3, reps: "10-12", rest: "60 sec", star: "" },
      { id: "2e", name: "Dumbbell Lateral Raise", tag: "Fastest Results", tagColor: "#4ade80", targets: "Side delts (shoulder cap)", sets: 3, reps: "12-15", rest: "60 sec", star: "★★" },
      { id: "2f", name: "Triceps Rope Pushdown", tag: null, targets: "Triceps (lateral + medial heads)", sets: 3, reps: "10-12", rest: "60 sec", star: "" },
      { id: "2g", name: "Overhead Triceps Extension OR Skullcrushers (EZ bar)", tag: null, targets: "Triceps long head (for size)", sets: 2, reps: "10-12", rest: "60 sec", star: "" },
    ],
    formCues: [
      { name: "Bench Press", cue: "Feet flat, shoulder blades retracted, bar touches mid-chest, elbows at ~75° (not 90°)." },
      { name: "Incline DB Press", cue: "Bench at 30° (NOT 45° — that's shoulder press), thumbs over the bar, full ROM." },
      { name: "Dips (chest)", cue: "Lean torso ~15° forward, lower until upper arms parallel, drive up." },
      { name: "Pec Deck", cue: "Seat height so handles align with mid-chest, slight elbow bend, squeeze HARD 1 sec." },
      { name: "Lateral Raise", cue: "Slight forward lean, lead with elbows, stop at shoulder height, pause 1 sec." },
    ],
    mistakes: [
      "Swinging lateral raises with momentum — strict 5-7 kg beats sloppy 12 kg.",
      "Bouncing the bench bar off chest — controlled 2-sec descent, brief pause, drive up.",
      "Skipping #3 — lower chest gives the 'shelf' under the pec, don't neglect it.",
    ],
    core: [
      { id: "2c1", name: "Plank (forearm hold)", sets: 3, reps: "30-45 sec" },
      { id: "2c2", name: "Lying Leg Raises", sets: 3, reps: "12-15 reps" },
      { id: "2c3", name: "Bicycle Crunches", sets: 2, reps: "20 reps total" },
    ],
    cardio: {
      type: "LISS",
      duration: "15 min",
      protocol: [
        { label: "Equipment", val: "Incline treadmill" },
        { label: "Speed", val: "3.5–4 km/h" },
        { label: "Incline", val: "8–12%" },
        { label: "Target HR", val: "~120–130 bpm" },
        { label: "Effort", val: "Should talk in short sentences" },
      ],
      note: "Alternate: stationary cycle at moderate pace.",
    },
    cooldown: [
      { id: "2s1", name: "Doorway chest stretch", duration: "20-30 sec each side", target: "Pecs / anterior delts" },
      { id: "2s2", name: "Cross-body shoulder stretch", duration: "20-30 sec each", target: "Posterior delts / rotator cuff" },
      { id: "2s3", name: "Overhead triceps stretch", duration: "20-30 sec each arm", target: "Triceps long head" },
      { id: "2s4", name: "Child's pose", duration: "20-30 sec", target: "Lats / thoracic spine" },
      { id: "2s5", name: "Wall pec stretch", duration: "20-30 sec each side", target: "Chest / anterior shoulder" },
    ],
    tip: "Lateral raises: strict 5-7 kg beats sloppy 12 kg. Swinging momentum kills the point.",
  },
  {
    id: 3, label: "Wed", name: "Pull A", emoji: "🏋️",
    focus: "Back Thickness", subtitle: "Lower Back + Biceps",
    duration: "~90 min", accent: "#60a5fa", accentDim: "#1a2a3d",
    keyEmphasis: "Thickness day — horizontal pulling (rows) builds the dense back look. Deadlift OR Barbell Row: pick ONE and progress weight weekly. Back Extension = 'sit-ups for the back'. Reverse Pec Deck: sit facing the pad.",
    warmup: {
      cardio: "3-4 min light cardio. Heart rate to ~110 bpm.",
      dynamic: ["Arm circles×15 each", "Scapular pull-ups×10", "Band face pulls×15 (no band? → light cable face pulls 5 kg, OR DB rear delt fly 2-3 kg×15)", "Cat-cow×8", "Thoracic rotations×5 each", "Dead hang×20-30 sec"],
      warmupSets: "On Barbell Row: 2 pyramid sets before working weight.",
    },
    exercises: [
      { id: "3a", name: "Conventional Deadlift OR Barbell Row OR Chest-supported Row", tag: "Strength Anchor", tagColor: "#facc15", targets: "Whole back, lats, hams, glutes (deadlift); mid-back, lats (rows)", sets: 4, reps: "5-8", rest: "2-3 min", star: "" },
      { id: "3b", name: "Lat Pulldown (close-grip neutral V-handle)", tag: null, targets: "Lats (lower fibers), biceps", sets: 3, reps: "8-10", rest: "90 sec", star: "" },
      { id: "3c", name: "Seated Cable Row (Jerai)", tag: null, targets: "Rhomboids, mid-traps", sets: 3, reps: "10-12", rest: "90 sec", star: "" },
      { id: "3d", name: "Back Extension (Hyperextension)", tag: "Priority", tagColor: "#4ade80", targets: "Lower back, glutes, hamstrings", sets: 3, reps: "12-15", rest: "60 sec", star: "★" },
      { id: "3e", name: "Reverse Pec Deck OR Cable Rear Delt Fly", tag: null, targets: "Rear delts, rhomboids", sets: 3, reps: "12-15", rest: "60 sec", star: "" },
      { id: "3f", name: "Barbell Curl OR Dumbbell Bicep Curl", tag: null, targets: "Biceps (long + short head)", sets: 3, reps: "10-12", rest: "60 sec", star: "" },
      { id: "3g", name: "Hammer Curl", tag: "Priority", tagColor: "#4ade80", targets: "Brachialis, brachioradialis, forearms", sets: 2, reps: "10-12", rest: "60 sec", star: "★" },
    ],
    formCues: [
      { name: "Conventional Deadlift", cue: "Bar over mid-foot, hip hinge to grip, neutral spine, chest up, drive through floor — bar slides up legs. NEVER round the lower back." },
      { name: "Barbell Row", cue: "Torso at 45°, pull bar to lower chest/upper abs, squeeze shoulder blades at top." },
      { name: "Lat Pulldown (close grip)", cue: "Lean back 10°, pull V-handle to upper chest, elbows down-and-back, full lat stretch at top." },
      { name: "Seated Cable Row", cue: "Chest tall, pull handle to navel, squeeze shoulder blades." },
      { name: "Back Extension", cue: "Hip on the pad, lower until hamstring stretch, raise until body is straight (don't bend backwards past flat)." },
      { name: "Reverse Pec Deck", cue: "Sit facing pad, chest pressed against pad, drive elbows back and out." },
      { name: "Barbell Curl", cue: "Elbows pinned, no torso swing, 3-sec lowering. Heavier than DB curl = strength gains." },
    ],
    mistakes: [
      "Deadlift with rounded back — #1 cause of back injuries. Keep neutral spine, drop weight if form breaks.",
      "Using arms on rows instead of back — initiate with shoulder blades, arms are just hooks.",
      "Hyper-extending the back on Back Extension — stop when body is straight, protects spine.",
      "Going heavy on Reverse Pec Deck — rear delts are small, 5-10 kg per side is enough.",
      "Half-rep curls — full extension at bottom, full squeeze at top.",
    ],
    core: [
      { id: "3c1", name: "Hanging Knee Raises", sets: 3, reps: "10-12 reps" },
      { id: "3c2", name: "Reverse Crunches (floor)", sets: 3, reps: "12-15 reps" },
      { id: "3c3", name: "Dead Bug", sets: 2, reps: "10 each side" },
    ],
    cardio: {
      type: "HIIT",
      duration: "10 min",
      protocol: [
        { label: "Equipment", val: "Cycle / Rower / Air bike" },
        { label: "Warm-up", val: "1 min easy" },
        { label: "Work", val: "30 sec ALL-OUT" },
        { label: "Recovery", val: "60 sec easy" },
        { label: "Rounds", val: "× 7 rounds" },
        { label: "Cool-down", val: "1 min easy" },
        { label: "Effort", val: "Should feel breathless during work intervals" },
      ],
      note: null,
    },
    cooldown: [
      { id: "3s1", name: "Lat stretch (overhead reach, lean each side)", duration: "20-30 sec each side", target: "Lats / teres major" },
      { id: "3s2", name: "Cross-body shoulder stretch", duration: "20-30 sec each", target: "Posterior delts" },
      { id: "3s3", name: "Bicep wall stretch", duration: "20-30 sec each arm", target: "Biceps / anterior shoulder" },
      { id: "3s4", name: "Cat-cow", duration: "×10 reps", target: "Spinal mobility / lower back" },
      { id: "3s5", name: "Seated forward fold", duration: "20-30 sec", target: "Hamstrings / lower back" },
    ],
    tip: "Thickness day — initiate rows with shoulder blades, arms are just hooks. Rear delts: 5-10 kg per side is enough.",
  },
  {
    id: 4, label: "Thu", name: "Legs A", emoji: "🦵",
    focus: "Quad Focus", subtitle: "Hack Squat + Leg Press",
    duration: "~80 min", accent: "#f97316", accentDim: "#3d2210",
    keyEmphasis: "Hack Squat — one of the BEST quad builders. Safer than back squat, isolates quads better. Pair with Leg Press to build the quad sweep. Don't skip leg day — legs are 50%+ of your muscle mass.",
    warmup: {
      cardio: "3-4 min light cardio. Heart rate to ~110 bpm.",
      dynamic: ["Bodyweight squats×15", "Walking lunges×10 each", "Leg swings front-back×10 each", "Leg swings side-side×10 each", "Hip circles×10 each", "Glute bridges×15", "Ankle circles×10 each"],
      warmupSets: "Pyramid up to working weight on Hack Squat — empty sled, then add weight gradually.",
    },
    exercises: [
      { id: "4a", name: "Barbell Back Squat OR Hack Squat", tag: "Strength Anchor", tagColor: "#facc15", targets: "Quads (sweep), glutes, hamstrings, core", sets: 4, reps: "6-10", rest: "2-3 min", star: "★★" },
      { id: "4b", name: "Leg Press (feet lower for quads)", tag: null, targets: "Quads, glutes", sets: 3, reps: "10-12", rest: "2 min", star: "" },
      { id: "4c", name: "Romanian Deadlift", tag: null, targets: "Hamstrings, glutes, lower back", sets: 3, reps: "8-10", rest: "90 sec", star: "" },
      { id: "4d", name: "Walking Lunges (DB) OR Bulgarian Split Squat", tag: null, targets: "Quads, glutes (unilateral)", sets: 3, reps: "10 each", rest: "90 sec", star: "" },
      { id: "4e", name: "Leg Extension", tag: null, targets: "Quads isolation (VMO 'teardrop')", sets: 3, reps: "12-15", rest: "60 sec", star: "" },
      { id: "4f", name: "Standing Calf Raise", tag: null, targets: "Gastrocnemius (upper calf)", sets: 4, reps: "12-15", rest: "60 sec", star: "" },
    ],
    formCues: [
      { name: "Barbell Back Squat", cue: "Bar on upper traps, feet shoulder-width, toes 15-20° out, knees track over toes, break parallel. Brace core hard." },
      { name: "Hack Squat", cue: "Feet shoulder-width, mid-foot on platform, lower until knees ~90°, drive through heels. Don't lock knees at top." },
      { name: "Leg Press", cue: "Feet shoulder-width, lower until knees ~90°, drive through heels. DON'T lock knees." },
      { name: "RDL", cue: "Hip hinge (push butt back), slight knee bend, bar slides down thighs, drive hips forward." },
      { name: "Bulgarian Split Squat", cue: "Rear foot on bench, front foot far enough that knee tracks over toes, drop straight down." },
      { name: "Leg Extension", cue: "Full ROM, pause 1 sec at top, controlled descent." },
    ],
    mistakes: [
      "Knees caving inward — push knees OUT, drive through outside of feet.",
      "Back Squat: leaning too far forward — keep chest up, drive through heels.",
      "Going too light because legs hurt — legs recover fastest, push the squats.",
      "Locking knees at top of leg press — joint stress = injury, stop just short of lockout.",
      "Skipping calves — underdeveloped calves look weird in shorts.",
    ],
    core: [
      { id: "4c1", name: "Cable Crunches", sets: 3, reps: "12-15 reps" },
      { id: "4c2", name: "Side Plank (each side)", sets: 2, reps: "20-30 sec each" },
    ],
    cardio: {
      type: "Walk",
      duration: "5-10 min",
      protocol: [
        { label: "Equipment", val: "Treadmill (flat)" },
        { label: "Speed", val: "3–3.5 km/h" },
        { label: "Incline", val: "Flat (0%)" },
        { label: "Purpose", val: "Flush legs, active recovery" },
      ],
      note: "No dedicated cardio — legs are smoked. Forcing cardio after heavy squats hurts recovery and tomorrow's workout.",
    },
    cooldown: [
      { id: "4s1", name: "Standing quad stretch", duration: "20-30 sec each", target: "Quads / hip flexors" },
      { id: "4s2", name: "Seated hamstring stretch", duration: "20-30 sec each leg", target: "Hamstrings" },
      { id: "4s3", name: "Pigeon pose / Figure-4", duration: "20-30 sec each side", target: "Glutes / piriformis" },
      { id: "4s4", name: "Standing calf stretch", duration: "20-30 sec each", target: "Gastrocnemius / soleus" },
      { id: "4s5", name: "Couch stretch / Hip flexor lunge", duration: "20-30 sec each side", target: "Hip flexors / quads" },
      { id: "4s6", name: "Child's pose", duration: "20-30 sec", target: "Lats / thoracic spine" },
    ],
    tip: "Hack Squat = best quad builder. Alternate weekly with Back Squat. Never lock knees at top of leg press.",
  },
  {
    id: 5, label: "Fri", name: "Push B", emoji: "🔥",
    focus: "Shoulders Priority", subtitle: "All 3 Delt Heads",
    duration: "~90 min", accent: "#a78bfa", accentDim: "#2a1a3d",
    keyEmphasis: "Your #1 shoulder day. All three delt heads: front (overhead press), side (cable lateral — the cap), rear (reverse pec deck — the 3D look from behind). Cable Lateral Raise at 4 sets is intentional.",
    warmup: {
      cardio: "3-4 min light cardio. Heart rate to ~110 bpm.",
      dynamic: ["Arm circles×15 each", "Cross-body swings×15", "Wall slides×10", "Band pull-aparts×15 (no band? → light DB rear delt fly 2-3 kg×15)", "Band shoulder dislocates×10 (no band? → broomstick pass-throughs×10)", "Light push-ups×10"],
      warmupSets: "Pyramid up to working weight on Overhead Press — shoulder day, warm them up well.",
    },
    exercises: [
      { id: "5a", name: "Standing OHP (BB) OR Push Press OR Seated DB Shoulder Press", tag: "Strength Anchor", tagColor: "#facc15", targets: "Front delts, side delts, triceps", sets: 4, reps: "5-8", rest: "2-3 min", star: "★" },
      { id: "5b", name: "Incline Barbell Bench Press", tag: "Fastest Results", tagColor: "#4ade80", targets: "Upper chest, front delts", sets: 3, reps: "8-10", rest: "90 sec", star: "★★" },
      { id: "5c", name: "Cable Lateral Raise", tag: "Fastest Results", tagColor: "#4ade80", targets: "Side delts (shoulder cap)", sets: 4, reps: "12-15", rest: "60 sec", star: "★★" },
      { id: "5d", name: "Reverse Pec Deck (Rear Delt Fly)", tag: null, targets: "Rear delts (3D shoulder look from behind)", sets: 3, reps: "12-15", rest: "60 sec", star: "" },
      { id: "5e", name: "Weighted Dips OR Bodyweight Dips OR Machine Chest Press", tag: null, targets: "Lower chest, triceps, front delts", sets: 3, reps: "8-10", rest: "90 sec", star: "" },
      { id: "5f", name: "Close-grip Bench Press", tag: null, targets: "Triceps (primary), inner chest", sets: 3, reps: "8-10", rest: "90 sec", star: "" },
    ],
    formCues: [
      { name: "Overhead Press", cue: "Tight core (no leaning back), bar/DBs stack over shoulders, full lockout overhead. Glutes squeezed." },
      { name: "Push Press", cue: "Same as OHP but slight leg dip + drive to push heavier weight — great for breaking strength plateaus." },
      { name: "Cable Lateral Raise", cue: "Stand sideways to machine, cable in opposite hand, lead with elbow." },
      { name: "Reverse Pec Deck", cue: "Sit facing pad, chest against pad, drive elbows back and out." },
      { name: "Weighted Dips", cue: "Add belt with weight plate. Lean torso ~15° forward, lower until upper arms parallel." },
      { name: "Close-grip Bench", cue: "Grip just inside shoulder width, elbows tucked, focus on triceps drive." },
    ],
    mistakes: [
      "Leaning back on Overhead Press — becomes incline bench. Glutes squeezed, core tight.",
      "Going heavy on lateral raises — cable lateral burns at 5-10 kg for most beginners.",
      "Skipping reverse pec deck — rear delts make shoulders pop from behind.",
    ],
    core: [
      { id: "5c1", name: "Decline Sit-ups (or floor sit-ups)", sets: 3, reps: "12-15 reps" },
      { id: "5c2", name: "Plank with Shoulder Taps", sets: 3, reps: "20 taps total" },
      { id: "5c3", name: "Russian Twists (weighted optional)", sets: 2, reps: "20 total" },
    ],
    cardio: {
      type: "LISS",
      duration: "15 min",
      protocol: [
        { label: "Equipment", val: "Incline treadmill" },
        { label: "Speed", val: "3.5–4 km/h" },
        { label: "Incline", val: "8–12%" },
        { label: "Target HR", val: "~120–130 bpm" },
        { label: "Effort", val: "Alternate: stationary cycle at moderate pace" },
      ],
      note: null,
    },
    cooldown: [
      { id: "5s1", name: "Doorway chest stretch", duration: "20-30 sec each side", target: "Pecs / anterior delts" },
      { id: "5s2", name: "Cross-body shoulder stretch", duration: "20-30 sec each", target: "Posterior delts" },
      { id: "5s3", name: "Overhead triceps stretch", duration: "20-30 sec each arm", target: "Triceps long head" },
      { id: "5s4", name: "Sleeper stretch for rotator cuff", duration: "20-30 sec each side", target: "Rotator cuff / internal rotation" },
      { id: "5s5", name: "Child's pose", duration: "20-30 sec", target: "Lats / lower back" },
    ],
    tip: "Cable Lateral at 4 sets is intentional — biggest driver of the capped shoulder look. Rear delts = the 3D pop from behind.",
  },
  {
    id: 6, label: "Sat", name: "Pull B", emoji: "🔙",
    focus: "Back Width", subtitle: "Lats + Lower Back + Biceps",
    duration: "~90 min", accent: "#34d399", accentDim: "#0f3028",
    keyEmphasis: "Width day — vertical pulling widens the upper back. BIGGEST contributor to V-taper, more than shoulders. If you can't do unassisted pull-ups yet, use the assisted machine. Work up to 10 unassisted by month 4-5.",
    warmup: {
      cardio: "3-4 min light cardio. Heart rate to ~110 bpm.",
      dynamic: ["Arm circles×15 each", "Scapular pull-ups×10", "Band face pulls×15 (no band? → light cable face pulls 5 kg, OR DB rear delt fly 2-3 kg×15)", "Dead hang×20-30 sec", "Cat-cow×8", "Thoracic rotations×5 each"],
      warmupSets: "Light pulldowns or assisted pull-ups before working sets.",
    },
    exercises: [
      { id: "6a", name: "Weighted Pull-ups OR Pull-ups (assisted)", tag: "Strength Anchor", tagColor: "#facc15", targets: "Lats (width), biceps, rhomboids", sets: 4, reps: "5-10", rest: "2-3 min", star: "★★" },
      { id: "6b", name: "Lat Pulldown (wide grip — wide V-bar or straight bar)", tag: null, targets: "Upper lats (width)", sets: 3, reps: "8-10", rest: "90 sec", star: "" },
      { id: "6c", name: "T-Bar Row OR Chest-supported Row", tag: null, targets: "Mid-back, lats", sets: 3, reps: "8-10", rest: "90 sec", star: "" },
      { id: "6d", name: "Straight-arm Cable Pullover", tag: null, targets: "Lats isolation (stretch)", sets: 3, reps: "10-12", rest: "60 sec", star: "" },
      { id: "6e", name: "Back Extension (Hyperextension)", tag: null, targets: "Lower back, glutes, hamstrings", sets: 3, reps: "12-15", rest: "60 sec", star: "" },
      { id: "6f", name: "Barbell Curl OR Preacher Curl (EZ bar / Machine)", tag: null, targets: "Biceps (heavy strength + peak)", sets: 3, reps: "8-12", rest: "60 sec", star: "" },
      { id: "6g", name: "Cable Curl", tag: null, targets: "Biceps (constant tension, pump)", sets: 2, reps: "12-15", rest: "60 sec", star: "" },
    ],
    formCues: [
      { name: "Pull-ups", cue: "Full dead hang at bottom, chin OVER bar, squeeze lats at top. Don't kip." },
      { name: "Weighted Pull-ups", cue: "Once you hit 10 clean bodyweight reps, add weight belt with 5 kg, drop reps to 5-6, progress weekly." },
      { name: "Lat Pulldown (wide)", cue: "Wide V-bar or wide straight bar, overhand grip wider than shoulders, lean back 10°, pull to upper chest." },
      { name: "T-Bar / Chest-supported Row", cue: "Chest stays on pad (zero torso movement), pull elbows back." },
      { name: "Straight-arm Pullover", cue: "Stand back from cable, slight frozen elbow bend, drive from lats." },
      { name: "Barbell Curl", cue: "Grip shoulder-width, elbows pinned to sides, no swinging. Heavier than DB = strength gains." },
      { name: "Preacher Curl", cue: "Armpit pressed into top of pad, full extension at bottom (almost straight)." },
    ],
    mistakes: [
      "Half-rep pull-ups — full ROM or use assistance. Chin must clear the bar.",
      "Pulling lat pulldown behind the neck — pull to upper chest only, protects shoulders.",
      "Bending elbows on Straight-arm Pullover — keep them locked, drive from lats.",
      "Curling with momentum — lighter weight, strict form. Biceps grow from tension.",
    ],
    core: [
      { id: "6c1", name: "Hanging Leg Raises ★★ (best ab exercise)", sets: 3, reps: "10-12 reps" },
      { id: "6c2", name: "V-Ups (or Tuck-Ups for beginners)", sets: 3, reps: "10-12 reps" },
      { id: "6c3", name: "Side Plank with Hip Dip (each side)", sets: 2, reps: "10 reps each" },
    ],
    cardio: {
      type: "HIIT",
      duration: "10 min",
      protocol: [
        { label: "Equipment", val: "Rower (preferred) / Cycle / Air bike" },
        { label: "Warm-up", val: "1 min easy" },
        { label: "Work", val: "30 sec ALL-OUT" },
        { label: "Recovery", val: "60 sec easy" },
        { label: "Rounds", val: "× 7 rounds" },
        { label: "Cool-down", val: "1 min easy" },
        { label: "Pro tip", val: "Rower works best — full body, less leg fatigue for tomorrow's legs" },
      ],
      note: null,
    },
    cooldown: [
      { id: "6s1", name: "Lat stretch (overhead reach, lean each side)", duration: "20-30 sec each side", target: "Lats / teres major" },
      { id: "6s2", name: "Cross-body shoulder stretch", duration: "20-30 sec each", target: "Posterior delts" },
      { id: "6s3", name: "Bicep wall stretch", duration: "20-30 sec each arm", target: "Biceps / anterior shoulder" },
      { id: "6s4", name: "Cat-cow", duration: "×10 reps", target: "Spinal mobility" },
      { id: "6s5", name: "Seated forward fold", duration: "20-30 sec", target: "Hamstrings / lower back" },
      { id: "6s6", name: "Child's pose", duration: "20-30 sec", target: "Lats / thoracic spine" },
    ],
    tip: "Width day — vertical pulling = the SINGLE biggest contributor to V-taper. Full dead hang at bottom of every pull-up rep.",
  },
  {
    id: 7, label: "Sun", name: "Legs B", emoji: "🍑",
    focus: "Hamstrings + Glutes", subtitle: "Posterior Chain",
    duration: "~80 min", accent: "#fb7185", accentDim: "#3d1020",
    keyEmphasis: "Posterior chain day. RDLs and hip thrusts build hamstrings and glutes — what fills out jeans and prevents the 'all upper body' look. Seated calf raise hits the soleus (different from Wednesday's standing).",
    warmup: {
      cardio: "3-4 min light cardio. Heart rate to ~110 bpm.",
      dynamic: ["Bodyweight squats×15", "Walking lunges×10 each", "Leg swings front-back×10 each", "Leg swings side-side×10 each", "Hip circles×10 each", "Glute bridges×15", "Bird-dog×8 each side"],
      warmupSets: "Pyramid up to working weight on RDLs.",
    },
    exercises: [
      { id: "7a", name: "Romanian Deadlift OR Stiff-leg Deadlift", tag: "Strength Anchor", tagColor: "#facc15", targets: "Hamstrings, glutes, lower back", sets: 4, reps: "6-10", rest: "2-3 min", star: "" },
      { id: "7b", name: "Bulgarian Split Squat OR Reverse Lunge (DB)", tag: null, targets: "Quads, glutes (unilateral)", sets: 3, reps: "8-10 each", rest: "90 sec", star: "" },
      { id: "7c", name: "Barbell Hip Thrust OR Machine Hip Thrust", tag: "Fastest Results", tagColor: "#4ade80", targets: "Glutes (primary)", sets: 3, reps: "8-12", rest: "90 sec", star: "★★" },
      { id: "7d", name: "Reverse Hack Squat", tag: null, targets: "Glutes, hamstrings (sled-supported, posterior chain)", sets: 3, reps: "10-12", rest: "90 sec", star: "" },
      { id: "7e", name: "Lying Leg Curl OR Seated Leg Curl", tag: null, targets: "Hamstrings (isolation)", sets: 3, reps: "10-12", rest: "60 sec", star: "" },
      { id: "7f", name: "Seated Calf Raise", tag: null, targets: "Soleus (lower calf, different angle from Wed)", sets: 4, reps: "12-15", rest: "60 sec", star: "" },
    ],
    formCues: [
      { name: "RDL", cue: "Hip hinge (NOT a squat), slight knee bend frozen throughout, bar slides down thighs." },
      { name: "Stiff-leg Deadlift", cue: "Like RDL but legs even straighter — more hamstring stretch, slightly less weight." },
      { name: "Bulgarian Split Squat", cue: "Rear foot elevated on bench, front foot far enough that knee doesn't go past toes." },
      { name: "Reverse Lunge", cue: "Step back into lunge, drop straight down, push back up. Easier on knees than forward lunge." },
      { name: "Hip Thrust", cue: "Shoulders on bench, feet flat shoulder-width, drive through heels, squeeze glutes HARD at top. Pause + squeeze." },
      { name: "Reverse Hack Squat", cue: "Chest against pad, feet HIGHER on platform, push hips back into the sled, lower until thighs parallel." },
      { name: "Seated Calf Raise", cue: "Pad on lower thighs, full stretch at bottom, full extension at top." },
    ],
    mistakes: [
      "Treating RDL like a deadlift — RDL is a hip hinge, knees barely bend.",
      "Rushing hip thrusts — pause and squeeze at the top, that's where glute growth happens.",
      "Reverse Hack Squat with feet too low on platform — becomes quad work again. Place feet HIGH.",
      "Skipping this day because tired — builds the posterior, makes you look balanced from every angle.",
    ],
    core: [
      { id: "7c1", name: "Hanging Leg Raises", sets: 3, reps: "10-12 reps" },
      { id: "7c2", name: "Toe Touches (lying)", sets: 3, reps: "12-15 reps" },
      { id: "7c3", name: "Plank Hold", sets: 2, reps: "45-60 sec" },
    ],
    cardio: {
      type: "Walk",
      duration: "5-10 min",
      protocol: [
        { label: "Equipment", val: "Treadmill (flat)" },
        { label: "Speed", val: "3–3.5 km/h" },
        { label: "Incline", val: "Flat (0%)" },
        { label: "Purpose", val: "Hamstrings/glutes need recovery. Tomorrow is rest day." },
      ],
      note: "No dedicated cardio — just flush the legs and call it done.",
    },
    cooldown: [
      { id: "7s1", name: "Standing quad stretch", duration: "20-30 sec each", target: "Quads / hip flexors" },
      { id: "7s2", name: "Lying hamstring stretch with towel", duration: "20-30 sec each leg", target: "Hamstrings" },
      { id: "7s3", name: "Pigeon pose / Figure-4", duration: "20-30 sec each side", target: "Glutes / piriformis" },
      { id: "7s4", name: "Standing calf stretch", duration: "20-30 sec each", target: "Gastrocnemius / soleus" },
      { id: "7s5", name: "Couch stretch / Hip flexor lunge", duration: "20-30 sec each side", target: "Hip flexors / quads" },
      { id: "7s6", name: "Child's pose", duration: "20-30 sec", target: "Lats / spine decompression" },
    ],
    tip: "Hip Thrusts — pause and squeeze at the top. Reverse Hack Squat: feet HIGH on platform or it becomes quad work.",
  },
];

// ─── STORAGE ─────────────────────────────────────────────────────────────────
const SK = "vivek_workout_v3_full";
function loadProgress() { try { const r = localStorage.getItem(SK); return r ? JSON.parse(r) : {}; } catch { return {}; } }
function saveProgress(d) { try { localStorage.setItem(SK, JSON.stringify(d)); } catch {} }

// ─── SET DOTS ─────────────────────────────────────────────────────────────────
function SetDots({ itemKey, totalSets, completed, onToggle, accent }) {
  return (
    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 8, alignItems: "center" }}>
      {Array.from({ length: totalSets }, (_, i) => {
        const done = completed.includes(i);
        return (
          <button key={i} onClick={(e) => { e.stopPropagation(); onToggle(itemKey, i); }} style={{
            width: 30, height: 30, borderRadius: 7,
            border: `2px solid ${done ? accent : "#2a3d2e"}`,
            background: done ? accent : "transparent",
            color: done ? "#0a1410" : "#5a8a65",
            fontSize: 10, fontWeight: 800, cursor: "pointer",
            transition: "all 0.15s", fontFamily: "inherit",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{done ? "✓" : i + 1}</button>
        );
      })}
      <span style={{ fontSize: 10, color: "#4a7a55", fontFamily: "monospace", marginLeft: 2 }}>
        {completed.length}/{totalSets}
      </span>
    </div>
  );
}

// ─── EXERCISE CARD ────────────────────────────────────────────────────────────
function ExerciseCard({ ex, dayId, accent, accentDim, progress, onToggle, index }) {
  const [open, setOpen] = useState(false);
  const key = `${dayId}_ex_${ex.id}`;
  const completed = progress[key] || [];
  const allDone = completed.length === ex.sets;

  return (
    <div style={{
      background: allDone ? "#0c2018" : "#111f16",
      border: `1px solid ${allDone ? accent + "55" : "#1e2f22"}`,
      borderLeft: `3px solid ${allDone ? accent : accent + "77"}`,
      borderRadius: 12, marginBottom: 8, overflow: "hidden",
      opacity: allDone ? 0.8 : 1, transition: "all 0.2s",
    }}>
      <div onClick={() => setOpen(o => !o)} style={{ padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{
          minWidth: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
          background: allDone ? accent : "#1e3024", color: allDone ? "#0a1410" : "#5a8a65",
          fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center",
        }}>{allDone ? "✓" : index + 1}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: allDone ? "#5a8a65" : "#e8f5ea", textDecoration: allDone ? "line-through" : "none", fontFamily: "'Sora', sans-serif", lineHeight: 1.3 }}>
              {ex.star && <span style={{ color: accent, fontSize: 11, marginRight: 3 }}>{ex.star}</span>}
              {ex.name}
            </span>
            {ex.tag && (
              <span style={{
                fontSize: 9, fontWeight: 700, flexShrink: 0,
                background: ex.tagColor === "#facc15" ? "#2a2200" : accentDim,
                color: ex.tagColor, padding: "2px 7px", borderRadius: 20,
                border: `1px solid ${ex.tagColor}44`,
              }}>{ex.tag}</span>
            )}
          </div>
          <div style={{ fontSize: 10, color: "#3a6a45", marginTop: 2, fontFamily: "monospace" }}>
            {ex.sets} sets · {ex.reps} · Rest {ex.rest}
          </div>
        </div>
        <span style={{ color: "#3a6045", fontSize: 10, marginTop: 3, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>▶</span>
      </div>
      {open && (
        <div style={{ padding: "0 14px 14px 46px", borderTop: "1px solid #162818" }}>
          <div style={{ fontSize: 11, color: "#4a7a55", margin: "8px 0 10px", lineHeight: 1.5 }}>
            🎯 <em style={{ color: "#5a9060" }}>{ex.targets}</em>
          </div>
          <SetDots itemKey={key} totalSets={ex.sets} completed={completed} onToggle={onToggle} accent={accent} />
        </div>
      )}
      {!open && completed.length > 0 && (
        <div style={{ padding: "0 14px 10px 46px" }}>
          <SetDots itemKey={key} totalSets={ex.sets} completed={completed} onToggle={onToggle} accent={accent} />
        </div>
      )}
    </div>
  );
}

// ─── CORE CARD ────────────────────────────────────────────────────────────────
function CoreCard({ item, dayId, accent, accentDim, progress, onToggle, index }) {
  const [open, setOpen] = useState(false);
  const key = `${dayId}_core_${item.id}`;
  const completed = progress[key] || [];
  const allDone = completed.length === item.sets;

  return (
    <div style={{
      background: allDone ? "#0a1c12" : "#0d1a12",
      border: `1px solid ${allDone ? accent + "44" : "#192a1e"}`,
      borderLeft: `3px solid ${allDone ? accent : "#233d28"}`,
      borderRadius: 10, marginBottom: 6, overflow: "hidden",
      opacity: allDone ? 0.8 : 1, transition: "all 0.2s",
    }}>
      <div onClick={() => setOpen(o => !o)} style={{ padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          minWidth: 20, height: 20, borderRadius: 5, flexShrink: 0,
          background: allDone ? accent : "#182a1e", color: allDone ? "#0a1410" : "#3a6a45",
          fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center",
        }}>{allDone ? "✓" : index + 1}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: allDone ? "#3a6a45" : "#b0cbb5", fontFamily: "'Sora', sans-serif", fontWeight: 600, textDecoration: allDone ? "line-through" : "none" }}>{item.name}</div>
          <div style={{ fontSize: 10, color: "#2a5035", marginTop: 1, fontFamily: "monospace" }}>{item.sets} sets · {item.reps}</div>
        </div>
        <span style={{ color: "#2a5035", fontSize: 10, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>▶</span>
      </div>
      {(open || completed.length > 0) && (
        <div style={{ padding: "0 14px 10px 44px", borderTop: open ? "1px solid #142018" : "none" }}>
          <SetDots itemKey={key} totalSets={item.sets} completed={completed} onToggle={onToggle} accent={accent} />
        </div>
      )}
    </div>
  );
}

// ─── CARDIO CARD ─────────────────────────────────────────────────────────────
function CardioCard({ cardio, dayId, accent, accentDim, progress, onToggle }) {
  const [open, setOpen] = useState(false);
  const key = `${dayId}_cardio`;
  const done = (progress[key] || []).includes(0);
  const isHIIT = cardio.type === "HIIT";
  const isLISS = cardio.type === "LISS";

  return (
    <div style={{
      background: done ? accentDim : "#111f16",
      border: `1px solid ${done ? accent + "66" : "#1e2f22"}`,
      borderLeft: `3px solid ${done ? accent : accent + "66"}`,
      borderRadius: 12, overflow: "hidden", transition: "all 0.2s",
    }}>
      <div onClick={() => setOpen(o => !o)} style={{ padding: "12px 14px", cursor: "pointer", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: done ? accent : "#1a3024",
          border: `2px solid ${done ? accent : "#254530"}`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
        }}>
          {done ? <span style={{ color: "#0a1410", fontWeight: 800, fontSize: 13 }}>✓</span>
            : isHIIT ? "⚡" : isLISS ? "🚶" : "🦶"}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: done ? "#5a8a65" : "#e8f5ea", fontFamily: "'Sora', sans-serif", textDecoration: done ? "line-through" : "none" }}>
              {cardio.type} — {cardio.duration}
            </span>
            <span style={{ fontSize: 9, background: done ? "#0a1a10" : accentDim, color: accent, padding: "2px 7px", borderRadius: 20, fontWeight: 700, border: `1px solid ${accent}44` }}>
              {cardio.type}
            </span>
          </div>
          <div style={{ fontSize: 10, color: "#3a6045", fontFamily: "monospace", marginTop: 2 }}>
            {cardio.protocol[0]?.val} · {cardio.duration}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <button onClick={(e) => { e.stopPropagation(); onToggle(key, 0); }} style={{
            padding: "5px 10px", borderRadius: 8,
            background: done ? accent : "#1a3024", border: `1.5px solid ${done ? accent : "#254530"}`,
            color: done ? "#0a1410" : accent, fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>{done ? "Done ✓" : "Mark done"}</button>
          <span style={{ color: "#2a5035", fontSize: 9 }}>{open ? "▲ less" : "▼ details"}</span>
        </div>
      </div>
      {open && (
        <div style={{ padding: "0 14px 14px", borderTop: "1px solid #162818" }}>
          {isHIIT && (
            <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {cardio.protocol.map((p, i) => (
                <div key={i} style={{ background: "#0d1a12", border: "1px solid #1e2f22", borderRadius: 8, padding: "6px 10px", minWidth: 100, flex: "1 1 auto" }}>
                  <div style={{ fontSize: 9, color: "#3a6045", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1 }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: p.label === "Work" ? "#fb7185" : p.label === "Rounds" ? accent : "#c0d8c4", fontWeight: 700, marginTop: 2, fontFamily: "monospace" }}>{p.val}</div>
                </div>
              ))}
            </div>
          )}
          {isLISS && (
            <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {cardio.protocol.map((p, i) => (
                <div key={i} style={{ background: "#0d1a12", border: "1px solid #1e2f22", borderRadius: 8, padding: "6px 10px", flex: "1 1 auto" }}>
                  <div style={{ fontSize: 9, color: "#3a6045", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1 }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: accent, fontWeight: 700, marginTop: 2, fontFamily: "monospace" }}>{p.val}</div>
                </div>
              ))}
            </div>
          )}
          {!isHIIT && !isLISS && (
            <div style={{ marginTop: 10 }}>
              {cardio.protocol.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: "#3a6045", fontFamily: "monospace", minWidth: 80 }}>{p.label}:</span>
                  <span style={{ fontSize: 10, color: "#8ab89a" }}>{p.val}</span>
                </div>
              ))}
            </div>
          )}
          {cardio.note && (
            <div style={{ marginTop: 8, fontSize: 11, color: "#4a7a55", fontStyle: "italic", lineHeight: 1.5, padding: "8px 10px", background: "#0d1a12", borderRadius: 8 }}>
              💡 {cardio.note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── COOLDOWN CARD ────────────────────────────────────────────────────────────
function CooldownCard({ item, dayId, accent, progress, onToggle }) {
  const key = `${dayId}_stretch_${item.id}`;
  const done = (progress[key] || []).includes(0);
  return (
    <div onClick={() => onToggle(key, 0)} style={{
      background: done ? "#0a1c12" : "#0d1812",
      border: `1px solid ${done ? accent + "44" : "#162018"}`,
      borderLeft: `3px solid ${done ? accent + "cc" : "#1e3a22"}`,
      borderRadius: 10, padding: "9px 14px", marginBottom: 6,
      cursor: "pointer", transition: "all 0.2s", display: "flex", gap: 10, alignItems: "center",
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: 8, flexShrink: 0,
        background: done ? accent : "#142018", border: `1.5px solid ${done ? accent : "#1e3a22"}`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, transition: "all 0.2s",
      }}>
        {done ? <span style={{ color: "#0a1410", fontWeight: 800, fontSize: 10 }}>✓</span> : "🧘"}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: done ? "#3a6a45" : "#a0c0a8", fontFamily: "'Sora', sans-serif", textDecoration: done ? "line-through" : "none" }}>{item.name}</div>
        <div style={{ fontSize: 10, color: "#2a5035", marginTop: 1, fontFamily: "monospace" }}>
          {item.duration} · <em style={{ color: "#234a28" }}>{item.target}</em>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ icon, label, subLabel, doneCount, totalCount, accent }) {
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "16px 0 8px" }}>
      <span>{icon}</span>
      <div>
        <span style={{ fontSize: 10, color: "#4a7a55", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "monospace", fontWeight: 700 }}>{label}</span>
        {subLabel && <span style={{ fontSize: 9, color: "#2a5035", fontFamily: "monospace", marginLeft: 6 }}>{subLabel}</span>}
      </div>
      {totalCount > 0 && (
        <span style={{ marginLeft: "auto", fontSize: 10, fontFamily: "monospace", color: pct === 100 ? accent : "#3a6045", fontWeight: 700 }}>
          {pct === 100 ? "✓ done" : `${doneCount}/${totalCount}`}
        </span>
      )}
    </div>
  );
}

// ─── WARMUP SECTION ───────────────────────────────────────────────────────────
function WarmupSection({ warmup, accent, accentDim }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 4 }}>
      <div onClick={() => setOpen(o => !o)} style={{
        background: "#0d1a12", border: "1px solid #1a2a1e", borderLeft: `3px solid #2a4a30`,
        borderRadius: 10, padding: "10px 14px", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span>🔥</span>
        <span style={{ fontSize: 10, color: "#4a7a55", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "monospace", fontWeight: 700, flex: 1 }}>Warm-up · 8-10 min</span>
        <span style={{ color: "#2a5035", fontSize: 10, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>▶</span>
      </div>
      {open && (
        <div style={{ background: "#0a1410", border: "1px solid #1a2a1e", borderTop: "none", borderRadius: "0 0 10px 10px", padding: "12px 14px" }}>
          <div style={{ fontSize: 11, color: "#5a8a65", marginBottom: 10, lineHeight: 1.5 }}>
            <strong style={{ color: "#4ade80", fontSize: 10, fontFamily: "monospace" }}>STEP 1 — CARDIO</strong><br />
            {warmup.cardio}
          </div>
          <div style={{ fontSize: 10, color: "#3a6045", fontFamily: "monospace", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Step 2 — Dynamic</div>
          {warmup.dynamic.map((d, i) => (
            <div key={i} style={{ fontSize: 11, color: "#5a8a65", marginBottom: 4, lineHeight: 1.4, paddingLeft: 8, borderLeft: "2px solid #1e3a22" }}>• {d}</div>
          ))}
          <div style={{ marginTop: 10, padding: "8px 10px", background: "#0d1a12", borderRadius: 8, border: "1px solid #1e2f22" }}>
            <div style={{ fontSize: 10, color: "#3a6045", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>Step 3 — Warm-up sets</div>
            <div style={{ fontSize: 11, color: "#5a8a65", lineHeight: 1.4 }}>{warmup.warmupSets}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── FORM CUES SECTION ────────────────────────────────────────────────────────
function FormCuesSection({ formCues, mistakes, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 4 }}>
      <div onClick={() => setOpen(o => !o)} style={{
        background: "#0d1a12", border: "1px solid #1a2a1e", borderLeft: `3px solid #2a4030`,
        borderRadius: 10, padding: "10px 14px", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span>📋</span>
        <span style={{ fontSize: 10, color: "#4a7a55", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "monospace", fontWeight: 700, flex: 1 }}>Form Cues & Mistakes</span>
        <span style={{ color: "#2a5035", fontSize: 10, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>▶</span>
      </div>
      {open && (
        <div style={{ background: "#0a1410", border: "1px solid #1a2a1e", borderTop: "none", borderRadius: "0 0 10px 10px", padding: "12px 14px" }}>
          <div style={{ fontSize: 10, color: "#3a6045", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Form Cues</div>
          {formCues.map((f, i) => (
            <div key={i} style={{ marginBottom: 8, paddingLeft: 8, borderLeft: `2px solid ${accent}55` }}>
              <div style={{ fontSize: 11, color: accent, fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>{f.name}</div>
              <div style={{ fontSize: 11, color: "#5a8a65", lineHeight: 1.5, marginTop: 2 }}>{f.cue}</div>
            </div>
          ))}
          <div style={{ fontSize: 10, color: "#3a6045", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1, margin: "12px 0 8px" }}>Watch Out For</div>
          {mistakes.map((m, i) => (
            <div key={i} style={{ fontSize: 11, color: "#fb7185aa", marginBottom: 5, lineHeight: 1.4, paddingLeft: 8, borderLeft: "2px solid #fb718555" }}>⚠ {m}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── DAY VIEW ─────────────────────────────────────────────────────────────────
function DayView({ day, progress, onToggle, onResetDay }) {
  if (day.isRest) {
    return (
      <div style={{ paddingBottom: 40 }}>
        <div style={{ background: "#111f16", border: "1px solid #1e2f22", borderRadius: 16, padding: 24, textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>😴</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#e8f5ea", fontFamily: "'Sora', sans-serif", marginBottom: 6 }}>Active Recovery Day</div>
          <div style={{ fontSize: 12, color: "#4a7a55", lineHeight: 1.7 }}>Rest from lifting — not from movement.</div>
        </div>
        <div style={{ fontSize: 10, color: "#4a7a55", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "monospace", marginBottom: 8 }}>✓ What to do</div>
        {day.restActivities.map((a, i) => (
          <div key={i} style={{ background: "#0d1a12", border: "1px solid #1a2a1e", borderLeft: "3px solid #2a4a30", borderRadius: 10, padding: "10px 14px", marginBottom: 6, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 16 }}>{a.icon}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#c0d8c4", fontFamily: "'Sora', sans-serif" }}>{a.label}</div>
              <div style={{ fontSize: 11, color: "#4a7a55", marginTop: 2, lineHeight: 1.4 }}>{a.detail}</div>
            </div>
          </div>
        ))}
        <div style={{ fontSize: 10, color: "#4a7a55", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "monospace", margin: "14px 0 8px" }}>✗ What NOT to do</div>
        {day.restNot.map((n, i) => (
          <div key={i} style={{ fontSize: 11, color: "#fb7185aa", marginBottom: 5, paddingLeft: 8, borderLeft: "2px solid #fb718555" }}>✗ {n}</div>
        ))}
        <div style={{ marginTop: 14, background: "#0f2918", border: "1px solid #1e3a22", borderRadius: 12, padding: "12px 14px", fontSize: 11, color: "#5a8a65", lineHeight: 1.6 }}>
          🍽 <strong style={{ color: "#4ade80" }}>Sunday Food:</strong> {day.foodNote}
        </div>
      </div>
    );
  }

  // ── count progress ──
  const exTotal = day.exercises.reduce((s, e) => s + e.sets, 0);
  const exDone = day.exercises.reduce((s, e) => s + (progress[`${day.id}_ex_${e.id}`] || []).length, 0);
  const coreTotal = day.core.reduce((s, c) => s + c.sets, 0);
  const coreDone = day.core.reduce((s, c) => s + (progress[`${day.id}_core_${c.id}`] || []).length, 0);
  const cardioDone = (progress[`${day.id}_cardio`] || []).includes(0) ? 1 : 0;
  const stretchDone = day.cooldown.filter(s => (progress[`${day.id}_stretch_${s.id}`] || []).includes(0)).length;
  const grandDone = exDone + coreDone + cardioDone + stretchDone;
  const grandTotal = exTotal + coreTotal + 1 + day.cooldown.length;
  const pct = Math.round((grandDone / grandTotal) * 100);

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Progress */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: "#4a7a55", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: 1 }}>Day Progress</span>
          <span style={{ fontSize: 11, color: day.accent, fontWeight: 700, fontFamily: "monospace" }}>{pct}%</span>
        </div>
        <div style={{ height: 5, background: "#1a2f1e", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${day.accent}88, ${day.accent})`, borderRadius: 10, transition: "width 0.3s" }} />
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          {[
            { label: "Workout", done: exDone, total: exTotal },
            { label: "Core", done: coreDone, total: coreTotal },
            { label: "Cardio", done: cardioDone, total: 1 },
            { label: "Stretch", done: stretchDone, total: day.cooldown.length },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, textAlign: "center", background: "#0d1a12", borderRadius: 8, padding: "5px 4px", border: `1px solid ${s.done === s.total ? day.accent + "44" : "#1a2a1e"}` }}>
              <div style={{ fontSize: 9, color: s.done === s.total ? day.accent : "#3a6045", fontFamily: "monospace", fontWeight: 700 }}>
                {s.done === s.total ? "✓" : `${s.done}/${s.total}`}
              </div>
              <div style={{ fontSize: 8, color: "#2a5035", fontFamily: "monospace", marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>
        {pct === 100 && <div style={{ textAlign: "center", marginTop: 8, fontSize: 12, color: day.accent, fontWeight: 700 }}>🎉 Full workout done! Great work Vivek!</div>}
      </div>

      {/* Meta */}
      <div style={{ background: "#111f16", border: "1px solid #1e2f22", borderRadius: 12, padding: "10px 14px", marginBottom: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: "#4a7a55" }}>⏱ {day.duration}</span>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: "#4a7a55" }}>💪 {day.exercises.length} exercises</span>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: "#4a7a55" }}>🔩 Core · Cardio · Stretch</span>
      </div>

      {/* Key emphasis */}
      <div style={{ background: day.accentDim, border: `1px solid ${day.accent}33`, borderRadius: 12, padding: "10px 14px", marginBottom: 10, fontSize: 11, color: "#90b898", lineHeight: 1.5 }}>
        🔑 {day.keyEmphasis}
      </div>

      {/* Warmup */}
      {day.warmup && <WarmupSection warmup={day.warmup} accent={day.accent} accentDim={day.accentDim} />}

      {/* Main Workout */}
      <SectionHeader icon="💪" label="Main Workout" subLabel="45-55 min" doneCount={exDone} totalCount={exTotal} accent={day.accent} />
      {day.exercises.map((ex, i) => (
        <ExerciseCard key={ex.id} ex={ex} dayId={day.id} accent={day.accent} accentDim={day.accentDim} progress={progress} onToggle={onToggle} index={i} />
      ))}

      {/* Form Cues */}
      {day.formCues && <FormCuesSection formCues={day.formCues} mistakes={day.mistakes} accent={day.accent} />}

      {/* Core */}
      <SectionHeader icon="🔩" label="Core" subLabel="5-8 min" doneCount={coreDone} totalCount={coreTotal} accent={day.accent} />
      {day.core.map((c, i) => (
        <CoreCard key={c.id} item={c} dayId={day.id} accent={day.accent} accentDim={day.accentDim} progress={progress} onToggle={onToggle} index={i} />
      ))}

      {/* Cardio */}
      <SectionHeader icon="🏃" label="Cardio" subLabel="10-15 min" doneCount={cardioDone} totalCount={1} accent={day.accent} />
      {day.cardio && <CardioCard cardio={day.cardio} dayId={day.id} accent={day.accent} accentDim={day.accentDim} progress={progress} onToggle={onToggle} />}

      {/* Cooldown */}
      <SectionHeader icon="🧘" label="Cool Down & Stretches" subLabel="5-8 min" doneCount={stretchDone} totalCount={day.cooldown.length} accent={day.accent} />
      {day.cooldown.map(s => (
        <CooldownCard key={s.id} item={s} dayId={day.id} accent={day.accent} progress={progress} onToggle={onToggle} />
      ))}

      {/* Reset */}
      {grandDone > 0 && (
        <button onClick={onResetDay} style={{
          marginTop: 20, width: "100%", padding: "11px",
          background: "transparent", border: "1px solid #2a3d2e",
          borderRadius: 10, color: "#3a6045", fontSize: 11,
          cursor: "pointer", fontFamily: "'Sora', sans-serif",
        }}>↺ Reset today's progress</button>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function WorkoutPage() {
  const jsDay = new Date().getDay(); // 0=Sun…6=Sat
  // DAYS[0]=Mon(Rest), [1]=Tue, [2]=Wed, [3]=Thu, [4]=Fri, [5]=Sat, [6]=Sun
  const dayMap = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
  const [activeDay, setActiveDay] = useState(dayMap[jsDay] ?? 0);
  const [progress, setProgress] = useState(loadProgress);
  useEffect(() => { saveProgress(progress); }, [progress]);

  function handleToggle(key, idx) {
    setProgress(prev => {
      const cur = prev[key] || [];
      return { ...prev, [key]: cur.includes(idx) ? cur.filter(i => i !== idx) : [...cur, idx] };
    });
  }

  function handleResetDay() {
    const day = DAYS[activeDay];
    setProgress(prev => {
      const next = { ...prev };
      day.exercises.forEach(e => delete next[`${day.id}_ex_${e.id}`]);
      day.core.forEach(c => delete next[`${day.id}_core_${c.id}`]);
      delete next[`${day.id}_cardio`];
      day.cooldown.forEach(s => delete next[`${day.id}_stretch_${s.id}`]);
      return next;
    });
  }

  const currentDay = DAYS[activeDay];

  // Weekly pct (exclude rest)
  const active = DAYS.filter(d => !d.isRest);
  const wTotal = active.reduce((t, d) => t + d.exercises.reduce((s, e) => s + e.sets, 0) + d.core.reduce((s, c) => s + c.sets, 0) + 1 + d.cooldown.length, 0);
  const wDone = active.reduce((t, d) => {
    const eD = d.exercises.reduce((s, e) => s + (progress[`${d.id}_ex_${e.id}`] || []).length, 0);
    const cD = d.core.reduce((s, c) => s + (progress[`${d.id}_core_${c.id}`] || []).length, 0);
    const caD = (progress[`${d.id}_cardio`] || []).includes(0) ? 1 : 0;
    const sD = d.cooldown.filter(s => (progress[`${d.id}_stretch_${s.id}`] || []).includes(0)).length;
    return t + eD + cD + caD + sD;
  }, 0);
  const wPct = Math.round((wDone / wTotal) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#0a1410", color: "#e8f5ea", fontFamily: "'Sora', sans-serif", maxWidth: 480, margin: "0 auto" }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />

      {/* ── STICKY HEADER ── */}
      <div style={{ padding: "18px 16px 0", background: "linear-gradient(180deg,#0a1410f0 80%,transparent)", position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: "#4a7a55", textTransform: "uppercase", letterSpacing: 2, fontFamily: "monospace" }}>Vivek's Plan</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#e8f5ea", lineHeight: 1.2 }}>Workout Plan v2</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 9, color: "#4a7a55", fontFamily: "monospace" }}>Week Progress</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#4ade80", fontFamily: "monospace" }}>{wPct}%</div>
          </div>
        </div>
        {/* Day tabs */}
        <div style={{ display: "flex", gap: 5, overflowX: "auto", paddingBottom: 12, scrollbarWidth: "none" }}>
          {DAYS.map((d, i) => {
            const isA = i === activeDay;
            const exS = d.exercises.reduce((s, e) => s + e.sets, 0);
            const exD = d.exercises.reduce((s, e) => s + (progress[`${d.id}_ex_${e.id}`] || []).length, 0);
            const done = !d.isRest && exS > 0 && exD === exS;
            return (
              <button key={d.id} onClick={() => setActiveDay(i)} style={{
                flexShrink: 0, padding: "7px 10px", borderRadius: 11,
                border: `1.5px solid ${isA ? d.accent : "#1e2f22"}`,
                background: isA ? `${d.accent}18` : "transparent",
                cursor: "pointer", transition: "all 0.15s", textAlign: "center", minWidth: 50,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: isA ? d.accent : "#3a6045", fontFamily: "monospace" }}>{d.label}</div>
                <div style={{ fontSize: 8, color: isA ? d.accent + "aa" : "#2a4a30", marginTop: 2, fontFamily: "monospace" }}>
                  {d.isRest ? "rest" : done ? "✓ done" : `${exS}s`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── DAY HEADER ── */}
      <div style={{ padding: "14px 16px 6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 26 }}>{currentDay.emoji}</span>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#e8f5ea" }}>{currentDay.name}</div>
            <div style={{ fontSize: 11, color: currentDay.accent, fontWeight: 600 }}>{currentDay.focus}</div>
          </div>
          <div style={{
            marginLeft: "auto", background: `${currentDay.accent}18`, border: `1px solid ${currentDay.accent}44`,
            borderRadius: 8, padding: "4px 10px", fontSize: 10, color: currentDay.accent, fontFamily: "monospace", fontWeight: 700,
          }}>{currentDay.subtitle}</div>
        </div>
        <div style={{ height: 2, background: `linear-gradient(90deg,${currentDay.accent},transparent)`, borderRadius: 2, marginTop: 6 }} />
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding: "6px 16px" }}>
        <DayView day={currentDay} progress={progress} onToggle={handleToggle} onResetDay={handleResetDay} />
      </div>
    </div>
  );
}

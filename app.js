// ============================================================
//  TRAINRIGHT — app.js v1.0
//  Personal strength training PWA — 16-week program
// ============================================================
'use strict';

// ──────────────────────────────────────────────────────────
// 1. PROGRAM DATA
// ──────────────────────────────────────────────────────────
const PHASES = [
  // ── PHASE 1: FOUNDATION (Weeks 1-4) ──
  {
    phase: 1, weeks: [1,2,3,4], label: 'Phase 1 — Foundation',
    days: {
      mon: { label: 'Squat + Core', exercises: [
        {id:'goblet_squat',   name:'Goblet Squat',               sets:3, repsLow:10,repsHigh:10, repsSpec:'×10',       equipment:'DB / KB', category:'squat'},
        {id:'db_rdl',         name:'DB / KB Romanian Deadlift',  sets:3, repsLow:10,repsHigh:10, repsSpec:'×10',       equipment:'DB / KB', category:'rdl'},
        {id:'dead_bug',       name:'Dead Bug',                   sets:3, repsLow:10,repsHigh:10, repsSpec:'×10 / side',equipment:'BW',      category:'core', unilateral:true,uniType:'body'},
        {id:'plank_hold',     name:'Plank',                      sets:3, repsLow:30,repsHigh:30, repsSpec:'30 s',      equipment:'BW',      category:'core', timed:true}
      ]},
      tue: { label: 'Horizontal Pull + Shoulder Rehab', exercises: [
        {id:'single_arm_row',    name:'Single-Arm DB Row',         sets:3, repsLow:10,repsHigh:10, repsSpec:'×10 / side', equipment:'DB',   category:'row',  unilateral:true,uniType:'upper',leftLeadNote:true},
        {id:'chest_sup_row',     name:'Chest-Supported DB Row',    sets:3, repsLow:12,repsHigh:12, repsSpec:'×12',        equipment:'DB',   category:'row'},
        {id:'band_pull_apart',   name:'Band Pull-Aparts',          sets:3, repsLow:15,repsHigh:15, repsSpec:'×15',        equipment:'Band', category:'rehab'},
        {id:'band_ext_rot',      name:'Band External Rotation',    sets:3, repsLow:15,repsHigh:15, repsSpec:'×15 / side', equipment:'Band', category:'rehab',unilateral:true,uniType:'upper',leftLeadNote:true},
        {id:'scapular_hang',     name:'Scapular Hangs',            sets:3, repsLow:8, repsHigh:8,  repsSpec:'×8',         equipment:'Bar',  category:'rehab'}
      ], finishers: [
        {id:'sar_l_fin',  name:'Single-Arm DB Row — Left Finisher', sets:2,repsLow:10,repsHigh:10,repsSpec:'×10',equipment:'DB',  category:'row',  leftOnly:true,finisherNote:'Left arm only — close the imbalance'},
        {id:'ber_l_fin',  name:'Band Ext. Rotation — Left Finisher', sets:1,repsLow:15,repsHigh:15,repsSpec:'×15',equipment:'Band',category:'rehab',leftOnly:true,finisherNote:'Left shoulder only'}
      ]},
      wed: { label: 'Horizontal Push + Core', exercises: [
        {id:'flat_db_bench',  name:'Flat DB Bench Press',  sets:3, repsLow:10,repsHigh:10, repsSpec:'×10 / arm', equipment:'DB', category:'bench',  unilateral:true,uniType:'upper',leftLeadNote:true,shoulderSafety:true},
        {id:'db_floor_press', name:'DB Floor Press',       sets:3, repsLow:10,repsHigh:10, repsSpec:'×10',       equipment:'DB', category:'bench',  shoulderSafety:true},
        {id:'bird_dog',       name:'Bird-Dog',             sets:3, repsLow:10,repsHigh:10, repsSpec:'×10 / side',equipment:'BW', category:'core',   unilateral:true,uniType:'body'},
        {id:'side_plank',     name:'Side Plank',           sets:3, repsLow:20,repsHigh:20, repsSpec:'20 s / side',equipment:'BW',category:'core',   unilateral:true,uniType:'body',timed:true}
      ], finishers: [
        {id:'bpa_l_fin', name:'Band Pull-Apart — Left Scapular Focus', sets:1,repsLow:15,repsHigh:15,repsSpec:'×15',equipment:'Band',category:'rehab',leftOnly:true,finisherNote:'Left scapular focus'}
      ]},
      thu: { label: 'Hinge / Lunge + Core', exercises: [
        {id:'reverse_lunge',       name:'Reverse Lunge (DB)',       sets:3,repsLow:8, repsHigh:8,  repsSpec:'×8 / leg', equipment:'DB', category:'lunge',unilateral:true,uniType:'lower'},
        {id:'slgl_glute_bridge',   name:'Single-Leg Glute Bridge',  sets:3,repsLow:10,repsHigh:10, repsSpec:'×10 / leg',equipment:'BW', category:'hinge',unilateral:true,uniType:'lower'},
        {id:'kb_swing',            name:'KB Swing',                  sets:3,repsLow:12,repsHigh:12, repsSpec:'×12',      equipment:'KB', category:'hinge'},
        {id:'hollow_hold',         name:'Hollow Hold',              sets:3,repsLow:20,repsHigh:20, repsSpec:'20 s',     equipment:'BW', category:'core', timed:true}
      ]},
      fri: { label: 'Vertical Pull + Mobility', exercises: [
        {id:'band_pullup',    name:'Band-Assisted Pull-Ups',         sets:3,repsLow:6,repsHigh:6,  repsSpec:'×6',  equipment:'Band + Bar',category:'pullup'},
        {id:'scapular_pull',  name:'Scapular Pulls',                 sets:3,repsLow:8,repsHigh:8,  repsSpec:'×8',  equipment:'Bar',       category:'pullup'},
        {id:'dead_hang',      name:'Dead Hang',                      sets:3,repsLow:20,repsHigh:20, repsSpec:'20 s',equipment:'Bar',       category:'pullup',timed:true},
        {id:'cat_cow',        name:'Cat-Cow + Thoracic Rotations',   sets:1,repsLow:10,repsHigh:10, repsSpec:'Flow',equipment:'BW',        category:'mobility'}
      ]}
    }
  },

  // ── PHASE 2: BUILD (Weeks 5-8) ──
  {
    phase: 2, weeks: [5,6,7,8], label: 'Phase 2 — Build',
    days: {
      mon: { label: 'Squat + Core', exercises: [
        {id:'back_squat',        name:'Back Squat',             sets:4,repsLow:8, repsHigh:8,  repsSpec:'×8',  equipment:'Barbell',category:'squat'},
        {id:'db_rdl',            name:'DB RDL',                 sets:3,repsLow:10,repsHigh:10, repsSpec:'×10', equipment:'DB',     category:'rdl'},
        {id:'hanging_knee_raise',name:'Hanging Knee Raises',    sets:3,repsLow:8, repsHigh:8,  repsSpec:'×8',  equipment:'Bar',    category:'core'},
        {id:'plank_hold',        name:'Plank',                  sets:3,repsLow:45,repsHigh:45, repsSpec:'45 s',equipment:'BW',     category:'core',timed:true}
      ]},
      tue: { label: 'Horizontal Pull + Shoulder Rehab', exercises: [
        {id:'single_arm_row',  name:'Single-Arm DB Row',      sets:4,repsLow:10,repsHigh:10,repsSpec:'×10 / side',equipment:'DB',   category:'row',  unilateral:true,uniType:'upper',leftLeadNote:true},
        {id:'inverted_row',    name:'Inverted Row',           sets:3,repsLow:10,repsHigh:10,repsSpec:'×10',       equipment:'Rack', category:'row'},
        {id:'band_pull_apart', name:'Band Pull-Aparts',       sets:3,repsLow:20,repsHigh:20,repsSpec:'×20',       equipment:'Band', category:'rehab'},
        {id:'band_ext_rot',    name:'Band External Rotation', sets:3,repsLow:15,repsHigh:15,repsSpec:'×15 / side',equipment:'Band', category:'rehab',unilateral:true,uniType:'upper',leftLeadNote:true},
        {id:'face_pull',       name:'Face Pulls',             sets:3,repsLow:15,repsHigh:15,repsSpec:'×15',       equipment:'Band', category:'rehab'}
      ], finishers: [
        {id:'sar_l_fin', name:'Single-Arm DB Row — Left Finisher',    sets:2,repsLow:10,repsHigh:10,repsSpec:'×10',equipment:'DB',  category:'row',  leftOnly:true,finisherNote:'Left arm only — close the imbalance'},
        {id:'ber_l_fin', name:'Band Ext. Rotation — Left Finisher',   sets:1,repsLow:15,repsHigh:15,repsSpec:'×15',equipment:'Band',category:'rehab',leftOnly:true,finisherNote:'Left shoulder only'}
      ]},
      wed: { label: 'Horizontal Push + Core', exercises: [
        {id:'flat_db_bench',  name:'DB Bench Press',    sets:4,repsLow:8,repsHigh:8, repsSpec:'×8 / arm', equipment:'DB',     category:'bench',unilateral:true,uniType:'upper',leftLeadNote:true,shoulderSafety:true},
        {id:'db_floor_press', name:'DB Floor Press',    sets:3,repsLow:10,repsHigh:10,repsSpec:'×10',     equipment:'DB',     category:'bench',shoulderSafety:true},
        {id:'landmine_press', name:'Landmine Press',    sets:3,repsLow:8, repsHigh:8, repsSpec:'×8 / side',equipment:'Barbell',category:'press',unilateral:true,uniType:'upper',leftLeadNote:true,shoulderSafety:true,onlyIfPainFree:true},
        {id:'side_plank',     name:'Side Plank',        sets:3,repsLow:25,repsHigh:25,repsSpec:'25 s / side',equipment:'BW', category:'core', unilateral:true,uniType:'body',timed:true}
      ], finishers: [
        {id:'bpa_l_fin', name:'Band Pull-Apart — Left Scapular Focus', sets:1,repsLow:20,repsHigh:20,repsSpec:'×20',equipment:'Band',category:'rehab',leftOnly:true,finisherNote:'Left scapular focus'}
      ]},
      thu: { label: 'Hinge / Lunge + Core', exercises: [
        {id:'walking_lunge',   name:'Walking Lunge (DB)',     sets:3,repsLow:10,repsHigh:10,repsSpec:'×10 / leg',equipment:'DB',category:'lunge',unilateral:true,uniType:'lower'},
        {id:'slgl_db_rdl',     name:'Single-Leg DB RDL',      sets:3,repsLow:8, repsHigh:8, repsSpec:'×8 / leg', equipment:'DB',category:'rdl',  unilateral:true,uniType:'lower'},
        {id:'kb_swing',        name:'KB Swing',               sets:3,repsLow:15,repsHigh:15,repsSpec:'×15',      equipment:'KB',category:'hinge'},
        {id:'leg_raise',       name:'Leg Raises',             sets:3,repsLow:10,repsHigh:10,repsSpec:'×10',      equipment:'BW',category:'core'}
      ]},
      fri: { label: 'Vertical Pull + Mobility', exercises: [
        {id:'band_pullup',       name:'Band-Assisted Pull-Ups', sets:4,repsLow:5,repsHigh:5,  repsSpec:'×5',  equipment:'Band + Bar',category:'pullup'},
        {id:'slow_neg_pullup',   name:'Slow Negatives',         sets:3,repsLow:4,repsHigh:4,  repsSpec:'×4',  equipment:'Bar',       category:'pullup'},
        {id:'dead_hang',         name:'Dead Hang',              sets:3,repsLow:30,repsHigh:30, repsSpec:'30 s',equipment:'Bar',       category:'pullup',timed:true},
        {id:'mobility_flow',     name:'Mobility Flow',          sets:1,repsLow:1,repsHigh:1,  repsSpec:'Flow',equipment:'BW',        category:'mobility'}
      ]}
    }
  },

  // ── PHASE 3: STRENGTH (Weeks 9-12) ──
  {
    phase: 3, weeks: [9,10,11,12], label: 'Phase 3 — Strength',
    days: {
      mon: { label: 'Squat + Core', exercises: [
        {id:'back_squat',          name:'Back Squat',                  sets:4,repsLow:6, repsHigh:6,  repsSpec:'×6',      equipment:'Barbell',category:'squat'},
        {id:'bulgarian_split_squat',name:'Bulgarian Split Squat (DB)',  sets:4,repsLow:8, repsHigh:8,  repsSpec:'×8 / leg',equipment:'DB',     category:'lunge',unilateral:true,uniType:'lower'},
        {id:'hanging_leg_raise',   name:'Hanging Leg Raises',           sets:3,repsLow:10,repsHigh:10, repsSpec:'×10',     equipment:'Bar',    category:'core'},
        {id:'plank_hold',          name:'Plank',                        sets:3,repsLow:60,repsHigh:60, repsSpec:'60 s',    equipment:'BW',     category:'core',timed:true}
      ]},
      tue: { label: 'Horizontal Pull + Shoulder Rehab', exercises: [
        {id:'barbell_row',    name:'Barbell Row',           sets:4,repsLow:8, repsHigh:8, repsSpec:'×8',        equipment:'Barbell',category:'row'},
        {id:'single_arm_row', name:'Single-Arm DB Row',    sets:3,repsLow:10,repsHigh:10,repsSpec:'×10 / side',equipment:'DB',     category:'row',  unilateral:true,uniType:'upper',leftLeadNote:true},
        {id:'face_pull',      name:'Face Pulls',           sets:3,repsLow:20,repsHigh:20,repsSpec:'×20',        equipment:'Band',   category:'rehab'},
        {id:'band_ext_rot',   name:'Band External Rotation',sets:3,repsLow:15,repsHigh:15,repsSpec:'×15 / side',equipment:'Band',  category:'rehab',unilateral:true,uniType:'upper',leftLeadNote:true},
        {id:'band_pull_apart',name:'Band Pull-Aparts',     sets:3,repsLow:20,repsHigh:20,repsSpec:'×20',        equipment:'Band',  category:'rehab'}
      ], finishers: [
        {id:'sar_l_fin', name:'Single-Arm DB Row — Left Finisher',   sets:2,repsLow:10,repsHigh:10,repsSpec:'×10',equipment:'DB',  category:'row',  leftOnly:true,finisherNote:'Left arm only — close the imbalance'},
        {id:'ber_l_fin', name:'Band Ext. Rotation — Left Finisher',  sets:1,repsLow:15,repsHigh:15,repsSpec:'×15',equipment:'Band',category:'rehab',leftOnly:true,finisherNote:'Left shoulder only'}
      ]},
      wed: { label: 'Horizontal Push + Core', exercises: [
        {id:'flat_db_bench',    name:'DB Bench Press',            sets:4,repsLow:6,repsHigh:6, repsSpec:'×6 / arm',  equipment:'DB',     category:'bench',unilateral:true,uniType:'upper',leftLeadNote:true,shoulderSafety:true},
        {id:'landmine_press',   name:'Landmine Press',            sets:3,repsLow:8,repsHigh:8, repsSpec:'×8 / side', equipment:'Barbell',category:'press',unilateral:true,uniType:'upper',leftLeadNote:true,shoulderSafety:true,onlyIfPainFree:true},
        {id:'halfkneel_db_press',name:'Half-Kneeling DB Press',   sets:3,repsLow:8,repsHigh:8, repsSpec:'×8 / side', equipment:'DB',     category:'press',unilateral:true,uniType:'upper',leftLeadNote:true,shoulderSafety:true,onlyIfPainFree:true,optional:true},
        {id:'side_plank',       name:'Side Plank',                sets:3,repsLow:30,repsHigh:30,repsSpec:'30 s / side',equipment:'BW',   category:'core', unilateral:true,uniType:'body',timed:true}
      ], finishers: [
        {id:'bpa_l_fin', name:'Band Pull-Apart — Left Scapular Focus', sets:1,repsLow:20,repsHigh:20,repsSpec:'×20',equipment:'Band',category:'rehab',leftOnly:true,finisherNote:'Left scapular focus'}
      ]},
      thu: { label: 'Hinge / Lunge + Core', exercises: [
        {id:'barbell_rdl',          name:'Barbell RDL',              sets:4,repsLow:8,repsHigh:8, repsSpec:'×8',      equipment:'Barbell',category:'rdl'},
        {id:'bulgarian_split_squat',name:'Bulgarian Split Squat',   sets:3,repsLow:8,repsHigh:8, repsSpec:'×8 / leg',equipment:'DB',    category:'lunge',unilateral:true,uniType:'lower'},
        {id:'kb_swing',             name:'KB Swing',                 sets:3,repsLow:15,repsHigh:15,repsSpec:'×15',    equipment:'KB',     category:'hinge'},
        {id:'nordic_curl_neg',      name:'Nordic Curl Negatives',    sets:3,repsLow:4, repsHigh:4, repsSpec:'×4',     equipment:'BW',     category:'hinge'}
      ]},
      fri: { label: 'Vertical Pull + Mobility', exercises: [
        {id:'pullup',          name:'Pull-Ups (assisted → BW)',  sets:4,repsLow:4,repsHigh:6, repsSpec:'×4–6', equipment:'Bar',category:'pullup'},
        {id:'slow_neg_pullup', name:'Negatives',                 sets:3,repsLow:5,repsHigh:5, repsSpec:'×5',   equipment:'Bar',category:'pullup'},
        {id:'dead_hang',       name:'Dead Hang',                 sets:3,repsLow:40,repsHigh:40,repsSpec:'40 s',equipment:'Bar',category:'pullup',timed:true},
        {id:'mobility_flow',   name:'Mobility',                  sets:1,repsLow:1,repsHigh:1, repsSpec:'Flow', equipment:'BW', category:'mobility'}
      ]}
    }
  },

  // ── PHASE 4: FULL (Weeks 13-16) ──
  {
    phase: 4, weeks: [13,14,15,16], label: 'Phase 4 — Full',
    days: {
      mon: { label: 'Squat + Core', exercises: [
        {id:'back_squat',           name:'Back Squat',            sets:5,repsLow:5, repsHigh:5,  repsSpec:'×5',      equipment:'Barbell',category:'squat'},
        {id:'bulgarian_split_squat',name:'Bulgarian Split Squat', sets:4,repsLow:8, repsHigh:8,  repsSpec:'×8 / leg',equipment:'DB',     category:'lunge',unilateral:true,uniType:'lower'},
        {id:'hanging_leg_raise',    name:'Hanging Leg Raises',    sets:4,repsLow:12,repsHigh:12, repsSpec:'×12',     equipment:'Bar',    category:'core'},
        {id:'plank_hold',           name:'Plank',                 sets:3,repsLow:75,repsHigh:75, repsSpec:'75 s',    equipment:'BW',     category:'core',timed:true}
      ]},
      tue: { label: 'Horizontal Pull + Shoulder Rehab', exercises: [
        {id:'barbell_row',       name:'Barbell Row',                       sets:4,repsLow:8, repsHigh:8, repsSpec:'×8',        equipment:'Barbell',   category:'row'},
        {id:'weighted_pullup',   name:'Weighted Pull-Ups / Chest-Sup Row', sets:3,repsLow:8, repsHigh:8, repsSpec:'×8',        equipment:'Bar / DB',  category:'row'},
        {id:'face_pull',         name:'Face Pulls',                        sets:3,repsLow:20,repsHigh:20,repsSpec:'×20',        equipment:'Band',      category:'rehab'},
        {id:'band_ext_rot',      name:'Band External Rotation',            sets:3,repsLow:20,repsHigh:20,repsSpec:'×20 / side', equipment:'Band',      category:'rehab',unilateral:true,uniType:'upper',leftLeadNote:true}
      ], finishers: [
        {id:'sar_l_fin', name:'Single-Arm DB Row — Left Finisher',   sets:2,repsLow:10,repsHigh:10,repsSpec:'×10',equipment:'DB',  category:'row',  leftOnly:true,finisherNote:'Left arm only — close the imbalance'},
        {id:'ber_l_fin', name:'Band Ext. Rotation — Left Finisher',  sets:1,repsLow:20,repsHigh:20,repsSpec:'×20',equipment:'Band',category:'rehab',leftOnly:true,finisherNote:'Left shoulder only'}
      ]},
      wed: { label: 'Horizontal Push + Core', exercises: [
        {id:'flat_db_bench',  name:'DB Bench Press',            sets:5,repsLow:5,repsHigh:5, repsSpec:'×5 / arm',  equipment:'DB',     category:'bench',unilateral:true,uniType:'upper',leftLeadNote:true,shoulderSafety:true},
        {id:'seated_db_ohp',  name:'Seated DB Overhead Press',  sets:3,repsLow:8,repsHigh:8, repsSpec:'×8',        equipment:'DB',     category:'press',shoulderSafety:true,onlyIfPainFree:true},
        {id:'landmine_press', name:'Landmine Press',            sets:3,repsLow:8,repsHigh:8, repsSpec:'×8 / side', equipment:'Barbell',category:'press',unilateral:true,uniType:'upper',leftLeadNote:true,shoulderSafety:true,onlyIfPainFree:true},
        {id:'side_plank',     name:'Side Plank',                sets:3,repsLow:40,repsHigh:40,repsSpec:'40 s / side',equipment:'BW',  category:'core', unilateral:true,uniType:'body',timed:true}
      ], finishers: [
        {id:'bpa_l_fin', name:'Band Pull-Apart — Left Scapular Focus', sets:1,repsLow:20,repsHigh:20,repsSpec:'×20',equipment:'Band',category:'rehab',leftOnly:true,finisherNote:'Left scapular focus'}
      ]},
      thu: { label: 'Hinge / Lunge + Core', exercises: [
        {id:'barbell_rdl',     name:'Barbell RDL',              sets:4,repsLow:6,repsHigh:6, repsSpec:'×6',      equipment:'Barbell',category:'rdl'},
        {id:'pistol_prog',     name:'Pistol / Bulgarian Prog.', sets:4,repsLow:6,repsHigh:6, repsSpec:'×6 / leg',equipment:'DB/BW',  category:'lunge',unilateral:true,uniType:'lower'},
        {id:'nordic_curl',     name:'Nordic Curl',              sets:3,repsLow:5,repsHigh:5, repsSpec:'×5',      equipment:'BW',     category:'hinge'},
        {id:'kb_swing',        name:'KB Swing',                 sets:3,repsLow:20,repsHigh:20,repsSpec:'×20',   equipment:'KB',     category:'hinge'}
      ]},
      fri: { label: 'Vertical Pull + Mobility', exercises: [
        {id:'pullup',         name:'Pull-Ups',           sets:4,repsLow:6,repsHigh:8, repsSpec:'×6–8', equipment:'Bar',category:'pullup'},
        {id:'chinup',         name:'Chin-Ups',           sets:3,repsLow:6,repsHigh:6, repsSpec:'×6',   equipment:'Bar',category:'pullup'},
        {id:'weighted_hang',  name:'Weighted Dead Hang', sets:3,repsLow:45,repsHigh:45,repsSpec:'45 s',equipment:'Bar',category:'pullup',timed:true},
        {id:'full_mobility',  name:'Full Mobility Flow', sets:1,repsLow:1,repsHigh:1, repsSpec:'Flow', equipment:'BW', category:'mobility'}
      ]}
    }
  }
];

const DAY_ORDER = ['mon','tue','wed','thu','fri'];
const DAY_JS_MAP = {1:'mon',2:'tue',3:'wed',4:'thu',5:'fri'}; // JS getDay → key
const DAY_NAMES  = {mon:'Monday',tue:'Tuesday',wed:'Wednesday',thu:'Thursday',fri:'Friday'};
const CATEGORY_LABELS = {squat:'Squat',rdl:'RDL',bench:'Bench',row:'Row',press:'Press',pullup:'Pull-Up',lunge:'Lunge',hinge:'Hinge',core:'Core',rehab:'Rehab',mobility:'Mobility'};

// ──────────────────────────────────────────────────────────
// 2. DATA LAYER
// ──────────────────────────────────────────────────────────
const STORAGE_KEY = 'trainright_v1';

function getData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultData();
  } catch { return defaultData(); }
}

function saveData(d) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch(e) { console.error('Save failed', e); }
}

function defaultData() {
  return {
    profile: { name:'Riaan', age:46, heightCm:178 },
    settings: { startDate: getMondayOf(new Date()).toISOString().split('T')[0], autoDeload: true },
    logs: {},
    bodyMetrics: [
      { date:'2026-05-26', weight:83.6, smm:37.9, bfp:19.7,
        leftArmLean:3.89, rightArmLean:4.26,
        leftArmCirc:'', rightArmCirc:'', shoulderWidth:'', chest:'', waist:'', thighL:'', thighR:'' }
    ]
  };
}

function initData() {
  const d = getData();
  // Ensure baseline exists
  if (!d.bodyMetrics || d.bodyMetrics.length === 0) {
    d.bodyMetrics = defaultData().bodyMetrics;
    saveData(d);
  }
  // Ensure settings has startDate
  if (!d.settings) d.settings = defaultData().settings;
  if (!d.settings.startDate) {
    d.settings.startDate = getMondayOf(new Date()).toISOString().split('T')[0];
    saveData(d);
  }
  return d;
}

// ──────────────────────────────────────────────────────────
// 3. UTILITY FUNCTIONS
// ──────────────────────────────────────────────────────────
function fmtDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
}

function parseDate(s) {
  const [y,m,day] = s.split('-').map(Number);
  return new Date(y, m-1, day);
}

function getMondayOf(d) {
  const dt = new Date(d);
  const dow = dt.getDay(); // 0=Sun
  const diff = dow === 0 ? -6 : 1 - dow;
  dt.setDate(dt.getDate() + diff);
  dt.setHours(0,0,0,0);
  return dt;
}

function getWeekNum(dateStr) {
  const d = getData();
  const start = parseDate(d.settings.startDate || fmtDate(getMondayOf(new Date())));
  const target = parseDate(dateStr);
  const diffDays = Math.round((target - start) / 86400000);
  if (diffDays < 0) return 0; // before program start
  return Math.floor(diffDays / 7) + 1;
}

function getPhaseForWeek(wk) {
  return PHASES.find(p => p.weeks.includes(wk)) || null;
}

function getDayKey(date) {
  const dow = date.getDay();
  return DAY_JS_MAP[dow] || null; // null on weekends
}

function isDeloadWeek(wk) {
  const d = getData();
  return d.settings.autoDeload && wk > 0 && wk % 4 === 0;
}

function deloadSets(n) {
  return Math.max(2, Math.floor(n * 2/3));
}

function formatDateShort(dateStr) {
  const d = parseDate(dateStr);
  return d.toLocaleDateString('en-ZA', {day:'numeric', month:'short'});
}

function formatDateFull(dateStr) {
  const d = parseDate(dateStr);
  return d.toLocaleDateString('en-ZA', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
}

function getWorkoutDef(dateStr) {
  const wk = getWeekNum(dateStr);
  const phase = getPhaseForWeek(wk);
  if (!phase) return null;
  const dayKey = getDayKey(parseDate(dateStr));
  if (!dayKey) return null;
  const dayDef = phase.days[dayKey];
  if (!dayDef) return null;
  return { wk, phase, dayKey, dayDef };
}

// Streak: consecutive Mon–Fri days with completed workouts
function calcStreak() {
  const d = getData();
  const logs = d.logs || {};
  let streak = 0;
  const today = new Date(); today.setHours(0,0,0,0);
  let cursor = new Date(today);

  for (let i = 0; i < 365; i++) {
    const dow = cursor.getDay();
    if (dow === 0 || dow === 6) { cursor.setDate(cursor.getDate()-1); continue; }
    const ds = fmtDate(cursor);
    const todayDs = fmtDate(today);
    if (logs[ds] && logs[ds].completed) {
      streak++;
    } else if (ds === todayDs) {
      // Today not done yet — don't break streak
    } else {
      break;
    }
    cursor.setDate(cursor.getDate()-1);
  }
  return streak;
}

// Last bodyweight
function latestBodyweight() {
  const d = getData();
  if (!d.bodyMetrics || d.bodyMetrics.length === 0) return null;
  const sorted = [...d.bodyMetrics].sort((a,b) => b.date.localeCompare(a.date));
  return sorted[0].weight || null;
}

// Current arm gap %
function currentArmGap() {
  const d = getData();
  if (!d.bodyMetrics || d.bodyMetrics.length === 0) return null;
  const sorted = [...d.bodyMetrics].filter(m => m.leftArmLean && m.rightArmLean)
                                    .sort((a,b) => b.date.localeCompare(a.date));
  if (!sorted.length) return null;
  const m = sorted[0];
  const gap = ((m.rightArmLean - m.leftArmLean) / m.leftArmLean) * 100;
  return { gap: gap.toFixed(1), left: m.leftArmLean, right: m.rightArmLean, date: m.date };
}

// Does a logged set hold any real data (vs. an auto-created blank)?
function setHasData(s) {
  return !!(s && (s.done || s.leftDone || s.rightDone ||
    s.weight || s.reps || s.leftWeight || s.leftReps || s.rightWeight || s.rightReps));
}

// Last logged data for an exercise. Skips the day currently being edited and
// any auto-created entries with no real data, so prefill always pulls from the
// most recent genuine session.
function getLastExerciseLog(exerciseId) {
  const d = getData();
  const logs = d.logs || {};
  const dates = Object.keys(logs).sort().reverse();
  for (const ds of dates) {
    if (ds === state.workoutDate) continue;
    const ex = logs[ds].exercises && logs[ds].exercises[exerciseId];
    if (ex && ex.sets && ex.sets.some(setHasData)) return ex;
  }
  return null;
}

// Progression nudge: was last session at top of rep range?
function shouldShowProgressionNudge(exerciseId, repsHigh) {
  const last = getLastExerciseLog(exerciseId);
  if (!last || !last.sets) return false;
  const completedSets = last.sets.filter(s => s.done || s.leftDone || s.rightDone);
  if (completedSets.length === 0) return false;
  return completedSets.every(s => {
    if (s.done) return parseInt(s.reps) >= repsHigh;
    // Unilateral: left side determines progression
    return parseInt(s.leftReps) >= repsHigh;
  });
}

// Read-only: returns the stored log entry for a date, or null. No mutation,
// no save — safe to call when merely viewing/navigating to a date.
function getLogEntry(ds) {
  const d = getData();
  return d.logs[ds] || null;
}

// Create the log entry for a date if missing, then persist. Only call this in
// response to a real user action (entering a set, toggling done, notes, etc.)
// so that simply viewing a date never bloats storage with empty entries.
function ensureLogEntry(ds) {
  const d = getData();
  if (!d.logs[ds]) {
    const wk = getWeekNum(ds);
    const def = getWorkoutDef(ds);
    d.logs[ds] = {
      weekNum: wk,
      dayKey: def ? def.dayKey : null,
      phase: def ? def.phase.phase : null,
      completed: false,
      notes: '',
      exercises: {}
    };
    saveData(d);
  }
  return d;
}

// ──────────────────────────────────────────────────────────
// 4. APP STATE & NAVIGATION
// ──────────────────────────────────────────────────────────
const state = {
  view: 'home',
  workoutDate: fmtDate(new Date()),
  bodyTab: 'log',    // 'log' | 'charts'
  progressTab: 'squat',
  historyDetail: null,
};

function navigate(view) {
  state.view = view;
  state.historyDetail = null; // always land on the list when using the nav
  // Push a history entry so the browser Back/Forward buttons move between tabs.
  if (location.hash.replace('#','') !== view) {
    history.pushState({view}, '', '#' + view);
  }
  renderApp();
  document.getElementById('main-content').scrollTop = 0;
}

function renderApp() {
  const content = document.getElementById('main-content');
  switch(state.view) {
    case 'home':     renderHome(content);     break;
    case 'workout':  renderWorkout(content);  break;
    case 'history':  renderHistory(content);  break;
    case 'body':     renderBody(content);     break;
    case 'progress': renderProgress(content); break;
    case 'settings': renderSettings(content); break;
    default:         renderHome(content);
  }
  // Update nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === state.view);
  });
  // Timer visibility (and reserve space so it doesn't cover workout content)
  const onWorkout = state.view === 'workout';
  document.getElementById('timer-widget').classList.toggle('visible', onWorkout);
  document.getElementById('app').classList.toggle('timer-active', onWorkout);
}

// ──────────────────────────────────────────────────────────
// 5. HOME VIEW
// ──────────────────────────────────────────────────────────
function renderHome(el) {
  const todayStr = fmtDate(new Date());
  const wk = getWeekNum(todayStr);
  const dayKey = getDayKey(new Date());
  const phase = getPhaseForWeek(wk);
  const streak = calcStreak();
  const bw = latestBodyweight();
  const gap = currentArmGap();
  const isDeload = isDeloadWeek(wk);

  const todayName = dayKey ? DAY_NAMES[dayKey] : 'Weekend';
  const dayLabel = dayKey && phase ? phase.days[dayKey].label : '';
  const d = getData();
  const isWeekend = !dayKey;

  // Re-scan reminder for Week 8 and 16
  const showRescanBanner = wk === 8 || wk === 16;

  let html = `<div class="page">`;

  // Header
  html += `
    <div class="home-header">
      <div>
        <h1>TrainRight 💪</h1>
        <div class="date-badge">${new Date().toLocaleDateString('en-ZA',{weekday:'long',day:'numeric',month:'long'})}</div>
      </div>
      <div class="streak-badge">🔥 ${streak} day${streak !== 1 ? 's' : ''}</div>
    </div>`;

  // Deload banner
  if (isDeload && wk > 0) {
    html += `<div class="banner banner-deload"><span class="banner-icon">🌙</span><span>Deload week — lighter loads, focus on form & recovery</span></div>`;
  }

  // Re-scan banner
  if (showRescanBanner) {
    html += `<div class="banner banner-warning"><span class="banner-icon">📏</span><span>Time for an InBody re-scan — check if your left arm is catching up!</span></div>`;
  }

  // Hero button (Start workout)
  if (!isWeekend && wk > 0 && wk <= 16) {
    const alreadyDone = d.logs[todayStr] && d.logs[todayStr].completed;
    html += `
      <button class="hero-btn" onclick="state.workoutDate='${todayStr}'; navigate('workout')">
        <div class="workout-title">${alreadyDone ? '✅ ' : ''}${todayName} — ${dayLabel}</div>
        <div class="workout-sub">${alreadyDone ? 'Workout complete — tap to review' : 'Tap to start today\'s workout'}</div>
        <div class="workout-week">Week ${wk} · ${phase ? phase.label : ''}</div>
      </button>`;
  } else if (isWeekend) {
    html += `
      <div class="card" style="text-align:center;padding:24px 16px;">
        <div style="font-size:36px;margin-bottom:8px;">🛌</div>
        <div style="font-size:16px;font-weight:700;margin-bottom:4px;">Rest Day</div>
        <div style="font-size:13px;color:var(--text-muted)">Recover, eat well, sleep. Come back Monday.</div>
      </div>`;
  } else if (wk > 16) {
    html += `<div class="banner banner-success"><span class="banner-icon">🏆</span><span>16-week program complete! Incredible work, Riaan.</span></div>`;
  }

  // Stats
  html += `<div class="stats-grid">`;
  // Bodyweight
  html += `<div class="stat-card">
    <div class="val">${bw ? bw + ' kg' : '—'}</div>
    <div class="lbl">Bodyweight</div>
  </div>`;
  // Arm gap
  if (gap) {
    html += `<div class="stat-card">
      <div class="val gap-color">${gap.gap}%</div>
      <div class="lbl">L/R Arm Gap</div>
    </div>`;
  } else {
    html += `<div class="stat-card"><div class="val">—</div><div class="lbl">L/R Arm Gap</div></div>`;
  }
  // Week progress
  html += `<div class="stat-card">
    <div class="val">${wk > 0 && wk <= 16 ? wk : '—'}</div>
    <div class="lbl">Current Week</div>
  </div>`;
  // Phase
  html += `<div class="stat-card">
    <div class="val">${phase ? phase.phase : '—'}</div>
    <div class="lbl">Phase</div>
  </div>`;
  html += `</div>`;

  // Quick bodyweight log
  html += `
    <div class="card">
      <div class="flex-between mb-8">
        <h3>Quick Weigh-In</h3>
        <span class="label">Today</span>
      </div>
      <div style="display:flex;gap:10px;align-items:center;">
        <input type="number" id="quick-bw" class="set-input" style="flex:1" placeholder="${bw || '83.6'}" step="0.1" min="40" max="200">
        <span style="color:var(--text-muted);font-size:14px;white-space:nowrap">kg</span>
        <button class="btn btn-primary btn-sm" onclick="quickLogWeight()">Log</button>
      </div>
    </div>`;

  html += `</div>`;
  el.innerHTML = html;
}

function quickLogWeight() {
  const val = parseFloat(document.getElementById('quick-bw').value);
  if (!val || val < 30) return;
  const d = getData();
  const todayStr = fmtDate(new Date());
  // Add or update today's entry
  const idx = d.bodyMetrics.findIndex(m => m.date === todayStr);
  if (idx >= 0) {
    d.bodyMetrics[idx].weight = val;
  } else {
    d.bodyMetrics.push({ date: todayStr, weight: val, smm:'', bfp:'', leftArmLean:'', rightArmLean:'', leftArmCirc:'', rightArmCirc:'', shoulderWidth:'', chest:'', waist:'', thighL:'', thighR:'' });
  }
  saveData(d);
  showToast(`Weight ${val} kg logged ✓`);
  renderApp();
}

// ──────────────────────────────────────────────────────────
// 6. WORKOUT VIEW
// ──────────────────────────────────────────────────────────
function renderWorkout(el) {
  const ds = state.workoutDate;
  const date = parseDate(ds);
  const wk = getWeekNum(ds);
  const dayKey = getDayKey(date);
  const isDeload = isDeloadWeek(wk);

  // Weekend check
  if (!dayKey) {
    el.innerHTML = `<div class="page">
      ${workoutNavHTML(ds)}
      <div class="rest-day-card">
        <div class="rest-icon">🛌</div>
        <h2>Rest Day</h2>
        <p>Weekends are for recovery.<br>Sleep, eat well, and come back Monday.</p>
      </div>
    </div>`;
    return;
  }

  const phase = getPhaseForWeek(wk);
  if (!phase || wk < 1) {
    el.innerHTML = `<div class="page">
      ${workoutNavHTML(ds)}
      <div class="card" style="text-align:center;padding:30px">
        <p style="color:var(--text-muted)">No workout scheduled.<br>Check your program start date in Settings.</p>
      </div>
    </div>`;
    return;
  }
  if (wk > 16) {
    el.innerHTML = `<div class="page">
      ${workoutNavHTML(ds)}
      <div class="banner banner-success"><span class="banner-icon">🏆</span><span>16-week program complete! Outstanding work.</span></div>
    </div>`;
    return;
  }

  const dayDef = phase.days[dayKey];
  // Read-only for rendering. If nothing is stored yet, use a throwaway stub so
  // merely viewing a date never creates a persisted (phantom) log entry.
  const logEntry = getLogEntry(ds) || { notes: '', exercises: {} };

  let html = `<div class="page">`;
  html += workoutNavHTML(ds);

  // Week badge
  html += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap;">
    <div class="week-badge"><span class="phase-dot"></span>Week ${wk} · ${phase.label}</div>
    ${isDeload ? '<div class="week-badge" style="border-color:var(--secondary);color:var(--secondary)">🌙 Deload</div>' : ''}
  </div>`;

  if (isDeload) {
    html += `<div class="banner banner-deload mb-8"><span class="banner-icon">🌙</span><span>Deload week — reduce working weight ~15%, focus on form & recovery.</span></div>`;
  }

  // Exercises
  const exercises = dayDef.exercises;
  for (const ex of exercises) {
    html += renderExerciseCard(ex, ds, logEntry, isDeload);
  }

  // Left-arm finishers
  if (dayDef.finishers && dayDef.finishers.length > 0) {
    html += `<div class="card" style="border-color:var(--primary);background:rgba(108,99,255,0.06);">
      <div class="label mb-8" style="color:var(--primary)">🟣 Left-Arm Finishers — Close the Imbalance</div>`;
    for (const ex of dayDef.finishers) {
      html += renderExerciseCard(ex, ds, logEntry, isDeload);
    }
    html += `</div>`;
  }

  // Notes
  const notes = logEntry.notes || '';
  html += `<div class="card">
    <div class="label mb-8">Workout Notes</div>
    <textarea id="workout-notes" placeholder="How did it feel? Shoulder OK? Any PRs?..."
      oninput="saveWorkoutNotes('${ds}', this.value)"
      style="min-height:70px">${escHtml(notes)}</textarea>
  </div>`;

  // Complete button
  const done = logEntry.completed;
  html += `<div class="complete-btn-wrap">
    <button class="btn btn-full ${done ? 'btn-secondary' : 'btn-success'}"
      onclick="toggleWorkoutComplete('${ds}')">
      ${done ? '✅ Workout Complete — tap to undo' : '✓ Mark Workout Complete'}
    </button>
  </div>`;

  html += `</div>`;

  el.innerHTML = html;
}

function workoutNavHTML(ds) {
  const date = parseDate(ds);
  const dow = date.getDay();
  const dayKey = DAY_JS_MAP[dow];
  const prevDs = fmtDate(new Date(date.getTime() - 86400000));
  const nextDs = fmtDate(new Date(date.getTime() + 86400000));
  const todayDs = fmtDate(new Date());
  const isFuture = ds > todayDs;

  return `<div class="workout-header">
    <button class="date-nav-btn" onclick="state.workoutDate='${prevDs}';renderApp()">‹</button>
    <div class="date-display">
      <div class="day-name">${dayKey ? DAY_NAMES[dayKey] : (dow===0||dow===6?'Weekend':'—')}</div>
      <div class="date-str">${formatDateShort(ds)}${ds===todayDs?' · Today':''}</div>
    </div>
    <button class="date-nav-btn" onclick="state.workoutDate='${nextDs}';renderApp()" ${isFuture?'style="opacity:0.4"':''}>›</button>
  </div>`;
}

function renderExerciseCard(ex, ds, logEntry, isDeload) {
  const sets = isDeload && !ex.leftOnly ? deloadSets(ex.sets) : ex.sets;
  const nudge = ex.leftOnly ? false : shouldShowProgressionNudge(ex.id, ex.repsHigh);
  // Prefill hints come from the same exercise id's last real session. Left-only
  // finishers have unique ids (sar_l_fin, …) so they won't cross-contaminate.
  const lastLog = getLastExerciseLog(ex.id);

  let cls = 'exercise-card';
  if (ex.leftOnly) cls += ' left-only';
  if (ex.onlyIfPainFree) cls += ' pain-free';

  let html = `<div class="${cls}" id="ex-${ex.id}-${ds}">`;

  // Header
  html += `<div class="exercise-header">
    <div class="exercise-name">
      ${escHtml(ex.name)}
      ${ex.optional ? '<span class="ex-badge badge-optional">Optional</span>' : ''}
      ${ex.leftOnly ? '<span class="ex-badge badge-left-finisher">Left Only</span>' : ''}
      ${ex.onlyIfPainFree ? '<span class="ex-badge badge-pain-free">Pain-Free Only</span>' : ''}
      ${ex.category === 'rehab' ? '<span class="ex-badge badge-rehab">Rehab</span>' : ''}
    </div>
    <div class="exercise-meta">
      <span>${sets} sets · ${ex.repsSpec}</span>
      <span style="color:var(--text-dim)">${ex.equipment}</span>
      ${nudge ? '<span class="ex-badge badge-progression">↑ Ready to add load</span>' : ''}
    </div>
  </div>`;

  // Notes
  if (ex.shoulderSafety) {
    html += `<div class="shoulder-note">⚠️ <span>Elbows tucked ~45°. Sharp or lingering pain = stop, regress, keep band work going.</span></div>`;
  }
  if (ex.onlyIfPainFree) {
    html += `<div class="pain-free-note">🔐 Only if completely pain-free. If any pinch or ache, skip this and keep landmine / band work.</div>`;
  }
  if (ex.leftLeadNote && !ex.leftOnly) {
    html += `<div class="left-lead-note">🟣 <span>Do <strong>LEFT</strong> first to your target reps — then match that exact rep count on the RIGHT.</span></div>`;
  }
  if (ex.leftOnly && ex.finisherNote) {
    html += `<div class="left-lead-note">🟣 <span>${escHtml(ex.finisherNote)}</span></div>`;
  }

  if (nudge) {
    html += `<div class="progression-nudge">✨ All sets hit top of range last session — consider adding 1–2.5 kg today.</div>`;
  }

  // Ensure log space for rendering (display-only; renderWorkout no longer saves
  // from rendering, so this never persists for an untouched date).
  if (!logEntry.exercises[ex.id]) logEntry.exercises[ex.id] = { sets: [] };
  const exLog = logEntry.exercises[ex.id];
  while (exLog.sets.length < sets) exLog.sets.push({});
  if (exLog.sets.length > sets) exLog.sets = exLog.sets.slice(0, sets);

  // Pre-fill hints from the last real session — kept in a SEPARATE scratch array
  // and rendered only as input placeholders. Never written into exLog.sets, so a
  // hint can never masquerade as a logged set in getLastExerciseLog.
  const prefills = [];
  if (lastLog && lastLog.sets) {
    for (let i = 0; i < sets; i++) {
      prefills[i] = lastLog.sets[i] || lastLog.sets[lastLog.sets.length - 1] || {};
    }
  }

  // Set rows
  if (ex.unilateral && ex.uniType !== 'body') {
    // Upper body unilateral OR lower body (L/R columns)
    html += `<div class="uni-header">
      <span></span>
      <span class="col-left" style="text-align:center">kg</span>
      <span class="col-left" style="text-align:center">reps</span>
      <span class="col-left" style="text-align:center">✓</span>
      <span></span>
      <span class="col-right" style="text-align:center">kg</span>
      <span class="col-right" style="text-align:center">reps</span>
      <span class="col-right" style="text-align:center">✓</span>
    </div>
    <div style="display:flex;gap:6px;padding:0 16px 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;">
      <span style="width:28px"></span>
      <span style="flex:2;text-align:center;color:var(--left-col)">LEFT</span>
      <span style="width:1px;background:var(--border)"></span>
      <span style="flex:2;text-align:center;color:var(--right-col)">RIGHT</span>
    </div>`;
    for (let i = 0; i < sets; i++) {
      const s = exLog.sets[i] || {};
      const pf = prefills[i] || {};
      const ldone = s.leftDone ? ' done' : '';
      const rdone = s.rightDone ? ' done' : '';
      html += `<div class="uni-row">
        <span class="set-num">${i+1}</span>
        <input class="set-input" type="number" placeholder="${pf.leftWeight||'kg'}" step="0.5" min="0"
          value="${s.leftWeight||''}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="leftWeight"
          onchange="updateSet(this)">
        <input class="set-input" type="number" placeholder="${pf.leftReps||(ex.timed ? ex.repsLow + 's' : ex.repsLow)}" min="0"
          value="${s.leftReps||''}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="leftReps"
          onchange="updateSet(this)">
        <button class="set-done-btn${ldone}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="leftDone"
          onclick="toggleDone(this)">✓</button>
        <div class="uni-divider-cell"></div>
        <input class="set-input" type="number" placeholder="${pf.rightWeight||'kg'}" step="0.5" min="0"
          value="${s.rightWeight||''}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="rightWeight"
          onchange="updateSet(this)">
        <input class="set-input" type="number" placeholder="${pf.rightReps||(ex.timed ? ex.repsLow + 's' : ex.repsLow)}" min="0"
          value="${s.rightReps||''}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="rightReps"
          onchange="updateSet(this)">
        <button class="set-done-btn${rdone}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="rightDone"
          onclick="toggleDone(this)">✓</button>
      </div>`;
    }
  } else if (ex.unilateral && ex.uniType === 'body') {
    // Body (dead bug, bird-dog, side plank) — simple L/R for symmetry
    html += `<div style="display:flex;gap:6px;padding:0 16px 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;">
      <span style="width:28px"></span>
      <span style="flex:2;text-align:center;color:var(--left-col)">LEFT</span>
      <span style="width:1px;background:var(--border)"></span>
      <span style="flex:2;text-align:center;color:var(--right-col)">RIGHT</span>
    </div>`;
    for (let i = 0; i < sets; i++) {
      const s = exLog.sets[i] || {};
      const pf = prefills[i] || {};
      const ldone = s.leftDone ? ' done' : '';
      const rdone = s.rightDone ? ' done' : '';
      html += `<div class="uni-row">
        <span class="set-num">${i+1}</span>
        <input class="set-input" type="number" placeholder="${pf.leftReps||(ex.timed ? ex.repsLow + 's' : ex.repsLow)}" min="0"
          value="${s.leftReps||''}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="leftReps"
          onchange="updateSet(this)">
        <span class="uni-blank-cell"></span>
        <button class="set-done-btn${ldone}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="leftDone"
          onclick="toggleDone(this)">✓</button>
        <div class="uni-divider-cell"></div>
        <input class="set-input" type="number" placeholder="${pf.rightReps||(ex.timed ? ex.repsLow + 's' : ex.repsLow)}" min="0"
          value="${s.rightReps||''}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="rightReps"
          onchange="updateSet(this)">
        <span class="uni-blank-cell"></span>
        <button class="set-done-btn${rdone}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="rightDone"
          onclick="toggleDone(this)">✓</button>
      </div>`;
    }
  } else if (ex.leftOnly) {
    // Left-only finisher
    html += `<div class="sets-table">
      <div class="sets-header"><span class="sh-set">SET</span><span>kg</span><span>reps</span><span>✓</span></div>`;
    for (let i = 0; i < sets; i++) {
      const s = exLog.sets[i] || {};
      const pf = prefills[i] || {};
      const done = s.done ? ' done' : '';
      html += `<div class="set-row">
        <span class="set-num">${i+1}</span>
        <input class="set-input" type="number" placeholder="${pf.weight||'kg'}" step="0.5" min="0"
          value="${s.weight||''}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="weight"
          onchange="updateSet(this)">
        <input class="set-input" type="number" placeholder="${pf.reps||ex.repsLow}" min="0"
          value="${s.reps||''}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="reps"
          onchange="updateSet(this)">
        <button class="set-done-btn${done}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="done"
          onclick="toggleDone(this)">✓</button>
      </div>`;
    }
    html += `</div>`;
  } else {
    // Bilateral
    html += `<div class="sets-table">
      <div class="sets-header"><span class="sh-set">SET</span><span>kg</span><span>${ex.timed?'sec':'reps'}</span><span>✓</span></div>`;
    for (let i = 0; i < sets; i++) {
      const s = exLog.sets[i] || {};
      const pf = prefills[i] || {};
      const done = s.done ? ' done' : '';
      html += `<div class="set-row">
        <span class="set-num">${i+1}</span>
        <input class="set-input" type="number" placeholder="${pf.weight||(ex.timed?'—':'kg')}" step="0.5" min="0"
          value="${s.weight||''}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="weight"
          onchange="updateSet(this)">
        <input class="set-input" type="number" placeholder="${pf.reps||(ex.timed ? ex.repsLow + 's' : ex.repsLow)}" min="0"
          value="${s.reps||''}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="reps"
          onchange="updateSet(this)">
        <button class="set-done-btn${done}"
          data-ds="${ds}" data-exid="${ex.id}" data-set="${i}" data-field="done"
          onclick="toggleDone(this)">✓</button>
      </div>`;
    }
    html += `</div>`;
  }

  html += `</div>`; // end exercise-card
  return html;
}

function updateSet(input) {
  const { ds, exid, set, field } = input.dataset;
  const d = ensureLogEntry(ds);
  const exLog = d.logs[ds].exercises[exid] || { sets: [] };
  while (exLog.sets.length <= parseInt(set)) exLog.sets.push({});
  exLog.sets[parseInt(set)][field] = input.value;
  d.logs[ds].exercises[exid] = exLog;
  saveData(d);
}

function toggleDone(btn) {
  const { ds, exid, set, field } = btn.dataset;
  const d = ensureLogEntry(ds);
  const exLog = d.logs[ds].exercises[exid] || { sets: [] };
  while (exLog.sets.length <= parseInt(set)) exLog.sets.push({});
  const cur = exLog.sets[parseInt(set)][field];
  exLog.sets[parseInt(set)][field] = !cur;
  d.logs[ds].exercises[exid] = exLog;
  saveData(d);
  btn.classList.toggle('done', !cur);
  // Start rest timer on done
  if (!cur) timer.startFromLastPreset();
}

function saveWorkoutNotes(ds, val) {
  const d = ensureLogEntry(ds);
  d.logs[ds].notes = val;
  saveData(d);
}

function toggleWorkoutComplete(ds) {
  const d = ensureLogEntry(ds);
  d.logs[ds].completed = !d.logs[ds].completed;
  saveData(d);
  renderApp();
}

// ──────────────────────────────────────────────────────────
// 7. HISTORY VIEW
// ──────────────────────────────────────────────────────────
function renderHistory(el) {
  const d = getData();
  const logs = d.logs || {};
  const dates = Object.keys(logs).filter(ds => {
    const log = logs[ds];
    // Has any exercise with at least one set done
    return Object.values(log.exercises||{}).some(ex =>
      ex.sets && ex.sets.some(s => s.done || s.leftDone || s.rightDone)
    ) || log.completed;
  }).sort().reverse();

  if (state.historyDetail) {
    renderHistoryDetail(el, state.historyDetail);
    return;
  }

  let html = `<div class="page"><h2 style="margin-bottom:16px">Workout History</h2>`;

  if (dates.length === 0) {
    html += `<div class="card" style="text-align:center;padding:40px 20px;color:var(--text-muted)">No workouts logged yet.<br>Start your first session!</div>`;
  } else {
    for (const ds of dates) {
      const log = logs[ds];
      const def = getWorkoutDef(ds);
      const label = def ? def.dayDef.label : 'Workout';
      const wk = getWeekNum(ds);
      const exCount = Object.keys(log.exercises || {}).length;
      const icon = def ? {mon:'🏋️',tue:'🔄',wed:'💪',thu:'🏃',fri:'🧗'}[def.dayKey]||'💪' : '💪';
      html += `<div class="history-item" onclick="state.historyDetail='${ds}';renderApp()">
        <div class="history-icon">${icon}</div>
        <div class="history-info">
          <div class="history-title">${label}</div>
          <div class="history-sub">${formatDateShort(ds)} · Week ${wk} · ${exCount} exercises${log.completed?' · ✅ Done':''}</div>
          ${log.notes ? `<div class="history-sub" style="margin-top:2px;font-style:italic">"${escHtml(log.notes.slice(0,60))}${log.notes.length>60?'…':''}"</div>` : ''}
        </div>
        <span class="history-chevron">›</span>
      </div>`;
    }
  }
  html += `</div>`;
  el.innerHTML = html;
}

function renderHistoryDetail(el, ds) {
  const d = getData();
  const log = d.logs[ds];
  if (!log) { state.historyDetail = null; renderHistory(el); return; }
  const def = getWorkoutDef(ds);
  const label = def ? def.dayDef.label : 'Workout';

  let html = `<div class="page">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">
      <button class="date-nav-btn" onclick="state.historyDetail=null;renderApp()">‹</button>
      <div>
        <h2>${label}</h2>
        <div class="text-muted" style="font-size:13px">${formatDateFull(ds)}</div>
      </div>
    </div>`;

  if (log.notes) {
    html += `<div class="card" style="font-style:italic;font-size:14px">"${escHtml(log.notes)}"</div>`;
  }

  const exercises = log.exercises || {};
  for (const [exId, exLog] of Object.entries(exercises)) {
    // Find exercise name from PHASES
    let exName = exId.replace(/_/g,' ');
    for (const phase of PHASES) {
      for (const dayDef of Object.values(phase.days)) {
        const all = [...(dayDef.exercises||[]), ...(dayDef.finishers||[])];
        const found = all.find(e => e.id === exId);
        if (found) { exName = found.name; break; }
      }
    }
    if (!exLog.sets || exLog.sets.length === 0) continue;
    html += `<div class="card-sm">
      <div style="font-weight:700;margin-bottom:8px">${escHtml(exName)}</div>`;
    exLog.sets.forEach((s, i) => {
      if (s.leftReps !== undefined || s.leftWeight !== undefined) {
        html += `<div style="font-size:13px;color:var(--text-muted);margin-bottom:3px">
          Set ${i+1}: <span style="color:var(--left-col)">L ${s.leftWeight||'—'}kg × ${s.leftReps||'—'}</span> · <span style="color:var(--right-col)">R ${s.rightWeight||'—'}kg × ${s.rightReps||'—'}</span>
          ${(s.leftDone||s.rightDone)?'✅':''}
        </div>`;
      } else {
        html += `<div style="font-size:13px;color:var(--text-muted);margin-bottom:3px">
          Set ${i+1}: ${s.weight||'—'} kg × ${s.reps||'—'} ${s.done?'✅':''}
        </div>`;
      }
    });
    html += `</div>`;
  }
  html += `</div>`;
  el.innerHTML = html;
}

// ──────────────────────────────────────────────────────────
// 8. BODY METRICS VIEW
// ──────────────────────────────────────────────────────────
function renderBody(el) {
  let html = `<div class="page"><h2 style="margin-bottom:14px">Body Monitoring</h2>`;

  // Tabs
  html += `<div class="body-tabs">
    <button class="body-tab ${state.bodyTab==='log'?'active':''}" onclick="state.bodyTab='log';renderApp()">Log Entry</button>
    <button class="body-tab ${state.bodyTab==='charts'?'active':''}" onclick="state.bodyTab='charts';renderApp()">Charts</button>
  </div>`;

  if (state.bodyTab === 'log') {
    html += renderBodyLogTab();
  } else {
    html += renderBodyChartsTab();
  }

  html += `</div>`;
  el.innerHTML = html;
}

function renderBodyLogTab() {
  const gap = currentArmGap();
  let html = '';

  // Arm gap display
  if (gap) {
    html += `<div class="arm-gap-display">
      <div class="gap-val">${gap.gap}%</div>
      <div class="gap-lbl">Current L/R Lean Mass Gap</div>
      <div class="arm-row">
        <div class="arm-side"><div class="arm-val left">${gap.left} kg</div><div class="arm-lbl">Left Arm</div></div>
        <div class="arm-side" style="color:var(--text-dim);font-size:24px">⟷</div>
        <div class="arm-side"><div class="arm-val right">${gap.right} kg</div><div class="arm-lbl">Right Arm</div></div>
      </div>
    </div>`;
  }

  // New entry form
  html += `<div class="card">
    <h3 style="margin-bottom:14px">New Measurement</h3>
    <div class="form-row">
      <label>Date</label>
      <input type="date" id="bm-date" value="${fmtDate(new Date())}">
    </div>
    <div class="form-row-inline">
      <div class="form-row">
        <label>Body Weight (kg)</label>
        <input type="number" id="bm-weight" placeholder="83.6" step="0.1" min="30">
      </div>
      <div class="form-row">
        <label>Body Fat %</label>
        <input type="number" id="bm-bfp" placeholder="19.7" step="0.1">
      </div>
    </div>
    <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.07em;margin:10px 0 8px">InBody Metrics</div>
    <div class="form-row">
      <label>Skeletal Muscle Mass (kg)</label>
      <input type="number" id="bm-smm" placeholder="37.9" step="0.1">
    </div>
    <div class="form-row-inline">
      <div class="form-row">
        <label style="color:var(--left-col)">Left Arm Lean (kg)</label>
        <input type="number" id="bm-lalean" placeholder="3.89" step="0.01">
      </div>
      <div class="form-row">
        <label style="color:var(--right-col)">Right Arm Lean (kg)</label>
        <input type="number" id="bm-ralean" placeholder="4.26" step="0.01">
      </div>
    </div>
    <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.07em;margin:10px 0 8px">Tape Measurements (cm)</div>
    <div class="form-row-inline">
      <div class="form-row">
        <label style="color:var(--left-col)">Left Arm</label>
        <input type="number" id="bm-lacirc" placeholder="cm" step="0.5">
      </div>
      <div class="form-row">
        <label style="color:var(--right-col)">Right Arm</label>
        <input type="number" id="bm-racirc" placeholder="cm" step="0.5">
      </div>
    </div>
    <div class="form-row-inline">
      <div class="form-row"><label>Shoulder Width</label><input type="number" id="bm-shoulder" placeholder="cm" step="0.5"></div>
      <div class="form-row"></div>
    </div>
    <div class="form-row-inline">
      <div class="form-row"><label>Chest</label><input type="number" id="bm-chest" placeholder="cm" step="0.5"></div>
      <div class="form-row"><label>Waist</label><input type="number" id="bm-waist" placeholder="cm" step="0.5"></div>
    </div>
    <div class="form-row-inline">
      <div class="form-row"><label style="color:var(--left-col)">Thigh L</label><input type="number" id="bm-thighl" placeholder="cm" step="0.5"></div>
      <div class="form-row"><label style="color:var(--right-col)">Thigh R</label><input type="number" id="bm-thighr" placeholder="cm" step="0.5"></div>
    </div>
    <button class="btn btn-primary btn-full mt-12" onclick="saveBodyEntry()">Save Measurement</button>
  </div>`;

  // Recent entries
  const d = getData();
  const recent = [...(d.bodyMetrics||[])].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
  if (recent.length > 0) {
    html += `<h3 style="margin-bottom:10px">Recent Entries</h3>`;
    for (const m of recent) {
      html += `<div class="card-sm flex-between" style="cursor:pointer" onclick="loadBodyEntry('${m.date}')">
        <div>
          <div style="font-weight:600;font-size:14px">${formatDateShort(m.date)} <span style="font-weight:400;color:var(--text-dim);font-size:11px">· tap to edit</span></div>
          <div style="font-size:12px;color:var(--text-muted)">
            ${m.weight?m.weight+' kg':''}${m.bfp?' · '+m.bfp+'% BF':''}${m.smm?' · SMM '+m.smm+' kg':''}
          </div>
          ${(m.leftArmLean||m.rightArmLean) ? `<div style="font-size:12px;margin-top:2px"><span style="color:var(--left-col)">L ${m.leftArmLean||'—'}</span> · <span style="color:var(--right-col)">R ${m.rightArmLean||'—'}</span> kg lean</div>` : ''}
          ${m.shoulderWidth ? `<div style="font-size:12px;margin-top:2px;color:var(--text-muted)">Shoulders ${m.shoulderWidth} cm</div>` : ''}
        </div>
        <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();deleteBodyEntry('${m.date}')">✕</button>
      </div>`;
    }
  }
  return html;
}

function renderBodyChartsTab() {
  const d = getData();
  const metrics = [...(d.bodyMetrics||[])].sort((a,b)=>a.date.localeCompare(b.date));
  let html = '';

  if (metrics.length < 2) {
    return `<div class="card" style="text-align:center;padding:40px 20px;color:var(--text-muted)">Log at least 2 entries to see charts.</div>`;
  }

  // Arm gap chart (most important)
  const armData = metrics.filter(m => m.leftArmLean && m.rightArmLean);
  if (armData.length >= 2) {
    const leftSeries = armData.map(m => ({x: m.date, y: parseFloat(m.leftArmLean)}));
    const rightSeries = armData.map(m => ({x: m.date, y: parseFloat(m.rightArmLean)}));
    html += `<div class="chart-wrap">
      <div class="chart-title">
        Arm Lean Mass (kg)
        <div class="chart-legend">
          <span><span class="legend-dot" style="background:var(--left-col)"></span>Left</span>
          <span><span class="legend-dot" style="background:var(--right-col)"></span>Right</span>
        </div>
      </div>
      ${svgLineChart([{data:leftSeries,color:'var(--left-col)',label:'Left'},{data:rightSeries,color:'var(--right-col)',label:'Right'}])}
    </div>`;
  }

  // Bodyweight chart
  const bwData = metrics.filter(m => m.weight);
  if (bwData.length >= 2) {
    html += `<div class="chart-wrap">
      <div class="chart-title">Bodyweight (kg)</div>
      ${svgLineChart([{data:bwData.map(m=>({x:m.date,y:parseFloat(m.weight)})),color:'var(--primary)',label:'Weight'}])}
    </div>`;
  }

  // SMM chart
  const smmData = metrics.filter(m => m.smm);
  if (smmData.length >= 2) {
    html += `<div class="chart-wrap">
      <div class="chart-title">Skeletal Muscle Mass (kg)</div>
      ${svgLineChart([{data:smmData.map(m=>({x:m.date,y:parseFloat(m.smm)})),color:'var(--success)',label:'SMM'}])}
    </div>`;
  }

  // Body fat chart
  const bfData = metrics.filter(m => m.bfp);
  if (bfData.length >= 2) {
    html += `<div class="chart-wrap">
      <div class="chart-title">Body Fat %</div>
      ${svgLineChart([{data:bfData.map(m=>({x:m.date,y:parseFloat(m.bfp)})),color:'var(--warning)',label:'BF%'}])}
    </div>`;
  }

  // Arm circumference
  const acData = metrics.filter(m => m.leftArmCirc && m.rightArmCirc);
  if (acData.length >= 2) {
    html += `<div class="chart-wrap">
      <div class="chart-title">Arm Circumference (cm)
        <div class="chart-legend">
          <span><span class="legend-dot" style="background:var(--left-col)"></span>Left</span>
          <span><span class="legend-dot" style="background:var(--right-col)"></span>Right</span>
        </div>
      </div>
      ${svgLineChart([
        {data:acData.map(m=>({x:m.date,y:parseFloat(m.leftArmCirc)})),color:'var(--left-col)',label:'L'},
        {data:acData.map(m=>({x:m.date,y:parseFloat(m.rightArmCirc)})),color:'var(--right-col)',label:'R'}
      ])}
    </div>`;
  }

  // Shoulder width
  const swData = metrics.filter(m => m.shoulderWidth);
  if (swData.length >= 2) {
    html += `<div class="chart-wrap">
      <div class="chart-title">Shoulder Width (cm)</div>
      ${svgLineChart([{data:swData.map(m=>({x:m.date,y:parseFloat(m.shoulderWidth)})),color:'var(--primary)',label:'Shoulder'}])}
    </div>`;
  }

  return html;
}

function saveBodyEntry() {
  const d = getData();
  const date = document.getElementById('bm-date').value;
  if (!date) return;

  const entry = {
    date,
    weight:      parseFloatOrEmpty('bm-weight'),
    bfp:         parseFloatOrEmpty('bm-bfp'),
    smm:         parseFloatOrEmpty('bm-smm'),
    leftArmLean: parseFloatOrEmpty('bm-lalean'),
    rightArmLean:parseFloatOrEmpty('bm-ralean'),
    leftArmCirc: parseFloatOrEmpty('bm-lacirc'),
    rightArmCirc:parseFloatOrEmpty('bm-racirc'),
    shoulderWidth:parseFloatOrEmpty('bm-shoulder'),
    chest:       parseFloatOrEmpty('bm-chest'),
    waist:       parseFloatOrEmpty('bm-waist'),
    thighL:      parseFloatOrEmpty('bm-thighl'),
    thighR:      parseFloatOrEmpty('bm-thighr')
  };

  const idx = d.bodyMetrics.findIndex(m => m.date === date);
  if (idx >= 0) d.bodyMetrics[idx] = {...d.bodyMetrics[idx], ...entry};
  else d.bodyMetrics.push(entry);
  saveData(d);
  showToast('Measurement saved ✓');
  renderApp();
}

function deleteBodyEntry(date) {
  if (!confirm(`Delete entry for ${date}?`)) return;
  const d = getData();
  d.bodyMetrics = d.bodyMetrics.filter(m => m.date !== date);
  saveData(d);
  renderApp();
}

function loadBodyEntry(date) {
  const d = getData();
  const m = d.bodyMetrics.find(x => x.date === date);
  if (!m) return;
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = (val === undefined || val === null) ? '' : val;
  };
  setVal('bm-date',     m.date);
  setVal('bm-weight',   m.weight);
  setVal('bm-bfp',      m.bfp);
  setVal('bm-smm',      m.smm);
  setVal('bm-lalean',   m.leftArmLean);
  setVal('bm-ralean',   m.rightArmLean);
  setVal('bm-lacirc',   m.leftArmCirc);
  setVal('bm-racirc',   m.rightArmCirc);
  setVal('bm-shoulder', m.shoulderWidth);
  setVal('bm-chest',    m.chest);
  setVal('bm-waist',    m.waist);
  setVal('bm-thighl',   m.thighL);
  setVal('bm-thighr',   m.thighR);
  // Scroll the form into view so the user can see the prefilled fields
  const dateField = document.getElementById('bm-date');
  if (dateField && dateField.scrollIntoView) {
    dateField.scrollIntoView({behavior:'smooth', block:'start'});
  }
  showToast(`Loaded ${formatDateShort(m.date)} — edit & save to update`);
}

function parseFloatOrEmpty(id) {
  const el = document.getElementById(id);
  if (!el) return '';
  const v = parseFloat(el.value);
  return isNaN(v) ? '' : v;
}

// ──────────────────────────────────────────────────────────
// 9. PROGRESS VIEW
// ──────────────────────────────────────────────────────────
const PROGRESS_TABS = [
  {id:'squat',    label:'Squat',    exIds:['goblet_squat','back_squat']},
  {id:'bench',    label:'Bench',    exIds:['flat_db_bench']},
  {id:'press',    label:'Press',    exIds:['landmine_press','seated_db_ohp','halfkneel_db_press','db_floor_press']},
  {id:'row',      label:'Row',      exIds:['single_arm_row','barbell_row','chest_sup_row','inverted_row']},
  {id:'rdl',      label:'RDL',      exIds:['db_rdl','barbell_rdl']},
  {id:'pullup',   label:'Pull-Up',  exIds:['band_pullup','pullup','chinup','weighted_pullup']},
  {id:'lunge',    label:'Lunge',    exIds:['reverse_lunge','bulgarian_split_squat','walking_lunge']},
  {id:'body',     label:'Body',     exIds:[]}, // body metrics charts
];

function renderProgress(el) {
  let html = `<div class="page"><h2 style="margin-bottom:14px">Progress</h2>`;

  // Tabs
  html += `<div class="progress-tabs">`;
  for (const t of PROGRESS_TABS) {
    html += `<button class="progress-tab ${state.progressTab===t.id?'active':''}" onclick="state.progressTab='${t.id}';renderApp()">${t.label}</button>`;
  }
  html += `</div>`;

  if (state.progressTab === 'body') {
    // Reuse body charts
    html += renderBodyChartsTab();
    html += `</div>`;
    el.innerHTML = html;
    return;
  }

  const tab = PROGRESS_TABS.find(t => t.id === state.progressTab);
  if (!tab) { html += `</div>`; el.innerHTML = html; return; }

  const d = getData();
  const logs = d.logs || {};

  for (const exId of tab.exIds) {
    const isUni = isExerciseUnilateral(exId);
    // Gather all logged sets for this exercise
    const points = []; // {date, leftMax, rightMax, max}

    for (const [ds, log] of Object.entries(logs)) {
      const exLog = log.exercises && log.exercises[exId];
      if (!exLog || !exLog.sets || exLog.sets.length === 0) continue;
      const completedSets = exLog.sets.filter(s => s.done || s.leftDone || s.rightDone);
      if (completedSets.length === 0) continue;

      if (isUni) {
        const leftMaxW = Math.max(...completedSets.map(s => parseFloat(s.leftWeight)||0));
        const rightMaxW = Math.max(...completedSets.map(s => parseFloat(s.rightWeight)||0));
        if (leftMaxW > 0 || rightMaxW > 0) points.push({date: ds, left: leftMaxW, right: rightMaxW});
      } else {
        const maxW = Math.max(...completedSets.map(s => parseFloat(s.weight)||0));
        if (maxW > 0) points.push({date: ds, val: maxW});
      }
    }

    points.sort((a,b) => a.date.localeCompare(b.date));

    // Find exercise name
    let exName = exId.replace(/_/g,' ');
    for (const phase of PHASES) {
      for (const dayDef of Object.values(phase.days)) {
        const all = [...(dayDef.exercises||[]), ...(dayDef.finishers||[])];
        const found = all.find(e => e.id === exId);
        if (found) { exName = found.name; break; }
      }
    }

    html += `<div class="chart-wrap">
      <div class="chart-title">${escHtml(exName)} — max weight per session (kg)
        ${isUni ? `<div class="chart-legend">
          <span><span class="legend-dot" style="background:var(--left-col)"></span>L</span>
          <span><span class="legend-dot" style="background:var(--right-col)"></span>R</span>
        </div>` : ''}
      </div>`;
    if (points.length < 2) {
      html += `<div class="chart-empty">Not enough data yet — keep logging!</div>`;
    } else if (isUni) {
      html += svgLineChart([
        {data: points.map(p=>({x:p.date,y:p.left})),  color:'var(--left-col)',  label:'Left'},
        {data: points.map(p=>({x:p.date,y:p.right})), color:'var(--right-col)', label:'Right'}
      ]);
    } else {
      html += svgLineChart([{data: points.map(p=>({x:p.date,y:p.val})), color:'var(--primary)', label:exName}]);
    }
    html += `</div>`;
  }

  if (tab.exIds.length === 0) {
    html += `<div class="card" style="text-align:center;padding:30px;color:var(--text-muted)">No chart data for this category.</div>`;
  }

  html += `</div>`;
  el.innerHTML = html;
}

function isExerciseUnilateral(exId) {
  for (const phase of PHASES) {
    for (const dayDef of Object.values(phase.days)) {
      const all = [...(dayDef.exercises||[]), ...(dayDef.finishers||[])];
      const found = all.find(e => e.id === exId);
      if (found) return !!found.unilateral && found.uniType !== 'body';
    }
  }
  return false;
}

// ──────────────────────────────────────────────────────────
// 10. SETTINGS VIEW
// ──────────────────────────────────────────────────────────
function renderSettings(el) {
  const d = getData();
  const { profile, settings } = d;

  let html = `<div class="page"><h1 style="margin-bottom:20px">Settings</h1>`;

  // Profile
  html += `<div class="settings-section">
    <h2>Profile</h2>
    <div class="card">
      <div class="form-row">
        <label>Name</label>
        <input type="text" id="s-name" value="${escHtml(profile.name||'')}" placeholder="Your name">
      </div>
      <div class="form-row-inline">
        <div class="form-row"><label>Age</label><input type="number" id="s-age" value="${profile.age||46}" min="10" max="100"></div>
        <div class="form-row"><label>Height (cm)</label><input type="number" id="s-height" value="${profile.heightCm||178}" min="100" max="250"></div>
      </div>
      <button class="btn btn-secondary btn-sm mt-8" onclick="saveProfile()">Save Profile</button>
    </div>
  </div>`;

  // Program
  html += `<div class="settings-section">
    <h2>Program</h2>
    <div class="card">
      <div class="form-row">
        <label>Program Start Date (first Monday)</label>
        <input type="date" id="s-startdate" value="${settings.startDate||''}">
      </div>
      <div class="toggle-row">
        <div>
          <div class="toggle-label">Auto-Deload Every 4th Week</div>
          <div class="toggle-sub">Reduces sets by ~⅓ on Wk 4, 8, 12, 16</div>
        </div>
        <label class="switch">
          <input type="checkbox" id="s-autodeload" ${settings.autoDeload?'checked':''} onchange="saveSettings()">
          <span class="slider"></span>
        </label>
      </div>
      <button class="btn btn-secondary btn-sm mt-8" onclick="saveSettings()">Save Program Settings</button>
    </div>
  </div>`;

  // Injury notes
  html += `<div class="settings-section">
    <h2>Left Shoulder Protocol</h2>
    <div class="card" style="font-size:13px;line-height:1.65;color:var(--text-muted)">
      <p style="margin-bottom:8px">🟠 <strong style="color:var(--text)">Progression ladder:</strong> Landmine Press → Half-Kneeling DB Press → Seated DB Overhead Press</p>
      <p style="margin-bottom:8px">Only advance if completely pain-free for 2+ weeks at previous level.</p>
      <p style="margin-bottom:8px">🟣 <strong style="color:var(--text)">Imbalance protocol:</strong> Baseline gap is 9.5% (R arm stronger). Left-arm finishers run every Tue & Wed. Left leads on all unilateral sets.</p>
      <p>If shoulder flares: immediately drop back one step on the press ladder and add an extra set of band external rotation.</p>
    </div>
  </div>`;

  // Data management
  html += `<div class="settings-section">
    <h2>Data</h2>
    <div class="card">
      <button class="btn btn-secondary btn-full mb-8" onclick="exportData()">⬇ Export All Data (JSON)</button>
      <div style="margin-bottom:10px">
        <label class="form-row"><label>Import from JSON file</label></label>
        <input type="file" id="import-file" accept=".json" style="display:none" onchange="importData(event)">
        <button class="btn btn-secondary btn-full" onclick="document.getElementById('import-file').click()">⬆ Import Data</button>
      </div>
      <div class="divider"></div>
      <button class="btn btn-danger btn-full" onclick="confirmReset()">🗑 Reset All Data</button>
    </div>
  </div>`;

  html += `<div style="text-align:center;color:var(--text-dim);font-size:11px;padding:16px 0 8px">TrainRight v1.0 · 16-Week Program</div>`;
  html += `</div>`;
  el.innerHTML = html;
}

function saveProfile() {
  const d = getData();
  d.profile.name      = document.getElementById('s-name').value.trim() || 'Riaan';
  d.profile.age       = parseInt(document.getElementById('s-age').value) || 46;
  d.profile.heightCm  = parseInt(document.getElementById('s-height').value) || 178;
  saveData(d);
  showToast('Profile saved ✓');
}

function saveSettings() {
  const d = getData();
  const sd = document.getElementById('s-startdate').value;
  if (sd) d.settings.startDate = sd;
  d.settings.autoDeload = document.getElementById('s-autodeload').checked;
  saveData(d);
  showToast('Settings saved ✓');
  renderApp();
}

function exportData() {
  const d = getData();
  const blob = new Blob([JSON.stringify(d, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `trainright-backup-${fmtDate(new Date())}.json`;
  a.click();
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = evt => {
    try {
      const imported = JSON.parse(evt.target.result);
      if (!imported.logs && !imported.bodyMetrics) throw new Error('Invalid file');
      if (!confirm('Import will MERGE with existing data. Continue?')) return;
      const d = getData();
      // Merge logs
      if (imported.logs) Object.assign(d.logs, imported.logs);
      // Merge body metrics (by date, imported wins)
      if (imported.bodyMetrics) {
        const map = {};
        for (const m of d.bodyMetrics) map[m.date] = m;
        for (const m of imported.bodyMetrics) map[m.date] = m;
        d.bodyMetrics = Object.values(map).sort((a,b)=>a.date.localeCompare(b.date));
      }
      if (imported.profile) d.profile = {...d.profile, ...imported.profile};
      if (imported.settings) d.settings = {...d.settings, ...imported.settings};
      saveData(d);
      showToast('Data imported ✓');
      renderApp();
    } catch(err) {
      alert('Import failed: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function confirmReset() {
  const answer = prompt('Type DELETE to confirm resetting ALL data (this cannot be undone):');
  if (answer !== 'DELETE') return;
  localStorage.removeItem(STORAGE_KEY);
  showToast('All data cleared');
  renderApp();
}

// ──────────────────────────────────────────────────────────
// 11. REST TIMER
// ──────────────────────────────────────────────────────────
const timer = {
  seconds: 0,
  audioCtx: null,
  total: 90,
  running: false,
  interval: null,
  lastPreset: 90,

  init() {
    this.updateDisplay();
  },

  start(secs) {
    this.stop();
    this.total = secs;
    this.seconds = secs;
    this.lastPreset = secs;
    this.running = true;
    this.interval = setInterval(() => this.tick(), 1000);
    this.updateDisplay();
    // Highlight active preset
    document.querySelectorAll('.timer-preset-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.secs) === secs);
    });
  },

  startFromLastPreset() {
    this.start(this.lastPreset);
  },

  stop() {
    clearInterval(this.interval);
    this.running = false;
    document.querySelectorAll('.timer-preset-btn').forEach(b => b.classList.remove('active'));
  },

  reset() {
    this.stop();
    this.seconds = this.total;
    this.updateDisplay();
  },

  tick() {
    if (this.seconds > 0) {
      this.seconds--;
      this.updateDisplay();
    } else {
      this.stop();
      this.beep();
      this.updateDisplay();
    }
  },

  updateDisplay() {
    const el = document.getElementById('timer-display');
    if (!el) return;
    const m = Math.floor(this.seconds / 60);
    const s = this.seconds % 60;
    el.textContent = `${m}:${String(s).padStart(2,'0')}`;
    el.className = 'timer-display';
    if (this.running && this.seconds > 0) el.classList.add('running');
    else if (this.seconds === 0 && this.total > 0) el.classList.add('done');
  },

  beep() {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = this.audioCtx;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
    } catch(e) {}
  }
};

function renderTimerWidget() {
  const widget = document.getElementById('timer-widget');
  widget.innerHTML = `
    <div class="timer-inner">
      <span id="timer-display" class="timer-display">1:30</span>
      <div class="timer-presets">
        <button class="timer-preset-btn" data-secs="60" onclick="timer.start(60)">60s</button>
        <button class="timer-preset-btn" data-secs="90" onclick="timer.start(90)">90s</button>
        <button class="timer-preset-btn" data-secs="120" onclick="timer.start(120)">2m</button>
      </div>
      <button class="timer-stop-btn" onclick="timer.reset()" title="Reset">↺</button>
      <button class="timer-toggle-btn" onclick="toggleTimerWidget()">Hide</button>
    </div>`;
  timer.init();
}

let timerCollapsed = false;
function toggleTimerWidget() {
  timerCollapsed = !timerCollapsed;
  const w = document.getElementById('timer-widget');
  if (timerCollapsed) {
    w.innerHTML = `<div class="timer-inner" style="justify-content:center">
      <span id="timer-display" class="timer-display">${formatTimerSecs(timer.seconds)}</span>
      <button class="timer-toggle-btn" onclick="toggleTimerWidget()">Show presets</button>
    </div>`;
  } else {
    renderTimerWidget();
  }
}

function formatTimerSecs(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2,'0')}`;
}

// ──────────────────────────────────────────────────────────
// 12. SVG LINE CHARTS
// ──────────────────────────────────────────────────────────
function svgLineChart(datasets) {
  const W = 340, H = 160;
  const pad = { top: 12, right: 16, bottom: 36, left: 44 };
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;

  // Flatten all points
  const allDates = datasets.flatMap(d => d.data.map(p => p.x));
  const allY     = datasets.flatMap(d => d.data.map(p => p.y));
  if (allDates.length < 2) return `<div class="chart-empty">Not enough data yet.</div>`;

  const sortedDates = [...new Set(allDates)].sort();
  const minX = sortedDates[0];
  const maxX = sortedDates[sortedDates.length - 1];
  const minTs = new Date(minX).getTime();
  const maxTs = new Date(maxX).getTime();
  const tsRange = maxTs - minTs || 1;

  const rawMin = Math.min(...allY);
  const rawMax = Math.max(...allY);
  const yRange = rawMax - rawMin || 1;
  const yPad   = yRange * 0.1;
  const yMin   = rawMin - yPad;
  const yMax   = rawMax + yPad;

  const sx = ts  => ((ts  - minTs) / tsRange) * cW;
  const sy = val => cH - ((val - yMin) / (yMax - yMin)) * cH;

  // Y-axis grid & labels
  const ySteps = 4;
  let gridHtml = '', labHtml = '';
  for (let i = 0; i <= ySteps; i++) {
    const val = yMin + (yMax - yMin) * (i / ySteps);
    const y   = pad.top + cH - ((val - yMin) / (yMax - yMin)) * cH;
    gridHtml += `<line x1="${pad.left}" y1="${y.toFixed(1)}" x2="${pad.left+cW}" y2="${y.toFixed(1)}" stroke="#333348" stroke-width="1"/>`;
    labHtml  += `<text x="${pad.left-4}" y="${y.toFixed(1)}" text-anchor="end" dominant-baseline="middle" font-size="9" fill="#666680">${val.toFixed(1)}</text>`;
  }

  // X-axis labels (first and last)
  const xLabHtml = `
    <text x="${pad.left}" y="${H-4}" text-anchor="start" font-size="9" fill="#666680">${formatDateShort(sortedDates[0])}</text>
    <text x="${pad.left+cW}" y="${H-4}" text-anchor="end" font-size="9" fill="#666680">${formatDateShort(sortedDates[sortedDates.length-1])}</text>`;

  // Axes
  const axesHtml = `
    <line x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${pad.top+cH}" stroke="#444" stroke-width="1"/>
    <line x1="${pad.left}" y1="${pad.top+cH}" x2="${pad.left+cW}" y2="${pad.top+cH}" stroke="#444" stroke-width="1"/>`;

  // Lines + dots
  let seriesHtml = '';
  for (const ds of datasets) {
    if (!ds.data || ds.data.length < 2) continue;
    const pts = ds.data
      .filter(p => p.y != null && p.y !== '')
      .map(p => {
        const ts = new Date(p.x).getTime();
        return { px: pad.left + sx(ts), py: pad.top + sy(p.y), val: p.y, date: p.x };
      });
    if (pts.length < 2) continue;
    const poly = pts.map(p => `${p.px.toFixed(1)},${p.py.toFixed(1)}`).join(' ');
    seriesHtml += `<polyline fill="none" stroke="${ds.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" points="${poly}"/>`;
    for (const p of pts) {
      seriesHtml += `<circle cx="${p.px.toFixed(1)}" cy="${p.py.toFixed(1)}" r="3.5" fill="${ds.color}" opacity="0.9">
        <title>${ds.label}: ${p.val} on ${p.date}</title>
      </circle>`;
    }
  }

  return `<svg class="chart" viewBox="0 0 ${W} ${H}" style="width:100%;display:block">
    ${gridHtml}${axesHtml}${labHtml}${xLabHtml}${seriesHtml}
  </svg>`;
}

// ──────────────────────────────────────────────────────────
// 13. MISC HELPERS
// ──────────────────────────────────────────────────────────
function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

let toastTimeout = null;
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = 'position:fixed;bottom:calc(var(--nav-h) + 70px);left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:10px 20px;border-radius:20px;font-size:13px;font-weight:600;z-index:300;transition:opacity 0.3s;max-width:90%;text-align:center;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => { t.style.opacity = '0'; }, 2200);
}

// ──────────────────────────────────────────────────────────
// 14. INITIALIZATION
// ──────────────────────────────────────────────────────────
function buildNav() {
  const nav = document.getElementById('bottom-nav');
  const items = [
    {view:'home',    icon:'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10',                label:'Home'},
    {view:'workout', icon:'M12 2C9 2 7 4 7 7s2 5 5 5 5-2 5-5-2-5-5-5zM3 20c0-4 4-7 9-7s9 3 9 7',       label:'Workout'},
    {view:'history', icon:'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M12 7v5l3 2',                       label:'History'},
    {view:'progress',icon:'M22 12h-4l-3 9L9 3l-3 9H2',                                                    label:'Progress'},
    {view:'body',    icon:'M12 2a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5m0 12c5.33 0 8 2.67 8 4v2H4v-2c0-1.33 2.67-4 8-4', label:'Body'},
    {view:'settings',icon:'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z', label:'Settings'},
  ];
  nav.innerHTML = items.map(it => `
    <button class="nav-btn" data-view="${it.view}" onclick="navigate('${it.view}')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="${it.icon}"/>
      </svg>
      <span>${it.label}</span>
    </button>`).join('');
}

function init() {
  initData();
  buildNav();
  renderTimerWidget();

  // Handle hash navigation
  const hash = location.hash.replace('#','');
  if (['home','workout','history','progress','body','settings'].includes(hash)) {
    state.view = hash;
  }

  renderApp();

  window.addEventListener('hashchange', () => {
    const h = location.hash.replace('#','');
    if (['home','workout','history','progress','body','settings'].includes(h)) {
      state.view = h;
      renderApp();
    }
  });

  // Browser Back/Forward between tabs.
  window.addEventListener('popstate', e => {
    const v = (e.state && e.state.view) || location.hash.replace('#','') || 'home';
    if (['home','workout','history','progress','body','settings'].includes(v)) {
      state.view = v;
      state.historyDetail = null;
      renderApp();
    }
  });

  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(err => {
        console.log('SW registration failed (expected on file://):', err);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', init);

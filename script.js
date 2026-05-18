/* ============================================================
   FLOWDESK — Premium Productivity Dashboard
   script.js
   ============================================================
   Sections:
   1.  App State & Constants
   2.  Utility Helpers
   3.  GSAP Animations Engine
   4.  Clock & Date
   5.  Navigation System
   6.  Theme Switcher
   7.  Dashboard Widgets
   8.  Weather
   9.  Task Manager
   10. Daily Planner
   11. Pomodoro Timer
   12. Motivation / Quotes
   ============================================================ */


/* ============================================================
   1. APP STATE & CONSTANTS
   ============================================================ */

const STATE = {
  currentSection: 'dashboard',
  tasks: [],
  plannerData: {},
  pomodoro: {
    mode: 'work',            // 'work' | 'short' | 'long'
    timeLeft: 25 * 60,       // seconds
    totalTime: 25 * 60,
    running: false,
    interval: null,
    sessionsCompleted: 0,
    focusMinutes: 0,
    history: []
  },
  quotes: {
    current: null,
    saved: [],
    activeCategory: 'all'
  },
  theme: 'midnight'
};

const DURATIONS = {
  work: 25 * 60,
  short: 5 * 60,
  long: 15 * 60
};

const MODE_LABELS = {
  work: 'Focus Session',
  short: 'Short Break',
  long: 'Long Break'
};

// A curated local quote bank (used as fallback and for categories)
const QUOTE_BANK = {
  life: [
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "Get busy living or get busy dying.", author: "Stephen King" },
    { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
    { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" }
  ],
  success: [
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" }
  ],
  mindset: [
    { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
    { text: "Your attitude, not your aptitude, will determine your altitude.", author: "Zig Ziglar" },
    { text: "The mind is everything. What you think you become.", author: "Buddha" },
    { text: "It is not in the stars to hold our destiny but in ourselves.", author: "William Shakespeare" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
  ],
  all: []
};
// Merge all into 'all'
QUOTE_BANK.all = [...QUOTE_BANK.life, ...QUOTE_BANK.success, ...QUOTE_BANK.mindset];


/* ============================================================
   2. UTILITY HELPERS
   ============================================================ */

/**
 * Save data to localStorage
 * @param {string} key
 * @param {any} data
 */
function lsSave(key, data) {
  try {
    localStorage.setItem(`flowdesk_${key}`, JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage save failed:', e);
  }
}

/**
 * Load data from localStorage
 * @param {string} key
 * @param {any} fallback
 * @returns {any}
 */
function lsLoad(key, fallback = null) {
  try {
    const raw = localStorage.getItem(`flowdesk_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Generate a unique ID
 * @returns {string}
 */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/**
 * Get greeting based on time of day
 * @returns {{ part: string, headline: string, emoji: string }}
 */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { part: 'morning', headline: 'Start strong today.', emoji: '☀️' };
  if (h < 17) return { part: 'afternoon', headline: 'Keep the momentum going.', emoji: '⚡' };
  if (h < 20) return { part: 'evening', headline: 'Wind down and reflect.', emoji: '🌇' };
  return { part: 'night', headline: 'Rest well. Tomorrow awaits.', emoji: '🌙' };
}

/**
 * Format seconds into MM:SS
 * @param {number} seconds
 * @returns {string}
 */
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

/**
 * Format date nicely
 * @returns {string}
 */
function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });
}

/**
 * Debounce a function
 * @param {Function} fn
 * @param {number} delay
 */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}


/* ============================================================
   3. GSAP ANIMATIONS ENGINE
   ============================================================ */

/**
 * Animate section entry with staggered reveal
 * @param {string} sectionId
 */
function animateSectionIn(sectionId) {
  const section = document.getElementById(`section-${sectionId}`);
  if (!section) return;

  const items = section.querySelectorAll('.reveal-item');

  // Reset
  gsap.set(section, { opacity: 0, y: 16 });
  gsap.set(items, { opacity: 0, y: 24 });

  // Animate section wrapper
  gsap.to(section, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: 'power3.out'
  });

  // Stagger children
  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 0.45,
    stagger: 0.07,
    ease: 'power3.out',
    delay: 0.08
  });
}

/**
 * Animate a section out
 * @param {HTMLElement} section
 * @returns {Promise}
 */
function animateSectionOut(section) {
  return new Promise(resolve => {
    gsap.to(section, {
      opacity: 0,
      y: -12,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: resolve
    });
  });
}

/**
 * Card hover tilt effect
 */
function initCardHoverEffects() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -3, duration: 0.25, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.25, ease: 'power2.out' });
    });
  });
}

/**
 * Animate a new task item appearing
 * @param {HTMLElement} el
 */
function animateTaskIn(el) {
  gsap.from(el, {
    opacity: 0,
    x: -20,
    duration: 0.35,
    ease: 'power3.out'
  });
}

/**
 * Animate a task item being removed
 * @param {HTMLElement} el
 * @param {Function} onComplete
 */
function animateTaskOut(el, onComplete) {
  gsap.to(el, {
    opacity: 0,
    x: 30,
    height: 0,
    marginBottom: 0,
    padding: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete
  });
}

/**
 * Animate a quote change
 * @param {Function} updateFn - callback that updates the DOM
 */
function animateQuoteChange(updateFn) {
  const card = document.getElementById('quoteHeroCard');
  gsap.to(card, {
    opacity: 0,
    scale: 0.97,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      updateFn();
      gsap.to(card, {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'back.out(1.4)'
      });
    }
  });
}

/**
 * Animate the pomodoro ring progress
 * @param {number} progress - 0 to 1
 */
function updateRing(progress) {
  const circumference = 628.3;
  const offset = circumference * (1 - progress);
  const ring = document.getElementById('ringProgress');
  if (ring) ring.style.strokeDashoffset = offset;
}

/**
 * Pulse animation for timer when done
 */
function pulseTimerDone() {
  const display = document.querySelector('.pomo-timer-display');
  gsap.fromTo(display,
    { scale: 0.95 },
    {
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1.2, 0.5)',
      onComplete: () => gsap.to(display, { scale: 1, duration: 0.1 })
    }
  );
}

/**
 * Initial page load animation
 */
function initPageLoad() {
  // Sidebar elements stagger in
  gsap.from('.sidebar-logo', { opacity: 0, x: -30, duration: 0.6, ease: 'power3.out', delay: 0.1 });
  gsap.from('.nav-item', {
    opacity: 0, x: -20, duration: 0.5,
    stagger: 0.08, ease: 'power3.out', delay: 0.2
  });
  gsap.from('.sidebar-footer', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out', delay: 0.6 });

  // Main content
  gsap.from('.main-content', { opacity: 0, x: 20, duration: 0.5, ease: 'power3.out', delay: 0.15 });
}


/* ============================================================
   4. CLOCK & DATE
   ============================================================ */

/**
 * Update the live clock
 */
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const timeEl = document.getElementById('clockTime');
  const ampmEl = document.getElementById('clockAmpm');
  if (timeEl) timeEl.textContent = `${hours}:${minutes}`;
  if (ampmEl) ampmEl.textContent = ampm;
}

/**
 * Set static date display
 */
function setDateDisplay() {
  const el = document.getElementById('dateDisplay');
  if (el) el.textContent = formatDate();

  const plannerEl = document.getElementById('plannerDateLabel');
  if (plannerEl) plannerEl.textContent = `Today — ${formatDate()}`;
}

/**
 * Set greeting section
 */
function setGreeting() {
  const { part, headline, emoji } = getGreeting();
  const partEl = document.getElementById('greetingPart');
  const headlineEl = document.getElementById('greetingHeadline');
  const emojiEl = document.getElementById('greetingEmoji');
  if (partEl) partEl.textContent = part;
  if (headlineEl) headlineEl.textContent = headline;
  if (emojiEl) emojiEl.textContent = emoji;
}


/* ============================================================
   5. NAVIGATION SYSTEM
   ============================================================ */

/**
 * Navigate to a section
 * @param {string} sectionName
 */
async function navTo(sectionName) {
  if (sectionName === STATE.currentSection) return;

  // Hide old section
  const oldSection = document.getElementById(`section-${STATE.currentSection}`);
  if (oldSection) {
    await animateSectionOut(oldSection);
    oldSection.classList.remove('active');
  }

  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.section === sectionName);
  });

  // Show new section
  const newSection = document.getElementById(`section-${sectionName}`);
  if (newSection) {
    newSection.classList.add('active');
    STATE.currentSection = sectionName;
    animateSectionIn(sectionName);

    // Section-specific refresh
    if (sectionName === 'dashboard') refreshDashboard();
    if (sectionName === 'tasks') renderTasks();
    if (sectionName === 'motivation') loadQuoteSection();
  }

  // Close mobile sidebar
  closeMobileSidebar();
}

/**
 * Init navigation click handlers
 */
function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => navTo(item.dataset.section));
  });
}

/**
 * Mobile sidebar toggle
 */
function initMobileSidebar() {
  const btn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  btn.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('mobile-open');
    btn.classList.toggle('open', isOpen);
    overlay.classList.toggle('visible', isOpen);
  });

  overlay.addEventListener('click', closeMobileSidebar);
}

function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('mobileMenuBtn').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('visible');
}


/* ============================================================
   6. THEME SWITCHER
   ============================================================ */

/**
 * Apply a theme
 * @param {string} theme
 */
function applyTheme(theme) {
  const body = document.body;

  // Animate transition
  gsap.to(body, {
    opacity: 0,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      body.className = `theme-${theme}`;
      body.dataset.theme = theme;
      STATE.theme = theme;
      lsSave('theme', theme);

      // Update swatch active states
      document.querySelectorAll('.swatch').forEach(s => {
        s.classList.toggle('active', s.dataset.theme === theme);
      });

      gsap.to(body, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    }
  });
}

/**
 * Init theme swatch click handlers
 */
function initThemeSwitcher() {
  document.querySelectorAll('.swatch').forEach(swatch => {
    swatch.addEventListener('click', () => applyTheme(swatch.dataset.theme));
  });

  // Load saved theme
  const saved = lsLoad('theme', 'midnight');
  if (saved !== 'midnight') applyTheme(saved);
}


/* ============================================================
   7. DASHBOARD WIDGETS
   ============================================================ */

/**
 * Refresh dashboard stats from tasks
 */
function refreshDashboard() {
  const tasks = STATE.tasks;
  const pending = tasks.filter(t => !t.completed).length;
  const done = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  // Stats
  const pendingEl = document.getElementById('statPending');
  const doneEl = document.getElementById('statDone');
  const pomoEl = document.getElementById('statPomodoros');
  if (pendingEl) {
    gsap.to({ val: parseInt(pendingEl.textContent) || 0 }, {
      val: pending, duration: 0.8, ease: 'power2.out',
      onUpdate: function() { pendingEl.textContent = Math.round(this.targets()[0].val); }
    });
  }
  if (doneEl) {
    gsap.to({ val: parseInt(doneEl.textContent) || 0 }, {
      val: done, duration: 0.8, ease: 'power2.out',
      onUpdate: function() { doneEl.textContent = Math.round(this.targets()[0].val); }
    });
  }
  if (pomoEl) pomoEl.textContent = STATE.pomodoro.sessionsCompleted;

  // Progress bar
  const bar = document.getElementById('progressBar');
  const label = document.getElementById('progressLabel');
  if (bar) gsap.to(bar, { width: `${pct}%`, duration: 0.8, ease: 'power2.out' });
  if (label) label.textContent = `${pct}% complete`;

  // Greeting task count
  const taskCountEl = document.getElementById('greetingTaskCount');
  if (taskCountEl) taskCountEl.textContent = `${pending} task${pending !== 1 ? 's' : ''}`;

  // Task counters in task section
  const badgePending = document.getElementById('taskBadgePending');
  const badgeDone = document.getElementById('taskBadgeDone');
  if (badgePending) badgePending.textContent = `${pending} pending`;
  if (badgeDone) badgeDone.textContent = `${done} done`;

  // Preview list on dashboard
  renderDashPreview();
}

/**
 * Render recent task preview on dashboard
 */
function renderDashPreview() {
  const container = document.getElementById('dashTaskPreview');
  if (!container) return;

  const recent = STATE.tasks.slice(0, 4);

  if (!recent.length) {
    container.innerHTML = '<div class="empty-state">No tasks yet — add some from Tasks!</div>';
    return;
  }

  container.innerHTML = recent.map(t => `
    <div class="task-preview-item ${t.completed ? 'completed' : ''} ${t.important ? 'important' : ''}">
      <span class="preview-dot"></span>
      <span class="preview-title">${escHtml(t.text)}</span>
      ${t.important ? '<span class="preview-badge important">⭐ Important</span>' : ''}
      ${t.completed ? '<span class="preview-badge">Done</span>' : ''}
    </div>
  `).join('');
}

/**
 * Escape HTML to prevent XSS
 * @param {string} str
 * @returns {string}
 */
function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}


/* ============================================================
   8. WEATHER
   ============================================================ */

/**
 * Fetch weather data using Open-Meteo (no API key required)
 */
async function fetchWeather() {
  try {
    // First, get user's approximate location via IP geolocation (free, no key)
    const geoRes = await fetch('https://ipapi.co/json/');
    const geo = await geoRes.json();

    const { latitude: lat, longitude: lon, city } = geo;

    // Fetch weather from Open-Meteo (completely free, no key needed)
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&wind_speed_unit=kmh`;
    const wRes = await fetch(weatherUrl);
    const wData = await wRes.json();

    const c = wData.current;
    const temp = Math.round(c.temperature_2m);
    const humidity = c.relative_humidity_2m;
    const wind = Math.round(c.wind_speed_10m);
    const desc = weatherCodeToDesc(c.weather_code);

    // Update UI
    document.getElementById('weatherTemp').textContent = `${temp}°C`;
    document.getElementById('weatherCity').textContent = city || 'Your Location';
    document.getElementById('weatherDesc').textContent = desc;
    document.getElementById('weatherHumidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('weatherWind').textContent = `Wind: ${wind} km/h`;

    // Animate in
    gsap.from('#weatherWidget .weather-temp', { scale: 0.7, opacity: 0, duration: 0.5, ease: 'back.out(1.5)' });

  } catch (e) {
    // Graceful fallback
    document.getElementById('weatherTemp').textContent = '--°';
    document.getElementById('weatherCity').textContent = 'Unavailable';
    document.getElementById('weatherDesc').textContent = 'Could not load';
    console.warn('Weather fetch failed:', e);
  }
}

/**
 * Convert WMO weather code to description
 * @param {number} code
 * @returns {string}
 */
function weatherCodeToDesc(code) {
  const codes = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Foggy', 48: 'Icy fog',
    51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Heavy drizzle',
    61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    71: 'Light snow', 73: 'Moderate snow', 75: 'Heavy snow',
    80: 'Rain showers', 81: 'Moderate showers', 82: 'Violent showers',
    95: 'Thunderstorm', 96: 'Thunderstorm with hail'
  };
  return codes[code] || 'Unknown conditions';
}


/* ============================================================
   9. TASK MANAGER
   ============================================================ */

/**
 * Load tasks from localStorage
 */
function loadTasks() {
  STATE.tasks = lsLoad('tasks', []);
}

/**
 * Save tasks to localStorage
 */
function saveTasks() {
  lsSave('tasks', STATE.tasks);
}

/**
 * Add a new task
 */
function addTask() {
  const input = document.getElementById('taskInput');
  const important = document.getElementById('taskImportant');
  const text = input.value.trim();

  if (!text) {
    // Shake animation for empty input
    gsap.to(input, { x: -8, duration: 0.08, repeat: 4, yoyo: true, ease: 'power2.inOut' });
    return;
  }

  const task = {
    id: uid(),
    text,
    completed: false,
    important: important.checked,
    createdAt: Date.now()
  };

  STATE.tasks.unshift(task);
  saveTasks();

  // Reset form
  input.value = '';
  important.checked = false;
  document.querySelector('.star-icon').style.color = '';

  renderTasks();
  refreshDashboard();

  // Scroll to first task
  document.getElementById('taskList').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Toggle task completion
 * @param {string} id
 */
function toggleTask(id) {
  const task = STATE.tasks.find(t => t.id === id);
  if (!task) return;
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
  refreshDashboard();
}

/**
 * Delete a task
 * @param {string} id
 */
function deleteTask(id) {
  const el = document.querySelector(`[data-task-id="${id}"]`);
  if (el) {
    animateTaskOut(el, () => {
      STATE.tasks = STATE.tasks.filter(t => t.id !== id);
      saveTasks();
      renderTasks();
      refreshDashboard();
    });
  } else {
    STATE.tasks = STATE.tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
    refreshDashboard();
  }
}

/**
 * Get active filter
 * @returns {string}
 */
function getActiveFilter() {
  const active = document.querySelector('.filter-tab.active');
  return active ? active.dataset.filter : 'all';
}

/**
 * Render task list based on current filter
 */
function renderTasks() {
  const list = document.getElementById('taskList');
  const emptyState = document.getElementById('taskEmptyState');
  const filter = getActiveFilter();

  let filtered = STATE.tasks;
  if (filter === 'pending') filtered = STATE.tasks.filter(t => !t.completed);
  if (filter === 'completed') filtered = STATE.tasks.filter(t => t.completed);
  if (filter === 'important') filtered = STATE.tasks.filter(t => t.important);

  // Clear existing task items (not the empty state)
  list.querySelectorAll('.task-item').forEach(el => el.remove());

  if (filtered.length === 0) {
    if (emptyState) emptyState.style.display = '';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  filtered.forEach((task, i) => {
    const el = document.createElement('div');
    el.className = `task-item ${task.completed ? 'completed' : ''} ${task.important ? 'important' : ''}`;
    el.dataset.taskId = task.id;
    el.innerHTML = `
      <div class="task-check" title="${task.completed ? 'Mark incomplete' : 'Mark complete'}"
           onclick="toggleTask('${task.id}')">
        ${task.completed ? '✓' : ''}
      </div>
      <span class="task-text">${escHtml(task.text)}</span>
      <span class="task-star" title="Important">${task.important ? '★' : '☆'}</span>
      <div class="task-actions">
        <button class="btn-icon danger" onclick="deleteTask('${task.id}')" title="Delete task">✕</button>
      </div>
    `;

    list.appendChild(el);

    // Stagger animation
    gsap.from(el, {
      opacity: 0, x: -16,
      duration: 0.3,
      delay: i * 0.04,
      ease: 'power3.out'
    });
  });

  // Update counters
  refreshDashboard();
}

/**
 * Init task manager event listeners
 */
function initTaskManager() {
  loadTasks();

  // Add on button click
  document.getElementById('addTaskBtn').addEventListener('click', addTask);

  // Add on Enter key
  document.getElementById('taskInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
  });

  // Filter tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTasks();
    });
  });
}


/* ============================================================
   10. DAILY PLANNER
   ============================================================ */

const PLANNER_HOURS = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
];

/**
 * Get today's planner key
 * @returns {string}
 */
function getPlannerKey() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
}

/**
 * Load planner data from localStorage
 */
function loadPlannerData() {
  STATE.plannerData = lsLoad('planner', {});
}

/**
 * Save a single planner slot
 * @param {string} hour
 * @param {string} value
 */
function savePlannerSlot(hour, value) {
  const key = getPlannerKey();
  if (!STATE.plannerData[key]) STATE.plannerData[key] = {};
  STATE.plannerData[key][hour] = value;
  lsSave('planner', STATE.plannerData);
}

/**
 * Get value for a planner slot
 * @param {string} hour
 * @returns {string}
 */
function getPlannerSlot(hour) {
  const key = getPlannerKey();
  return STATE.plannerData[key]?.[hour] || '';
}

/**
 * Get current hour as label
 * @returns {string}
 */
function getCurrentHourLabel() {
  const h = new Date().getHours();
  const suffix = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 || 12;
  return `${displayH}:00 ${suffix}`;
}

/**
 * Build the planner grid
 */
function buildPlanner() {
  const grid = document.getElementById('plannerGrid');
  if (!grid) return;

  loadPlannerData();
  const currentHour = getCurrentHourLabel();
  grid.innerHTML = '';

  PLANNER_HOURS.forEach((hour, i) => {
    const slot = document.createElement('div');
    slot.className = `planner-slot ${hour === currentHour ? 'active-hour' : ''}`;
    slot.style.animationDelay = `${i * 0.03}s`;

    // Save indicator span
    const savedSpan = document.createElement('span');
    savedSpan.className = 'slot-saved-indicator';
    savedSpan.textContent = '✓ Saved';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'slot-input';
    input.placeholder = hour === currentHour ? '← Now — what are you doing?' : 'Add activity...';
    input.value = getPlannerSlot(hour);
    input.maxLength = 100;

    // Debounced save
    const debouncedSave = debounce((val) => {
      savePlannerSlot(hour, val);
      savedSpan.classList.add('show');
      setTimeout(() => savedSpan.classList.remove('show'), 1500);
    }, 600);

    input.addEventListener('input', e => debouncedSave(e.target.value));

    slot.innerHTML = `
      <span class="slot-time">${hour}</span>
      <div class="slot-line"></div>
    `;
    slot.appendChild(input);
    slot.appendChild(savedSpan);
    grid.appendChild(slot);
  });
}

/**
 * Init planner
 */
function initPlanner() {
  buildPlanner();

  document.getElementById('clearPlannerBtn').addEventListener('click', () => {
    if (!confirm('Clear all entries for today?')) return;
    const key = getPlannerKey();
    delete STATE.plannerData[key];
    lsSave('planner', STATE.plannerData);
    buildPlanner();

    // Animation
    gsap.from('.planner-slot', {
      opacity: 0, scale: 0.98,
      duration: 0.3, stagger: 0.03,
      ease: 'power2.out'
    });
  });
}


/* ============================================================
   11. POMODORO TIMER
   ============================================================ */

/**
 * Update the timer display
 */
function updateTimerDisplay() {
  const el = document.getElementById('pomoTime');
  if (el) el.textContent = formatTime(STATE.pomodoro.timeLeft);

  // Update ring
  const progress = STATE.pomodoro.timeLeft / STATE.pomodoro.totalTime;
  updateRing(progress);
}

/**
 * Tick the timer
 */
function tickTimer() {
  STATE.pomodoro.timeLeft--;

  if (STATE.pomodoro.timeLeft <= 0) {
    onTimerComplete();
    return;
  }

  updateTimerDisplay();
}

/**
 * Handle timer completion
 */
function onTimerComplete() {
  clearInterval(STATE.pomodoro.interval);
  STATE.pomodoro.running = false;
  STATE.pomodoro.timeLeft = 0;
  updateTimerDisplay();

  const mode = STATE.pomodoro.mode;

  // Record completion
  if (mode === 'work') {
    STATE.pomodoro.sessionsCompleted++;
    STATE.pomodoro.focusMinutes += Math.round(DURATIONS.work / 60);
    updatePomoDots();
    updatePomoStats();
    addPomoHistoryEntry('work');
    refreshDashboard();
  } else {
    addPomoHistoryEntry(mode);
  }

  // Visual feedback
  pulseTimerDone();
  updateStartBtn();

  // Browser notification (if permitted)
  const msg = mode === 'work'
    ? '🎉 Focus session complete! Time for a break.'
    : '⚡ Break over! Ready to focus?';

  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('FlowDesk', { body: msg, icon: '⚡' });
  } else {
    alert(msg);
  }
}

/**
 * Start/pause the timer
 */
function toggleTimer() {
  if (STATE.pomodoro.running) {
    // Pause
    clearInterval(STATE.pomodoro.interval);
    STATE.pomodoro.running = false;
  } else {
    // Start
    if (STATE.pomodoro.timeLeft === 0) {
      // Reset to current mode duration if timer hit 0
      STATE.pomodoro.timeLeft = DURATIONS[STATE.pomodoro.mode];
      STATE.pomodoro.totalTime = DURATIONS[STATE.pomodoro.mode];
    }
    STATE.pomodoro.interval = setInterval(tickTimer, 1000);
    STATE.pomodoro.running = true;

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  updateStartBtn();
}

/**
 * Reset the timer
 */
function resetTimer() {
  clearInterval(STATE.pomodoro.interval);
  STATE.pomodoro.running = false;
  STATE.pomodoro.timeLeft = DURATIONS[STATE.pomodoro.mode];
  STATE.pomodoro.totalTime = DURATIONS[STATE.pomodoro.mode];
  updateTimerDisplay();
  updateStartBtn();

  // Animate ring reset
  gsap.to('#ringProgress', {
    strokeDashoffset: 0, duration: 0.5, ease: 'power2.out'
  });
}

/**
 * Switch timer mode
 * @param {string} mode
 */
function switchMode(mode) {
  clearInterval(STATE.pomodoro.interval);
  STATE.pomodoro.running = false;
  STATE.pomodoro.mode = mode;
  STATE.pomodoro.timeLeft = DURATIONS[mode];
  STATE.pomodoro.totalTime = DURATIONS[mode];

  // Update tabs
  document.querySelectorAll('.pomo-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.mode === mode);
  });

  // Update label
  const labelEl = document.getElementById('pomoModeLabel');
  if (labelEl) labelEl.textContent = MODE_LABELS[mode];

  // Update ring color
  const ring = document.getElementById('ringProgress');
  if (ring) {
    const colors = { work: 'var(--accent)', short: 'var(--accent-3)', long: 'var(--accent-2)' };
    ring.style.stroke = colors[mode];
  }

  updateTimerDisplay();
  updateStartBtn();

  // Animate mode switch
  gsap.from('.pomo-timer-display', {
    scale: 0.9, opacity: 0.5,
    duration: 0.4, ease: 'back.out(2)'
  });
}

/**
 * Update start button text/icon
 */
function updateStartBtn() {
  const btn = document.getElementById('pomoStartBtn');
  if (!btn) return;
  btn.textContent = STATE.pomodoro.running ? '⏸ Pause' : '▶ Start';
}

/**
 * Update session dots (4-dot cycle)
 */
function updatePomoDots() {
  const container = document.getElementById('pomoSessionDots');
  if (!container) return;

  const cyclePos = STATE.pomodoro.sessionsCompleted % 4;
  container.innerHTML = Array.from({ length: 4 }, (_, i) => `
    <div class="session-dot ${i < cyclePos ? 'filled' : ''}"></div>
  `).join('');

  // Animate new dot
  if (cyclePos > 0) {
    gsap.from(`.session-dot:nth-child(${cyclePos})`, {
      scale: 0, duration: 0.4, ease: 'back.out(2)'
    });
  }
}

/**
 * Update stats display
 */
function updatePomoStats() {
  const sessEl = document.getElementById('pomoStatSessions');
  const focusEl = document.getElementById('pomoStatFocus');
  if (sessEl) sessEl.textContent = STATE.pomodoro.sessionsCompleted;
  if (focusEl) focusEl.textContent = `${STATE.pomodoro.focusMinutes}m`;
}

/**
 * Add an entry to the session history
 * @param {string} type
 */
function addPomoHistoryEntry(type) {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const isWork = type === 'work';

  STATE.pomodoro.history.unshift({
    type,
    time,
    label: isWork ? `Focus session` : `${type === 'short' ? 'Short' : 'Long'} break`
  });

  // Keep last 10
  if (STATE.pomodoro.history.length > 10) STATE.pomodoro.history.pop();

  renderPomoHistory();
}

/**
 * Render session history list
 */
function renderPomoHistory() {
  const container = document.getElementById('pomoHistory');
  if (!container) return;

  if (!STATE.pomodoro.history.length) {
    container.innerHTML = '<span class="empty-state-sm">No sessions yet today</span>';
    return;
  }

  container.innerHTML = STATE.pomodoro.history.map(item => `
    <div class="history-item">
      <div class="history-dot ${item.type !== 'work' ? 'break' : ''}"></div>
      <span>${item.label}</span>
      <span style="margin-left: auto; color: var(--text-muted); font-size: 0.72rem;">${item.time}</span>
    </div>
  `).join('');
}

/**
 * Init pomodoro timer
 */
function initPomodoro() {
  // Mode tabs
  document.querySelectorAll('.pomo-tab').forEach(tab => {
    tab.addEventListener('click', () => switchMode(tab.dataset.mode));
  });

  // Controls
  document.getElementById('pomoStartBtn').addEventListener('click', toggleTimer);
  document.getElementById('pomoReset').addEventListener('click', resetTimer);
  document.getElementById('pomoPrev').addEventListener('click', () => {
    const modes = ['work', 'short', 'long'];
    const idx = modes.indexOf(STATE.pomodoro.mode);
    const prev = modes[(idx - 1 + modes.length) % modes.length];
    switchMode(prev);
  });

  // Init display
  updateTimerDisplay();
  updatePomoDots();
}


/* ============================================================
   12. MOTIVATION / QUOTES
   ============================================================ */

/**
 * Fetch a quote from quotable API or use local bank
 */
async function fetchQuote() {
  // Try real API first
  try {
    const res = await fetch('https://api.quotable.io/random?maxLength=180');
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return { text: data.content, author: data.author };
  } catch {
    // Fallback to local bank
    const cat = STATE.quotes.activeCategory;
    const bank = QUOTE_BANK[cat] || QUOTE_BANK.all;
    return bank[Math.floor(Math.random() * bank.length)];
  }
}

/**
 * Display a new quote
 */
async function loadNewQuote() {
  const quote = await fetchQuote();
  STATE.quotes.current = quote;

  animateQuoteChange(() => {
    document.getElementById('quoteHeroText').textContent = quote.text;
    document.getElementById('quoteHeroAuthor').textContent = `— ${quote.author}`;
    document.getElementById('quoteSaveBtn').textContent = '♡ Save';
    document.getElementById('quoteSaveBtn').classList.remove('saved');

    // Also update dashboard preview
    const previewEl = document.getElementById('quotePreviewText');
    if (previewEl) previewEl.textContent = `"${quote.text.slice(0, 90)}${quote.text.length > 90 ? '...' : ''}"`;
  });
}

/**
 * Save current quote to saved list
 */
function saveCurrentQuote() {
  if (!STATE.quotes.current) return;

  const existing = STATE.quotes.saved.find(q => q.text === STATE.quotes.current.text);
  if (existing) return; // Already saved

  STATE.quotes.saved.unshift(STATE.quotes.current);
  lsSave('savedQuotes', STATE.quotes.saved);

  document.getElementById('quoteSaveBtn').textContent = '♥ Saved!';
  document.getElementById('quoteSaveBtn').classList.add('saved');

  renderSavedQuotes();

  // Bounce animation
  gsap.fromTo('#quoteSaveBtn',
    { scale: 1.2 },
    { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' }
  );
}

/**
 * Delete a saved quote
 * @param {number} index
 */
function deleteSavedQuote(index) {
  STATE.quotes.saved.splice(index, 1);
  lsSave('savedQuotes', STATE.quotes.saved);
  renderSavedQuotes();
}

/**
 * Render saved quotes grid
 */
function renderSavedQuotes() {
  const grid = document.getElementById('savedQuotesGrid');
  if (!grid) return;

  if (!STATE.quotes.saved.length) {
    grid.innerHTML = '<div class="empty-state">Save quotes you love by clicking ♡ Save above.</div>';
    return;
  }

  grid.innerHTML = STATE.quotes.saved.map((q, i) => `
    <div class="saved-quote-card">
      <button class="saved-delete-btn" onclick="deleteSavedQuote(${i})" title="Remove">✕</button>
      <p class="saved-quote-text">"${escHtml(q.text)}"</p>
      <span class="saved-quote-author">— ${escHtml(q.author)}</span>
    </div>
  `).join('');

  // Stagger new cards
  gsap.from('.saved-quote-card', {
    opacity: 0, y: 12,
    duration: 0.35,
    stagger: 0.07,
    ease: 'power3.out'
  });
}

/**
 * Load quotes section
 */
async function loadQuoteSection() {
  STATE.quotes.saved = lsLoad('savedQuotes', []);
  renderSavedQuotes();

  if (!STATE.quotes.current) {
    await loadNewQuote();
  }
}

/**
 * Init motivation section
 */
function initMotivation() {
  // Fetch button
  document.getElementById('fetchQuoteBtn').addEventListener('click', loadNewQuote);

  // Save button
  document.getElementById('quoteSaveBtn').addEventListener('click', saveCurrentQuote);

  // Clear saved
  document.getElementById('clearSavedBtn').addEventListener('click', () => {
    if (!STATE.quotes.saved.length) return;
    if (!confirm('Clear all saved quotes?')) return;
    STATE.quotes.saved = [];
    lsSave('savedQuotes', []);
    renderSavedQuotes();
  });

  // Category buttons
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.quotes.activeCategory = btn.dataset.cat;
      loadNewQuote();
    });
  });
}


/* ============================================================
   INITIAL LOAD — QUOTE PREVIEW ON DASHBOARD
   ============================================================ */

async function loadDashQuotePreview() {
  const el = document.getElementById('quotePreviewText');
  if (!el) return;

  try {
    const quote = await fetchQuote();
    STATE.quotes.current = quote;
    el.textContent = `"${quote.text.slice(0, 100)}${quote.text.length > 100 ? '...' : ''}"`;
    gsap.from(el, { opacity: 0, y: 8, duration: 0.4, ease: 'power2.out' });
  } catch {
    el.textContent = '"Your daily inspiration is on its way..."';
  }
}


/* ============================================================
   APP INIT — BOOTSTRAP EVERYTHING
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* -- Initial animations -- */
  initPageLoad();

  /* -- Clock -- */
  setDateDisplay();
  setGreeting();
  updateClock();
  setInterval(updateClock, 1000);

  /* -- Navigation -- */
  initNavigation();
  initMobileSidebar();

  /* -- Theme -- */
  initThemeSwitcher();

  /* -- Tasks -- */
  initTaskManager();
  renderTasks();

  /* -- Planner -- */
  initPlanner();

  /* -- Pomodoro -- */
  initPomodoro();

  /* -- Motivation -- */
  initMotivation();

  /* -- Weather -- */
  fetchWeather();

  /* -- Dashboard refresh -- */
  refreshDashboard();

  /* -- Load quote preview on dash -- */
  loadDashQuotePreview();

  /* -- Animate initial section -- */
  setTimeout(() => {
    const activeSection = document.getElementById('section-dashboard');
    if (activeSection) {
      activeSection.classList.add('active');
      animateSectionIn('dashboard');
    }
  }, 300);

  /* -- Card hover effects -- */
  setTimeout(initCardHoverEffects, 500);

  /* -- Keyboard shortcut: Ctrl+Enter = add task if in tasks section -- */
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      if (STATE.currentSection === 'tasks') addTask();
    }
  });

});

/* ==========================================================================
   THE ENGLISH ACADEMY & IELTS PREP - INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
  initQuiz();
  initSidebarNav();
  initModuleSelector();
});

/* --------------------------------------------------------------------------
   1. MODULE SELECTOR ON FLOATING GLASS CARD
   -------------------------------------------------------------------------- */
const moduleData = {
  'Listening': {
    title: 'Listening Band 8.0+',
    subtitle: '40 Audio Practice Tests & Native Accent Identification Drills'
  },
  'Reading': {
    title: 'Reading Band 7.5+',
    subtitle: 'Skimming, Scanning & Time-Management Strategies'
  },
  'Writing': {
    title: 'Writing Task 1 & 2',
    subtitle: 'Essay Structure Templates & Band 8.0 Vocabulary'
  },
  'Speaking': {
    title: '1-on-1 Speaking Practice',
    subtitle: 'Live Mock Interviews with Certified Cambridge Trainers'
  }
};

function selectModule(moduleName) {
  const titleDisplay = document.getElementById('moduleTitleDisplay');
  const subtitleDisplay = document.getElementById('moduleSubtitleDisplay');
  const buttons = document.querySelectorAll('.glass-icon-btn');

  if (moduleData[moduleName]) {
    titleDisplay.textContent = moduleData[moduleName].title;
    subtitleDisplay.textContent = moduleData[moduleName].subtitle;
  }

  buttons.forEach(btn => {
    if (btn.getAttribute('title') && btn.getAttribute('title').includes(moduleName)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function initModuleSelector() {
  window.selectModule = selectModule;
}

/* --------------------------------------------------------------------------
   2. SIDEBAR ACTIVE NAV ITEM SWITCHER
   -------------------------------------------------------------------------- */
function initSidebarNav() {
  const navItems = document.querySelectorAll('.sidebar-nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   3. OFFICIAL IELTS BAND CALCULATOR
   -------------------------------------------------------------------------- */
function initCalculator() {
  const rangeListening = document.getElementById('rangeListening');
  const rangeReading = document.getElementById('rangeReading');
  const rangeWriting = document.getElementById('rangeWriting');
  const rangeSpeaking = document.getElementById('rangeSpeaking');

  const valListening = document.getElementById('valListening');
  const valReading = document.getElementById('valReading');
  const valWriting = document.getElementById('valWriting');
  const valSpeaking = document.getElementById('valSpeaking');

  const overallDisplay = document.getElementById('overallScoreDisplay');
  const interpretationDisplay = document.getElementById('bandInterpretation');
  const adviceDisplay = document.getElementById('bandAdvice');

  if (!rangeListening) return;

  function calculateBand() {
    const l = parseFloat(rangeListening.value);
    const r = parseFloat(rangeReading.value);
    const w = parseFloat(rangeWriting.value);
    const s = parseFloat(rangeSpeaking.value);

    valListening.textContent = l.toFixed(1);
    valReading.textContent = r.toFixed(1);
    valWriting.textContent = w.toFixed(1);
    valSpeaking.textContent = s.toFixed(1);

    const avg = (l + r + w + s) / 4;
    const whole = Math.floor(avg);
    const decimal = avg - whole;
    let roundedScore = whole;

    if (decimal < 0.25) {
      roundedScore = whole;
    } else if (decimal >= 0.25 && decimal < 0.75) {
      roundedScore = whole + 0.5;
    } else {
      roundedScore = whole + 1.0;
    }

    overallDisplay.textContent = roundedScore.toFixed(1);

    let title = "Good User";
    let advice = "Eligible for top UK, Canadian, & Australian Master's programs.";

    if (roundedScore >= 8.5) {
      title = "Expert User (Band 8.5 - 9.0)";
      advice = "Fully fluent. Eligible for Ivy League, Oxford, Cambridge, & top Tier-1 Fellowships.";
    } else if (roundedScore >= 8.0) {
      title = "Very Good User (Band 8.0)";
      advice = "Exceeds all university requirements and maximum CLB 10 immigration points.";
    } else if (roundedScore >= 7.5) {
      title = "Strong Academic User (Band 7.5)";
      advice = "Meets requirements for 99% of global universities and competitive scholarship awards.";
    } else if (roundedScore >= 7.0) {
      title = "Good User (Band 7.0)";
      advice = "Standard target for Postgraduate admissions in UK, Canada, USA, & Australia.";
    } else if (roundedScore >= 6.5) {
      title = "Competent User (Band 6.5)";
      advice = "Meets minimum undergraduate requirements. Joining our 2-month batch will boost you to 7.5+!";
    } else {
      title = "Modest User (Band 6.0 & below)";
      advice = "We recommend starting with our Foundation batch before sitting your exam.";
    }

    interpretationDisplay.textContent = title;
    adviceDisplay.textContent = advice;
  }

  [rangeListening, rangeReading, rangeWriting, rangeSpeaking].forEach(input => {
    input.addEventListener('input', calculateBand);
  });

  calculateBand();
}

/* --------------------------------------------------------------------------
   4. DIAGNOSTIC ENGLISH QUIZ
   -------------------------------------------------------------------------- */
const quizQuestions = [
  {
    question: "1. What is your primary goal for learning English or taking IELTS?",
    options: [
      { label: "Study abroad for Bachelor's / Master's degree", points: 3 },
      { label: "Immigration / Work Visa (Canada PR, UK, Aus)", points: 3 },
      { label: "Career advancement & public speaking confidence", points: 2 },
      { label: "Build fundamental grammar & vocabulary foundation", points: 1 }
    ]
  },
  {
    question: "2. How comfortable are you speaking in English without hesitation?",
    options: [
      { label: "I speak fluently with occasional vocabulary pauses", points: 3 },
      { label: "I understand well but struggle with grammar during speaking", points: 2 },
      { label: "I feel nervous and frequently hesitate when searching for words", points: 1 },
      { label: "I rarely practice speaking English in daily life", points: 1 }
    ]
  },
  {
    question: "3. When writing an academic essay or formal report, what is your main challenge?",
    options: [
      { label: "Structuring complex arguments and vocabulary variation", points: 3 },
      { label: "Grammar errors, punctuation, and tense consistency", points: 2 },
      { label: "Running out of ideas and proper essay paragraph structure", points: 1 },
      { label: "Starting essays and basic sentence formation", points: 1 }
    ]
  },
  {
    question: "4. Choose the grammatically correct sentence:",
    options: [
      { label: "If I had known about the workshop, I would have attended.", points: 3 },
      { label: "If I knew about the workshop, I would attend it yesterday.", points: 1 },
      { label: "If I had knew about the workshop, I will attend.", points: 0 },
      { label: "If I know about the workshop, I would have attended.", points: 1 }
    ]
  },
  {
    question: "5. When listening to a fast native English podcast or lecture, how much do you comprehend?",
    options: [
      { label: "85% - 100%: I understand almost everything effortlessly", points: 3 },
      { label: "60% - 80%: I catch the main ideas but miss specific details", points: 2 },
      { label: "Under 50%: I find native accents fast and hard to follow", points: 1 }
    ]
  }
];

let currentQuizStep = 0;
let totalQuizPoints = 0;

function initQuiz() {
  renderQuizStep();
}

function renderQuizStep() {
  const stepText = document.getElementById('quizStepText');
  const questionTitle = document.getElementById('quizQuestionTitle');
  const optionsContainer = document.getElementById('quizOptionsContainer');
  const progressFill = document.getElementById('quizProgressFill');

  if (!stepText) return;

  if (currentQuizStep < quizQuestions.length) {
    const q = quizQuestions[currentQuizStep];
    stepText.textContent = `Question ${currentQuizStep + 1} of ${quizQuestions.length}`;
    questionTitle.textContent = q.question;
    progressFill.style.width = `${((currentQuizStep + 1) / quizQuestions.length) * 100}%`;

    optionsContainer.innerHTML = '';
    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span>${opt.label}</span>
        <i class="fa-solid fa-arrow-right" style="color: var(--red-primary);"></i>
      `;
      btn.onclick = () => selectQuizOption(opt.points);
      optionsContainer.appendChild(btn);
    });
  } else {
    showQuizResults();
  }
}

function selectQuizOption(points) {
  totalQuizPoints += points;
  currentQuizStep++;
  renderQuizStep();
}

function showQuizResults() {
  document.getElementById('quizQuestionBox').style.display = 'none';
  const resultCard = document.getElementById('quizResultCard');
  resultCard.style.display = 'block';

  const badge = document.getElementById('quizResultBadge');
  const courseTitle = document.getElementById('quizRecommendedCourse');
  const desc = document.getElementById('quizResultDescription');

  if (totalQuizPoints >= 12) {
    badge.textContent = "Level: Advanced (CEFR C1)";
    courseTitle.textContent = "IELTS Academic Band 8.0+ Masterclass";
    desc.textContent = "You have strong language fundamentals! You are ready for our high-intensity Band 8.0+ masterclass to polish exam techniques.";
  } else if (totalQuizPoints >= 8) {
    badge.textContent = "Level: Upper-Intermediate (CEFR B2)";
    courseTitle.textContent = "IELTS Academic / General Standard Batch";
    desc.textContent = "You have good comprehension. Our 2.5-month batch will bridge your gap in Writing and Speaking to guarantee Band 7.5+.";
  } else {
    badge.textContent = "Level: Intermediate / Foundation (CEFR B1)";
    courseTitle.textContent = "Grammar & Spoken English Foundation";
    desc.textContent = "We recommend strengthening your core sentence structures and fluency before attempting the IELTS exam for optimal results.";
  }
}

function resetQuiz() {
  currentQuizStep = 0;
  totalQuizPoints = 0;
  document.getElementById('quizQuestionBox').style.display = 'block';
  document.getElementById('quizResultCard').style.display = 'none';
  renderQuizStep();
}

/* --------------------------------------------------------------------------
   5. BOOKING MODAL HANDLERS
   -------------------------------------------------------------------------- */
function openModal(topic = 'Free Mock Test') {
  const modal = document.getElementById('bookingModal');
  const title = document.getElementById('modalHeaderTitle');
  const formContainer = document.getElementById('modalFormContainer');
  const successScreen = document.getElementById('modalSuccessScreen');

  title.textContent = `Book Slot: ${topic}`;
  formContainer.style.display = 'block';
  successScreen.style.display = 'none';

  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('bookingModal');
  modal.classList.remove('active');
}

function handleFormSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById('formName').value;
  
  document.getElementById('modalFormContainer').style.display = 'none';
  const successScreen = document.getElementById('modalSuccessScreen');
  document.getElementById('successStudentName').textContent = nameInput || 'Student';
  successScreen.style.display = 'block';
}

window.openModal = openModal;
window.closeModal = closeModal;
window.handleFormSubmit = handleFormSubmit;
window.resetQuiz = resetQuiz;

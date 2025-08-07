// Flashcard data - 25 clean, thought-provoking cards without political or religious content
const cards = [
  {
    question: "Explain why the sky appears blue during the day.",
    answer: "Because air molecules scatter blue light more than other colors due to Rayleigh scattering.",
    tag: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the Pythagorean theorem?",
    answer: "In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.",
    tag: "Math",
    difficulty: "Easy"
  },
  {
    question: "Describe the process of photosynthesis.",
    answer: "Plants convert sunlight, carbon dioxide, and water into glucose and oxygen.",
    tag: "Biology",
    difficulty: "Medium"
  },
  {
    question: "What causes the phases of the Moon?",
    answer: "The relative positions of the Earth, Moon, and Sun cause different portions of the Moon to be illuminated.",
    tag: "Astronomy",
    difficulty: "Easy"
  },
  {
    question: "Define the term 'ecosystem'.",
    answer: "A community of living organisms interacting with their physical environment.",
    tag: "Environmental Science",
    difficulty: "Easy"
  },
  {
    question: "Explain Newton's First Law of Motion.",
    answer: "An object in motion stays in motion unless acted upon by an external force.",
    tag: "Physics",
    difficulty: "Easy"
  },
  {
    question: "What is an idiom? Give an example.",
    answer: "A phrase with a meaning different from its literal words. Example: 'Break the ice'.",
    tag: "Literature",
    difficulty: "Medium"
  },
  {
    question: "How do supply and demand affect prices in a market?",
    answer: "Prices increase when demand exceeds supply and decrease when supply exceeds demand.",
    tag: "Economics",
    difficulty: "Medium"
  },
  {
    question: "Explain the water cycle.",
    answer: "Water evaporates, condenses into clouds, precipitates as rain, and collects in bodies of water.",
    tag: "Earth Science",
    difficulty: "Easy"
  },
  {
    question: "What is the formula for the area of a circle?",
    answer: "Area = π × radius²",
    tag: "Math",
    difficulty: "Easy"
  },
  {
    question: "Describe the function of DNA.",
    answer: "DNA stores genetic information used to build and maintain living organisms.",
    tag: "Biology",
    difficulty: "Medium"
  },
  {
    question: "What is the difference between speed and velocity?",
    answer: "Speed is how fast something moves; velocity includes speed and direction.",
    tag: "Physics",
    difficulty: "Medium"
  },
  {
    question: "Define 'metaphor' and give an example.",
    answer: "A metaphor directly compares two things. Example: 'Time is a thief.'",
    tag: "Literature",
    difficulty: "Medium"
  },
  {
    question: "Explain the principle of conservation of energy.",
    answer: "Energy cannot be created or destroyed, only transformed from one form to another.",
    tag: "Physics",
    difficulty: "Medium"
  },
  {
    question: "What is the importance of recycling?",
    answer: "It reduces waste, conserves resources, and helps protect the environment.",
    tag: "Environmental Science",
    difficulty: "Easy"
  },
  {
    question: "What is an algorithm in computer science?",
    answer: "A step-by-step procedure for solving a problem or performing a task.",
    tag: "Technology",
    difficulty: "Medium"
  },
  {
    question: "Calculate the slope of the line passing through points (2,3) and (4,7).",
    answer: "Slope = (7 - 3) / (4 - 2) = 2",
    tag: "Math",
    difficulty: "Medium"
  },
  {
    question: "What is the role of mitochondria in a cell?",
    answer: "Mitochondria produce energy (ATP) through cellular respiration.",
    tag: "Biology",
    difficulty: "Easy"
  },
  {
    question: "Describe the function of the legislative branch in government.",
    answer: "It creates and passes laws.",
    tag: "Civics",
    difficulty: "Easy"
  },
  {
    question: "What are the three states of matter?",
    answer: "Solid, liquid, and gas.",
    tag: "Science",
    difficulty: "Easy"
  },
  {
    question: "Explain the difference between an element and a compound.",
    answer: "An element is a pure substance made of one type of atom; a compound contains two or more elements chemically combined.",
    tag: "Chemistry",
    difficulty: "Medium"
  },
  {
    question: "What is the main function of roots in plants?",
    answer: "To absorb water and nutrients from the soil and anchor the plant.",
    tag: "Biology",
    difficulty: "Easy"
  },
  {
    question: "What is a prime number?",
    answer: "A number greater than 1 that has no positive divisors other than 1 and itself.",
    tag: "Math",
    difficulty: "Easy"
  },
  {
    question: "Describe how a bill becomes a law in the United States.",
    answer: "It is proposed, reviewed, and approved by both houses of Congress, then signed by the President.",
    tag: "Civics",
    difficulty: "Medium"
  },
  {
    question: "What is the function of the respiratory system?",
    answer: "To exchange oxygen and carbon dioxide between the body and the environment.",
    tag: "Biology",
    difficulty: "Easy"
  }
];

// Keep track of current card index
let currentIndex = 0;

// Grab DOM elements
const cardContainer = document.getElementById("card-container");
const toggleDarkBtn = document.getElementById("toggleDark");
const prevBtn = document.getElementById("prevCard");
const nextBtn = document.getElementById("nextCard");
const shuffleBtn = document.getElementById("shuffleToggle");
const focusBtn = document.getElementById("focusToggle");
const openModalBtn = document.getElementById("openModal");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModal");
const addCardForm = document.getElementById("addCardForm");

// Create and insert progress display element right below the card container
const progressDisplay = document.createElement("div");
progressDisplay.id = "progressDisplay";
progressDisplay.className = "mt-2 text-center text-gray-700 dark:text-gray-300 font-semibold";
cardContainer.parentNode.insertBefore(progressDisplay, cardContainer.nextSibling);

// Function to create a single flashcard element with flipping functionality
function createFlashcard(card) {
  const flipCard = document.createElement("div");
  flipCard.className = "flip-card";
  flipCard.setAttribute("tabindex", "0"); // Make card focusable for keyboard users

  const flipInner = document.createElement("div");
  flipInner.className = "flip-card-inner";

  const front = document.createElement("div");
  front.className = "flip-card-front";
  front.innerHTML = `
    <p class="text-xl font-semibold mb-3">${card.question}</p>
    <p class="text-sm text-gray-500 dark:text-gray-400">Tag: <span class="font-medium">${card.tag}</span></p>
    <p class="text-sm text-gray-500 dark:text-gray-400">Difficulty: <span class="font-medium">${card.difficulty}</span></p>
  `;

  const back = document.createElement("div");
  back.className = "flip-card-back";
  back.innerHTML = `<p class="text-xl font-semibold">${card.answer}</p>`;

  flipInner.appendChild(front);
  flipInner.appendChild(back);
  flipCard.appendChild(flipInner);

  // Toggle flip on click
  flipCard.addEventListener("click", () => {
    flipCard.classList.toggle("flipped");
  });

  // Keyboard accessibility: flip on Enter or Space key
  flipCard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flipCard.classList.toggle("flipped");
    }
  });

  return flipCard;
}

// Render card by current index
function renderCard(index) {
  cardContainer.innerHTML = "";

  if (cards.length === 0) {
    cardContainer.textContent = "No cards available.";
    progressDisplay.textContent = "";
    return;
  }

  // Make sure index is within bounds
  currentIndex = ((index % cards.length) + cards.length) % cards.length;

  const cardElem = createFlashcard(cards[currentIndex]);
  cardContainer.appendChild(cardElem);
  updateProgress();
}

// Update progress display (e.g., "Card 1 of 25")
function updateProgress() {
  progressDisplay.textContent = `Card ${currentIndex + 1} of ${cards.length}`;
}

// Button handlers for navigation
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  renderCard(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cards.length;
  renderCard(currentIndex);
});

// Shuffle cards randomly
shuffleBtn.addEventListener("click", () => {
  // Simple Fisher-Yates shuffle for better randomness
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  currentIndex = 0;
  renderCard(currentIndex);
});

// Focus mode toggle: hide controls except card & progress
focusBtn.addEventListener("click", () => {
  const controls = [prevBtn, nextBtn, shuffleBtn, focusBtn, openModalBtn, toggleDarkBtn];
  controls.forEach((btn) => btn.classList.toggle("hidden"));
});

// Dark mode toggle: toggles 'dark' class on body and updates button text
toggleDarkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleDarkBtn.textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});

// Modal open/close handlers
openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  // Optional: set focus to first input when modal opens
  document.getElementById("frontInput").focus();
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  addCardForm.reset();
});

// Close modal on clicking outside modal content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    addCardForm.reset();
  }
});

// Add new card form submission
addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const question = document.getElementById("frontInput").value.trim();
  const answer = document.getElementById("backInput").value.trim();
  const difficulty = document.getElementById("difficultyInput").value;
  const tagInput = document.getElementById("tagInput").value.trim();
  const tag = tagInput || "General";

  if (!question || !answer) {
    alert("Please fill out both the question and answer.");
    return;
  }

  cards.push({ question, answer, tag, difficulty });
  modal.classList.add("hidden");
  addCardForm.reset();

  // Show the newly added card immediately
  currentIndex = cards.length - 1;
  renderCard(currentIndex);
});

// Initialize by rendering the first card
renderCard(currentIndex);

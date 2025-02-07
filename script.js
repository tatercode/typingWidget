let INDEX = 0; // Tells us where we are
let CORRECTLETTERS = 0; // How many correct
let WRONGLETTERS = 0;
let TIMEREMAINING = 30;
let ENDED = true;
let DARK_MODE = true; // Since your initial CSS uses dark colors

function calculateWPM() {
  const elapsedMinutes = (Date.now() - TIMESTART) / 60000;
  return Math.round((CORRECTLETTERS/ 5) / elapsedMinutes);
}

// Start typing
function start() {
  const textArea = document.getElementById("typing");
  textArea.focus();
  let wordsArea = document.getElementById("words");
  wordsArea.className = "";
  wordsArea.scrollTop = 0;
  const blur = document.getElementById("focus");
  blur.style.display = "none";
  const timer = document.getElementById("timer");
  timer.style.display = "flex";
  ENDED = false;
  //practice_words();
  generate_words();
  countDown();
}

function end() {
  const blur = document.getElementById("focus");
  blur.textContent = "Click here to restart";
  const textArea = document.getElementById("typing");
  textArea.blur();
  blur.style.display = "flex"; 
  CORRECTLETTERS = 0;
  INDEX = 0;
  ENDED = true;
}

function countDown() {
  const timerText = document.getElementById("timer-text")
  const wpm = document.getElementById("WPM");
  TIMESTART = Date.now();
  timeLeft = 30;
  intervalId = setInterval(() => {
    timeLeft--;
    ans = calculateWPM();
    wpm.textContent = `WPM:${ans}`;
    timerText.textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      end();
    }
  }, 1000)
  
 
}



// Add span to every character in div
function wrap_chars() {
  const wordsArea = document.getElementById("words");
  let addingSpan = "";
  for (char in wordsArea.textContent) {
    addingSpan += 
    `<span class="remaining" id="char-${char}">${wordsArea.textContent[char]}</span>`;
  }

  wordsArea.textContent = "";
  wordsArea.innerHTML = addingSpan;
}

// Randomly generate words from json file
function generate_words() {
  fetch('./words.json')
    .then((response) => response.json())
    .then((words) => {
      const wordsArea = document.getElementById("words");
      let currentText = ""; // Initialize currentText

      for (let i = 0; i < 100; i++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        currentText += randomWord + " "; // Append random word to currentText
      }
      
      wordsArea.textContent = currentText;
      wrap_chars();
    })
    .catch((error) => console.error("Error getting words", error));

}

// Used for testing 
function practice_words() {
  let words = "practice the cat yeet ";

  const wordsArea = document.getElementById("words");
  
  wordsArea.textContent = words;
  
  for (let i = 0; i < 300; i++) {
    wordsArea.textContent += words;
  }

  wrap_chars();
}

// Scroll if hit bottom or top of div
function scroll_text() {
  const wordsArea = document.getElementById("words");
  const charElement = document.getElementById(`char-${INDEX}`);
  
  if (charElement) {
    const charRect = charElement.getBoundingClientRect();
    const containerRect = wordsArea.getBoundingClientRect();
    
    if (charRect.bottom > containerRect.bottom) {
      const scrollAmount = charRect.bottom - containerRect.bottom;
      wordsArea.scrollTop += (scrollAmount * 5 + 10);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const textArea = document.getElementById("typing");
  textArea.addEventListener("keydown", (event) => {
    check_typing(event);
  });

  let div = document.getElementById("focus");
  div.addEventListener("click", () => {
    if (ENDED) {
      start();
    }
  });

  let wordsArea = document.getElementById("words");
  wordsArea.addEventListener("click", () => {
    textArea.focus();
  })
});

practice_words();

function toggleTheme(isDark) {
  const colors = {
    dark: {
      background: '#191919',
      text: '#ffffff',
      secondaryText: '#999999',
      accent: '#E2B714',
      error: '#ff4444',
      border: '#333333',
      correct: '#ffffff',
      incorrect: '#ff4444',
      remaining: '#666666'
    },
    light: {
      background: '#ffffff',
      text: '#000000',
      secondaryText: '#666666',
      accent: '#E2B714',
      error: '#ff0000',
      border: '#e0e0e0',
      correct: '#000000',
      incorrect: '#ff0000',
      remaining: '#999999'
    }
  };

  const theme = isDark ? colors.dark : colors.light;
  
  // Update body
  document.body.style.backgroundColor = theme.background;
  document.body.style.color = theme.text;
  
  // Update words area
  const wordsArea = document.getElementById('words');
  wordsArea.style.color = theme.text;
  wordsArea.style.borderColor = theme.border;
  
  // Update typing area
  const typingArea = document.getElementById('typing');
  typingArea.style.color = theme.text;
  typingArea.style.borderColor = theme.border;
  
  // Update focus area
  const focusArea = document.getElementById('focus');
  focusArea.style.color = theme.text;
  
  // Update timer
  const timer = document.getElementById('timer');
  timer.style.color = theme.accent;
  
  // Create CSS rules for the character states
  const style = document.createElement('style');
  style.textContent = `
    .remaining { color: ${theme.remaining} !important; }
    .correct { color: ${theme.correct} !important; }
    .incorrect { color: ${theme.incorrect} !important; }
  `;
  
  const oldStyle = document.getElementById('theme-styles');
  if (oldStyle) {
    oldStyle.remove();
  }
  
  style.id = 'theme-styles';
  document.head.appendChild(style);
  
  DARK_MODE = isDark;
}

// Call this when checking typing to ensure new characters get proper colors
function updateCharStyles(charElement, isCorrect) {
  const theme = DARK_MODE ? {
    correct: '#ffffff',
    incorrect: '#ff4444'
  } : {
    correct: '#000000',
    incorrect: '#ff0000'
  };
  
  if (isCorrect) {
    charElement.style.color = theme.correct;
  } else {
    charElement.style.color = theme.incorrect;
  }
}

function check_typing(event) {
  const textArea = document.getElementById("typing");
  allSpans = document.getElementById("words").querySelectorAll("span");
  textArea.style.display = "flex";
  
  if (event.key === "Backspace" && INDEX > 0) {
    const wordsArea = document.getElementById("words");
    let charElement = document.getElementById(`char-${INDEX}`);
    const containerRect = wordsArea.getBoundingClientRect();

    charElement.classList.remove("current_char")
    INDEX -= 1;
    charElement = document.getElementById(`char-${INDEX}`);
    const charRect = charElement.getBoundingClientRect();
    if (charRect.top < containerRect.top - 4) {
      INDEX += 1;
      charElement = document.getElementById(`char-${INDEX}`);
      charElement.classList.add("current_char")
      return
    }
    charElement.className = "remaining";
    charElement.classList.add("current_char")
    
    return;
  }
  
  let charElement = document.getElementById(`char-${INDEX}`);

  if (charElement.textContent == event.key) {
    charElement.className = "correct";
    updateCharStyles(charElement, true);
    CORRECTLETTERS += 1;
  } else {
    charElement.className = "incorrect";
    updateCharStyles(charElement, false);
    WRONGLETTERS -= 1;
  }
  
  charElement.classList.remove("current_char")
  INDEX++;
  charElement = document.getElementById(`char-${INDEX}`);
  charElement.classList.add("current_char")
  scroll_text()
}

document.getElementById('toggle').addEventListener('change', function() {
  toggleTheme(this.checked);
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleElement = document.getElementById('toggle');
  toggleTheme(toggleElement.checked);
});


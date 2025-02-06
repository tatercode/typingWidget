let INDEX = 0; // Tells ufalsefalses where we are
let CORRECTLETTERS = 0; // How many correct
let WRONGLETTERS = 0;
let TIMESTART = null;
let TIMEREMAINING = 30;
let STARTED = false;
let ENDED = true;

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
  const wordsArea = document.getElementById("words")
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
    console.log(ans);
    wpm.textContent = `WPM:${ans}`;
    timerText.textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      end();
    }
  }, 1000)
  
 
  console.log("timer");
}



// Add span to every character in div
function wrap_chars() {
  const wordsArea = document.getElementById("words");
  let addingSpan = "";
  for (char in wordsArea.textContent) {
    console.log(char);
    addingSpan += 
    `<span class="remaining" id="char-${char}">${wordsArea.textContent[char]}</span>`;
  }

  wordsArea.textContent = "";
  wordsArea.innerHTML = addingSpan;
  console.log(wordsArea.innerHTML);
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

// Check if char is correctly typed
function check_typing(event) {
  const textArea = document.getElementById("typing");
  allSpans = document.getElementById("words").querySelectorAll("span");
  console.log(document.getElementById(`char-${INDEX}`));
  console.log(event.key);
  textArea.style.display = "flex";
  if (event.key === "Backspace" && INDEX > 0) {
    console.log("BACK");
    let charElement = document.getElementById(`char-${INDEX}`);
    charElement.classList.remove("current_char")
    INDEX -= 1;
    charElement = document.getElementById(`char-${INDEX}`);
    charElement.className = "remaining";
    charElement.classList.add("current_char")
    return;
  }
  let charElement = document.getElementById(`char-${INDEX}`);

  if (charElement.textContent == event.key) {
    charElement.className = "correct";
    CORRECTLETTERS += 1;
  } else {
    charElement.className = "incorrect";
    WRONGLETTERS -= 1;
  }
  charElement.classList.remove("current_char")
  INDEX++;
  charElement = document.getElementById(`char-${INDEX}`);
  charElement.classList.add("current_char")
  scroll_text()
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
    //else if (charRect.top > containerRect.top) {
    //  const scrollAmount = charRect.top - containerRect.top;
    //  wordsArea.scrollTop -= (scrollAmount);
    //}
  }
}

// Attach event listener to the wordsArea
document.addEventListener("DOMContentLoaded", () => {
  const textArea = document.getElementById("typing");
  textArea.addEventListener("keydown", (event) => {
    check_typing(event);
  });

  let div = document.getElementsByClassName("test");
  div = div[0];
  
  div.addEventListener("click", () => {
    if (ENDED) {
      start();
    }
  });
});

practice_words();
//generate_words();

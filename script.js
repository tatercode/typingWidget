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
  
  for (let i = 0; i < 10; i++) {
    wordsArea.textContent += words;
  }

  wrap_chars();
}

// Check if char is correctly typed
let INDEX = 0; // Tells us where we are
function check_typing(event) {
  const textArea = document.getElementById("typing");
  allSpans = document.getElementById("words").querySelectorAll("span");
  console.log(document.getElementById(`char-${INDEX}`));
  console.log(event.key);
  textArea.style.display = "flex";
  if (event.key === "Backspace" && INDEX > 0) {
    console.log("BACK");
    INDEX -= 1;
    const charElement = document.getElementById(`char-${INDEX}`);
    charElement.className = "remaining";
    return;
  }
  const charElement = document.getElementById(`char-${INDEX}`);

  if (charElement.textContent == event.key) {
    charElement.className = "correct";
  } else {
    charElement.className = "incorrect";
  }
  INDEX++;
  scroll_text()
}

// Scroll if hit bottom of div
function scroll_text() {
  const wordsArea = document.getElementById("words");
  const charElement = document.getElementById(`char-${INDEX}`);
  
  if (charElement) {
    const charRect = charElement.getBoundingClientRect();
    const containerRect = wordsArea.getBoundingClientRect();
    
    if (charRect.bottom > containerRect.bottom) {
      const scrollAmount = charRect.bottom - containerRect.bottom;
      wordsArea.scrollTop += scrollAmount;
    }
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
    textArea.focus();
  });
});

practice_words();
//generate_words();

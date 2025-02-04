function wrap_chars() {
  const wordsArea = document.getElementById("words");
  let addingSpan = "";
  for (char in wordsArea.textContent) {
    addingSpan += 
    `<span class="remaining" id="char-${char}">${wordsArea.textContent[char]}</span>`
  }

  wordsArea.textContent = "";
  wordsArea.innerHTML = addingSpan;
}

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
      
      // Update the wordsArea value
      wordsArea.textContent = currentText;
    })
    // Fixed missing parenthesis
    .catch((error) => console.error("Error getting words", error));
  wrap_chars();
}

// generate_words();

function practice_words() {
  let words = "practice the cat yeet";
  const wordsArea = document.getElementById("words");

  wordsArea.textContent = words;
  wrap_chars();
}

practice_words()

function check_typing(event) {
  const textArea = document.getElementById("typing");
  textArea.style.display = "flex";
  console.log("HELLO", event.target.value);
}


// Attach event listener to the wordsArea
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("typing").addEventListener("input", check_typing);
});


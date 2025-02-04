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

generate_words();

function practice_words() {
  let words = "practice the cat yeet";
  const wordsArea = document.getElementById("words");
  
  wordsArea.textContent = words;
  wrap_chars();
}

// practice_words();

let index = 0;
function check_typing(event) {
  const textArea = document.getElementById("typing");
  allSpans = document.getElementById("words").querySelectorAll("span");
  console.log(document.getElementById(`char-${index}`));
  console.log(event.key);
  textArea.style.display = "flex";
  if (event.key === "Backspace" && index > 0) {
    console.log("BACK");
    index -= 1;

    const charElement = document.getElementById(`char-${index}`);
    charElement.className = "remaining";
    return;
  }
  const charElement = document.getElementById(`char-${index}`);

  if (charElement.textContent == event.key) {
    charElement.className = "correct";
  } else {
    charElement.className = "incorrect";
  }
  index++;
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


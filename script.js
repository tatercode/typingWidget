
function generate_words() {
  fetch('./words.json')
    .then((response) => response.json())
    .then((words) => {
      const textarea = document.getElementById("typing");
      let currentText = ""; // Initialize currentText

      for (let i = 0; i < 100; i++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        currentText += randomWord + " "; // Append random word to currentText
      }

      textarea.value = currentText; // Update the textarea value
      textarea.setAttribute("data-original-text", currentText)
    })
    .catch((error) => console.error("Error getting words", error)); // Fixed missing parenthesis
}

generate_words();

function check_typing() {
  const textarea = document.getElementById("typing");
  const userInput = textarea.value;
  const originalText = textarea.getAttribute("data-original-text");

  let highlightedText = "";
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === originalText[i]) {
      highlightedText += `<span class="correct">${userInput[i]}</span>`; // Correct character
    } else {
      highlightedText += `<span class="incorrect">${userInput[i]}</span>`; // Incorrect character
    }
  }

  // Append remaining original text (not yet typed)
  if (userInput.length < originalText.length) {
    highlightedText += `<span class="remaining">${originalText.slice(userInput.length)}</span>`;
  }

  // Display the highlighted text (for demonstration, we'll log it to the console)
  console.log(highlightedText); // You can replace this with a visual update
}

// Attach event listener to the textarea
document.getElementById("typing").addEventListener("input", check_typing);


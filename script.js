
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
    })
    .catch((error) => console.error("Error getting words", error)); // Fixed missing parenthesis
}

generate_words();

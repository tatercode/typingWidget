
function generate_words() {
  fetch('./words.json')
    .then((response) => response.json())
    .then((words) => {
      const randomElements = getRandomElements(words, 100); // Get 100 unique random elements
      const textarea = document.getElementById("typing");

      // Clear the textarea before appending new words
      textarea.value = "";

      for (let i = 0; i < randomElements.length; i++) {
        // Append the random word to the textarea
        textarea.value += randomElements[i] + " ";
      }
    })
    .catch((error) => console.error('Error fetching words:', error));
}

generate_words();

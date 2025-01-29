function getRandomElements(arr, count) {
  return Array.from({ length: count }, () => arr[Math.floor(Math.random() * arr.length)]);
}

function generate_words() {
  fetch('./words.json')
    .then((response) => response.json())
    .then((json) => {
      const words = json; // Assign the fetched JSON to `words`
      const randomElements = getRandomElements(words, 100); // Get 100 random elements
      const textarea = document.getElementById("typing");

      // Clear the textarea before appending new words
      textarea.value = "";

      // Append the random words to the textarea
      randomElements.forEach((word) => {
        textarea.value += word + " ";
      });
    })
    .catch((error) => {
      console.error("Error fetching words:", error);
    });
}

generate_words();

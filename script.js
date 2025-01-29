function getRandomElements(arr, count) {
  return Array.from({ length: count }, () => arr[Math.floor(Math.random() * arr.length)]);
}

function generate_words() {
  let words;
  fetch('./words.json')
      .then((response) => response.json())
      .then((json) => words = json);

  const randomElements = getRandomElements(words, 100); // Get 3 unique random elements
  const textarea = document.getElementById("typing");

  for (let i = 0; i < randomElements.size; i++) {
    // Append the random word to the textarea
    let currentText = textarea.value;
    textarea.value = currentText + randomWord + " ";
  }
}

generate_words()


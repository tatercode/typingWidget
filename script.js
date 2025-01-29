
function generate_words() {
  let words;
  fetch('./words.json')
      .then((response) => response.json())
      .then((json) => words = json);
  
  const textarea = document.getElementById("typing");

  for (let i = 0; i < 100; i++) {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    currentText += randomWord + " ";
  }
}

generate_words()


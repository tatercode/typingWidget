
function generate_words() {
  let words;
  fetch('./words.json')
      .then((response) => response.json())
      .then((words) => {
    
        const textarea = document.getElementById("typing");

        for (let i = 0; i < 100; i++) {
          const randomWord = words[Math.floor(Math.random() * words.length)];
          currentText += randomWord + " ";
        }
      })
      .catch((error) => console.error("Error getting words", error);
}

generate_words()


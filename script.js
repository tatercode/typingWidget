
function generate_words() {
  let words;
  fetch('./words.json')
      .then((response) => response.json())
      .then((json) => words = json);
}

generate_words()

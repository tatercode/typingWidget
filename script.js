
function generate_words() {
  fetch('./words.json')
      .then((response) => response.json())
      .then((json) => console.log(json));
}

generate_words()

const GPT_URL = 'https://gpt-rm5crmv2sq-ew.a.run.app';

const TEMPERATURE = 0.7;
const LENGTH_MAX = 30;
const LENGTH_MIN = 60;

function predict(prefix, length, temperature) {
  return window.fetch(`${GPT_URL}?include_prefix=false&length=${length}&prefix=${prefix}&temperature=${temperature}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data.text;
    })
    .catch(err => {
      console.error(err);
    });
}

const textElems = document.querySelectorAll('main > p');

for (let i = 0; i < 3; i += 1) {
  const elem = textElems[i];
  const prefix = elem.innerText;
  const length = LENGTH_MIN + Math.floor(Math.random() * (LENGTH_MAX - LENGTH_MIN));

  predict(prefix, length, TEMPERATURE)
    .then(text => {
      const lastChar = text[text.length - 1];

      if (lastChar === ',') {
        text[text.length - 1] = '.';
      } else if (lastChar !== '.') {
        text += '.';
      }

      const cleanedText = text.replace(prefix, '');

      elem.innerHTML = `${prefix} <span class="predicted">${cleanedText}</span>`;
    });
}


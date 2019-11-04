const GPT_URL = 'https://gpt-rm5crmv2sq-ew.a.run.app';

const TEMPERATURE = 0.7;
const LENGTH = 30;

function predict(prefix) {
  return window.fetch(`${GPT_URL}?length=${LENGTH}&prefix=${prefix}&temperature=${TEMPERATURE}&include_prefix=false`)
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

  predict(elem.innerText)
    .then(text => {
      const lastChar = text[text.length - 1];

      if (lastChar === ',') {
        text[text.length - 1] = '.';
      } else if (lastChar !== '.') {
        text += '.';
      }

      elem.innerText = `${elem.innerText} <span class="predicted">${text}</span>`;
    });
}


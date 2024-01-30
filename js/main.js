const trashIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="#000000"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`;

const buttons = document.querySelectorAll(".btn-theme");

document.getElementById("light").addEventListener("click", applyLightTheme);
document.getElementById("system").addEventListener("click", applySystemTheme);
document.getElementById("dark").addEventListener("click", applyDarkTheme);

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (e.matches) {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }
  });

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.classList.contains("selected")) {
      button.classList.add("selected");

      buttons.forEach((item) => {
        if (item !== button) {
          item.classList.remove("selected");
        }
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  /* Check and load THEME */
  const theme = localStorage.getItem("theme");

  if (!theme) {
    buttons[1].classList.add("selected");
    applySystemTheme();
  } else {
    buttons.forEach((button) => {
      if (button.id === theme) {
        button.classList.add("selected");
        if (theme === "light") applyLightTheme();
        if (theme === "dark") applyDarkTheme();
        if (theme === "system") applySystemTheme();
      }
    });
  }

  /* Check and load History */
  const history = JSON.parse(localStorage.getItem("history"));

  if (history) actualizarLista();

  if (!history || history.length == 0) {
    const container = document.getElementById("history");
    const p = document.createElement("p");
    p.classList.add("empty");
    p.innerHTML = "Tu historial se encuentra vacío";
    container.appendChild(p);
  }
});

function applyLightTheme() {
  localStorage.setItem("theme", "light");
  document.getElementById("theme-style").href = "css/light-theme.css";
}

function applySystemTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    applyDarkTheme();
  } else {
    applyLightTheme();
  }
  localStorage.setItem("theme", "system");
}

function applyDarkTheme() {
  localStorage.setItem("theme", "dark");
  document.getElementById("theme-style").href = "css/dark-theme.css";
}

const encryptBtn = document.getElementById("encrypt-btn");
const decryptBtn = document.getElementById("decrypt-btn");
const input = document.getElementById("input-text");
const output = document.querySelector(".output");
const outputContainer = document.getElementById("output-container");

encryptBtn.addEventListener("click", () => {
  const inputValue = input.value;

  const outputValue = encrypt(inputValue);

  output.innerHTML = `<p class="value">${outputValue}</p>`;

  /* Update history */
  updateHistory(inputValue, outputValue);

  /* Create & Show button */
  insertButton(outputContainer, inputValue, outputValue);
});

decryptBtn.addEventListener("click", () => {
  const inputValue = input.value;

  const outputValue = decrypt(inputValue);

  output.innerHTML = `<p class="value">${outputValue}</p>`;

  /* Update history */
  updateHistory(inputValue, outputValue);

  /* Create & Show button */
  insertButton(outputContainer, inputValue, outputValue);
});

function encrypt(input) {
  return input.replace(/([aeiou])/g, function (match, vowel) {
    switch (vowel) {
      case "a":
        return "ai";
      case "e":
        return "enter";
      case "i":
        return "imes";
      case "o":
        return "ober";
      case "u":
        return "ufat";
      default:
        return vowel;
    }
  });
}

function decrypt(input) {
  return input.replace(/(ai|enter|imes|ober|ufat)/g, function (match, code) {
    switch (code) {
      case "ai":
        return "a";
      case "enter":
        return "e";
      case "imes":
        return "i";
      case "ober":
        return "o";
      case "ufat":
        return "u";
      default:
        return match;
    }
  });
}

function updateHistory(input, output) {
  /* Update history in localStorage */
  const history = JSON.parse(localStorage.getItem("history")) ?? [];

  history.push([input, output]);

  localStorage.setItem("history", JSON.stringify(history));

  /* Update history in real time */
  actualizarLista();
}

function insertButton(container, input, output) {
  if (container.children.length === 2 && input.length > 0) {
    const button = document.createElement("button");
    button.innerHTML = "Copiar texto";

    container.appendChild(button);

    button.addEventListener("click", () => {
      navigator.clipboard.writeText(output);
    });
  }
}

function updateHistoryNow(unorderedList, history) {
  const li = document.createElement("li");
  const details = document.createElement("details");
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("id", "delete-item");
  button.innerHTML = trashIconSvg;

  const html = `
  <summary>
    ${history.length}
  </summary>
  <div>
    <p>
      Entrada:
      <strong>${history[history.length - 1][0]}</strong>
    </p>
    <hr/><hr/>
    <p>
      Salida:
      <strong>${history[history.length - 1][1]}</strong>
    </p>
  </div>`;

  details.innerHTML = html;
  li.appendChild(details);
  li.appendChild(button);
  unorderedList.appendChild(li);
}

function actualizarLista() {
  const history = JSON.parse(localStorage.getItem("history")) ?? [];

  const container = document.getElementById("history");
  container.innerHTML = "";

  const ul = document.createElement("ul");

  history &&
    history.forEach((item, index) => {
      const li = document.createElement("li");
      const details = document.createElement("details");
      const button = document.createElement("button");
      button.setAttribute("type", "button");
      button.innerHTML = trashIconSvg;

      const html = `
      <summary>
        ${index + 1}
      </summary>
      <div>
        <p>
          Entrada:
          <strong>${item[0]}</strong>
        </p>
        <hr/><hr/>
        <p>
          Salida:
          <strong>${item[1]}</strong>
        </p>
      </div>`;

      details.innerHTML = html;
      li.appendChild(details);
      li.appendChild(button);
      ul.appendChild(li);

      button.addEventListener("click", () => {
        const newHistory = history
          .slice(0, index)
          .concat(history.slice(index + 1));
        localStorage.setItem("history", JSON.stringify(newHistory));
        actualizarLista();
      });
    });

  history && container.appendChild(ul);
}

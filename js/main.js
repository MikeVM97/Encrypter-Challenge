const trashIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="#000000"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`;

const alertIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.68 127.83" width="30" height="30" fill="red">
  <path class="cls-1"
    d="m0,63.85C.03,28.49,28.49.02,63.84,0c35.14-.02,63.89,28.79,63.84,63.98-.05,35.22-28.77,63.9-63.96,63.85C28.41,127.79-.03,99.23,0,63.85Zm11.64.27c.15,29.21,23.6,52.08,53.23,51.92,27.99-.15,51.38-24.19,51.16-52.59-.22-28.81-23.82-51.78-53.09-51.67-28.19.1-51.46,23.85-51.31,52.35Z" />
  <path class="cls-1"
    d="m69.64,51.75c0,4.32.07,8.64-.01,12.96-.08,3.95-1.71,7.08-6.06,6.96-4.03-.12-5.55-3.05-5.54-6.89.03-8.64,0-17.28,0-25.92,0-3.86,1.67-6.68,5.71-6.71,4.05-.03,5.76,2.88,5.87,6.64.12,4.32.03,8.64.03,12.96Z" />
  <path class="cls-1"
    d="m63.88,95.81c-4.51.07-7.79-3.18-7.84-7.78-.05-4.61,3.14-7.95,7.63-7.99,4.44-.04,7.89,3.33,7.94,7.78.06,4.47-3.28,7.92-7.74,7.99Z" />
  </svg>`;

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

  if (!history || history.length == 0) historyEmptyMessage();
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
  processText(encrypt);
});

decryptBtn.addEventListener("click", () => {
  processText(decrypt);
});

function encrypt(input) {
  const upperCase = /[A-Z]/;
  const specials = /[áéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ@\^¨ç´`*={}+\-_'".·;,$#%&\/~¡!¿?]/g;
  if (upperCase.test(input) && specials.test(input)) {
    throw new Error(
      "No se permiten letras en mayúscula ni caracteres especiales"
    );
  }
  if (upperCase.test(input)) {
    throw new Error("No se permiten letras en mayúscula");
  }
  if (specials.test(input)) {
    throw new Error("No se permiten tildes o caracteres especiales");
  }
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
  const upperCase = /[A-Z]/;
  const specials = /[áéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ@\^¨ç´`*={}+\-_'".·;,$#%&\/~¡!¿?]/g;
  if (upperCase.test(input) && specials.test(input)) {
    throw new Error(
      "No se permiten letras en mayúscula ni caracteres especiales"
    );
  }
  if (upperCase.test(input)) {
    throw new Error("No se permiten letras en mayúscula");
  }
  if (specials.test(input)) {
    throw new Error("No se permiten tildes o caracteres especiales");
  }
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

  if (!history || history.length === 0) {
    historyEmptyMessage();
    return;
  }

  const container = document.getElementById("history");
  container.innerHTML = "";

  const ul = document.createElement("ul");

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

  container.appendChild(ul);
}

function historyEmptyMessage() {
  const container = document.getElementById("history");
  container.innerHTML = `<p class="empty">Tu historial se encuentra vacío</p>`;
}

function processText(callback) {
  try {
    const inputValue = input.value;
    const outputValue = callback(inputValue);

    output.innerHTML = `<p class="value">${outputValue}</p>`;

    /* Update history */
    updateHistory(inputValue, outputValue);

    /* Create & Show button */
    insertButton(outputContainer, inputValue, outputValue);
  } catch (error) {
    /* Show the error message */
    const alertContainer = document.createElement("div");
    alertContainer.setAttribute("id", "alert-container");
    alertContainer.innerHTML = alertIcon + `<span>${error.message}</span>`;
    document.body.appendChild(alertContainer);

    setTimeout(() => {
      alertContainer.classList.add("hiding");
    }, 3000);
    setTimeout(() => {
      alertContainer.remove();
    }, 5000);
  }
}

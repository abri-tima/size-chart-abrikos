import {
  chestInterval,
  widthInterval,
  heightInterval,
} from "./sizeInterval.js";
import {
  chestIntervalDuim,
  widthIntervalDuim,
  heightIntervalDuim,
} from "./duim-size-chart.js";
import { sizeMap } from "./size-map.js";

document.addEventListener("DOMContentLoaded", function () {
  const listButtons = document.querySelector(".list-chart");
  const buttonsType = document.querySelectorAll(".btn-item-size-type");
  const chestText = document.getElementById("chestInter");
  const widthText = document.getElementById("widthinter");
  const heightText = document.getElementById("heightInter");

  let currentSizeValue = "42";
  let currentType = "Cm";
  let buttons = [];

  function renderButtons(dataArray) {
    listButtons.innerHTML = "";
    dataArray.forEach(({ size }) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.className = "btn-item-chart";
      btn.value = size;
      btn.textContent = size;
      li.appendChild(btn);
      listButtons.appendChild(li);
    });

    // обновляем список кнопок
    buttons = document.querySelectorAll(".btn-item-chart");

    // добавляем обработчики на новые кнопки
    buttons.forEach((button) => {
      button.addEventListener("click", () => handleButtonClick(button));
    });

    console.log(123123);
  }

  let minChest = "";
  let maxChest = "";
  let width = "";
  let height = "";
  let minChestDuim = "";
  let maxChestDuim = "";
  let widthDuim = "";
  let heightDuim = "";

  function updateDisplay(type, size) {
    if (type === "Cm") {
      const chestInt = chestInterval.find((chs) => chs.size === size);
      const widthInt = widthInterval.find((wd) => wd.size === size);
      const heightInt = heightInterval.find((he) => he.size === size);

      if (chestInt && widthInt && heightInt) {
        minChest = chestInt.min.toString();
        maxChest = chestInt.max.toString();
        width = widthInt.widthValue.toString();
        height = heightInt.heightValue.toString();

        chestText.textContent = `${minChest} - ${maxChest}`;
        widthText.textContent = `${width}`;
        heightText.textContent = `${height}`;
      }
    } else if (type === "In") {
      const chestDuim = chestIntervalDuim.find((chs) => chs.size === size);
      const widthDuimInt = widthIntervalDuim.find((wd) => wd.size === size);
      const heightDuimInt = heightIntervalDuim.find((he) => he.size === size);

      if (chestDuim && widthDuimInt && heightDuimInt) {
        minChestDuim = chestDuim.min.toString();
        maxChestDuim = chestDuim.max.toString();
        widthDuim = widthDuimInt.widthValue.toString();
        heightDuim = heightDuimInt.heightValue.toString();

        chestText.textContent = `${minChestDuim} - ${maxChestDuim}`;
        widthText.textContent = `${widthDuim}`;
        heightText.textContent = `${heightDuim}`;
      }
    }
  }

  // Функция для кнопок размеров (42/44/46/48/50/52/54/56/58/60/62)
  function handleButtonClick(button) {
    buttons.forEach((btn) => btn.classList.remove("btn-chart-active"));
    button.classList.add("btn-chart-active");

    currentSizeValue = button.value;
    updateDisplay(currentType, currentSizeValue);
  }

  // Функция для кнопкок типа размеров (Cm/In)
  function handleButtonClickType(button) {
    buttonsType.forEach((btn) =>
      btn.classList.remove("btn-item-size-type-active")
    );
    button.classList.add("btn-item-size-type-active");

    const prevType = currentType;
    currentType = button.value;

    let equivalentSize = currentSizeValue;

    if (prevType !== currentType) {
      equivalentSize = sizeMap[currentSizeValue] || currentSizeValue;
    }

    if (currentType === "Cm") {
      renderButtons(chestInterval);
    } else if (currentType === "In") {
      renderButtons(chestIntervalDuim);
    }

    const sameBtn = Array.from(buttons).find(
      (btn) => btn.value === equivalentSize
    );

    if (sameBtn) {
      handleButtonClick(sameBtn);
    } else if (buttons[0]) {
      handleButtonClick(buttons[0]);
    }
  }

  // обработчики кнопок
  buttonsType.forEach((btn) => {
    btn.addEventListener("click", () => handleButtonClickType(btn));
  });

  buttons.forEach((button) => {
    button.addEventListener("click", () => handleButtonClick(button));
  });

  // Выставление кнопки по умолчанию
  const baseBtn = Array.from(buttons).find(
    (btn) => btn.value === currentSizeValue
  );
  if (baseBtn) {
    handleButtonClick(baseBtn);
  }

  const baseBtnType = Array.from(buttonsType).find(
    (btn) => btn.value === currentType
  );
  if (baseBtnType) {
    handleButtonClickType(baseBtnType);
  }
});

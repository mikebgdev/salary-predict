$(document).ready(function () {
  $('select').selectize({
    sortField: 'text'
  });
});

let element = document.querySelector("#file-url");
let urlModel = element.dataset.url;

let model;

function normalizeInputData(inputData) {
  // Values obtained from the Python notebook
  const mean = [33.6230218, 0.5522544, 2.5618095, 94.13571215, 9.97760526];
  const std = [7.61521565, 0.50144773, 1.8155836, 58.44354711, 6.21291194];

  const normalizedData = inputData.map((row) => row.map((val, idx) => (val - mean[idx]) / std[idx]));
  const tensorData = tf.tensor2d(normalizedData, [1, 5]);

  return tensorData;
}


function getFormData() {
  const job = document.querySelector("#job").value;
  const education = document.querySelector("#education").value;
  const age = document.querySelector("#age").value;
  const experience = document.querySelector("#exp").value;
  const gender = 0; // Hardcoded porque no influye apenas

  const numberArray = [age, gender, education, job, experience].map((e) => {
    return parseInt(e);
  });

  // Returns inside another array to make it a 1,0 matrice
  return [numberArray];
}

function predict(normalizedData) {
  const prediction = model.predict(normalizedData);
  const result = prediction.dataSync()[0];

  return result;
}

function printResult(value) {
  value = Math.round(value);
  document.querySelector("#result").innerText = `$ ${value}`;
}


document.addEventListener("DOMContentLoaded", () => {
  const processFormButton = document.querySelector("#processForm");
  processFormButton.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = getFormData();
    const normalizedData = normalizeInputData(formData);
    const result = predict(normalizedData);
    printResult(result);
  });
});


(
async () => {
  model = await tf.loadLayersModel(urlModel);
  console.log("Model loaded");
}
)();

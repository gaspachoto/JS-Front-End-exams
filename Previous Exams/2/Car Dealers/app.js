window.addEventListener("load", solve);

function solve() {
  const inputDOMSelectors = {
    make: document.getElementById('make'),
    model: document.getElementById('model'),
    year: document.getElementById('year'),
    fuel: document.getElementById('fuel'),
    originalCost: document.getElementById('original-cost'),
    sellingPrice: document.getElementById('selling-price'),
  }

  const otherDOMSelectors = {
    publishBtn: document.getElementById('publish'),
    tableBody: document.getElementById('table-body'),
    soldCars: document.getElementById('cars-list'),
    profit: document.getElementById('profit'),
  }

  let totalProfit = 0;
  let currentCar = {};

  otherDOMSelectors.publishBtn.addEventListener('click', publishHandler);

  function publishHandler(event) {
    if (event) {
      event.preventDefault();
    }
    let allInputsAreFilled = Object.values(inputDOMSelectors).every(
      (input) => input.value !== '');

    if (!allInputsAreFilled) {
      return;
    }

    if (Number(inputDOMSelectors.originalCost.value) > Number(inputDOMSelectors.sellingPrice.value)) {
      return;
    }

    const { make, model, year, fuel, originalCost, sellingPrice } = inputDOMSelectors;
    currentCar = {
      make: make.value,
      model: model.value,
      year: year.value,
      fuel: fuel.value,
      originalCost: originalCost.value,
      sellingPrice: sellingPrice.value,
    }

    const tr = createElement('tr', otherDOMSelectors.tableBody, null, ['row']);
    createElement('td', tr, `${make.value}`);
    createElement('td', tr, `${model.value}`);
    createElement('td', tr, `${year.value}`);
    createElement('td', tr, `${fuel.value}`);
    createElement('td', tr, `${originalCost.value}`);
    createElement('td', tr, `${sellingPrice.value}`);
    const td = createElement('td', tr);
    const editBtn = createElement('button', td, 'Edit', ['action-btn', 'edit']);
    const sellBtn = createElement('button', td, 'Sell', ['action-btn', 'sell']);

    editBtn.addEventListener('click', editHandler);
    sellBtn.addEventListener('click', sellHandler);

    clearAllInputs();
  }

  function clearAllInputs() {
    Object.values(inputDOMSelectors)
        .forEach((input) => {
            input.value = '';
        })
  }

  function editHandler() {
    this.parentNode.parentNode.remove();
    for (const key in currentCar) {
      inputDOMSelectors[key].value = currentCar[key];
    }
  }

  function sellHandler() {
    const carRef = this.parentNode.parentNode;
    this.parentNode.parentNode.remove()
    let children = carRef.children;
    const make = children[0].textContent;
    const model = children[1].textContent;
    const year = children[2].textContent;
    const originalCost = children[4].textContent;
    const sellingPrice = children[5].textContent;

    currentProfit = Number(sellingPrice) - Number(originalCost)
    totalProfit += currentProfit;
    otherDOMSelectors.profit.textContent = `${totalProfit.toFixed(2)}`
    const li = createElement('li', otherDOMSelectors.soldCars, null, ['each-list']);
    createElement('span', li, `${make} ${model}`);
    createElement('span', li, `${year}`);
    createElement('span', li, `${currentProfit}`);
  }

  function createElement(type, parentNode, content, classes, id, attributes, useInnerHtml) {
    const htmlElement = document.createElement(type);
  
    if (content && useInnerHtml) {
      htmlElement.innerHTML = content;
    } else {
      if (content && type !== 'input') {
        htmlElement.textContent = content;
      }
  
      if (content && type === 'input') {
        htmlElement.value = content;
      }
    }
  
    if (classes && classes.length > 0) {
      htmlElement.classList.add(...classes);
    }
  
    if (id) {
      htmlElement.id = id;
    }
  
    // { src: 'link', href: 'http' }
    if (attributes) {
      for (const key in attributes) {
        htmlElement.setAttribute(key, attributes[key])
      }
    }
  
    if (parentNode) {
      parentNode.appendChild(htmlElement);
    }
  
    return htmlElement;
  }
}

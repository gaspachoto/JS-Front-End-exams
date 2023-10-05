window.addEventListener("load", solve);

function solve() {
  const inputDOMSelectors = {
    firstName: document.getElementById("first-name"),
    lastName: document.getElementById("last-name"),
    age: document.getElementById("age"),
    gender: document.getElementById("genderSelect"),
    dish: document.getElementById("task"),
  };

  const otherDOMSelectors = {
    progressCount: document.getElementById("progress-count"),
    inProgressContainer: document.getElementById("in-progress"),
    finishedContainer: document.getElementById("finished"),
    submitBtn: document.getElementById("form-btn"),
    clearBtn: document.getElementById("clear-btn"),
  };
  let currentDish = {};
  let numberOfDishes = 0;

  otherDOMSelectors.submitBtn.addEventListener("click", createDishHandler);
  otherDOMSelectors.clearBtn.addEventListener('click', clearHandler)

  function createDishHandler(event) {
    if (event) {
      event.preventDefault();
    }
    let allInputsAreFilled = Object.values(inputDOMSelectors).every(
      (input) => input.value !== '');

    if (!allInputsAreFilled) {
      return;
    }

    numberOfDishes += 1;
    otherDOMSelectors.progressCount.textContent = numberOfDishes;
    const { firstName, lastName, age, gender, dish } = inputDOMSelectors;
    currentDish = {
      firstName: firstName.value,
      lastName: lastName.value,
      age: age.value,
      gender: gender.value,
      dish: dish.value,
    }

    const li = createElement('li', otherDOMSelectors.inProgressContainer, null, ['each-line']);
    const article = createElement('article', li);
    createElement('h4', article, `${firstName.value} ${lastName.value}`);
    createElement('p', article, `${gender.value}, ${age.value}`);
    createElement('p', article, `Dish description: ${dish.value}`);
    const editBtn = createElement('button', li, 'Edit', ['edit-btn']);
    const completeBtn = createElement('button', li, 'Mark as complete', ['complete-btn']);

    editBtn.addEventListener('click', editDishHandler);
    completeBtn.addEventListener('click', completeHandler)

    clearAllInputs();
  }

  function clearAllInputs() {
    Object.values(inputDOMSelectors)
        .forEach((input) => {
            input.value = '';
        })
  }

  function editDishHandler() {
    this.parentNode.remove();
    numberOfDishes -= 1;
    otherDOMSelectors.progressCount.textContent = numberOfDishes;

    for (const key in currentDish) {
      inputDOMSelectors[key].value = currentDish[key];
    }
  }

  function completeHandler() {
    numberOfDishes -= 1;
    otherDOMSelectors.progressCount.textContent = numberOfDishes;
    const dishRef = this.parentNode;
    const editBtn = dishRef.querySelector('.edit-btn');
    const completeBtn = dishRef.querySelector('.complete-btn')
    editBtn.remove();
    completeBtn.remove();
    otherDOMSelectors.finishedContainer.appendChild(dishRef)
  }

  function clearHandler() {
    const parentRef = this.parentNode;
    const li = parentRef.querySelector('.each-line')
    const ul = document.getElementById('finished');
    ul.removeChild(li);
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

window.addEventListener("load", solve);

function solve() {
  const inputDOMSelectors = {
    title: document.getElementById('task-title'),
    category: document.getElementById('task-category'),
    content: document.getElementById('task-content'),
  }
  const otherDOMSelectors = {
    publishBtn: document.getElementById('publish-btn'),
    reviewContainer: document.getElementById('review-list'),
    publishedContainer: document.getElementById('published-list'),
  }

  let currentTask = {};
  otherDOMSelectors.publishBtn.addEventListener('click', publishHandler)

  function publishHandler(event) {
    if (event) {
        event.preventDefault();
      }
      let allInputsAreFilled = Object.values(inputDOMSelectors).every(
        (input) => input.value !== '');
  
      if (!allInputsAreFilled) {
        return;
      }

      const { title, category, content } = inputDOMSelectors;
      currentTask = {
        title: title.value,
        category: category.value,
        content: content.value,
      }

      const li = createElement('li', otherDOMSelectors.reviewContainer, null, ['rpost']);
      const article = createElement('article', li);
      createElement('h4', article, `${title.value}`);
      createElement('p', article, `Category: ${category.value}`);
      createElement('p', article, `Content: ${content.value}`);
      const editBtn = createElement('button', li, 'Edit', ['action-btn', 'edit']);
      const postBtn = createElement('button', li, 'Post', ['action-btn', 'post']);
      editBtn.addEventListener('click', editHandler);
      postBtn.addEventListener('click', postHandler);

      clearAllInputs();
  }

  function clearAllInputs() {
    Object.values(inputDOMSelectors)
        .forEach((input) => {
            input.value = '';
        })
  }

  function editHandler () {
    this.parentNode.remove();
    for (const key in currentTask) {
        inputDOMSelectors[key].value = currentTask[key];
      }
  }

  function postHandler () {
    let taskRef = this.parentNode;
    let editBtn = taskRef.querySelector('.edit');
    let postBtn = taskRef.querySelector('.post');
    editBtn.remove();
    postBtn.remove();
    otherDOMSelectors.publishedContainer.appendChild(taskRef)
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
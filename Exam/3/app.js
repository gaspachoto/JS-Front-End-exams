function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';
    const inputDOMSelectors = {
        title: document.getElementById('course-name'),
        type: document.getElementById('course-type'),
        description: document.getElementById('description'),
        teacher: document.getElementById('teacher-name'),
    }

    const otherDOMSelectors = {
        loadBtn: document.getElementById('load-course'),
        addBtn: document.getElementById('add-course'),
        editBtn: document.getElementById('edit-course'),
        taskContainer: document.getElementById('list')
    }
    let currentTasks = []
    let taskToEdit = {};

    otherDOMSelectors.loadBtn.addEventListener('click', loadHandler)
    otherDOMSelectors.addBtn.addEventListener('click', addHandler)
    otherDOMSelectors.editBtn.addEventListener('click', editHandler)

    function loadHandler(event) {
        if (event) {
            event.preventDefault();
        }
        otherDOMSelectors.taskContainer.innerHTML = '';

        fetch(BASE_URL)
            .then((res) => res.json())
            .then((taskInfo) => {
                currentTasks = Object.values(taskInfo);
                for (const { title, type, description, teacher, _id } of currentTasks) {
                    const div = createElement('div', otherDOMSelectors.taskContainer, null, ['container']);
                    div.id = _id;
                    createElement('h2', div, `${title}`);
                    createElement('h3', div, `${teacher}`);
                    createElement('h3', div, `${type}`);
                    createElement('h4', div, `${description}`);
                    const editBtn = createElement('button', div, `Edit Course`, ['edit-btn']);
                    const finishBtn = createElement('button', div, 'Finish Course', ['finish-btn']);

                    editBtn.addEventListener('click', editLoadHandler);
                    finishBtn.addEventListener('click', finishHandler)
                }
            })
            .catch((err) => console.error(err));
    }

    function addHandler(event) {
        if (event) {
            event.preventDefault();
        }

        const { title, type, description, teacher } = inputDOMSelectors;
        if (type.value !== 'Long' && type.value !== 'Medium' && type.value !== 'Short') {
            return;
        }
        const httpHeaders = {
            method: 'POST',
            body: JSON.stringify({
                "title": title.value,
                "type": type.value,
                "description": description.value,
                "teacher": teacher.value,
            })
        }
        fetch(BASE_URL, httpHeaders)
            .then(() => {
                loadHandler();
                clearAllInputs();
            })
            .catch((err) => console.error(err));
    }

    function editLoadHandler(event) {
        if (event) {
            event.preventDefault();
        }
        const id = this.parentNode.id
        taskToEdit = currentTasks.find((t) => t._id === id);
        console.log(taskToEdit)
        for (const key in inputDOMSelectors) {
            inputDOMSelectors[key].value = taskToEdit[key];
        }
        otherDOMSelectors.editBtn.removeAttribute('disabled');
        otherDOMSelectors.addBtn.setAttribute('disabled', true)
    }

    function editHandler(event) {
        if (event) {
            event.preventDefault();
        }
        const { title, type, description, teacher } = inputDOMSelectors;
        if (type.value !== 'Long' && type.value !== 'Medium' && type.value !== 'Short') {
            return;
        }
        const httpHeaders = {
            method: 'PUT',
            body: JSON.stringify({
                "title": title.value,
                "type": type.value,
                "description": description.value,
                "teacher": teacher.value,
                "_id": taskToEdit._id
            })
        }
        fetch(`${BASE_URL}${taskToEdit._id}`, httpHeaders)
            .then(() => {
                loadHandler();
                clearAllInputs();
                otherDOMSelectors.editBtn.setAttribute('disabled', true);
                otherDOMSelectors.addBtn.removeAttribute('disabled');
            })
            .catch((err) => console.error(err));
    }

    function finishHandler(event) {
        if (event) {
            event.preventDefault();
        }
        const id = this.parentNode.id;
        httpHeaders = {
            method: 'DELETE',
        }
        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(() => {
                loadHandler();
            })
            .catch((err) => console.error(err));
    }

    function clearAllInputs() {
        Object.values(inputDOMSelectors)
            .forEach((input) => {
                input.value = '';
            })
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

attachEvents();
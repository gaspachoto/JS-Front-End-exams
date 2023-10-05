function solve() {
    const inputDOMSelectors = {
        recipientName: document.getElementById('recipientName'),
        title: document.getElementById('title'),
        message: document.getElementById('message'),
    }

    const otherDOMSelectors = {
        addToList: document.getElementById('add'),
        reset: document.getElementById('reset'),
        listContainer: document.getElementById('list'),
        sentContainer: document.querySelector('.sent-list'),
        deleteContainer: document.querySelector('.delete-list'),
    }

    let mailInfo = {};

    otherDOMSelectors.addToList.addEventListener('click', addToListHandler)
    otherDOMSelectors.reset.addEventListener('click', resetHandler)

    function addToListHandler(event) {
        event.preventDefault();
        let allInputsAreFilled = Object.values(inputDOMSelectors)
            .every((input) => input.value !== '');
        
        if (!allInputsAreFilled) {
            return;
        }

        const { recipientName, title, message } = inputDOMSelectors;
        mailInfo = {
            recipientName: recipientName.value,
            title: title.value,
            message: message.value,
        }

        const li = createElement('li', otherDOMSelectors.listContainer, );
        createElement('h4', li, `Title: ${title.value}`);
        createElement('h4', li, `Recipient Name: ${recipientName.value}`);
        let span = createElement('span', li, `${message.value}`);
        const div = createElement('div', li, null, null, 'list-action');
        const sendBtn = createElement('button', div, 'Send', null, 'send');
        sendBtn.type = 'submit';
        const deleteBtn = createElement('button', div, 'Delete', null, 'delete');
        deleteBtn.type = 'submit';

        sendBtn.addEventListener('click', sendMailHandler);
        deleteBtn.addEventListener('click', deleteHandler)

        clearAllInputs();
    }

    function resetHandler(event) {
        event.preventDefault();
        clearAllInputs();
    }

    function clearAllInputs() {
        Object.values(inputDOMSelectors)
            .forEach((input) => {
                input.value = '';
            })
    }

    function sendMailHandler() {
        this.parentNode.parentNode.remove();
        const li = createElement('li', otherDOMSelectors.sentContainer);
        createElement('span', li, `To: ${mailInfo.recipientName}`);
        createElement('span', li, `Title: ${mailInfo.title}`);
        const div = createElement('div', li, null, ['btn']);
        const deleteBtn = createElement('button', div, 'Delete', ['delete']);

        deleteBtn.addEventListener('click', deleteHandler)
    }

    function deleteHandler() {
        this.parentNode.parentNode.remove();
        const li = createElement('li', otherDOMSelectors.deleteContainer);
        createElement('span', li, `To: ${mailInfo.recipientName}`);
        createElement('span', li, `Title: ${mailInfo.title}`);
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
solve()
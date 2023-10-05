function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/grocery/';
    const loadBtn = document.getElementById('load-product');
    const addBtn = document.getElementById('add-product');
    const updateBtn = document.getElementById('update-product');
    const tbody = document.getElementById('tbody')
    const inputDOMSelectors = {
        product: document.getElementById('product'),
        count: document.getElementById('count'),
        price: document.getElementById('price'),
    }
    let currentProducts = [];
    let productToEdit = {}

    loadBtn.addEventListener('click', loadHandler);
    updateBtn.addEventListener('click', updateHandler);
    addBtn.addEventListener('click', addProductHandler)

    function loadHandler(event) {
        if (event) {
            event.preventDefault();
        }

        tbody.innerHTML = '';

        fetch(BASE_URL)
            .then((res) => res.json())
            .then((productsInfo) => {
                currentProducts = Object.values(productsInfo);
                for (const { product, count, price, _id } of currentProducts) {
                    const tr = createElement('tr', tbody,);
                    tr.id = _id;
                    createElement('td', tr, `${product}`, ['name']);
                    createElement('td', tr, `${count}`, ['count-product']);
                    createElement('td', tr, `${price}`, ['product-price']);
                    const td = createElement('td', tr, null, ['btn']);
                    const updateBtn = createElement('button', td, 'Update', ['update']);
                    const deleteBtn = createElement('button', td, 'Delete', ['delete']);

                    updateBtn.addEventListener('click', loadEditHandler);
                    deleteBtn.addEventListener('click', deleteHandler);
                }
            })
            .catch((err) => console.error(err));
    }

    function loadEditHandler () {
        const id = this.parentNode.parentNode.id;
        productToEdit = currentProducts.find((p) => p._id === id);
        for (const key in inputDOMSelectors) {
            inputDOMSelectors[key].value = productToEdit[key];
        }
        updateBtn.removeAttribute('disabled');
        addBtn.setAttribute('disabled', true);
    }

    function updateHandler() {
        const { product, count, price } = inputDOMSelectors;
        const httpHeaders = {
            method: 'PATCH',
            body: JSON.stringify({
                "product": product.value,
                "count": count.value,
                "price": price.value,
            })
        }

        fetch(`${BASE_URL}${productToEdit._id}`, httpHeaders)
            .then(() => {
                loadHandler();
                clearAllInputs();
                updateBtn.setAttribute('disabled', true);
                addBtn.removeAttribute('disabled');
            })
            .catch((err) => console.error(err));
    }

    function clearAllInputs() {
        Object.values(inputDOMSelectors)
            .forEach((input) => {
                input.value = '';
            })
            
    }

    function addProductHandler(event) {
        if (event) {
            event.preventDefault();
        }
        const { product, count, price } = inputDOMSelectors;
        const httpHeaders = {
            method: 'POST',
            body: JSON.stringify({
                "product": product.value,
                "count": count.value,
                "price": price.value,
            })
        }

        fetch(BASE_URL, httpHeaders)
            .then(() => {
                loadHandler();
                clearAllInputs();
            })
            .catch((err) => console.error(err));
    }

    function deleteHandler(event) {
        if (event) {
            event.preventDefault();
        }
        const id = this.parentNode.parentNode.id;
        httpHeaders = {
            method: 'DELETE',
        }

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(() => {
                loadHandler();
            })
            .catch((err) => console.error(err));
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
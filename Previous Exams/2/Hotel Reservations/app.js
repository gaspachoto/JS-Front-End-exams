window.addEventListener('load', solve);

function solve() {
    const inputDOMSelectors = {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        checkIn: document.getElementById('date-in'),
        checkOut: document.getElementById('date-out'),
        peopleCount: document.getElementById('people-count'),
    }

    const otherDOMSelectors = {
        nextBtn: document.getElementById('next-btn'),
        infoContainer: document.querySelector('.info-list'),
        confirmContainer: document.querySelector('.confirm-list'),
        verification: document.getElementById('verification'),
    }

    let hotelReservation = {};  

    otherDOMSelectors.nextBtn.addEventListener('click', makeReservationHandler)

    function makeReservationHandler(event) {
        event.preventDefault();
        let allInputsAreFilled = Object.values(inputDOMSelectors)
            .every((input) => input.value !== '');
        
        if (!allInputsAreFilled) {
            return;
        }

        const { firstName, lastName, checkIn, checkOut, peopleCount } = inputDOMSelectors;
        hotelReservation = {
            firstName: firstName.value,
            lastName: lastName.value,
            checkIn: checkIn.value,
            checkOut: checkOut.value,
            peopleCount: peopleCount.value, 
        }

        const li = createElement('li', otherDOMSelectors.infoContainer, null, ['reservation-content']);
        const article = createElement('article', li);
        createElement('h3', article, `Name: ${firstName.value} ${lastName.value}`);
        createElement('p', article, `From date: ${checkIn.value}`);
        createElement('p', article, `To date: ${checkOut.value}`);
        createElement('p', article, `For ${peopleCount.value} people`);
        let editBtn = createElement('button', li, 'Edit', ['edit-btn']);
        let continueBtn = createElement('button', li, 'Continue', ['continue-btn']);

        editBtn.addEventListener('click', editReservationHandler);
        continueBtn.addEventListener('click', continueHandler)

        otherDOMSelectors.nextBtn.setAttribute('disabled', true);
        clearAllInputs();
    }

    function clearAllInputs() {
        Object.values(inputDOMSelectors)
            .forEach((input) => {
                input.value = '';
            })
    }

    function editReservationHandler() {
        this.parentNode.remove();
        for (const key in hotelReservation) {
            inputDOMSelectors[key].value = hotelReservation[key];
        }
        otherDOMSelectors.nextBtn.removeAttribute('disabled')
    }

    function continueHandler() {
        const reservationRef = this.parentNode;
        const editBtn = reservationRef.querySelector('.edit-btn');
        const continueBtn = reservationRef.querySelector('.continue-btn');
        editBtn.classList.remove('edit-btn');
        editBtn.classList.add('confirm-btn');
        editBtn.textContent = 'Confirm';
        editBtn.removeEventListener('click', editReservationHandler);
        let confirmBtn = editBtn;
        continueBtn.classList.remove('continue-btn');
        continueBtn.classList.add('cancel-btn');
        continueBtn.textContent = 'Cancel';
        continueBtn.removeEventListener('click', continueHandler);
        let cancelBtn = continueBtn;
        otherDOMSelectors.confirmContainer.appendChild(reservationRef);

        confirmBtn.addEventListener('click', confirmHandler);
        cancelBtn.addEventListener('click', cancelHandler)
    }

    function confirmHandler() {
      otherDOMSelectors.verification.classList.add('reservation-confirmed');
      otherDOMSelectors.verification.textContent = 'Confirmed.';
      otherDOMSelectors.nextBtn.removeAttribute('disabled');
      this.parentNode.remove();
    }

    function cancelHandler() {
      otherDOMSelectors.verification.classList.add('reservation-cancelled');
      otherDOMSelectors.verification.textContent = 'Cancelled.';
      otherDOMSelectors.nextBtn.removeAttribute('disabled');
      this.parentNode.remove();
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



    
    

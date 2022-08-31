/*=============== SHOW MENU AND REMOVE MENU ===============*/
const   buttonToggle = document.querySelector('#nav-toggle'),
        navMenu = document.querySelector('#nav-menu');

buttonToggle.addEventListener('click', () => {
    if(buttonToggle.classList.value == 'nav__toggle') {
        return  buttonToggle.classList.add('active'),
                navMenu.classList.add('show-menu');
    }

    buttonToggle.classList.remove('active');
    navMenu.classList.remove('show-menu');
});

/*=============== CHANGE BACKGROUND HEADER ===============*/
const headerScroll = () => {
    const header = document.querySelector('#header');

    this.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
}

window.addEventListener('scroll', headerScroll);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const section = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    section.forEach(current => {
        const   sectionHeight = current.offsetHeight,
                sectionTop = current.offsetTop - 58,
                sectionId = current.getAttribute('id'),
                sectionClass = document.querySelector(`.nav__menu a[href*= ${sectionId}]`);
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionClass.classList.add('active-link');
        } else {
            sectionClass.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.querySelector('#scroll-up');

    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
}

window.addEventListener('scroll', scrollUp);

/*=============== SCROLL REVEAL ANIMATION ===============*/


/*=============== CALCULATE JS ===============*/
const   calculateForm = document.querySelector('#calculate-form'),
        calculateCm = document.querySelector('#calculate-cm'),
        calculateKg = document.querySelector('#calculate-kg'),
        msgCalculate = document.querySelector('#calculate-message');

const verifyForm = e => {
    e.preventDefault();
    if(calculateCm.value === '' && calculateKg.value === '') {
        return msg('Los campos son obligatorios!! ', false, msgCalculate);
    }

    if(calculateCm.value === '') {
        return msg('Debe agregar tu altura', false, msgCalculate);
    }

    if(calculateKg.value === '') {
        return msg('Debes agregar tu peso', false, msgCalculate);
    }

    if(calculateCm.value > 300) {
        clearForm();
        return msg('No puedes exceder más de 300 cm', false, msgCalculate);
    }

    if(calculateKg.value > 240) {
        clearForm();
        return msg('No puedes exceder más de 240 Kg', false, msgCalculate);
    }

    calculatorIMC();
}

const calculatorIMC = () => {
    const   cm = calculateCm.value / 100;
            kg = calculateKg.value,
            imc = Math.round(kg / (cm * cm));
    
    if(imc < 18.5) {
        clearForm();
        return msg(`Tu IMC es de ${imc} y estas flaco 😥`, true, msgCalculate);
    }

    if(imc < 25) {
        clearForm();
        return msg(`Tu IMC es de ${imc} y estas saludable 🥳`, true, msgCalculate);
    }

    clearForm();
    return msg(`Tu IMC es de ${imc} y tienes exceso de peso 😓`, true, msgCalculate);
}

const clearForm = () => {
    calculateCm.value = '';
    calculateKg.value = '';
}

// Message Success or Error
const msg = (message, type, show) => {
    if(type) {
        show.classList.remove('danger');
        show.classList.add('success');
        show.textContent = message;
    } else {
        show.classList.remove('success');
        show.classList.add('danger');
        show.textContent = message;
    }
}

calculateForm.addEventListener('submit', verifyForm);

/*=============== EMAIL JS ===============*/
const   contactForm = document.querySelector('#contact-form')
        userContact = document.querySelector('#contact-user'),
        contactMessage = document.querySelector('#contact-message');

const sendEmail = e => {
    e.preventDefault();

    if(userContact.value === '') {
        return msg('Debes colocar un correo elétronico de contacto', false, contactMessage);
    }

    emailjs.sendForm('service_rkwnuxq', 'template_7fpnncm', '#contact-form', 'RkzuovhCoeVHDHP-U')
    .then(() => {
        userContact.value = '';
        msg('Gracias por suscribirte 🥰', true, contactMessage);
    }, () => {
        msg('Oops!! Ocurrió un error', false, contactMessage);
    });
}

contactForm.addEventListener('submit', sendEmail);
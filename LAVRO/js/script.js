'use strict';


/* =========================
   Active Navigation Section
========================= */

const navLinks = Array.from(
  document.querySelectorAll('.nav-link[href^="#"]')
);

const trackedSections = navLinks
  .map((link) => {
    return document.querySelector(link.getAttribute('href'));
  })
  .filter(Boolean);


function updateActiveNavigation() {

  const triggerPoint = window.scrollY + 180;

  let currentSectionId = '';


  trackedSections.forEach((section) => {

    if (triggerPoint >= section.offsetTop) {
      currentSectionId = section.id;
    }

  });


  navLinks.forEach((link) => {

    const isActive =
      link.getAttribute('href') === `#${currentSectionId}`;

    link.classList.toggle('active', isActive);

    link.setAttribute(
      'aria-current',
      isActive ? 'page' : 'false'
    );

  });

}


window.addEventListener(
  'scroll',
  updateActiveNavigation,
  { passive: true }
);

window.addEventListener(
  'load',
  updateActiveNavigation
);



/* =========================
   Close Mobile / Tablet Menu
========================= */

navLinks.forEach((link) => {

  link.addEventListener('click', () => {

    const navbarCollapse =
      document.getElementById('mainNavbar');


    if (
      navbarCollapse &&
      navbarCollapse.classList.contains('show')
    ) {

      bootstrap.Collapse
        .getOrCreateInstance(navbarCollapse)
        .hide();

    }

  });

});



/* =========================
   Language Switcher
========================= */

const langEn =
  document.getElementById('langEn');

const langLao =
  document.getElementById('langLao');


function setLanguageButtonState(language) {

  const englishActive =
    language === 'en';


  langEn.classList.toggle(
    'active',
    englishActive
  );

  langLao.classList.toggle(
    'active',
    !englishActive
  );


  langEn.setAttribute(
    'aria-pressed',
    String(englishActive)
  );

  langLao.setAttribute(
    'aria-pressed',
    String(!englishActive)
  );

}


/*
  IMPORTANT:

  Approved Lao website copy မထည့်ရသေးပါ။

  Lao Copy ရလာတဲ့အချိန်မှာ
  ဒီ Language Switcher section မှာ
  English / Lao text replacement system
  ချိတ်မယ်။
*/


langEn.addEventListener('click', () => {

  document.documentElement.lang = 'en';

  setLanguageButtonState('en');

});


langLao.addEventListener('click', () => {

  console.info(
    'Approved Lao copy is not connected yet.'
  );

});



/* =========================
   Contact Form
========================= */

const contactForm =
  document.getElementById('contactForm');

const contactSubmit =
  document.getElementById('contactSubmit');

const formStatus =
  document.getElementById('formStatus');


function setFormStatus(
  message,
  type = ''
) {

  formStatus.textContent = message;

  formStatus.classList.remove(
    'is-success',
    'is-error'
  );


  if (type) {

    formStatus.classList.add(type);

  }

}



contactForm.addEventListener(
  'submit',
  async (event) => {

    event.preventDefault();


    /* Check HTML validation */

    if (!contactForm.checkValidity()) {

      contactForm.reportValidity();

      return;

    }


    /* Form endpoint */

    const endpoint =
      contactForm.dataset.endpoint.trim();


    if (!endpoint) {

      setFormStatus(
        'Form endpoint is not configured yet.',
        'is-error'
      );

      return;

    }


    /* Prevent duplicate click */

    if (contactSubmit.disabled) {
      return;
    }


    contactSubmit.disabled = true;

    contactSubmit.textContent =
      'Sending…';


    setFormStatus(
      'Sending your message…'
    );


    try {

      const response =
        await fetch(endpoint, {

          method: 'POST',

          body: new FormData(contactForm),

          headers: {
            Accept: 'application/json'
          }

        });


      if (!response.ok) {

        throw new Error(
          `Form submission failed with status ${response.status}`
        );

      }


      /* Success */

      contactForm.reset();


      setFormStatus(
        'Thank you. Your message has been sent.',
        'is-success'
      );


    } catch (error) {

      console.error(error);


      setFormStatus(
        'Something went wrong. Please try again.',
        'is-error'
      );


    } finally {

      contactSubmit.disabled = false;

      contactSubmit.textContent =
        'Contact Us';

    }

  }
);
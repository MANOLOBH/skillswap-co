/* ==========================================================================
   SkillSwap · Interactividad de la landing page
   JavaScript vanilla, sin dependencias.
   ========================================================================== */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. Año actual en el footer
     ------------------------------------------------------------------------ */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------------------
     2. Header: fondo sólido y sombra al hacer scroll
     ------------------------------------------------------------------------ */
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------------
     3. Menú móvil (hamburguesa)
     ------------------------------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var toggleLabel = toggle.querySelector('.visually-hidden');
  var desktopQuery = window.matchMedia('(min-width: 900px)');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggleLabel.textContent = open ? 'Cerrar menú' : 'Abrir menú';
    nav.classList.toggle('is-open', open);
    header.classList.toggle('is-open', open);
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Cierra al pulsar un enlace del menú
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  // Cierra con Escape y devuelve el foco al botón
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  // Cierra al hacer clic fuera del header
  document.addEventListener('click', function (e) {
    if (toggle.getAttribute('aria-expanded') === 'true' && !header.contains(e.target)) setMenu(false);
  });

  // Al pasar a escritorio, resetea el estado
  desktopQuery.addEventListener('change', function (e) {
    if (e.matches) setMenu(false);
  });

  /* ------------------------------------------------------------------------
     4. Enlace activo del menú según la sección visible
     ------------------------------------------------------------------------ */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav__link'));
  var linkById = {};
  navLinks.forEach(function (link) {
    linkById[link.getAttribute('href').slice(1)] = link;
  });

  function setActive(id) {
    navLinks.forEach(function (link) {
      var active = link === linkById[id];
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window) {
    // Observa todas las secciones; solo las del menú activan un enlace.
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main section[id]').forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ------------------------------------------------------------------------
     5. Animaciones de aparición al hacer scroll
     ------------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealEls.forEach(function (el, i) {
      // Pequeño escalonado entre elementos hermanos
      var siblings = el.parentElement.querySelectorAll(':scope > .reveal');
      var index = Array.prototype.indexOf.call(siblings, el);
      el.style.transitionDelay = Math.min(index, 4) * 80 + 'ms';
      revealObserver.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     6. Simulador de match (datos de ejemplo, todo en el cliente)
     ------------------------------------------------------------------------ */

  // Perfiles ficticios. Se agrupan por región para que, si alguien enseña un
  // idioma, el perfil de ejemplo venga de un lugar donde se habla.
  var SAMPLE_PEOPLE = {
    latam: [
      { name: 'Valentina Restrepo', city: 'Medellín, Colombia', variant: 'Español de Colombia', mode: 'Online o en persona' },
      { name: 'Santiago Gómez', city: 'Medellín, Colombia', variant: 'Español de Colombia', mode: 'Online o en persona' },
      { name: 'Camila Herrera', city: 'Bogotá, Colombia', variant: 'Español de Colombia', mode: 'Online' },
      { name: 'Mateo Vargas', city: 'Cali, Colombia', variant: 'Español de Colombia', mode: 'Online' },
      { name: 'Daniela Ríos', city: 'Ciudad de México, México', variant: 'Español de México', mode: 'Online' },
      { name: 'Andrés Cardona', city: 'Lima, Perú', variant: 'Español de Perú', mode: 'Online' },
      { name: 'Sofía Mejía', city: 'Buenos Aires, Argentina', variant: 'Español de Argentina', mode: 'Online' },
      { name: 'Lucía Fernández', city: 'Madrid, España', variant: 'Español de España', mode: 'Online' }
    ],
    'Alemán': [
      { name: 'Jonas Becker', city: 'Berlín, Alemania', variant: 'Habla alemán', mode: 'Online' },
      { name: 'Lena Fischer', city: 'Múnich, Alemania', variant: 'Habla alemán', mode: 'Online' }
    ],
    'Inglés': [
      { name: 'Emily Carter', city: 'Toronto, Canadá', variant: 'Habla inglés', mode: 'Online' },
      { name: 'James Walker', city: 'Londres, Reino Unido', variant: 'Habla inglés', mode: 'Online' }
    ],
    'Francés': [
      { name: 'Chloé Martin', city: 'Lyon, Francia', variant: 'Habla francés', mode: 'Online' }
    ],
    'Portugués': [
      { name: 'Lucas Souza', city: 'São Paulo, Brasil', variant: 'Habla portugués', mode: 'Online' },
      { name: 'Beatriz Lima', city: 'Porto Alegre, Brasil', variant: 'Habla portugués', mode: 'Online' }
    ]
  };

  var AVATAR_CLASSES = ['avatar--red', 'avatar--teal', 'avatar--yellow', 'avatar--navy'];
  var lastPersonName = null;

  function pickRandom(list, avoidName) {
    var options = list.filter(function (p) { return p.name !== avoidName; });
    if (!options.length) options = list;
    return options[Math.floor(Math.random() * options.length)];
  }

  function initials(name) {
    return name.split(' ').slice(0, 2).map(function (w) { return w.charAt(0); }).join('').toUpperCase();
  }

  // El match enseña lo que tú quieres aprender: si es un idioma extranjero,
  // buscamos en su grupo; si no, en Latinoamérica.
  function findMatch(learn) {
    var pool = SAMPLE_PEOPLE[learn] || SAMPLE_PEOPLE.latam;
    return pickRandom(pool, lastPersonName);
  }

  // Crea un elemento con clase y texto (evita innerHTML con datos)
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function svgIcon(id) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('aria-hidden', 'true');
    var use = document.createElementNS(ns, 'use');
    use.setAttribute('href', '#' + id);
    svg.appendChild(use);
    return svg;
  }

  function renderMatch(person, teach, learn) {
    var card = el('article', 'match-card');
    card.setAttribute('aria-label', 'Match encontrado: ' + person.name);

    var avatar = el('span', 'avatar ' + AVATAR_CLASSES[Math.floor(Math.random() * AVATAR_CLASSES.length)], initials(person.name));
    avatar.setAttribute('aria-hidden', 'true');

    var info = el('div');
    info.appendChild(el('p', 'match-card__name', person.name));
    var city = el('p', 'match-card__city');
    city.appendChild(svgIcon('i-pin'));
    city.appendChild(document.createTextNode(person.city));
    info.appendChild(city);

    // Él/ella enseña lo que tú quieres aprender, y quiere aprender lo que tú enseñas
    var swap = el('p', 'match-card__swap', 'Enseña ' + learn + ' · Quiere aprender ' + teach);

    var meta = el('p', 'match-card__meta');
    var tag = el('span', 'match-card__tag');
    tag.appendChild(svgIcon('i-swap'));
    tag.appendChild(document.createTextNode(person.mode));
    meta.appendChild(tag);
    meta.appendChild(el('span', '', person.variant + ' · Perfil de ejemplo'));

    card.appendChild(avatar);
    card.appendChild(info);
    card.appendChild(swap);
    card.appendChild(meta);
    return card;
  }

  var matchForm = document.getElementById('match-form');
  var matchResult = document.getElementById('match-result');
  var teachSelect = document.getElementById('sim-teach');
  var learnSelect = document.getElementById('sim-learn');

  function showSimError(message, field) {
    matchResult.replaceChildren(el('p', 'simulator__error', message));
    if (field) field.focus();
  }

  matchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var teach = teachSelect.value;
    var learn = learnSelect.value;

    if (!teach) return showSimError('Elige qué puedes enseñar.', teachSelect);
    if (!learn) return showSimError('Elige qué quieres aprender.', learnSelect);
    if (teach === learn) return showSimError('Elige dos habilidades distintas: la idea es intercambiar.', learnSelect);

    var person = findMatch(learn);
    lastPersonName = person.name;
    matchResult.replaceChildren(renderMatch(person, teach, learn));
    matchForm.querySelector('.simulator__btn').textContent = 'Buscar otro match';
  });

  /* ------------------------------------------------------------------------
     7. FAQ: acordeón accesible
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.accordion__trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));
      trigger.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
    });
  });

  /* ------------------------------------------------------------------------
     8. Formulario de lista de espera: validación + mensaje de éxito
     ------------------------------------------------------------------------ */
  var waitlistForm = document.getElementById('waitlist-form');
  var successBox = document.getElementById('waitlist-success');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var submittedOnce = false;

  // Reglas de validación: devuelven el mensaje de error o '' si es válido
  var RULES = {
    name: function (v) { return v.trim().length < 2 ? 'Escribe tu nombre.' : ''; },
    email: function (v) {
      if (!v.trim()) return 'Escribe tu email.';
      return EMAIL_RE.test(v.trim()) ? '' : 'Revisa el email. Debe tener un formato como nombre@correo.com.';
    },
    university: function (v) { return v.trim() ? '' : 'Indica tu universidad.'; },
    teach: function (v) { return v.trim() ? '' : 'Cuéntanos al menos una cosa que puedas enseñar.'; },
    learn: function (v) { return v.trim() ? '' : 'Cuéntanos qué te gustaría aprender.'; },
    privacy: function (v, input) { return input.checked ? '' : 'Para unirte necesitas aceptar la política de privacidad.'; }
  };

  function validateField(input) {
    var rule = RULES[input.name];
    if (!rule) return true;
    var message = rule(input.value, input);
    var errorEl = document.getElementById(input.getAttribute('aria-describedby'));
    errorEl.textContent = message;
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
    return !message;
  }

  // Tras el primer intento, valida en vivo mientras el usuario corrige
  waitlistForm.addEventListener('input', function (e) {
    if (submittedOnce || e.target.getAttribute('aria-invalid') === 'true') validateField(e.target);
  });
  waitlistForm.addEventListener('change', function (e) {
    if (e.target.type === 'checkbox' && submittedOnce) validateField(e.target);
  });
  waitlistForm.addEventListener('focusout', function (e) {
    if (e.target.value && e.target.type !== 'checkbox') validateField(e.target);
  });

  waitlistForm.addEventListener('submit', function (e) {
    e.preventDefault();
    submittedOnce = true;

    var firstInvalid = null;
    Array.prototype.forEach.call(waitlistForm.elements, function (input) {
      if (!input.name) return;
      if (!validateField(input) && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // Datos listos para enviar (no se envían a ningún servidor).
    var data = Object.fromEntries(new FormData(waitlistForm).entries());
    void data;
    // TODO: conectar con backend o Formspree
    // Ejemplo:
    // fetch('https://formspree.io/f/TU_ID', {
    //   method: 'POST',
    //   headers: { 'Accept': 'application/json' },
    //   body: new FormData(waitlistForm)
    // });

    waitlistForm.hidden = true;
    successBox.hidden = false;
    successBox.focus();
  });
})();

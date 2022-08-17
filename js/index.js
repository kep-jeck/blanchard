document.addEventListener('DOMContentLoaded', function () {
  /***header***/

  /*dropdown*/

  const params = {
    btnClassName: "header__dropdown",
    dropClassName: "dropdown__main",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  }

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(params.disabledClassName, params.activeClassName);
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(`.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`);

      if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(`.${params.dropClassName}[data-target="${path}"]`);

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });

  }

  setMenuListener();

  /*scroll*/

  const simpleBar1 = new SimpleBar(document.getElementById('scroll-1'), { autoHide: false, scrollbarMaxSize: 28 });
  simpleBar1.recalculate();

  const simpleBar2 = new SimpleBar(document.getElementById('scroll-2'), { autoHide: false, scrollbarMaxSize: 28 });
  simpleBar2.recalculate();

  const simpleBar3 = new SimpleBar(document.getElementById('scroll-3'), { autoHide: false, scrollbarMaxSize: 28 });
  simpleBar3.recalculate();

  const simpleBar4 = new SimpleBar(document.getElementById('scroll-4'), { autoHide: false, scrollbarMaxSize: 28 });
  simpleBar4.recalculate();

  const simpleBar5 = new SimpleBar(document.getElementById('scroll-5'), { autoHide: false, scrollbarMaxSize: 28 });
  simpleBar5.recalculate();


  /*burger*/

  let body = document.querySelector('body');
  let html = document.querySelector('html');
  let burgerBtn = document.querySelector('#header__burger');
  let burgerMenu = document.querySelector('#header__menu');
  let burgerMenuClose = document.querySelector('.header__menu-close-btn');

  burgerBtn.addEventListener('click', function () {
    burgerMenu.classList.add('is-active');
    body.classList.add('overflow--lock');
    html.classList.add('overflow--lock');
  });

  burgerMenuClose.addEventListener('click', function () {
    burgerMenu.classList.remove('is-active');
    body.classList.remove('overflow--lock');
    html.classList.remove('overflow--lock');
  });

  /*search*/

  let searchBtn = document.querySelector('.header__top-search');
  let searchForm = document.querySelector('.header__search-container');
  let searchFormClose = document.querySelector('.header__top-search-close');

  searchBtn.addEventListener('click', function () {
    searchForm.classList.add('is-open');
  })


  searchFormClose.addEventListener('click', function () {
    searchForm.classList.remove('is-open');
  });

  /*scroll-link*/

  const anchors = document.querySelectorAll('[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (event) {
      event.preventDefault();

      let burgerBtn = document.querySelector('#header__burger');
      let burgerMenu = document.querySelector('#header__menu');
      let body = document.querySelector('body');
      let html = document.querySelector('html');

      if (burgerMenu.classList.contains('is-active')) {
        burgerMenu.classList.remove('is-active');
        burgerBtn.classList.remove('active');
        body.classList.remove('overflow--lock');
        html.classList.remove('overflow--lock');
      };

      const blockID = anchor.getAttribute('href');
      document.querySelector('' + blockID).scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    });
  }

  /***hero***/

  const swiper = new Swiper('.swiper', {
    allowTouchMove: false,
    loop: true,
    effect: 'fade',
    speed: 10000,
    autoplay: {
      delay: 10000
    }
  });

  /***galery***/

  /*slider*/

  let gallerySlider = new Swiper(".gallery__slider-container", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".gallery .gallery__pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".nav-next",
      prevEl: ".nav-prev"
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1
      },

      571: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 10
      },

      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 35
      },

      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 35
      },

      1199: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });

  /*select*/

  const element = document.querySelector('#selectCustom');
  const choices = new Choices(element, {
    searchEnabled: false,
    position: 'bottom',
    placeholder: true,
    itemSelectText: ''
  });

  /***catalog***/

  /*accordion*/

  (() => {
    new Accordion(".js-accordion-container", {
      openOnInit: [0]
    });
  })();

  /*tab*/

  var jsTriggers = document.querySelectorAll('.js-tab-trigger');

  jsTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var id = this.getAttribute('data-tab'),
        content = document.querySelector('.js-tab-content[data-tab="' + id + '"]'),
        activeTrigger = document.querySelector('.js-tab-trigger.active'),
        activeContent = document.querySelector('.js-tab-content.active');

      activeTrigger.classList.remove('active');
      trigger.classList.add('active');

      activeContent.classList.remove('active');
      content.classList.add('active');
    });
  });


  /***events***/

  let eventsSlider = new Swiper(".events__slider-container", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,

    navigation: {
      nextEl: ".btn-next",
      prevEl: ".btn-prev"
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1
      },

      571: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 30
      },

      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32
      },

      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30
      },

      1920: {
        slidesPerView: 3,
        spaceBetween: 50
      }

    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });

  /***projects***/

  /*tooltip*/

  (() => {
    tippy('.js-tooltip-btn', {
      theme: "custom-tooltip",
      maxWidth: 264,
    });
  })();

  /*slider*/

  let projectsSlider = new Swiper(".projects__slider-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,

    navigation: {
      nextEl: ".next-partner",
      prevEl: ".prev-partner"
    },

    breakpoints: {
      320: {
        slidesPerView: 1
      },

      571: {
        slidesPerView: 2,
        spaceBetween: 20
      },

      768: {
        slidesPerView: 2,
        spaceBetween: 33
      },

      1024: {
        slidesPerView: 2,
        spaceBetween: 50
      },

      1199: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });

  /***contacts***/

  /*map*/

  ymaps.ready(init);
  function init() {
    const mapElem = document.querySelector('#map');
    const myMap = new ymaps.Map(
      "map",
      {
        center: [55.75846806898367, 37.60108849999989],
        zoom: 17,
        controls: ['geolocationControl', 'zoomControl']
      },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition: { top: "200px", right: "20px" },
        geolocationControlFloat: 'none',
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "120px", right: "20px" }
      }
    );

    myMap.behaviors.disable('scrollZoom');

    const myPlacemark = new ymaps.Placemark(
      [55.75846806898367, 37.60108849999989],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "img/placemarck.svg",
        iconImageSize: [20, 20],
        iconImageOffset: [-20, -40],
      }
    );

    myMap.geoObjects.add(myPlacemark);
    myMap.container.fitToViewport();
  }


  /*form*/

  var selector = document.querySelector("input[type='tel']");

  var im = new Inputmask("+7(999)-999-99-99");
  im.mask(selector);


  const validation = new JustValidate('.contacts__form');

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Как вас зовут?',
      },
      {
        rule: 'customRegexp',
        value: /^[A-Za-z-Яа-яЁё]+$/,
        errorMessage: 'Недопустимый формат',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Имя слишком короткое',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Имя слишком длинное',
      },
    ])

    .addField('#number', [
      {
        rule: 'required',
        errorMessage: 'Укажите ваш телефон',
      },

    ])

    .onSuccess((event) => {
      console.log('Validation passes and form submitted', event);

      let formData = new FormData(event.target);

      console.log(...formData);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      event.target.reset();
    });
});


// dropdown index
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");
  const details = document.getElementById("details");

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      details.classList.toggle("open");
    });
  }
});

// faq
document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".faq__question");

  questions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector(".faq__icon");

      answer.classList.toggle("open");
      question.classList.toggle("open");
    });
  });
});

// swiper slider
document.addEventListener("DOMContentLoaded", () => {
  const swiperEl = document.querySelector(".swiper");
  if (!swiperEl || typeof Swiper === "undefined") return;

  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,

    slidesPerView: 3,
    spaceBetween: 15,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      300: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 2,
      },
      800: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      2000: {
        slidesPerView: 3,
      },
    },

    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

// dropdown header menu
document.addEventListener("DOMContentLoaded", () => {
  const servicesLink = document.getElementById("services-link");

  servicesLink.addEventListener("click", function (event) {
    event.preventDefault();
    const dropdown = this.querySelector(".dropdown");
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", function (event) {
    const dropdown = document.querySelector(".dropdown");

    if (
      !servicesLink.contains(event.target) &&
      !event.target.closest(".dropdown")
    ) {
      dropdown.classList.remove("show");
    }
  });

  const dropdownItems = document.querySelectorAll(".dropdown a");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      document.querySelector(".dropdown").classList.remove("show");
    });
  });
});

// modal discount
document.addEventListener("DOMContentLoaded", () => {
  // date
  const endTime = new Date("December 31, 2025 23:59:59").getTime();
  const shownKey = "promoShown";

  if (Date.now() > endTime) {
    document.getElementById("promoBtn")?.remove();
    document.getElementById("promoModal")?.remove();
    return;
  }

  const btn = document.createElement("button");
  btn.id = "promoBtn";
  btn.className = "promo-btn";
  btn.textContent = "🎁 Акция";
  document.body.appendChild(btn);

  const modal = document.createElement("div");
  modal.id = "promoModal";
  modal.className = "promo-modal";
  modal.innerHTML = `
    <div id="promoOverlay" class="promo-modal__overlay"></div>
    <div class="promo-modal__dialog">
      <div class="dotted-div">
        <button id="promoClose" class="promo-modal__close">×</button>
        <h3 class="promo-modal__title">При оплате всей суммы сразу скидка <br>10&nbsp;000&nbsp;рублей!</h3>
        <p class="promo-modal__subtitle">Время до окончания акции:</p>
        <div id="promoCountdown" class="countdown">00д 00ч 00м</div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const overlay = modal.querySelector("#promoOverlay");
  const close = modal.querySelector("#promoClose");
  const timerEl = modal.querySelector("#promoCountdown");

  /* —-- таймер —-- */
  const updateTimer = () => {
    const diff = endTime - Date.now();
    if (diff <= 0) {
      btn.style.display = "none";
      modal.style.display = "none";
      clearInterval(int);
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    timerEl.textContent = `${d}д ${h.toString().padStart(2, "0")}ч ${m
      .toString()
      .padStart(2, "0")}м`;
  };
  updateTimer();
  const int = setInterval(updateTimer, 60000);

  /* —-- показать / скрыть —-- */
  const show = () => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };
  const hide = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  };

  btn.addEventListener("click", show);
  close.addEventListener("click", hide);
  overlay.addEventListener("click", hide);

  /* —-- стартовая логика —-- */
  if (Date.now() < endTime) {
    btn.style.display = "block";
    if (!localStorage.getItem(shownKey)) {
      localStorage.setItem(shownKey, "1");
      show();
    }
  } else {
    btn.style.display = "none";
  }
});

// modal form
document.addEventListener("DOMContentLoaded", () => {
  const TRIGGER_CLASS = "contactBtn"; // класс у всех кнопок
  const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/bankrot134@mail.ru";

  let modal = document.getElementById("contactModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.className = "contact-modal";
    modal.id = "contactModal";
    modal.innerHTML = `
      <div class="contact-modal__overlay" id="contactOverlay"></div>
      <div class="contact-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="ctTitle">
        <div class="contact-modal__pad">
          <div class="dotted-div">
            <button class="contact-modal__close" id="contactClose" aria-label="Закрыть">×</button>
            <h3 class="contact-modal__title" id="ctTitle">Связаться с нами</h3>
            <p class="contact-modal__subtitle">Введите контактные данные — мы напишем вам на почту или телефон.</p>

            <form class="contact-form" id="contactForm" novalidate>
              <div class="contact-form__row">
                <div>
                  <input class="contact-input" id="cfName" name="name" type="text" placeholder="Ваше имя*" required />
                  <div class="input-error" id="errName"></div>
                </div>
                <div>
                  <input class="contact-input" id="cfPhone" name="phone" type="tel" placeholder="Телефон*" required/>
                  <div class="input-error" id="errPhone"></div>
                </div>
              </div>
            

              <input type="text" name="_honey" style="display:none">
              <input type="hidden" name="_subject" value="Заявка с сайта">
              <input type="hidden" name="_template" value="table">
              <input type="hidden" name="_captcha" value="false">

              <button class="contact-submit" id="contactSubmit" type="submit">Отправить</button>
              <div class="contact-status" id="contactStatus" aria-live="polite"></div>
            </form>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  const overlay = modal.querySelector("#contactOverlay");
  const close = modal.querySelector("#contactClose");
  const form = modal.querySelector("#contactForm");
  const status = modal.querySelector("#contactStatus");
  const submit = modal.querySelector("#contactSubmit");

  // --- Показ / скрытие ---
  const show = () => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  };
  const hide = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
    status.textContent = "";
    status.className = "contact-status";
    form.reset();
    clearErrors();
  };

  // Клик по КНОПКАМ с классом (любое количество) — через делегирование
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(`.${TRIGGER_CLASS}`);
    if (btn) {
      e.preventDefault();
      show();
    }
  });
  overlay.addEventListener("click", hide);
  close.addEventListener("click", hide);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") hide();
  });

  // --- Валидация ---
  const nameEl = form.querySelector("#cfName");
  const phoneEl = form.querySelector("#cfPhone");

  const err = {
    name: document.getElementById("errName"),
    phone: document.getElementById("errPhone"),
  };

  const rePhone = /^\+?[0-9\s()-]{7,}$/;

  function clearErrors() {
    Object.values(err).forEach((e) => (e.textContent = ""));
    [nameEl, phoneEl].forEach((i) => i.classList.remove("input--error"));
  }

  function validate() {
    clearErrors();
    let ok = true;
    if (nameEl.value.trim().length < 2) {
      err.name.textContent = "Введите имя (минимум 2 символа).";
      nameEl.classList.add("input--error");
      ok = false;
    }
    if (phoneEl.value.trim() && !rePhone.test(phoneEl.value.trim())) {
      err.phone.textContent = "Неверный формат телефона.";
      phoneEl.classList.add("input--error");
      ok = false;
    }
    return ok;
  }

  [nameEl, phoneEl].forEach((i) => {
    i.addEventListener("blur", validate);
    i.addEventListener("input", () => {
      i.classList.remove("input--error");
      validate();
    });
  });

  // --- Отправка на FormSubmit ---
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) {
      status.textContent = "Исправьте ошибки в форме.";
      status.className = "contact-status contact-status--err";
      return;
    }

    submit.disabled = true;
    status.textContent = "Отправляем…";
    status.className = "contact-status";

    try {
      const data = Object.fromEntries(new FormData(form));
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw 0;

      status.textContent = "Готово! Сообщение отправлено.";
      status.className = "contact-status contact-status--ok";
      submit.disabled = false; // ← разблокировать на успехе
      setTimeout(hide, 1600);
    } catch {
      status.textContent = "Не получилось отправить. Попробуйте позже.";
      status.className = "contact-status contact-status--err";
      submit.disabled = false;
    }
  });
});

// burger
document.addEventListener("DOMContentLoaded", () => {
  const burgerBtns = document.querySelectorAll(".burger, .burger__btn");
  const burgerMenu = document.querySelector(".nav__burger");
  const body = document.body;
  const main = document.querySelector("main");
  const checkbox = document.getElementById("burger-checkbox");
  const toggles = document.querySelectorAll(".nav__toggle");

  const closeMenu = () => {
    if (burgerMenu) burgerMenu.classList.remove("active");
    body.classList.remove("overflow");
    if (checkbox) checkbox.checked = false;
  };

  const openMenu = () => {
    if (burgerMenu) burgerMenu.classList.add("active");
    body.classList.add("overflow");
    if (checkbox) checkbox.checked = true;
  };

  const toggleMenu = () => {
    if (burgerMenu && burgerMenu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  if (window.innerWidth < 1000 && burgerBtns.length) {
    burgerBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleMenu();
      });
    });
  }

  if (toggles.length) {
    toggles.forEach((item) => {
      item.addEventListener("click", (e) => {
        item.classList.toggle("open");
        const list = item.nextElementSibling;
        if (list) list.classList.toggle("open");
        e.stopPropagation();
      });
    });
  }

  if (burgerMenu) {
    burgerMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });
  }

  if (main) {
    main.addEventListener("click", () => {
      if (burgerMenu && burgerMenu.classList.contains("active")) {
        closeMenu();
      }
    });
  }

  // Закрывать меню при клике на любые якорные ссылки по странице
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    closeMenu();
  });

  // Если переход по хэшу произошёл программно
  window.addEventListener("hashchange", () => {
    closeMenu();
  });

  // При увеличении экрана до десктопа — снять блокировки прокрутки и закрыть меню
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1000) {
      closeMenu();
    }
  });
});

// scroll animation
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  sections.forEach((section) => {
    section.classList.add("hiddenSec");
    observer.observe(section);
  });
});

// btn upper
document
  .getElementById("floating-button")
  .addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

// grid with case example
document.addEventListener("DOMContentLoaded", () => {
  const cases = [
    {
      caseNumber: "A12-35841-2018",
      pdfName: "A12-35841-2018_20190307_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/79f8ca82-76ee-4c5d-a9a8-c80644af8bd5",
    },
    {
      caseNumber: "A12-37027-2017",
      pdfName: "A12-37027-2017_20180508_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/dcf61fe8-b9ff-4098-b6e5-10f34ebd0eef",
    },
    {
      caseNumber: "A12-38822-2018",
      pdfName: "A12-38822-2018_20190618_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/af6f1cb4-e48f-4c26-9677-861cefe28830",
    },
    {
      caseNumber: "A12-39430-2018",
      pdfName: "A12-39430-2018_20190603_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/4366d595-decc-4c84-afcc-4b19cb3b8324",
    },
    {
      caseNumber: "A12-39432-2018",
      pdfName: "A12-39432-2018_20190527_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/3dd76097-1041-4e8c-baaa-e4a88696741b",
    },
    {
      caseNumber: "A12-11487-2019",
      pdfName: "A12-11487-2019_20191211_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/566c17c3-caf6-4997-8aef-1c414e63658e",
    },
    {
      caseNumber: "A12-14324-2018",
      pdfName: "A12-14324-2018_20181225_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/01c7aea9-c07b-48b5-9945-7ba41db4ae29",
    },
    {
      caseNumber: "A12-14767-2018",
      pdfName: "A12-14767-2018_20181213_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/22697f74-be44-4a7f-ab3c-41b16b5ae231",
    },
    {
      caseNumber: "A12-16452-2019",
      pdfName: "A12-16452-2019_20191225_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/fa2756a6-6892-4056-802b-e499df81ea1b",
    },
    {
      caseNumber: "A12-16974-2019",
      pdfName: "A12-16974-2019_20191212_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/d9b4352e-d4e6-4730-9c66-d38797c11ff1",
    },
    {
      caseNumber: "A12-22741-2019",
      pdfName: "A12-22741-2019_20200211_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/170f3f39-ba85-4687-9bea-cb6ce32473e2",
    },
    {
      caseNumber: "A12-22742-2019",
      pdfName: "A12-22742-2019_20191217_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/8b7057af-3abc-4a3f-a9a4-1a135068db80",
    },
    {
      caseNumber: "A12-22744-2019",
      pdfName: "A12-22744-2019_20200210_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/e7062ec8-8efd-41bf-86f1-30932670ac34",
    },
    {
      caseNumber: "A12-22751-2019",
      pdfName: "A12-22751-2019_20191219_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/041e9d50-5469-4fe6-a8b7-d562caa6f710",
    },
    {
      caseNumber: "A12-29337-2018",
      pdfName: "A12-29337-2018_20190222_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/4bfe12ef-ee14-4dc2-95d0-71dad1a41665",
    },
    {
      caseNumber: "A12-29340-2018",
      pdfName: "A12-29340-2018_20190516_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/3d3668e0-61fb-48e7-a45c-31cbd35878a9",
    },
    {
      caseNumber: "A12-29341-2018",
      pdfName: "A12-29341-2018_20190228_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/afa9e7fc-cd39-4348-b895-a5c6ec8d4b71",
    },
    {
      caseNumber: "A12-29342-2018",
      pdfName: "A12-29342-2018_20190827_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/9fe022b8-7c9b-44b0-b060-dc923ed56d89",
    },
    {
      caseNumber: "A12-29344-2018",
      pdfName: "A12-29344-2018_20190520_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/2494f052-5ca9-48de-add4-b6e4f73b27e1",
    },
    {
      caseNumber: "A12-29339-2018",
      pdfName: "A12-29339-2018_20190507_Opredelenie",
      caseLink:
        "https://kad.arbitr.ru/Card/d6914ebc-9822-4c4a-898b-99a60433c09b",
    },
  ];

  if (cases) {
    const casesContainer = document.querySelector(".case__grid");

    if (casesContainer) {
      cases.forEach(({ caseNumber, pdfName, caseLink }) => {
        const caseElement = document.createElement("div");
        caseElement.classList.add("case__item");

        caseElement.innerHTML = `
              <img src="files/case_example/webp/${caseNumber}.webp" alt="${caseNumber}" class="viewer__image">
              <div class="case__heading">
              Дело о банкротстве:
              <br>
              ${caseNumber}</div>
              <div class="case__buttons">
                  <a href="${caseLink}" target="_blank" class="btn">Решение суда</a>
                  <a href="files/case_example/pdf_files/${pdfName}.pdf" target="_blank" class="btn">Посмотреть дело</a>
                
              </div>
          `;

        casesContainer.appendChild(caseElement);
      });
    }
  }
});

// viewer images
document.addEventListener("DOMContentLoaded", function () {
  const viewerImages = document.querySelectorAll(".viewer__image");

  viewerImages.forEach((img) => {
    img.addEventListener("click", function () {
      const viewer = new Viewer(img, {
        navbar: false,
        toolbar: true,
        title: true,
        transition: true,
        zoomable: true,
        rotatable: true,
      });
      viewer.show();
    });
  });
});

// price anim card
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".pricing__item");

  const highlightVisibleCard = () => {
    let closestCard = null;
    let minTop = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();

      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible && rect.top >= -10 && rect.top < minTop) {
        minTop = rect.top;
        closestCard = card;
      }
    });

    cards.forEach((card) => {
      card.classList.toggle("pricing__item--active", card === closestCard);
    });
  };

  window.addEventListener("scroll", highlightVisibleCard);
  highlightVisibleCard();
});

// footer dropdown menu
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".footer__toggle").forEach((tg) => {
    tg.addEventListener("click", () => {
      tg.classList.toggle("open");
      const list = tg.nextElementSibling;
      if (list) list.classList.toggle("open");
    });
  });
});

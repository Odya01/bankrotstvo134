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

  if (servicesLink) {
    servicesLink.addEventListener("click", function (event) {
      event.preventDefault();
      const dropdown = this.querySelector(".dropdown");
      if (dropdown) {
        dropdown.classList.toggle("show");
      }
    });
  }

  if (servicesLink) {
    document.addEventListener("click", function (event) {
      const dropdown = document.querySelector(".dropdown");

      if (
        dropdown &&
        !servicesLink.contains(event.target) &&
        !event.target.closest(".dropdown")
      ) {
        dropdown.classList.remove("show");
      }
    });
  }

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
        <h3 class="promo-modal__title">При оплате всей суммы сразу, скидка <br>10&nbsp;000&nbsp;рублей!</h3>
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
// нажатие на кнопку, как tel
// document.addEventListener("DOMContentLoaded", () => {
//   const contactBtns = document.querySelectorAll(".contactBtn");
//   if (!contactBtns.length) return;

//   const DEFAULT_TEL = "+79053309095";

//   const normalizeTel = (value) => {
//     if (!value) return "";
//     const trimmed = String(value).trim();
//     const hasPlus = trimmed.startsWith("+");
//     const digitsOnly = trimmed.replace(/[^\d]/g, "");
//     return (hasPlus ? "+" : "") + digitsOnly;
//   };

//   contactBtns.forEach((btn) => {
//     if (!btn) return;

//     btn.setAttribute("role", "link");
//     btn.setAttribute("tabindex", "0");

//     const rawTel =
//       btn.getAttribute("data-tel") ||
//       btn.getAttribute("href") ||
//       btn.textContent ||
//       DEFAULT_TEL;

//     const tel = normalizeTel(rawTel) || normalizeTel(DEFAULT_TEL);

//     const makeCall = () => {
//       window.location.href = `tel:${tel}`;
//     };

//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       makeCall();
//     });

//     btn.addEventListener("keydown", (e) => {
//       if (e.key === "Enter" || e.key === " ") {
//         e.preventDefault();
//         makeCall();
//       }
//     });
//   });
// });

/**
 * Модальное окно контактов.
 * Открывается по клику на элементы с классом .contactBtn.
 * Номер телефона берётся из data-tel, href или текста кнопки.
 * Для соцсетей используются стандартные ссылки (можно изменить в коде).
 * Стили модального окна должны быть подключены отдельно (см. CSS в задании).
 */
document.addEventListener("DOMContentLoaded", () => {
  // Если модалка уже существует, не создаём повторно
  if (document.getElementById("contactModal")) return;

  // Дополнительные стили для расположения кнопок соцсетей
  const style = document.createElement("style");
  style.textContent = `
    .contact-socials {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;

    }
    .contact-socials .contact-submit {
      min-width: 120px;
    }
  `;
  document.head.appendChild(style);

  // ----- Создание структуры модалки -----
  const modal = document.createElement("div");
  modal.className = "contact-modal";
  modal.id = "contactModal";

  const overlay = document.createElement("div");
  overlay.className = "contact-modal__overlay";

  const dialog = document.createElement("div");
  dialog.className = "contact-modal__dialog";

  const closeBtn = document.createElement("button");
  closeBtn.className = "contact-modal__close";
  closeBtn.innerHTML = "&times;";
  closeBtn.setAttribute("aria-label", "Закрыть");

  const dottedDiv = document.createElement("div");
  dottedDiv.className = "dotted-div";

  const title = document.createElement("h3");
  title.className = "contact-modal__title";
  title.textContent = "Свяжитесь с нами";

  const subtitle = document.createElement("p");
  subtitle.className = "contact-modal__subtitle";
  subtitle.textContent = "Выберите удобный способ связи";

  // Блок с телефоном (будет обновляться при открытии)
  const phoneContainer = document.createElement("p");
  phoneContainer.innerHTML =
    'Телефон: <a href="tel:+79053309095" class="contact-phone-link">+7 (905) 330-90-95</a>';
  phoneContainer.style.marginBottom = "10px";
  phoneContainer.style.marginTop = "0px";
  phoneContainer.style.textAlign = "center";

  // Контейнер для кнопок соцсетей
  const socialsContainer = document.createElement("div");
  socialsContainer.className = "contact-socials";

  // Дефолтные ссылки для соцсетей (пользователь может заменить)
  const defaultSocials = {
    telegram: "http://t.me/bankrotstvo134",
    whatsapp:
      "https://wa.me/79053309095?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%BC%D0%B5%D0%BD%D1%8F%20%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%B5%D1%81%D1%83%D0%B5%D1%82%20%D0%B1%D0%B0%D0%BD%D0%BA%D1%80%D0%BE%D1%82%D1%81%D1%82%D0%B2%D0%BE.",
    vk: "https://vk.com/bankrotstvo_134",
  };

  // Функция создания кнопки соцсети
  function createSocialButton(name, label, url) {
    const btn = document.createElement("button");
    btn.className = "contact-submit btn";
    btn.setAttribute("data-social", name);
    btn.setAttribute("aria-label", label);
    // Внутри span — пользователь заменит текст на свою SVG
    btn.innerHTML = `<span>${label}</span>`;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(url, "_blank");
    });
    return btn;
  }

  // Добавляем кнопки
  socialsContainer.appendChild(
    createSocialButton("telegram", "Telegram", defaultSocials.telegram),
  );
  socialsContainer.appendChild(
    createSocialButton("vk", "VK", defaultSocials.vk),
  );
  socialsContainer.appendChild(
    createSocialButton("whatsapp", "WhatsApp", defaultSocials.whatsapp),
  );

  // Сборка
  dottedDiv.appendChild(title);
  dottedDiv.appendChild(subtitle);
  dottedDiv.appendChild(phoneContainer);
  dottedDiv.appendChild(socialsContainer);

  dialog.appendChild(closeBtn);
  dialog.appendChild(dottedDiv);

  modal.appendChild(overlay);
  modal.appendChild(dialog);

  document.body.appendChild(modal);

  // ----- Логика открытия / закрытия -----
  function openModal(phoneDigits = "79053309095") {
    // Форматируем номер для отображения
    const phoneLink = phoneContainer.querySelector(".contact-phone-link");
    if (phoneLink) {
      let formatted = phoneDigits;
      if (phoneDigits.length === 11 && phoneDigits[0] === "7") {
        formatted = `+7 (${phoneDigits.slice(1, 4)}) ${phoneDigits.slice(4, 7)}-${phoneDigits.slice(7, 9)}-${phoneDigits.slice(9)}`;
      } else if (phoneDigits.length === 10) {
        formatted = `+7 (${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6, 8)}-${phoneDigits.slice(8)}`;
      } else {
        formatted = `+${phoneDigits}`;
      }
      phoneLink.textContent = formatted;
      phoneLink.href = `tel:${phoneDigits}`;
    }
    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });

  function normalizeTel(value) {
    if (!value) return "";
    const trimmed = String(value).trim();
    const hasPlus = trimmed.startsWith("+");
    const digitsOnly = trimmed.replace(/[^\d]/g, "");
    return (hasPlus ? "+" : "") + digitsOnly;
  }

  const DEFAULT_TEL = "+79053309095";

  document.querySelectorAll(".contactBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const rawTel =
        btn.getAttribute("data-tel") ||
        btn.getAttribute("href") ||
        btn.textContent ||
        DEFAULT_TEL;
      const tel = normalizeTel(rawTel) || normalizeTel(DEFAULT_TEL);
      openModal(tel.replace(/\D/g, "")); // передаём только цифры
    });
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
  // Массив всех дел с данными из папки case_example и файла ссылки.txt
  const cases = [
    {
      caseNumber: "А12-12122-2023",
      folderName: "А12-121222023",
      pdfName: "A12-12122-2023_20250304_Opredelenie",
      imageName: "A12-12122-2023_20250304_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/8aa9735a-d747-42a5-a443-fd9123e48294",
      year: 2023,
    },
    {
      caseNumber: "А12-12192-2023",
      folderName: "А12-121922023",
      pdfName: "A12-12192-2023_20240424_Opredelenie",
      imageName: "A12-12192-2023_20240424_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/23008936-83bb-403a-94fe-3019b9aaf25c",
      year: 2023,
    },
    {
      caseNumber: "А12-13133-2023",
      folderName: "А12-131332023",
      pdfName: "A12-13133-2023_20240807_Opredelenie",
      imageName: "A12-13133-2023_20240807_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/a89f602a-f1ba-4ada-9a2c-f9052cd04d39",
      year: 2023,
    },
    {
      caseNumber: "А12-13302-2024",
      folderName: "А12-13302_2024",
      pdfName: "A12-13302-2024_20250415_Opredelenie",
      imageName: "A12-13302-2024_20250415_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/a5607c31-4faa-4790-821a-f27f6b8f4d03",
      year: 2024,
    },
    {
      caseNumber: "А12-14573-2023",
      folderName: "А12-14573_2023",
      pdfName: "A12-14573-2023_20240701_Opredelenie",
      imageName: "A12-14573-2023_20240701_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/7dbba25b-0784-4e59-8fb5-371ba92a0ccf",
      year: 2023,
    },
    {
      caseNumber: "А12-14648-2023",
      folderName: "А12-14648_2023",
      pdfName: "A12-14648-2023_20240801_Opredelenie",
      imageName: "A12-14648-2023_20240801_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/dc92eff2-635d-46f3-b989-ddc01accdca4",
      year: 2023,
    },
    {
      caseNumber: "А12-14671-2023",
      folderName: "А12-14671_2023",
      pdfName: "A12-14671-2023_20240411_Opredelenie",
      imageName: "A12-14671-2023_20240411_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/4640e410-c8cf-4092-8589-80bfc1f24330",
      year: 2023,
    },
    {
      caseNumber: "А12-14986-2024",
      folderName: "А12-149862024",
      pdfName: "A12-14986-2024_20251031_Opredelenie",
      imageName: "A12-14986-2024_20251031_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/1924df72-9571-44bd-a78c-fe68d443e376",
      year: 2024,
    },
    {
      caseNumber: "А12-15007-2022",
      folderName: "А12-150072022",
      pdfName: "A12-15007-2022_20241204_Opredelenie",
      imageName: "A12-15007-2022_20241204_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/ceddcd9a-6ee1-4c78-9d0c-c3e3cd96e834",
      year: 2022,
    },
    {
      caseNumber: "А12-15586-2023",
      folderName: "А12-15586_2023",
      pdfName: "A12-15586-2023_20240221_Opredelenie",
      imageName: "A12-15586-2023_20240221_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/9fb295a4-afba-4606-b950-fa7f7e08c802",
      year: 2023,
    },
    {
      caseNumber: "А12-15742-2023",
      folderName: "А12-157422023",
      pdfName: "A12-15742-2023_20240122_Opredelenie",
      imageName: "A12-15742-2023_20240122_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/0ab92846-1017-456d-8266-e9b9e3976b90",
      year: 2023,
    },
    {
      caseNumber: "А12-16032-2024",
      folderName: "А12-16032_2024",
      pdfName: "A12-16032-2024_20250120_Opredelenie",
      imageName: "A12-16032-2024_20250120_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/6fecef7c-2104-4c49-ac80-0a756debefa3",
      year: 2024,
    },
    {
      caseNumber: "А12-16934-2023",
      folderName: "А12-169342023",
      pdfName: "A12-16934-2023_20240320_Opredelenie",
      imageName: "A12-16934-2023_20240320_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/7089091b-2c1b-456a-b1db-dbf389aebe70",
      year: 2023,
    },
    {
      caseNumber: "А12-17416-2024",
      folderName: "А12-174162024",
      pdfName: "A12-17416-2024_20250611_Opredelenie",
      imageName: "A12-17416-2024_20250611_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/0331e5b3-7015-4362-95b0-81bd59ba24be",
      year: 2024,
    },
    {
      caseNumber: "А12-17716-2023",
      folderName: "А12-177162023",
      pdfName: "A12-17716-2023_20241118_Opredelenie",
      imageName: "A12-17716-2023_20241118_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/8328ca21-3481-4f5f-9a04-55a783283b62",
      year: 2023,
    },
    {
      caseNumber: "А12-17764-2023",
      folderName: "А12-177642023",
      pdfName: "A12-17764-2023_20240521_Opredelenie",
      imageName: "A12-17764-2023_20240521_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/6e6b4756-bf48-439c-8823-5787848d5cc9",
      year: 2023,
    },
    {
      caseNumber: "А12-19245-2022",
      folderName: "А12-192452022",
      pdfName: "A12-19245-2022_20230406_Opredelenie",
      imageName: "A12-19245-2022_20230406_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/341c1bbf-d2c4-43be-8637-c34a5fd7a20d",
      year: 2022,
    },
    {
      caseNumber: "А12-1974-2024",
      folderName: "А12-19742024",
      pdfName: "A12-1974-2024_20250224_Opredelenie",
      imageName: "A12-1974-2024_20250224_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/0c9feb54-150c-4aa9-8063-f89e38120f13",
      year: 2024,
    },
    {
      caseNumber: "А12-21003-2023",
      folderName: "А12-21003_2023",
      pdfName: "A12-21003-2023_20240422_Opredelenie",
      imageName: "A12-21003-2023_20240422_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/139d3552-a171-43a2-802b-62c25325a48b",
      year: 2023,
    },
    {
      caseNumber: "А12-21140-2024",
      folderName: "А12-211402024",
      pdfName: "A12-21140-2024_20250415_Opredelenie",
      imageName: "A12-21140-2024_20250415_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/fcc7e058-90d4-422d-aa17-46b8e7458d2b",
      year: 2024,
    },
    {
      caseNumber: "А12-23080-2024",
      folderName: "А12-230802024",
      pdfName: "A12-23080-2024_20250403_Opredelenie",
      imageName: "A12-23080-2024_20250403_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/7931ddd0-3aa9-4942-982a-d2f3c3ed3801",
      year: 2024,
    },
    {
      caseNumber: "А12-23855-2023",
      folderName: "А12-238552023",
      pdfName: "A12-23855-2023_20240730_Opredelenie",
      imageName: "A12-23855-2023_20240730_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/ec048e9c-06d2-4ef6-9f58-cca274935b5b",
      year: 2023,
    },
    {
      caseNumber: "А12-25326-2022",
      folderName: "А12-253262022",
      pdfName: "A12-25326-2022_20240910_Opredelenie",
      imageName: "A12-25326-2022_20240910_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/e9fef9b9-bfc5-47bf-aeca-f299f4441373",
      year: 2022,
    },
    {
      caseNumber: "А12-2538-2023",
      folderName: "А12-25382023",
      pdfName: "A12-2538-2023_20241224_Opredelenie",
      imageName: "A12-2538-2023_20241224_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/f9a48661-b122-4950-947a-2aa25f37049a",
      year: 2023,
    },
    {
      caseNumber: "А12-26104-2022",
      folderName: "А12-261042022",
      pdfName: "A12-26104-2022_20231005_Opredelenie",
      imageName: "A12-26104-2022_20231005_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/97841042-8e55-49b6-9d70-8a1573c6898d",
      year: 2022,
    },
    {
      caseNumber: "А12-26336-2024",
      folderName: "А12-263362024",
      pdfName: "A12-26336-2024_20250424_Opredelenie",
      imageName: "A12-26336-2024_20250424_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/eeb34306-7b37-455d-bc18-4cabbea0c2b8",
      year: 2024,
    },
    {
      caseNumber: "А12-27143-2023",
      folderName: "А12-27143_2023",
      pdfName: "A12-27143-2023_20250915_Opredelenie",
      imageName: "A12-27143-2023_20250915_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/e411ffdd-ed1e-48a0-980f-d3b6348b64b4",
      year: 2023,
    },
    {
      caseNumber: "А12-27987-2024",
      folderName: "А12-27987_2024",
      pdfName: "A12-27987-2024_20250626_Opredelenie",
      imageName: "A12-27987-2024_20250626_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/ab90bb0e-3159-463d-9479-304378d7cb34",
      year: 2024,
    },
    {
      caseNumber: "А12-28691-2024",
      folderName: "А12-286912024",
      pdfName: "A12-28691-2024_20251007_Opredelenie",
      imageName: "A12-28691-2024_20251007_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/8cf4bb74-772c-47ba-a8ab-b6a4ef26678e",
      year: 2024,
    },
    {
      caseNumber: "А12-29897-2021",
      folderName: "А12-298972021",
      pdfName: "A12-29897-2021_20231128_Opredelenie",
      imageName: "A12-29897-2021_20231128_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/3bb6b4cd-7f61-4e86-8c27-ca2c2ba7c48d",
      year: 2021,
    },
    {
      caseNumber: "А12-3048-2024",
      folderName: "А12-30482024",
      pdfName: "A12-3048-2024_20250206_Opredelenie",
      imageName: "A12-3048-2024_20250206_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/654ea52c-1f99-44ed-a824-ebab33a9cbb9",
      year: 2024,
    },
    {
      caseNumber: "А12-30624-2022",
      folderName: "А12-306242022",
      pdfName: "A12-30624-2022_20240318_Opredelenie",
      imageName: "A12-30624-2022_20240318_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/f219260d-eacc-4601-b9cd-e30a00c3652c",
      year: 2022,
    },
    {
      caseNumber: "А12-31104-2024",
      folderName: "А12-311042024",
      pdfName: "A12-31104-2024_20250930_Opredelenie",
      imageName: "A12-31104-2024_20250930_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/e73cca70-58bc-499f-95cf-fbd0000e5048",
      year: 2024,
    },
    {
      caseNumber: "А12-31473-2024",
      folderName: "А12-314732024",
      pdfName: "A12-31473-2024_20250807_Opredelenie",
      imageName: "A12-31473-2024_20250807_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/c4a1a2d0-64a5-433e-8a54-5581b3e13d94",
      year: 2024,
    },
    {
      caseNumber: "А12-31752-2023",
      folderName: "А12-317522023",
      pdfName: "A12-31752-2023_20250311_Opredelenie",
      imageName: "A12-31752-2023_20250311_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/1dd510a6-4dd2-4d68-b12f-3283c5f84e2f",
      year: 2023,
    },
    {
      caseNumber: "А12-32439-2023",
      folderName: "А12-324392023",
      pdfName: "A12-32439-2023_20241029_Opredelenie",
      imageName: "A12-32439-2023_20241029_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/5b21070e-282e-4db4-9709-b3c74c213dba",
      year: 2023,
    },
    {
      caseNumber: "А12-32443-2023",
      folderName: "А12-324432023",
      pdfName: "A12-32443-2023_20240926_Opredelenie",
      imageName: "A12-32443-2023_20240926_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/329dda08-7ebf-44c8-9936-f53e58120506",
      year: 2023,
    },
    {
      caseNumber: "А12-33206-2023",
      folderName: "А12-332062023",
      pdfName: "A12-33206-2023_20241028_Opredelenie",
      imageName: "A12-33206-2023_20241028_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/0d5f2157-f394-489e-8cbf-88b11fa2e6e2",
      year: 2023,
    },
    {
      caseNumber: "А12-33693-2022",
      folderName: "А12-336932022",
      pdfName: "A12-33693-2022_20240524_Opredelenie",
      imageName: "A12-33693-2022_20240524_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/48f81207-f8a3-4eeb-9520-39c6be7fedc0",
      year: 2022,
    },
    {
      caseNumber: "А12-33986-2022",
      folderName: "А12-339862022",
      pdfName: "A12-33986-2022_20240513_Opredelenie",
      imageName: "A12-33986-2022_20240513_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/00bb4d8b-cc34-4860-aea8-5bf1ac62eb2c",
      year: 2022,
    },
    {
      caseNumber: "А12-3749-2023",
      folderName: "А12-37492023",
      pdfName: "A12-3749-2023_20240524_Opredelenie",
      imageName: "A12-3749-2023_20240524_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/dbf0b553-8dd5-4100-8d41-b868497b80d5",
      year: 2023,
    },
    {
      caseNumber: "А12-3750-2023",
      folderName: "А12-37502023",
      pdfName: "A12-3750-2023_20231121_Opredelenie",
      imageName: "A12-3750-2023_20231121_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/9714568d-8a91-41e4-a577-7b4d3688a446",
      year: 2023,
    },
    {
      caseNumber: "А12-3854-2023",
      folderName: "А12-38542023",
      pdfName: "A12-3854-2023_20230921_Opredelenie",
      imageName: "A12-3854-2023_20230921_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/353ead52-d40e-4a0f-bdaa-cf54d202b394",
      year: 2023,
    },
    {
      caseNumber: "А12-3858-2023",
      folderName: "А12-38582023",
      pdfName: "A12-3858-2023_20240123_Opredelenie",
      imageName: "A12-3858-2023_20240123_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/7aa8fbf9-ba71-4809-94ee-4a9bd350669a",
      year: 2023,
    },
    {
      caseNumber: "А12-3860-2023",
      folderName: "А12-38602023",
      pdfName: "A12-3860-2023_20230921_Opredelenie",
      imageName: "A12-3860-2023_20230921_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/ee94b23c-9734-4469-94c8-c8a2dd63657a",
      year: 2023,
    },
    {
      caseNumber: "А12-3887-2023",
      folderName: "А12-38872023",
      pdfName: "A12-3887-2023_20240912_Opredelenie",
      imageName: "A12-3887-2023_20240912_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/4f1159de-4431-4b5d-a5e1-90315beb3376",
      year: 2023,
    },
    {
      caseNumber: "А12-3891-2023",
      folderName: "А12-38912023",
      pdfName: "A12-3891-2023_20240711_Opredelenie",
      imageName: "A12-3891-2023_20240711_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/5175b19b-65c7-4cd7-bb71-48a8f05273e6",
      year: 2023,
    },
    {
      caseNumber: "А12-4126-2025",
      folderName: "А12-41262025",
      pdfName: "A12-4126-2025_20251125_Opredelenie",
      imageName: "A12-4126-2025_20251125_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/3ff7f665-7f69-44c0-aa82-437d706f2c1d",
      year: 2025,
    },
    {
      caseNumber: "А12-4129-2025",
      folderName: "А12-41292025",
      pdfName: "A12-4129-2025_20251230_Opredelenie",
      imageName: "A12-4129-2025_20251230_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/bd90ed96-ede9-432d-8634-b6a9fe86a9d0",
      year: 2025,
    },
    {
      caseNumber: "А12-4377-2023",
      folderName: "А12-43772023",
      pdfName: "A12-4377-2023_20231130_Opredelenie",
      imageName: "A12-4377-2023_20231130_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/651fe7c0-2192-42c9-ad2c-1c5976b9c0b2",
      year: 2023,
    },
    {
      caseNumber: "А12-4535-2025",
      folderName: "А12-45352025",
      pdfName: "A12-4535-2025_20251031_Opredelenie",
      imageName: "A12-4535-2025_20251031_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/9ec0bd5a-7ec4-4b0a-983e-63503e6a4c5b",
      year: 2025,
    },
    {
      caseNumber: "А12-4979-2024",
      folderName: "А12-49792024",
      pdfName: "A12-4979-2024_20241030_Opredelenie",
      imageName: "A12-4979-2024_20241030_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/5acc3c01-057e-415b-afcd-c29a5945f4b1",
      year: 2024,
    },
    {
      caseNumber: "А12-5513-2024",
      folderName: "А12-55132024",
      pdfName: "A12-5513-2024_20241010_Opredelenie",
      imageName: "A12-5513-2024_20241010_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/3abc956a-9169-41d6-96e4-53fa1cf33354",
      year: 2024,
    },
    {
      caseNumber: "А12-5515-2024",
      folderName: "А12-55152024",
      pdfName: "A12-5515-2024_20240905_Opredelenie",
      imageName: "A12-5515-2024_20240905_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/3c6d8540-79e4-4398-b2f2-ca0071e8b66e",
      year: 2024,
    },
    {
      caseNumber: "А12-5991-2023",
      folderName: "А12-59912023",
      pdfName: "A12-5991-2023_20231109_Opredelenie",
      imageName: "A12-5991-2023_20231109_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/bab2895b-ae24-40cb-b6cf-9e0f3de5d965",
      year: 2023,
    },
    {
      caseNumber: "А12-6570-2024",
      folderName: "А12-65702024",
      pdfName: "A12-6570-2024_20250114_Opredelenie",
      imageName: "A12-6570-2024_20250114_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/eb220313-8309-4aab-b5c6-520efee42858",
      year: 2024,
    },
    {
      caseNumber: "А12-7053-2021",
      folderName: "А12-70532021",
      pdfName: "A12-7053-2021_20250218_Opredelenie",
      imageName: "A12-7053-2021_20250218_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/e9ee3fe9-bbec-4d49-bb82-0a1c1e83b45c",
      year: 2021,
    },
    {
      caseNumber: "А66-4593-2022",
      folderName: "А66-45932022",
      pdfName: "A66-4593-2022_20221103_Opredelenie",
      imageName: "A66-4593-2022_20221103_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/7f23f38b-0744-4e44-884b-5d388e52c1c3",
      year: 2022,
    },
    {
      caseNumber: "А66-9117-2023",
      folderName: "А66-91172023",
      pdfName: "A66-9117-2023_20240524_Opredelenie",
      imageName: "A66-9117-2023_20240524_Opredelenie_Страница_1.png",
      caseLink:
        "https://kad.arbitr.ru/Card/09906b44-1898-4fce-865c-c07d94b48649",
      year: 2023,
    },
  ];

  const casesContainer = document.querySelector(".case__grid");
  const filterButtons = document.querySelectorAll(".case__filter-btn");
  let currentFilter = "all";

  // Функция для отображения дел
  function displayCases(filterYear = "all") {
    if (!casesContainer) return;

    casesContainer.innerHTML = "";

    const filteredCases =
      filterYear === "all"
        ? cases
        : cases.filter((c) => c.year === parseInt(filterYear));

    filteredCases.forEach(
      ({ caseNumber, folderName, pdfName, imageName, caseLink }) => {
        const caseElement = document.createElement("div");
        caseElement.classList.add("case__item");
        caseElement.setAttribute(
          "data-year",
          cases.find((c) => c.caseNumber === caseNumber)?.year || "",
        );

        // Используем правильный путь относительно case/index.html
        const imagePath = `../files/case_example/${folderName}/${imageName}`;
        const pdfPath = `../files/case_example/${folderName}/${pdfName}.pdf`;

        caseElement.innerHTML = `
        <img src="${imagePath}" alt="${caseNumber}" class="viewer__image">
        <div class="case__heading">
          Дело о банкротстве:
          <br>
          ${caseNumber}
        </div>
        <div class="case__buttons">
          <a href="${caseLink}" target="_blank" class="btn">Решение суда</a>
          <a href="${pdfPath}" target="_blank" class="btn">Посмотреть дело</a>
        </div>
      `;

        casesContainer.appendChild(caseElement);
      },
    );

    // Инициализация viewer для новых изображений
    const viewerImages = casesContainer.querySelectorAll(".viewer__image");
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
  }

  // Обработчики для фильтров
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-year");
      displayCases(currentFilter);
    });
  });

  // Инициализация: показать все дела
  displayCases();
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

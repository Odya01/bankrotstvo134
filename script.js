document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");
  const details = document.getElementById("details");

  toggleButton.addEventListener("click", () => {
    details.classList.toggle("open");
  });
});

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

document.addEventListener("DOMContentLoaded", () => {
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
        slidesPerView: 1,
      },
      800: {
        slidesPerView: 2,
      },
      1024: {
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

//
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
    });
  });
});

// timer
document.addEventListener("DOMContentLoaded", () => {
  // 31 декабря 2023 года, 23:59:59
  const countdownElement = document.querySelector(".countdown");
  const discountBlock = document.querySelector(".welcome__discount");
  const endTime = new Date("December 31, 2024 23:59:59").getTime();
  function updateCountdown() {
    if (!countdownElement) return;
    const now = new Date().getTime();
    const timeLeft = endTime - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    countdownElement.innerHTML = `${days}д ${hours
      .toString()
      .padStart(2, "0")}ч ${minutes.toString().padStart(2, "0")}м`;
    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      discountBlock.style.display = "none";
    }
  }

  const countdownInterval = setInterval(updateCountdown, 1000);
});

document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.querySelector(".burger");
  const burgerMenu = document.querySelector(".nav__burger");
  const navLink = document.querySelectorAll(".nav__list");

  burgerBtn.addEventListener("click", () => {
    burgerMenu.classList.toggle("active");
    document.body.classList.toggle("overflow");
  });

  // close link click
  navLink.forEach((e) => {
    e.addEventListener("click", () => {
      if (burgerMenu.classList.contains("active")) {
        burgerMenu.classList.remove("active");
        document.body.classList.remove("overflow");
        document.getElementById("burger-checkbox").checked = false;
      }
    });
  });

  // close out nav list
  document.querySelector("main").addEventListener("click", () => {
    if (burgerMenu.classList.contains("active")) {
      burgerMenu.classList.remove("active");
      document.body.classList.remove("overflow");
      document.getElementById("burger-checkbox").checked = false;
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

//
document
  .getElementById("floating-button")
  .addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

//
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

  const casesContainer = document.querySelector(".case__grid");

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
});

//
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

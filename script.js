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

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("services-link")
    .addEventListener("click", function (event) {
      event.preventDefault();
      this.querySelector(".dropdown").classList.toggle("show");
    });

  document.addEventListener("click", function (event) {
    const dropdown = document.querySelector(".dropdown");
    const servicesLink = document.getElementById("services-link");
    if (
      !servicesLink.contains(event.target) &&
      !dropdown.contains(event.target)
    ) {
      dropdown.classList.remove("show");
    }
  });
});

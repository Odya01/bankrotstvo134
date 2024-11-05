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

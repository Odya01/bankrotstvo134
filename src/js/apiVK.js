document.addEventListener("DOMContentLoaded", () => {
  const vkBlock = document.querySelector(".blog__post_vk");
  if (!vkBlock) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadVkScript();
          observer.unobserve(vkBlock);
        }
      });
    },
    {
      rootMargin: "0px 0px 200px 0px",
      threshold: 0,
    }
  );

  observer.observe(vkBlock);

  function loadVkScript() {
    const vkScript = document.createElement("script");
    vkScript.src = "https://vk.com/js/api/openapi.js?169";
    vkScript.onload = () => {
      VK.Widgets.Group(
        "vk_groups",
        {
          mode: 4,
          width: "auto",
          height: 650,
          color1: "FFFFFF",
          color2: "000000",
          color3: "5181B8",
        },
        199689722
      );
    };
    document.body.appendChild(vkScript);
  }
});

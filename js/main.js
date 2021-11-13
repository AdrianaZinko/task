const hamburher = document.querySelector(".header__burger");
const menu = document.querySelector(".header__menu");
const tabsItems = document.querySelectorAll(".tabs__triggers-item ");
const tabsContents = document.querySelectorAll(".tabs__item ");
const headerItems = document.querySelectorAll(".header__item");
const getId = (link) => link.getAttribute("href").replace("#", "");

hamburher.addEventListener("click", () => {
  hamburher.classList.toggle("active");
  menu.classList.toggle("active");
  headerItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburher.classList.remove("active");
      menu.classList.remove("active");
    });
  });
  if (hamburher.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});

tabsItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    let id = e.target.getAttribute("href").replace("#", "");
    tabsItems.forEach((child) => {
      child.classList.remove("tabs__triggers-item--active");
    });
    tabsContents.forEach((child) => {
      child.classList.remove("tabs__item--active");
    });
    item.classList.add("tabs__triggers-item--active");
    document.getElementById(id).classList.add("tabs__item--active");
  });
});
document.querySelector(".tabs__triggers-item").click();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".header__link").forEach((link) => {
          link.classList.toggle(
            "header__link--active",
            getId(link) === entry.target.id
          );
        });
      }
    });
  },
  {
    threshold: 0.7,
  }
);

document
  .querySelectorAll(".section")
  .forEach((section) => observer.observe(section));

document.querySelector(".header__list").addEventListener("click", (event) => {
  if (event.target.classList.contains("header__link")) {
    event.preventDefault();
    const id = getId(event.target);
    window.scrollTo({
      top: document.getElementById(id).offsetTop,
      behavior: "smooth",
    });
  }
});

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

const header = document.querySelector("header");
const logo = document.querySelector("header > .header-wrap > h2");
const dep1 = document.querySelector(".dep1");
const dep2 = document.querySelectorAll(".dep2");

const dep1Over = (e) => {
  console.log(e.target);
  for (let i = 0; i < dep2.length; i++) {
    dep2[i].style = "visibility: visible; opacity: 1";
  }
  logo.style = "visibility: visible";
  header.classList.add("active");
};

const dep1Leave = (e) => {
  console.log(e.target);
  for (let i = 0; i < dep2.length; i++) {
    dep2[i].style = "visibility: hidden; opacity: 0; transition: none";
  }
  logo.style = "visibility: hidden; transition: none";
  header.classList.remove("active");
};

dep1.addEventListener("mouseover", dep1Over);
dep1.addEventListener("mouseleave", dep1Leave);

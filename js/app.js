/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const navbarList = document.getElementById("navbar__list");
const allSections = document.querySelectorAll("section");
const toUpBtn = document.querySelector(".to-up-btn");
const collapseSection = document.querySelectorAll(".landing__caption__span");
const allParagraph = document.querySelectorAll("p");
const pageHeader = document.querySelector(".page__header");
const sectionOne = document.querySelector("section #section1");
const sectionTwo = document.querySelector("section #section2");
const sectionThree = document.querySelector("section #section3");
const sectionFour = document.querySelector("section #section4");

/**
 * End Global Variables
 * Start Helper Functions
 *
 *
 *
 *
 */

 // hide pageHeader(navbar) in scroll down
 // You can comment the following block of code to prevent navbar for being hidden
let lastScrolY = window.scrollY;
window.addEventListener("scroll", () => {
  lastScrolY <= window.scrollY
    ? //  hide the nav
      pageHeader.classList.add("page__header_hidden")
    : // show the nav
      pageHeader.classList.remove("page__header_hidden");
  // update the scrollY
  lastScrolY = window.scrollY;
});

/** 
 * End Helper Functions
 * Begin Main Functions
 *
 */

// Build menu

const creatListNav =( () => {
  let listContanier = document.createDocumentFragment();
  allSections.forEach((section) => {
    // creat the list item
    const listItem = document.createElement("li");
    //creat the link item
    const linkItme = document.createElement("a");
    // add the class
    linkItme.className = "menu__link";
    // add datast
    linkItme.dataset.link = section.id;
    // put the
    linkItme.innerText = section.id;

    // append link(a) to the li item
    listItem.appendChild(linkItme);

    // append li into the container
    listContanier.appendChild(listItem);

    // set default active section
    section.id == "section1" ? linkItme.classList.add("active-class") : "";
  });

  // add all the list item
  navbarList.appendChild(listContanier);
})();



// Add class 'active' to section when near top of viewport

// get the links
const navLinks = document.querySelectorAll(".menu__link");
const defaultSection = document.querySelector("[data-link]");

// add the event to each link
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    let activeSection = e.target.innerText;
    navLinks.forEach((link) => {
      link.innerText === activeSection
        ? e.target.classList.add("active-class")
        : link.classList.remove("active-class");
    });

    checkActiveSection(activeSection);
  });
});

// put the active section
const checkActiveSection = (activeSection) => {
  allSections.forEach((section) => {
    section.id === activeSection
      ? section.classList.add("your-active-class")
      : section.classList.remove("your-active-class");
  });
};

// Scroll to anchor ID using scrollTO event
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    let linkNav = link.getAttribute("data-link");
    let element = document.getElementById(linkNav);
    // Scroll to section on link click
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

/**
 * End Main Functions
 * Begin Events
 *
 */

// show  to-up-btn
window.addEventListener("scroll", () => {
  this.scrollY >= 1000
    ? toUpBtn.classList.add("show")
    : toUpBtn.classList.remove("show");
});

// add event to the to-up-btn
toUpBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// make sections collapsible on click
collapseSection.forEach((collSetion) => {
  collSetion.addEventListener("click", (e) => {
    allParagraph.forEach((p) => {
      p.id == e.target.id ? p.classList.toggle("hidden") : "";
      e.target.classList.toggle("extend");
    });
  });
});

// add active class to link item on scroll
let sectionOneObj = sectionOne.getBoundingClientRect();
let sectionTwoObj = sectionTwo.getBoundingClientRect();
let sectionThreeObj = sectionThree.getBoundingClientRect();
let sectionFourObj = sectionFour.getBoundingClientRect();

// add active calss
const addActiveSectionOnScroll = (section) => {
  navLinks.forEach((link) => {
    let dataLink = link.getAttribute("data-link");
    dataLink === section
      ? link.classList.add("active-class")
      : link.classList.remove("active-class");
  });
};

// find which sction active
window.addEventListener("scroll", () => {
  window.scrollY <= sectionOneObj.top + sectionOneObj.height
    ? addActiveSectionOnScroll("section1")
    : window.scrollY <= sectionTwoObj.top + sectionTwoObj.height
    ? addActiveSectionOnScroll("section2")
    : window.scrollY <= sectionThreeObj.top + sectionThreeObj.height
    ? addActiveSectionOnScroll("section3")
    : window.scrollY <= sectionFourObj.top + sectionFourObj.height
    ? addActiveSectionOnScroll("section4")
    : "";
});
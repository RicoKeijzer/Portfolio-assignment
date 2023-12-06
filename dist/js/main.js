//-----------------------------//
//-----for advent calender-----//
//-----------------------------//
// Select DOM Items
const contentItems = document.querySelectorAll(".content");
const contentCloser = document.querySelector(".content-closer");

contentItems.forEach((contentItem) => {
  contentItem.addEventListener("click", (e) => {
    const classes = contentItem.classList.contains("selected-day");
    if (classes) {
      contentItem.classList.remove("selected-day");
    } else {
      contentItem.classList.add("selected-day");
      contentCloser.classList.add("content-open");
    }
  });
});

//-----------------------------//
//-------background slides-----//
//-----------------------------//
//-------Menu buttons----------//
//-----------------------------//

// 12-11-23: add a scroll event handler to check where we are on the page and update the background images accordingly.
// 13-11-23: add another state to check if we are scrolling up or down and if we scroll up we show the menu buttons
//https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
const scrollContainer = document.querySelector("#scroll-container");

console.log(scrollContainer); // check

// states
let pageState = 1;
let headerState = { show: true, showmenu: true };

let scrollTop = 0;

//design variables
const menuHeight = 50; //vh

//initialize html elements
// for header
//const header = document.querySelector("#main-header");
const menuLogo = document.querySelector("#menu-logo");
const menuNav = document.querySelector("#menu-nav");

// for menu coloring
const homeSection = document.querySelector("#nav-home");
const aboutSection = document.querySelector("#nav-about-me");
const projectSection = document.querySelector("#nav-projects");
const contactSection = document.querySelector("#nav-contacts");
//const sections = [homeSection, aboutSection, projectSection, contactSection];

// for background sliders
const sliderContainer = document.querySelector(".slider-container");

// scrollin event for listeners
scrollContainer.addEventListener("scroll", () => {
  // event content
  // get window innerheight. get this everytime since page can be rescaled duringprocess.
  const viewHeight = window.innerHeight;

  // get new scroll height
  const newScrollTop = scrollContainer.scrollTop;

  //------------------------------------------//
  //- THIS SECTION WILL CHECK THE MENU STATE -//
  //------------------------------------------//

  // declare updateMenuState to add and remove classes from the header
  const updateMenuState = (element, state, tag) => {
    state ? element.classList.add(tag) : element.classList.remove(tag);
  };

  // first we will make sure the header will be visible in any state it was in.
  if (!headerState.show && newScrollTop <= menuHeight) {
    headerState.show = true;
    updateMenuState(menuLogo, true, "show");
    updateMenuState(sliderContainer, true, "show-menu");
    console.log("show header");
  } else if (headerState.show && newScrollTop > menuHeight) {
    headerState.show = false;
    updateMenuState(menuLogo, false, "show");
    updateMenuState(sliderContainer, false, "show-menu");
  }

  //next we will check the show menu state separatly
  if (headerState.showmenu) {
    // check if scrollbar is BIGGER then previous scrollbar
    // and check that during the first "menuHeight" pixels the menu bar will not get closed
    if (newScrollTop >= scrollTop && newScrollTop > menuHeight) {
      headerState.showmenu = false;
      updateMenuState(menuNav, false, "show-menu");
    }
  } else {
    // check if scrollbar is SMALLER then previous scrollbar
    if (newScrollTop <= scrollTop) {
      headerState.showmenu = true;
      updateMenuState(menuNav, true, "show-menu");
    }
  }

  //------------------------------------------------------------------//
  //- THIS SECTION WILL HIGHLIGHT THE MENU BASED ON LOCATION ON SITE -//
  //------------------------------------------------------------------//

  //const currentMenu = document.querySelector(".current");
  //const current = document.querySelector(currentMenu.getAttribute("href"));

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= viewHeight / 2 && rect.bottom >= viewHeight / 2
      //rect.top <= viewHeight / 2 && Math.abs(rect.bottom) >= viewHeight / 2
    );
  };

  const CheckMenuItemIfCurrent = (element) => {
    const query = `a[href^='#${element.id}']`;
    const anchorElement = document.querySelector(query);
    //console.log(anchorElement);
    updateMenuState(anchorElement, isInViewport(element), "current");

    //if (isInViewport(element)) {
    //  const query = `a[href^='#${element.id}']`;
    //  const anchorElement = document.querySelector(query);
    //  //console.log(anchorElement);
    //  updateMenuState(anchorElement, true, "current");
    //}
  };

  //if (isInViewport(current, viewHeight)) {
  //  console.log("Yes");
  //} else {
  //  updateMenuState(currentMenu, false, "current");
  //  console.log("is this read");

  CheckMenuItemIfCurrent(homeSection);
  CheckMenuItemIfCurrent(aboutSection);
  CheckMenuItemIfCurrent(projectSection);
  CheckMenuItemIfCurrent(contactSection);

  //const rect = aboutSection.getBoundingClientRect();
  //console.log(`top ${rect.top} botom ${rect.bottom}`);
  /*
    const isHome = isInViewport(homeSection, viewHeight);
    if (isHome) {
      const query = `a[href^='#${homeSection.id}']`;
      const el = document.querySelector(query);
      console.log(el);
      updateMenuState(el, true, "current");
    }
    const isAbout = isInViewport(aboutSection, viewHeight);
    console.log("is this read");
    //const isHome = isInViewport(homeSection, viewHeight);
    if (isAbout) {
      const query = `a[href^='#${aboutSection.id}']`;
      const el = document.querySelector(query);
      console.log(el);
      updateMenuState(el, true, "current");
    }

    const isproject = isInViewport(projectSection, viewHeight);
    const isContact = isInViewport(contactSection, viewHeight);
  */
  //}

  // update scrolltop counter to current counter
  scrollTop = newScrollTop;

  //------------------------------------------//
  //- THIS SECTION WILL CHECK THE PAGE STATE -//
  //------------------------------------------//

  // declare updateElement as higher order function to replace classes
  const updateElement = (item, tag, index) => {
    if (item.includes(tag)) {
      sliderContainer.classList.replace(item, `${tag}${index}`);
    }
  };

  // declare updateSlide to iterate over classes and update the slide classes
  const updateSlide = (index) => {
    sliderContainer.classList.forEach((x) => {
      updateElement(x, "slide-", index);
    });
  };

  // for the first page we want to remove half of the innerheight as a benchmark for when the first page is over.
  // all pages after are based on scrolling distance / innerheight. + 2 to compensate for the first page.
  let relativeScrollLocation = newScrollTop - viewHeight / 2;
  const slideCounter =
    document.getElementsByClassName("slide-section").length + 1;
  console.log(slideCounter);
  if (relativeScrollLocation <= 0) {
    if (pageState != 1) {
      pageState = 1;
      console.log("page #1");
      updateSlide(1);
    }
  } else {
    const relativeScrollPage =
      Math.floor(relativeScrollLocation / viewHeight) + 2;
    if (pageState != relativeScrollPage && slideCounter > relativeScrollPage) {
      pageState = relativeScrollPage;
      console.log(`page #${relativeScrollPage}`);
      updateSlide(relativeScrollPage);
    }
  }

  //updateMenuStates(viewHeight);
});

function updateMenuStates(viewHeight) {
  const isHome = isInViewport(homeSection, viewHeight);
  const isAbout = isInViewport(aboutSection, viewHeight);
  const isproject = isInViewport(projectSection, viewHeight);
  const isContact = isInViewport(contactSection, viewHeight);

  console.log(
    `home: ${isHome} - about: ${isAbout} - project: ${isproject} - contact: ${isContact}`
  );

  //const rect = contactSection.getBoundingClientRect();
  //console.log(`top ${rect.top} botom ${rect.bottom}`);
}

//----------------------------------------------//
//-------Additional functions found online------//
//----------------------------------------------//

// https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
//function isInViewport(element, viewHeight) {
//  const rect = element.getBoundingClientRect();

//  return rect.top <= viewHeight / 2 && Math.abs(rect.bottom) >= viewHeight / 2;
//}

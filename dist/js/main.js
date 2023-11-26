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
const header = document.getElementById("main-header");
const menuLogo = document.getElementById("menu-logo");
const menuNav = document.getElementById("menu-nav");

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
    //updateMenuState(sliderContainer, true, "show-menu");
    console.log("show header");
  } else if (headerState.show && newScrollTop > menuHeight) {
    headerState.show = false;
    updateMenuState(menuLogo, false, "show");
    //updateMenuState(sliderContainer, false, "show-menu");
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

  // update scrolltop counter to current counter
  scrollTop = newScrollTop;
});

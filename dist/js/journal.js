// js scripts for journal

const headerColor = "#91dc5a";
const footerColor = "#dc5a5a";
const backgroundLightenRate = 125;
const backgroundOpacity = 0.7;
// functions:

/* my attempt on the lighten color function.
// lighten() input colorstring , rate
// output a new color string
// equavalant of the lighten function in SASS
function lighten(color, rate) {
  console.log("input = " + color);
  var r = Number("0x" + color.slice(1, 3));
  var g = Number("0x" + color.slice(3, 4));
  var b = Number("0x" + color.slice(5, 7));

  function addColor(element) {
    const i = Math.round(element + (255 - element) * rate);

    //    var i  = element + rate;
    if (i >= 255) {
      return "ff";
    } else {
      return i.toString(16);
    }
  }

  const newRHexString = addColor(r);
  const newGHexString = addColor(g);
  const newBHexString = addColor(b);

  const newColor = `#${newRHexString}${newGHexString}${newBHexString}`;
  console.log("output = " + newColor);

  return newColor;
}
*/

// got this from https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
// tried to do it myself but the logic on how this had to be done I was already spending too much time on. see code above.
const colorShade = (col, amt) => {
  col = col.replace(/^#/, "");
  if (col.length === 3)
    col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];

  let [r, g, b] = col.match(/.{2}/g);
  [r, g, b] = [
    parseInt(r, 16) + amt,
    parseInt(g, 16) + amt,
    parseInt(b, 16) + amt,
  ];

  r = Math.max(Math.min(255, r), 0).toString(16);
  g = Math.max(Math.min(255, g), 0).toString(16);
  b = Math.max(Math.min(255, b), 0).toString(16);

  const rr = (r.length < 2 ? "0" : "") + r;
  const gg = (g.length < 2 ? "0" : "") + g;
  const bb = (b.length < 2 ? "0" : "") + b;

  return `#${rr}${gg}${bb}`;
};

// function to convert hex rgb to rgba value
const hexToRgba = (col, alpha) => {
  const r = Number("0x" + col.slice(1, 3));
  const g = Number("0x" + col.slice(3, 5));
  const b = Number("0x" + col.slice(5, 7));
  const rgba = `rgba(${r},${g},${b},${alpha})`;
  return rgba;
};

// scripts

//------------------notes --------------------------
// Note B color not done since it is the same value!
//--------------------------------------------------

// Set the colors or the header and footer and get the r g b values
const springR = Number("0x91");
const springG = Number("0xdc");
const autumnR = Number("0xdc");
const autumnG = Number("0x5a");

//get all the entries
var entries = document.getElementsByClassName("entry");

// calculate the color value steps
const rValueStep = (springR - autumnR) / (entries.length + 2); //+2 for the header and footer
const gValueStep = (springG - autumnG) / (entries.length + 2); //+2 for the header and footer
console.log("r step = " + rValueStep + ", G step = " + gValueStep);

// initialize r g b values to be used in for each loop
var rValue = springR;
var gValue = springG;

// to do a foreach loop on an array you need to do the [] but also the ... which makes  copy or the array.
[...entries].forEach((entry) => {
  rValue = rValue - rValueStep;
  gValue = gValue - gValueStep;

  //define new color
  const newRHexString = Math.round(rValue).toString(16); // first round to make sure it is not a double and then convert to HEX.
  const newGHexString = Math.round(gValue).toString(16);
  const newBHexString = "5a"; // value is the same for both header and footer
  // merge new r g b values together to new color "string".
  const newColor = `#${newRHexString}${newGHexString}${newBHexString}`;

  // add color to the border of the entry.
  // https://www.w3schools.com/cssref/tryit.php?filename=trycss_js_border-color
  entry.style.borderColor = newColor;

  // add feature that the H1 tags with entryhead will have the same color as the borders
  const entryheads = entry.getElementsByClassName("entryhead");
  [...entryheads].forEach((head) => {
    head.style.color = newColor;
  });

  // get a lighter version of the color and add it the the backgound of the entry.
  const ebgc = colorShade(newColor, 125);
  entry.style.backgroundColor = hexToRgba(ebgc, backgroundOpacity);

  //problem now is that the background color still needs to be lightened
});

// since the header and footer has a different lighten functionality in SASS then used above.
const header = document.getElementById("header");
const hbgc = colorShade(headerColor, backgroundLightenRate);
header.style.backgroundColor = hexToRgba(hbgc, backgroundOpacity);

const footer = document.getElementById("footer");
const fbgc = colorShade(footerColor, backgroundLightenRate);
footer.style.backgroundColor = hexToRgba(fbgc, backgroundOpacity);

// tests
console.log("other test " + colorShade("#91dc5a", 10));

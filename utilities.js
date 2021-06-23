
/*
 * GLOBAL VARIABLES USED BY ALL ALGORITHMS
 */

// the width of the algorithm sketch canvas.
let canvas_width  = window.innerWidth - (window.innerWidth / 6);

// the width of the algorithm sketch canvas.
let canvas_height = window.innerHeight - (window.innerHeight / 2);

// the x position of the canvas from the top right of the window
let p5_xPosition = window.innerWidth / 12;

// the x position of the canvas from the top right of the window
let p5_yPosition = window.innerHeight / 4 + 50;

// the frame rate that the sketch canvas is drawn at.
let frame_rate    = 30;

// number of millisecond delay for the recursive algorithms
let delay_ms      = 1000 / 30;

// the number of elements to be sorted and displayed on the sketch canvas.
let num_elements  = 100;

// the value each height value will be divisible by
// that results in the largest height always
// equal to the height of the canvas.
let height_scalar = canvas_height / num_elements;

// the width of each element so that the array of height
// will take up the entire width of the canvas.
let element_width = canvas_width / num_elements;

// the rgb value for the background on the sketch canvas.
let background_rgb = [215, 215, 215];

// the rgb value for the inner loop highlight on the sketch canvas.
let hl_inner_rgb   = [255, 255, 255];

// the rgb value for the outer loop highlight on the sketch canvas.
let hl_outer_rgb   = [0, 0, 0];

// the rgb value for the bar elements on the sketch canvas.
let bar_rgb        = [46,  135, 255];

// let selectionSorter;
let bubbleSorter;
let selectionSorter;
let insertionSorter;
let radixSorter;
let mergeSorter;
let quickSorter;


/*
  GLOBAL FUNCTIONS
 */

// populates and returns a heights array with length num_elements
// with values that start at (1 * height_scalar) and increment to
// (num_elements * height_scalar).
function setupHeights() {
  let heights = [];
  for (let i = 1; i <= num_elements; i++) {
    heights.push(Math.floor(i * height_scalar));
    // let randomHeight = floor(Math.random() * settings.canvasHeight);
    // heights.push(randomHeight);
  }
  return heights;
}

// Uses the Fisher-Yates shuffle to randomize
// the order of the given array
//
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
// https://bost.ocks.org/mike/shuffle/
function randomizeHeights(heights) {
  let m = heights.length;
  let temp;
  let index;

  // while m is not negative
  while (m) {
    // get a random index in the portion of the
    // array that is not randomized yet
    index = Math.floor(Math.random() * m);
    m--;

    swap(heights, m, index);
  }
  return heights;
}

// swaps the elements in integer array heights at indexes i and j
function swap(heights, i, j) {
  let temp = heights[i];
  heights[i] = heights[j];
  heights[j] = temp;
}

// sets the frame rate, creates a canvas,
// and sets local colors for the given p5.js sketch
function setupSketchCanvas(sketch) {
  sketch.frameRate(frame_rate);
  let canvas = sketch.createCanvas(canvas_width, canvas_height);
  canvas.position(p5_xPosition, p5_yPosition, 'fixed');

  sketch.backgroundColor = sketch.color(background_rgb[0], background_rgb[1],
                           background_rgb[2]);

  sketch.outerIndexColor = sketch.color(hl_outer_rgb[0], hl_outer_rgb[1],
                           hl_outer_rgb[2]);

  sketch.innerIndexColor = sketch.color(hl_inner_rgb[0], hl_inner_rgb[0],
                           hl_inner_rgb[0]);

  sketch.barColor = sketch.color(bar_rgb[0], bar_rgb[1],
                    bar_rgb[2]);
}

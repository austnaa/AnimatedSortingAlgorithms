// BUBBLE SORT ALGORITHM p5.js SKETCH
// AUSTN ATTAWAY, AUGUST 2021

bubbleSort = ( sketch ) => {
  let heights;
  let outerIndex; // the index of the outer loop in the bubble sort
  let innerIndex; // the index of the inner loop in the bubble sort
  let didSwap;    // whether or not the current inner loop completed a swap,
                  // for exiting the algorithm if the array is sorted

  // sets the initial state of the sketch when the program is started
  sketch.setup = () => {
    endSort();
    setupSketchCanvas(sketch);
    heights = setupHeights();
    heights = randomizeHeights(heights);

  };

  // draws the canvas in a loop when the sorting algorithm is running
  sketch.draw = () => {
    // changes the frame rate during the animation
    sketch.frameRate(frame_rate);

    if (innerIndex === heights.length - 1 - outerIndex) {
      // at the end of the inner loop, so increment the outer loop
      // and continue
      if (!didSwap) {
        // a swap in the inner loop did not occur, so we know
        // the array is sorted and we can end the sort.
        endSort();
      } else {
        // continue onto the next inner loop
        innerIndex = 0;
        outerIndex++;
        didSwap = false;
      }

    } else if (outerIndex === heights.length - 1) {
      // at the end of the outer loop, so finish
      endSort();

    }  else {
      // check the two adjacent values in the inner loop, swap them
      // if the are not increasing left to right
      if (heights[innerIndex] > heights[innerIndex + 1]) {
        swap(heights, innerIndex, innerIndex + 1);
        didSwap = true;
      }
      innerIndex++;

    }
    sketch.drawElements();
  };

  // draws the array of heights onto the canvas
  sketch.drawElements = () => {
    // set the background and outline colors
    sketch.background(sketch.backgroundColor);
    sketch.stroke(sketch.backgroundColor);

    for (let i = 0; i < num_elements; i++) {
      // set the color of the bars
      if (i === innerIndex) {
        sketch.fill(sketch.innerIndexColor);
      } else {
        sketch.fill(sketch.barColor);
      }

      let x = element_width * i;
      let y = canvas_height - heights[i];
      sketch.rect(x, y, element_width, heights[i]);
    }
  };

  // ends the current sort, settings values that
  // prepares for the next sort and avoids highlighting
  // elements when the sort is not taking place.
  function endSort() {
    outerIndex = -1;
    innerIndex = -2;
    didSwap = false;
    sketch.noLoop();
  }

  // starts the sorting algorithm animation
  sketch.startSort = () => {
    outerIndex = 0;
    innerIndex = 0;
    sketch.loop();
  };

  // stops the algorithm if it is running and
  // resets the array to be sorted
  sketch.resetHeights = () => {
    endSort();
    heights = setupHeights();
    heights = randomizeHeights(heights);
    sketch.drawElements();
  };

}

bubbleSorter = new p5(bubbleSort, 'p5-bubble-sort');

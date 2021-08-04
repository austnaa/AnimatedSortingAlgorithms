// INSERTION SORT ALGORITHM p5.js SKETCH
// AUSTN ATTAWAY, AUGUST 2021

const insertionSort = ( sketch ) => {
  let heights;
  let outerIndex; // the index of the outer loop in the bubble sort
  let innerIndex; // the index of the inner loop in the bubble sort

  // sets up this sketch for its first use
  sketch.setup = () => {
    endSort();
    setupSketchCanvas(sketch);
    heights = setupHeights();
    heights = randomizeHeights(heights);
  };

  // draws the canvas in a loop when the sorting algorithm is running
  sketch.draw = () => {
    sketch.frameRate(frame_rate);
    if (outerIndex === heights.length) {
      // at the end of the outer loop, so finish
      endSort();

    } else if (innerIndex === -1) {
      // at the end of the inner loop, so increment the outer loop index
      // and continue
      outerIndex++;
      innerIndex = outerIndex;

    } else {
      // currently inside inner loop, swap elements to continue
      // finding the correct insertion point, or stop the inner loop
      // when the insertion point is found.
      if (heights[innerIndex - 1] > heights[innerIndex]) {
        // keep looking for insertion point
        swap(heights, innerIndex - 1, innerIndex);
        innerIndex--;
      } else {
        // insertion point found
        innerIndex = -1;
      }
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
    sketch.noLoop();
    outerIndex = -1;
    innerIndex = -2;
  }

  // starts the algorithm animation
  sketch.startSort = () => {
    outerIndex = 1;
    innerIndex = 1;
    sketch.loop();
  };

  // resets the algorithm so it can be used again
  sketch.resetHeights = () => {
    endSort();
    heights = setupHeights();
    heights = randomizeHeights(heights);
    sketch.drawElements();
  };
}

insertionSorter = new p5(insertionSort, 'p5-insertion-sort');

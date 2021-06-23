// SELECTION SORT ALGORITHM p5.js SKETCH
// AUSTN ATTAWAY, MARCH 22, 2021

const selectionSort = ( sketch ) => {
  let heights;
  let outerIndex; // the index of the outer loop in the bubble sort
  let innerIndex; // the index of the inner loop in the bubble sort
  let minimumElement;
  let minimumElementIndex;

  sketch.setup = () => {
    endSort();
    setupSketchCanvas(sketch);
    heights = setupHeights();
    heights = randomizeHeights(heights);

    // dont do the animation immediately
    sketch.noLoop();
  };

  // draws the canvas in a loop when the sorting algorithm is running
  sketch.draw = () => {
    sketch.frameRate(frame_rate);
    if (outerIndex === heights.length) {
      // at the end of the outer loop, so finish
      endSort();
    } else if (innerIndex === heights.length) {
      // at the end of the inner loop, so swap the outer loop
      // index value with the value at minElementIndex, then
      // set values for the next inner loop cycle
      swap(heights, outerIndex, minimumElementIndex);
      outerIndex++;
      innerIndex = outerIndex;
      minimumElement = Number.MAX_VALUE;
      minimumElementIndex = -1;
    } else {
      // currently in the inner loop, so check for the
      // minimum element and continue
      if (heights[innerIndex] < minimumElement) {
        minimumElement = heights[innerIndex];
        minimumElementIndex = innerIndex;
      }
      innerIndex++;
    }
    sketch.drawElements();
  }

  // draws the array of heights onto the canvas
  sketch.drawElements = () => {
    sketch.background(sketch.backgroundColor);
    sketch.stroke(sketch.backgroundColor);
    for (let i = 0; i < num_elements; i++) {
      // set the color of the bars
      if (i === innerIndex) {
        sketch.fill(sketch.innerIndexColor);
      } else if (i === outerIndex || i === minimumElementIndex) {
        sketch.fill(sketch.outerIndexColor);
      } else {
        sketch.fill(sketch.barColor);
      }
      let x = element_width * i;
      let y = canvas_height - heights[i];
      sketch.rect(x, y, element_width, heights[i]);
    }
  }

  // ends the current sort, settings values that
  // prepares for the next sort and avoids highlighting
  // elements when the sort is not taking place.
  function endSort() {
    outerIndex = -1;
    innerIndex = -2;
    minimumElement = Number.MAX_VALUE;
    minimumElementIndex = -1;
    sketch.noLoop();
  }

  // starts the sorting algorithm animation
  sketch.startSort = () => {
    outerIndex = 0;
    innerIndex = 0;
    sketch.loop();
  };

  sketch.resetHeights = () => {
    endSort();
    heights = setupHeights();
    heights = randomizeHeights(heights);
    sketch.drawElements();
  };

  sketch.stopSort = () => {
    sketch.noLoop();
  }

  sketch.oneFrame = () => {
    sketch.redraw();
  }

  sketch.resume = () => {
    sketch.loop();
  }
}

selectionSorter = new p5(selectionSort, 'p5-selection-sort');

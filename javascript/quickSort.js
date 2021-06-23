// QUICK SORT ALGORITHM p5.js SKETCH
// AUSTN ATTAWAY, MARCH 22, 2021

const quickSort = ( sketch ) => {
  let heights;
  let started;
  let pivotIndexes;

  sketch.setup = () => {
    started = false;
    pivotIndexes = [];
    setupSketchCanvas(sketch);
    heights = setupHeights();
    heights = randomizeHeights(heights);

    // dont do the animation immediately
    sketch.noLoop();
  };

  // draws the canvas in a loop when the sorting algorithm is running
  sketch.draw = () => {
    sketch.drawElements();
  }

  // draws the array of heights onto the canvas
  sketch.drawElements = () => {
    sketch.background(sketch.backgroundColor);
    sketch.stroke(sketch.backgroundColor);

    for (let i = 0; i < num_elements; i++) {
      sketch.fill(sketch.barColor);
      let x = element_width * i;
      let y = canvas_height - heights[i];
      sketch.rect(x, y, element_width, heights[i]);

      // color the current pivot indexes in the inner highliht color
      for (let j = 0; j < pivotIndexes.length; j++) {
        if (pivotIndexes[j] === i) {
          sketch.fill(sketch.innerIndexColor);
          sketch.rect(x, y, element_width, heights[i]);
        }
      }
    }
  }

  // starts the sorting algorithm animation
  sketch.startSort = () => {
    if (!started) {
      started = true;
      quickSort(heights, 0, heights.length - 1);
      sketch.loop();
    }
  }

  sketch.resetHeights = () => {
    sketch.noLoop();
    started = false;
    pivotIndexes = [];
    heights = setupHeights();
    heights = randomizeHeights(heights);
    sketch.drawElements();
  };

  // sketch.stopSort = () => {
  //    sketch.noLoop();
  // }
  //
  // sketch.oneFrame = () => {
  //   sketch.redraw();
  // }

  // recursively completes the quicksort algorithm
  async function quickSort(heights, startIndex, endIndex) {
    if (!started) {
      return;
    }
    // end algorithm
    if (startIndex >= endIndex) {
      return;
    }
    let index = await partition(heights, startIndex, endIndex);
    await quickSort(heights, startIndex, index - 1);
    await quickSort(heights, index + 1, endIndex);
  }

  // completes a partition using the value at endIndex
  // as a pivot, uses a swap method with a delay so the animation
  // can play
  async function partition(heights, startIndex, endIndex) {
    let pivotIndex = startIndex;
    let pivotValIndex = endIndex;
    let pivotVal = heights[pivotValIndex];
    pivotIndexes[pivotValIndex] = pivotIndex;

    for (let i = startIndex; i <= endIndex; i++) {
      if (heights[i] < pivotVal) {
        await swap(heights, i, pivotIndex, delay_ms);
        pivotIndex++;
        pivotIndexes[pivotValIndex] = pivotIndex;
      }
    }
    pivotIndexes[pivotValIndex] = null;

    await swap(heights, pivotIndex, pivotValIndex, delay_ms);
    return pivotIndex;
  }

  // swaps the values in heights at i and j with a delay that
  // helps slow things down for the animation
  // https://github.com/CodingTrain/website/blob/main/CodingChallenges/CC_143_QuickSort/P5/sketch.js
  async function swap(heights, i, j, delay_ms) {
    await new Promise(resolve => setTimeout(resolve, delay_ms));
    let temp = heights[i];
    heights[i] = heights[j];
    heights[j] = temp;
  }
}

quickSorter = new p5(quickSort, 'p5-quick-sort');

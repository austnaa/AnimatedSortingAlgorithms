// MERGE SORT ALGORITHM p5.js SKETCH
// AUSTN ATTAWAY, MARCH 22, 2021

const mergeSort = ( sketch ) => {
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

  // runs when the animation is in progress
  sketch.draw = () => {
    sketch.drawElements();
  };

  // draws the array of heights onto the canvas
  sketch.drawElements = () => {
    sketch.background(sketch.backgroundColor);
    sketch.stroke(sketch.backgroundColor);

    for (let i = 0; i < num_elements; i++) {
      sketch.fill(sketch.barColor);

      let x = element_width * i;
      let y = canvas_height - heights[i];
      sketch.rect(x, y, element_width, heights[i]);

      for (let j = 0; j < pivotIndexes.length; j++) {
        if (pivotIndexes[j] === i) {
          sketch.fill(sketch.innerIndexColor);
          sketch.rect(x, y, element_width, heights[i]);
        }
      }
    }
  };

  sketch.startSort = () => {
    mergeSort(heights, 0, heights.length);
    sketch.loop();
  };

  sketch.resetHeights = () => {
    sketch.noLoop();
    heights = setupHeights();
    heights = randomizeHeights(heights);
    sketch.drawElements();
  };

  // delays instructions in the merge sort algorithm for
  // delay_ms ms
  async function sleep() {
    await new Promise(resolve => setTimeout(resolve, delay_ms));
  }

  // completes the mergeSort algorithm
  async function mergeSort(array, left, right) {
    if (right - left > 1) {
      let middle = left + ((right - left) >> 1);
      await mergeSort(array, left, middle);
      await mergeSort(array, middle, right);
      await merge(array, left, middle, right);
    }
  }

  // mergest the two sorted subarrays arrays in array
  // (left -> middle) and (middle -> right) and inserts
  // the resultant subarray into (left -> right),
  // sleeps when an element is added to the new subarray
  // for the animation
  async function merge(array, left, middle, right) {
    // length of the left subarray
    let leftLength = middle - left;

    // copy data from the left subarray into a temp array
    let leftArr = [];
    for (let i = 0; i < leftLength; i++) {
      leftArr[i] = array[left + i];
    }

    // initial indexes for the temp arrays
    let leftIndex = 0;
    let rightIndex = middle;

    // the starting index for the resulting sorted subarray
    let arrayIndex = left;

    // merge the temp arrays
    while (leftIndex < leftLength && rightIndex < right) {
      if (leftArr[leftIndex] <= array[rightIndex]) {
        // add element from the left subarray
        array[arrayIndex] = leftArr[leftIndex];
        leftIndex++;
        await sleep();
      } else {
        // add element from the right subarray
        array[arrayIndex] = array[rightIndex];
        rightIndex++;
        await sleep();
      }
      arrayIndex++;
    }

    // copy remaining elements of the temp arrays
    while (leftIndex < leftLength) {
      array[arrayIndex] = leftArr[leftIndex];
      leftIndex++;
      arrayIndex++;
      await sleep();
    }
  }
}

mergeSorter = new p5(mergeSort, 'p5-merge-sort');

// RADIX SORT ALGORITHM p5.js SKETCH
// AUSTN ATTAWAY, MARCH 22, 2021

const radixSort = ( sketch ) => {
  let heights;
  let heightsCopy;
  let currentIndex;

  let numIterations;
  let buckets;
  let maxDigits;
  let removingFromQueue; // if true, we are remoiving from queue
                         // if false, we are adding from buckets into queue
  let started;

  sketch.setup = () => {
    currentIndex = -1;
    numIterations = 1;
    buckets = [[], [], [], [], [], [], [], [], [], []];
    removingFromQueue = true;
    started = false;

    setupSketchCanvas(sketch);
    heights = setupHeights();
    heights = randomizeHeights(heights);
    heightsCopy = copyArr(heights);
    maxDigits = getLargestLength(heights);

    // dont do the animation immediately
    sketch.noLoop();
  };

  // runs when the animation is in progress
  sketch.draw = () => {
    sketch.frameRate(frame_rate);
    if (started) {
      if (removingFromQueue) {
        // currently removing elements from
        // the queue and putting them into their
        // respective buckets

        if (heightsCopy.length !== 0) {
          // the queue still has an element
          // so remove that element
          currentIndex++;
          let currVal = heightsCopy.shift();
          let currString = currVal.toString();
          let currDigit = currString[currString.length - numIterations];
          // if the value at that index doesn't exist, put it into the
          // 0 bucket, otherwise put it in the correct place
          if (currDigit === undefined) {
            buckets[0].push(currVal);
          }
          else {
            buckets[currDigit].push(currVal);
          }
        } else {
          // the queue is empty so setup variables
          // for removing from the buckets
          removingFromQueue = false;
          currentIndex = 0;
          currentBucket = 0;
        }

      } else {
        // we are removing elements from
        // the buckets and putting them
        // back into the main queue
        if (currentBucket === 9 && buckets[currentBucket].length === 0) {
          // the last bucket is empty, so finish the current iteration
          heightsCopy = copyArr(heights);
          removingFromQueue = true;
          currentIndex = 0;
          numIterations++;
        } else if (buckets[currentBucket].length === 0) {
          // the bucket we are currently on is empty, so move onto the next one
          currentBucket++;
        } else {
          // put the element from the current bucket into the main queue
          heights[currentIndex] = buckets[currentBucket].shift()
          currentIndex++;
        }
      }
    }
    // end the algorithm if we have done enough iterations
    // to check all possible digits
    if (numIterations === maxDigits + 1) {
      endSort();
    }
    sketch.drawElements();
  }

  // draws the array of heights onto the canvas
  sketch.drawElements = () => {
    sketch.background(sketch.backgroundColor);
    sketch.stroke(sketch.backgroundColor);
    for (let i = 0; i < num_elements; i++) {
      // set the color of the bars
      if (i === currentIndex) {
        sketch.fill(sketch.innerIndexColor);
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
    currentIndex = -2;
    started = false;
    sketch.noLoop();
  }

  // starts the sorting algorithm animation
  sketch.startSort = () => {
    currentIndex = 0;
    numIterations = 1;
    buckets = [[], [], [], [], [], [], [], [], [], []];
    removingFromQueue = true;
    started = true;
    sketch.loop();
  };

  sketch.resetHeights = () => {
    endSort();
    heights = setupHeights();
    heights = randomizeHeights(heights);
    heightsCopy = copyArr(heights);
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

radixSorter = new p5(radixSort, 'p5-radix-sort');

































// let arr = [11, 12, 13, 14, 15, 16, 258, 2345, 13, 1235, 3215, 9, 23, 0];
// let buckets = [[], [], [], [], [], [], [], [], [], []];

// use push(e) to enqueue
// use shift() to dequeue

// function radixSort(arr) {
//   // find the number of digits in the largest number
//   let numLoops = getLargestLength(arr);
//   for (let i = 0; i < numLoops; i++) {
//     // put all of the from the main array into the buckets depending on the
//     // value at digit (length - i - 1)
//     while (arr.length !== 0) {
//       let currVal = arr.shift();
//       let currString = currVal.toString();
//       let currDigit = currString[currString.length - i - 1];
//       // if the value at that index doesn't exist, put it into the
//       // 0 bucket, otherwise put it in the correct place
//       if (currDigit === undefined) {
//         buckets[0].push(currVal);
//       }
//       else {
//         buckets[currDigit].push(currVal);
//       }
//     }
//
//     // from 0 -> 9, enqueue the elements from the buckets back
//     // into the original array
//     for (let i = 0; i < 9; i++) {
//       while (buckets[i].length !== 0) {
//         arr.push(buckets[i].shift());
//       }
//     }
//
//   }
// }

function copyArr(heights) {
  let newArr = [];
  for (let i = 0; i < heights.length; i++) {
    newArr[i] = heights[i];
  }

  return newArr;

}

function getLargestLength(arr) {
  let longestLength = 0;

  arr.forEach(n => {
    longestLength = Math.max(longestLength, n.toString().length);
  });

  return longestLength;
}

// completes a bubble sort (for reference only)
// function bubbleSort(heights) {
//   // go from 0 to the end - 1, swap the elements if the first element
//   // is larger than the second one
//   for (let i = 0; i < heights.length - 1; i++) {
//     for (let j = 0; j < heights.length - 1; j++) {
//       if (heights[j] > heights[j + 1]) {
//         swap(heights, j, j + 1);
//       }
//     }
//   }
// }

// function insertionSort(heights) {
//   for (let i = 1; i < heights.length; ++i) {
//     for (let j = i; j > 0; j--) {
//       // found a location to put it
//       if (heights[j - 1] > heights[j]) {
//         swap(heights, j - 1, j);
//       } else {
//         break;
//       }
//     }
//   }
//   console.log(heights);
// }

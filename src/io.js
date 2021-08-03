// the algorithm that is currently displayed on the window
let current_sorting_algorithm = null;

// sets the current sorting algorithm
// depending on the type of algorithm given
function chooseAlgo(type) {
  disableAllSketches();

  // update the algorithm chooser dropdown text
  if (document.getElementById("algo-chooser-button")) {
    document.getElementById("algo-chooser-button").innerHTML = type + " Sort";
  }

  // update the current algorithm
  if (type === "Bubble") {
    current_sorting_algorithm = bubbleSorter;
    document.getElementById("p5-bubble-sort").style.display = "block";

  } else if (type === "Selection") {
    current_sorting_algorithm = selectionSorter;
    document.getElementById("p5-selection-sort").style.display = "block";

  } else if (type === "Insertion") {
    current_sorting_algorithm = insertionSorter;
    document.getElementById("p5-insertion-sort").style.display = "block";

  } else if (type === "Radix") {
    current_sorting_algorithm = radixSorter;
    document.getElementById("p5-radix-sort").style.display = "block";

  } else if (type === "Merge") {
    current_sorting_algorithm = mergeSorter;
    document.getElementById("p5-merge-sort").style.display = "block";

  } else if (type === "Quick") {
    current_sorting_algorithm = quickSorter;
    document.getElementById("p5-quick-sort").style.display = "block";
  }
  current_sorting_algorithm.resetHeights();
}

// disables all possible sketches so we can set a new one
function disableAllSketches() {
  current_sorting_algorithm = null;
  document.getElementById("p5-bubble-sort").style.display = "none";
  document.getElementById("p5-selection-sort").style.display = "none";
  document.getElementById("p5-insertion-sort").style.display = "none";
  document.getElementById("p5-radix-sort").style.display = "none";
  document.getElementById("p5-merge-sort").style.display = "none";
  document.getElementById("p5-quick-sort").style.display = "none";
}

// starts the algorithm that is selected
function startAlgo() {
  current_sorting_algorithm.startSort();
}

// stops the selected algorithm if it is running and
// resets the array to be sorted
function resetAlgo() {
  current_sorting_algorithm.resetHeights();
}

// sets the speed of sorting algorithms
function setSpeed(value) {
  frame_rate = Math.floor(value);
  delay_ms = 1000 / value;
  // TODO SET DELAY_MS FOR RECURSIVE ALGOS
}

// sets the size of the algorithm array
// depending on the value given
function setSize(value) {
  console.log(value);
  value = value * 10;
  num_elements = value;
  height_scalar = canvas_height / num_elements; // removed math.floor()
  element_width = (canvas_width / num_elements);
  current_sorting_algorithm.resetHeights();
}




//

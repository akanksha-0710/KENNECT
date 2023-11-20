let bars = []; // Array to store bar values
let speed = 50; // Default animation speed

// Function to change the color of a bar
function changeColor(bar, color) {
    bar.style.backgroundColor = color;
}

// Function to swap the positions of two bars
function swapBars(i, j) {
    let temp = bars[i].style.height;
    bars[i].style.height = bars[j].style.height;
    bars[j].style.height = temp;
}

function randomizeArray() {
    const newArray = generateRandomArray();
    createBars(newArray);
}

// Function to simulate delay for visualization
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function insertionSort() {
    let n = bars.length;

    for (let i = 1; i < n; i++) {
        let key = parseInt(bars[i].style.height);
        let j = i - 1;

        changeColor(bars[i], 'purple'); // Mark the current bar
        await sleep(speed);

        while (j >= 0 && parseInt(bars[j].style.height) > key) {
            changeColor(bars[j], 'red'); // Mark the bar being moved

            // Visualization: Swap bars
            swapBars(j, j + 1);
            await sleep(speed);

            changeColor(bars[j], '#3498db'); // Reset color
            j--;
        }

        bars[j + 1].style.height = `${key}px`;

        changeColor(bars[i], '#3498db'); // Reset color
        await sleep(speed);
    }
}

// Implement Selection Sort algorithm with visualization
async function selectionSort() {
    let n = bars.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        changeColor(bars[i], 'purple'); // Mark the bar being compared
        await sleep(speed);

        for (let j = i + 1; j < n; j++) {
            changeColor(bars[j], 'red'); // Mark the bar being compared
            await sleep(speed);

            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                if (minIndex !== i) {
                    changeColor(bars[minIndex], '#3498db'); // Reset color
                }
                minIndex = j;
            } else {
                changeColor(bars[j], '#3498db'); // Reset color
            }
        }

        // Visualization: Swap bars
        swapBars(i, minIndex);
        await sleep(speed);

        changeColor(bars[minIndex], '#3498db'); // Reset color
    }
}

// Implement Bubble Sort algorithm with visualization
async function bubbleSort() {
    let n = bars.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            changeColor(bars[j], 'purple'); // Mark the first bar being compared
            changeColor(bars[j + 1], 'red'); // Mark the second bar being compared
            await sleep(speed);

            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                // Visualization: Swap bars
                swapBars(j, j + 1);
                await sleep(speed);
            }

            changeColor(bars[j], '#3498db'); // Reset color
            changeColor(bars[j + 1], '#3498db'); // Reset color
        }
    }
}

// Implement Quick Sort algorithm with visualization
async function quickSort() {
    await quickSortHelper(0, bars.length - 1);
}

async function quickSortHelper(low, high) {
    if (low < high) {
        let partitionIndex = await quickPartition(low, high);

        await quickSortHelper(low, partitionIndex - 1);
        await quickSortHelper(partitionIndex + 1, high);
    }
}

async function quickPartition(low, high) {
    let pivot = parseInt(bars[high].style.height);
    let i = low - 1;

    for (let j = low; j < high; j++) {
        changeColor(bars[j], 'purple'); // Mark the bar being compared
        await sleep(speed);

        if (parseInt(bars[j].style.height) < pivot) {
            i++;
            // Visualization: Swap bars
            swapBars(i, j);
            await sleep(speed);
        }

        changeColor(bars[j], '#3498db'); // Reset color
    }

    // Visualization: Swap bars to place the pivot in the correct position
    swapBars(i + 1, high);
    await sleep(speed);

    changeColor(bars[i + 1], '#3498db'); // Reset color

    return i + 1;
}

// Implement Merge Sort algorithm with visualization
async function mergeSort() {
    await mergeSortHelper(0, bars.length - 1);
}

async function mergeSortHelper(low, high) {
    if (low < high) {
        let mid = Math.floor((low + high) / 2);
        await mergeSortHelper(low, mid);
        await mergeSortHelper(mid + 1, high);
        await merge(low, mid, high);
    }
}

async function merge(low, mid, high) {
    let leftSize = mid - low + 1;
    let rightSize = high - mid;

    let leftArray = new Array(leftSize);
    let rightArray = new Array(rightSize);

    for (let i = 0; i < leftSize; i++) {
        leftArray[i] = parseInt(bars[low + i].style.height);
    }

    for (let j = 0; j < rightSize; j++) {
        rightArray[j] = parseInt(bars[mid + 1 + j].style.height);
    }

    let i = 0;
    let j = 0;
    let k = low;

    while (i < leftSize && j < rightSize) {
        if (leftArray[i] <= rightArray[j]) {
            bars[k].style.height = `${leftArray[i]}px`;
            i++;
        } else {
            bars[k].style.height = `${rightArray[j]}px`;
            j++;
        }
        k++;
        await sleep(speed);
    }

    while (i < leftSize) {
        bars[k].style.height = `${leftArray[i]}px`;
        i++;
        k++;
        await sleep(speed);
    }

    while (j < rightSize) {
        bars[k].style.height = `${rightArray[j]}px`;
        j++;
        k++;
        await sleep(speed);
    }
}

// Implement Shell Sort algorithm with visualization
async function shellSort() {
    let n = bars.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            let temp = parseInt(bars[i].style.height);
            let j = i;

            changeColor(bars[j], 'purple'); // Mark the bar being compared
            await sleep(speed);

            while (j >= gap && parseInt(bars[j - gap].style.height) > temp) {
                changeColor(bars[j - gap], 'red'); // Mark the bar being moved

                // Visualization: Swap bars
                swapBars(j, j - gap);
                await sleep(speed);

                changeColor(bars[j - gap], '#3498db'); // Reset color
                j -= gap;
            }

            // Visualization: Place the key bar in the correct position
            bars[j].style.height = `${temp}px`;
            changeColor(bars[j], '#3498db'); // Reset color
            await sleep(speed);
        }
    }
}



// Event listener for the speed input range
document.getElementById('speed').addEventListener('input', function () {
    speed = this.value;
});

function changeSize() {
    bars.forEach((bar) => {
        // Adjust the size scaling based on your needs
        bar.style.width = `${parseInt(bar.style.width) / 2}px`;
    });
}

function generateRandomArray() {
    return Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
}

function createBars(array) {
    const sortingContainer = document.getElementById('sorting-container');
    sortingContainer.innerHTML = '';
    bars = [];

    array.reverse().forEach((value, index) => {
        const bar = document.createElement('div');
        bar.style.height = `${value * 5}px`; // Adjust the height scaling based on your needs
        bar.style.width = '20px'; // Initial width of bars
        bar.classList.add('bar');
        sortingContainer.appendChild(bar); // Use appendChild to add bars to the end
        bars.push(bar);
    });
}

//export const getBubbleSortAnimation

const red = 'rgb(255 0 0)';
const green = 'rgb(0 255 0)';
const blue = 'rgb(0 0 255)';
const yellow = 'rgb(255 255 0)';
const light_blue = 'rgb(21 190 255)';
const ss = '#2196f3';
const def = "rgb(255 0 247)"; //Default
const time = 100;
const arrayBars = document.getElementsByClassName('array-bar');

export const bubbleSort = async (array) => {
    let size = array.length;
    let flag = 0;
    for(let i = 0;i<size;i++){
        for(let j = 0;j<size-1;j++){
            const bar1 = arrayBars[j].style;
            const bar2 = arrayBars[j+1].style;

            bar1.backgroundColor = bar2.backgroundColor = blue;
            await sleep(time);

            if(array[j] > array[j + 1]){

                bar1.backgroundColor = bar2.backgroundColor = green;
                await sleep(time);
                swapBars(array, arrayBars, j, j+1);
                await sleep(time);
                flag += 1;
            }
            else{
                bar1.backgroundColor = bar2.backgroundColor = red;
                await sleep(time);
            }
            bar1.backgroundColor = bar2.backgroundColor = def;
        }
        if(flag === 0){
            for(const s of arrayBars){
                s.style.backgroundColor = ss;
                await sleep(70);
            }
            break;
        }
        flag = 0;
    }
    console.table(array);
}

export const selectionSort = async (array) => {
    const size = array.length;
    for(let step = 0; step<size-1;step++){
        let mid_idx = step;
        for(let j = step+1;j<size;j++){
            const bar1 = arrayBars[j].style;
            const bar2 = arrayBars[mid_idx].style;

            bar1.backgroundColor = light_blue;
            bar2.backgroundColor = yellow;
            await sleep(time);

            bar1.backgroundColor = bar2.backgroundColor = def;
            await sleep(time);

            if(array[j] < array[mid_idx]){
                mid_idx = j;
                bar1.backgroundColor = bar2.backgroundColor = green;
                await sleep(time);
                bar1.backgroundColor = bar2.backgroundColor = def;
            }
        }
        //bar1.backgroundColor = bar2.backgroundColor = def;
        //await sleep(time);
        swapBars(array, arrayBars, step, mid_idx);
        arrayBars[step].style.backgroundColor = green;
    }
    for(const s of arrayBars){
        s.style.backgroundColor = ss;
        await sleep(70);
    }
    console.table(array);
}

export const quickSort = async (array) => {
    
    const quicksrt = async (array, low, high) => {
        if (low < high) {

            // find pivot element such that
            // elements smaller than pivot are on the left
            // elements greater than pivot are on the right
            let pi = partition(array, low, high);
            
            // recursive call on the left of pivot
            quicksrt(array, low, pi - 1);

            // recursive call on the right of pivot
            quicksrt(array, pi + 1, high);
        }
    }

    console.log(array);
    const size = array.length;
    quicksrt(array, 0, (size-1));
    console.log(array);
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const swapBars = (arr, arrBar, a, b) => {
    let tmp = arr[a];
    arr[a] = arr[b];
    arrBar[a].style.backgroundColor = red;
    arrBar[a].style.height = `${arr[b]}px`;
    arr[b] = tmp;
    arrBar[b].style.backgroundColor = blue;
    arrBar[b].style.height = `${tmp}px`;
    arrBar[a].style.backgroundColor = arrBar[b].style.backgroundColor = def;
}

const partition = (array, low, high) => {
      
    // choose the rightmost element as pivot
    let pivot = array[high];
    
    // pointer for greater element
    let i = (low - 1);

    // traverse through all elements
    // compare each element with pivot

    if(i >= 0){
        const bar1 = arrayBars[high].style;
        const bar2 = arrayBars[i].style;
        bar1.backgroundColor = light_blue;
        bar2.backgroundColor = yellow;
    }

    for (let j = low; j < high; j++) {
      if (array[j] <= pivot) {

        // if element smaller than pivot is found
        // swap it with the greatr element pointed by i
        i++;

        // swapping element at i with element at j
        //swap(array, i, j);
        swapBars(array, arrayBars, i, j);
      }
    }

    // swapt the pivot element with the greater element specified by i
    //swap(array, i+1, high);
    swapBars(array, arrayBars, i+1, high);

    // return the position from where partition is done
    return (i + 1);
}


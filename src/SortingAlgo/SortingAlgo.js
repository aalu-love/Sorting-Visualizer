//export const getBubbleSortAnimation

export const bubbleSort = (array) => {
    const _animation = [];
    let size = array.length;
    //let flag = 0;
    for(let i = 0;i<size;i++){
        for(let j = 0;j<(size-1);j++){
            // const bar1 = arrayBars[j].style;
            // const bar2 = arrayBars[j+1].style;

            // bar1.backgroundColor = bar2.backgroundColor = blue;
            //await sleep(time);

            if(array[j] > array[j + 1]){
            
                _animation.push({'arr1_idx': j ,'arr1_val': array[j],'arr2_idx': j+1, 'arr2_val': array[j+1]});
                // bar1.backgroundColor = bar2.backgroundColor = green;
                // await sleep(time);
                swap(array, j, j+1);
                // swapBars(array, arrayBars, j, j+1);
                // await sleep(time);
                //flag += 1;
            }
            // else{
            //     bar1.backgroundColor = bar2.backgroundColor = red;
            //     await sleep(time);
            // }
            // bar1.backgroundColor = bar2.backgroundColor = def;
        }
        // if(flag === 0){
        //     for(const s of arrayBars){
        //         s.style.backgroundColor = ss;
        //         await sleep(time/2);
        //     }
        //     break;
        // }
        // flag = 0;
    }
    return {array, _animation};
}

export const selectionSort = (array) => {
    const _animation = [];
    const size = array.length;
    for(let step = 0; step<size-1;step++){
        let mid_idx = step;
        for(let j = step+1;j<size;j++){
            // const bar1 = arrayBars[j].style;
            // const bar2 = arrayBars[mid_idx].style;

            // bar1.backgroundColor = light_blue;
            // bar2.backgroundColor = yellow;
            // await sleep(time);

            // bar1.backgroundColor = bar2.backgroundColor = def;
            // await sleep(time);

            if(array[j] < array[mid_idx]){
                mid_idx = j;
                // bar1.backgroundColor = bar2.backgroundColor = green;
                // await sleep(time);
                // bar1.backgroundColor = bar2.backgroundColor = def;
            }
        }
        //bar1.backgroundColor = bar2.backgroundColor = def;
        //await sleep(time);
        _animation.push({'arr1_idx': step ,'arr1_val': array[step],'arr2_idx': mid_idx, 'arr2_val': array[mid_idx]});
        swap(array, step, mid_idx);
        // swapBars(array, arrayBars, step, mid_idx);
        // arrayBars[step].style.backgroundColor = green;
    }
    // for(const s of arrayBars){
    //     s.style.backgroundColor = ss;
    //     await sleep(time/2);
    // }
    //console.table(array);
    return {array, _animation};
}

export const quickSort = (array) => {
    const _animation = [];
    const partition = (array, low, high) => {
      
        // choose the rightmost element as pivot
        let pivot = array[high];
        
        // pointer for greater element
        let i = (low - 1);
        // traverse through all elements
        // compare each element with pivot
        for (let j = low; j < high; j++) {
          if (array[j] <= pivot) {
    
            // if element smaller than pivot is found
            // swap it with the greatr element pointed by i
            i++;
    
            // swapping element at i with element at j
            _animation.push({'arr1_idx': i ,'arr1_val': array[i],'arr2_idx': j, 'arr2_val': array[j]});
            swap(array, i, j);
            //swapBars(array, arrayBars, i, j);
          }
        }
    
        // swapt the pivot element with the greater element specified by i
        _animation.push({'arr1_idx': i+1 ,'arr1_val': array[i+1],'arr2_idx': high, 'arr2_val': array[high]});
        swap(array, i+1, high);
        //swapBars(array, arrayBars, i+1, high);
        
    
        // return the position from where partition is done
        return (i + 1);
    }
    
    const quicksrt = (array, low, high) => {
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
    const size = array.length;
    quicksrt(array, 0, (size-1));
    return {array,_animation};
}

export const heapSort = (array) => {
    const _animation = [];
    const sort = (arr) => {
        const n = arr.length;
    
        // Build max heap
        for (let i = n / 2 - 1; i >= 0; i--) {
          heapify(arr, n, i);
        }
    
        // Heap sort
        for (let i = n - 1; i >= 0; i--) {
            _animation.push({'arr1_idx': 0 ,'arr1_val': array[0],'arr2_idx': i, 'arr2_val': array[i]});
            swap(arr, 0, i);
            // const temp = arr[0];
            // arr[0] = arr[i];
            // arr[i] = temp;
    
          // Heapify root element
          heapify(arr, i, 0);
        }
        return arr;
    }

    const heapify = (arr, n, i) => {
        // Find largest among root, left child and right child
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
    
        if (l < n && arr[l] > arr[largest])
          largest = l;
    
        if (r < n && arr[r] > arr[largest])
          largest = r;
    
        // Swap and continue heapifying if root is not largest
        if (largest !== i) {
            _animation.push({'arr1_idx': i ,'arr1_val': array[i],'arr2_idx': largest, 'arr2_val': array[largest]});
            swap(arr, i, largest);
            // const swap = arr[i];
            // arr[i] = arr[largest];
            // arr[largest] = swap;
    
          heapify(arr, n, largest);
        }
    }
    const res = sort(array);
    return {res, _animation};
}

export const mergeSort = (array) => {
    const _animation = [];
    const merge = (arr, p, q, r) => {

        // Create L ← A[p..q] and M ← A[q+1..r]
        const n1 = q - p + 1;
        const n2 = r - q;
    
        let L = [];
        let M = [];
    
        for (let i = 0; i < n1; i++)
          L.push(arr[p + i]);
          console.log(L)
        for (let j = 0; j < n2; j++)
          M.push(arr[q + 1 + j])
          console.log(M)
    
        // Maintain current index of sub-arrays and main array
        let i=0, j=0, k=p;
    
        // Until we reach either end of either L or M, pick larger among
        // elements L and M and place them in the correct position at A[p..r]
        
        while (i < n1 && j < n2) {
          if (L[i] <= M[j]) {
            _animation.push({'arr1_idx': k ,'arr1_val': L[i]});
            arr[k] = L[i];
            i++;
          } else {
            _animation.push({'arr1_idx': k ,'arr1_val': M[j]});
            arr[k] = M[j];
            j++;
          }
          k++;
        }
    
        // When we run out of elements in either L or M,
        // pick up the remaining elements and put in A[p..r]
        while (i < n1) {
          _animation.push({'arr1_idx': k ,'arr1_val': L[i]});
          arr[k] = L[i];
          i++;
          k++;
        }
    
        while (j < n2) {
          _animation.push({'arr1_idx': k ,'arr1_val': M[j]});
          arr[k] = M[j];
          j++;
          k++;
        }
    }

    const mergeSort = (arr, l, r) => {
        if (l < r) {
    
          // m is the point where the array is divided into two subarrays
          const m = parseInt((l + r) / 2);
    
          mergeSort(arr, l, m);
          mergeSort(arr, m + 1, r);
    
          // Merge the sorted subarrays
          merge(arr, l, m, r);
        }
        return array;
    }

  const res = mergeSort(array, 0, (array.length - 1))
  return {res, _animation};
}

/*
const swapBars = (arr, arrBar, a, b) => {
    setTimeout(() => {
        let tmp = arr[a];
        arr[a] = arr[b];
        arrBar[a].style.height = `${arr[b]}px`;
        arr[b] = tmp;
        arrBar[b].style.height = `${tmp}px`;
        arrBar[a].style.backgroundColor = arrBar[b].style.backgroundColor = def;
    },time);
}
*/

const swap = (arr, a, b) => {
    let tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}


import React from 'react';
import './SortingVisualizer.css';
import * as SortAlgo from '../SortingAlgo/SortingAlgo.js';

const red = 'rgb(255 0 0)';
const green = 'rgb(0 255 0)';
// const blue = 'rgb(0 0 255)';
const yellow = 'rgb(255 255 0)';
// const light_blue = 'rgb(21 190 255)';
// const op_blue = 'rgb(21 190 255 / 30%)';
// const ss = '#2196f3';
const def = "rgb(255 0 247)"; //Default
let time = 50;
const arrayBars = document.getElementsByClassName('array-bar');
const btn = document.getElementsByTagName("button");

class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(arrSize=50) {
        const array = [];
        for(let i = 0; i < arrSize; i++){
            array.push(randomIntFromInterval(5, 700));
        }
        for(const i of arrayBars){
            i.style.backgroundColor = def;
        }
        this.setState({array});
    }

    bubbleSort(){
        this.switchOff("rangeIn");
        const javaScriptArray = this.state.array.slice().sort((a, b) => a - b);
        const sortedArray = SortAlgo.bubbleSort(this.state.array);
        console.log(arrayAreEqual(javaScriptArray, sortedArray.array));
        console.log(sortedArray);
        setTimeout(swapBars(sortedArray._animation),150);
    }

    selectionSort(){
        this.switchOff("rangeIn");
        const javaScriptArray = this.state.array.slice().sort((a, b) => a - b);
        const selectSort = SortAlgo.selectionSort(this.state.array);
        console.log(arrayAreEqual(javaScriptArray, selectSort.array));
        console.log(selectSort);
        setTimeout(swapBars(selectSort._animation),150);
    }

    quickSort(){
        this.switchOff("rangeIn");
        const javaScriptArray = this.state.array.slice().sort((a, b) => a - b);
        const quickSort = SortAlgo.quickSort(this.state.array);
        console.log(arrayAreEqual(quickSort.array, javaScriptArray));
        console.log(quickSort);
        setTimeout(swapBars(quickSort._animation),100);
    }

    heapSort(){
        this.switchOff("rangeIn");
        const javaScriptArray = this.state.array.slice().sort((a, b) => a - b);
        const heapSort = SortAlgo.heapSort(this.state.array);
        console.log(arrayAreEqual(heapSort.res, javaScriptArray));
        console.log(heapSort.res);
        setTimeout(swapBars(heapSort._animation),100);
    }

    mergeSort(){
        this.switchOff("rangeIn");
        const javaScriptArray = this.state.array.slice().sort((a, b) => a - b);
        const mergeSort = SortAlgo.mergeSort(this.state.array);
        console.log(javaScriptArray);
        console.log(arrayAreEqual(mergeSort.res, javaScriptArray));
        //console.log(mergeSort._animation);
        setTimeout(slideBars(mergeSort._animation),100);
    }

    render() {
        const {array} = this.state;

        return (
            <div className='array-container1'>
                <div className='array-bars'>
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{ height: `${value}px` }}></div>
                    ))}
                </div>
                <div className='input-box'>
                    <div className='card'>
                        <label>Range:</label>
                        <input className='form-range' id="rangeIn" type="range" min="3" max="450" onChange={event => this.resetArray(event.target.value)}></input>
                        <label>Speed:</label>
                        <input className='form-range' id="speed" type="range" min="3" max="100" onChange={event => {time = event.target.value}}></input>
                        <button className='btn btn-outline-primary' onClick={() => this.resetArray()}>Genrate New Array</button>
                        <button className='btn btn-outline-primary' onClick={() => this.mergeSort()}>Merge Sort</button>
                        <button className='btn btn-outline-primary' onClick={() => this.quickSort()}>Quick Sort</button>
                        <button className='btn btn-outline-primary' onClick={() => this.heapSort()}>Heap Sort</button>
                        <button className='btn btn-outline-primary' onClick={() => this.bubbleSort()}>Bubble Sort</button>
                        <button className='btn btn-outline-primary' onClick={() => this.selectionSort()}>Selection Sort</button>
                    </div>
                </div>
            </div>
        );
    }
    switchOff(ele){
        document.getElementById(ele).disabled = true;
        for(let i of btn){
            i.disabled = true
        }
    }

}

const sleep = (milliseconds) => {
    return new Promise(async resolve => await setTimeout(resolve, milliseconds));
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arrayAreEqual(arr1, arr2){
    if(arr1.length !== arr2.length) return false;
    for(let i = 0;i<arr1.length;i++){
        if(arr1[i] !== arr2[i]){
            return true;
        }
    }
    return true;
}

const swapBars = async (arrBar) => {
    for(const s of arrBar){
        arrayBars[s.arr1_idx].style.backgroundColor = arrayBars[s.arr2_idx].style.backgroundColor = red;
        await sleep(time);
        arrayBars[s.arr1_idx].style.backgroundColor = arrayBars[s.arr2_idx].style.backgroundColor = yellow;
        await sleep(time);
        arrayBars[s.arr1_idx].style.height = `${s.arr2_val}px`;
        arrayBars[s.arr2_idx].style.height = `${s.arr1_val}px`;
        await sleep(time);
        arrayBars[s.arr1_idx].style.backgroundColor = arrayBars[s.arr2_idx].style.backgroundColor = def
    }
    for(const i of arrayBars){
        i.style.backgroundColor = green;
        await sleep(time);
        time = time - 5;
    }
    for(let i of btn){
        i.disabled = false;
    }
    document.getElementById("rangeIn").disabled = false;
}

const slideBars = async (arrBar) => {
    console.log(arrBar)
    for(const s of arrBar){
        arrayBars[s.arr1_idx].style.backgroundColor = red;
        await sleep(time);
        arrayBars[s.arr1_idx].style.height = `${s.arr1_val}px`;
        await sleep(time);
        arrayBars[s.arr1_idx].style.backgroundColor = def;
    }
    for(const i of arrayBars){
        i.style.backgroundColor = green;
        await sleep(time);
        time = time - 5;
    }
    for(let i of btn){
        i.disabled = false;
    }
    document.getElementById("rangeIn").disabled = false;
}

export default SortingVisualizer;

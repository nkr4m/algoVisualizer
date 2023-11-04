"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import './page.css'
import { AiFillCaretLeft } from "react-icons/ai";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { motion } from "framer-motion"
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export default function DijkstrasAlgoPage() {

    const codeString = `import java.util.*; 

    class Node
    {
         int row;
         int col;
         int weight;
        
        Node(int row, int col, int w) {
            this.row = row;
            this.col = col;
            this.weight = w;
        }
    }
    
    class Main
    {
        void shortestPath(int r, int c, int[][] adj, int tragetR, int tragetR)
        {
            int dist[] = new int[adj.length][adj.length];
            int coo[][] = {{1, 0}, {-1, 0}, {0, -1}, {0, 1}};
            for(int i = 0;i<N;i++) dist[i] = 100000000;
            dist[s] = 0; 
            
            PriorityQueue<Node> pq = new PriorityQueue<Node>((x,y)->x.weight-y.weight);
            pq.add(new Node(r, c, 0));
            
            while(pq.size() > 0) {
                Node node = pq.poll();
                int row = node.row;
                int col = node.col;
                int w = node.weight;

                for (let c = 0; c < coo.length; c++) {
                    let newR = coo[c][0] + row;
                    let newC = coo[c][1] + column;

                    if (newR >= 0 && newR < temp.length && newC >= 0 && newC < temp[0].length) {
                        // if it lies inside the grid
                        if (temp[newR][newC] > 1 + w) {
                            temp[newR][newC] = 1 + w;
                            if (arr[newR][newC] == num) {
                                return;
                            }
                            queue.add(new Node(newR, newC, w + 1));
                        }

                    }

                }
            } 
        }
        public static void main(String args[])
        {

            arr[][] = {{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12},
    {13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24},
    {25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36},
    {37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48},
    {49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60},
    {61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72}}
            
            obj.shortestPath(0,0,arr, tragetR, targetC); 
            
        }`


    let sortingTimeout;
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const [msg, setMsg] = useState("Select a starting point to begin the search");
    // s- select start point, e-select end point, p-progress, c-completed
    const [status, setStatus] = useState('s')

    const [arr, setArr] = useState([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
    [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
    [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72]])

    const [temp, setTemp] = useState([[1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
    [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
    [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
    [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
    [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
    [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]])



    function getRowColumn(number) {
        let columns = 12;
        const row = Math.floor((number - 1) / columns) + 1;
        const column = (number - 1) % columns + 1;

        return { row, column };
    }


    const performTask = async (e) => {
        let num = e.target.getAttribute('data-value')
        const { row, column } = getRowColumn(num);

        if (status == 's') {
            setStart(num);
            // mark the start cell
            const divToChange = document.querySelector(`[data-value="${num}"]`);
            divToChange.style.backgroundColor = '#E6E6FA';
            divToChange.innerHTML = 'START'
            setMsg("Select an ending point to finish the search")
            setStatus('e')
        } else if (status == 'e') {
            setEnd(num);
            const divToChange = document.querySelector(`[data-value="${num}"]`);
            divToChange.style.backgroundColor = '#32de84';
            divToChange.innerHTML = 'END'
            setMsg("Searching for the shortest path...")
            setStatus('p')

            // await delay(2000)

            // console.log(start);
            // console.log(end, num)
            // console.log(arr);
            // console.log(temp);
            let dr = -1;
            let dc = -1;
            let coo = [[1, 0], [-1, 0], [0, -1], [0, 1]]
            var queue = [];
            queue.push(start);
            // temp[row9-1][column9-1] = 0;
            let flag = false;
            while (queue.length > 0) {

                let size = queue.length;
                for (let i = 0; i < size; i++) {
                    let front = queue.shift();



                    let { row, column } = getRowColumn(front);
                    row -= 1;
                    column -= 1;
                    // if (front == num) {
                    //     // we have found the element
                    //     console.log('shortest distance: ' + temp[row][column])
                    //     console.log(temp)
                    //     return;
                    // }
                    if (flag == false) {
                        temp[row][column] = 0;
                        flag = true;
                        setTemp([...temp]);
                    }
                    console.log(row, column);
                    for (let c = 0; c < coo.length; c++) {
                        let newR = coo[c][0] + row;
                        let newC = coo[c][1] + column;

                        if (newR >= 0 && newR < temp.length && newC >= 0 && newC < temp[0].length) {
                            // if it lies inside the grid
                            if (temp[newR][newC] > 1 + temp[row][column]) {
                                temp[newR][newC] = 1 + temp[row][column];
                                const divToChange = document.querySelector(`[data-value="${arr[newR][newC]}"]`);
                                if (arr[newR][newC] == num) {
                                    divToChange.style.backgroundColor = '#32de84';
                                    divToChange.innerHTML = 'END';
                                    pathFromDestToSrc(num, start);
                                    return;
                                }
                                divToChange.style.backgroundColor = '#E6E6FA';
                                divToChange.innerHTML = 1 + temp[row][column];
                                setTemp([...temp]);
                                await delay(100);
                                queue.push(arr[newR][newC]);
                            }

                        }

                    }
                }

            }





        } else if (status == 'p') {



        } else if (status == 'c') {

        }

    }

    const delay = (ms) => {
        return new Promise((resolve) => {
            sortingTimeout = setTimeout(resolve, ms);
        });
    };

    const pathFromDestToSrc = async (end, start) => {
        let coo = [[1, 0], [-1, 0], [0, -1], [0, 1]]
        let flag = false;
        let val = -1;
        while (end != start) {

            let { row, column } = getRowColumn(end);
            row -= 1;
            column -= 1;
            if (flag == false) {
                val = temp[row][column];
                flag = true;
            }
            for (let i = 0; i < coo.length; i++) {
                let newR = coo[i][0] + row;
                let newC = coo[i][1] + column;
                if (newR >= 0 && newR < temp.length && newC >= 0 && newC < temp[0].length) {
                    if (temp[newR][newC] == temp[row][column] - 1) {
                        const divToChange = document.querySelector(`[data-value="${arr[newR][newC]}"]`);
                        divToChange.style.backgroundColor = '#32de84';
                        setTemp([...temp]);
                        await delay(200);
                        row = newR;
                        column = newC;
                        end = arr[newR][newC];
                    }
                }

            }
            setStatus('c')
            setMsg("Dijkstra's Algorithm for searching the shortest path is completed, Shortest Distance is " + val)
        }


    }

    const reset = () => {
        let ttemp = [[1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
        [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
        [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
        [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
        [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
        [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]];

        let tarr = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
        [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
        [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72]];

        setTemp([...ttemp]);
        setArr([...tarr]);
        setStart(null);
        setEnd(null);

        var elements = document.getElementsByClassName("matrix-box");

        // Iterate over the elements and change the color
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            // Modify the color using the style property
            element.style.backgroundColor = "white";
            element.innerHTML = ''

            // Alternatively, you can add or remove CSS classes
            // element.classList.add("new-class-name");
            // element.classList.remove("old-class-name");
        }
        setStatus('s')




    }




    return (
        <>

            <Link href="/" type="button" className="btn"><AiFillCaretLeft />Back</Link>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                // transition={{ duration: 0.2 }}
                className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h3>Dijkstra's Algorithm</h3>
                        <button type="button" className="btn btn-primary btn-sm" onClick={reset}>Reset</button>

                        <div className='text-center'>
                            <code>We plan to find the shortest distance between any two nodes from the below matrix.</code>
                        </div>
                        <p className='text-center'><span style={{ fontSize: '16px', backgroundColor:'yellow', fontSize:'bolder' }}>&nbsp;&nbsp;&nbsp;{msg} &nbsp;&nbsp;&nbsp;</span></p>
                        
                        <div>
                            <div className="card-body">
                                <div className="container text-center">
                                    <div className="row justify-content-center mt-2">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} className='container-fluid' style={{ padding: '20px' }}>
                {/* 0-36 numbers */}
                <div className="martix-container">
                    <div className="matrix-board">
                        <div className="matrix-box" data-value='1' onClick={performTask}></div>
                        <div className="matrix-box" data-value='2' onClick={performTask}></div>
                        <div className="matrix-box" data-value='3' onClick={performTask}></div>
                        <div className="matrix-box" data-value='13' onClick={performTask}></div>
                        <div className="matrix-box" data-value='14' onClick={performTask}></div>
                        <div className="matrix-box" data-value='15' onClick={performTask}></div>
                        <div className="matrix-box" data-value='25' onClick={performTask}></div>
                        <div className="matrix-box" data-value='26' onClick={performTask}></div>
                        <div className="matrix-box" data-value='27' onClick={performTask}></div>
                    </div>
                    <div className="matrix-board">
                        <div className="matrix-box" data-value='4' onClick={performTask}></div>
                        <div className="matrix-box" data-value='5' onClick={performTask}></div>
                        <div className="matrix-box" data-value='6' onClick={performTask}></div>
                        <div className="matrix-box" data-value='16' onClick={performTask}></div>
                        <div className="matrix-box" data-value='17' onClick={performTask}></div>
                        <div className="matrix-box" data-value='18' onClick={performTask}></div>
                        <div className="matrix-box" data-value='28' onClick={performTask}></div>
                        <div className="matrix-box" data-value='29' onClick={performTask}></div>
                        <div className="matrix-box" data-value='30' onClick={performTask}></div>
                    </div>
                    <div className="matrix-board">
                        <div className="matrix-box" data-value='7' onClick={performTask}></div>
                        <div className="matrix-box" data-value='8' onClick={performTask}></div>
                        <div className="matrix-box" data-value='9' onClick={performTask}></div>
                        <div className="matrix-box" data-value='19' onClick={performTask}></div>
                        <div className="matrix-box" data-value='20' onClick={performTask}></div>
                        <div className="matrix-box" data-value='21' onClick={performTask}></div>
                        <div className="matrix-box" data-value='31' onClick={performTask}></div>
                        <div className="matrix-box" data-value='32' onClick={performTask}></div>
                        <div className="matrix-box" data-value='33' onClick={performTask}></div>
                    </div>
                    <div className="matrix-board">
                        <div className="matrix-box" data-value='10' onClick={performTask}></div>
                        <div className="matrix-box" data-value='11' onClick={performTask}></div>
                        <div className="matrix-box" data-value='12' onClick={performTask}></div>
                        <div className="matrix-box" data-value='22' onClick={performTask}></div>
                        <div className="matrix-box" data-value='23' onClick={performTask}></div>
                        <div className="matrix-box" data-value='24' onClick={performTask}></div>
                        <div className="matrix-box" data-value='34' onClick={performTask}></div>
                        <div className="matrix-box" data-value='35' onClick={performTask}></div>
                        <div className="matrix-box" data-value='36' onClick={performTask}></div>
                    </div>
                </div>

                {/* 37-72 */}
                <div className="martix-container">
                    <div className="matrix-board">
                        <div className="matrix-box" data-value='37' onClick={performTask}></div>
                        <div className="matrix-box" data-value='38' onClick={performTask}></div>
                        <div className="matrix-box" data-value='39' onClick={performTask}></div>
                        <div className="matrix-box" data-value='49' onClick={performTask}></div>
                        <div className="matrix-box" data-value='50' onClick={performTask}></div>
                        <div className="matrix-box" data-value='51' onClick={performTask}></div>
                        <div className="matrix-box" data-value='61' onClick={performTask}></div>
                        <div className="matrix-box" data-value='62' onClick={performTask}></div>
                        <div className="matrix-box" data-value='63' onClick={performTask}></div>
                    </div>
                    <div className="matrix-board">
                        <div className="matrix-box" data-value='40' onClick={performTask}></div>
                        <div className="matrix-box" data-value='41' onClick={performTask}></div>
                        <div className="matrix-box" data-value='42' onClick={performTask}></div>
                        <div className="matrix-box" data-value='52' onClick={performTask}></div>
                        <div className="matrix-box" data-value='53' onClick={performTask}></div>
                        <div className="matrix-box" data-value='54' onClick={performTask}></div>
                        <div className="matrix-box" data-value='64' onClick={performTask}></div>
                        <div className="matrix-box" data-value='65' onClick={performTask}></div>
                        <div className="matrix-box" data-value='66' onClick={performTask}></div>
                    </div>
                    <div className="matrix-board">
                        <div className="matrix-box" data-value='43' onClick={performTask}></div>
                        <div className="matrix-box" data-value='44' onClick={performTask}></div>
                        <div className="matrix-box" data-value='45' onClick={performTask}></div>
                        <div className="matrix-box" data-value='55' onClick={performTask}></div>
                        <div className="matrix-box" data-value='56' onClick={performTask}></div>
                        <div className="matrix-box" data-value='57' onClick={performTask}></div>
                        <div className="matrix-box" data-value='67' onClick={performTask}></div>
                        <div className="matrix-box" data-value='68' onClick={performTask}></div>
                        <div className="matrix-box" data-value='69' onClick={performTask}></div>
                    </div>
                    <div className="matrix-board">
                        <div className="matrix-box" data-value='46' onClick={performTask}></div>
                        <div className="matrix-box" data-value='47' onClick={performTask}></div>
                        <div className="matrix-box" data-value='48' onClick={performTask}></div>
                        <div className="matrix-box" data-value='58' onClick={performTask}></div>
                        <div className="matrix-box" data-value='59' onClick={performTask}></div>
                        <div className="matrix-box" data-value='60' onClick={performTask}></div>
                        <div className="matrix-box" data-value='70' onClick={performTask}></div>
                        <div className="matrix-box" data-value='71' onClick={performTask}></div>
                        <div className="matrix-box" data-value='72' onClick={performTask}></div>
                    </div>
                </div>


            </motion.div>

            <div className="container" style={{ marginTop: '60px' }}>
                <div className="row">
                    <motion.div initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }} className="col-12 col-md-4 mb-3">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Summary
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">

                                        Welcome to the interactive Selection Sort experience! Selection Sort is a simple sorting algorithm that works by repeatedly finding the minimum element from the unsorted part of the list and swapping it with the first unsorted element. Join us on this sorting adventure and witness Selection Sort in action!
                                        <br /><br />
                                        <strong>Instructions:</strong>Visualize the Unsorted List:

                                        Imagine you have an unsorted list of numbers.
                                        Feel free to choose a list size and populate it with random numbers.
                                        Observe the Sorting Process:

                                        <br /><br />

                                        Watch as Selection Sort finds the minimum element and moves it to its correct position in each iteration.
                                        Notice how the sorted portion of the list expands from the beginning.
                                        Observe how the algorithm selects the minimum element and swaps it with the current unsorted element.
                                        Step-by-Step Animation:

                                        <br /><br />

                                        If you prefer a step-by-step walkthrough, you can interact with the animation.
                                        Click the "Next" button to move through each iteration of Selection Sort.
                                        Visualize the selection of minimum elements, swaps, and the gradual formation of the sorted part of the list.
                                        Track how the sorted part grows until the entire list becomes sorted.
                                        Compare Efficiency:

                                        <br /><br />

                                        Compare Selection Sort's performance with other sorting algorithms.
                                        Notice that Selection Sort performs a constant number of swaps, making it useful when minimizing the number of swaps is a priority.
                                        Understand its time complexity and when it becomes less efficient compared to algorithms like Merge Sort or Quick Sort.
                                        <br /><br />
                                        <strong>Conclusion:</strong>Congratulations! You have experienced Selection Sort in action. Through this interactive content, you witnessed how Selection Sort gradually builds a sorted list by selecting the minimum element in each iteration and placing it in its correct position. While it may not be the most efficient sorting algorithm for larger datasets, it has its advantages in scenarios where minimizing swaps is crucial. Now that you have a better understanding of Selection Sort, feel free to explore other sorting algorithms and deepen your knowledge in the fascinating world of sorting!


                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }} className="col">
                        <SyntaxHighlighter language="javascript" style={docco}>
                            {codeString}
                        </SyntaxHighlighter>
                    </motion.div>
                </div>
            </div>

        </>
    )
}

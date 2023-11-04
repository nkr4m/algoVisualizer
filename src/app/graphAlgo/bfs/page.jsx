"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import './page.css'
import { AiFillCaretLeft } from "react-icons/ai";
import { motion } from "framer-motion"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export default function BfsPage() {

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
        void bfs(int r, int c, int[][] adj, int tragetR, int tragetR)
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
            
            obj.bfs(0,0,arr, tragetR, targetC); 
            
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
            setMsg("Click on cells to add blockages or click on vislualize to view the search")
            setStatus('w')
        } else if (status == 'w') {

            const divToChange = document.querySelector(`[data-value="${num}"]`);
            if (divToChange.dataset.value == start || divToChange.dataset.value == end) {
                return;
            }
            divToChange.style.backgroundColor = 'black';
            divToChange.style.color = 'white';
            divToChange.innerHTML = 'X'
            temp[row - 1][column - 1] = -2;
            console.log("adding walls")



        } else if (status == 'p') {



        }

    }

    const progress = async () => {

        console.log(start, end)
        let num = end
        let res = false;
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
                        if (temp[newR][newC] == -2) {
                            continue;
                        } else if (temp[newR][newC] > 1 + temp[row][column]) {
                            temp[newR][newC] = 1 + temp[row][column];
                            const divToChange = document.querySelector(`[data-value="${arr[newR][newC]}"]`);
                            if (arr[newR][newC] == num) {
                                divToChange.style.backgroundColor = '#32de84';
                                divToChange.innerHTML = 'END';
                                res = true;
                                pathFromDestToSrc(num, start);
                                return;
                            }
                            divToChange.style.backgroundColor = '#E6E6FA';
                            // divToChange.innerHTML = 1 + temp[row][column];
                            setTemp([...temp]);
                            await delay(100);
                            queue.push(arr[newR][newC]);
                        }

                    }

                }
            }



        }
        if (res == false) {
            setMsg("The path can't be reached as there are enough number of blockages")
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
            setMsg("Breadth First Search has found the path");
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
            element.style.color = "black";

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
                        <h3>Breadth First Search</h3>
                        <button type="button" className="btn btn-primary btn-sm" onClick={reset}>Reset</button>
                        &nbsp;&nbsp;
                        {status == 'w' && <button type="button" className="btn btn-primary btn-sm" onClick={() => {
                            setStatus('p')
                            progress();
                        }}>Visualize</button>}
                        <div className='text-center'>
                        <code>We plan to find the shortest distance between any two nodes with provided blockages from the below matrix.</code>
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

                                        Welcome to the interactive Breadth-First Search experience! Breadth-First Search is a graph traversal algorithm that explores the vertices of a graph in a breadthward motion, visiting all vertices at a given depth level before moving to the next level. Join us on this exploration adventure and witness Breadth-First Search in action!
                                        <br /><br />
                                        <strong>Instructions</strong>:Visualize the Graph:

                                        Imagine you have a graph consisting of nodes and edges connecting them.
                                        Feel free to choose the number of nodes and their connections.
                                        Select the Starting Node:
                                        <br /><br />

                                        Choose a starting node from which the Breadth-First Search exploration will begin.
                                        This node will serve as the root of the search tree.
                                        Observe the Exploration Process:
                                        <br /><br />

                                        Watch as Breadth-First Search systematically explores the graph in a breadthward manner.
                                        Observe how it visits all the vertices at a given depth level before moving deeper into the graph.
                                        Track the order in which the nodes are visited, revealing the breadth-first nature of the algorithm.
                                        Step-by-Step Animation:
                                        <br /><br />

                                        If you prefer a step-by-step walkthrough, you can interact with the animation.
                                        Click the "Next" button to move through each step of the Breadth-First Search algorithm.
                                        Visualize the expansion of nodes, the discovery of new vertices, and the building of the search tree.
                                        Track how the algorithm progresses until all reachable nodes have been visited.
                                        Explore Variations:
                                        <br /><br />

                                        Experiment with different graph topologies and starting nodes to see how Breadth-First Search adapts.
                                        Observe how the connectivity and structure of the graph impact the exploration process.
                                        <br /><br />
                                        <strong>Conclusion</strong>:Congratulations! You have experienced Breadth-First Search in action. Through this interactive content, you witnessed how Breadth-First Search explores a graph in a breadthward manner, systematically visiting vertices at each depth level. With its ability to find the shortest path in unweighted graphs and traverse graph structures efficiently, Breadth-First Search is a powerful algorithm. Now that you have a better understanding of Breadth-First Search, feel free to explore other graph algorithms and continue your journey into the fascinating world of graph theory and algorithms!

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

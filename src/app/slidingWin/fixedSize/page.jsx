"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import './page.css'
import { AiFillCaretLeft } from "react-icons/ai";
import { motion } from "framer-motion"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export default function FixedSizePage() {
    const codeString = `public class FixedSizeSlidingWindow {
        public static void main(String[] args) {
            int[] nums = {1, 3, 5, 7, 9, 2, 4, 6, 8, 10};
            int windowSize = 3;
    
            // Iterate through the array with a sliding window
            for (int i = 0; i <= nums.length - windowSize; i++) {
                // Process the current window
                for (int j = i; j < i + windowSize; j++) {
                    System.out.print(nums[j] + " ");
                }
                // Move to the next line for the next window
                System.out.println(); 
            }
        }
    }
    `
    let sortingTimeout;

    const [arr, setArr] = useState([
        76, 54, 21, 76, 98, 21
    ]);
    const [temp, setTemp] = useState([]);
    const [winSize, setWinSize] = useState(3);
    const [target, setSet] = useState(151);
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);

    useEffect(() => {
        // Get elements with the desired class name
        let elements = document.getElementsByClassName('matrix-box');

        // Iterate over the elements
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];

            // Modify the inner HTML
            element.innerHTML = arr[i];
        }
    }, [])



    const delay = (ms) => {
        return new Promise((resolve) => {
            sortingTimeout = setTimeout(resolve, ms);
        });
    };

    const progress = async () => {
        setFlag(true)
        let start = 0;
        let c = 0;
        let currSum = 0;
        for (let end = 0; end < arr.length; end++) {
            if (end <= 2) {
                await delay(1000);
                const divToChange = document.querySelector(`[data-value="${end + 1}"]`);
                console.log(divToChange);
                divToChange.style.backgroundColor = '#32de84';
                currSum += arr[end];
            } else {
                await delay(2000);
                if (currSum == target) {
                    await delay(2000);
                    console.log('we have a match')
                    let str = [];
                    for (let j = start + 1; j <= end; j++) {
                        str.push(arr[j - 1]);
                        const divToChange = document.querySelector(`[data-value="${j}"]`);
                        divToChange.style.backgroundColor = 'yellow';
                    }
                    temp.push(str)
                    await delay(2000);
                    for (let j = start + 1; j <= end; j++) {
                        str += arr[j] + " ";
                        const divToChange = document.querySelector(`[data-value="${j}"]`);
                        divToChange.style.backgroundColor = '#32de84';
                    }
                    const divToChange = document.querySelector(`[data-value="${start + 1}"]`);
                    divToChange.style.backgroundColor = 'white';
                    // await delay(500);
                    currSum -= arr[start];
                    start += 1;
                    const divToChange2 = document.querySelector(`[data-value="${end + 1}"]`);
                    divToChange2.style.backgroundColor = '#32de84';
                    currSum += arr[end];
                } else {
                    // await delay(1000);
                    const divToChange = document.querySelector(`[data-value="${start + 1}"]`);
                    divToChange.style.backgroundColor = 'white';
                    // await delay(500);
                    currSum -= arr[start];
                    start += 1;
                    const divToChange2 = document.querySelector(`[data-value="${end + 1}"]`);
                    divToChange2.style.backgroundColor = '#32de84';
                    currSum += arr[end];
                    // await delay(500);
                }
            }


        }
        console.log(temp)

        await delay(1000);
        setFlag(true)
        setFlag2(true)
        let elements = document.getElementsByClassName('matrix-box');

        // Iterate over the elements
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];

            // Modify the inner HTML
            element.style.backgroundColor = 'white'
        }

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
                        <h3>Fixed Size Sliding Window</h3>
                        <button type="button" className="btn btn-primary btn-sm" disabled={flag} onClick={progress}>Visualize</button>



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

                <div className='text-center mb-2'>
                    <code>We plan to find subarrays with a window size of 3 and sum equivalent to 151.</code>
                    <br/>
                    <span><span className="badge" style={{ backgroundColor: '#32de84' }}>&nbsp;&nbsp;</span> - Searching for subarray </span>
                     &nbsp;&nbsp;&nbsp;
                     <span><span className="badge" style={{ backgroundColor: 'yellow' }}>&nbsp;&nbsp;</span> - found subarray</span>
                </div>

                


                {
                    flag2 && <motion.div className='text-center'>

                        Fixed sized sliding window algorithm is run on the array, {temp.length > 0 && <p>We found following subarrays with a sum equivalent to 151 and size of 3: {

                            temp.map((row, rowIndex) => (
                                <span key={rowIndex}>
                                    [ &nbsp;
                                    {row.map((cell, colIndex) => (
                                        <span key={colIndex}>{cell} &nbsp;</span>
                                    ))}
                                    ]
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                            ))


                        }</p>} {temp.length <= 0 && <p>We found no sub arrays</p>}


                    </motion.div>
                }


                <div className="martix-container">
                    <div className="matrix-board">
                        <div className="matrix-box" data-value='1'></div>
                        <div className="matrix-box" data-value='2'></div>
                        <div className="matrix-box" data-value='3'></div>
                    </div>
                    <div className="matrix-board">
                        <div className="matrix-box" data-value='4'></div>
                        <div className="matrix-box" data-value='5'></div>
                        <div className="matrix-box" data-value='6'></div>
                    </div>
                </div>

            </motion.div>


            <div className="container">
                <div className="row">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }} className="col-12 col-md-7 mb-3">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Summary
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">

                                        Welcome to the interactive Fixed-Size Sliding Window experience! The fixed-size sliding window is a technique used for analyzing sequential data by maintaining a window of a fixed size that slides over the data. Join us on this data analysis journey and witness the power of the fixed-size sliding window!
                                        <br /><br />
                                        <strong>Instructions:</strong>Understand the Data:

                                        Imagine you have a sequence of data points, such as time-series data or a stream of events.
                                        Familiarize yourself with the nature of the data and its relevance to the problem you are addressing.
                                        Set the Window Size:
                                        <br /><br />

                                        Choose a fixed size for the sliding window that suits your analysis needs.
                                        The window size determines the number of data points considered at any given time.
                                        Observe the Analysis Process:
                                        <br /><br />

                                        Watch as the fixed-size sliding window moves sequentially through the data.
                                        Notice how the window captures a subset of data points at each step.
                                        Observe how the window's position advances, allowing continuous analysis of the sequential data.
                                        Interactive Analysis:
                                        <br /><br />

                                        If you prefer an interactive experience, you can interact with the data and the sliding window.
                                        Adjust the window size and see how it affects the analysis results.
                                        Move the sliding window manually or let it slide automatically through the data.
                                        Analyze the data within the window and observe any patterns or insights that emerge.
                                        Explore Applications:
                                        <br /><br />

                                        Discover the versatility of the fixed-size sliding window in various domains.
                                        Explore its applications in fields like signal processing, time-series analysis, and data stream mining.
                                        Understand how the fixed-size sliding window enables real-time analysis and the extraction of relevant information.
                                        <br /><br />
                                        <strong>Conclusion:</strong>Congratulations! You have explored the fixed-size sliding window technique for analyzing sequential data. Through this interactive content, you witnessed how the fixed-size sliding window captures a subset of data points as it slides through the sequential data. This technique is widely used in numerous domains for real-time analysis and pattern recognition. Now that you have a better understanding of the fixed-size sliding window, feel free to apply it to your own data analysis tasks and unlock valuable insights in your domain of interest!



                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
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

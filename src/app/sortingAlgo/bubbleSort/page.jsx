"use client"
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { motion } from "framer-motion"
import { AiFillCaretLeft } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import Bar from '@/app/components/bar';
import { ApiError } from 'next/dist/server/api-utils';
import React, { useState } from 'react'
import '../bubbleSort/page.css'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Metadata, ResolvingMetadata } from 'next';





import Link from "next/link";
import { NextSeo } from 'next-seo';


export default function BubbleSortPage() {

  const [disable, setDisable] = useState(false)
  const [disableIcon, setDisableIcon] = useState(false)

  const codeString = `
  <CODE/>
  import java.util.*;

  public class tUf {
      static void bubble_sort(int[] arr, int n) {
          for (int i = n - 1; i >= 0; i--) {
              for (int j = 0; j <= i - 1; j++) {
                  if (arr[j] > arr[j + 1]) {
                      int temp = arr[j];
                      arr[j] = arr[j + 1];
                      arr[j + 1] = temp;
                  }
              }
          }
  
          System.out.println("After bubble sort: ");
          for (int i = 0; i < n; i++) {
              System.out.print(arr[i] + " ");
          }
          System.out.println();
      }
      public static void main(String args[]) {
          int arr[] = {99, 33, 52, 16, 32};
          int n = arr.length;
          System.out.println("Before Using Bubble Sort: ");
          for (int i = 0; i < n; i++) {
              System.out.print(arr[i] + " ");
          }
          System.out.println();
          bubble_sort(arr, n);
      }
  
  }`

  let sortingTimeout;

  const [arr, setArr] = useState([
    { id: 1, val: 99, color: '#E6E6FA' },
    { id: 2, val: 33, color: '#E6E6FA' },
    { id: 3, val: 52, color: '#E6E6FA' },
    { id: 4, val: 16, color: '#E6E6FA' },
    { id: 5, val: 32, color: '#E6E6FA' },

  ])

  const reset = () => {


    const t = [
      { id: 1, val: 99, color: '#E6E6FA' },
      { id: 2, val: 33, color: '#E6E6FA' },
      { id: 3, val: 52, color: '#E6E6FA' },
      { id: 4, val: 16, color: '#E6E6FA' },
      { id: 5, val: 32, color: '#E6E6FA' },
    ];

    setArr(t);
  }

  // const arr = [45, 22, 33, 44, 55, 66, 77, 88,99];


  const bubbleSort = async () => {

    setDisable(true)
    setDisableIcon(true);

    const sortedArr = [...arr];

    for (let i = 0; i < sortedArr.length; i++) {
      for (let j = 0; j < sortedArr.length - i - 1; j++) {
        await delay(2000);
        sortedArr[j].color = '#72A0C1';
        setArr([...sortedArr]);
        sortedArr[j + 1].color = '#72A0C1';
        setArr([...sortedArr]);

        toast(<div className="text-center">

          We have elements <strong>{sortedArr[j].val}</strong> and{' '}
          <strong>{sortedArr[j + 1].val}</strong>.

          We will swap only if the right-most element <strong>{sortedArr[j + 1].val}</strong> is smaller than the left element <strong>{sortedArr[j].val}</strong>.
        </div>, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        await delay(7000); // Delay each iteration of the inner loop by 5 seconds


        if (sortedArr[j].val > sortedArr[j + 1].val) {
          // Swap elements
          const temp = sortedArr[j];
          sortedArr[j] = sortedArr[j + 1];
          sortedArr[j + 1] = temp;
          setArr([...sortedArr]);
        }
        sortedArr[j].color = '#E6E6FA';
        setArr([...sortedArr]);
        sortedArr[j + 1].color = '#72A0C1';
        setArr([...sortedArr]);
      }
      sortedArr[sortedArr.length - 1 - i].color = '#32de84';
      setArr([...sortedArr]);


    }
    toast(<div className="text-center">
      <p><strong>Hurray!!</strong> We have sorted array by <strong>Bubble Sort</strong> Algorithm <br />
        <strong>Time Complexity: O(n)</strong>, <strong>Space Complexity: O(1)</strong>    </p>
    </div>, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    setDisable(false)
  };


  const delay = (ms) => {
    return new Promise((resolve) => {
      sortingTimeout = setTimeout(resolve, ms);
    });
  };




  return (
    <>
      <ToastContainer style={{ width: '100%' }}
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <Link href="/" type="button" className="btn"><AiFillCaretLeft />Back</Link>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // transition={{ duration: 0.2 }}
        className="container-fluid">
        <div className="row">
          <div className="col">
            <h3>Bubble Sort</h3>
            <button type="button" className="btn btn-primary btn-sm" onClick={bubbleSort} disabled={disable}>Visualize</button>
            &nbsp;&nbsp;
            <button type="button" className="btn btn-primary btn-sm" onClick={reset} disabled={disable}>Reset</button>

            <div>
              <div className="card-body">
                <div className="container text-center">
                  <div className="row justify-content-center mt-2">
                    {arr.map(item => <div key={item.id} className="cell">
                      <p style={{ marginLeft: '20px' }}>
                        {disableIcon == false && <span style={{ cursor: 'pointer' }} onClick={() => {
                          const tempArr = arr;
                          tempArr[item.id - 1].val += 1;
                          setArr([...tempArr])
                        }}><AiOutlinePlus /></span>}
                        {disableIcon == false && <span style={{ cursor: 'pointer' }} onClick={() => {
                          const tempArr = arr;
                          tempArr[item.id - 1].val -= 1;
                          setArr([...tempArr])
                        }}><AiOutlineMinus /></span>}
                      </p>
                      <Bar color={item.color} height={item.val}></Bar>
                    </div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container" style={{ marginTop: '160px' }}>
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
                    Welcome to the interactive Bubble Sort experience! Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Join us on this sorting adventure and see how Bubble Sort works in action!
                        <br /><br />
                    <strong>Instructions:</strong>
                    Visualize the Unsorted List:

                    To begin, imagine you have an unsorted list of numbers.
                    Feel free to choose a list size and populate it with random numbers.
                    Observe the Sorting Process:
                    <br /><br />
                    Watch as Bubble Sort compares neighboring elements and swaps them if needed.
                    Track the progress of the algorithm as it moves through the list multiple times.
                    Take note of how the largest elements "bubble" up to their correct positions.
                    Step-by-Step Animation:
                    <br /><br />
                    If you prefer a step-by-step walkthrough, you can interact with the animation.
                    Click the "Next" button to move through each iteration of Bubble Sort.
                    Visualize the comparisons and swaps happening in real-time.
                    Observe how the list gets progressively sorted after each iteration.
                    Compare Efficiency:
                    <br /><br />
                    Compare Bubble Sort's performance with other sorting algorithms.
                    Notice how Bubble Sort may take more iterations to sort compared to more efficient algorithms like Merge Sort or Quick Sort.
                    Understand its simplicity and limitations in handling larger lists.
                    <br /><br />
                    <strong>Conclusion:</strong>
                    Congratulations! You have experienced Bubble Sort in action. Through this interactive content, you witnessed how Bubble Sort gradually sorts a list by comparing and swapping adjacent elements. While it may not be the most efficient sorting algorithm for large datasets, it serves as a valuable learning tool to understand sorting concepts. Now, go forth and explore other sorting algorithms to expand your knowledge in the world of sorting!
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

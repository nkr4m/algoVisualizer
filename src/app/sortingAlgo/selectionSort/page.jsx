"use client"
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";
import Bar from '@/app/components/bar';
import { ApiError } from 'next/dist/server/api-utils';
import React, { useState } from 'react'
import '../bubbleSort/page.css'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Link from "next/link";
import { motion } from "framer-motion"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SelectionSortPage() {

  const [disable, setDisable] = useState(false)
  const [disableIcon, setDisableIcon] = useState(false)

  const codeString = `
  <CODE/>
  import java.util.*;

  public class tUf {
      static void selection_sort(int arr[], int n) {
          for (int i = 0; i < n - 1; i++) {
              int mini = i;
              for (int j = i + 1; j < n; j++) {
                  if (arr[j] < arr[mini]) {
                      mini = j;
                  }
              }
              //swap
              int temp = arr[mini];
              arr[mini] = arr[i];
              arr[i] = temp;
          }
  
          System.out.println("After selection sort:");
          for (int i = 0; i < n; i++) {
              System.out.print(arr[i] + " ");
          }
          System.out.println();
      }
  
      public static void main(String args[]) {
  
          int arr[] = {13, 46, 24, 52, 20, 9};
          int n = arr.length;
          System.out.println("Before selection sort:");
          for (int i = 0; i < n; i++) {
              System.out.print(arr[i] + " ");
          }
          System.out.println();
          selection_sort(arr, n);
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
      let minIndex = i;
      let minVal = sortedArr[i].val
      sortedArr[i].color = '#72A0C1';
      setArr([...sortedArr]);
      toast(<div className="text-center">
        <p> We have element <strong> {sortedArr[i].val} </strong>, We will swap it with the smallest element array.
        </p>
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
      for (let j = i + 1; j < sortedArr.length; j++) {
        await delay(2000); // Delay each iteration of the inner loop by 5 seconds
        if (sortedArr[j].val < minVal) {

          if (i != minIndex) {
            sortedArr[minIndex].color = '#E6E6FA';
          }

          sortedArr[j].color = '#fd5c63';
          setArr([...sortedArr]);
          await delay(5000);
          // sortedArr[minIndex].color = '#E6E6FA';

          minIndex = j;
          minVal = sortedArr[j].val;

        }
      }

      sortedArr[i].color = '#E6E6FA';
      setArr([...sortedArr]);
      let temp = sortedArr[i];
      sortedArr[i] = sortedArr[minIndex];
      sortedArr[minIndex] = temp
      sortedArr[i].color = '#32de84';
      setArr([...sortedArr]);

    }
    await delay(5000);

    setDisable(false)
    if (disable == false) {
      toast(<div className="text-center">
        <p><strong>Hurray!!</strong> We have sorted array by <strong>Selection Sort</strong> Algorithm <br />
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
    }
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
        transition={{ duration: 0.5 }} className="container-fluid">
        <div className="row">
          <div className="col">

            <h3>Selection Sort</h3>
            <button type="button" className="btn btn-primary btn-sm" onClick={bubbleSort} disabled={disable}>Visualize</button>
            &nbsp;&nbsp;
            <button type="button" className="btn btn-primary btn-sm" onClick={reset} disabled={disable}>Reset</button>

            <div>
              <div className="card-body">
                <div className="container text-center">
                  <div className="row justify-content-center ">
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
          <motion.div initial={{ opacity: 0, y: -10 }}
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

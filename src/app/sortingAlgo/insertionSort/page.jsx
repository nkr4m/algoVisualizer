"use client"
import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion"
import { AiFillCaretLeft } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import Bar from '@/app/components/bar';
import { ApiError } from 'next/dist/server/api-utils';
import React, { useState } from 'react'
import '../bubbleSort/page.css'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InsertionSortPage() {

  const [disable, setDisable] = useState(false)
  const [disableIcon, setDisableIcon] = useState(false)

  let disabled = false;

  const codeString = `
  <CODE/>
  import java.util.*;

  public class Main {
      static void insertion_sort(int[] arr, int n) {
          for (int i = 0; i <= n - 1; i++) {
              int j = i;
              while (j > 0 && arr[j - 1] > arr[j]) {
                  int temp = arr[j - 1];
                  arr[j - 1] = arr[j];
                  arr[j] = temp;
                  j--;
              }
          }
  
          System.out.println("After insertion sort: ");
          for (int i = 0; i < n; i++) {
              System.out.print(arr[i] + " ");
          }
          System.out.println();
      }
      public static void main(String args[]) {
          int arr[] = {99, 33, 52, 16, 32};
          int n = arr.length;
          System.out.println("Before Using insertion Sort: ");
          for (int i = 0; i < n; i++) {
              System.out.print(arr[i] + " ");
          }
          System.out.println();
          insertion_sort(arr, n);
      }
  
  }  `

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


  const insertionSort = async () => {
    setDisable(true)
    setDisableIcon(true);

    const sortedArr = [...arr];
    for (let i = 1; i < sortedArr.length; i++) {
      let k = i;
      toast(<div className="text-center">

        We have <strong>{sortedArr[k].val}</strong>, we will check if there are any elements on the left sorted half which is greater than <strong>{sortedArr[k].val}</strong> till we reach 0th index or find an element smaller than <strong>{sortedArr[k].val}</strong>.
        <br /> If so, we will swap the elements with it
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
      sortedArr[k].color = '#72A0C1';
      await delay(2000);
      sortedArr[k].color = '#E6E6FA';
      setArr([...sortedArr])

      while (sortedArr[k].val < sortedArr[k - 1].val) {
        sortedArr[k].color = '#72A0C1';
        await delay(5000);
        let temp = sortedArr[k];
        sortedArr[k] = sortedArr[k - 1];
        sortedArr[k - 1] = temp;

        sortedArr[k - 1].color = '#E6E6FA';
        k = k - 1;

        setArr([...sortedArr])
        if (k <= 0) {
          break;
        }
      }

      for (let m = 0; m < i; m++) {
        sortedArr[m].color = '#32de84';
        setArr([...sortedArr])
      }

      if (i == sortedArr.length - 1) {
        sortedArr[i].color = '#32de84';
        setArr([...sortedArr])
      }



    }
    toast(<div className="text-center">
      <p><strong>Hurray!!</strong>  We have sorted array by <strong>Insertion Sort</strong> Algorithm <br />
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
            <h3>Insertion Sort</h3>
            <button type="button" className="btn btn-primary btn-sm" onClick={insertionSort} disabled={disable}>Visualize</button>
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
                    Welcome to the interactive Insertion Sort experience! Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It repeatedly takes an element from the unsorted part of the list and inserts it into its correct position within the sorted part. Join us on this sorting journey and witness Insertion Sort in action!

                    <br /><br />
                   <strong> Instructions: </strong>
                    Visualize the Unsorted List:
                    <br /><br />
                    Imagine you have an unsorted list of numbers.
                    Feel free to choose a list size and populate it with random numbers.
                    Observe the Sorting Process:
                    <br /><br />
                    Watch as Insertion Sort iterates through the list and inserts elements in their correct positions.
                    Notice how the sorted portion of the list expands with each iteration.
                    Observe how the algorithm compares elements and shifts them to make room for the inserted element.
                    Step-by-Step Animation:
                    <br /><br />
                    If you prefer a step-by-step walkthrough, you can interact with the animation.
                    Click the "Next" button to move through each iteration of Insertion Sort.
                    Visualize the comparisons, insertions, and shifting of elements happening in real-time.
                    Track how the sorted part of the list grows until the entire list becomes sorted.
                    Compare Efficiency:
                    <br /><br />
                    Compare Insertion Sort's performance with other sorting algorithms.
                    Notice that Insertion Sort works well for small lists or partially sorted lists.
                    Understand its time complexity and when it becomes less efficient compared to algorithms like Merge Sort or Quick Sort.
                    <br /><br />
                    <strong>Conclusion: </strong>
                    Congratulations! You have experienced Insertion Sort in action. Through this interactive content, you witnessed how Insertion Sort progressively builds a sorted list by inserting elements in their correct positions. While it may not be the most efficient sorting algorithm for larger datasets, it is valuable for its simplicity and effectiveness in certain scenarios. Now that you have a better understanding of Insertion Sort, feel free to explore other sorting algorithms and deepen your knowledge in the realm of sorting!


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

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

export default function HeapSortPage() {

  const [disable, setDisable] = useState(false)
  const [disableIcon, setDisableIcon] = useState(false)

  const codeString = `
  <CODE/>
  import java.util.*;

  class TUF{
  static void Heapify(int[] arr, int n , int index) {
  
      int right = 2 * index + 2;
      int left = 2 * index + 1;
      int largestNode = index  ;
    
  
      if (left < n  && arr[left] > arr[largestNode]) {
          largestNode = left ;
      }
  
      if (right < n && arr[right] > arr[largestNode]) {
          largestNode = right  ;
      }
      int temp;
      if (largestNode != index) {
          temp=arr[index];
          arr[index]=arr[largestNode];
          arr[largestNode]=temp;
          Heapify(arr, n, largestNode)  ;
      }
  }
  static void createHeap(int[] arr, int n) {
  
      int start = (n / 2) - 1 ;
  
      for (int index = start ; index >= 0; index--) {
          Heapify(arr, n, index)  ;
      }
  }
  static void printHeap(int[] arr, int n) {
  
      for (int i = 0; i < n; i++) {
          System.out.print(arr[i]+" ")  ;
      }
      System.out.println();
  }
  public static void main(String args[]) {
  
      int arr[] = {1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17} ;
  
      int n = arr.length   ;
  
      createHeap(arr, n)  ;
      System.out.println("Heap in form of Array:-")  ;
      printHeap(arr, n)  ;
  }
  }`

  let sortingTimeout;

  const [arr, setArr] = useState([
    { id: 1, val: 99, color: '#E6E6FA' },
    { id: 2, val: 108, color: '#E6E6FA' },
    { id: 3, val: 120, color: '#E6E6FA' },
    { id: 4, val: 123, color: '#E6E6FA' },
    { id: 5, val: 54, color: '#E6E6FA' },

  ])

  const reset = () => {


    const t = [
      { id: 1, val: 99, color: '#E6E6FA' },
      { id: 2, val: 108, color: '#E6E6FA' },
      { id: 3, val: 120, color: '#E6E6FA' },
      { id: 4, val: 123, color: '#E6E6FA' },
      { id: 5, val: 54, color: '#E6E6FA' },
    ];

    setArr(t);
  }

  // const arr = [45, 22, 33, 44, 55, 66, 77, 88,99];

  const heapify = async (nums, size, index) => {
    let lc = (2 * index) + 1;
    let rc = (2 * index) + 2;
    let largest = index;



    if (lc <= size && nums[lc].val > nums[index].val) {
      largest = lc;
    }
    if (rc <= size && nums[rc].val > nums[largest].val) {
      largest = rc;
    }

    nums[index].color = '#72A0C1';
    let co = 0;
    if (rc <= size) {
      nums[rc].color = 'orange';
      co += 1;
    }

    if (lc <= size) {
      nums[lc].color = 'orange';
      co += 1;
    }

    toast(<div className="text-center">
      <p> There are <strong>{co}</strong> child nodes of <strong>{nums[index].val}</strong></p>

      <p><strong>index_child1 = {(2 * index) + 1}</strong>, <strong>index_child = {(2 * index) + 2}</strong></p>
      {co > 0 && <p>Next step is to <strong>Swap the largest child with parent</strong> and heapify the array</p>}
      {co == 0 && <p>Since there is no child index for the parent which are less than equal to the size of array, we move to the previous index from parent</p>}
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

    setArr([...arr]);
    await delay(6000);

    if (largest != index) {
      let temp = nums[index];
      nums[index] = nums[largest];
      nums[largest] = temp;
      await delay(2000)
      nums[index].color = '#E6E6FA';
      if (rc <= size) {
        nums[rc].color = '#E6E6FA';
      }

      if (lc <= size) {
        nums[lc].color = '#E6E6FA';
      }

      setArr([...nums]);
      await heapify(nums, size, largest);
    } else {
      await delay(2000)
      nums[index].color = '#E6E6FA';
      setArr([...nums]);
    }
  }

  const heapify2 = async (nums, size, index) => {
    let lc = (2 * index) + 1;
    let rc = (2 * index) + 2;
    let largest = index;



    if (lc <= size && nums[lc].val > nums[index].val) {
      largest = lc;
    }
    if (rc <= size && nums[rc].val > nums[largest].val) {
      largest = rc;
    }


    if (largest != index) {
      let temp = nums[index];
      nums[index] = nums[largest];
      nums[largest] = temp;

      await heapify2(nums, size, largest);
    }
  }


  const heapSort = async () => {
    setDisable(true)
    setDisableIcon(true);
    // heapify 
    let n = parseInt(arr.length / 2);
    for (let i = n; i >= 0; i--) {
      await heapify(arr, arr.length - 1, i);
    }


    await delay(3000);
    toast(<div className="text-center">
      <p> We have <strong>Heapified</strong> the provided array, i.e each parent node is always greater than child nodes </p>
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
    await delay(5000);

    toast(<div className="text-center">
      <p>Next step is to <strong>Heap Sort</strong> the heapified array, i.e swap the <strong>top most element</strong> with the <strong>last element </strong> and heapify the array from 0th index </p>
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
    await delay(7000);


    // heap sort
    let s = arr.length - 1;
    for (let i = 0; i < arr.length; i++) {
      let temp = arr[0];
      arr[0] = arr[s];
      arr[s] = temp;
      arr[s].color = '#32de84'
      setArr([...arr])
      await delay(3000);
      s -= 1;
      await heapify2(arr, s, 0);

    }
    // await delay(2000);
    toast(<div className="text-center">
      <p><strong>Hurray!!</strong> We have sorted array by <strong>Heap Sort</strong> Algorithm <br />
        <strong>Time Complexity: O(log(n))</strong>, <strong>Space Complexity: O(1)</strong>    </p>
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
            <h3>Heap Sort</h3>
            <button type="button" className="btn btn-primary btn-sm" onClick={heapSort} disabled={disable}>Visualize</button>
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

                    Welcome to the interactive Heap Sort experience! Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It builds a max-heap or min-heap from the unsorted list and repeatedly extracts the root element to create the final sorted list. Join us on this sorting adventure and witness Heap Sort in action!
                        <br /><br />
                    <strong>Instructions:</strong>Visualize the Unsorted List:

                    Imagine you have an unsorted list of numbers.
                    Feel free to choose a list size and populate it with random numbers.
                    Observe the Sorting Process:
                        <br /><br />
                    Watch as Heap Sort builds a heap from the unsorted list and repeatedly extracts the maximum (or minimum) element to form the sorted list.
                    Notice how the heap structure is created, and how elements are swapped to maintain the heap property.
                    Observe how the sorted part of the list grows in reverse order (for max-heap) or sorted order (for min-heap) with each extraction.
                    Step-by-Step Animation:
                        <br /><br />
                    If you prefer a step-by-step walkthrough, you can interact with the animation.
                    Click the "Next" button to move through each step of the Heap Sort algorithm.
                    Visualize the creation of the heap, the swapping of elements, and the extraction of the maximum (or minimum) element.
                    Track how the sorted part of the list gradually forms until the entire list becomes sorted.
                    Compare Efficiency:
                        <br /><br />
                    Compare Heap Sort's performance with other sorting algorithms.
                    Notice that Heap Sort has a time complexity of O(n log n) in all cases.
                    Understand its advantages, such as in-place sorting and its ability to handle large datasets efficiently.
                    <br /><br />
                    <strong>Conclusion:</strong> Congratulations! You have experienced Heap Sort in action. Through this interactive content, you witnessed how Heap Sort builds a heap from an unsorted list and uses it to extract elements in sorted order. With its guaranteed time complexity and efficiency on large datasets, Heap Sort is a powerful sorting algorithm. Now that you have a better understanding of Heap Sort, feel free to explore other sorting algorithms and further expand your knowledge in the fascinating world of sorting!


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

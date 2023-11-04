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

export default function MergeSortPage() {

  const [disable, setDisable] = useState(false)
  const [disableIcon, setDisableIcon] = useState(false)

  const codeString = `
  <CODE/>
  import java.util.*;

  class Solution {
      private static void merge(int[] arr, int low, int mid, int high) {
          ArrayList<Integer> temp = new ArrayList<>(); // temporary array
          int left = low;      // starting index of left half of arr
          int right = mid + 1;   // starting index of right half of arr
  
          //storing elements in the temporary array in a sorted manner//
  
          while (left <= mid && right <= high) {
              if (arr[left] <= arr[right]) {
                  temp.add(arr[left]);
                  left++;
              } else {
                  temp.add(arr[right]);
                  right++;
              }
          }
  
          // if elements on the left half are still left //
  
          while (left <= mid) {
              temp.add(arr[left]);
              left++;
          }
  
          //  if elements on the right half are still left //
          while (right <= high) {
              temp.add(arr[right]);
              right++;
          }
  
          // transfering all elements from temporary to arr //
          for (int i = low; i <= high; i++) {
              arr[i] = temp.get(i - low);
          }
      }
  
      public static void mergeSort(int[] arr, int low, int high) {
          if (low >= high) return;
          int mid = (low + high) / 2 ;
          mergeSort(arr, low, mid);  // left half
          mergeSort(arr, mid + 1, high); // right half
          merge(arr, low, mid, high);  // merging sorted halves
      }
  }
  public class tUf {
      public static void main(String args[]) {
          Scanner sc = new Scanner(System.in);
          int n = 7;
          int arr[] = { 9, 4, 7, 6, 3, 1, 5 };
          System.out.println("Before sorting array: ");
          for (int i = 0; i < n; i++) {
              System.out.print(arr[i] + " ");
          }
          System.out.println();
          Solution.mergeSort(arr, 0, n - 1);
          System.out.println("After sorting array: ");
          for (int i = 0; i < n; i++) {
              System.out.print(arr[i] + " ");
          }
          System.out.println();
      }
  
  }`

  let sortingTimeout;

  const [arr, setArr] = useState([
    { id: 1, val: 99, color: '#E6E6FA' },
    { id: 2, val: 33, color: '#E6E6FA' },
    { id: 3, val: 52, color: '#E6E6FA' },
    { id: 4, val: 40, color: '#E6E6FA' },
    { id: 5, val: 32, color: '#E6E6FA' },

  ])

  const reset = () => {


    const t = [
      { id: 1, val: 99, color: '#E6E6FA' },
      { id: 2, val: 33, color: '#E6E6FA' },
      { id: 3, val: 52, color: '#E6E6FA' },
      { id: 4, val: 40, color: '#E6E6FA' },
      { id: 5, val: 32, color: '#E6E6FA' },
    ];

    setArr(t);
  }

  // const arr = [45, 22, 33, 44, 55, 66, 77, 88,99];
  const mergeEle = async (arr, low, high) => {
    if (low == high) {
      return;
    } else if (low + 1 == high) {
      if (arr[low].val > arr[high].val) {
        arr[low].color = 'yellow';
        arr[high].color = 'yellow';
        setArr([...arr]);
        let temp = arr[low];
        arr[low] = arr[high];
        arr[high] = temp;
        await delay(5000);
        arr[low].color = '#E6E6FA';
        arr[high].color = '#E6E6FA';
        setArr([...arr]);
        await delay(2000);


      }
      return;
    }

    let mid = Math.floor((low + high) / 2);

    await mergeEle(arr, low, mid);

    await mergeEle(arr, mid + 1, high);


    for (let i = low; i <= high; i++) {
      arr[i].color = 'yellow';
      setArr([...arr]);
      await delay(2000);
    }

    let s1 = low;
    let s2 = mid + 1;

    const ans = new Array(high - low + 1);

    let index = 0;
    while (s1 <= mid || s2 <= high) {
      if (s1 <= mid && s2 <= high) {
        // both are present
        if (arr[s1].val < arr[s2].val) {
          ans[index] = arr[s1];
          s1 += 1;
        } else {
          ans[index] = arr[s2];
          s2 += 1;
        }
      } else if (s1 > mid && s2 <= high) {
        // only s2 is present
        ans[index] = arr[s2];
        s2 += 1;
      } else if (s2 > mid && s1 <= mid) {
        // only s1 is present
        ans[index] = arr[s1];
        s1 += 1;
      }
      index += 1;
    }

    for (let j = low; j <= high; j++) {
      arr[j] = ans[j - low];
      setArr([...arr]);

    }

    await delay(2000);

    for (let i = low; i <= high; i++) {
      arr[i].color = '#E6E6FA';
      setArr([...arr]);
      await delay(2000);
    }

    if (low == 0 && high == 4) {
      toast(<div className="text-center">
        <p><strong>Hurray!!</strong> We have sorted array by <strong>Merge Sort</strong> Algorithm <br />
          <strong>Time Complexity: O(n)</strong>, <strong>Space Complexity: O(n)</strong>    </p>
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




  const bubbleSort = async () => {
    setDisable(true)
    setDisableIcon(true);
    const sortedArr = [...arr];
    mergeEle(sortedArr, 0, arr.length - 1);
    console.log(arr)

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
            <h3>Merge Sort</h3>
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
          <motion.div initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="col-12 col-md-6 mb-3">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Summary
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">

                    Welcome to the interactive Merge Sort experience! Merge Sort is a popular sorting algorithm that follows the divide-and-conquer approach. It divides the unsorted list into smaller sublists, recursively sorts them, and then merges them back together to create the final sorted list. Join us on this sorting journey and witness Merge Sort in action!
                    <br /><br />
                    <strong>Instructions:</strong>Visualize the Unsorted List:

                    Imagine you have an unsorted list of numbers.
                    Feel free to choose a list size and populate it with random numbers.
                    Observe the Sorting Process:
                    <br /><br />

                    Watch as Merge Sort divides the list into smaller sublists and then merges them back together in a sorted manner.
                    Notice how the algorithm recursively sorts the sublists until they become small enough to be merged.
                    Observe how the merging process combines the smaller sorted lists to create a larger sorted list.
                    Step-by-Step Animation:
                    <br /><br />

                    If you prefer a step-by-step walkthrough, you can interact with the animation.
                    Click the "Next" button to move through each step of the Merge Sort algorithm.
                    Visualize the division of the list, the recursive sorting of sublists, and the merging of the sorted sublists.
                    Track how the sublists gradually combine and form a fully sorted list.
                    Compare Efficiency:
                    <br /><br />

                    Compare Merge Sort's performance with other sorting algorithms.
                    Notice that Merge Sort guarantees a time complexity of O(n log n) in all cases.
                    Understand its advantages in handling larger lists and its efficiency in practice.
                    <br /><br />
                    <strong>Conclusion:</strong>Congratulations! You have experienced Merge Sort in action. Through this interactive content, you witnessed how Merge Sort efficiently sorts a list by dividing it into smaller sublists, sorting them recursively, and merging them back together. With its stable time complexity and effectiveness on large datasets, Merge Sort is a powerful sorting algorithm. Now that you have a better understanding of Merge Sort, feel free to explore other sorting algorithms and delve deeper into the exciting world of sorting!


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

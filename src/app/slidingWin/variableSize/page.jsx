"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import './page.css'
import { AiFillCaretLeft } from "react-icons/ai";
import { motion } from "framer-motion"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export default function VariableSizePage() {
  const codeString = `import java.util.ArrayList;
  import java.util.List;
  
  public class VariableSizeSlidingWindow {
      public static void main(String[] args) {
          int[] nums = {1, 3, 5, 7, 9, 2, 4, 6, 8, 10};
          int targetSum = 15;
  
          List<Integer> window = new ArrayList<>();
          int windowSum = 0;
          int left = 0;
          int right = 0;
  
          while (right < nums.length) {
              // Expand the window
              windowSum += nums[right];
              window.add(nums[right]);
  
              // Adjust the window size if the sum exceeds the target
              while (windowSum > targetSum) {
                  windowSum -= nums[left];
                  window.remove(0);
                  left++;
              }
  
              // Process the current window
              System.out.println("Window: " + window);
  
              // Move the window to the right
              right++;
          }
      }
  }
  
`
  let sortingTimeout;

  const [arr, setArr] = useState([
    76, 54, 21, 36, 40, 21
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
    let start = 0;
    let c = 0;
    let currSum = 0;
    for (let end = 0; end < arr.length; end++) {
      await delay(1000);
      currSum += arr[end];
      const divToChange = document.querySelector(`[data-value="${end + 1}"]`);
      console.log(divToChange);
      divToChange.style.backgroundColor = '#32de84';

      if (currSum >= target) {
        if (currSum == target) {
          // we have hit the target
          let str = [];
          for (let i = start; i <= end; i++) {
            const divToChange = document.querySelector(`[data-value="${i + 1}"]`);
            console.log(divToChange);
            divToChange.style.backgroundColor = 'yellow';
            str.push(arr[i]);
          }
          temp.push(str);

          await delay(3000);

          for (let i = start; i <= end; i++) {
            const divToChange = document.querySelector(`[data-value="${i + 1}"]`);
            console.log(divToChange);
            divToChange.style.backgroundColor = '#32de84';
          }

          while (currSum >= target) {
            const divToChange = document.querySelector(`[data-value="${start + 1}"]`);
            console.log(divToChange);
            divToChange.style.backgroundColor = '#32de84';
            const divToChange2 = document.querySelector(`[data-value="${start + 1}"]`);
            console.log(divToChange2);
            divToChange2.style.backgroundColor = 'white';
            currSum -= arr[start];
            start += 1;
          }

        } else {

          // we have sum greater than target


          while (currSum >= target) {
            const divToChange = document.querySelector(`[data-value="${start + 1}"]`);
            console.log(divToChange);
            divToChange.style.backgroundColor = '#32de84';
            currSum -= arr[start];
            const divToChange2 = document.querySelector(`[data-value="${start + 1}"]`);
            console.log(divToChange2);
            divToChange2.style.backgroundColor = 'white';

            start += 1;
          }

        }
      } else {
        continue;
      }




    }

    console.log(temp);
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
            <h3>Variable Size Sliding Window</h3>
            <button type="button" className="btn btn-primary btn-sm" onClick={progress}>Visualize</button>



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
          <code>We plan to find subarrays with a variable window size and sum equivalent to 151.</code>
          <br/>
                    <span><span className="badge" style={{ backgroundColor: '#32de84' }}>&nbsp;&nbsp;</span> - Searching for subarray </span>
                     &nbsp;&nbsp;&nbsp;
                     <span><span className="badge" style={{ backgroundColor: 'yellow' }}>&nbsp;&nbsp;</span> - found subarray</span>
        </div>

        {
          flag2 && <motion.div className='text-center'>

            Variable sized sliding window algorithm is run, {temp.length > 0 && <p>We found following subarrays: {

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

                    Welcome to the interactive Variable-Sized Sliding Window experience! The Variable-Sized Sliding Window is a technique used for analyzing data streams by dynamically adjusting the window size based on the characteristics of the data. Join us on this data analysis journey and witness the versatility of the Variable-Sized Sliding Window!
                    <br /><br />
                    <strong>Instructions</strong>: Understand the Data Stream:

                    Imagine you have a continuous stream of data points, such as sensor readings or real-time measurements.
                    Familiarize yourself with the data stream and its properties to gain insights into the problem you are addressing.
                    Adapt the Window Size:
                    <br /><br />
                    Notice that the Variable-Sized Sliding Window adjusts its size based on the changing properties of the data stream.
                    Observe how the window dynamically expands or contracts in response to the characteristics of the data.
                    Observe the Analysis Process:
                    <br /><br />
                    Watch as the Variable-Sized Sliding Window slides through the data stream, capturing a variable number of data points at each step.
                    Notice how the window size reflects the need to capture relevant data patterns or respond to changes in data dynamics.
                    Interactive Analysis:
                    <br /><br />
                    If you prefer an interactive experience, you can interact with the data stream and the Variable-Sized Sliding Window.
                    Modify the parameters or properties of the data stream and observe how the window adjusts accordingly.
                    Analyze the data within the window and identify patterns or trends that emerge as the window adapts.
                    Explore Applications:

                    Discover the wide range of applications for the Variable-Sized Sliding Window technique.
                    Explore its use in anomaly detection, adaptive filtering, and real-time data analysis.
                    Understand how the Variable-Sized Sliding Window enables effective analysis in dynamic data scenarios.
                    <br /><br />
                    <strong>Conclusion</strong>: Congratulations! You have explored the Variable-Sized Sliding Window technique for analyzing data streams. Through this interactive content, you witnessed how the window size adapts to the changing properties of the data, allowing for dynamic analysis. The Variable-Sized Sliding Window is a versatile tool in various domains, enabling real-time insights and adaptability to evolving data characteristics. Now that you have a better understanding of the Variable-Sized Sliding Window, feel free to apply it to your own data analysis tasks and uncover valuable insights in dynamic data streams!


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

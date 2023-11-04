"use client"
import Link from 'next/link'
import '../app/page.css'
import { LinearGradient } from 'react-text-gradients'
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (

    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }} style={{ padding: '10px' }}>


      <div
        className='head text-center'>
        <img
          src="/logo.png"
          alt="Picture of the author"
        />
        <LinearGradient gradient={['to left', '#858585 ,#000000']}>
          Algorithm
        </LinearGradient>
      </div>
      <div
        className='head text-center' style={{ marginTop: '-34px' }}>
        <LinearGradient gradient={['to left', '#858585 ,#000000']}>
          Visualizer
        </LinearGradient>
      </div>

      <p className='text-center' style={{ fontWeight: 'lighter', fontSize: '18px' }}>Algorithm Visualizer is a program to visualize the most common algorithms, step by step
        <br />Developed by <motion.span style={{ cursor: 'pointer', fontWeight: 'bolder' }} whileHover={{ scale: 1.08 }}
          onHoverStart={e => { }}
          onHoverEnd={e => { }}><motion.button onClick={() => {
            window.open('https://www.linkedin.com/in/nkramachandran/', '_blank');
          }} whileHover={{ scale: 1.2 }}
            onHoverStart={e => { }}
            onHoverEnd={e => { }} className='btn'>nkr4m👋</motion.button></motion.span>
      </p>


      <h4 className='text-center'>Graph Algorithms</h4>
      <div className="container-fluid mb-3">
        <div className="row">
          <motion.div style={{ cursor: 'pointer' }} whileHover={{ scale: 1.08 }}
            onHoverStart={e => { }}
            onHoverEnd={e => { }} onClick={() => {
              router.push('/graphAlgo/dijkstrasAlgo');
            }} className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div className="card border-0 mb-2 pd-2 shadow-sm p-3 mb-3 bg-body-tertiary rounded">
              <div className="card-body">
                <h5>Dijkstra's Algorithm</h5>
                <p>Uncover the shortest path to enlightenment: traverse the graph, greedily selecting the path with the smallest accumulated distance at each step.</p>
                {/* <Link href={"/sortingAlgo/bubbleSort"}>bubbleSort</Link> */}
              </div>
            </div>
          </motion.div>

          <motion.div style={{ cursor: 'pointer' }} whileHover={{ scale: 1.08 }}
            onHoverStart={e => { }}
            onHoverEnd={e => { }} onClick={() => {
              router.push('/graphAlgo/bfs');
            }} className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div className="card border-0 mb-2 pd-2 shadow-sm p-3 mb-3 bg-body-tertiary rounded">
              <div className="card-body">
                <h5>Breadth First Search</h5>
                <p>Visit neighbors first, spread far and wide.</p>
                <br></br>
                <p></p>
                {/* <Link href={"/sortingAlgo/bubbleSort"}>bubbleSort</Link> */}
              </div>
            </div>
          </motion.div>


        </div>
      </div>


      <h4 className='text-center'>Sliding Window Algorithms</h4>
      <div className="container-fluid mb-3">
        <div className="row">
          <motion.div style={{ cursor: 'pointer' }} whileHover={{ scale: 1.08 }}
            onHoverStart={e => { }}
            onHoverEnd={e => { }} onClick={() => {
              router.push('/slidingWin/fixedSize');
            }} className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div className="card border-0 mb-2 pd-2 shadow-sm p-3 mb-3 bg-body-tertiary rounded">
              <div className="card-body">
                <h5>Fixed Sized Window</h5>
                <p>Uncover the sub-array with fixed size while traversing the whole array.</p>
                {/* <Link href={"/sortingAlgo/bubbleSort"}>bubbleSort</Link> */}
              </div>
            </div>
          </motion.div>

          <motion.div style={{ cursor: 'pointer' }} whileHover={{ scale: 1.08 }}
            onHoverStart={e => { }}
            onHoverEnd={e => { }} onClick={() => {
              router.push('/slidingWin/variableSize');
            }} className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div className="card border-0 mb-2 pd-2 shadow-sm p-3 mb-3 bg-body-tertiary rounded">
              <div className="card-body">
                <h5>Variable Sized Window</h5>
                <p>Uncover the sub-array with variable size while traversing the whole array.</p>
                {/* <Link href={"/sortingAlgo/bubbleSort"}>bubbleSort</Link> */}
              </div>
            </div>
          </motion.div>


        </div>
      </div>


      <h4 className='text-center'>Sorting Algorithms</h4>
      <div className="container-fluid mb-3">
        <div className="row">
          <motion.div style={{ cursor: 'pointer' }} whileHover={{ scale: 1.08 }}
            onHoverStart={e => { }}
            onHoverEnd={e => { }} onClick={() => {
              router.push('/sortingAlgo/bubbleSort');
            }} className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div className="card border-0 mb-2 pd-2 shadow-sm p-3 mb-3 bg-body-tertiary rounded">
              <div className="card-body">
                <h5>Bubble Sort</h5>
                <p>Swapping adjacent elements in a sequential pass, bubbling the largest element to the end.</p>
                {/* <Link href={"/sortingAlgo/bubbleSort"}>bubbleSort</Link> */}
              </div>
            </div>
          </motion.div>
          <motion.div style={{ cursor: 'pointer' }} whileHover={{ scale: 1.08 }}
            onHoverStart={e => { }}
            onHoverEnd={e => { }} onClick={() => {
              router.push('/sortingAlgo/selectionSort');
            }} className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div className="card border-0 mb-2 pd-2 shadow-sm p-3 mb-3 bg-body-tertiary rounded">
              <div className="card-body">
                <h5>Selection Sort</h5>
                {/* <Link href="/sortingAlgo/selectionSort">SelectionSort</Link> */}
                <p>Repeatedly finding the minimum element and swapping it with the current position until the array is sorted.</p>
              </div>
            </div>
          </motion.div>
          <motion.div style={{ cursor: 'pointer' }} whileHover={{ scale: 1.08 }}
            onHoverStart={e => { }}
            onHoverEnd={e => { }} onClick={() => {
              router.push('/sortingAlgo/insertionSort');
            }} className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div className="card border-0 mb-2 pd-2 shadow-sm p-3 mb-3 bg-body-tertiary rounded">
              <div className="card-body">
                <h5>Insertion Sort</h5>
                {/* <Link href="/sortingAlgo/insertionSort">InsertionSort</Link> */}
                <p>Iteratively inserting each element into its proper position by shifting larger elements to the right.</p>
              </div>
            </div>
          </motion.div>
          <motion.div style={{ cursor: 'pointer' }} whileHover={{ scale: 1.08 }}
            onHoverStart={e => { }}
            onHoverEnd={e => { }} onClick={() => {
              router.push('/sortingAlgo/mergeSort');
            }} className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div className="card border-0 mb-2 pd-2 shadow-sm p-3 mb-3 bg-body-tertiary rounded">
              <div className="card-body">
                <h5>Merge Sort</h5>
                {/* <Link href="/sortingAlgo/mergeSort">MergeSort</Link> */}
                <p>Dividing the array into two halves, recursively sorting them, and then merging them back in a sorted manner.</p>
              </div>
            </div>
          </motion.div>
          <motion.div style={{ cursor: 'pointer' }} whileHover={{ scale: 1.08 }}
            onHoverStart={e => { }}
            onHoverEnd={e => { }} onClick={() => {
              router.push('/sortingAlgo/heapSort');
            }} className="col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div className="card border-0 mb-2 pd-2 shadow-sm p-3 mb-3 bg-body-tertiary rounded">
              <div className="card-body">
                <h5>Heap Sort</h5>
                {/* <Link href="/sortingAlgo/heapSort">HeapSort</Link> */}
                <p>Building a max heap, repeatedly extracting the maximum element and adjusting the heap.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>




      

    </motion.div>









  )
}

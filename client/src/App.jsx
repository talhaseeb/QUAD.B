import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { getAllUsers } from './apis/apis';

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    getAllUsers();
  }, [])

  return (
    <>
      <h1>QUAD.B</h1>
      <div
        className='text-blue-400 font-semibold tracking-wide underline underline-offset-4 text-2xl leading-none mt-4'
      >
        Advanced Database Topics
      </div>
      <ToastContainer />
    </>
  )
}

export default App

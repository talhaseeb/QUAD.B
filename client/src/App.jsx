import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Home from './components/homepage/Home';
import Signup from './components/userauth/Signup';
import Signin from './components/userauth/Signin';
import Predict from './components/predict/Predict';

function App() {

  return (
    <div className='w-screen h-screen text-white'>
      <Router>
        <Navbar />
        <div
          className='h-[calc(100vh-64px)] w-full'
        >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/predict" element={<Predict />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App

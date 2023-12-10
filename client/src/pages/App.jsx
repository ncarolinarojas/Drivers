import '../App.css';
import {Routes, Route} from 'react-router-dom';
import LandingPage from '../pages/LandingPage'
import Home from '../pages/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App

import '../App.css';
import { Routes, Route, useLocation} from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import CreateDriver from './CreateDriver';
import Details from './Detail';

function App() {

  let location = useLocation()

  return (
    <>
      {(location.pathname !== '/' && <Navbar />)}

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/createDriver' element={<CreateDriver />} />
        <Route path='/details/:id' element={<Details/>}/>
      </Routes>
    </>
  )
}

export default App

import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import Movies from './pages/Movies';

function App() {
 
  return (
    <>
      <Router>
        <Navbar/>
        <div className='main-content'>
        <Routes>
          <Route path='/' exact  Component={Home} />
          <Route path='/Books' Component={Books} />
          <Route path='/Movies' Component={Movies} />
        </Routes>

          
        </div>
      
      </Router>
    </>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import NavigationBar from './navbar/navbar';
import About from './pages/About';
import Home from './pages/Home';

function Main() {
  return (
    <div>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Main;

import { Routes, Route } from 'react-router-dom';
import NavigationBar from './navbar/navbar';
import About from './pages/About';
import DetectJavascript from './pages/Detect-Javascript';
import DetectOpenCV from './pages/Detect-OpenCV';
import Home from './pages/Home';

function Main() {
  return (
    <div>
      <div className="bg-main"></div>

      <NavigationBar />
      <div className="container bg-white2">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/detect-javascript" element={<DetectJavascript />}></Route>
          <Route path="/detect-opencv" element={<DetectOpenCV />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default Main;

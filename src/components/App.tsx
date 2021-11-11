import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Menu from './teste';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Menu/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;

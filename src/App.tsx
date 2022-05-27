import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Todo from './pages/Todo';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

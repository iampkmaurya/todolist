import './App.css';
import Header from './Header';
import Footer from './Footer';
import Wrapper from './Wrapper';
import ToDo from './ToDo';
import Parent from './Components/Parent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route path='/todo' element={<ToDo />} />
        </Route>
        {/* <Route path='/header' element={<Header />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import BookStore from "./component/Cricketers/Cricketers"
import Header from './component/Header';
import { Footer } from 'antd/es/layout/layout';
import getPlayers from './component/GetPlayers/GetPlayers';
import Cricketers from './component/Cricketers/Cricketers';
import CricketerDetails from './component/CricketerDetails/CricketerDetails';

function App() {
  return (
    <div className="App">
       <BrowserRouter basename='/cricketers'>
       <Header />
        <Routes>
          <Route exact path="/cricketers" element={<Cricketers />} />
          <Route path="/" element={<Cricketers />} />
          <Route path="/cricketer/:id" element={<CricketerDetails />} />
        </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;

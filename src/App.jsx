import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter
} from "@fortawesome/free-brands-svg-icons";
import {
  faBrain
} from "@fortawesome/free-solid-svg-icons";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'

import StockQuote from './components/StockQuote';
import Dictionary from './components/Dictionary';

function App() {

  return (
    <div className='image d-flex flex-column justify-content-center align-items-center'>
      <div>
      <a href="https://x.com/home"><button type="button" className="btn btn-outline-secondary mx-3 my-2"><FontAwesomeIcon icon={faXTwitter} size="3x" /></button></a>
      <a href="https://x.com/i/grok"><button type="button" className="btn btn-outline-secondary mx-3 my-2"><FontAwesomeIcon icon={faBrain} size="3x" /></button></a>
      </div>
      <StockQuote />
      <Dictionary />
    </div>
  )
}

export default App


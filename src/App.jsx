import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faGithub,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import {
  faBrain,
  faHandHoldingDollar
} from "@fortawesome/free-solid-svg-icons";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'

import NYSEQuote from './components/NYSEQuote';
import OTCQuote from './components/OTCQuote';
import CryptoQuote from './components/CryptoQuote';
import Crypto1Quote from './components/Crypto1Quote';
import Dictionary from './components/Dictionary';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="image">
      {/* Top bar for buttons */}
      <div className="d-flex justify-content-center flex-wrap">
        <a href="https://x.com/home" className="btn btn-outline-secondary mx-2 my-2" style={{padding: '10px'}} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faXTwitter} size="lg" />
        </a>
        <a href="https://x.com/i/grok" className="btn btn-outline-secondary mx-2 my-2" style={{padding: '10px'}} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faBrain} size="lg" />
        </a>
        <a href="https://github.com/" className="btn btn-outline-secondary mx-2 my-2" style={{padding: '10px'}} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
        <a href="https://robinhood.com/" className="btn btn-outline-secondary mx-2 my-2" style={{padding: '10px'}} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faHandHoldingDollar} size="lg" />
        </a>
        <a href="https://www.youtube.com/" className="btn btn-outline-secondary mx-2 my-2" style={{padding: '10px'}} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} size="lg" />
        </a>
      </div>

      {/* Centered content */}
      <div className="container mt-3 mb-3">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
              <CryptoQuote className="mb-3 mb-sm-0" />
              <Crypto1Quote className="mb-3 mb-sm-0" />
              <OTCQuote className="mb-3 mb-sm-0" />
              <NYSEQuote />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-3">
            <TodoList />
          </div>
          <div className="col-12">
            <Dictionary />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
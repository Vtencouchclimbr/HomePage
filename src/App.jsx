
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'

import StockQuote from './components/StockQuote';
import Dictionary from './components/Dictionary';

function App() {

  return (
    <div className='image'>
      <StockQuote />
      <Dictionary />
    </div>
  )
}

export default App

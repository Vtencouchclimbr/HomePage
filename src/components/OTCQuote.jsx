import { useState, useEffect } from 'react';

// Use the API key from the .env file
const API_KEY = import.meta.env.VITE_OTC_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

// Component to fetch and display stock quote data
const OTCQuote = () => {
  // State to store stock data and error
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const [symbol, setSymbol] = useState('ARSMF');

  // Function to fetch stock quote data from Alpha Vantage API
  const fetchStockQuote = async (stockSymbol) => {
    try {
      const response = await fetch(
        `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data['Global Quote']) {
        setStockData(data['Global Quote']);
        setError(null);
      } else {
        setError('Data format not as expected or no data returned.');
        setStockData(null);
      }
    } catch (err) {
      setError('Error fetching stock data: ' + err.message);
      setStockData(null);
    }
  };

  // Fetch data when component mounts or when symbol changes
  useEffect(() => {
    fetchStockQuote(symbol);
  }, [symbol]);

  // Handle input change for stock symbol
  const handleSymbolChange = (e) => {
    setSymbol(e.target.value.toUpperCase());
  };

  return (
    <div className='stock-quote container text-center mb-3'>
      {/* Input for stock symbol */}
      <h4 className='text-light'>{symbol} Stock Quote</h4>
      <div className='text-light'>
        <label className='mt-1'>
          Stock Symbol:
          <input className='rounded bg-dark text-light text-center' type="text" value={symbol} onChange={handleSymbolChange} />
        </label>
      </div>

      {/* Display error if any */}
      {error && <div>{error}</div>}

      {/* Display stock data */}
      {stockData && (
        <div>
          <h5 className='text-warning'>Current Price: ${stockData['05. price']}</h5>
          <p className='text-light mb-5'>
            Change: ${stockData['09. change']} ({stockData['10. change percent']})
          </p>
          {/* Uncomment these if you want to display additional data 
          <p className='text-light'>High Price: ${stockData['03. high']}</p>
          <p className='text-light'>Low Price: ${stockData['04. low']}</p>
          <p className='text-light'>Open Price: ${stockData['02. open']}</p>
          <p className='text-light'>Previous Close: ${stockData['08. previous close']}</p> */}
        </div>
      )}
    </div>
  );
};

export default OTCQuote;
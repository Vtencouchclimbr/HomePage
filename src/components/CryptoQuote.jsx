import { useState, useEffect } from 'react';

// Use CryptoCompare's API base URL for this specific endpoint
const BASE_URL = 'https://data-api.cryptocompare.com/index/cc/v1/latest/tick';
const API_KEY = import.meta.env.VITE_CRYPTO_API_KEY;

// Component to fetch and display crypto quote data
const CryptoQuote = () => {
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState(null);
  const [symbol, setSymbol] = useState('DOGE');

  // Function to fetch crypto quote data from CryptoCompare API
  const fetchCryptoQuote = async (cryptoSymbol) => {
    try {
      const response = await fetch(
        `${BASE_URL}?market=ccix&instruments=${cryptoSymbol}-USD&api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Log the full response to check if data is received correctly

      // CryptoCompare's response structure
      if (data && data.Data && data.Data[`${cryptoSymbol}-USD`]) {
        setCryptoData(data.Data[`${cryptoSymbol}-USD`]);
        setError(null);
      } else {
        setError('Data format not as expected or no data returned.');
        setCryptoData(null);
      }
    } catch (err) {
      console.error('Fetch error:', err); // Log the error for debugging
      setError('Error fetching crypto data: ' + err.message);
      setCryptoData(null);
    }
  };

  // Fetch data when component mounts or when symbol changes
  useEffect(() => {
    fetchCryptoQuote(symbol);
  }, [symbol]);

  // Handle input change for crypto symbol
  const handleSymbolChange = (e) => {
    setSymbol(e.target.value.toUpperCase());
  };

  return (
    <div className='stock-quote container text-center mb-3'>
      {/* Input for crypto symbol */}
      <h4 className='text-light'>{symbol} Crypto Quote</h4>
      <div className='text-light'>
        <label className='mt-1'>
          Crypto Symbol:
          <input className='rounded bg-dark text-light text-center' type="text" value={symbol} onChange={handleSymbolChange} />
        </label>
      </div>

      {/* Display error if any */}
      {error && <div>{error}</div>}

      {/* Display crypto data */}
      {cryptoData && (
        <div>
          <h5 className='text-warning'>Current Price: ${cryptoData.VALUE.toFixed(5)}</h5>
          <p className='text-light mb-5'>
            Change: ${cryptoData.CURRENT_DAY_CHANGE.toFixed(6)} ({cryptoData.CURRENT_DAY_CHANGE_PERCENTAGE.toFixed(2)}%)
          </p>
        </div>
      )}
    </div>
  );
};

export default CryptoQuote;
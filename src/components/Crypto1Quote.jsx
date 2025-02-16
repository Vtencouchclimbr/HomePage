import { useState, useEffect } from 'react';

// Use Coinpaprika's API base URL
const BASE_URL = 'https://api.coinpaprika.com/v1';

// Component to fetch and display crypto quote data
const CryptoQuote = () => {
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState(null);
  const [symbol, setSymbol] = useState('SHIB');

  // Function to fetch crypto quote data from Coinpaprika API
  const fetchCryptoQuote = async (cryptoSymbol) => {
    try {
      // Coinpaprika uses lowercase for symbols and has specific IDs
      const coinId = cryptoSymbol.toLowerCase() === 'doge' ? 'doge-dogecoin' : cryptoSymbol.toLowerCase();
      const response = await fetch(
        `${BASE_URL}/tickers/${coinId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data); // Log the full response to check if data is received correctly

      if (data && data.quotes) {
        setCryptoData(data);
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
          <h5 className='text-warning'>Current Price: ${cryptoData.quotes.USD.price.toFixed(2)}</h5>
          <p className='text-light mb-5'>
            Change: ${cryptoData.quotes.USD.percent_change_24h.toFixed(2)}%
          </p>
          {/* Uncomment these if you want to display additional data 
          <p className='text-light'>Market Cap: ${cryptoData.quotes.USD.market_cap.toFixed(2)}</p>
          <p className='text-light'>Volume 24h: ${cryptoData.quotes.USD.volume_24h.toFixed(2)}</p> */}
        </div>
      )}
    </div>
  );
};

export default CryptoQuote;
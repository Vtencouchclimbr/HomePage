import { useState, useEffect } from 'react';
import './Dictionary.css';

function Api() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [value, setValue] = useState('');
  const [wordToSearch, setWordToSearch] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    if (value.trim()) {
      setWordToSearch(value.trim());
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (wordToSearch) {
        setLoading(true);
        setError(null);
        setData(null);
        try {
          const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`);
          console.log('Response status:', response.status);
          if (!response.ok) {
            window.location.reload();
          }
          const result = await response.json();
          console.log('API Result:', result);
          setData(result);
        } catch (error) {
          console.error('Error:', error);
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [wordToSearch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className="container">
      <h1 className='text-dark'>My Personal Dictionary</h1>
      <input 
      className='rounded gb-dark'
      type="text" 
      value={value} 
      onChange={handleChange} 
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleSubmit();
        }
      }}
      placeholder="Enter word here" 
      />
      <button className='rounded bg-dark' 
      onClick={handleSubmit}
      >Submit</button>
      {data && data.length > 0 ? (
        <div className="bg-transparent text-dark">
          <div className="card-body">
            <h2 className="card-title">{data[0].word}</h2>
            {data[0].meanings.map((meaning, index) => (
              <div key={index}>
                <h3 className="mt-3">{meaning.partOfSpeech}</h3>
                <ul className="list-group list-group-flush">
                  {meaning.definitions.map((definition, defIndex) => (
                    <li key={defIndex} className="list-group-item bg-dark text-light rounded">
                      {definition.definition}
                      {definition.example && <p className="mb-0"><small>Example: {definition.example}</small></p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No data available for this word.</div>
      )}
    </div>
  );
}

export default Api;
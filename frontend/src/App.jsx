import { useState } from 'react';
import axios from 'axios';
import './App.css'; // Optional, for styling

function App() {
  const [data, setData] = useState("Click the button to test.");
  const [isLoading, setIsLoading] = useState(false);

  const testBackend = async () => {
    setIsLoading(true);
    setData("Connecting...");
    try {
      // Vite exposes env variables through import.meta.env
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/test-db`;
      console.log(`Making request to: ${apiUrl}`);
      
      const response = await axios.get(apiUrl);
      setData(response.data.message);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setData("Error: Could not connect to the backend. Is it running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>RFP Agent Frontend</h1>
      <button onClick={testBackend} disabled={isLoading}>
        {isLoading ? 'Testing...' : 'Test Backend Connection'}
      </button>
      <p>
        Response from backend: <strong>{data}</strong>
      </p>
    </div>
  );
}

export default App; 
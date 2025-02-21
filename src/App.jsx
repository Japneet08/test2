import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css"; // Optional for styling

const apiEndpoint = "https://test-5tfl.onrender.com/bfhl"; // Replace with your deployed backend URL

function App() {
  const [userInput, setUserInput] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const sendDataToAPI = async () => {
    try {
      const parsedData = JSON.parse(userInput);
      const res = await axios.post(apiEndpoint, parsedData);
      setApiResponse(res.data);
    } catch (error) {
      alert("Invalid JSON format or server error!");
      console.log(error);
    }
  };

  const filterOptions = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>BFHL Data Processor</h1>
      <textarea
        rows="5"
        cols="50"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder='Enter JSON: {"data": ["X", "7", "G", "12"]}'
      />
      <br />
      <button onClick={sendDataToAPI} style={{ marginTop: "10px" }}>
        Process Data
      </button>

      {apiResponse && (
        <>
          <h3>Filter Output</h3>
          <Select options={filterOptions} isMulti onChange={setSelectedFilters} />
          <div style={{ textAlign: "left", marginTop: "10px" }}>
            <h4>Filtered Response</h4>
            {selectedFilters.map(
              (filter) =>
                apiResponse[filter.value] !== undefined && (
                  <p key={filter.value}>
                    <strong>{filter.label}:</strong>{" "}
                    {Array.isArray(apiResponse[filter.value])
                      ? apiResponse[filter.value].join(", ")
                      : apiResponse[filter.value]}
                  </p>
                )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from './SearchBar.module.css'
import axios from "axios";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    axios.get('/api/search', {
    params: { params: value }
  }).then((response)=>{
        setResults(response.data);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className={styles["input-wrapper"]}>
      <FaSearch className={styles["search-icon"]} />
      <input
        className={styles["search-input", "input"]}
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

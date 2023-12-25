import styles from "./SearchResultsList.module.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {

  return (
    <div className={styles["results-list"]}>
      {results.map((result) => {
        return <SearchResult result={result.Title} key={result.ProductID} ProductID={result.ProductID} />;
      })}
    </div>
  );
};

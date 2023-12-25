import { useRouter } from 'next/router';
import styles from './SearchResult.module.css'

export const SearchResult = ({ result, ProductID }) => {
  const router = useRouter();

  return (
    <div
      className={styles["search-result"]}
      onClick={(e) => {router.push('/product/'+ProductID)}}
    >
      {result}
    </div>
  );
};

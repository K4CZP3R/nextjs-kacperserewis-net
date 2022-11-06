import { getSiteName } from "../../lib/get-site-name";
import styles from "./header.module.css";
export default function Header() {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className={styles.container}>
      <button onClick={goBack}>Back</button>
      <b>{getSiteName()}</b>
    </div>
  );
}

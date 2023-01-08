import { getSiteName } from "../../lib/get-site-name";
import Button from "../button/button";
import CssVarChanger from "../css-var-changer/css-var-changer";
import styles from "./header.module.css";
export default function Header() {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className={styles.container}>
      <Button path="/">{getSiteName()}</Button>
      {/* <CssVarChanger></CssVarChanger> */}
    </div>
  );
}

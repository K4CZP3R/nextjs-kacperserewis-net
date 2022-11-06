import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.children}>{children}</main>
      <Footer />
    </div>
  );
}

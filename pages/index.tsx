import React from "react";
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import { getSiteName } from "../lib/get-site-name";
import styles from "../styles/Index.module.css";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const ThreeDimensionBlob = dynamic(
  () => import("../components/three-dimension-blob/three-dimension-blob"),
  {
    suspense: true,
  }
);

export default function Index({
  siteName,
  title,
  description,
  socials,
}: {
  siteName: string;
  title: string;
  description: string;
  socials: string[];
}) {
  const [blobProps, setBlobProps] = React.useState({
    blobColor: 0x00ff00,
    blobColorEmission: 0.75,
    blobSpeed: 0.001,
    blobSpikeness: 1,
  });

  return (
    <div className={styles.container}>
      <Header siteName={siteName}></Header>
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>

          <div className={styles.socials}>
            {socials.map((social) => (
              <a href="#" key={social}>
                {social}
              </a>
            ))}

            <a href="#">Projects</a>
            <a href="#">Blog</a>
          </div>
        </div>
        <div className={styles.blob}>
          <Suspense fallback={<div>Loading...</div>}>
            <ThreeDimensionBlob
              blobProps={blobProps}
              lightColor={0xffff00}
              lightColorEmission={0.25}
            ></ThreeDimensionBlob>
          </Suspense>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

// @ts-ignore
export async function getServerSideProps() {
  return {
    props: {
      siteName: getSiteName(),
      title: "Kacper Serewiś",
      description: "Software Engineer",
      socials: ["LinkedIn", "GitHub", "Twitter"],
    },
  };
}

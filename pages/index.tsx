import React, { Suspense } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "../styles/Index.module.css";
import { getCmsPage, getCmsSocials } from "../lib/get-cms";
import { IPage } from "../models/page.model";
import { ISocial } from "../models/social.model";

const ThreeDimensionBlob = dynamic(
  () => import("../components/three-dimension-blob/three-dimension-blob"),
  {
    suspense: true,
  }
);

export default function Index({
  cms,
  socials,
}: {
  cms: IPage;
  socials: ISocial[];
}) {
  const [blobProps, setBlobProps] = React.useState({
    blobColor: 0x00ff00,
    blobColorEmission: 0.75,
    blobSpeed: 0.001,
    blobSpikeness: 1,
  });

  return (
    <div className={styles.content}>
      <div className={styles.textContent}>
        <h1 className={styles.title}>{cms.mainText}</h1>
        <h5 className={styles.description}>{cms.subText}</h5>
        <p>{cms.botText}</p>

        <div className={styles.socials}>
          {socials.map((social) => (
            <a href="#" key={social.id}>
              {social.name}
            </a>
          ))}

          <Link href={"/projects"}>Projects</Link>
          <Link href={"/blog"}>Blog</Link>
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
  );
}

// @ts-ignore
export async function getStaticProps() {
  return {
    props: {
      cms: (await getCmsPage("landing-page")).data,
      socials: (await getCmsSocials()).data,
    },
  };
}

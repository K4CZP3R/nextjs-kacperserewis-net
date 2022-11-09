import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import styles from "../styles/Index.module.css";
import { IndexPageQlRepository } from "../repo/index-page-ql.repository";
import { IIndexPage } from "../models/index-page.model";
import { ISocial } from "../models/social.model";
import { SocialQlRepository } from "../repo/social-ql.repository";
import Button from "../components/button/button";

const ThreeDimensionBlob = dynamic(
  () => import("../components/three-dimension-blob/three-dimension-blob"),
  {
    suspense: true,
  }
);

export default function Index({
  indexPage,
  socials,
}: {
  indexPage: IIndexPage;
  socials: ISocial[];
}) {
  const [blobProps, setBlobProps] = React.useState({
    blobColor: 0xadb5bd,
    blobColorEmission: 0.5,
    blobSpeed: 0.001,
    blobSpikeness: 1.25,
  });

  return (
    <div className={styles.content}>
      <div className={styles.textContent}>
        <h1 className={styles.title}>{indexPage.title}</h1>
        <h5 className={styles.description}>{indexPage.subtitle}</h5>
        <p>{indexPage.extraContent}</p>

        <div className={styles.socials}>
          {socials.map((social) => (
            <Button path="#" key={social.id}>
              {social.name}
            </Button>
          ))}

          <Button path="/projects">Projects</Button>
          <Button path="/blog">Blog</Button>
        </div>
      </div>
      <div className={styles.blob}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThreeDimensionBlob
            blobProps={blobProps}
            lightColor={0xf6f6f2}
            lightColorEmission={0.25}
          ></ThreeDimensionBlob>
        </Suspense>
      </div>
    </div>
  );
}

// @ts-ignore
export async function getStaticProps() {
  const indexPage = await new IndexPageQlRepository().get();
  const socials = await new SocialQlRepository().getAll();

  return {
    props: {
      indexPage: indexPage,
      socials: socials,
    },
  };
}

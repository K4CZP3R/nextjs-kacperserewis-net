import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import styles from "../styles/Index.module.css";
import { ISocial } from "../models/social.model";
import Button from "../components/button/button";
import { PageRepository } from "../repo/page.repository";
import { SocialRepository } from "../repo/social.repository";
import { IPage } from "../models/page.model";

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
  indexPage: IPage;
  socials: ISocial[];
}) {
  const [blobProps, setBlobProps] = React.useState({
    blobColor: 0xe95e2f,
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
            <Button newTab={true} path={social.url} key={social.id}>
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
  const indexPage = await new PageRepository().get("index");
  const socials = await new SocialRepository().getAll();

  return {
    props: {
      indexPage: indexPage,
      socials: socials,
    },
  };
}

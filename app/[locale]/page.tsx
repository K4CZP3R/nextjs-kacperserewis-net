import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import styles from "../../styles/Index.module.css";
import Button from "../../components/button/button";
import { PageRepository } from "../../repo/page.repository";
import { SocialRepository } from "../../repo/social.repository";
import { getSiteName } from "../../lib/get-site-name";
import { getCurrentLocale, getI18n } from "../../locales/server";
import { Locale } from "../../locales/consts";
import { setStaticParamsLocale } from "next-international/server";

const ThreeDimensionBlob = dynamic(
  () => import("../../components/three-dimension-blob/three-dimension-blob"),
  {
    suspense: true,
  }
);

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const t = await getI18n();
  const indexPage = await new PageRepository().get("index", locale);

  return {
    title: getSiteName(t("index")),
    description: indexPage?.extraContent,
  };
}

export default async function Index({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setStaticParamsLocale(locale);
  const t = await getI18n();
  const indexPage = await new PageRepository().get("index", locale);
  const socials = await new SocialRepository().getAll();

  const blobProps = {
    blobColor: 0xe95e2f,
    blobColorEmission: 0.5,
    blobSpeed: 0.001,
    blobSpikeness: 1.25,
  };

  if (indexPage === null || socials === null) {
    return <div>{t("loading")}</div>;
  }

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

          <Button path="/projects">{t("projects")}</Button>
          <Button path="/blog">{t("blogPage")}</Button>
        </div>
      </div>
      <div className={styles.blob}>
        <Suspense fallback={<div>{t("loading")}</div>}>
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

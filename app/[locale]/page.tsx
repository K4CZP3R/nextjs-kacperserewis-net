import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import styles from "../../styles/Index.module.css";
import { Button } from "../../components/ui/button";
import { PageRepository } from "../../repo/page.repository";
import { SocialRepository } from "../../repo/social.repository";
import { getSiteName } from "../../lib/get-site-name";
import { getCurrentLocale, getI18n } from "../../locales/server";
import { Locale } from "../../locales/consts";
import { setStaticParamsLocale } from "next-international/server";
import Link from "next/link";
import { H1, H2, H3, H4, P } from "@/components/text";

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
        <H1>{indexPage.title}</H1>
        <H4>{indexPage.subtitle}</H4>
        <P>{indexPage.extraContent}</P>

        <div className={styles.socials}>
          {socials.map((social) => (
            <Button asChild key={social.id}>
              <Link href={social.url} passHref={true}>
                {social.name}
              </Link>
            </Button>
          ))}

          <Button asChild>
            <Link href="/projects">{t("projects")}</Link>
          </Button>
          <Button>
            <Link href="/blog">{t("blogPage")}</Link>
          </Button>
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

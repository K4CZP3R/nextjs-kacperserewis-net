import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import styles from "@/styles/Index.module.css";
import { Button } from "@/components/ui/button";
import { PageRepository } from "@/repo/page.repository";
import { SocialRepository } from "@/repo/social.repository";
import { getSiteName } from "@/lib/get-site-name";
import { getI18n } from "@/locales/server";
import { Locale } from "@/locales/consts";
import { setStaticParamsLocale } from "next-international/server";
import Link from "next/link";
import { H1, H4, P } from "@/components/text";
import RenderWIicon from "@/components/icons";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setStaticParamsLocale(locale);
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

  const ThreeDimensionBlob = dynamic(
    () => import("@/components/three-dimension-blob/three-dimension-blob"),
    {
      loading: () => (
        <div
          style={{
            width: "300px",
            height: "300px",
          }}
        ></div>
      ),
      ssr: true,
    },
  );

  const blobProps = {
    blobColor: 0xf97316,
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
        <H1>
          <RenderWIicon text={indexPage.title} />
        </H1>
        <H4>
          <RenderWIicon text={indexPage.subtitle} />
        </H4>
        <P>
          <RenderWIicon text={indexPage.extraContent} />
        </P>

        <div className={styles.socials}>
          {socials.map((social) => (
            <Button size={"icon"} asChild key={social.id}>
              <Link href={social.url} passHref={true}>
                <RenderWIicon text={social.name} />
              </Link>
            </Button>
          ))}

          <Button asChild>
            <Link href="/projects">{t("projects")}</Link>
          </Button>
          <Button asChild>
            <Link href="/blog">{t("blogPage")}</Link>
          </Button>
        </div>
      </div>
      <div className={styles.blob}>
        <ThreeDimensionBlob
          blobProps={blobProps}
          lightColor={0xf6f6f2}
          lightColorEmission={0.15}
        ></ThreeDimensionBlob>
      </div>
    </div>
  );
}

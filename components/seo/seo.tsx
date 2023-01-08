import Head from "next/head";
import React from "react";
import { getSiteName } from "../../lib/get-site-name";
import Button from "../button/button";
import styles from "./header.module.css";

export type SeoProps = JSX.IntrinsicElements["div"] & {
  title?: string;
  description?: string;
};
export default class Seo extends React.Component<SeoProps> {
  render() {
    return (
      <Head>
        <title>{getSiteName(this.props.title ?? "")}</title>
        <meta name="description" content={this.props.description ?? ""} />
      </Head>
    );
  }
}

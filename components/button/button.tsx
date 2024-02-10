import Link from "next/link";
import React from "react";
import styles from "./button.module.css";

export type ButtonProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
  path: string;
  newTab?: boolean;
};

export default function Button(props: ButtonProps) {
  return (
    <Link href={props.path} className={[styles.cta, "button-hover"].join(" ")}>
      <span>{props.children}</span>
    </Link>
  );
}

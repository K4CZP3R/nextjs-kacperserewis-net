import Link from "next/link";
import React from "react";
import styles from "./button.module.css";

export type ButtonProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
  path: string;
  newTab?: boolean;
};

export default class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <Link
        href={this.props.path}
        className={[styles.cta, "button-hover"].join(" ")}
      >
        <span>{this.props.children}</span>
      </Link>
    );
  }
}

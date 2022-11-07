import React from "react";
import styles from "./button.module.css";

export type ButtonProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
  path: string;
};

export default class Button extends React.Component<ButtonProps> {
  render() {
    // On button click, navigate to the path
    const onClick = () => {
      window.location.href = this.props.path;
    };

    return (
      <button onClick={onClick} className={styles.cta}>
        <span>{this.props.children}</span>
        <svg viewBox="0 0 13 10" height="10px" width="15px">
          <path d="M1,5 L11,5"></path>
          <polyline points="8 1 12 5 8 9"></polyline>
        </svg>
      </button>
    );
  }
}

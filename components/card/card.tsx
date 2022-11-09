import React from "react";
import Button from "../button/button";
import styles from "./card.module.css";

export type CardProps = JSX.IntrinsicElements["div"] & {
  title: string;
  description: string;
  link: string;
  linkText: string;
};

export default class Card extends React.Component<CardProps> {
  render() {
    return (
      <div className={styles.card}>
        <div className={styles.card_body}>
          <h5 className={styles.card_title}>{this.props.title}</h5>
          <p className={styles.card_text}>{this.props.description}</p>
          <Button path={this.props.link}>{this.props.linkText}</Button>
        </div>
      </div>
    );
  }
}

import React from "react";
import { StringKeyframeTrack } from "three";
import Button from "../button/button";
import styles from "./card.module.css";

export type CardProps = JSX.IntrinsicElements["div"] & {
  title: string;
  description: string;
  hashTags?: string[];
  subTitle?: string;
};

export default class Card extends React.Component<CardProps> {
  render() {
    return (
      <div className={styles.card}>
        <div className={styles.card_body}>
          <h5 className={styles.card_title}>{this.props.title}</h5>
          <div className={styles.card_sub}>
            <span>{this.props.subTitle}</span>
            <span>{this.props.hashTags?.join(" ")}</span>
          </div>
          <p className={styles.card_text}>{this.props.description}</p>
          {this.props.children}
        </div>
      </div>
    );
  }
}

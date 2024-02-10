import React from "react";
import styles from "./card.module.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type CardProps = JSX.IntrinsicElements["div"] & {
  title: string;
  description: string;
  hashTags?: string[];
  subTitle?: string;
  dateRaw?: string;
};

export type CardState = {
  date: string;
};

export default function MyCard(props: CardProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">{props.children}</CardFooter>
    </Card>
  );
}

// export default function Card(props: CardProps) {
//   return (
//     <div className={styles.card}>
//       <div className={styles.card_body}>
//         <h5 className={styles.card_title}>{props.title}</h5>
//         <div className={styles.card_sub}>
//           <span>datemissing</span>
//           <span>{props.subTitle}</span>
//           <span>{props.hashTags?.join(" ")}</span>
//         </div>
//         <p className={styles.card_text}>{props.description}</p>
//         {props.children}
//       </div>
//     </div>
//   );
// }

import React from "react";
import { ReactNode } from "react";
import "highlight.js/styles/atom-one-dark.css";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import rehypeHighlight from "rehype-highlight";
import styles from "./markdown-render.module.css";
export type MarkdownRenderProps = JSX.IntrinsicElements["div"] & {
  rawMarkdown: string;
};

const components = {
  pre: (props: any) => <pre className={styles.pre} {...props} />,
};

export default class MarkdownRender extends React.Component<MarkdownRenderProps> {
  private converted: MDXRemoteSerializeResult<Record<any, any>> | null = null;
  constructor(props: MarkdownRenderProps) {
    super(props);

    serialize(this.props.rawMarkdown, {
      mdxOptions: {
        rehypePlugins: [rehypeHighlight],
      },
    }).then((result) => {
      this.converted = result;
      this.forceUpdate();
    });
  }
  render(): ReactNode {
    if (!this.converted) {
      return <div>Loading...</div>;
    }
    return (
      <div className="wrapper">
        <MDXRemote {...this.converted} components={components} />
      </div>
    );
  }
}

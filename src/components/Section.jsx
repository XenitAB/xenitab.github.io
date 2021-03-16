/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React from "react";

const style = css`
  &.project {
    height: 75vh;
    margin-top: 100px;
  }

  &.landing {
    margin-top: 200px;
    height: 55vh;
  }

  &.clipout {
    height: 75vh;
    margin-top: 100px;
    padding-top: 25vh;
    background-color: var(--ifm-color-primary);
    clip-path: polygon(100% 100%, 100% 0%, 0% 15%, 0% 100%);
  }

  &.what-we-do {
    height: 90vh;
    margin-top: 100px;
    padding-top: 25vh;
    background-color: var(--ifm-color-primary);
    clip-path: polygon(100% 85%, 100% 0%, 0% 15%, 0% 100%);
  }
`;

export const Section = (props) => {
  return (
    <section className={props.name} css={style}>
      {props.children}
    </section>
  );
};

export default Section;

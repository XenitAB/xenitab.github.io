/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React from "react";

const style = css`
  &.project {
    height: auto;
    margin-top: 100px;

    @media (max-width: 415px) {
      text-align: center;
      margin-top: 80px;
    }
  }

  &.landing {
    margin-top: 200px;
    height: 55vh;

    @media (max-width: 415px) {
      margin-top: 130px;
    }
  }

  &.clipout {
    height: 75vh;
    margin-top: 100px;
    padding-top: 25vh;
    background-color: var(--ifm-color-primary);
    clip-path: polygon(100% 100%, 100% 0%, 0% 15%, 0% 100%);

    @media (max-width: 415px) {
      height: 65vh;
      text-align: center;
      margin-top: 80px;
      padding-top: 10vh;
    }
  }

  &.what-we-do {
    height: 90vh;
    margin-top: 100px;
    padding-top: 25vh;
    background-color: var(--ifm-color-primary);
    clip-path: polygon(100% 85%, 100% 0%, 0% 15%, 0% 100%);

    @media (max-width: 415px) {
      height: 80vh;
      text-align: center;
      margin-top: 80px;
      padding-top: 10vh;
    }
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

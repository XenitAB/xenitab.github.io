/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React from "react";

const style = css`
  font-size: 72px;
  margin-top: 40px;

  @media (max-width: 415px) {
    font-size: 32px;
  }
`;

export const H2 = (props) => {
  return <h2 css={style}>{props.children}</h2>;
};

export default H2;

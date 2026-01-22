/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React from "react";
import H2 from "./H2";
import Link from "./Link";

const titleStyle = css`
  font-size: 72px;
  margin-top: 40px;

  @media (max-width: 415px) {
    font-size: 32px;
  }
`;

export const Intro = (props) => {
  return (
    <div className="col-64">
      <H2>{props.title}</H2>
      {props.children}
    </div>
  );
};

export default Intro;

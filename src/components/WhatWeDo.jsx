/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React from "react";
import H2 from "./H2";

const titleStyle = css`
  font-size: 72px;
  margin-top: 40px;

  @media (max-width: 415px) {
    font-size: 32px;
  }
`;

export const WhatWeDo = (props) => {
  return (
    <div className="flex-fill">
      <H2 css={titleStyle}>What we do</H2>
      <p>
        Our purpose is to create freedom for all people, and we do that through
        our services and products within cloud and digital transformation. We
        offer 24/7/365 solutions within cloud, operations, and development to
        help our clients improve their digital environment. We don’t believe in
        limitations, with our engaged specialists, we want to optimize our
        client’s environments to provide the greatest value possible for our
        clients.
      </p>
    </div>
  );
};

export default WhatWeDo;

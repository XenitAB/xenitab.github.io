/** @jsx jsx */
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
        Xenit is a growth company with the goal of becoming the largest and
        kindest cloud partner. Our purpose is to create freedom for people and
        we do this through our services in cloud and digital transformation.
        Services that create better conditions for telework, cooperation between
        offices and freedom in the choice of units, working hours and workplace.
      </p>
    </div>
  );
};

export default WhatWeDo;

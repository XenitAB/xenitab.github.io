/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React from "react";
import H2 from "./H2";

const titleStyle = css`
  font-size: 72px;
  margin-top: 40px;

  @media (max-width: 400px) {
    font-size: 32px;
  }
`;

export const Intro = (props) => {
  return (
    <div className="col-64">
      <H2>Projects</H2>
      <p>
        Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem
        ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare
        tog att antal bokstäver och blandade dem för att göra ett provexemplar
        av en bok. Lorem ipsum har inte bara överlevt fem århundraden.
      </p>
    </div>
  );
};

export default Intro;

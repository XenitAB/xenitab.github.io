/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React from "react";

const style = css`
  .hero__title {
    font-size: 104px;
    line-height: 100%;

    @media (max-width: 415px) {
      font-size: 64px;
    }
  }

  h3 {
    @media (max-width: 415px) {
      font-size: 24px;
    }
  }

  .hero__subtitle {
    font-size: 18px;

    @media (max-width: 415px) {
      font-size: 14px;
    }
  }

  .green {
    color: #02d35f;
  }

  @media (max-width: 415px) {
    display: block;
  }
`;

export const Hero = (props) => {
  return (
    <div css={style} className="col-64">
      <h1 className="hero__title">
        Xenit <span className="green">open</span> source
      </h1>
      <h3>The power of collaboration</h3>
      <p className="hero__subtitle">
        Xenit is a growth company with services in cloud and digital
        transformation. Our dedicated specialists inspire, challenge and guide
        companies and organizations to the cloud - always with business value
        and the end user's freedom in focus. Xenit opensource will be a big part
        of the future.
        {/* Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem
        ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare
        tog att antal bokstäver och blandade dem för att göra ett provexemplar
        av en bok. Lorem ipsum har inte bara överlevt fem århundraden. */}
      </p>
    </div>
  );
};

export default Hero;

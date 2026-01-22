/** @jsxImportSource @emotion/react */
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
      <h3>We Make Your Digital Dreams Happen!</h3>
      <p className="hero__subtitle">
        Xenit is a growth company that provides services and products within
        cloud and digital transformation. Our engaged and experienced
        specialists inspire, challenges and guides organizations to the cloud –
        always with business value and freedom in focus. Xenit is on a mission
        to become the greatest and kindest cloud partner. For us, being kind
        means sharing our knowledge and leading expertise through open source.
        {/* Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem
        ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare
        tog att antal bokstäver och blandade dem för att göra ett provexemplar
        av en bok. Lorem ipsum har inte bara överlevt fem århundraden. */}
      </p>
    </div>
  );
};

export default Hero;

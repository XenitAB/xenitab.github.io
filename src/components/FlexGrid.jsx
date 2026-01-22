/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React from "react";

const style = css`
  display: flex;
  justify-content: space-between;

  .-absolute {
    position: absolute;
    bottom: 10px;
    right: 0;
    left: 0;
    text-align: center;
  }

  .col-20 {
    width: 20%;

    @media (max-width: 415px) {
      display: block;
      width: 100%;
    }
  }

  .col-32 {
    width: 32%;

    @media (max-width: 415px) {
      display: block;
      width: 100%;
    }
  }

  .col-40 {
    width: 40%;

    @media (max-width: 415px) {
      display: block;
      width: 100%;
    }
  }

  .col-64 {
    width: 64%;

    @media (max-width: 415px) {
      display: block;
      width: 100%;
    }
  }

  .col-100 {
    width: 100%;
  }

  .flex-fill {
    flex: 1;

    @media (max-width: 415px) {
      display: block;
      width: 100%;
    }
  }

  @media (max-width: 415px) {
    display: block;
  }
`;

export const FlexGrid = (props) => {
  return (
    <div className="container flex-grid" css={style}>
      {props.children}
    </div>
  );
};

export default FlexGrid;

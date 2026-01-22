/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React from "react";

const style = css`
  .image-wrapper {
    margin-top: 50px;

    @media (max-width: 415px) {
      text-align: center;
      margin-top: 40px;

      img {
        width: 220px;
        height: auto;
      }
    }
  }
`;

export const Image = (props) => {
  return (
    <div css={style} className="flex-fill">
      <div className="image-wrapper">
        <img src={props.imagePath} alt={props.altName} />
      </div>
    </div>
  );
};

export default Image;

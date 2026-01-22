/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import Link from "./Link";
import React from "react";

const style = css`
  margin-bottom: 24px;
  padding-right: 20px;
  padding-left: 30px;
  position: relative;
  width: 100%;
  text-align: left;

  p {
    font-family: MaisonNeue-Bold;
    margin: 0px;

    @media (max-width: 415px) {
      font-size: 15px;
    }
  }

  a {
    font-family: MaisonNeue-Light;
    color: inherit;
    border-bottom: solid 1px;
    font-size: 16px;
    line-height: 100%;
    text-decoration: none;

    &:hover {
      border-bottom: solid 1px #02d35f;
      color: #02d35f;
      line-height: 100%;
      cursor: pointer;
    }

    @media (max-width: 415px) {
      font-size: 11px;
    }
  }

  img {
    position: absolute;
    left: 0px;
    top: 7px;
    height: 12px;
    width: 12px;
  }
`;

export const Project = (props) => {
  return (
    <div css={style}>
      <img src="../img/bullet.svg" alt="bullet" />
      <p>{props.name}</p>
      <a href={props.link}>{props.link}</a>
    </div>
  );
};

export default Project;

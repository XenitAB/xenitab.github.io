/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React from "react";

const style = css`
  background-color: green;
`;

export const Button = (props) => {
  return <button css={style}>{props.children}</button>;
};

export default Button;

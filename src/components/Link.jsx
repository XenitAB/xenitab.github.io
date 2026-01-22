/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React from "react";

export const Link = (props) => {
  const style = css`
    color: ${props.green ? `#02d35f` : `#fff`};
    border-bottom: solid 1px ${props.green ? `#02d35f` : `#fff`};
    font-size: 16px;
    line-height: 100%;

    &:hover {
      text-decoration: none;
      border-bottom: ${props.green ? `#02d35f` : `#fff`};
      color: ${props.green ? `#02d35f` : `#fff`};
      font-size: 16px;
      line-height: 100%;
      cursor: pointer;
    }

    @media (max-width: 415px) {
      font-size: 14px;
    }
  `;

  return (
    <a target={props.newtab} href={props.url} css={style}>
      {props.children}
    </a>
  );
};

export default Link;

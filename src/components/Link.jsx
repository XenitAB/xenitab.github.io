/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import React from 'react';

const style = css`
    color: #fff;
    border-bottom: solid 1px #fff;
    font-size: 16px;
    line-height: 100%;

    &:hover {
    border-bottom: solid 1px #02d35f;
    color: #02d35f;
    font-size: 16px;
    line-height: 100%;
    cursor: pointer;
}
`;

export const Link = (props) => {
  return <a css={style}>{props.children}</a>;
}

export default Link;
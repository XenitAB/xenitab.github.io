/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import React from 'react';

const style = css`
    list-style: none;
    padding-left: 0px;

  li {
      margin-bottom: 5px;
  }
`;

export const List = (props) => {
  return <ul css={style}>{props.children}</ul>;
}

export default List;
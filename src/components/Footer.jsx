/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import Link from "./Link";
import List from "./List";
import FlexGrid from "./FlexGrid";

import React from "react";

const style = css`
  color: #fff;
  padding-top: 130px;
  background-color: #0d2c40;
  height: 600px;
  position: relative;

  &::before {
    content: "";
    background-image: url(/img/pattern_triangle.svg);
    clip-path: polygon(0 10%, 0 100%, 45% 100%);
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.1;
    z-index: 0;
  }

  .copyright {
    font-size: 12px;
  }

  .social-media {
    margin-bottom: 10px;
    z-index: 1;

    img {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-right: 10px;
      cursor: pointer;
    }

    a {
      border: none;
      color: #02d35f;

      &:hover {
        border: none;
      }
    }
  }

  .linkedin {
    z-index: 3;
  }

  .xenit-text {
    /* font-book */
    font-size: 16px;
    padding-right: 20px;
    margin-bottom: 24px;
  }

  p {
    color: #fff;
    font-size: 16px;
    line-height: 150%;
    z-index: 1;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  h3 {
    font-size: 22px;
  }

  a {
    color: #fff;
    border-bottom: solid 1px #fff;
    font-size: 16px;
    line-height: 100%;
    z-index: 1;

    &:hover {
      z-index: 1;
      border-bottom: solid 1px #02d35f;
      color: #02d35f;
      font-size: 16px;
      line-height: 100%;
      cursor: pointer;
    }
  }

  @media (max-width: 415px) {
    height: auto;
    padding-bottom: 130px;

    h3 {
      margin-top: 50px;
    }
  }
`;

export const Footer = (props) => {
  return (
    <footer css={style}>
      <FlexGrid>
        <div className="col-40">
          <img src="/img/Xenit_logo_Vit.png" alt="xenit" />
          <p className="xenit-text">
            Xenit is a growth company that provides services and products within
            cloud and digital transformation. Our engaged and experienced
            specialists inspire, challenges and guides organizations to the
            cloud – always with business value and freedom in focus.
          </p>
          <div className="social-media">
            <a href="#">
              <img
                src="/img/linkedin.svg"
                className="linkedin"
                alt="linkedin"
              />
            </a>
            <a href="#">
              <img
                src="/img/instagram.svg"
                className="instagram"
                alt="instagram"
              />
            </a>
          </div>

          <Link href="#">Integritetspolicy</Link>
        </div>
        <div className="col-20">
          <h3>Contact</h3>
          <List>
            <li>Kungstorget 7</li>
            <li>411 17 Göteborg</li>
            <li>
              <Link url="tel:+46 (0) 10 707 35 00">+46 (0) 10 707 35 00</Link>
            </li>
            <li>
              <Link target url="mailto:info@xenit.se">
                info@xenit.se
              </Link>
            </li>
            <li>Show on map</li>
          </List>
        </div>
        <div className="col-20">
          <h3>Pages</h3>
          <List>
            <li>
              <Link newtab="_blank" url="https://www.xenit.se/it-tjanster/">
                IT-services
              </Link>
            </li>
            <li>
              <Link newtab="_blank" url="https://www.xenit.se/kundcase/">
                Customer stories
              </Link>
            </li>
            <li>
              <Link newtab="_blank" url="https://www.xenit.se/karriar/">
                Career
              </Link>
            </li>
            <li>
              <Link newtab="_blank" url="https://www.xenit.se/vdp/">
                Report a vulnerability
              </Link>
            </li>
            <li>
              <Link newtab="_blank" url="https://xenit.se/tech-blog/">
                Tech blog
              </Link>
            </li>
            <li>
              <Link newtab="_blank" url="https://www.xenit.se/om-oss/">
                About Xenit
              </Link>
            </li>
          </List>
        </div>
        <div className="col-20">
          {/* <h3>Support</h3>
          <p>
            For our contract customers, our specialists are ready. Call us on
            +46 (0) 10 707 35 80 or log in to our remote support to get help.
          </p> */}
        </div>
      </FlexGrid>
      <FlexGrid className="container flex-grid">
        <div className="col-100 -absolute">
          <p className="copyright">Copyright © 2021 Xenit</p>
        </div>
      </FlexGrid>
    </footer>
  );
};

export default Footer;

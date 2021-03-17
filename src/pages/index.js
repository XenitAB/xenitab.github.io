import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "@theme/Layout";
import Footer from "../components/Footer";
import Project from "../components/Project";
import Section from "../components/Section";
import FlexGrid from "../components/FlexGrid";
import Hero from "../components/Hero";
import WhatWeDo from "../components/WhatWeDo";
import H2 from "../components/H2";
import Image from "../components/Image";
import Intro from "../components/Intro";
import Link from "../components/Link";

import { projects } from "../data/projects";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export const Home = () => {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const projectList = projects.map((project) => {
    return (
      <div key={project.id} className="item">
        <Project link={project.url} name={project.name} />
      </div>
    );
  });

  return (
    <Layout
      title="Xenit Documentation"
      description="Xenit documentation for open source projects"
    >
      <Section name="landing">
        <FlexGrid>
          <Hero />
          <div className="col-32"></div>
        </FlexGrid>
      </Section>
      <Section name="what-we-do">
        <FlexGrid>
          <Image imagePath="../img/super.svg" altNames="what-we-do" />
          <WhatWeDo />
        </FlexGrid>
      </Section>
      <Section name="project">
        <FlexGrid>
          <Intro title="Projects">
            <p>
              Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin.
              Lorem ipsum har varit standard ända sedan 1500-talet,{" "}
              <Link green url="https://github.com/XenitAB">
                https://github.com/XenitAB
              </Link>{" "}
              när en okänd boksättare tog att antal bokstäver och blandade dem
              för att göra ett provexemplar av en bok. Lorem ipsum har inte bara
              överlevt fem århundraden.
            </p>
          </Intro>
        </FlexGrid>
        <div className="container grid">{projectList}</div>
      </Section>
      <Section name="clipout">
        <FlexGrid>
          <Image imagePath="../img/contribute.svg" altName="contact" />
          <div className="flex-fill">
            <H2>Contact</H2>
            <p>
              Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin.
              Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd
              boksättare tog att antal bokstäver och blandade dem för att göra
              ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem
              århundraden.
            </p>
          </div>
        </FlexGrid>
      </Section>
      <Footer />
    </Layout>
  );
};

export default Home;

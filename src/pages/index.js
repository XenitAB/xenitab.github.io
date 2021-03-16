import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "@theme/Layout";
import Footer from "../components/Footer";
import Project from "../components/Project";
import Section from "../components/Section";
import FlexGrid from "../components/FlexGrid";
import Hero from "../components/Hero";

import { projects } from "../data/projects";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

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
          <div className="flex-fill">
            <div className="image-wrapper">
              <img src="../img/super.svg" alt="what-we-do" />
            </div>
          </div>
          <div className="flex-fill">
            <h2>What we do</h2>
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
      <Section name="project">
        <FlexGrid>
          <div className="col-64">
            <h2>Projects</h2>
            <p>
              Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin.
              Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd
              boksättare tog att antal bokstäver och blandade dem för att göra
              ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem
              århundraden.
            </p>
          </div>
        </FlexGrid>
        <div className="container grid">{projectList}</div>
      </Section>
      <Section name="clipout">
        <FlexGrid>
          <div className="flex-fill">
            <div className="image-wrapper">
              <img src="../img/contribute.svg" alt="contact" />
            </div>
          </div>
          <div className="flex-fill">
            <h2>Contact</h2>
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

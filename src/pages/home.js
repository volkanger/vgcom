import React from 'react';
import Layout from '../components/Layout';
import Landing from '../sections/Landing';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Writing from '../sections/Writing';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Videos from '../sections/Videos';

const HomePage = () => (
  <Layout>
    <Videos />
    <Header />
    <About />
    <Footer />
  </Layout>
);

export default HomePage;

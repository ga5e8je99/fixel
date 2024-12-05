import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Router from "next/router";
import "./globals.css";
import Preloader from "@/components/Preloader";

export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);
  return (
    <Layout>
      {loading && <Preloader />}
      <Component {...pageProps} />
    </Layout>
  );
}

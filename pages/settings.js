import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

export default function Settings() {
  return (
    <Layout>
      <div>
        <Link href="/">
          <a>Back</a>
        </Link>
        <div>
          <h1>Preferences</h1>
        </div>
        <style jsx>{``}</style>
      </div>
    </Layout>
  );
}

import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Chat() {
  return (
    <Layout>
      <div>
        <div>
          <Link href="/">
            <a>Back</a>
          </Link>
          <h1>Chat</h1>
        </div>
        <style jsx>{``}</style>
      </div>
    </Layout>
  );
}

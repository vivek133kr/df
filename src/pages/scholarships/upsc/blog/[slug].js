import React from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import BlogDetails from "@/Components/UPSC/BlogDetail/BlogDetail";

function Blog({ post}) {
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <BlogDetails post={post} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let { slug } = params;
  const res = await fetch(`https://upsc.joshtalks.org/api/v1/blogs/${slug}`);
  const post = await res.json();

  // Return the blog post as props
  return {
    props: {
      post: post,
      
    },
  };
}

export default Blog;

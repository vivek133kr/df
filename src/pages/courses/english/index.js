import Image from "next/image";
import Head from "next/head";

import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import HomeFinal from "../../../Components/Skills/Home";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data , featuredData}) {
  const router = useRouter();
  const { page } = router.query;
  const currentPage = parseInt(page, 10) || 1;
  const isHomePage = currentPage === 1;

 useEffect(() => {
   if (data === "No Data") {
     router.push("/nonexistentpage");
   }
 }, [data, router]);

 if (data === "No Data") {
   return null; // Return null to prevent rendering the component before redirecting
 }
  return (
    <div>
      <Head>
        <title>Josh Talks - Skills</title>
        <meta
          name="description"
          content="Discover a world of language and skills at Josh Talks Skills. Explore grammar tips, English language mastery, and a vast collection of insightful blogs. Find the meaning of any word with our comprehensive word search feature. Empower yourself with knowledge and elevate your skills. Join thousands of learners on the leading online platform for language and skill development"
        />
      </Head>
      <main className="">
        <HomeFinal data={data} currentPage={currentPage} publishData={featuredData} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  let newdata;
  const { query } = context;
  const { page } = query;
  const currentPage = parseInt(page, 10) || 1;
 
try {
  const response = await fetch(
    `https://upsc.joshtalks.org/api/v1/blogs/?page_size=${currentPage}`
  );
 
  const featuredRes = await fetch(
    "https://upsc.joshtalks.org/api/v1/blogs/featured"
  );
  const featured = await featuredRes.json();
  
  const data = await response.json();


  if (data && data.detail && data.detail.includes("Invalid")) {
    return {
      props: {
        data: "No Data",
      },
    };
  }

  newdata = featured.results.slice(0,3)


  return {
    props: {
      data: data,
      featuredData: newdata
    },
  };
} catch (error) {
  return {
    props: {
      data: "No Data",
    },
  };
}
}

export async function getServerSidePaths() {
  const response = await fetch("https://upsc.joshtalks.org/api/v1/blogs/");
  const data = await response.json();

  const totalPages = Math.ceil(data.count / 10);

  const paths = Array.from({ length: totalPages }, (_, index) => ({
    params: { page: (index + 1).toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

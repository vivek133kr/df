import Image from "next/image";
import Head from "next/head";

import { Inter } from "next/font/google";
import WordSearch from "@/Components/Skills/WordSearch/WordSearch";

const inter = Inter({ subsets: ["latin"] });

export default function WordMeaning() {
  return (
    <div>
      <Head>
        <title>Dictionary</title>
        <meta
          name="description"
          content="Discover the world of words and their meanings with our intuitive word search feature at Josh Talks Skills. Explore our vast collection of words, starting from A to Z, and find instant definitions and insights. Unleash your linguistic curiosity as you effortlessly search for any word and expand your vocabulary. Join us on the leading online platform for language enthusiasts and elevate your word mastery skills today."
        />
      </Head>
      <WordSearch />
    </div>
  );
}

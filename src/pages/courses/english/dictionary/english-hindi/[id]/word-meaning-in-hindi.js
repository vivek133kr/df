import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";
import WordDetail from "@/Components/Skills/WordSearch/WordDetail";
import Cookies from "js-cookie";
import { parseCookies, destroyCookie } from "nookies";
const inter = Inter({ subsets: ["latin"] });

function WordMeaning({ word }) {
  return (
    <div>
      <Head>
        <title>
          {word
            ? `${
                word.word.charAt(0).toUpperCase() + word.word.slice(1)
              } Definition & Meaning | Joshtalks.com`
            : "Word Not Found"}
        </title>
        <meta
          name="description"
          content={ word ? `${
            word.word.charAt(0).toUpperCase() + word.word.slice(1)
          } meaning in Hindi : Get meaning and translation of ${
            word.word.charAt(0).toUpperCase() + word.word.slice(1)
          } in Hindi language with grammar,antonyms,synonyms and sentence usages by JoshTalks. Know answer of question : what is meaning of ${
            word.word.charAt(0).toUpperCase() + word.word.slice(1)
          } in Hindi? ${
            word.word.charAt(0).toUpperCase() + word.word.slice(1)
          } ka matalab hindi me kya hai (${
            word.word.charAt(0).toUpperCase() + word.word.slice(1)
          } का हिंदी में मतलब ).`:""}
        />
      </Head>
      <WordDetail word={word} />
    </div>
  );
}

// Define the `getServerSideProps` function to fetch the data for the blog post
export async function getServerSideProps({ query, req }) {
  var { id } = query;
  let word = id;
  const cookies = parseCookies({ req });

  const originalWord =
    cookies.customHyphenated == "true" ? word.split("-").join(" ") : word;

  // Clear the customHyphenated value from the session or cookies

  try {
    // Fetch the data for the blog post using the originalWord
    const res = await fetch(
      `https://upsc.joshtalks.org/api/v1/dictionary/${originalWord.toLowerCase()}/`
    );
    const WordDetail = await res.json();

    if (
      (WordDetail.detail && WordDetail.detail.includes("Not")) ||
      Object.keys(WordDetail.meanings).length == 0
    ) {
      return {
        props: {
          word: null,
        },
      };
    } else {
      return {
        props: {
          word: WordDetail,
        },
      };
    }
  } catch (error) {
    // Handle the error appropriately

    return {
      props: {
        word: null,
      },
    };
  }
}

export default WordMeaning;

import { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Character from "../com/Characters";

export default function Home(results) {
  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters);
  console.log(initialState);
  const [search, setSearch] = useState("");
  const toast = (message) => {
    console.log(message);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-red-700 underline">
        Hello world!
      </h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const results = await fetch("/api/search", {
            method: "POST",
            body: search,
          });
          const { characters, error } = await results.json();
          if (error) {
            toast({
              position: "bottom-right",
              title: "Error",
              description: error,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          } else {
            setCharacters(characters);
          }
        }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-400 rounded-lg"
        />
        <button
          className="p-2 border border-gray-400 rounded-lg"
          type="submit"
          onClick={async () => {
            setSearch("");
            setCharacters(initialState.characters);
          }}
        ></button>
      </form>
      <Character characters={characters} />
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
          }
          results {
            name
            id
            location {
              id
              name
            }
            origin {
              id
              name
            }
            episode {
              id
              episode
              air_date
            }
            image
          }
        }
      }
    `,
  });
  return {
    props: {
      characters: data.characters.results,
    },
  };
}

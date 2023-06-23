import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home({ pokemon }) {
  const [input, setInput] = useState("");
  const filteredPokemon = pokemon.filter((item) =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="pokedex app with next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div
          style={{
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <label htmlFor="">Search</label>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Search Pokémon"
            style={{
              padding: "0.5rem 1rem",
            }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            width: "100vw",
            padding: "0 2rem",
            margin: "0 auto",
            placeItems: "center",
          }}
        >
          {filteredPokemon.map((item, index) => {
            return (
              <div key={item.name} className="pokemonBox">
                <Link href={`/pokemon?id=${index + 1}`}>
                  <a className="pokemon">
                    <img
                      className="pokemonImage"
                      src={item.image}
                      alt={item.name}
                    ></img>
                    <p>{item.name.toUpperCase()}</p>
                  </a>
                </Link>

                <style jsx>{`
                  .pokemonBox {
                    background: #ddd;
                    padding: 0 50px;
                    width: 300px;
                  }
                  .pokemon {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 10px;
                  }
                  .pokemonImage {
                    width: 100px;
                  }
                `}</style>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((pokeman, index) => {
      const paddedId = ("00" + (index + 1)).slice(-3);

      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return { ...pokeman, image };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}

import React from "react";
import Layout from "../components/Layout/Layout";
import Link from "next/link";
const Pokemon = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <div>
      <img src={pokemon.image} alt='' />
      <h1>{pokemon.name.toUpperCase()}</h1>
      <p>Weight: {pokemon.weight}</p>
      <p>Height: {pokemon.height}</p>
      <h4>
        Types:{" "}
        {pokemon.types.map((item) => item.type.name.toUpperCase()).join(", ")}
      </h4>
      <div className='home'>
        <Link href='/'>Home</Link>
      </div>
      <style jsx>{`
        .home {
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.4s;
        }
        .home:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Pokemon;
export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await res.json();
    const paddedIndex = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
    pokemon.image = image;
    return {
      props: {
        pokemon,
      },
    };
  } catch (error) {}
}

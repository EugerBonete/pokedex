import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({ pokemon }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta name='description' content='pokedex app with next' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        {pokemon.map((item, index) => {
          return (
            <div key={item.name} className='pokemonBox'>
              <Link href={`/pokemon?id=${index + 1}`}>
                <a className='pokemon'>
                  <img
                    className='pokemonImage'
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

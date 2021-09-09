import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb'; // Importando as Listas de Filmes que vem de Tmdb
import MovieRow from './components/MovieRow' // Importando o MovieRow que seria a Lista de Filmes
import FeaturedMovie from './components/FeaturedMovie'


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando Lista dos Filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Depois que tem a lista, pegamos o filme em destaque
      let originals = list.filter(i => i.slug === 'originals'); // Pegando os Originais da Netflix em Tmdb
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
      
    }

    loadAll();
  }, []);

  return(
    <div className="page">

      {featuredData && 
        <FeaturedMovie item={featuredData} />
      }


      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} /> // Key Item necessário, se não ele da erro // E pegamos os itens do JSON do Tmdb
        ))}
      </section>
    </div>
  );
}

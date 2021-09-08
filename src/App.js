import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb'; // Importando as Listas de Filmes que vem de Tmdb
import MovieRow from './components/MovieRow' // Importando o MovieRow que seria a Lista de Filmes



export default () => {

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando Lista dos Filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);
    }

    loadAll();
  }, []);

  return(
    <div className="page">
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} /> // Key Item necessário, se não ele da erro // E pegamos os itens do JSON do Tmdb
        ))}
      </section>
    </div>
  );
}

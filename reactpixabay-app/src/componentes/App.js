import React, { useState, useEffect } from 'react';
import Buscador from './Buscador';
import ListadoImagenes from './ListadoImagenes';
import Imagen from './Imagen';
import './../css/App.css';

function App() {

  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState([]);

  // useEffect --> componentDidUpdate
  useEffect(() => {
    // *** Consultar API ***
    const consultarApi = async () => {

      if (busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '12688760-75a09efac77599a8b4bef78b4';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;
      
      const respuesta = await fetch(url);
      console.log(respuesta);
      
      const resultado = await respuesta.json();
      console.log(resultado);
      // Guardando imagenes en el state
      guardarImagenes(resultado.hits);
    }

    consultarApi();

  }, [busqueda]);

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        {/* ***** Componente: Buscador ***** */}
        <Buscador
                  guardarBusqueda={guardarBusqueda}
        ></Buscador>
      </div>
      <div className="row justify-content-center">
        {/* ***** Componente: ListadoImagenes ***** */}
        <ListadoImagenes
                          imagenes={imagenes}
        ></ListadoImagenes>
      </div>
      {/* ***** Componente: Imagen ***** */}
      <Imagen></Imagen>
    </div>
  );
}

export default App;
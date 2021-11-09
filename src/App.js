import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Listagem from "./components/Listagem";
import Titulo from "./components/Titulo";
import { db } from "./conectadb";
import { collection, getDocs } from "firebase/firestore/lite";

const App = () => {
  const [filmes, setFilmes] = useState([]);

  // Get a list of cities from your database
  const getFilmes = async (db) => {
    const filmesCol = collection(db, "filmes");
    const filmeSnapshot = await getDocs(filmesCol);
    const filmeList = filmeSnapshot.docs.map((doc) => {
      const id = doc.id;
      const dados = doc.data();
      return { id, ...dados };
    });
    console.log(filmeList);
    setFilmes(filmeList);
  };

  useEffect(() => {
    getFilmes(db);
  }, []);

  return (
    <>
      <Titulo />
      <Formulario filmes={filmes} setFilmes={setFilmes} />
      <Listagem filmes={filmes} setFilmes={setFilmes} />
    </>
  );
};

export default App;

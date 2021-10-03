import React, { useEffect } from "react";
import { db } from "../conectadb";
import { collection, getDocs } from "firebase/firestore/lite";

const Listagem = () => {
  // Get a list of cities from your database
  const getFilmes = async (db) => {
    const filmesCol = collection(db, "filmes");
    const filmeSnapshot = await getDocs(filmesCol);
    const filmeList = filmeSnapshot.docs.map((doc) => doc.data());
    console.log(filmeList);
  };

  useEffect(() => {
    getFilmes(db);
  }, []);

  return <h2>Lista de Filmes</h2>;
};

export default Listagem;

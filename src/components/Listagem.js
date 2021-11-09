import React from "react";
import { doc, deleteDoc } from "firebase/firestore/lite";
import { db } from "../conectadb";
import "./Listagem.css";

const Listagem = ({ filmes, setFilmes }) => {
  const excluiFilme = async (id, titulo) => {
    if (window.confirm(`Confirma a exclusão do filme "${titulo}"?`)) {
      // exclui o filme do banco de dados (Firestore)
      await deleteDoc(doc(db, "filmes", id));

      // retirar o filme da Listagem 
      const filmes2 = filmes.filter((filme) => filme.id !== id);
      setFilmes(filmes2);
    }
  };

  return (
    <div className="container-fluid">
      {filmes.map((filme) => (
        <div className="card" key={filme.id}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h4 className="card-title">{filme.titulo}</h4>
              <i
                className="far fa-trash-alt text-primary"
                onClick={() => excluiFilme(filme.id, filme.titulo)}
              ></i>
            </div>
            <p className="card-text">{filme.sinopse}</p>
            <a
              href={filme.link}
              className="card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Trailer
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listagem;

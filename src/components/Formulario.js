import React from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore/lite";
import { db } from "../conectadb";

const Formulario = ({filmes, setFilmes}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const onSubmit = async (data) => {
    //alert(JSON.stringify(data));

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "filmes"), data);
    alert("Filme Cadastrado com Sucesso! ID: " + docRef.id);

    // acrescenta o novo filme na lista de filmes (a partir do setFilmes)
    // para atualizar a Listagem
    data.id = docRef.id;
    const filmes2 = [...filmes, data];
    setFilmes(filmes2);

    // limpa os campos de formulário
    setValue("titulo", "");
    setValue("link", "");
    setValue("sinopse", "");
  }; // your form submit function which will invoke after successful validation

  return (
    <form className="card card-body" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group mb-1">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fas fa-film text-primary py-1"></i>
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Título do Filme"
          {...register("titulo", {
            required: true,
            minLength: 3,
          })}
        />
      </div>

      <div className="input-group mb-1">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fab fa-youtube-square text-primary py-1"></i>
          </span>
        </div>
        <input
          type="url"
          className="form-control"
          placeholder="Link do Trailer"
          {...register("link", {
            required: true,
            minLength: 10,
          })}
        />
      </div>

      <div className="input-group mb-1">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="far fa-comments text-primary py-3"></i>
          </span>
        </div>
        <textarea
          rows="2"
          className="form-control"
          placeholder="Sinopse do filme"
          {...register("sinopse", {
            required: true,
            minLength: 10,
          })}
        ></textarea>
      </div>

      <input
        type="submit"
        value="Cadastrar"
        className="btn btn-success btn-block"
      />

      <div
        className={
          (errors.titulo || errors.link || errors.sinopse) &&
          "alert alert-danger mt-1"
        }
      >
        {errors.titulo && (
          <span>Título deve ser preenchido corretamente; </span>
        )}
        {errors.link && <span>Informe o link do trailer do filme; </span>}
        {errors.sinopse && <span>Preencha a Sinopse do Filme</span>}
      </div>
    </form>
  );
};

export default Formulario;

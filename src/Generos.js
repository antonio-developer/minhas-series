import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Generos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('api/genres').then((response) => {
      setData(response.data.data);
    });
  }, []);

  const deleteGenero = (id) => {
    axios.delete(`api/genres/${id}`).then((response) => {
      setData(data.filter((item) => item.id !== id));
    });
  };

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Gêneros</h1>
        <Link to={'/generos/novo'} className='btn btn-primary'>
          Novo Gênero
        </Link>
        <div className='alert alert-warning' role='alert'>
          Você não possui gêneros criados.
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Gêneros</h1>
      <Link to={'/generos/novo'} className='btn btn-primary'>
        Novo Gênero
      </Link>
      <table className='table table-dark'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Nome</th>
            <th scope='col'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data.id}>
              <th scope='row'>{data.id}</th>
              <td>{data.name}</td>
              <td>
                <button className='btn btn-danger' onClick={() => deleteGenero(data.id)}>
                  Remover
                </button>
                <Link to={`/generos/${data.id}`} className='btn btn-warning'>
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

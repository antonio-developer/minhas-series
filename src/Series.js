import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Series = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('api/series').then((response) => {
      setData(response.data.data);
    });
  }, []);

  const deleteSerie = (id) => {
    axios.delete(`api/series/${id}`).then((response) => {
      setData(data.filter((item) => item.id !== id));
    });
  };

  if (data.length === 0) {
    return (
      <div className='container'>
        <h1>Séries</h1>
        <Link to={'/series/nova'} className='btn btn-primary'>
          Nova Série
        </Link>
        <div className='alert alert-warning' role='alert'>
          Você não possui séries criadas.
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Séries</h1>
      <Link to={'/series/nova'} className='btn btn-primary'>
        Nova Série
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
                <button className='btn btn-danger' onClick={() => deleteSerie(data.id)}>
                  Remover
                </button>
                <Link to={`/series/${data.id}`} className='btn btn-warning'>
                  Info
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

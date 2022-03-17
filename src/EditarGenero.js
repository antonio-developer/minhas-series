import axios from 'axios';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export const EditarGenero = ({ match }) => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get(`/api/genres/${match.params.id}`).then((response) => {
      setName(response.data.name);
    });
  }, [match.params.id]);

  const onChange = (event) => {
    setName(event.target.value);
  };

  const save = () => {
    axios
      .put(`/api/genres/${match.params.id}`, {
        name,
      })
      .then((res) => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to='/generos' />;
  }

  return (
    <div className='container'>
      <h1>Editar Gênero</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Nome</label>
          <input
            type='text'
            value={name}
            onChange={onChange}
            className='form-control'
            id='name'
            placeholder='Nome do Gênero'
          />
        </div>
        <button className='btn btn-primary' type='button' onClick={save}>
          Atualizar
        </button>
      </form>
    </div>
  );
};

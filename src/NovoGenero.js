import axios from 'axios';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

export const NovoGenero = () => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const onChange = (event) => {
    setName(event.target.value);
  };

  const save = () => {
    axios
      .post('/api/genres', {
        name,
      })
      .then((res) => {
        setSuccess(true);
      });
  };

  if(success) {
    return <Redirect to='/generos' />
  }

  return (
    <div className='container'>
      <h1>Novo Gênero</h1>
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
          Salvar
        </button>
      </form>
    </div>
  );
};

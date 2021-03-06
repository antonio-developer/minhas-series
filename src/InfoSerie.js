import axios from 'axios';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

export const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({ name: '' });
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState('INFO');
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState('');

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`/api/series/${match.params.id}`).then((response) => {
      setData(response.data);
      setForm(response.data);
    });
  }, [match.params.id]);

  useEffect(() => {
    axios.get('/api/genres').then((response) => {
      setGenres(response.data.data);
      const genres = response.data.data;
      const encontrado = genres.find((value) => data.genre === value.name);
      if (encontrado) {
        setGenreId(encontrado.id);
      }
    });
  }, [data]);

  // custom header
  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url(${data.background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const onChangeGenre = (event) => {
    setGenreId(event.target.value);
  };

  const onChange = (field) => (event) => {
    setForm({
      ...form,
      [field]: event.target.value,
    });
  };

  const seleciona = (value) => () => {
    setForm({
      ...form,
      status: value,
    });
  };

  const save = () => {
    axios
      .put(`/api/series/${match.params.id}`, {
        ...form,
        genre_id: genreId,
      })
      .then((res) => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to='/series' />;
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{ background: 'rgba(0,0,0,0.7' }}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img src={data.poster} alt={data.name} className='img-fluid img-thumbnail' />
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  {data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                  {data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge>}
                  G??nero: {data.genre_name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='container'>
        <button onClick={() => setMode('EDIT')} className='btn btn-primary mr-2'>
          Editar
        </button>
      </div>

      {mode === 'EDIT' && (
        <div className='container'>
          <h1>Editar s??rie</h1>
          <button onClick={() => setMode('INFO')} className='btn btn-primary'>
            Cancelar edi????o
          </button>
          <form>
            <div className='form-group'>
              <label htmlFor='name'>Nome</label>
              <input
                type='text'
                value={form.name}
                onChange={onChange('name')}
                className='form-control'
                id='name'
                placeholder='Nome da S??rie'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Coment??rios</label>
              <input
                type='text'
                value={form.comments}
                onChange={onChange('comments')}
                className='form-control'
                id='name'
                placeholder='Nome da S??rie'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>G??nero</label>
              <select className='form-control' onChange={onChangeGenre} value={genreId}>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='status'
                id='assistido'
                value='ASSISTIDO'
                onChange={seleciona('ASSISTIDO')}
                checked={form.status === 'ASSISTIDO'}
              />
              <label className='form-check-label' htmlFor='assistido'>
                Assistido
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='status'
                id='paraAssistir'
                value='PARA_ASSISTIR'
                onChange={seleciona('PARA_ASSISTIR')}
                checked={form.status === 'PARA_ASSISTIR'}
              />
              <label className='form-check-label' htmlFor='paraAssistir'>
                Para assistir
              </label>
            </div>
            <button className='btn btn-primary' type='button' onClick={save}>
              Salvar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

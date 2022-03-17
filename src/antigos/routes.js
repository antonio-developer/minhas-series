import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../Home';

const Generos = () => <h1>Generos</h1>;

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/generos' element={<Generos />} />
      </Routes>
    </BrowserRouter>
  );
}

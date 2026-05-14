import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router';

import Otsikko from './components/Otsikko';
import Treenilista from './sivut/Treenilista';
import UusiTreeni from './sivut/UusiTreeni';
import MuokkaaTreenia from './sivut/MuokkaaTreenia';
import PoistaTreeni from './sivut/PoistaTreeni';

import type { Treeni } from './types';

function App() {
  const [treenit, setTreenit] = useState<Treeni[]>(() => {
  const tallennetutTreenit = localStorage.getItem("treenit");

  if (tallennetutTreenit) {
    return JSON.parse(tallennetutTreenit);
  }

  return [];
});

useEffect(() => {
  localStorage.setItem("treenit", JSON.stringify(treenit));
}, [treenit]);

  return (
    <BrowserRouter>
      <Container maxWidth="md">
        <Otsikko />

        <Routes>
          <Route
            path="/"
            element={<Treenilista treenit={treenit} />}
          />

          <Route
            path="/uusi"
            element={<UusiTreeni treenit={treenit} setTreenit={setTreenit} />}
          />

          <Route
            path="/muokkaa/:id"
            element={<MuokkaaTreenia treenit={treenit} setTreenit={setTreenit} />}
          />

          <Route
            path="/poista/:id"
            element={<PoistaTreeni treenit={treenit} setTreenit={setTreenit} />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

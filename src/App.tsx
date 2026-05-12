import { useState, useRef, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { Container, CssBaseline } from '@mui/material';
import Otsikko from './components/Otsikko';
import PoistaHavainto from './components/PoistaHavainto';
import Havaintolista from './components/Havaintolista';
import UusiHavainto from './components/UusiHavainto';
import MuokkaaHavaintoa from './components/MuokkaaHavaintoa';


function App() {

  const kaynnistetty = useRef(false);
  const [havainnot, setHavainnot] = useState<Havainto[]>([]);

  // Ensimmäisen kerran käynnistys
  useEffect(() => {

    if (!kaynnistetty.current) {

      if (localStorage.getItem("havaintolista")) {

        setHavainnot(JSON.parse(String(localStorage.getItem("havaintolista"))).map((havainto: Havainto) => {
          return {
            ...havainto
          }
        }));
      }
    }

    return () => {
      kaynnistetty.current = true;
    }
  }, []);

  // Havaintolistan päivittyessä lähetetään uudet tiedot selaimen paikalliseen muistiin
  useEffect(() => {

    localStorage.setItem("havaintolista", JSON.stringify(havainnot));
  }, [havainnot])

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">

        <Otsikko>Lintuhavainnot</Otsikko>

        <Routes>
          <Route
            path="/poista/:id"
            element={<PoistaHavainto havainnot={havainnot} setHavainnot={setHavainnot} />}
          />
          <Route
            path="/muokkaa/:id"
            element={<MuokkaaHavaintoa havainnot={havainnot} setHavainnot={setHavainnot} />}
          />
          <Route
            path="/uusi"
            element={<UusiHavainto havainnot={havainnot} setHavainnot={setHavainnot} />}
          />
          <Route
            path="/"
            element={<Havaintolista havainnot={havainnot} setHavainnot={setHavainnot} />}
          />
        </Routes>

      </Container>
    </>
  );
}

export default App;

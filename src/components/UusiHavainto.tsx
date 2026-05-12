// React import
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
// MUI import
import { Button, TextField } from "@mui/material";
// Custom import
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Otsikko from "./Otsikko";

interface Props {
  havainnot: Havainto[];
  setHavainnot: (havainnot: Havainto[]) => void;
}

function UusiHavainto({ havainnot, setHavainnot }: Props) {
  
  const navigate = useNavigate();

  const uusiPaikkaRef = useRef<HTMLInputElement>(null);
  const uusiNimiRef = useRef<HTMLInputElement>(null);
  const [aika, setAika] = useState<Dayjs | null>(dayjs());
  const uusiAika = aika?.toISOString();
  
  const [havID, setHavID] = useState<number>(() => {
    const tallennettu = localStorage.getItem("viimeisin_id");
    return tallennettu ? parseInt(tallennettu, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("viimeisin_id", havID.toString())
  }, [havID]);
        
  const lisaaHavainto = () => {
    const uusiIDNumero = havID + 1;

    const uusiHavainto: Havainto = {
      id: crypto.randomUUID(),
      paikka: uusiPaikkaRef.current?.value || "Nimetön havainto",
      nimi: uusiNimiRef.current?.value || "Nimetön havainto",
      aika: uusiAika || "Havaintoaika puuttuu",
      lintuID : "ID: " + String(uusiIDNumero),
    };

    setHavainnot([...havainnot, uusiHavainto]);
    setHavID(uusiIDNumero);
    navigate("/");
  };  
  

  return (
    <>
      <Otsikko tyyli="pieni">Lisää uusi havainto</Otsikko>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <DateTimePicker
        label="Valitse päivä ja aika"
        value={aika}
        onChange={(uusiAika) => setAika(uusiAika)}
        ampm={false}
        minutesStep={1}
        sx={{ marginBottom: "10px" }}
      />

    </LocalizationProvider>
    
    <TextField
        label="Havaintopaikka"
        inputRef={uusiPaikkaRef}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "10px" }}
      />

      <TextField
        label="Linnun nimi"
        inputRef={uusiNimiRef}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "10px" }}
      />

      <Button variant="contained" fullWidth onClick={lisaaHavainto}>
        Tallenna
      </Button>

      <Button fullWidth component={Link} to="/">
        Peruuta
      </Button>
    </>
  );

}
export default UusiHavainto;

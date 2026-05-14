// React import
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
// MUI import
import { Button, TextField, Typography } from "@mui/material";
// Custom import
import type { Treeni } from '../types';
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";


interface Props {
  treenit: Treeni[];
  setTreenit: (treenit: Treeni[]) => void;
}

function UusiTreeni({ treenit, setTreenit }: Props) {
  
  const navigate = useNavigate();

  const uusiLajiRef = useRef<HTMLInputElement>(null);
  const uusiKuvausRef = useRef<HTMLInputElement>(null);
  const [aika, setAika] = useState<Dayjs | null>(dayjs());
  const uusiAika = aika?.toISOString();
  const uusiKestoRef = useRef<HTMLInputElement>(null);

   
        
  const lisaaTreeni = () => {
    
    const uusiTreeni: Treeni = {
      id: crypto.randomUUID(),
      laji: uusiLajiRef.current?.value || "Laji puuttuu",
      pvm: uusiAika || "Treeniaika puuttuu",
      kesto: Number(uusiKestoRef.current?.value) || 0,
      kuvaus: uusiKuvausRef.current?.value || "Treenikuvaus puuttuu",
      
    };

    setTreenit([...treenit, uusiTreeni]);    
    navigate("/");
  };  
  

return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <>
      <Typography>Lisää uusi treeni</Typography>

      <TextField
        label="Laji"
        inputRef={uusiLajiRef}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "10px" }}
      />

      <DateTimePicker
        label="Valitse päivä ja aika"
        value={aika}
        onChange={(uusiAika) => setAika(uusiAika)}
        ampm={false}
        minutesStep={1}
        sx={{ marginBottom: "10px" }}
      />

      <TextField
        label="Kesto minuutteina"
        inputRef={uusiKestoRef}
        type="number"
        fullWidth
        sx={{ marginBottom: "10px" }}
      />

      <TextField
        label="Kuvaus"
        inputRef={uusiKuvausRef}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "10px" }}
      />

      <Button variant="contained" fullWidth onClick={lisaaTreeni}>
        Tallenna
      </Button>

      <Button fullWidth component={Link} to="/">
        Peruuta
      </Button>
    </>
  </LocalizationProvider>
);

}
export default UusiTreeni;

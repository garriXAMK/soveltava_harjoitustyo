
// React import
import {useState, useRef} from 'react';
import { Link, useNavigate, useParams } from "react-router";
// MUI import
import { Button, TextField, Typography} from "@mui/material";
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

function MuokkaaTreenia ({treenit, setTreenit }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const muokattavaTreeni: Treeni | undefined = treenit.find(
    (treeni: Treeni) => {return treeni.id === id;
    });

 
  const uusiLajiRef = useRef<HTMLInputElement>(null);
    const uusiKuvausRef = useRef<HTMLInputElement>(null);
    const [aika, setAika] = useState<Dayjs | null>(
      muokattavaTreeni ? dayjs(muokattavaTreeni.pvm) : dayjs()
      );
    const uusiKestoRef = useRef<HTMLInputElement>(null);

  const tallennaMuutos = () => {
  const muokatutTreenit: Treeni[] = treenit.map((treeni: Treeni) => {
    if (treeni.id === id) {
      return {
        ...treeni,
        laji: uusiLajiRef.current?.value || treeni.laji,
        pvm: aika?.toISOString() || treeni.pvm,
        kesto: uusiKestoRef.current?.value
          ? Number(uusiKestoRef.current.value)
          : treeni.kesto,
        kuvaus: uusiKuvausRef.current?.value || treeni.kuvaus,
      };
    }

    return treeni;
  });

  setTreenit(muokatutTreenit);
  navigate("/");
};

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <>
      <Typography>muokkaa treeniä</Typography>        
            
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
/>

      
      <TextField
        label="Kuvaus"
        inputRef={uusiKuvausRef}
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "10px" }}
      />
            
      <Button variant="contained" fullWidth onClick={tallennaMuutos}>
        tallenna muutokset
      </Button>

      <Button fullWidth component={Link} to="/">
        Peruuta
      </Button>
    </>
    </LocalizationProvider>
  );
  
}

export default MuokkaaTreenia;

// React import
import {useState, useRef} from 'react';
import { Link, useNavigate, useParams } from "react-router";
// MUI import
import { Button, TextField} from "@mui/material";
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

function MuokkaaHavaintoa({ havainnot, setHavainnot }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const muokattavaHavainto: Havainto | undefined = havainnot.find(
    (havainto: Havainto) => {return havainto.id === id;
    });

  let lintu = muokattavaHavainto!.lintuID;

  const [aika, setAika] = useState<Dayjs | null>(
  muokattavaHavainto ? dayjs(muokattavaHavainto.aika) : dayjs()
);
  const uusiPaikkaRef = useRef<HTMLInputElement>(null);
  const uusiNimiRef = useRef<HTMLInputElement>(null);
  
  const tallennaMuutos = () => {
    const muokattuHavainto: Havainto[] = havainnot.map((havainto: Havainto) => {
      if (havainto.id === id) {
        return {
          ...havainto,
          paikka: uusiPaikkaRef.current?.value || havainto.paikka,
          nimi: uusiNimiRef.current?.value || havainto.nimi,
          aika: aika?.toISOString() || havainto.aika,
        }
      }
      return havainto;
    })    
    setHavainnot(muokattuHavainto);    
    navigate("/");
  };

  return (
    <>
      <Otsikko tyyli="pieni">muokkaa havaintoa {lintu}</Otsikko>

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
              defaultValue={muokattavaHavainto?.paikka}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "10px" }}
            />
      
            <TextField
              label="Linnun nimi"
              inputRef={uusiNimiRef}
              defaultValue={muokattavaHavainto?.nimi}
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
  );
}

export default MuokkaaHavaintoa;
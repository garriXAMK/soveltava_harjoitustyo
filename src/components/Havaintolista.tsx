// React import

import { Link } from "react-router";
// MUI imports
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,  
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
// Custom imports
import Otsikko from "./Otsikko";

interface Props {
  havainnot: Havainto[];
  setHavainnot: (havainnot: Havainto[]) => void;
}

function Havaintolista({havainnot}: Props) {  
  let listaCopy = [...havainnot].sort((a, b) => dayjs(b.aika).valueOf() - dayjs(a.aika).valueOf());

   return (
    <>
      <Button variant="contained" fullWidth component={Link} to="/uusi">
        Lisää uusi havainto
      </Button>

      <Otsikko tyyli="pieni">Havaintolista</Otsikko>

      <List>
        {listaCopy.map((hav: Havainto, idx: number) => (
          <ListItem key={idx}>
            <Button sx={{ marginRight: "10px" }} component={Link} to={`/muokkaa/${hav.id}`} >Muokkaa</Button> 
            <ListItemText primary={hav.lintuID}sx={{ width: "2%", marginLeft: "10px"}}/>
            <ListItemText primary={hav.paikka} sx={{ width: "5%", marginLeft: "10px" }}/>
            <ListItemText primary={hav.nimi} sx={{ width: "5%", marginLeft: "10px" }}/>
            <ListItemText primary={dayjs(hav.aika).format('DD.MM.YYYY HH:mm')} sx={{ width: "5%", marginLeft: "10px" }}/>
            <ListItemIcon>
              <IconButton component={Link} to={`/poista/${hav.id}`} edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default Havaintolista;

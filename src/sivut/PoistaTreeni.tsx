// React import
import { Link, useNavigate, useParams } from "react-router";
// MUI import
import { Button, Typography } from "@mui/material";
// Custom import
import type { Treeni } from '../types';


interface Props {
  treenit: Treeni[];
  setTreenit: (treenit: Treeni[]) => void;
}

function PoistaTreeni({ treenit, setTreenit }: Props) {
  const navigate = useNavigate();

  const { id } = useParams();
  const vahvistaPoisto = () => {
    setTreenit(treenit.filter((treeni: Treeni) => treeni.id !== id));

    navigate("/");
  };

  return (
    <>
      <Typography>Poista treeni</Typography>

      <Typography sx={{ marginBottom: "20px" }}>
        Haluatko varmasti poistaa treenin?
      </Typography>

      <Button variant="contained" fullWidth onClick={vahvistaPoisto}>
        Poista treeni
      </Button>

      <Button fullWidth component={Link} to="/">
        Peruuta
      </Button>
    </>
  );
}

export default PoistaTreeni;

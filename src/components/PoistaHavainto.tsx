// React import
import { Link, useNavigate, useParams } from "react-router";
// MUI import
import { Button, Typography } from "@mui/material";
// Custom import
import Otsikko from "./Otsikko";

interface Props {
  havainnot: Havainto[];
  setHavainnot: (havainnot: Havainto[]) => void;
}

function PoistaHavainto({ havainnot, setHavainnot }: Props) {
  const navigate = useNavigate();

  const { id } = useParams();

  const poistettavaHavainto: Havainto | undefined = havainnot.find(
    (havainto: Havainto) => {
      return havainto.id === id;
    },
  );

  const vahvistaPoisto = () => {
    setHavainnot(havainnot.filter((havainto: Havainto) => havainto.id !== id));

    navigate("/");
  };

  return (
    <>
      <Otsikko tyyli="pieni">Poista havainto</Otsikko>

      <Typography sx={{ marginBottom: "20px" }}>
        Haluatko varmasti poistaa havainnon "{poistettavaHavainto!.lintuID}"?
      </Typography>

      <Button variant="contained" fullWidth onClick={vahvistaPoisto}>
        Poista havainto
      </Button>

      <Button fullWidth component={Link} to="/">
        Peruuta
      </Button>
    </>
  );
}

export default PoistaHavainto;

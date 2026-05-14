import { Link } from "react-router";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import dayjs from "dayjs";
import type { Treeni } from "../types";


interface Props {
  treenit: Treeni[];
}

function Treenilista({ treenit }: Props) {
  const listaCopy = [...treenit].sort(
    (a, b) => dayjs(b.pvm).valueOf() - dayjs(a.pvm).valueOf()
  );

  return (
    <>      

      <Button
        variant="contained"
        fullWidth
        component={Link}
        to="/uusi"
        sx={{ mb: 3, boxShadow: "1px 2px #888888"}}
        
      >
        Lisää uusi treeni
      </Button>

      {listaCopy.length === 0 ? (
        <Typography>Ei tallennettuja treenejä.</Typography>
      ) : (
        <Grid container spacing={2}>
          {listaCopy.map((treeni: Treeni) => (
            <Grid size={{ xs: 12, sm: 6 }} key={treeni.id}>
              <Card variant="outlined" sx={{boxShadow: "1px 1px #888888"}}>
                <CardContent sx={{backgroundColor: "#7cb9f3"}}>
                  <Typography variant="h6" component="h3">
                    {treeni.laji}
                  </Typography>

                  <Typography color="text.secondary">
                    {dayjs(treeni.pvm).format("DD.MM.YYYY HH:mm")}
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    Kesto: {treeni.kesto} min
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    {treeni.kuvaus}
                  </Typography>
                </CardContent>

                <CardActions sx={{backgroundColor: "#c2def5"}}>
                  <Button
                    size="small"
                    component={Link}
                    to={`/muokkaa/${treeni.id}`}
                  >Muokkaa
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    component={Link}
                    to={`/poista/${treeni.id}`}
                  >
                    Poista
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Treenilista;

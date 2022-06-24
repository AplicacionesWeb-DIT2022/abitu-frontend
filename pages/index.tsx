import type { NextPage } from 'next'
import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Academia Online
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function truncateString(descripcion: string) {
  if (descripcion.length > 100) {
    return descripcion.substring(0, 100) + '...';
  } else {
    return descripcion;
  }
}

function parsePrice(price: string) {
  if (price) {
    const formatedPrice = parseInt(price).toLocaleString('es-AR');
    return `$${formatedPrice}`;
  } else {
    return '$';
  }
}

interface Props {
  cursos: Curso[];
}

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

const Home: NextPage<Props> = ({cursos}) => {
  return (
    <>
      <div>
        <Head>
          <title>Academia Online</title>
        </Head>
      </div>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1}}>
            Academia Online
          </Typography>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Ingresar
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
        >
          Explorá nuestros cursos
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {cursos.map((curso) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={curso.id}
              xs={12}
              md={4}
            >
              <Card>
                <CardHeader
                  title={curso.nombre}
                  subheader={curso.categoria?.nombre || ''}
                  titleTypographyProps={{ align: 'center', color: '#007FFF' }}
                  action={<InfoIcon />}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: '#E0E3E7',
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      {parsePrice(curso.precio)}
                    </Typography>
                  </Box>
                  <Typography sx={{marginBottom: 3}}>
                    {truncateString(curso.descripcion)}
                  </Typography>
                  <ul>
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={curso.duracion}
                    >
                      Duracion: {curso.duracion}
                    </Typography>
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={curso.dificultad}
                    >
                      Dificultad: {curso.dificultad}
                    </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="outlined"
                  >
                    Inscribirme
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
        >
          Educación online que funciona
        </Typography>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </>
  )
}

export async function getStaticProps() {
  var requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow'
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/cursos`, requestOptions);
  const cursos = (await response.json()) as Curso[];
  return {
    props: {
      cursos: cursos
    }
  }
}

export default Home

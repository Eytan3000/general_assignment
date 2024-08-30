import { useNavigate } from '@tanstack/react-router';
import { Box, Button, Divider, Typography } from '@mui/joy';
import CreateForm from './screens/form/CreateForm';


const mainTitle = 'Recipes!';
const secondaryTitle = 'One platform to rule them all.';
const showAll = 'Show all recipes';
const create = 'Create new Recipe';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        height="65dvh"
        marginTop="30%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center">
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          flexDirection={'column'}>
          <Typography level="h1">{mainTitle}</Typography>
          <Typography level="body-md">{secondaryTitle}</Typography>
        </Box>

        <Divider sx={{ my: 6 }} />

        <Box
          mb={6}
          display="flex"
          alignItems="center"
          flexDirection={'column'}
          gap={2}>
          <Button onClick={() => navigate({ to: '/AllRecipes' })}>
            {showAll}
          </Button>
        </Box>
        <Typography level="h4" style={{ margin: 0 }}>
          {create}
        </Typography>
        <CreateForm />
      </Box>
    </>
  );
}

export default Home;

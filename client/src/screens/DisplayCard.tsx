import { Button, Card, Typography } from '@mui/joy';
import { RecipeDataWithID } from '../types';
import { Dispatch, SetStateAction } from 'react';

export default function DisplayCard({
    data,
    setEditingData,
    setOpen,
    handleDelete
}:
{
    data:RecipeDataWithID;
    setEditingData:Dispatch<SetStateAction<RecipeDataWithID>>;
    setOpen:Dispatch<SetStateAction<boolean>>,
    handleDelete: (id:number)=>void;
}) {
  return (
    <Card sx={{ p: 5, minWidth: '400px' }} key={data.id}>
      <Typography level="h4">{data.title}</Typography>
      <Typography level="body-md">Ingredients: {data.ingredients}</Typography>
      <Typography level="body-sm">Steps: {data.steps}</Typography>

      <Button
        variant="plain"
        onClick={() => {
          setEditingData({
            id: data.id,
            title: data.title,
            ingredients: data.ingredients,
            steps: data.steps,
          });
          setOpen(true);
        }}>
        Edit
      </Button>
      <Button
        onClick={() => handleDelete(data.id)}
        variant="plain"
        color="danger">
        delete
      </Button>
    </Card>
  );
}

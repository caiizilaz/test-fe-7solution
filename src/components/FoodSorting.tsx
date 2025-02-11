import { useState } from 'react';
import { 
  Grid,
  Paper,
  Button,
  Typography,
  Box,
  TextField
} from '@mui/material';

interface Item {
  type: 'Fruit' | 'Vegetable';
  name: string;
}

const initialItems: Item[] = [
  { type: 'Fruit', name: 'Apple' },
  { type: 'Vegetable', name: 'Broccoli' },
  { type: 'Vegetable', name: 'Mushroom' },
  { type: 'Fruit', name: 'Banana' },
  { type: 'Vegetable', name: 'Tomato' },
  { type: 'Fruit', name: 'Orange' },
  { type: 'Fruit', name: 'Mango' },
  { type: 'Fruit', name: 'Pineapple' },
  { type: 'Vegetable', name: 'Cucumber' },
  { type: 'Fruit', name: 'Watermelon' },
  { type: 'Vegetable', name: 'Carrot' },
];

export default function FoodSorting() {
  const [mainList, setMainList] = useState<Item[]>(initialItems);
  const [fruitList, setFruitList] = useState<Item[]>([]);
  const [vegetableList, setVegetableList] = useState<Item[]>([]);
  const [interval, setInterval] = useState<number>(5);

  const moveItemToType = (item: Item) => {
    setMainList(prev => prev.filter(i => i.name !== item.name));
    
    if (item.type === 'Fruit') {
      setFruitList(prev => [...prev, item]);
      setTimeout(() => {
        setFruitList(prev => prev.filter(i => i.name !== item.name));
        setMainList(prev => [...prev, item]);
      }, interval * 1000);
    } else {
      setVegetableList(prev => [...prev, item]);
      setTimeout(() => {
        setVegetableList(prev => prev.filter(i => i.name !== item.name));
        setMainList(prev => [...prev, item]);
      }, interval * 1000);
    }
  };

  const moveBackToMain = (item: Item) => {
    if (item.type === 'Fruit') {
      setFruitList(prev => prev.filter(i => i.name !== item.name));
    } else {
      setVegetableList(prev => prev.filter(i => i.name !== item.name));
    }
    setMainList(prev => [...prev, item]);
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value) || 5;
    setInterval(Math.max(1, Math.min(60, value))); // Limit between 1 and 60 seconds
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <TextField
          type="number"
          label="Return Interval (seconds)"
          value={interval}
          onChange={handleIntervalChange}
          inputProps={{ min: 1, max: 60 }}
          sx={{ width: 200 }}
          helperText="Enter a value between 1 and 60 seconds"
        />
      </Box>

      <Grid container spacing={3}>
        {/* Main List */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3}
            sx={{
              p: 2,
              height: '100%',
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Main List
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {mainList.map((item) => (
                <Button
                  key={item.name}
                  variant="outlined"
                  onClick={() => moveItemToType(item)}
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                  }}
                >
                  {item.name} ({item.type})
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Fruit List */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3}
            sx={{
              p: 2,
              height: '100%',
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'rgba(255, 0, 0, 0.05)',
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Fruits
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {fruitList.map((item) => (
                <Button
                  key={item.name}
                  variant="contained"
                  color="error"
                  onClick={() => moveBackToMain(item)}
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Vegetable List */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3}
            sx={{
              p: 2,
              height: '100%',
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'rgba(0, 255, 0, 0.05)',
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Vegetables
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {vegetableList.map((item) => (
                <Button
                  key={item.name}
                  variant="contained"
                  color="success"
                  onClick={() => moveBackToMain(item)}
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
} 
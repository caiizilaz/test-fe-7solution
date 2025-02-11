import Head from "next/head";
import { Typography } from '@mui/material';
import MainLayout from '../layouts/MainLayout';
import FoodSorting from '../components/FoodSorting';

export default function Home() {
  return (
    <>
      <Head>
        <title>Food Sorting App</title>
        <meta name="description" content="Food sorting application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <MainLayout>
        <Typography variant="h4" component="h1" gutterBottom>
          Food Sorting App
        </Typography>
        <FoodSorting />
      </MainLayout>
    </>
  );
}

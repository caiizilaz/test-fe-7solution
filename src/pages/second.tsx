import Head from "next/head";
import { Typography } from '@mui/material';
import MainLayout from '../layouts/MainLayout';
import UserDataTable from '../components/UserDataTable';

export default function Second() {
  return (
    <>
      <Head>
        <title>User Data Analysis</title>
        <meta name="description" content="User data analysis by department" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <MainLayout>
        <Typography variant="h4" component="h1" gutterBottom>
          User Data Analysis
        </Typography>
        <UserDataTable />
      </MainLayout>
    </>
  );
} 
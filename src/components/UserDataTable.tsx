import { useCallback } from 'react';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { FilterCriteria } from '../types/user';
import { useUserData } from '../hooks/useUserData';
import UserDataFilters from './UserDataFilters';
import UserDataGrid from './UserDataGrid';

export default function UserDataTable() {
  const { loading, error, filteredData, filters, setFilters } = useUserData();

  const handleFilterChange = useCallback((key: keyof FilterCriteria, value: string) => {
    setFilters((prev: FilterCriteria): FilterCriteria => ({
      ...prev,
      [key]: value || undefined,
    }));
  }, [setFilters]);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="400px"
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="400px"
      >
        <Alert 
          severity="error" 
          sx={{ maxWidth: 400 }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  const hasData = Object.keys(filteredData).length > 0;

  return (
    <Box>
      <UserDataFilters filters={filters} onFilterChange={handleFilterChange} />
      {!hasData ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No data matches the current filters
        </Alert>
      ) : (
        <UserDataGrid data={filteredData} />
      )}
    </Box>
  );
} 
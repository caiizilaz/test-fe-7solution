import { memo } from 'react';
import {
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { FilterCriteria } from '../types/user';

interface UserDataFiltersProps {
  filters: FilterCriteria;
  onFilterChange: (key: keyof FilterCriteria, value: string) => void;
}

const UserDataFilters = memo(({ filters, onFilterChange }: UserDataFiltersProps) => {
  const handleGenderChange = (event: SelectChangeEvent) => {
    onFilterChange('gender', event.target.value);
  };

  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: 3, 
        mb: 3,
        backgroundColor: 'background.paper' 
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Department"
            value={filters.department || ''}
            onChange={(e) => onFilterChange('department', e.target.value)}
            size="small"
            placeholder="Filter by department"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              label="Gender"
              value={filters.gender || ''}
              onChange={handleGenderChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Age Range"
            value={filters.ageRange || ''}
            onChange={(e) => onFilterChange('ageRange', e.target.value)}
            size="small"
            placeholder="e.g., 20-30"
            helperText="Enter range like 20-30"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Hair Color"
            value={filters.hairColor || ''}
            onChange={(e) => onFilterChange('hairColor', e.target.value)}
            size="small"
            placeholder="Filter by hair color"
          />
        </Grid>
      </Grid>
    </Paper>
  );
});

UserDataFilters.displayName = 'UserDataFilters';

export default UserDataFilters; 
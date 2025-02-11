import { memo } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { GroupedData } from '../types/user';

interface UserDataGridProps {
  data: GroupedData;
}

const UserDataGrid = memo(({ data }: UserDataGridProps) => {
  if (Object.keys(data).length === 0) {
    return (
      <Typography variant="body1" textAlign="center" py={4}>
        No data matches the current filters
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Department</TableCell>
            <TableCell align="center">Male Count</TableCell>
            <TableCell align="center">Female Count</TableCell>
            <TableCell>Age Range</TableCell>
            <TableCell>Hair Colors</TableCell>
            <TableCell>Address Users</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(data).map(([department, summary]) => (
            <TableRow key={department}>
              <TableCell>{department}</TableCell>
              <TableCell align="center">{summary.male}</TableCell>
              <TableCell align="center">{summary.female}</TableCell>
              <TableCell>{summary.ageRange}</TableCell>
              <TableCell>
                {Object.entries(summary.hair).map(([color, count]) => (
                  <Typography key={color} variant="body2">
                    {color}: {count}
                  </Typography>
                ))}
              </TableCell>
              <TableCell>
                {Object.entries(summary.addressUser).map(([name, postal]) => (
                  <Typography key={name} variant="body2">
                    {name}: {postal}
                  </Typography>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

UserDataGrid.displayName = 'UserDataGrid';

export default UserDataGrid; 
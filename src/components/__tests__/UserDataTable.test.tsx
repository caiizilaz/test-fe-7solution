import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import UserDataTable from '../UserDataTable';
import { transformData, filterData } from '../../utils/transformData';
import { mockUsers } from '../../utils/mockData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock console.error
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('UserDataTable', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  it('renders loading state initially', () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));
    render(<UserDataTable />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state when API fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API Error'));
    render(<UserDataTable />);
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
    });
  });

  it('renders and filters data correctly', async () => {
    mockedAxios.get.mockResolvedValue({ data: { users: mockUsers } });
    render(<UserDataTable />);
    
    // Check initial render
    await waitFor(() => {
      expect(screen.getByText('IT')).toBeInTheDocument();
      const ones = screen.getAllByText('1');
      expect(ones.length).toBeGreaterThan(0);
    });

    // Check filtering
    const input = screen.getByLabelText('Department');
    fireEvent.change(input, { target: { value: 'IT' } });
    expect(screen.getByText('IT')).toBeInTheDocument();
  });
});

describe('Data Transformation', () => {
  describe('transformData', () => {
    const transformed = transformData(mockUsers);

    it('transforms user data correctly', () => {
      expect(transformed.IT).toEqual({
        male: 1,
        female: 1,
        ageRange: '25-30',
        hair: {
          Black: 1,
          Brown: 1
        },
        addressUser: {
          JohnDoe: '12345',
          JaneSmith: '67890'
        }
      });
    });
  });

  describe('filterData', () => {
    const transformed = transformData(mockUsers);

    it('applies filters correctly', () => {
      // Department filter
      expect(filterData(transformed, { department: 'IT' })).toHaveProperty('IT');

      // Gender filter
      const genderFiltered = filterData(transformed, { gender: 'male' });
      expect(genderFiltered.IT.male).toBe(1);

      // Age range filter
      expect(filterData(transformed, { ageRange: '20-30' })).toHaveProperty('IT');

      // Hair color filter
      const hairFiltered = filterData(transformed, { hairColor: 'Black' });
      expect(hairFiltered.IT.hair.Black).toBe(1);
    });
  });
}); 
import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import axios from 'axios';
import { useUserData } from '../useUserData';
import { mockUsers } from '../../utils/mockData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock console.error
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('useUserData', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  describe('Initial State', () => {
    it('starts with loading state', () => {
      mockedAxios.get.mockImplementation(() => new Promise(() => {}));
      const { result } = renderHook(() => useUserData());
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBeNull();
      expect(result.current.transformedData).toEqual({});
      expect(result.current.filteredData).toEqual({});
      expect(result.current.filters).toEqual({});
    });
  });

  describe('Data Fetching', () => {
    it('handles successful data fetch', async () => {
      mockedAxios.get.mockResolvedValue({ data: { users: mockUsers } });
      const { result } = renderHook(() => useUserData());
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.transformedData).toHaveProperty('IT');
        expect(result.current.transformedData).toHaveProperty('HR');
      });
    });

    it('handles API error', async () => {
      mockedAxios.get.mockRejectedValue(new Error('API Error'));
      const { result } = renderHook(() => useUserData());
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('Failed to fetch data');
        expect(result.current.transformedData).toEqual({});
        expect(result.current.filteredData).toEqual({});
      });
    });
  });

  describe('Filtering', () => {
    beforeEach(() => {
      mockedAxios.get.mockResolvedValue({ data: { users: mockUsers } });
    });

    it('filters by department', async () => {
      const { result } = renderHook(() => useUserData());
      await waitFor(() => expect(result.current.loading).toBe(false));

      act(() => {
        result.current.setFilters({ department: 'IT' });
      });

      expect(Object.keys(result.current.filteredData)).toEqual(['IT']);
    });

    it('filters by gender', async () => {
      const { result } = renderHook(() => useUserData());
      await waitFor(() => expect(result.current.loading).toBe(false));

      act(() => {
        result.current.setFilters({ gender: 'male' });
      });

      expect(result.current.filteredData.IT.male).toBe(1);
      expect(result.current.filteredData.HR.male).toBe(1);
    });

    it('filters by age range', async () => {
      const { result } = renderHook(() => useUserData());
      await waitFor(() => expect(result.current.loading).toBe(false));

      act(() => {
        result.current.setFilters({ ageRange: '25-30' });
      });

      expect(result.current.filteredData.IT.ageRange).toBe('25-30');
    });

    it('filters by hair color', async () => {
      const { result } = renderHook(() => useUserData());
      await waitFor(() => expect(result.current.loading).toBe(false));

      act(() => {
        result.current.setFilters({ hairColor: 'Brown' });
      });

      expect(result.current.filteredData.IT.hair.Brown).toBe(1);
      expect(result.current.filteredData.HR.hair.Brown).toBe(1);
    });

    it('combines multiple filters', async () => {
      const { result } = renderHook(() => useUserData());
      await waitFor(() => expect(result.current.loading).toBe(false));

      act(() => {
        result.current.setFilters({
          department: 'IT',
          gender: 'male',
          hairColor: 'Black'
        });
      });

      expect(Object.keys(result.current.filteredData)).toEqual(['IT']);
      expect(result.current.filteredData.IT.male).toBe(1);
      expect(result.current.filteredData.IT.hair.Black).toBe(1);
    });

    it('updates filters incrementally', async () => {
      const { result } = renderHook(() => useUserData());
      await waitFor(() => expect(result.current.loading).toBe(false));

      act(() => {
        result.current.setFilters({ department: 'IT' });
      });
      expect(Object.keys(result.current.filteredData)).toEqual(['IT']);

      act(() => {
        result.current.setFilters({ ...result.current.filters, gender: 'male' });
      });
      expect(result.current.filteredData.IT.male).toBe(1);
    });
  });
}); 
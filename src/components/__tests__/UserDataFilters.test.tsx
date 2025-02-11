import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserDataFilters from '../UserDataFilters';

describe('UserDataFilters', () => {
  const mockOnFilterChange = jest.fn();
  const defaultProps = {
    filters: {},
    onFilterChange: mockOnFilterChange,
  };

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders all filter inputs', () => {
    render(<UserDataFilters {...defaultProps} />);
    expect(screen.getByLabelText('Department')).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Age Range')).toBeInTheDocument();
    expect(screen.getByLabelText('Hair Color')).toBeInTheDocument();
  });

  it('calls onFilterChange with correct values when department filter changes', () => {
    render(<UserDataFilters {...defaultProps} />);
    const input = screen.getByLabelText('Department');
    fireEvent.change(input, { target: { value: 'IT' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith('department', 'IT');
  });

  it('calls onFilterChange with correct values when gender filter changes', () => {
    render(<UserDataFilters {...defaultProps} />);
    const select = screen.getByLabelText(/gender/i);
    fireEvent.mouseDown(select);
    const option = screen.getByText('Male');
    fireEvent.click(option);
    expect(mockOnFilterChange).toHaveBeenCalledWith('gender', 'male');
  });

  it('displays current filter values', () => {
    const filters = {
      department: 'IT',
      gender: 'male',
      ageRange: '20-30',
      hairColor: 'Black',
    };
    render(<UserDataFilters filters={filters} onFilterChange={mockOnFilterChange} />);
    
    expect(screen.getByLabelText('Department')).toHaveValue('IT');
    expect(screen.getByLabelText('Age Range')).toHaveValue('20-30');
    expect(screen.getByLabelText('Hair Color')).toHaveValue('Black');
  });

  it('shows helper text for age range input', () => {
    render(<UserDataFilters {...defaultProps} />);
    expect(screen.getByText('Enter range like 20-30')).toBeInTheDocument();
  });

  it('shows placeholders for all inputs', () => {
    render(<UserDataFilters {...defaultProps} />);
    expect(screen.getByPlaceholderText('Filter by department')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g., 20-30')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Filter by hair color')).toBeInTheDocument();
  });
}); 
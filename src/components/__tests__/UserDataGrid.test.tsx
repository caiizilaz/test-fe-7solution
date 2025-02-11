import React from 'react';
import { render, screen } from '@testing-library/react';
import UserDataGrid from '../UserDataGrid';

const mockData = {
  IT: {
    male: 2,
    female: 1,
    ageRange: '25-35',
    hair: {
      Black: 1,
      Brown: 2
    },
    addressUser: {
      JohnDoe: '12345',
      JaneSmith: '67890'
    }
  },
  HR: {
    male: 1,
    female: 2,
    ageRange: '30-40',
    hair: {
      Blonde: 2,
      Red: 1
    },
    addressUser: {
      BobJohnson: '11111',
      AliceWilliams: '22222'
    }
  }
};

describe('UserDataGrid', () => {
  it('renders empty state message when no data', () => {
    render(<UserDataGrid data={{}} />);
    expect(screen.getByText('No data matches the current filters')).toBeInTheDocument();
  });

  it('renders table headers correctly', () => {
    render(<UserDataGrid data={mockData} />);
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Male Count')).toBeInTheDocument();
    expect(screen.getByText('Female Count')).toBeInTheDocument();
    expect(screen.getByText('Age Range')).toBeInTheDocument();
    expect(screen.getByText('Hair Colors')).toBeInTheDocument();
    expect(screen.getByText('Address Users')).toBeInTheDocument();
  });

  it('renders department data correctly', () => {
    render(<UserDataGrid data={mockData} />);
    expect(screen.getByText('IT')).toBeInTheDocument();
    expect(screen.getByText('HR')).toBeInTheDocument();
  });

  it('renders counts correctly', () => {
    render(<UserDataGrid data={mockData} />);
    const maleCounts = screen.getAllByText('2');
    const femaleCounts = screen.getAllByText('1');
    expect(maleCounts).toHaveLength(2); // One for IT male count and one for hair color count
    expect(femaleCounts).toHaveLength(2); // One for IT female count and one for hair color count
  });

  it('renders hair colors correctly', () => {
    render(<UserDataGrid data={mockData} />);
    expect(screen.getByText('Black: 1')).toBeInTheDocument();
    expect(screen.getByText('Brown: 2')).toBeInTheDocument();
    expect(screen.getByText('Blonde: 2')).toBeInTheDocument();
    expect(screen.getByText('Red: 1')).toBeInTheDocument();
  });

  it('renders address users correctly', () => {
    render(<UserDataGrid data={mockData} />);
    expect(screen.getByText('JohnDoe: 12345')).toBeInTheDocument();
    expect(screen.getByText('JaneSmith: 67890')).toBeInTheDocument();
    expect(screen.getByText('BobJohnson: 11111')).toBeInTheDocument();
    expect(screen.getByText('AliceWilliams: 22222')).toBeInTheDocument();
  });
}); 
import { transformData, filterData } from '../transformData';
import { User } from '../../types/user';

const mockUsers: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
    age: 25,
    hair: { color: 'Black', type: 'Straight' },
    company: {
      department: 'IT',
      name: 'Tech Corp',
      title: 'Developer',
      address: { postalCode: '12345' }
    }
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    gender: 'female',
    age: 30,
    hair: { color: 'Brown', type: 'Curly' },
    company: {
      department: 'IT',
      name: 'Tech Corp',
      title: 'Designer',
      address: { postalCode: '67890' }
    }
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    gender: 'male',
    age: 35,
    hair: { color: 'Blonde', type: 'Wavy' },
    company: {
      department: 'HR',
      name: 'Tech Corp',
      title: 'Manager',
      address: { postalCode: '11111' }
    }
  }
];

describe('transformData', () => {
  const transformed = transformData(mockUsers);

  it('groups data by department', () => {
    expect(transformed).toHaveProperty('IT');
    expect(transformed).toHaveProperty('HR');
  });

  it('counts gender correctly', () => {
    expect(transformed.IT.male).toBe(1);
    expect(transformed.IT.female).toBe(1);
    expect(transformed.HR.male).toBe(1);
    expect(transformed.HR.female).toBe(0);
  });

  it('calculates age range correctly', () => {
    expect(transformed.IT.ageRange).toBe('25-30');
    expect(transformed.HR.ageRange).toBe('35-35');
  });

  it('counts hair colors correctly', () => {
    expect(transformed.IT.hair).toEqual({
      Black: 1,
      Brown: 1
    });
    expect(transformed.HR.hair).toEqual({
      Blonde: 1
    });
  });

  it('maps address users correctly', () => {
    expect(transformed.IT.addressUser).toEqual({
      JohnDoe: '12345',
      JaneSmith: '67890'
    });
    expect(transformed.HR.addressUser).toEqual({
      BobJohnson: '11111'
    });
  });
});

describe('filterData', () => {
  const transformed = transformData(mockUsers);

  it('returns all data when no filters applied', () => {
    const filtered = filterData(transformed, {});
    expect(Object.keys(filtered)).toHaveLength(2);
  });

  it('filters by department correctly', () => {
    const filtered = filterData(transformed, { department: 'IT' });
    expect(Object.keys(filtered)).toHaveLength(1);
    expect(filtered).toHaveProperty('IT');
  });

  it('filters by gender correctly', () => {
    const filtered = filterData(transformed, { gender: 'female' });
    expect(Object.keys(filtered)).toHaveLength(1);
    expect(filtered.IT.female).toBe(1);
  });

  it('filters by age range correctly', () => {
    const filtered = filterData(transformed, { ageRange: '25-30' });
    expect(Object.keys(filtered)).toHaveLength(1);
    expect(filtered).toHaveProperty('IT');
  });

  it('filters by hair color correctly', () => {
    const filtered = filterData(transformed, { hairColor: 'Black' });
    expect(Object.keys(filtered)).toHaveLength(1);
    expect(filtered.IT.hair.Black).toBe(1);
  });

  it('combines multiple filters correctly', () => {
    const filtered = filterData(transformed, {
      department: 'IT',
      gender: 'male',
      hairColor: 'Black'
    });
    expect(Object.keys(filtered)).toHaveLength(1);
    expect(filtered.IT.male).toBe(1);
    expect(filtered.IT.hair.Black).toBe(1);
  });
}); 
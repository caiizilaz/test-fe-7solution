import { User } from '../types/user';

export const mockUsers: User[] = [
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
  },
  {
    id: 4,
    firstName: 'Alice',
    lastName: 'Williams',
    gender: 'female',
    age: 28,
    hair: { color: 'Brown', type: 'Straight' },
    company: {
      department: 'HR',
      name: 'Tech Corp',
      title: 'Recruiter',
      address: { postalCode: '22222' }
    }
  }
]; 
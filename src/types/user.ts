export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  hair: {
    color: string;
    type: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      postalCode: string;
    };
  };
}

export interface DepartmentSummary {
  male: number;
  female: number;
  ageRange: string;
  hair: {
    [color: string]: number;
  };
  addressUser: {
    [name: string]: string;
  };
}

export interface GroupedData {
  [department: string]: DepartmentSummary;
}

export interface FilterCriteria {
  department?: string;
  gender?: string;
  ageRange?: string;
  hairColor?: string;
} 
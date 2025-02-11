import { User, GroupedData, FilterCriteria } from '../types/user';

export const transformData = (users: User[]): GroupedData => {
  const groupedData: GroupedData = {};

  users.forEach(user => {
    const department = user.company.department;
    if (!groupedData[department]) {
      groupedData[department] = {
        male: 0,
        female: 0,
        ageRange: '',
        hair: {},
        addressUser: {},
      };
    }

    // Update gender count
    if (user.gender === 'male') {
      groupedData[department].male++;
    } else {
      groupedData[department].female++;
    }

    // Update hair color count
    const hairColor = user.hair.color;
    groupedData[department].hair[hairColor] = (groupedData[department].hair[hairColor] || 0) + 1;

    // Update address user
    const fullName = user.firstName + user.lastName;
    groupedData[department].addressUser[fullName] = user.company.address.postalCode;
  });

  // Calculate age range for each department
  Object.keys(groupedData).forEach(department => {
    const departmentUsers = users.filter(user => user.company.department === department);
    const ages = departmentUsers.map(user => user.age);
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);
    groupedData[department].ageRange = `${minAge}-${maxAge}`;
  });

  return groupedData;
};

export const filterData = (data: GroupedData, criteria: FilterCriteria): GroupedData => {
  if (!Object.keys(criteria).length) return data;

  return Object.entries(data).reduce((acc, [department, summary]) => {
    let include = true;

    if (criteria.department && !department.toLowerCase().includes(criteria.department.toLowerCase())) {
      include = false;
    }

    if (criteria.gender) {
      const hasGender = criteria.gender === 'male' ? summary.male > 0 : summary.female > 0;
      if (!hasGender) include = false;
    }

    if (criteria.ageRange) {
      const [minFilter, maxFilter] = criteria.ageRange.split('-').map(Number);
      const [minAge, maxAge] = summary.ageRange.split('-').map(Number);
      if (minAge > maxFilter || maxAge < minFilter) include = false;
    }

    if (criteria.hairColor) {
      if (!summary.hair[criteria.hairColor]) include = false;
    }

    if (include) {
      acc[department] = summary;
    }

    return acc;
  }, {} as GroupedData);
}; 
export const getFirstName = (fullName: string): string => fullName.slice(1);
export const getSurname = (fullName: string): string => fullName[0] ?? "";

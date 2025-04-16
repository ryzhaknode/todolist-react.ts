export const parseDate = (str: string) => {
    const [day, month, year] = str.split('/');
    return `${year}-${month}-${day}`; // YYYY-MM-DD
};
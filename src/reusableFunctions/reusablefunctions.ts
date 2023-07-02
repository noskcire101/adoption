export const convertToTitleCase = (str:any) => {
    const titleCase = str.toLowerCase().split(' ').map(function (s:any) {
      return s.charAt(0).toUpperCase() + s.substring(1);
  }).join(' ');
  return titleCase;
  }
export const useTypography = () => {
  const formatTitle = (name) => {
    if (typeof name !== 'string' || name.length === 0) {
      return name;
    }
    const singularName = singularize(name);
    return ucfirst(singularName);
  };
  const ucfirst = (str) => {
    if (typeof str !== 'string' || str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const singularize = (str) => {
    if (typeof str !== 'string' || str.length === 0) {
      return str;
    }
    if (str.endsWith('s')) {
      return str.slice(0, -1);
    }
    return str;
  };

  return { formatTitle, ucfirst, singularize };
};

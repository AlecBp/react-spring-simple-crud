// Given a string such as 'addressBook.0.number' it will try to resolve that path and return that value
export const accessObjectValueWithString = (path, obj, separator = ".") => {
  var properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
};

export const getPropsForFieldName = (name, values, touched, errors) => {
  return {
    value: accessObjectValueWithString(name, values),
    touched: accessObjectValueWithString(name, touched),
    errors: accessObjectValueWithString(name, errors),
  };
};

export function errorMessages(field: string) {
  const types = {
    required() {
      return `Property '${field}' is required.`;
    },
    type(type: string) {
      return `Is required type ${type} in property '${field}'.`;
    },
    default() {
      return `Invalid property '${field}'`;
    },
  };

  return types;
}

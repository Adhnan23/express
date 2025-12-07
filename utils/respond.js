const respond = (success, message, data = null, errors = null) => {
  return {
    success,
    message,
    data,
    errors,
  };
};

export default respond;

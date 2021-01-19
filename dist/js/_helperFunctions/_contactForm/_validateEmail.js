const _validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export { _validateEmail };

const _spinner = (value) => {
  const spinner = document.querySelector('.spinner');
  if (value) {
    spinner.style.display = 'block';
  } else {
    spinner.style.display = 'none';
  }
};

export { _spinner };

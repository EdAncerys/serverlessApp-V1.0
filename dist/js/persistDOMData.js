async function persistDOMData(pageName) {
  try {
    sessionStorage.setItem('oneTouchPageName', pageName);
    const oneTouchDOMBody = document.querySelector(`#oneTouchBodyContainer`)
      .innerHTML;
    sessionStorage.setItem('oneTouchDOMBody', oneTouchDOMBody);
  } catch (err) {
    console.log(err);
  }
}

export { persistDOMData };

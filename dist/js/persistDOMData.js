async function persistDOMData(nodeID, pageName) {
  try {
    sessionStorage.setItem('oneTouchBodyName', pageName);
    const oneTouchDOMBody = document.querySelector(`#${nodeID}`).innerHTML;
    sessionStorage.setItem('oneTouchDOMBody', oneTouchDOMBody);
  } catch (err) {
    console.log(err);
  }
}

export { persistDOMData };

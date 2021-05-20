async function _oneTouchCreateTicket() {
  console.log('Creating oneTouch Ticket');

  const URL = '/oneTouch/tickets/oneTouchCreateTicket';
  const body = {
    access_token,
    name,
    email,
    subject,
    description,
    status: 2,
    priority: 1,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);
    console.log(data);

    _spinner(false);
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

export { _oneTouchCreateTicket };

$(document).ready(function () {
  // process the form
  $(function () {
    $('form').submit(function (event) {
      event.preventDefault(); // Prevent the form from submitting
      const form = $(this);
      const formID = form[0].id;

      $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),
      })
        .done(function (res) {
          const ticketNum = 0;
          const responseJSON = JSON.parse(res);
          const subject = responseJSON.subject;
          const description = responseJSON.description;
          const email = responseJSON.email;
          const ticket = `<h3>Subject ${subject}</h3> <br/>
                          <h3>Subject ${description}</h3> <br/>`;

          document.querySelector('#data').innerHTML = res; // Render Response Object

          console.log('From ID: ' + formID);
          console.log('RESPONSE: ' + typeof res);
        })
        .fail(function (error) {
          console.log(error.statusText);
        });
    });
  });
});

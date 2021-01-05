$(document).ready(function () {
  // process the form
  $(function () {
    $('form').submit(function (event) {
      event.preventDefault(); // Prevent the form from submitting
      const form = $(this);
      const formID = form[0].id;

      const freshDeskFormName = $('#contactFormName').val();
      const freshDeskFormEmail = $('#contactFormEmail').val();
      const freshDeskFormSubject = $('#contactFormSubject').val();

      console.log(`Processing ${formID} ...`);
      data = {
        id: formID,
        name: freshDeskFormName,
        email: freshDeskFormEmail,
        subject: freshDeskFormSubject,
      };

      $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        contentType: 'application/json',
        dataType: 'json',
        encode: true,
        data: JSON.stringify(data),

        success: function (res) {
          console.log('Submitted successfully...');
          console.log(res);

          $('#data').show();
          $('.msg').show();
          $('#contactForm').trigger('reset').hide();

          document.querySelector('#data').innerHTML = JSON.stringify(res); // Render Response Object
        },
        error: function (error) {
          console.log('An error occurred.');
          console.log(error);
        },
      });
    });
  });
});

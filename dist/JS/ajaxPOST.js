$(document).ready(function () {
  // process the form
  $(function () {
    $('form').submit(function (event) {
      event.preventDefault(); // Prevent the form from submitting
      const form = $(this);
      const formID = form[0].id;

      const lambdaName = $('#lambdaName').val(); // Lambda From data

      const freshDeskFormName = $('#freshDeskFormName').val();
      const freshDeskFormEmail = $('#freshDeskFormEmail').val();
      const freshDeskFormSubject = $('#freshDeskFormSubject').val();
      const freshDeskFormDescription = $('#freshDeskFormDescription').val();

      let data;

      if (formID === 'lambdaForm') {
        console.log(`Processing ${formID} ...`);
        data = {
          id: formID,
          body: lambdaName,
        };
      }

      if (formID === 'freshDeskForm') {
        console.log(`Processing ${formID} ...`);
        data = {
          id: formID,
          freshDeskFormName: freshDeskFormName,
          freshDeskFormEmail: freshDeskFormEmail,
          freshDeskFormSubject: freshDeskFormSubject,
          freshDeskFormDescription: freshDeskFormDescription,
        };
      }

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
          if (formID === 'lambdaForm') $('#lambdaForm').trigger('reset');
          if (formID === 'freshDeskForm') $('#freshDeskForm').trigger('reset');

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

$(document).ready(function () {
  // process the form
  $(function () {
    $('form').submit(function (event) {
      event.preventDefault(); // Prevent the form from submitting
      const form = $(this);
      const formID = form[0].id;
      const lambdaName = $('#lambdaName').val();

      const data = {
        id: formID,
        body: lambdaName,
      };

      $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        contentType: 'application/json',
        dataType: 'json',
        encode: true,
        data: JSON.stringify(data),

        success: function (res) {
          console.log('Submission was successful.');
          console.log(res);
        },
        error: function (error) {
          console.log('An error occurred.');
          console.log(error);
        },
      });
    });
  });
});

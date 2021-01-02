$(function () {
  $('form').submit(function (e) {
    const form = $(this);
    const name = $('#name').val();
    const email = $('#email').val();

    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
    })
      .done(function () {
        // code if form was successfully sent
        $('#formElement').trigger('reset').hide(); //reset form
        $('.msg').show();
        console.log(`Form Submitted Successfully`);
      })
      .fail(function (error) {
        // code if form was failed
        console.log(error.statusText);
      });

    e.preventDefault();
  });
});

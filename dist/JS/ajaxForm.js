$(function () {
  $('form').submit(function (e) {
    const form = $(this);
    const lambda = $('#lambda').val();

    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
    })
      .done(function (res) {
        // code if form was successfully sent
        const data = res;
        const formID = form[0].id;
        document.querySelector('#data').innerHTML = data;

        if (formID === 'lambdaForm') $('#lambdaForm').trigger('reset').hide(); //reset form
        if (formID === 'freshDeskForm')
          $('#freshDeskForm').trigger('reset').hide(); //reset form
        $('.msg').show();

        console.log(`Form Submitted Successfully`);
        console.log(form[0].id);
        console.log(data, lambda);
      })
      .fail(function (error) {
        // code if form was failed
        console.log(error.statusText);
      });

    e.preventDefault();
  });
});

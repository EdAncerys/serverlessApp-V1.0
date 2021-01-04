$(function () {
  $('form').submit(function (e) {
    const form = $(this);

    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
    })
      .done(function (res) {
        // code if form was successfully sent
        const data = res;
        const formID = form[0].id;
        document.querySelector('#data').innerHTML = data;

        if (formID === 'lambdaForm') {
          const lambda = $('#lambda').val();
          $('#lambdaForm').trigger('reset').hide(); //reset form
          console.log('RETURNED DATA: ' + data);
          console.log('PASSED VALUE: ' + lambda);
        }

        if (formID === 'freshDeskForm') {
          $('#freshDeskForm').trigger('reset').hide(); //reset form
        }

        $('.msg').show();

        console.log(`Form Submitted Successfully`);
        console.log('SUBMITTED FROM: ' + form[0].id);
      })
      .fail(function (error) {
        // code if form was failed
        console.log(error.statusText);
      });

    e.preventDefault();
  });
});

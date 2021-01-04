// $(document).ready(function () {
//   // process the form
//   $('form').submit(function (event) {
//     // get the form data
//     const formData = {
//       name: $('input[name=name]').val(),
//       email: $('input[name=email]').val(),
//       superheroAlias: $('input[name=superheroAlias]').val(),
//     };

//     // process the form
//     $.ajax({
//       type: form.attr('method'), // define the type of HTTP verb we want to use (POST for our form)
//       url: form.attr('action'), // the url where we want to POST
//       data: 'formData', // our data object
//       dataType: 'json', // what type of data do we expect back from the server
//       encode: true,
//     })
//       .done(function (res) {
//         console.log(res);
//       })
//       .fail(function (error) {
//         console.log(error.statusText);
//       });

//     // stop the form from submitting the normal way and refreshing the page
//     event.preventDefault();
//   });
// });

$(document).ready(function () {
  const headers = {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': 'http://localhost:9000/lambdaPOST',
    // 'Access-Control-Allow-Headers':
    //   'Origin, X-Requested-With, Content-Type, Accept',
  };

  var frm = $('form');

  frm.submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: frm.attr('method'),
      url: frm.attr('action'),
      contentType: 'application/json',
      dataType: 'json',
      headers: headers,
      // data: JSON.stringify(headers),
      data: 'headers',

      success: function (data) {
        console.log('Submission was successful.');
        console.log(data);
      },
      error: function (data) {
        console.log('An error occurred.');
        console.log(data);
      },
    });
  });
});

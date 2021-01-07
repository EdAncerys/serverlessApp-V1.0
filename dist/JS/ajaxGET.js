$(document).ready(function () {
  // process the form
  $(function () {
    $('form').submit(function (event) {
      event.preventDefault(); // Prevent the form from submitting

      const LAMBDA_END_POINT = 'http://localhost:9000'; // Change before deploy to Netlify
      const form = $(this);
      const formID = form[0].id;

      $.ajax({
        type: form.attr('method'),
        url: LAMBDA_END_POINT + form.attr('action'),
        data: form.serialize(),

        success: function (res) {
          let response;

          if (formID === 'lambdaForm') {
            response = JSON.parse(res).body;
            $('#lambdaForm').hide();
          }

          if (formID === 'freshDeskForm') {
            const ticketNum = 0;
            const { subject, requester_id, created_at } = res[ticketNum];
            response = `<div class='msgText'>Last Submitted Ticked To freshDesk</div> <br />
                        Subject: ${subject} <br/>
                        requester_id: ${requester_id} <br/>
                        created_at: ${created_at} <br/>`;
            $('#freshDeskForm').hide();
            // response = JSON.stringify(JSON.parse(res)[0]);
          }

          $('#data').show();
          $('.msg').show();
          document.querySelector('#data').innerHTML = response; // Render Response Object

          console.log('From ID: ' + formID);
          console.log('RESPONSE: ' + res);
        },
        error: function (error) {
          console.log('An error occurred.');
          console.log(error.statusText);
        },
      });
    });
  });
});

// Validates form input and sends the broadband availability request.
function checkRequest() {

    // Reset all form values and hide results
    resetAllValues();
    $('#results').hide();
    $('#addressDiv').hide();
    loadingTimer('#searchButton', true);

    // Get checker type radio selection
    var action = $('input[name=action]:radio:checked').val();
    var errorMessage = '';

    // Remove input validation highlight
    $('.form-control').each(function () {
        $(this).removeClass('input-highlight');
    });

    if (action == 'telephone_checker') {

        // Validate phone number
        var cli = $('#cliInput').val();
        cli = cli.replace(/\+|\(|\)|\-|\s/gi, '');
        if (/^0[0-9]{9,15}$/.test(cli)) {

            // Show results loading
            $('#results').fadeIn('slow');
            $('#statusTbl').show();
            $('#availableProducts').show();

            // Send broadband availability request
            availabilityRequest(cli);
        }
        else {

            // Display validation error dialog
            errorMessage = 'Telephone number is invalid.';
            $('#cliInput').addClass('input-highlight');
            displayValidationErrorDialog(errorMessage);
        }
    }
    else {

        // Validate postcode
        var postcode = $('#postcodeInput').val();
        postcode = postcode.replace(/\+|\(|\)|\-|\s/gi, '');
        if (validatePostcode(postcode)) {

            // Send address search request
            addressRequest(postcode);
        }
        else {

            // Display validation error dialog
            errorMessage = 'Postcode is invalid.';
            $('#postcodeInput').addClass('input-highlight');
            displayValidationErrorDialog(errorMessage);
        }
    }
}

// Checks if a string is a valid postcode.
function validatePostcode(postcode) {

    var postcode = $('#postcodeInput').val();
    postcode = postcode.replace(/\+|\(|\)|\-|\s/gi, '');
    if (/^[A-Za-z]{1,2}(\d{1,2}|[I])[A-Za-z]? ?\d[A-Za-z]{2}$/.test(postcode))
        return true;
    else
        return false;
}

// Display validation error message in dialog box.
function displayValidationErrorDialog(errorMessage) {

    if (errorMessage.length > 0) {
        var dialog = $('#console-dialog');
        dialog.find('.modal-title').html('Some problems occured...');
        message = '<p>Some information was entered incorrectly. The incorrect fields are listed below, and have been outlined in <span style="color:blue">blue</span> on the page.</p>';
        message += '<p>' + errorMessage + '</p>';
        dialog.find('.modal-body').html(message);
        dialog.modal('show');
    }
}

// Sets the selected text input field.
function changeInputSelection(buttonId) {

    $('.form-control').each(function () {
        if ($(this).attr('id') == buttonId + 'Input') {
            $(this).focus();
        }
    });
}

// Sets the selected radio input.
function changeCheckerRadio(buttonId) {

    $('.form-control').each(function () {
        if ($(this).attr('id') != buttonId + 'Input') {
            $(this).removeClass('input-highlight');
            $(this).val('');
        }
    });

    $('#type_phone').prop('checked', (buttonId == 'cli'));
    $('#type_postcode').prop('checked', (buttonId != 'cli'));
}

// Requests broadband availability for a postcode or phone number.
function availabilityRequest(cli) {

    // Send AJAX request for broadband availability for phone number or postcode.
    jQuery.ajax({
        url: '?action=broadband-availability-cli',
        dataType: 'text',
        data: {
            cli: cli,
        },
        success: function (result) {
            $('#resultsTitle').html(cli);
            buildAvailabilityResults(result);
            loadingTimer('#searchButton', false);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showErrorMessage(XMLHttpRequest.responseText);
        }
    });
}

// Displays API exception messages.
function showErrorMessage(message) {
    // Display error message
    $('#errorText').html('<p class=\'alert alert-error\'>' + message + '</p>');
    $('#errorText').show();
}

// Updates the broadband availability results table with the API response.
function buildAvailabilityResults(jsonString) {

    // Parse broadband availability results into object
    var result = jQuery.parseJSON(jsonString);

    // Display exchange information
    $('#status').html(result.exchange.status);
    $('#message').html(result.exchange.message);
    $('#exCode').html(result.exchange.exchange_code);
    $('#exName').html(result.exchange.exchange_name);

    // Loop through broadband product availability results
    for (var i = 0; i < result.products.length; i++) {

        // Get product availability and speed
        var product = result.products[i];
        var availability = (product.availability == true) ? 'Available' : 'Not Available';
        var speed = null;
        if (product.likely_down_speed != null)
            speed = product.likely_down_speed.toFixed(1);
        if (product.likely_up_speed != null)
            speed = speed + ' (' + product.likely_up_speed.toFixed(1) + ')';
        if (speed == null)
            speed = 'Not Available';

        // Update results table
        if (product.name == '20CN ADSL Max') {
            $('#adslMaxAvail').html(availability);
            $('#adslMaxSpeed').html(speed);
        }
        else if (product.name == '21CN ADSL 2+') {
            $('#adsl2plusAvail').html(availability);
            $('#adsl2plusSpeed').html(speed);
        }
        else if (product.name == '21CN Annex M') {
            $('#adsl2plusAnnexMAvail').html(availability);
            $('#adsl2plusAnnexMSpeed').html(speed);
        }
        else if (product.name == 'Fibre to the Cabinet (FTTC)') {
            $('#fttcAvail').html(availability);
            $('#fttcSpeed').html(speed);
        }
        else if (product.name == 'Fibre to the Premises (FTTP)') {
            $('#fttpAvail').html(availability);
            $('#fttpSpeed').html(speed);
        }
        else if (product.name == 'TalkTalk LLU ADSL 2+') {
            $('#ttb_adsl2plusAvail').html(availability);
            $('#ttb_adsl2plusSpeed').html(speed);
        }
        else if (product.name == 'TalkTalk FTTC') {
            $('#ttb_fttcAvail').html(availability);
            $('#ttb_fttcSpeed').html(speed);
        }
    }
}

// Requests addresses by postcode.
function addressRequest(postcode) {

    // Send AJAX request for address search by postcode
    jQuery.ajax({
        url: '?action=address-search',
        dataType: 'text',
        data: {
            postcode: postcode
        },
        success: function (result) {
            buildAddressResults(result);
            $('#addressDiv').fadeIn('slow');
            loadingTimer('#searchButton', false);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showErrorMessage(XMLHttpRequest.responseText);
        }
    });
}

// Builds the address search results table from the API response.
function buildAddressResults(jsonString) {

    var addressDiv = document.getElementById('addressDiv');
    var result = jQuery.parseJSON(jsonString);
    var addressHtml = '';

    // There are no address search results for the postcode
    if (result.addresses.length == 0) {
        $('#errorText').html('<p class=\'alert alert-error\'>No addresses match this postcode.</p>');
        $('#errorText').show();
        return;
    }

    // Build address table
    addressHtml += '<table class="content-table table-curved" style="width:65%; margin:0 auto; margin-top: 12px;">';

    // Loop through address results
    for (var i = 0; i < result.addresses.length; i++) {

        var address = result.addresses[i];

        // Get address fields
        var subPremises = address.sub_premises;
        var premisesName = address.premises_name;
        var thoroughfareNumber = address.thoroughfare_number;
        var thoroughfareName = address.thoroughfare_name;
        var locality = address.locality;
        var postTown = address.post_town;
        var postcode = address.postcode;
        var districtId = address.district_id;
        var nad_key = address.nad_key;

        // Construct full address 
        var fullAddress = '';
        if (subPremises != '') { fullAddress += subPremises + ' '; }
        if (premisesName != '') { fullAddress += premisesName + ', '; }
        if (thoroughfareNumber != '') { fullAddress += thoroughfareNumber + ' '; }
        if (thoroughfareName != '') { fullAddress += thoroughfareName + ', '; }
        if (postTown != '') { fullAddress += postTown + ', '; }
        if (postcode != '') { fullAddress += postcode; }

        // Build address result table row
        addressHtml += '<tr>' +
							'<td>' +
							'<input onclick=\'selectAddress(event)\' type=\'radio\' id=\'addressId' + i + '\' name=\'addressId\' value=\'' + i + '\' />' +
							'<input type=\'hidden\' id=\'subPremises' + i + '\' name=\'subPremises\' value=\'' + subPremises + '\' />' +
							'<input type=\'hidden\' id=\'premisesName' + i + '\' name=\'premisesName\' value=\'' + premisesName + '\' />' +
							'<input type=\'hidden\' id=\'thoroughfareNumber' + i + '\' name=\'thoroughfareNumber\' value=\'' + thoroughfareNumber + '\' />' +
							'<input type=\'hidden\' id=\'thoroughfareName' + i + '\' name=\'thoroughfareName\' value=\'' + thoroughfareName + '\' />' +
							'<input type=\'hidden\' id=\'postTown' + i + '\' name=\'postTown\' value=\'' + postTown + '\' />' +
							'<input type=\'hidden\' id=\'postcode' + i + '\' name=\'postcode\' value=\'' + postcode + '\' />' +
                            '<input type=\'hidden\' id=\'districtId' + i + '\' name=\'districtId\' value=\'' + districtId + '\' />' +
                            '<input type=\'hidden\' id=\'nad_key' + i + '\' name=\'nad_key\' value=\'' + nad_key + '\' />' +
							'</td>' +
							'<td>' +
								'<label id=\'addressLabel' + i + '\' for=\'addressId' + i + '\'>' + fullAddress + '</label>' +
                            '</td>' +
                        '</tr>';
    }
    
    // None of the above addresses - search by postcode input
    addressHtml += '<tr>' +
						'<td className=\'table\'>' +
						'<input onclick=\'selectAddress(event)\' type=\'radio\' id=\'addressId-1\' name=\'addressId\' value=\'-1\' />' +
						'<td className=\'table\'>' +
							'<label for=\'addressId-1\'>None of the above. This check will provide limited results.</label>' +
						'</td>' +
					'</tr>';
    addressHtml += '</table>';
    addressDiv.innerHTML = addressHtml;
}

// Select address event handler.
function selectAddress(event) {

    // Get the targetnode that fired the event
    var target = $(event.target);

    // Get the selected address
    var addressId = target.val();

    // Show results loading
    $('#addressDiv').hide();
    $('#statusTbl').show();
    $('#availableProducts').show();
    $('#results').fadeIn('slow');
    loadingTimer('#searchButton', true);

    // Send request for broadband availability by exact address
    addressAvailabilityRequest(addressId);
}

// Requests broadband availability for address result table id or by postcode if none is selected.
function addressAvailabilityRequest(addressId) {

    // Check if we need to do a postcode check and exit function
    if (addressId == -1) {
        var postcode = $('#postcodeInput').val();
        availabilityRequest(postcode);
        return;
    }

    // Address has been selected from results table
    if (addressId != '') {

        // Get address fields from hidden form input
        subPremises = document.getElementById('subPremises' + addressId).value;
        premisesName = document.getElementById('premisesName' + addressId).value;
        thoroughfareNumber = document.getElementById('thoroughfareNumber' + addressId).value;
        thoroughfareName = document.getElementById('thoroughfareName' + addressId).value;
        postTown = document.getElementById('postTown' + addressId).value;
        postcode = document.getElementById('postcode' + addressId).value;
        districtId = document.getElementById('districtId' + addressId).value;
        nad_key = document.getElementById('nad_key' + addressId).value;
       
        // Construct API request URL
        var address = {
            sub_premises: subPremises,
            premises_name: premisesName,
            thoroughfare_number: thoroughfareNumber,
            thoroughfare_name: thoroughfareName,
            post_town: postTown,
            postcode: postcode,
            district_id: districtId,
            nad_key: nad_key
        };

        var data = {
            address: JSON.stringify(address)
        }

        // Send AJAX request for broadband availability for exact address
        jQuery.ajax({
            url: '?action=broadband-availability-exact',
            dataType: 'text',
            type: 'POST',
            data: data,
            success: function (result) {
                $('#resultsTitle').html($('#addressLabel' + addressId).html());
                buildAvailabilityResults(result);
                loadingTimer('#searchButton', false);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                showErrorMessage(XMLHttpRequest.responseText);
            }
        });
    }
}

// Sets search button loading state.
function loadingTimer(targetNode, start) {

    if (start) {
        $(targetNode).html('Searching...');
    }
    else {
        $(targetNode).html('<span class="glyphicon glyphicon-search"></span> Search');
    }
}

// Resets all search results.
function resetAllValues() {

    var loadingImg = "<img src='images/spinner.gif' alt='checking' />";
        
    // Reset error text
    $('#errorText').hide();

    // Reset address
    $('#addressDiv').html('');
    
    // Reset title
    $('#resultsTitle').html('');

    // Reset all elements to loading
    $('#status').html(loadingImg);
    $('#message').html(loadingImg);
    $('#exCode').html(loadingImg);
    $('#exName').html(loadingImg);

    $('#adslMaxAvail').html(loadingImg);
    $('#adsl2plusAvail').html(loadingImg);
    $('#adsl2plusAnnexMAvail').html(loadingImg);
    $('#fttcAvail').html(loadingImg);
    $('#fttpAvail').html(loadingImg);
    $('#ttb_adsl2plusAvail').html(loadingImg);
    $('#ttb_fttcAvail').html(loadingImg);

    $('#adslMaxSpeed').html(loadingImg);
    $('#adsl2plusSpeed').html(loadingImg);
    $('#adsl2plusAnnexMSpeed').html(loadingImg);
    $('#fttcSpeed').html(loadingImg);
    $('#fttpSpeed').html(loadingImg);
    $('#ttb_adsl2plusSpeed').html(loadingImg);
    $('#ttb_fttcSpeed').html(loadingImg);

}
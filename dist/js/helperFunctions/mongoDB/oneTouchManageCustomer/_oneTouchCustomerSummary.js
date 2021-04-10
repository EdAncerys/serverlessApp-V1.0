import { _fetchOneTouchCustomerDataById } from './_fetchOneTouchCustomerDataById.js';
import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchCustomerSummary(id, pageName) {
  console.log('Customer Summary Info...');

  const data = await _fetchOneTouchCustomerDataById(id);
  console.log(data);

  const dataWrapper = document.createElement('div');
  dataWrapper.id = 'dataWrapper';
  const customerDataHTML = ` <div id="oneTouchBodyContainer" class="oneTouchBodyContainer">
  <div class="oneTouchWrapper">
    <section class="features" style="text-align: initial;">
      <div class="flex-container-30 boxContainer">
        <div class="tableCell">Created at: ${data.customerCreated}</div>
        <div class="tableCell">Full Name: ${data.customerFullName}</div>
        <div class="tableCell">Phone Number: ${data.customerPhoneNumber}</div>
        <div class="tableCell">Email: ${data.customerEmail}</div>
        <div class="tableCell">Postcode: ${data.postcode}</div>
      </div>
      <div class="flex-container-30 boxContainer">
        <div class="fontH3">Customer Specific Notes</div>
        <div class="tableCell">${data.customerNotes}</div>
      </div>
    </section>

    <div style="position: absolute; top: 80px; right: 20px; display: grid">
      <goPageBack class="btnOneTouch" role="button"> Go Back </goPageBack>
    </div>

    <section class="features">
      <div class="flex-container-30 boxContainer">
        <div class="fontH3">Manage Customer Data</div>
        <div class="fontH2 justifyText">
          The standard chunk of Lorem Ipsum used since the 1500s is
          reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham.
        </div>
      </div>
      <div class="flex-container-30 boxContainer">
        <div class="fontH3">Manage Customer Data</div>
        <div class="fontH2 justifyText">
          The standard chunk of Lorem Ipsum used since the 1500s is
          reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham.
        </div>
      </div>
      <div class="flex-container-30 boxContainer">
        <!-- <img src="../../images/pic02.jpg" alt="NDG" /> -->
        <div class="fontH3">Manage Customer Data</div>
        <div class="fontH2 justifyText">
          The standard chunk of Lorem Ipsum used since the 1500s is
          reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham.
        </div>
      </div>
    </section>
    <section class="features">
      <div class="flex-container-30 boxContainer">
        <div class="fontH3">Manage Customer Data</div>
        <div class="fontH2 justifyText">
          The standard chunk of Lorem Ipsum used since the 1500s is
          reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham.
        </div>
      </div>
      <div class="flex-container-30 boxContainer">
        <div class="fontH3">Manage Customer Data</div>
        <div class="fontH2 justifyText">
          The standard chunk of Lorem Ipsum used since the 1500s is
          reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham.
        </div>
      </div>
      <div class="flex-container-30 boxContainer">
        <div class="fontH3">Manage Customer Data</div>
        <div class="fontH2 justifyText">
          The standard chunk of Lorem Ipsum used since the 1500s is
          reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham.
        </div>
      </div>
      <div class="flex-container-30 boxContainer">
        <div class="fontH3">Manage Customer Data</div>
        <div class="fontH2 justifyText">
          The standard chunk of Lorem Ipsum used since the 1500s is
          reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham.
        </div>
      </div>
    </section>
    <section class="features">
      <div class="flex-container-30 boxContainer">
        <div class="fontH3">Manage Customer Data</div>
        <div class="fontH2 justifyText">
          The standard chunk of Lorem Ipsum used since the 1500s is
          reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham.
        </div>
      </div>
      <div class="flex-container-30 boxContainer">
        <!-- <img src="../../images/pic02.jpg" alt="NDG" /> -->
        <div class="fontH3">Manage Customer Data</div>
        <div class="fontH2 justifyText">
          The standard chunk of Lorem Ipsum used since the 1500s is
          reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham.
        </div>
      </div>
    </section>
  </div>
</div>`;

  if (pageName === 'manage-customer') {
    const oneTouchCustomer = document.createElement('div');
    oneTouchCustomer.id = 'oneTouchCustomer';
    oneTouchCustomer.innerHTML = customerDataHTML;

    const manageCustomerContainer = document.querySelector(
      '#manageCustomerContainer'
    );
    const oneTouchManageCustomerPageOne = document.querySelector(
      '#oneTouchManageCustomerPageOne'
    );

    oneTouchManageCustomerPageOne.classList.add('hidden');
    manageCustomerContainer.appendChild(oneTouchCustomer);
  }

  const endPoint = location.href.split('/').slice(-1)[0];
  persistDOMData(endPoint);
}

export { _oneTouchCustomerSummary };

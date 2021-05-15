import { _oneTouchSuperUserSignup } from './helperFunctions/mongoDB/oneTouchLogin/_oneTouchSuperUserSignUp.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#oneTouchSignUp')
    .addEventListener('click', oneTouchSignUp);
});

const oneTouchSignUp = (e) => {
  e.preventDefault();
  _oneTouchSuperUserSignup();
};

const oneTouchTermsAndConditions = (e) => {
  e.preventDefault();
  const oneTouchWrapper = document.querySelector('#oneTouchWrapper');
  const signUpForm = document.querySelector('#signUpForm');
  const termsAndConditions = document.createElement('termsAndConditions');

  const html = `
              <div id="oneTouchTermsAndConditions">
              <div class="features">
                <div class="flex-container-60">
                  <div class="outer">
                    <inner class="inner">
                      <btnLabel>Back</btnLabel>
                    </inner>
                  </div>
                </div>
              </div>
              <div class="features">
                <div class="flex-container-60">
                  <div class="oneTouchFormContainer bgGradientSilver">
                    <div class="alignHorizontally fontH3">
                      Terms & Conditions
                    </div>
                    <div class="alignHorizontally fontH2">
                      One Touch Portal Terms and Conditions
                    </div>
                    <div class="dataSummaryContainer textSilver fontH2">
                      <div class="termsAndConditions justifyText">
                        <div class="textBlack">1. Your Acceptance</div>
                        <div>
                          At vero eos et accusamus et iusto odio dignissimos
                          ducimus qui blanditiis praesentium voluptatum
                          deleniti atque corrupti quos dolores et quas
                          molestias excepturi sint occaecati cupiditate non
                          provident, similique sunt in culpa qui officia
                          deserunt mollitia animi, id est laborum et dolorum
                          fuga. Et harum quidem rerum facilis est et expedita
                          distinctio. Nam libero tempore, cum soluta nobis est
                          eligendi optio cumque nihil impedit quo minus id
                          quod maxime placeat facere possimus, omnis voluptas
                          assumenda est, omnis dolor repellendus. Temporibus
                          autem quibusdam et aut officiis debitis aut rerum
                          necessitatibus saepe eveniet ut et voluptates
                          repudiandae sint et molestiae non recusandae. Itaque
                          earum rerum hic tenetur a sapiente delectus, ut aut
                          reiciendis voluptatibus maiores alias consequatur
                          aut perferendis doloribus asperiores repellat.
                        </div>
                        <div class="textBlack">2. Services</div>
                        <div>
                          At vero eos et accusamus et iusto odio dignissimos
                          ducimus qui blanditiis praesentium voluptatum
                          deleniti atque corrupti quos dolores et quas
                          molestias excepturi sint occaecati cupiditate non
                          provident, similique sunt in culpa qui officia
                          deserunt mollitia animi, id est laborum et dolorum
                          fuga. Et harum quidem rerum facilis est et expedita
                          distinctio. Nam libero tempore, cum soluta nobis est
                          eligendi optio cumque nihil impedit quo minus id
                          quod maxime placeat facere possimus, omnis voluptas
                          assumenda est, omnis dolor repellendus. Temporibus
                          autem quibusdam et aut officiis debitis aut rerum
                          necessitatibus saepe eveniet ut et voluptates
                          repudiandae sint et molestiae non recusandae. Itaque
                          earum rerum hic tenetur a sapiente delectus, ut aut
                          reiciendis voluptatibus maiores alias consequatur
                          aut perferendis doloribus asperiores repellat.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  `;
  termsAndConditions.innerHTML = html;

  signUpForm.classList.add('hidden');
  oneTouchWrapper.appendChild(termsAndConditions);
};

document.querySelector('body').addEventListener('click', (event) => {
  const oneTouchSignUp = event.target.id === 'oneTouchLogin';
  const termsAndConditions = event.target.nodeName === 'SPAN';
  const goBackBtn =
    event.target.nodeName === 'BTNLABEL' || event.target.nodeName === 'INNER';

  // console.log(event.target);
  if (goBackBtn) {
    const signUpForm = document.querySelector('#signUpForm');
    const termsAndConditions = document.querySelector('termsAndConditions');

    signUpForm.classList.remove('hidden');
    termsAndConditions.remove();

    return;
  }
  if (termsAndConditions) {
    oneTouchTermsAndConditions(event);
    return;
  }
  if (oneTouchSignUp) {
    window.location.replace('/index.html');
    return;
  }
});

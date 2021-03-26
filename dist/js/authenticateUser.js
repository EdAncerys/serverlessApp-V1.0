import { _oneTouchUserAuthentication } from './helperFunctions/mongoDB/oneTouchLogin/_oneTouchUserAuthentication.js';

const authenticateUser = async () => {
  _oneTouchUserAuthentication(); // User authentication
};

export { authenticateUser };

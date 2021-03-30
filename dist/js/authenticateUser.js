import { _oneTouchUserAuthentication } from './helperFunctions/mongoDB/oneTouchLogin/_oneTouchUserAuthentication.js';

const authenticateUser = async () => {
  await _oneTouchUserAuthentication(); // User authentication
};

export { authenticateUser };

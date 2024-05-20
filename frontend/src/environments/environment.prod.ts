import {DefaultService} from "../app/core/default.service";

export const environment = {
  production: true,
  apiUrl: 'http://192.168.1.65:8081/api',
  //apiUrl: 'http://192.168.1.65:',
  apiService: DefaultService,
  keycloak: {
    issuer: 'http://localhost:8080',
    realm: 'Login',
    clientId: 'frontend'
  }
};

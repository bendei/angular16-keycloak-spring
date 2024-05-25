import {DefaultService} from "../app/openapi-generated-sources";

export const environment = {
  production: true,
  apiUrl: 'http://localhost:8081/api',
  //apiUrl: 'http://192.168.1.65:',
  apiService: DefaultService,
  keycloak: {
    issuer: 'http://localhost:8080',
    realm: 'Login',
    clientId: 'frontend'
  }
};

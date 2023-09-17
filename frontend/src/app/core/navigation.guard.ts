
import {inject} from '@angular/core';
import { Router } from '@angular/router';
export const navigationGuard = () => {
  const router = inject(Router);

  console.log("my not navigate to ...");


  return router.parseUrl('/navigationerror');
};

import {HttpInterceptorFn} from "@angular/common/http";

export const pistiInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("PistiInterceptor");
  return next(req);
};

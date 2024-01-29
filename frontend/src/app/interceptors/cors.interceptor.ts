import {HttpInterceptorFn} from "@angular/common/http";

export const corsInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("corsInterceptor");


  const corsReq = req.clone({
    headers: req.headers.set('Access-Control-Allow-Origin', '*')
  });

  return next(corsReq);
};

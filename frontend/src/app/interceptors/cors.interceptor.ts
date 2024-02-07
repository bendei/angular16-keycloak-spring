import {HttpInterceptorFn} from "@angular/common/http";

// ehelyett dev: proxy-t konfiguálunk
// prod: a Backenden kell a CORSt lekezelni
export const corsInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("corsInterceptor");


  const corsReq = req.clone({
    headers: req.headers.set('Access-Control-Allow-Origin', '*')
  });

  return next(corsReq);
};

import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
const toastr = inject(ToastrService);
  const platformId = inject(PLATFORM_ID); // حقن معرف المنصة

  return next(req).pipe(
    catchError((err) => {
      // التأكد من أننا في المتصفح قبل إظهار الرسالة
      if (isPlatformBrowser(platformId)) {
        // نستخدم الاختيار الآمن (Optional Chaining) للوصول للمسج
        const errorMessage = err.error?.message || 'An unknown error occurred';
        toastr.error(errorMessage, 'FreshCart', {
          progressBar: true,
          closeButton: true,
        });
      }

      return throwError(() => err);
    })
  );
};

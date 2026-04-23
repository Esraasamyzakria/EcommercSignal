import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
 const ngxSpinnerService = inject(NgxSpinnerService);
  const platformId = inject(PLATFORM_ID); // 1. احصل على معرف المنصة

  // 2. تحقق ما إذا كنا في المتصفح
  if (isPlatformBrowser(platformId)) {
    ngxSpinnerService.show();
  }

  return next(req).pipe(
    finalize(() => {
      // 3. لا تخفِ الـ Spinner إلا في المتصفح أيضاً
      if (isPlatformBrowser(platformId)) {
        ngxSpinnerService.hide();
      }
    })
  );
};

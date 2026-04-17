import { isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, PLATFORM_ID, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-slider',
  standalone: true, // تأكدي أنها standalone إذا كنتِ تستخدمين الإصدارات الحديثة
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderComponent implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  @ViewChild('swiperRef') swiperRef!: ElementRef;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1000,
        once: false, // تسمح بتكرار الأنيميشن
        mirror: true
      });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const swiperEl = this.swiperRef.nativeElement;

      // استماع لحدث تغيير السلايد لإعادة تشغيل الأنيميشن
      swiperEl.addEventListener('swiperslidechange', () => {
        // إزالة كلاس الأنيميشن من كل العناصر
        const allAnimated = swiperEl.querySelectorAll('[data-aos]');
        allAnimated.forEach((el: any) => el.classList.remove('aos-animate'));

        // إضافة الكلاس للسلايد النشطة فقط بعد تأخير بسيط جداً
        setTimeout(() => {
          const activeSlide = swiperEl.querySelector('.swiper-slide-active');
          if (activeSlide) {
            const currentElements = activeSlide.querySelectorAll('[data-aos]');
            currentElements.forEach((el: any) => el.classList.add('aos-animate'));
          }
        }, 50);
      });
    }
  }
}
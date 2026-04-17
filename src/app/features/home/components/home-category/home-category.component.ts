import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { SectionTitleComponent } from "../../../../shared/ui/section-title/section-title.component";
import { CategoryService } from '../../../../core/services/category/category.service';
import { Category } from '../../../../core/models/category.interface';
import * as AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-home-category',
  imports: [SectionTitleComponent],
  templateUrl: './home-category.component.html',
  styleUrl: './home-category.component.css',
})
export class HomeCategoryComponent implements OnInit {
  _categoryService=inject(CategoryService);
  categorylist=signal<Category[]>([]);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1000,
        once: false,
        mirror: true
      });
      
      // دي خطوة إضافية عشان نضمن إن الأنميشن يحس بالعناصر أول ما تظهر
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  
    this.getcategories();
    
  }
  getcategories():void{
    this._categoryService.getCategories().subscribe({
      next:(res)=>{
     
        this.categorylist.set(res.data)
      },
      error:(err)=>{

    }
    });
  }
}

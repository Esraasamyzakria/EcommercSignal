import { Component, inject, OnInit, signal } from '@angular/core';
import { SectionTitleComponent } from "../../shared/ui/section-title/section-title.component";
import { CategoryService } from '../../core/services/category/category.service';
import { Category } from '../../core/models/category.interface';

@Component({
  selector: 'app-categories',
  imports: [SectionTitleComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {

    _categoryService=inject(CategoryService);
  categorylist=signal<Category[]>([]);

  ngOnInit(): void {
    this.getcategories()
  }
    getcategories():void{
    this._categoryService.getCategories().subscribe({
      next:(res)=>{
     
        this.categorylist.set(res.data)
      },
    });
  }
}

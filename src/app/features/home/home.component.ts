import { Component } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';
import { HomeCategoryComponent } from './components/home-category/home-category.component';
import { ProductComponent } from './components/product/product.component';

@Component({
  selector: 'app-home',
  imports: [SliderComponent,HomeCategoryComponent,ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

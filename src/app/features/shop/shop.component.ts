import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../core/services/product/product.service';
import { Product } from '../../core/models/product.interface';
import { SectionTitleComponent } from "../../shared/ui/section-title/section-title.component";
import { CardComponent } from "../../shared/ui/card/card.component";
import {NgxPaginationModule} from 'ngx-pagination';
@Component({
  selector: 'app-shop',
  imports: [SectionTitleComponent, CardComponent,NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
total=signal<number>(0)
pageSize=signal<number>(5)
p=signal<number>(1)
  _productService=inject(ProductService)
  productlist=signal<Product[]>([])
  ngOnInit(): void {
this.getProductData()
  }
  getProductData():void{
    this._productService.getProducts().subscribe({
      next: (res) => {
        this.productlist.set(res.data);
        this.total.set(res.results)
        this.p.set(res.metadata.currentPage)
        this.pageSize.set(res.metadata.limit)
      }
    });
  }
  pageChanged(num:number):void{
    this._productService.getProducts(num).subscribe({
      next: (res) => {
        this.productlist.set(res.data);
        this.total.set(res.results)
        this.p.set(res.metadata.currentPage)
        this.pageSize.set(res.metadata.limit)
      }
    });
  }
}

import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { Order } from '../../core/models/order.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe,CommonModule,RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private _cartService = inject(CartService);
  private _PLATFORM_ID = inject(PLATFORM_ID);

  userId = signal<string>('');
  getallOrders = signal<Order[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const data = JSON.parse(localStorage.getItem('setData')!);
      this.userId.set(data.id);
      this.getOrders();
    }
  }

  getOrders() {
    this._cartService.getUserOrder(this.userId()).subscribe({
      next: (res) => {
        this.getallOrders.set(res);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
import { Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private flowbiteService: FlowbiteService) {}
  _authService=inject(AuthService)
  _cartService=inject(CartService)
  _platformId=inject(PLATFORM_ID)
logged=computed(()=> this._authService.isloading())
count=computed(()=> this._cartService.cartCount())
  ngOnInit(): void {

    if(isPlatformBrowser(this._platformId)){
      this.getcurrntacount()
      if(localStorage.getItem('token')){
      this._authService.isloading.set(true);
      }
    }
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  logout():void{
    this._authService.signout();
  }
  getcurrntacount():void{
    this._cartService.getproductcart().subscribe({
      next:(res)=>{
        this._cartService.cartCount.set(res.numOfCartItems);
      }
    })
  }
}

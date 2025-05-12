import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleComponent } from "../title/title.component";

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [RouterModule, TitleComponent],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.css'
})
export class MenusComponent implements OnInit{
  isSticky: boolean = false;
  constructor(){}
  ngOnInit(): void {
    
  }

   // Listen for scroll events and determine when to apply sticky class
   @HostListener('window:scroll', ['$event'])
   onWindowScroll(): void {
     const navbar = document.querySelector('.navbar') as HTMLElement; 
     const stickyPosition = navbar ? navbar.offsetTop : 0;
 
     // Check if the scroll position is beyond the navbar's top position
     this.isSticky = window.pageYOffset > stickyPosition;
   }

}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
   collapsed = signal(false);

  toggleMenu() {
    this.collapsed.update((v) => !v);
    console.log(this.collapsed() , 'FUNCIONAMENTO');
  }

}

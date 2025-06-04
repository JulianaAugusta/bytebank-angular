import { Component, inject, Input, OnInit,signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '@core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatListModule],

})
export class SidebarComponent implements OnInit {

  @Input() collapsed: boolean | null = null;


  authService = inject(AuthService);
  breakpointObserver = inject(BreakpointObserver);



  isMobile = signal(false);
  isMenuOpen = signal(false);

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset, '(max-width: 720px)'])
      .subscribe(result => {
        this.isMobile.set(result.matches);
        if (!result.matches) {
          // Se não for mobile, fecha o menu para evitar bugs
          this.isMenuOpen.set(false);
        }
      });
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  toggleMenuIfMobile() {
    if (this.isMobile()) {
      this.toggleMenu();
    }
  }

  logout() {
    this.authService.logout();
    if (this.isMobile()) {
      this.isMenuOpen.set(false);
    }
  }
}

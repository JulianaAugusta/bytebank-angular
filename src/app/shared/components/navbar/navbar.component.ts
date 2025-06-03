import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '@pages/login/login.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    MatToolbarModule, 
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  breakpointObserver = inject(BreakpointObserver);
  dialog = inject(MatDialog);
  router = inject(Router);
  currentUrl = signal(this.router.url);
  isHomePage = computed(() => this.currentUrl() === '/home');
  isMobile = signal(false);
  isMenuOpen = signal(false);

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentUrl.set(this.router.url);
    });
    this.breakpointObserver.observe([Breakpoints.Handset, '(max-width: 720px)'])
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }
  

  openAccountDialog(signupMode: boolean): void {
    this.dialog.open(LoginComponent, { data: signupMode, height: '80%' });
  }
}

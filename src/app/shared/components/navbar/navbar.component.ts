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
  dialog = inject(MatDialog);
  router = inject(Router);
  currentUrl = signal(this.router.url);
  isHomePage = computed(() => this.currentUrl() === '/home');
  
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentUrl.set(this.router.url);
    });
  }

  openAccountDialog(signupMode: boolean): void {
    const dialogRef = this.dialog.open(LoginComponent, { data: signupMode, height: '80%' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}

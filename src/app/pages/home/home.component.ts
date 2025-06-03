import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from '@pages/login/login.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    FooterComponent,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatIconModule,
    MatInputModule, 
    ReactiveFormsModule,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  breakpointObserver = inject(BreakpointObserver);
  dialog = inject(MatDialog);
  isMobile = signal(false);

  constructor() {
    this.breakpointObserver.observe([Breakpoints.Handset, '(max-width: 720px)'])
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });
  }

  openAccountDialog(signupMode: boolean): void {
    this.dialog.open(LoginComponent, { data: signupMode, height: '80%' });
  }
}

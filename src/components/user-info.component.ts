import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormService } from '../user-form.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h2>User Info</h2>
    <form [formGroup]="forms.basicForm">
      <input type="text" formControlName="name" placeholder="Name"/>
      <input type="number" formControlName="age" placeholder="Age" />

      <h3>Hobbies</h3>
      <div formArrayName="hobbies">
        @for (hobby of forms.hobbies.controls;let i = $index;track $index) {
          <input [formControl]="hobby" />
          <button (click)="forms.removeHobby(i)">🗑️</button>
        }
      </div>
    </form>

    <button class="mt-1" (click)="forms.addHobby()">ADD HOBBIE</button>
  `,
})
export class UserInfoComponent {
  protected readonly forms = inject(UserFormService);
}

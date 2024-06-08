import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormService } from '../user-form.service';

@Component({
  selector: 'app-user-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h2>User Adress</h2>
    <form [formGroup]="forms.addressForm">
      <input type="text" formControlName="street" placeholder="Street" />
      <input type="text" formControlName="city" placeholder="City" />
      <input type="text" formControlName="state" placeholder="State"/>
      <input type="text" formControlName="zip" placeholder="Zip" />
    </form>
  `,
})
export class UserAddressComponent {
  protected readonly forms = inject(UserFormService);
}

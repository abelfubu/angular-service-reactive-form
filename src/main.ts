import {
  Component,
  inject,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormService } from './user-form.service';
import { UserInfoComponent } from './components/user-info.component';
import { UserAddressComponent } from './components/user-address.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UserInfoComponent,
    UserAddressComponent,
    JsonPipe,
  ],
  providers: [UserFormService],
  template: `
    <div class="main-panel">
      <app-user-info />
      <app-user-address />
    </div>

    <button [disabled]="!forms.valid()">Submit</button>

    <div class="main-panel">
      <pre>{{forms.basicForm.value | json}}</pre>
      <pre>{{ forms.addressForm.value | json}}</pre>
    </div>
  `,
  styles: `
    .main-panel {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 2rem 0;
      gap: 2rem;
    }
  `,
})
export class App {
  protected readonly forms = inject(UserFormService);
}

bootstrapApplication(App, {
  providers: [provideExperimentalZonelessChangeDetection()],
});

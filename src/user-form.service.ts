import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { merge, map } from 'rxjs';

@Injectable()
export class UserFormService {
  private readonly fb = inject(FormBuilder);

  readonly basicForm = this.fb.group({
    name: this.fb.nonNullable.control('', Validators.required),
    age: this.fb.nonNullable.control('', Validators.required),
    hobbies: this.fb.array([
      this.fb.nonNullable.control('Soccer'),
      this.fb.nonNullable.control('Basketball'),
    ]),
  });

  readonly addressForm = this.fb.group({
    street: this.fb.nonNullable.control('', Validators.required),
    city: this.fb.control('', Validators.required),
    state: this.fb.control('', Validators.required),
    zip: this.fb.control('', [Validators.min(5), Validators.max(5)]),
  });

  readonly valid = toSignal(
    merge(this.basicForm.statusChanges, this.addressForm.statusChanges).pipe(
      map(() => this.basicForm.valid && this.addressForm.valid)
    ),
    { initialValue: false }
  );

  readonly hobbies = this.basicForm.controls.hobbies;

  addHobby() {
    this.basicForm.controls.hobbies.push(
      this.fb.nonNullable.control('Programming')
    );
  }

  removeHobby(index: number) {
    this.basicForm.controls.hobbies.removeAt(index);
  }
}

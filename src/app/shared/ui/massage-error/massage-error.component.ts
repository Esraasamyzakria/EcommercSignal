import { Component, computed, Input, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-massage-error',
  standalone: true,
  templateUrl: './massage-error.component.html',
})
export class MassageErrorComponent {

  @Input() control!: AbstractControl | null;

  @Input() messages: Record<string, string> = {};

  private defaultMessages: Record<string, string> = {
    required: 'This field is required',
    minlength: 'Too short',
    maxlength: 'Too long',
    email: 'Invalid email',
    pattern: 'Invalid format'
  };
get errorMessage(): string | null {
    if (!this.control || !this.control.touched || !this.control.errors) {
      return null;
    }

    const firstErrorKey = Object.keys(this.control.errors)[0];

    return (
      this.messages[firstErrorKey] ||
      this.defaultMessages[firstErrorKey] ||
      'Invalid field'
    );
  }

}
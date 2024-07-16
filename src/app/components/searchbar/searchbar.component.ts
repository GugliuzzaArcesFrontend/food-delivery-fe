import { Component, effect, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container text-center py-4">
      <div class="row">
        <div class="input-group justify-content-center">
          <div class="form-outline w-75">
              <input 
              type="search"
              placeholder="Cerca negozio"
              [value]="getSearchTerm()"
              (input)="updateSearchTerm($event)"
              class="form-control"
              >
          </div>
        </div>
      </div>
    </div>
   
  `,
  styles: ``
})
export class SearchbarComponent {
  private searchTerm = signal<string>('')
  @Output() searchChange = new EventEmitter<string>();
  constructor() {
    effect(() => {
      this.searchChange.emit(this.searchTerm())
    }
    )
  }
  updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value)
  }
  getSearchTerm(): string {
    return this.searchTerm()
  }
}
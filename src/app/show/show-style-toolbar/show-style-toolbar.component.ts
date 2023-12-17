import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmptyShowStyle, ShowStyle } from '../show-style';

@Component({
  selector: 'slider-show-style-toolbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './show-style-toolbar.component.html',
  styleUrl: './show-style-toolbar.component.css'
})
export class ShowStyleToolbarComponent {
  @Input()
  showStyle: ShowStyle = EmptyShowStyle;


}

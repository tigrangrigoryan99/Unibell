import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioTableComponent } from './audio-table/audio-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AudioTableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Audio player table';
}

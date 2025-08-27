import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioPlayerService } from '../shared/services/audio-player.service';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioPlayerComponent implements OnChanges {
  @ViewChild('audioPlayer', { static: true }) audioPlayer!: ElementRef<HTMLAudioElement>;

  @Input() audioData!: { src: string };

  audioPlayerService = inject(AudioPlayerService);

  ngOnChanges(): void {
    this.updateAudio();
  }

  onAudioEnded(): void {
    setTimeout(() => {
      this.audioPlayerService.togglePlayer(false);
      this.audioPlayerService.setRowId(null);
    }, 700);
  }

  private updateAudio(): void {
    const audio: HTMLAudioElement = this.audioPlayer.nativeElement;
    audio.load();
    audio.play();
  }
}

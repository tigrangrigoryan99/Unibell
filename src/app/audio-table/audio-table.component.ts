import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FreeSoundService } from '../shared/services/freesound.service';
import { SpinnerService } from '../shared/services/spinner.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize, skip } from 'rxjs';
import { SpinnerComponent } from '../shared/components/spinner/spinner.component';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';
import { AudioPlayerService } from '../shared/services/audio-player.service';
import { IAudioRecord } from '../shared/interfaces/audio-record.interface';

@UntilDestroy()
@Component({
  selector: 'app-audio-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    AudioPlayerComponent,
    SpinnerComponent,
  ],
  templateUrl: './audio-table.component.html',
  styleUrls: ['./audio-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioTableComponent implements OnInit, OnDestroy {
  audioRecords: IAudioRecord[] = [];
  displayedColumns: string[] = ['id', 'name', 'fileName'];
  audioData!: { src: string };
  audioPlayIsHidden = true;

  constructor(
    private freeSoundService: FreeSoundService,
    private cdr: ChangeDetectorRef,
    public spinnerService: SpinnerService,
    public audioPlayerService: AudioPlayerService
  ) {}

  ngOnInit(): void {
    this.spinnerService.toggleSpinner(true);
    this.freeSoundService
      .getSounds()
      .pipe(
        untilDestroyed(this),
        finalize(() => {
          this.spinnerService.toggleSpinner(false);
          this.cdr.markForCheck();
        })
      )
      .subscribe((resalts: IAudioRecord[]) => {
        this.audioRecords = resalts;
        this.cdr.markForCheck();
      });

    this.subscribeToSubjectChanges();
  }

  ngOnDestroy(): void {}

  playAudio(record: IAudioRecord): void {
    if(record.playerSrc) {
        this.audioData = { src: record.playerSrc };
        this.audioPlayerService.setRowId(record.id);
        this.audioPlayIsHidden && this.audioPlayerService.togglePlayer(true);
        this.cdr.markForCheck();
    }
  }

  private subscribeToSubjectChanges(): void {
    this.audioPlayerService.showAudioPlayer$
      .pipe(untilDestroyed(this), skip(1))
      .subscribe((value: boolean) => (this.audioPlayIsHidden = !value));
  }
}

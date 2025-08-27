import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  private showAudioPlayer: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private selectedRowId: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  
  showAudioPlayer$: Observable<boolean> = this.showAudioPlayer.asObservable();
  selectedRowId$: Observable<number | null> = this.selectedRowId.asObservable();

  togglePlayer(condition: boolean): void {
    this.showAudioPlayer.next(condition);
  }

  setRowId(id: number | null): void {
    this.selectedRowId.next(id);
  }
}

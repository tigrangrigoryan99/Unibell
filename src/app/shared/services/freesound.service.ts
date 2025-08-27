import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { IResults, ISounds } from '../interfaces/sounds.interface';
import { IAudioRecord } from '../interfaces/audio-record.interface';
import { API_URL } from 'src/app/app.config';

@Injectable({ providedIn: 'root' })
export class FreeSoundService {
  constructor(private http: HttpClient) {}

  getSounds(): Observable<IAudioRecord[]> {
    return this.http.get<ISounds>(`${API_URL}`).pipe(
      map((response: ISounds) =>
        response.results.map((result: IResults) => ({
          id: result.id,
          name: result.name,
          fileName: result.previews?.['preview-hq-mp3'] ?? 'Аудиофайл не доступен !',
          playerSrc: result.previews?.['preview-hq-mp3'] ?? '',
          validMp3: !!result.previews?.['preview-hq-mp3'],
        }))
      )
    );
  }
}

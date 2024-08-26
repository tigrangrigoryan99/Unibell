import {
  provideHttpClient,
  withInterceptors,
  HttpInterceptorFn,
  HttpParams,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

import { IParams } from './shared/interfaces/params.interface';

export const API_URL = 'https://freesound.org/apiv2/search/text/';

const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const params: IParams = {
    apiKey: 'kQI4DHk6fnFdqgaIVHIYjIfkdoMhGS2mLxw8sF0j',
    query: 'classic',
    page_size: '4',
    fields: 'id,name,previews',
  };

  const clonedRequest = req.clone({
    params: new HttpParams()
      .set('token', params.apiKey)
      .set('query', params.query)
      .set('page_size', params.page_size)
      .set('fields', params.fields),
  });

  return next(clonedRequest);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([apiKeyInterceptor])),
  ],
};

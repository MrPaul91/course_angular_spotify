import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
//Injectable este servicio se va a poder inyectar en otros componentes.
/*
@Injectable()
*/

//Aca no es necesario en providers, por el nuevo update.
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  constructor(private http: HttpClient) {
  }

  getQuery( query: string){

    const URL: string = `https://api.spotify.com/v1/${ query }`;
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCYKJh6LXkZ0NWZwlWOvj73wltpkmfdJTfuRoInniHz05dH_7yUdSebN8pud3opdseTAe2VPHEZeNCeAtA'
    });

    return this.http.get(URL, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').
      pipe(map( data => data['albums'].items ));
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).
     pipe(map( data =>data['artists'].items ));
  }

  getArtista(idArtista: string) {
    return this.getQuery(`artists/${idArtista}`);
     //pipe(map( data =>data['artists'].items ));
  }
  

  getTopTracks(idArtista: string) {
    return this.getQuery(`artists/${idArtista}/top-tracks?country=us`)
          .pipe(map( data =>data['tracks']));
  }



}

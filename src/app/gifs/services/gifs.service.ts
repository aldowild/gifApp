import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apikeyGif:string = 'KCEfiFVADFN9EXPFl35LSqif9oizCLgT';
  private servicioUrl:string = 'https://api.giphy.com/v1/gifs';
  private _historial:string[] = []

  //TODO: Cambiar any por tipo correspondiente
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient ){
    
      this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];

      //resultados
      this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];

  }

  buscarGifs( query:string = '' ){
    
    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial) );
    }

// const resp= await fetch('https://media0.giphy.com/media/GRSnxyhJnPsaQy9YLn/giphy.gif?cid=9048353fnrtovilhifi09vd03bo0zw2fpebvjadttov2g4tv&rid=giphy.gif&ct=g')
// const data = await resp.json();    
// console.log(data);

  const params = new HttpParams()
    .set('api_key',this.apikeyGif)
    .set('limit',10)
    .set('q',query)
    .set('rating','g')

console.log(params);

    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`,{ params: params }) 
      .subscribe((resp)=>{
        console.log(resp.data);
        this.resultados = resp.data; 
        localStorage.setItem('resultados', JSON.stringify( this.resultados) );       
      });

  }

  
}

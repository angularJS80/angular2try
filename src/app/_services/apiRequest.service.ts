/**
 * Refby GitHub
 * Modify by cho.yong-beom on 2017-11-18.
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, URLSearchParams,RequestMethod } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import {promise} from "selenium-webdriver";
//import { UserInfoService } from './user-info.service';

@Injectable()
export class ApiRequestService {

  //private baseApiPath:string = "https://211.249.60.229:8443/hero";
  private baseApiPath:string = "http://localhost/hero";
  constructor(
    private http: Http,
    //private userInfoService:UserInfoService,
    private router:Router

  ) { }

  appendAuthHeader():Headers {
    let headers = new Headers({'Content-Type': 'application/json'});
  //  let token = this.userInfoService.getStoredToken();
    let token:string =null;
    if(JSON.parse(localStorage.getItem('currentUser'))){
        token = JSON.parse(localStorage.getItem('currentUser')).token;
    }

    if (token !==null) {
      headers.append("Authorization", token);
    }
    return headers;
  }

  getRequestOptions(requestMethod, url:string, urlParam?:URLSearchParams, body?:Object):RequestOptions {
    let options = new RequestOptions({
      headers: this.appendAuthHeader(),
      method : requestMethod,
      url    : this.baseApiPath + url
    });
    if (urlParam){
      options = options.merge({ params: urlParam});
    }
    if (body){
      options = options.merge({body: JSON.stringify(body)});
    }
    return options;
  }

  get(url:string, urlParams?:URLSearchParams):Observable<any>{
    let me = this;
    let requestOptions = this.getRequestOptions(RequestMethod.Get, url, urlParams);
    return this.http.request(new Request(requestOptions))
      .catch(function(error:any){
        if (error.status === 401 || error.status === 403){
          me.router.navigate(['/logout']);
        }
        return Observable.throw(error || 'Server error')
      });
  }

  post(url:string, body:Object):Observable<any>{
    console.log(url);
    console.log(body);
    let me = this;
    let requestOptions = this.getRequestOptions(RequestMethod.Post, url, undefined, body);
    console.log(this.http.request(this.baseApiPath+url,requestOptions));
    return this.http.post(this.baseApiPath+url,requestOptions);
   /*.catch(function(error:any){
        return Observable.throw(error || 'Server error')
      });*/

    //return this.http.request(this.baseApiPath+url,requestOptions);
  }

  request(url:string, body:Object):Observable<any>{
    console.log(url);
    console.log(body);
    let me = this;
    let requestOptions = this.getRequestOptions(RequestMethod.Post, url, undefined, body);
    console.log(this.http.request(this.baseApiPath+url,requestOptions));
    return this.http.request(new Request(requestOptions));
    /*.catch(function(error:any){
     return Observable.throw(error || 'Server error')
     });*/

    //return this.http.request(this.baseApiPath+url,requestOptions);
  }

  put(url:string, body:Object):Observable<any>{
    let me = this;
    let requestOptions = this.getRequestOptions(RequestMethod.Put, url, undefined, body);
    return this.http.request(new Request(requestOptions))
      .catch(function(error:any){
        if (error.status === 401){
          me.router.navigate(['/logout']);
        }
        return Observable.throw(error || 'Server error')
      });
  }

  delete(url:string):Observable<any>{
    let me = this;
    let requestOptions = this.getRequestOptions(RequestMethod.Delete, url);
    return this.http.request(new Request(requestOptions))
      .catch(function(error:any){
        if (error.status === 401){
          me.router.navigate(['/logout']);
        }
        return Observable.throw(error || 'Server error')
      });
  }
}
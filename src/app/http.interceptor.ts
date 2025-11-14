/* 
* AMRIT – Accessible Medical Records via Integrated Technology 
* Integrated EHR (Electronic Health Records) Solution 
*
* Copyright (C) "Piramal Swasthya Management and Research Institute" 
*
* This file is part of AMRIT.
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see https://www.gnu.org/licenses/.
*/


/*
 * Created by Pankush Manchanda 10,August 2017
 * Http Interceptor to add diffrent function to http request like passing option in every request
 * Advantage : Used to remove the code duplication
 */
import { Injectable } from "@angular/core";
import {
  ConnectionBackend,
  RequestOptions,
  Request,
  RequestOptionsArgs,
  Response,
  Http,
  Headers,
} from "@angular/http";
import { BehaviorSubject, Observable } from "rxjs/Rx";
import { environment } from "../environments/environment";
import { LoaderService } from "./services/common/loader.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { AuthService } from "./services/authentication/auth.service";
import { ConfirmationDialogsService } from "./services/dialog/confirmation.service";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { SocketService } from "./services/socketService/socket.service";
import { sessionStorageService } from "./services/sessionStorageService/session-storage.service";

@Injectable()
export class InterceptedHttp extends Http {
  onlineFlag: boolean = true;
  count = 0;
  dologout: any;

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private loaderService: LoaderService,
    private router: Router,
    private authService: AuthService,
    private message: ConfirmationDialogsService,
    private socketService: SocketService,
    private sessionstorage:sessionStorageService,
  ) {
    super(backend, defaultOptions);
  }
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    // url = this.updateUrl(url);
    let URL = this.updateURL(url);

    if (this.networkCheck()) {
      this.showLoader();
      return super
        .get(URL, this.getRequestOptionArgs(options))
        .catch(this.onCatch)
        .do(
          (res: Response) => {
            this.onSuccess(res);
          },
          (error: any) => {
            this.onError(error);
          }
        )
        .finally(() => {
          this.onEnd();
        });
    } else {
      return Observable.empty();
    }
  }

  post(
    url: string,
    body: any,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    let URL = this.updateURL(url);
    if (this.networkCheck()) {
      this.showLoader();
      return super
        .post(URL, body, this.getRequestOptionArgs(options))
        .catch(this.onCatch)
        .do(
          (res: Response) => {
            this.onSuccess(res);
          },
          (error: any) => {
            this.onError(error);
          }
        )
        .finally(() => {
          this.onEnd();
        });
    } else {
      return Observable.empty();
    }
  }

  put(
    url: string,
    body: any,
    options?: RequestOptionsArgs
  ): Observable<Response> {
    // url = this.updateUrl(url);
    if (this.networkCheck()) {
      return super
        .put(url, body, this.getRequestOptionArgs(options))
        .catch(this.onCatch)
        .do(
          (res: Response) => {
            this.onSuccess(res);
          },
          (error: any) => {
            this.onError(error);
          }
        )
        .finally(() => {
          this.onEnd();
        });
    } else {
      return Observable.empty();
    }
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    // url = this.updateUrl(url);
    if (this.networkCheck()) {
      return super
        .delete(url, this.getRequestOptionArgs(options))
        .catch(this.onCatch)
        .do(
          (res: Response) => {
            this.onSuccess(res);
          },
          (error: any) => {
            this.onError(error);
          }
        )
        .finally(() => {
          this.onEnd();
        });
    } else {
      return Observable.empty();
    }
  }

  // private updateUrl(req: string) {
  //     return environment.origin + req;
  // }

  private updateURL(url) {
    if (
      sessionStorage.getItem("apiman_key") != undefined &&
      sessionStorage.getItem("apiman_key") != null
    ) 
    {
      url = url + "?apikey=" + sessionStorage.getItem("apiman_key");
      return url;
    } else {
      return url;
    }
  }

  private getRequestOptionArgs(
    options?: RequestOptionsArgs
  ): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append("Content-Type", "application/json");
    options.headers.append("Authorization", this.authService.getToken());
    return options;
  }
  private onEnd(): void {
    this.hideLoader();
  }
  private onSuccess(response: any) {
    if (response.json().data) {
      return response;
    } else if (response.json().statusCode === 5002) {
      //    this.authService.cZentrixLogout();
      if (
        response.json().errorMessage ===
        "You are already logged in,please confirm to logout from other device and login again"
      ) {
        this.message
          .confirm("info", response.json().errorMessage)
          .subscribe((confirmResponse) => {
            if (confirmResponse) {
              this.dologoutUsrFromPreSession(true);
            }
          });
      } else {
        sessionStorage.removeItem("key");
        sessionStorage.removeItem("onCall");
        sessionStorage.removeItem("CLI");
        sessionStorage.removeItem("service");
        this.router.navigate([""]);
        this.message.alert(response.json().errorMessage,"error");
        this.authService.removeToken();
        // this.socketService.logOut();
        return Observable.empty();
      }
    } else {
      throw response;
    }
  }
  private onError(error: any) {
    this.hideLoader();
    return error;
  }
  private showLoader(): void {
    //    console.log('show loader');
    this.loaderService.show();
  }
  private hideLoader(): void {
    //   console.log('Loader hide')
    this.loaderService.hide();
  }
  private onCatch(
    error: any,
    caught?: Observable<Response>
  ): Observable<Response> {
    return Observable.throw(error);
  }
  private networkCheck(): boolean {
    if (!this.onlineFlag) {
      if (this.count === 0) {
        this.message.alert("You are offline. Please check");
        this.count++;
      }
      return false;
    } else {
      this.count = 0;
      return true;
    }
  }
  /*
    JA354063 - Purpose - If the user didn't log out from the application, directly closed the browser and the same user tried to login
    through diff browser.
    */

  logoutUserFromPreviousSession = new BehaviorSubject(this.dologout);
  logoutUserFromPreviousSessions$ =
    this.logoutUserFromPreviousSession.asObservable();
  dologoutUsrFromPreSession(dologout) {
    this.dologout = dologout;
    this.logoutUserFromPreviousSession.next(dologout);
  }
}

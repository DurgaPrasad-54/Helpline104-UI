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


import { Component, OnInit } from "@angular/core";
import { dataService } from "../services/dataService/data.service";
import { Router } from "@angular/router";
import { CzentrixServices } from "../services/czentrix/czentrix.service";
import { ConfirmationDialogsService } from "./../services/dialog/confirmation.service";
declare var jQuery: any;
import { DomSanitizer } from "@angular/platform-browser";
import { PlatformLocation } from "@angular/common";
import { ConfigService } from "../services/config/config.service";
import { ListnerService } from "./../services/common/listner.service";
import { Subscription } from "rxjs/Subscription";
import { loginService } from "../services/loginService/login.service";
import { AuthService } from "../services/authentication/auth.service";
import { SocketService } from "../services/socketService/socket.service";
import { EmergencyContactsViewModalComponent } from "../emergency-contacts-view-modal/emergency-contacts-view-modal.component";
import { MdDialog } from "@angular/material";
import { AgentForceLogoutComponent } from "../agent-force-logout/agent-force-logout.component";
import { ViewVersionDetailsComponent } from "../view-version-details/view-version-details.component";
import { HttpServices } from "../services/http-services/http_services.service";
import { SetLanguageComponent } from "app/set-language.component";
import { sessionStorageService } from "app/services/sessionStorageService/session-storage.service";

@Component({
  selector: "app-multi-role-screen",
  templateUrl: "./multi-role-screen.component.html",
  styleUrls: ["./multi-role-screen.component.css"],
})
export class MultiRoleScreenComponent implements OnInit {
  current_role: any;
  current_service: any;
  id: any;
  ctiHandlerURL: any;
  barMinimized: boolean = true;
  subscription: Subscription;
  hideBar: boolean = false;
  hideHeader: boolean = true;
  label = "Role Selection";
  showContacts: boolean;
  licenseURL: String =
    this.configService.getCommonBaseURLLicense() + "license.html";
  api_versionDetails: any;
  version: any;
  uiVersionDetails: any;
  commitDetailsPath: any = "assets/git-version.json";
  commitDetails: any;
  languageArray: any;
  language_file_path: any = "./assets/";
  currentLanguageSet: any;
  app_language: any;

  constructor(
    private sessionstorage:sessionStorageService,
    private message: ConfirmationDialogsService,
    private authService: AuthService,
    public getCommonData: dataService,
    public router: Router,
    location: PlatformLocation,
    private czentrixServices: CzentrixServices,
    public sanitizer: DomSanitizer,
    private configService: ConfigService,
    private listnerService: ListnerService,
    private loginService: loginService,
    private socketService: SocketService,
    private dialog: MdDialog,
    public HttpServices: HttpServices
  ) {
    this.subscription = this.listnerService.cZentrixGetData().subscribe(
      (flag) => {
        this.hideCZentix(flag);
      },
      (err) => {}
    );

    location.onPopState((e: any) => {
      console.log(e);
      window.history.forward();
    });
  }

  data: any;
  ngOnInit() {
    this.assignSelectedLanguage();

    this.data = this.getCommonData.Userdata;
    // this.router.navigate(['/MultiRoleScreenComponent', { outlets: { 'postLogin_router': [''] } }]);
    this.current_role = this.getCommonData.current_role
      ? this.getCommonData.current_role.RoleName
      : "";
    this.current_service = this.getCommonData.current_service
      ? this.getCommonData.current_service.serviceName
      : "";
    this.id = this.getCommonData.agentID
      ? this.getCommonData.agentID
      : this.getCommonData.Userdata.agentID
      ? this.getCommonData.Userdata.agentID
      : undefined;
    this.getCommonData.roleSelected.subscribe((obj) => {
      this.id = obj["id"];
      this.current_role = obj["role"];
      this.current_service = obj["service"];
    });
    this.hideHeader = true;
    jQuery("#db_label").hide();

    const url =
      this.configService.getTelephonyServerURL() + "bar/cti_handler.php";
    this.ctiHandlerURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.getCommonData.sendHeaderStatus.subscribe((data) => {
      this.setHeaderName(data);
    });

    jQuery(document).ready(function () {
      jQuery('[data-toggle="tooltip"]').tooltip();
    });
    this.getCommitDetails();
    this.fetchLanguageSet();
  }
  ngDoCheck() {
    this.assignSelectedLanguage();
  }

  assignSelectedLanguage() {
		const getLanguageJson = new SetLanguageComponent(this.HttpServices);
		getLanguageJson.setLanguage();
		this.currentLanguageSet = getLanguageJson.currentLanguageObject;
    this.app_language=this.getCommonData.appLanguage;
    // this.label=this.currentLanguageSet.roleSelection;
	  }

  setHeaderName(data) {
    this.label = data;
    if (this.label.includes("Dashboard")) {
      this.showContacts = true;
    } else {
      this.showContacts = false;
    }
  }
  getServiceRole(value: any) {
    console.log(value);
  }
  toggleBar() {
    if (this.barMinimized) this.barMinimized = false;
    else this.barMinimized = true;
  }
  minimizeBar() {
    this.barMinimized = true;
  }
  logOut() {
    // if (this.getCommonData.ipAddress === undefined || this.getCommonData.ipAddress === '') {
    //   this.czentrixServices.getIpAddress(this.getCommonData.agentID).subscribe((res) => {
    //     this.ipSuccessLogoutHandler(res.response.agent_ip);
    //   }, (err) => {
    //     this.message.alert(err.errorMessage);
    //   });
    // } else {
    this.ipSuccessLogoutHandler();
    // }
  }
  ipSuccessLogoutHandler() {
    this.czentrixServices.agentLogout(this.getCommonData.agentID, "").subscribe(
      (res) => {
        this.sessionstorage.removeItem("key");
        this.sessionstorage.removeItem("onCall");
        this.sessionstorage.removeItem("setLanguage");
        this.getCommonData.appLanguage="English";
        this.loginService
          .userLogout()
          .subscribe((response) => this.handleSuccess(response));
          this.router.navigate([['/feedback'], { queryParams: { sl: '104' } }]);
        this.authService.removeToken();
        // this.socketService.logOut();
      },
      (err) => {
        this.sessionstorage.removeItem("key");
        this.sessionstorage.removeItem("onCall");
        this.sessionstorage.removeItem("setLanguage");
        this.getCommonData.appLanguage="English";
        this.loginService
          .userLogout()
          .subscribe((response) => this.handleSuccess(response));
          this.router.navigate([['/feedback'], { queryParams: { sl: '104' } }]);
        this.authService.removeToken();
        // this.socketService.logOut();
      }
    );
  }
  handleSuccess(res) {
    console.log("redis token removed");
  }
  hideCZentix(flag: any) {
    if (flag.eventCzentrix.hideBar === true) {
      this.hideBar = false;
    } else if (flag.eventCzentrix.innerPage === true) {
      this.hideHeader = false;
    } else if (flag.eventCzentrix.innerPage === false) {
      this.hideHeader = true;
    } else if (flag.eventCzentrix.hideBar === false) {
      const url =
        this.configService.getTelephonyServerURL() +
        "bar/cti_handler.php?e=" +
        flag.eventCzentrix.agentId;
      this.ctiHandlerURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.hideBar = true;
    }
  }
  showEmergencyContacts() {
    this.dialog.open(EmergencyContactsViewModalComponent, {
      width: "700px",
      //height: '550px'
      disableClose: false,
    });
  }

  agentForceLogout() {
    this.dialog.open(AgentForceLogoutComponent, {
      width: "500px",
      disableClose: false,
    });
  }
  getCommitDetails() {
    this.HttpServices.getCommitDetails(this.commitDetailsPath).subscribe(
      (res) => this.successhandeler(res),
      (err) => this.successhandeler(err)
    );
  }
  successhandeler(response) {
    this.commitDetails = response;
    this.uiVersionDetails = {
      Version: this.commitDetails["version"],
      Commit: this.commitDetails["commit"],
    };
  }
  viewVersionDetails() {
    this.loginService.getApiVersionDetails().subscribe((apiResponse) => {
      console.log("apiResponse", apiResponse);
      if (apiResponse.statusCode == 200) {
        let api_versionDetails = {
          Version: apiResponse.data["git.build.version"],
          Commit: apiResponse.data["git.commit.id"],
        };
        if (api_versionDetails) {
          this.openVersionDialogComponent(api_versionDetails);
        }
      }
    }),
      (err) => {
        console.log(err, "error");
      };
  }
  openVersionDialogComponent(api_versionDetails) {
    this.dialog.open(ViewVersionDetailsComponent, {
      width: "80%",
      data: {
        uiversionDetails: this.uiVersionDetails,
        api_versionDetails: api_versionDetails,
      },
    });
  }

  /*Methods for multilingual implementation*/
  fetchLanguageSet() {
    this.HttpServices.fetchLanguageSet().subscribe((languageRes) => {
      this.languageArray = languageRes;
      this.getLanguage();
    });
  }

  getLanguage() {
    if (this.sessionstorage.getItem("setLanguage") != null) {
      this.changeLanguage(this.sessionstorage.getItem("setLanguage"));
    } else {
      this.changeLanguage(this.app_language);
    }
  }

  changeLanguage(language) {
    this.HttpServices.getLanguage(
      this.language_file_path + language + ".json"
    ).subscribe(
      (response) => {
        if (response) {
          this.languageSuccessHandler(response, language);
        } else {
          alert(this.currentLanguageSet.languageNotDefined);
        }
      },
      (error) => {
        alert(this.currentLanguageSet.weAreComingUpWithThisLanguage + " " + language);
      }
    );
  }

  languageSuccessHandler(response, language) {
    if (!this.checkForNull(response)) {
    alert(this.currentLanguageSet.weAreComingUpWithThisLanguage + " " + language);
    return;
    }
    console.log("language is ", response);
    this.currentLanguageSet = response[language];
    this.sessionstorage.setItem("setLanguage", language);
    if (this.currentLanguageSet) {
    this.languageArray.forEach((item) => {
    if (item.languageName === language) {
    this.app_language = language;
    this.getCommonData.appLanguage=language;
    }
    });
    } else {
    this.app_language = language;
    this.getCommonData.appLanguage=language;
    }
    this.HttpServices.getCurrentLanguage(response[language]);
    }
  checkForNull(languageResponse) {
    return languageResponse !== undefined && languageResponse !== null;
  }

  setLangugage() {
    const languageSubscription = this.HttpServices.currentLangugae$.subscribe((languageResponse) => {
      if (!this.checkForNull(languageResponse)) {
        return;
      }
      this.currentLanguageSet = languageResponse;
    },
    (err) => { console.log(err); },
    () => { console.log('completed')});
    languageSubscription.unsubscribe();
  }
  /*END - Methods for multilingual implementation*/
}

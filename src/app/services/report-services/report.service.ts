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


import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { SecurityInterceptedHttp } from '../../http.securityinterceptor';
import { InterceptedHttp } from '../../http.interceptor';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class ReportService {
  headers = new Headers(
    {'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    'Authorization': this.authService.getToken()
  }
   );
   
  options = new RequestOptions({ headers: this.headers , responseType: ResponseContentType.Blob });

  constructor(private interceptedHTTP: InterceptedHttp, private _http: SecurityInterceptedHttp, private _config: ConfigService,
    private httpReport: Http,  private authService: AuthService) { }
  _104baseUrl = this._config.get104BaseURL();
  _commonBaseUrl = this._config.getCommonBaseURL();

  getROSummaryReportByDate_url = this._104baseUrl + 'crmReports/getROSummaryReportByDate';
  getHAOSummaryReportByDate_url = this._104baseUrl + 'crmReports/getHAOSummaryReportByDate';
  getMOSummaryReportByDate_url = this._104baseUrl + 'crmReports/getMOSummaryReportByDate';
  getCOSummaryReportByDate_url = this._104baseUrl + 'crmReports/getCOSummaryReportByDate';
  getPDSummaryReportByDate_url = this._104baseUrl + 'crmReports/getPDSummaryReportByDate';
  getEpidemicReportByDate_url = this._104baseUrl + 'crmReports/getEpidemicReportByDate';
  getFoodSafetyReportByDate_url = this._104baseUrl + 'crmReports/getFoodSafetyReportByDate';
  getBloodOnCallReportByDate_url = this._104baseUrl + 'crmReports/getBloodOnCallReportByDate';
  getOrganDonationReportByDate_url = this._104baseUrl + 'crmReports/getOrganDonationReportByDate';
  getGrievanceReportByDate_url = this._104baseUrl + 'crmReports/getGrievanceReportByDate';
  getDirectoryServiceReportByDate_url = this._104baseUrl + 'crmReports/getDirectoryServiceReportByDate';
  getSchemesReportByDate_url = this._104baseUrl + 'crmReports/getSchemesReportByDate';
  getPrescriptionReportByDate_url = this._104baseUrl + 'crmReports/getPrescriptionReportByDate';

  getCallQualityReportByDate_url = this._commonBaseUrl + 'crmReports/getCallQualityReport';
  getUnblockUserReportByDate_url = this._commonBaseUrl + 'crmReports/getUnblockedUserReport';
  getComplaintDetailsReportByDate_url = this._commonBaseUrl + 'crmReports/getComplaintDetailReport';
  getDistrictWiseCallVolumeReportByDate_url = this._commonBaseUrl + 'crmReports/getDistrictWiseCallReport';
  getBloodOnCallDetailedReportByDate_url = this._104baseUrl + 'crmReports/getBloodOnCallCountReportByDate';
  getMentalHealthReportByDate_url = this._104baseUrl + 'crmReports/getMentalHealthReport';
  getMedicalAdviseReportByDate_url = this._104baseUrl + 'crmReports/getMedicalAdviseReport';

  getCDIResponseReport_url = this._104baseUrl +'crmReports/getCDIResponseReport';

  getFeedbackTypesURL = this._commonBaseUrl + 'feedback/getFeedbackType';
  getFeedbackNatureURL = this._104baseUrl + 'beneficiary/get/natureOfComplaintTypes';

  getCallTypesURL = this._commonBaseUrl + 'call/getCallTypes';
  getUsersURL = this._commonBaseUrl + 'user/getAgentByRoleID';
  getWorkLocationsURL = this._commonBaseUrl + 'user/getLocationsByProviderID';
  getRolesURL = this._commonBaseUrl + 'user/getRolesByProviderID';
  getDistrictsURL = this._commonBaseUrl + 'location/districts/';
  getSubDistrictsURL = this._commonBaseUrl + 'location/taluks/';
  getVillagesURL = this._commonBaseUrl + 'location/village/';
  getQualityReportByDate_url = this._commonBaseUrl + 'crmReports/getQualityReport';
  getCallSummaryReportByDate_url = this._commonBaseUrl + 'crmReports/getCallSummaryReport';
  getReportTypeMaster_url=this._commonBaseUrl +'crmReports/getReportTypes/';
  getROSummaryReportByDate(data) {

   
    return this.httpReport
      .post(this.getROSummaryReportByDate_url, data, this.options)
      .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getROSummaryReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getHAOSummaryReportByDate(data) {
    return this.httpReport
    .post(this.getHAOSummaryReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getHAOSummaryReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getMOSummaryReportByDate(data) {
    return this.httpReport
    .post(this.getMOSummaryReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getMOSummaryReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getCOSummaryReportByDate(data) {
    return this.httpReport
    .post(this.getCOSummaryReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getCOSummaryReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getPDSummaryReportByDate(data) {
 
    return this.httpReport
    .post(this.getPDSummaryReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getPDSummaryReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getEpidemicReportByDate(data) {

    return this.httpReport
    .post(this.getEpidemicReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getEpidemicReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getFoodSafetyReportByDate(data) {
    return this.httpReport
    .post(this.getFoodSafetyReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());
    
    // return this.interceptedHTTP.post(this.getFoodSafetyReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getBloodOnCallReportByDate(data) {
    return this.httpReport
      .post(this.getBloodOnCallReportByDate_url, data, this.options)
      .map(res => <Blob>res.blob());
  }

  getOrganDonationReportByDate(data) {

    return this.httpReport
    .post(this.getOrganDonationReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getOrganDonationReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getGrievanceReportByDate(data) {
    return this.httpReport
    .post(this.getGrievanceReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getGrievanceReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getDirectoryServiceReportByDate(data) {
    return this.httpReport
    .post(this.getDirectoryServiceReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getDirectoryServiceReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getSchemesReportByDate(data) {
    return this.httpReport
    .post(this.getSchemesReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());
    // return this.interceptedHTTP.post(this.getSchemesReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getPrescriptionReportByDate(data) {
    return this.httpReport
    .post(this.getPrescriptionReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getPrescriptionReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getCallQualityReport(data) {
    return this.httpReport
    .post(this.getCallQualityReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());
    // return this.interceptedHTTP.post(this.getCallQualityReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getUnblockUserReport(data) {
    return this.httpReport
    .post(this.getUnblockUserReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());
  }

  getFeedbackTypes(data) {
    return this._http.post(this.getFeedbackTypesURL, data)
      .map((response: Response) => response.json()).catch((error) => Observable.throw(error.json()));
  }

  getFeedbackNature(data) {
    return this._http.post(this.getFeedbackNatureURL, data)
      .map((response: Response) => response.json()).catch((error) => Observable.throw(error.json()));
  }

  getComplaintDetailsReport(data) {
    return this.httpReport
    .post(this.getComplaintDetailsReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getComplaintDetailsReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getDistrictWiseCallVolumeReport(data) {
    return this.httpReport
    .post(this.getDistrictWiseCallVolumeReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());
    // return this.interceptedHTTP.post(this.getDistrictWiseCallVolumeReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getBloodOnCallDetailedReport(data) {
    return this.httpReport
    .post(this.getBloodOnCallDetailedReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getBloodOnCallDetailedReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getMentalHealthReport(data) {
    return this.httpReport
    .post(this.getMentalHealthReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getMentalHealthReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getMedicalAdviseReport(data) {

    return this.httpReport
    .post(this.getMedicalAdviseReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getMedicalAdviseReportByDate_url, data)
    // .map(this.extractData)
    // .catch(this.handleError);
  }

  getCDIResponseReport (data){
    return this.httpReport
    .post(this.getCDIResponseReport_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getCDIResponseReport_url,data).map(this.extractData).catch(this.handleError);
  }

  getCallTypes(data) {
    return this._http.post(this.getCallTypesURL, data)
      .map((response: Response) => response.json()).catch((error) => Observable.throw(error.json()));
  }

  getUsers(data) {
    return this._http.post(this.getUsersURL, data)
      .map((response: Response) => response.json()).catch((error) => Observable.throw(error.json()));
  }

  getWorkLocations(data) {
    return this._http.post(this.getWorkLocationsURL, data)
      .map((response: Response) => response.json()).catch((error) => Observable.throw(error.json()));
  }

  getRoles(data) {
    return this._http.post(this.getRolesURL, data)
      .map((response: Response) => response.json()).catch((error) => Observable.throw(error.json()));
  }

  getDistricts(stateId: number) {
    return this._http.get(this.getDistrictsURL + stateId)
      .map((response: Response) => response.json()).catch((error) => Observable.throw(error.json()));
  }

  getSubDistricts(districtID: number) {
    return this._http.get(this.getSubDistrictsURL + districtID)
      .map((response: Response) => response.json()).catch((error) => Observable.throw(error.json()));
  }

  getVillages(subDistrictID: number) {
    return this._http.get(this.getVillagesURL + subDistrictID)
      .map((response: Response) => response.json()).catch((error) => Observable.throw(error.json()));
  }

  getQualityReport(data) {
    return this.httpReport
    .post(this.getQualityReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getQualityReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }

  getCallSummaryReport(data) {
    return this.httpReport
    .post(this.getCallSummaryReportByDate_url, data, this.options)
    .map(res => <Blob>res.blob());

    // return this.interceptedHTTP.post(this.getCallSummaryReportByDate_url, data)
    //   .map(this.extractData)
    //   .catch(this.handleError);
  }
  getReportTypes(psmId:Number) {
    return this._http.get(this.getReportTypeMaster_url + psmId)
      .map((response: Response) => response.json()).catch((error) => Observable.throw(error.json()));
  }

  private extractData(response: Response) {
    if (response.json().data) {
      return response.json().data;
    } else {
      return Observable.throw(response.json());
    }
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.json());
  };
}

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


import {
  Component,
  SimpleChanges,
  OnInit,
  EventEmitter,
  Input,
  Output,
  Inject,
  OnChanges,
  ViewChild,
} from "@angular/core";
import { SearchService } from "../services/searchBeneficiaryService/search.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CallServices } from "../services/callservices/callservice.service";
import { CallerService } from "../services/common/caller.service";
import { UserBeneficiaryData } from "../services/common/userbeneficiarydata.service";
import { PrescriptionService } from "../services/prescriptionServices/prescription.service";
import { MdDialog, MdDialogRef } from "@angular/material";
import { MD_DIALOG_DATA } from "@angular/material";
declare var jQuery: any;
import { NgForm, FormGroup, FormBuilder } from "@angular/forms";
import { FeedbackResponseModel } from "../sio-grievience-service/sio-grievience-service.component";
import { dataService } from "../services/dataService/data.service";
import { ConfirmationDialogsService } from "./../services/dialog/confirmation.service";
import { LocationService } from "../services/common/location.service";
import { PlatformLocation } from "@angular/common";
import { CaseSheetService } from "../services/caseSheetService/caseSheet.service";
import { CaseSheetRecentPrescription } from "../case-sheet/case-sheet.component";
import { SmsTemplateService } from "./../services/supervisorServices/sms-template-service.service";
import deepDiff from "return-deep-diff";
import { log } from "util";
import * as moment from "moment";
import { HttpServices } from "../services/http-services/http_services.service";
import { SetLanguageComponent } from "app/set-language.component";
import { RegisterService } from "app/services/register-services/register-service";
import { sessionStorageService } from "app/services/sessionStorageService/session-storage.service";

@Component({
  selector: "app-beneficiary-registration-104",
  templateUrl: "./beneficiary-registration-104.component.html",
  styleUrls: ["./beneficiary-registration-104.component.css"],
})
export class BeneficiaryRegistration104Component implements OnInit {
  @Output() onBenRegDataSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() nexButtonEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() closurePage: EventEmitter<any> = new EventEmitter<any>();
  @Input() resetting: any;
  @Output() roleChanged: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("searchForm") searchForm: NgForm;
  @ViewChild("registrationForm") registrationForm: NgForm;

  hasCalledEarlierFlag = false;
  callerNumber: any;
  callerID: any;
  callerResponse: any;
  updateResponse: any;
  altNumberResult: any;
  //LatestValidPrescriptions: any = [];
  altNum: any = false;
  beneficiaryDetails: any;
  isEmergency: any = false;
  is_a_healthcare_worker: any = "No";
  today: Date;
  maxDate: any;
  altPhNumber: any; //getting from modal window
  districts: any = [];
  beneficiaryResults: any = [];
  healthCareWorkerTypes: any[];
  registrationDetails: any;
  commonData: any = [];
  all_titles: any = [];
  current_titles: any = [];
  gender: any = "";
  agentData: any;

  // flags
  quesVisibilityFlag: boolean = true;
  healthcare_worker: any = "No";
  showForm: any = false;
  showSearchForm: any = false;
  showTableFlag: any = false;
  healthcareWorkerField: any = false;
  nonEmergency: any = true;
  registrationPage1: any = true;
  registrationPage2: any = false;
  registrationPage3: any = false;
  showLatestPrescription: any = false;
  BeneficiaryExistsWIthOtherPhNum = false;
  updateBeneficiry: any = false;

  //Registration Form fields
  beneficiaryRegID: any = null;
  firstName: any = "";
  middleName: any;
  lastName: any = "";
  DOB: any;
  DOBB: Date;
  age: any = "";
  fatherNameSpouseName: any;
  phoneNo;
  titleId: any;
  maritalStatusID: any;
  //setting default relationship to self
  relationshipTypeID: any = 1;
  aadharNo: any;
  caste: any;
  beneficiaryTypeID: any;
  educationQualification: any;
  qualifications = [];
  occupationId: any;
  govtIdentityNo: any;
  stateID: any;
  cityID: any;
  taluk: any;
  village: any;
  pincode: any;
  houseNumber: any;
  preferredLanguage: any;
  relationShips: any = [];
  benRegistrationResponse: any;
  benUpdationResponse: any;
  regHistoryList: any = [];
  registrationNo: any;
  states: any = [];
  titles: any = [];
  status: any = [];
  benEdus: any = [];
  genders: any = [];
  maritalStatuses: any = [];
  taluks: any = [];
  blocks: any = [];
  communities: any = [];
  directory: any = [];
  language: any = [];
  regHistory: any;
  emailID: any;
  statusID: any;
  govtIdentityTypeID: any;
  registeredServiceID: any;
  marital: any;
  incomeStatusID: any;
  preferredLangID: any;
  phoneTypeID: any = 1;
  healthCareWorkerID: any;
  benPhMapID: any;
  communityID: any;
  sessionID: any;
  calledServiceID: any;
  remarks: any;
  servicesProvided: any;
  callClosureType: any;
  category: any;
  subCategory: any;
  called: any;
  no_record_found: any;
  providerServiceID: any;
  beneficiary_registered: any;
  countryID: any = 1;
  subDistricts: any = [];
  villages: any = [];
  identityType: any;
  subDistrict: any;
  current_role: any;
  current_roleName: any;
  emailPattern: any;
  alternateNumber: any;
  benOldObj: any = {};
  alternateNumber1: any;
  alternateNumber2: any;
  alternateNumber3: any;
  alternateNumber4: any;
  alternateNumber5: any;
  hadRecentlyPrescribed: boolean = false;
  recentPrescriptionData: any = [];
  successfully_updated: any;
  personIsSelf: boolean = false;
  hasHAOPrivilege: boolean = false;
  privleges: any = [];
  minDate: any;
  ageLimit: number = 120;
  ageUnit: any;
  currentLanguageSet: any;
  benDetails: any;
  healthIDValue: string = "";
  searchPattern: string;
  constructor(
    private _util: SearchService,
    public router: ActivatedRoute,
    private _callServices: CallServices,
    private _callerService: CallerService,
    private _userData: UserBeneficiaryData,
    public getCommonData: dataService,
    private caseSheetService: CaseSheetService,
    private prescriptionService: PrescriptionService,
    public dialog: MdDialog,
    location: PlatformLocation,
    private alertMessage: ConfirmationDialogsService,
    private _locationService: LocationService,
    private _smsService: SmsTemplateService,
    private fb: FormBuilder,
    public HttpServices: HttpServices,
    private sessionstorage:sessionStorageService,
    private registerService: RegisterService,
  ) {}

  ngOnInit() {
    this.assignSelectedLanguage();
    this.searchPattern = "/^[a-zA-Z0-9](.|@|-)*$/;";
    //this.DOB = new Date;
    this.providerServiceID = this.getCommonData.service_providerID;
    this.current_role = this.getCommonData.current_role;
    this.current_roleName = this.getCommonData.current_roleName;
    this.privleges = this.getCommonData.userPriveliges;
    this.checkHAOPrivilege();
    this.IntializeSessionValues();
    //this._util.getDistricts().subscribe(response => this.districts = this.successHandeler(response));
    if (this.sessionstorage.getItem("CLI") != undefined) {
      this.callerNumber = this.sessionstorage.getItem("CLI");
      this.phoneNo = this.callerNumber;
    }
    if (this.sessionstorage.getItem("session_id") != undefined) {
      this.callerID = this.sessionstorage.getItem("session_id");
    }
    this.emailPattern = /^[0-9a-zA-Z_.]+@[a-zA-Z_]+?\.\b(org|com|in|co.in)\b$/;
    this.retrieveRegHistoryByPhoneNo(this.callerNumber);
    this.showTableFlag = true;
    if (this.getCommonData.apiCalledForInbound) {
      return;
    } else {
      this.storeCallID(this.beneficiaryRegID, this.callerID);
    }
    this.initiallyState();
    //	console.log(this.getCommonData.current_service, "@@@@@");
    this.setDateLimits();
    this.setDefaultAgeUnit();
  }

  ngDoCheck() {
    this.assignSelectedLanguage();
    this.validateIDonDoCheck(this.identityType);
  }

  assignSelectedLanguage() {
    const getLanguageJson = new SetLanguageComponent(this.HttpServices);
    getLanguageJson.setLanguage();
    this.currentLanguageSet = getLanguageJson.currentLanguageObject;
  }

  setDateLimits() {
    this.today = new Date();
    this.minDate = new Date();
    this.minDate.setFullYear(this.today.getFullYear() - (this.ageLimit + 1));
  }
  /*
   * set Default value for ageUnit to 'Year'
   */
  setDefaultAgeUnit() {
    this.ageUnit = "years";
  }
  resetNGmodels() {
    this.healthCareWorkerID = null;
    this.titleId = "";
    this.firstName = "";
    this.middleName = "";
    this.lastName = "";

    this.gender = "";
    this.age = "";
    this.DOB = "";
    this.relationshipTypeID = "";
    this.parentBenRegID = "";
    this.relationshipTypeID = "";
    this.communityID = "";
    this.maritalStatusID = "";
    this.fatherNameSpouseName = "";
    this.educationQualification = "";
    this.identityType = "";
    this.aadharNo = "";
    this.stateID = "";
    this.cityID = "";
    this.subDistrict = "";
    this.village = "";
    this.houseNumber = "";
    this.pincode = "";
    this.alternateNumber1 = "";
    this.alternateNumber2 = "";
    this.alternateNumber3 = "";
    this.alternateNumber4 = "";
    this.alternateNumber5 = "";
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.resetting == "yes") {
      this.resetNGmodels();
      this.showHistory();
      this.initiallyState();
      this.checkHealthCareWorker("No");
      this.isEmergency = false;
      this.nonEmergency = true;
      this.recentPrescriptionData = [];
      this.registrationNo = "";
      this.viewALL = true;
    }
  }
  initiallyState() {
    this._util.getProviderStates(this.providerServiceID).subscribe(
      (response) => this.getAllStatesSuccessHandeler(response),
      (err) => {
        this.alertMessage.alert(
          this.currentLanguageSet.errorInFetchingStates,
          "error"
        );
      }
    );
  }
  IntializeSessionValues() {
    let data = {
      providerServiceMapID: this.getCommonData.current_service.serviceID,
    };

    this._userData
      .getUserBeneficaryData(data)
      .subscribe((response) => 
      {
        if(response !== undefined && response !== null) {
          this.IDsuccessHandeler(response);
        }
      })

    this.today = new Date();
    this.maxDate = this.today;
    this.agentData = this.getCommonData.Userdata;
    this.calledServiceID = this.getCommonData.current_service.serviceID;
    this.sessionID = this.getCommonData.sessionID;
  }
  govtID: any = [];
  IDsuccessHandeler(res) {
    this.commonData = res;
    this.qualifications = res.i_BeneficiaryEducation;
    this.all_titles = res.m_Title;
    this.current_titles = res.m_Title;
    this.govtID = res.govtIdentityTypes;
    console.log("IDsuccessHandler", res.benRelationshipTypes);
    this.relationShips = res.benRelationshipTypes.filter(function (obj) {
      return obj.benRelationshipType.toLowerCase() != "self";
    });
    this.govtID = this.govtID.filter(function (obj) {
      return obj.isGovtID == true;
    });
    this.resetCommunity();
  }
  //Purpose: Backward navigation to the registration form
  capturePrimaryInfo(val: any) {
    console.log("reg form", this.registrationForm.value);
    if (val == "registrationPage2") {
      this.registrationPage1 = true;
      this.registrationPage2 = false;
      this.registrationPage3 = false;
      this.nexButtonEvent.emit(false);
      //can be removed in future if provider services are no longer in use, also has to remove from its parent html & its function in ts....gursimran 2/10/18
    } else {
      this.registrationPage1 = false;
      this.registrationPage2 = true;
      this.registrationPage3 = false;
    }
  }
  //Purpose: Forward navigation to the registration form
  captureOtherInfo(val: any, buttontype: boolean) {
    if (val == "registrationPage1") {
      this.registrationPage1 = false;
      this.registrationPage2 = true;
    } else {
      this.registrationPage1 = false;
      this.registrationPage2 = false;
    }
    if (buttontype == false) {
    } else {
      this.nexButtonEvent.emit(true);
      //can be removed in future if provider services are no longer in use, also has to remove from its parent html & its function in ts....gursimran 2/10/18
    }
  }

  getAllStatesSuccessHandeler(response) {
    this.stateID = this.getCommonData.current_stateID_based_on_role; // THIS IS THE STATE_ID BASED ON CURRENT ROLE
    /*NOW FETCHING PREPOPULATED DISTRICTS ON THE BASIS OF THIS STATE VALUE*/
    this.states = response.filter((item) => {
      return item.stateID === this.stateID;
    });
    this.stateSelect(this.stateID);
  }

  getSubDistrict(districtID) {
    this.village = undefined;
    this._util
      .getSubDistricts(districtID)
      .subscribe((response) => this.getSubDistrictSuccessHandeler(response));
  }

  getSubDistrictSuccessHandeler(response) {
    this.subDistricts = response;
    //	console.log("********SUBDISTRICT", this.subDistricts);
  }

  getVillage(subDistrictID) {
    this._util
      .getVillages(subDistrictID)
      .subscribe((response) => this.getVillageSuccessHandeler(response));
  }

  getVillageSuccessHandeler(response) {
    this.villages = response;
  }

  altNumObj: any = [];
  /** Purpose: function to store alternate number */
  saveAlternateNumber(beneficiaryRegID, mobileNumber) {
    this.altNumObj = {};
    this.altNumObj.benRelationshipID = 1;
    this.altNumObj.benificiaryRegID = this.beneficiaryRegID;
    this.altNumObj.createdBy = this.agentData.userName;
    this.altNumObj.parentBenRegID = "";
    this.altNumObj.phoneNo = mobileNumber;
    this.altNumObj.phoneTypeID = 1;

    let data = JSON.stringify(this.altNumObj);
    this._userData
      .storeAlternateNumber(data)
      .subscribe((res) => (this.altNumberResult = res));
  }

  private parentBenRegID: any = null;
  /** Purpose: function to find and set parent(whose relationshipType is 'self' and parentBenificiary  id is null ) beneficiaryRegID */
  setParentBenID() {
    console.log("setParentBenID", this.beneficiaryResults);
    for (let beneficiaryResult of this.beneficiaryResults) {
      if (
        beneficiaryResult.benPhoneMaps &&
        beneficiaryResult.benPhoneMaps[0].benRelationshipType &&
        beneficiaryResult.benPhoneMaps[0].benRelationshipType
          .benRelationshipType == "Self"
      ) {
        this.parentBenRegID = beneficiaryResult.beneficiaryRegID;

        // setting default relationship to other
        this.relationshipTypeID = 11;
      }
    }

    //	console.log("parentBenRegID: " + this.parentBenRegID);
    //	console.log("relationshipTypeID: " + this.relationshipTypeID);
  }
  parentBenRegName: any;
  /** Purpose: function to set parent(whose relationshipType is 'self' and parentBenificiary  id is null ) beneficiary name */
  setParentBenName() {
    // debugger
    console.log(
      "setParentBenName: " + JSON.stringify(this.beneficiaryResults)
    );

    for (let beneficiaryResult of this.beneficiaryResults) {
      if (
        beneficiaryResult.benPhoneMaps &&
        beneficiaryResult.benPhoneMaps[0].benRelationshipType &&
        beneficiaryResult.benPhoneMaps[0].benRelationshipType
          .benRelationshipType == "Self"
      ) {
        this.parentBenRegName = beneficiaryResult.firstName;
        //	console.log("this.parentBenRegName: " + this.parentBenRegName);
        // if (beneficiaryResult.middleName)
        // 	this.parentBenRegName += " " + beneficiaryResult.middleName;
        // if (beneficiaryResult.lastName)
        // 	this.parentBenRegName += " " + beneficiaryResult.lastName;
        //			console.log("parentBenRegName: " + this.parentBenRegName);
      }
    }
  }

  /** Purpose: dynamic loading UI based on condition*/
  calledEarlier(value: any) {
    this.nexButtonEvent.emit(false); // can be removed in future if provider services are no longer in use, also has to remove from its parent html & its function in ts....gursimran 2/10/18//can be removed in future if provider services are no longer in use, also has to remove from its parent html & its function in ts....gursimran 2/10/18
    this.ageFlag = true; // to again disable next button since age is required while registering
    if (value === "Yes") {
      this.hasCalledEarlierFlag = true;
      this.quesVisibilityFlag = false;
      this.showSearchForm = true;
      this.showTableFlag = true;
      this.showForm = false;
    }
    if (value === "No") {
      this.registrationPage1 = true;
      this.showForm = true;

      this.hasCalledEarlierFlag = false;
      this.quesVisibilityFlag = false;
      this.showTableFlag = false;
      this.showSearchForm = false;

      this.registrationPage2 = false;

      this.personIsSelf = false;
      this.initiallyState();
      jQuery("#registerForm").trigger("reset");
    }
  }

  showHistory() {
    //			this.registrationPage1 = true; //..........(to reset the form, have to make full form visible)
    jQuery("#registerForm").trigger("reset");
    this.personIsSelf = false;
    //	this.registrationPage2 = true; //...........||..
    this.retrieveRegHistoryByPhoneNo(this.callerNumber);
    this.quesVisibilityFlag = true;
    this.showSearchForm = false;
    this.showForm = false;
    this.showTableFlag = true;
    this.called = "";
    this.updateBeneficiry = false;
    //	this.LatestValidPrescriptions = [];
    this.healthcareWorkerField = false;
    this.is_a_healthcare_worker = "No";
    //	this.nexButtonEvent.emit(false);
    this.ageUnit = "years";
    this.resetCommunity();
  }
  resetCommunity() {
    let com = this.commonData.m_communities.filter(function (obj) {
      if (obj.communityType == "Not given") {
        return obj;
      }
    });
    this.communityID = com[0].communityID;
  }
  recentPresData() {
    let dialogReff = this.dialog.open(CaseSheetRecentPrescription, {
      //   height: '620px',
      width: 0.8 * window.innerWidth + "px",
      panelClass: "dialog-width",
      disableClose: true,
      data: {
        prescription: this.recentPrescriptionData,
      },
    });
  }

  /** Purpose: dynamic loading healthcare worker types based on condition*/
  checkHealthCareWorker(value: any) {
    this.ageInput(this.age);
    if (value === "Yes") {
      this.healthcareWorkerField = true;

      this._util.getHealthCareWorkerTypes().subscribe((response) => {
        this.healthCareWorkerTypes = this.successHandeler(response);
      });

      // filtering out titles suitable only for a health worker
      this.current_titles = this.all_titles.filter(function (item) {
        if (
          item.titleName.toLowerCase() != "baby" &&
          item.titleName.toLowerCase() != "master"
        ) {
          return item;
        }
      });
    }
    if (value === "No") {
      this.healthcareWorkerField = false;

      // populating all the titles available
      this.current_titles = this.all_titles;
    }
  }

  /** Purpose: dynamic loading Registration fields based on condition*/
  Emergency(event) {
    //	console.log(event);
    // send emergency call status to closure page
    this.getCommonData.isEmergency.next({
      emergency: event,
    });

    if (event) {
      this.nonEmergency = false;
      this.registrationPage1 = true;
      this.registrationPage2 = false;
      this.registerService.getIsEmergency(true);
      // this.stateFlag = false;
      //this.cityFlag = false;
    } else {
      this.nonEmergency = true;
      this.registerService.getIsEmergency(false);
      // this.stateFlag = true;
      //this.cityFlag = true;
    }
  }

  /** Purpose: function to retrive beneficiaries based on the fields entered */
  searchBeneficiary(values: any) {
    let searchData = {
      firstName: values.firstName,
      lastName: values.lastName,
      //	"fatherName": values.fatherNameHusbandNameSearch,
      genderID: values.gender,
      beneficiaryID: values.beneficiaryID,
      i_bendemographics: {
        stateID: values.stateID,
        districtID: values.districtSearch,
      },
    };
    //	console.log(values);
    this.BeneficiaryExistsWIthOtherPhNum = true;
    //	console.log(searchData);

    this._util.searchBenficiary(JSON.stringify(searchData)).subscribe(
      (response) => {
        this.searchBenSuccessHandeler(response);
      },
      (err) => {
        this.alertMessage.alert(err.status, "error");
      }
    );
  }

  /** Purpose: function to retrive beneficiaries based on the phone numbers */
  retrieveRegHistoryByPhoneNo(PhoneNo: any) {
    //	console.log("retrieveRegHistoryByPhoneNo");
    this._util
      .retrieveRegHistoryByPhoneNo(PhoneNo)
      .subscribe((response) => this.handlesuccess(response));
    // console.log(this.relationShips);
  }
  searchFormReset() {
    this.searchForm.reset();
    this.searchForm.form.patchValue({
      stateID: this.getCommonData.current_stateID_based_on_role,
    });
  }

  handlesuccess(response) {
    this.beneficiaryResults = [];
    this.beneficiaryResults = response;

    if (this.beneficiaryResults.length == undefined) {
    } else if (this.beneficiaryResults !== undefined && this.beneficiaryResults.length > 0) {
      //	this.showTableFlag = true;

      // ** code to show latest registered on top, but after the parent beneficiary. **

      let parent_ben = this.beneficiaryResults[0];
      this.beneficiaryResults.reverse();
      this.beneficiaryResults.splice(this.beneficiaryResults.length - 1, 1);
      this.beneficiaryResults.splice(0, 0, parent_ben);

      // ** ends **

      this.setParentBenID();
      this.setParentBenName();
      //		this.showSearchForm = false;
    } else {
      //this.alertMessage.alert(this.no_record_found);
      //		this.showTableFlag = true;
    }
  }

  /*To load beneficiary ABHA Details*/
  loadAbhaDetails(benDetails) {
    if (
      benDetails.abhaDetails !== undefined &&
      benDetails.abhaDetails !== null &&
      benDetails.abhaDetails.length > 0
    ) {
      this.dialog.open(BeneficiaryABHADetailsModal, {
        // height: '620px',
        width: 0.8 * window.innerWidth + "px",
        panelClass: "dialog-width",
        // disableClose: true,
        data: benDetails,
      });
    } else {
      this.alertMessage.alert(
        this.currentLanguageSet.abhaDetailsNotAvailable,
        "info"
      );
    }
  }

  searchBenSuccessHandeler(response) {
    this.beneficiaryResults = [];
    this.beneficiaryResults = response;
    if (this.beneficiaryResults.length == undefined) {
    } else if (this.beneficiaryResults !== undefined && this.beneficiaryResults.length > 0) {
      //		this.showTableFlag = true;
      this.setParentBenID();
      this.setParentBenName();
      //	this.showSearchForm = false;
      this.searchFormReset();
    } else {
      //this.alertMessage.alert(this.no_record_found);
      //		this.showTableFlag = true;
    }
  }

  callerObj: any = {};
  /** Purpose: function to store callerID for the current call  */
  storeCallID(beneficiaryRegID, callerID) {
    let date = new Date();
    if (this.callerID !== undefined && this.callerID !== null) {
      this.callerObj = {};
      this.callerObj.beneficiaryRegID = this.beneficiaryRegID;
      this.callerObj.callID = this.callerID;
      this.callerObj.receivedRoleName = this.current_roleName;
      this.callerObj.sessionID = this.sessionID;
      this.callerObj.calledServiceID = this.calledServiceID;
      this.callerObj.remarks = this.remarks;
      this.callerObj.servicesProvided = this.servicesProvided;
      this.callerObj.callClosureType = this.callClosureType;
      this.callerObj.category = this.category;
      this.callerObj.subCategory = this.subCategory;
      this.callerObj.createdBy = this.agentData.userName;
      this.callerObj.phoneNo = this.callerNumber;
      this.callerObj.isOutbound = false;
      this.callerObj.agentID = this.getCommonData.agentID;
      /*added by diamond on asked by Vinay*/
      this.callerObj.callReceivedUserID = this.getCommonData.uid;
      /**/
      this.getCommonData.apiCalledForInbound = true;
      let res = this._callServices
        .storeCallID(JSON.stringify(this.callerObj))
        .subscribe(
          (response) =>
            (this.callerResponse = this.callerSuccessHandeler(response))
        );
    } else {
      console.log("Session ID is null not able to land a call");
    }
  }

  blockey(e: any) {
    if (e.keyCode === 9) {
      return true;
    } else {
      return false;
    }
  }

  updateCallerBeneficiaryID(beneficiaryRegID, callerID) {
    let data = {
      beneficiaryRegID: beneficiaryRegID,
      benCallID: callerID,
    };
    let res = this._callerService
      .updateCallerBeneficiaryID(data)
      .subscribe(
        (response) => (this.updateResponse = this.callerHandleSuccess(response))
      );
  }

  callerSuccessHandeler(response) {
    //	console.log("callerSuccessHandeler: " + JSON.stringify(response));
    this.getCommonData.benCallID = response.benCallID;
    this.beneficiaryDetails = response;
    this.getCommonData.benDataInRO = response;
    //	console.log(this.beneficiaryDetails, response, "&&&&&&&&&&&&&&&&");
  }
  callerHandleSuccess(res) {
    console.log(res);
  }

  registerObj: any = {};
  registerBeneficiary() {
    // console.log(this.firstName);
    let identityData = {
      govtIdentityNo: this.aadharNo,
      govtIdentityTypeID: this.identityType,
    };

    this.registerObj = {};
    this.registerObj["providerServiceMapID"] =
      this.getCommonData.current_service.serviceID;
    this.registerObj.firstName = this.firstName;
    //	this.registerObj.middleName = this.middleName;
    this.registerObj.lastName = this.lastName;
    // this.registerObj.dOB =values.age;
    if (this.DOB) {
      this.registerObj.dOB =
        new Date(this.DOB - 1 * (this.DOB.getTimezoneOffset() * 60 * 1000))
          .toJSON()
          .slice(0, 10) + "T00:00:00.000Z";
    } else {
      this.registerObj.dOB = undefined;
    }
    //  this.registerObj.dOB = 'fuyfhy';

    this.registerObj.ageUnits = this.ageUnit;
    this.registerObj.fatherName = this.fatherNameSpouseName;
    this.registerObj.spouseName = this.lastName;
    // if (this.identityType == 1) {
    // 	this.registerObj.aadharNo = this.aadharNo;
    // }
    // else {
    // 	this.registerObj.govtIdentityNo = this.aadharNo;
    // }
    this.registerObj.beneficiaryIdentities = [];
    this.registerObj.beneficiaryIdentities.push(identityData);

    // this.registerObj.govtIdentityNo = null;
    // this.registerObj.govtIdentityTypeID = null;

    // this.registerObj.govtIdentityNo = this.aadharNo;
    // this.registerObj.govtIdentityTypeID = this.identityType;

    //	this.registerObj.emailID = this.emailID; //currently not needed
    this.registerObj.emergencyRegistration = this.isEmergency;
    this.registerObj.createdBy = this.agentData.userName;
    this.registerObj.titleId = this.titleId;
    this.registerObj.statusID = this.statusID;
    // this.registerObj.govtIdentityTypeID = this.govtIdentityTypeID;
    this.registerObj.registeredServiceID = this.registeredServiceID;
    this.registerObj.maritalStatusID = this.maritalStatusID;
    this.registerObj.genderID = this.gender;
    this.registerObj.genderName = this.getGenderNameById(this.gender);
    this.registerObj.vanID = this.getCommonData.current_serviceID;
    this.registerObj.i_bendemographics = {};
    this.registerObj.i_bendemographics.educationID =
      this.educationQualification;
    this.registerObj.i_bendemographics.occupationID = this.occupationId;
    if (this.healthCareWorkerID != undefined) {
      this.registerObj.i_bendemographics.healthCareWorkerID =
        this.healthCareWorkerID;
    }
    //	this.registerObj.i_bendemographics.incomeStatusID = this.incomeStatusID; //...currently not needed
    this.registerObj.i_bendemographics.communityID = this.communityID;
    //	this.registerObj.i_bendemographics[0].preferredLangID = this.preferredLangID; //not needed
    this.registerObj.i_bendemographics.districtID = this.cityID;
    this.registerObj.i_bendemographics.stateID = this.stateID;
    this.registerObj.i_bendemographics.pinCode = this.pincode;
    this.registerObj.i_bendemographics.blockID = this.subDistrict;
    this.registerObj.i_bendemographics.districtBranchID = this.village;
    this.registerObj.i_bendemographics.createdBy = this.agentData.userName;
    this.registerObj.i_bendemographics.addressLine1 = this.houseNumber;

    this.registerObj.benPhoneMaps = [{}];
    this.registerObj.benPhoneMaps[0].parentBenRegID = this.parentBenRegID;
    this.registerObj.benPhoneMaps[0].phoneNo = this.phoneNo;
    this.registerObj.benPhoneMaps[0].phoneTypeID = this.phoneTypeID;
    this.registerObj.benPhoneMaps[0].benRelationshipID =
      this.relationshipTypeID;
    this.registerObj.benPhoneMaps[0].createdBy = this.agentData.userName;
    // this code might we need to change (not efficient)
    if (this.alternateNumber1) {
      let Obj = {};
      Obj["parentBenRegID"] = this.parentBenRegID;
      Obj["benRelationshipID"] = this.relationshipTypeID;
      Obj["phoneNo"] = this.alternateNumber1;
      //	Obj['createdBy'] = this.commonData.uname;
      Obj["deleted"] = false;
      Obj["createdBy"] = this.agentData.userName;
      this.registerObj.benPhoneMaps.push(Obj);
    }
    if (this.alternateNumber2) {
      let Obj = {};
      Obj["parentBenRegID"] = this.parentBenRegID;
      Obj["benRelationshipID"] = this.relationshipTypeID;
      Obj["phoneNo"] = this.alternateNumber2;
      //	Obj['createdBy'] = this.commonData.uname;
      Obj["deleted"] = false;
      Obj["createdBy"] = this.agentData.userName;
      this.registerObj.benPhoneMaps.push(Obj);
    }
    if (this.alternateNumber3) {
      let Obj = {};
      Obj["parentBenRegID"] = this.parentBenRegID;
      Obj["benRelationshipID"] = this.relationshipTypeID;
      Obj["phoneNo"] = this.alternateNumber3;
      //	Obj['createdBy'] = this.commonData.uname;
      Obj["deleted"] = false;
      Obj["createdBy"] = this.agentData.userName;
      this.registerObj.benPhoneMaps.push(Obj);
    }
    if (this.alternateNumber4) {
      let Obj = {};
      Obj["parentBenRegID"] = this.parentBenRegID;
      Obj["benRelationshipID"] = this.relationshipTypeID;
      Obj["phoneNo"] = this.alternateNumber4;
      //	Obj['createdBy'] = this.commonData.uname;
      Obj["deleted"] = false;
      Obj["createdBy"] = this.agentData.userName;
      this.registerObj.benPhoneMaps.push(Obj);
    }
    if (this.alternateNumber5) {
      let Obj = {};
      Obj["parentBenRegID"] = this.parentBenRegID;
      Obj["benRelationshipID"] = this.relationshipTypeID;
      Obj["phoneNo"] = this.alternateNumber5;
      //	Obj['createdBy'] = this.commonData.uname;
      Obj["deleted"] = false;
      Obj["createdBy"] = this.agentData.userName;
      this.registerObj.benPhoneMaps.push(Obj);
    }
    //	console.log(JSON.stringify(this.registerObj));
    this._util.registerBeneficiary(JSON.stringify(this.registerObj)).subscribe(
      (response) => {
        this.registrationDetails = this.regSuccessHandeler(response);
        this.getCommonData.districtID = response.i_bendemographics.districtID;
        this.getCommonData.blockID=response.i_bendemographics.m_districtblock.blockID;
      },
      (err) => {
        this.alertMessage.alert(err.errorMessage, "error");
      }
    );
  }

  getGenderNameById(value) {
    if (this.commonData.m_genders != undefined) {
      const gender = this.commonData.m_genders.find(function (obj) {
        return obj.genderID == value;
      });
      return gender ? gender.genderName : null;
    }
    return null;
  }

  passBenRegHistoryData(searchedBenData: any) {
    this.updateCallerBeneficiaryID(
      searchedBenData.beneficiaryRegID,
      this.getCommonData.benDataInRO.benCallID
    );
    this.getCommonData.benRegID = searchedBenData.beneficiaryRegID;
    // console.log('data passed' + searchedBenData);
    this.onBenRegDataSelect.emit(searchedBenData);
    if (this.BeneficiaryExistsWIthOtherPhNum) {
      this.saveAlternateNumber(
        searchedBenData.beneficiaryRegID,
        this.callerNumber
      );
    }
  }
  //SH20094090,23-092021,HealthID Integration changes on Innerpage
  getHealthIdDetails(benRegID) {
    this.healthIDValue = "";
    this.getCommonData.benHealthID = null;
    let obj = {
      beneficiaryID: null,
      beneficiaryRegID: benRegID,
    };
    this._util.fetchHealthIdDetails(obj).subscribe(
      (healthIDDetails) => {
        if (
          healthIDDetails != undefined &&
          healthIDDetails.BenHealthDetails != undefined &&
          healthIDDetails.BenHealthDetails != null
        ) {
          this.benDetails = healthIDDetails.BenHealthDetails;
          if (this.benDetails.length > 0) {
            this.benDetails.forEach((healthID) => {
              if (healthID.healthId != undefined && healthID.healthId != null)
                this.healthIDValue =
                  this.healthIDValue + healthID.healthId + ", ";
            });
            if (
              this.healthIDValue != undefined &&
              this.healthIDValue != null &&
              this.healthIDValue.length > 1
            )
              this.healthIDValue = this.healthIDValue.substring(
                0,
                this.healthIDValue.length - 1
              );
            this.getCommonData.benHealthID = this.healthIDValue;
          } else {
            this.getCommonData.benHealthID = null;
            this.healthIDValue = "";
          }
        } else {
          this.getCommonData.benHealthID = null;
          this.healthIDValue = "";
        }
        // else {
        //   this.getCommonData.benHealthID=null;
        //   this.alertMessage.alert("Issue in getting Beneficiary Health ID  Details", 'error');
        // }
      },
      (err) => {
        this.getCommonData.benHealthID = null;
        this.healthIDValue = "";
        this.alertMessage.alert(
          "Issue in getting Beneficiary Health ID  Details",
          "error"
        );
      }
    );
  }
  selectBeneficiary(regHistory: any) {
    console.log("regHistory: " + JSON.stringify(regHistory));
    this.getHealthIdDetails(regHistory.beneficiaryRegID);
    this.nexButtonEvent.emit(false); //can be removed in future if provider services are no longer in use, also has to remove from its parent html & its function in ts....gursimran 2/10/18
    this.quesVisibilityFlag = false;
    this.passBenRegHistoryData(regHistory);
    regHistory.benCallID = this.getCommonData.benDataInRO.benCallID;
    this.updateBenInCall(regHistory);
    // this.onBenRegDataSelect.emit( regHistory );
    this.populateUserData(regHistory);
    // console.log("LatestValidPrescriptions " + this.LatestValidPrescriptions);
    this.registrationPage1 = true;
    this.showTableFlag = false;
    this.registrationPage2 = false;
    this.ageFlag = false; // to enable the next button, since age is already there for registered ben
  }

  populateUserData(benRegData: any) {
    let IDobj = {
      beneficiaryRegID: benRegData.beneficiaryRegID,
    };
    let res = this._util
      .retrieveRegHistory(IDobj)
      .subscribe((response) =>{
      if(response)
        this.populateRegistrationFormForUpdate(response);
        // checking if the demographics details are present or not and triggering a observable to disable procced to hao button 
        let demographhicData = response[0].i_bendemographics;
        if(demographhicData.stateID !== undefined && demographhicData.stateID !== null && demographhicData.stateID !== "" && 
        demographhicData.districtID !== undefined && demographhicData.districtID !== null && demographhicData.districtID !== "" &&
        demographhicData.districtBranchID !== undefined && demographhicData.districtBranchID !== null && demographhicData.districtBranchID !== "" &&
        demographhicData.blockID !== undefined && demographhicData.blockID !== null && demographhicData.blockID !== "" 
        )
        this.registerService.checkForDemographicDetails(false);
        else
        this.registerService.checkForDemographicDetails(true);
      });

    this.showForm = true;

    this.updateBeneficiry = true;
    this.showSearchForm = false;

    let obj = '{"beneficiaryRegID":"' + benRegData.beneficiaryRegID + '"}';
    this.caseSheetService.getValidCaseSheetData(obj).subscribe(
      (response) => {
        this.handlesuccess2(response);
      },
      (err) => {
        console.log("Case Sheet Error");
      }
    );
  }
  handlesuccess2(res) {
    if (res.length > 0) {
      this.hadRecentlyPrescribed = true;
      this.recentPrescriptionData = [];
      this.recentPrescriptionData = res;
    } else {
      this.hadRecentlyPrescribed = false;
    }

    //	console.log(this.recentPrescriptionData);
  }
  dummyBenDetails: any = {};
  // Purpose: populate beneficiary details to the update form
  populateRegistrationFormForUpdate(registeredBenData) {
    //		console.log('registered ben data is :', registeredBenData)
    if (
      registeredBenData[0].i_bendemographics.healthCareWorkerID != undefined
    ) {
      this.checkHealthCareWorker("Yes");
      this.healthCareWorkerID =
        registeredBenData[0].i_bendemographics.healthCareWorkerID;
      this.getCommonData.healthcareTypeID =
        registeredBenData[0].i_bendemographics.healthCareWorkerID;
    } else {
      this.getCommonData.healthcareTypeID = undefined;
    }
    registeredBenData = registeredBenData[0];

    this.beneficiaryRegID = registeredBenData.beneficiaryRegID;
    this.firstName = registeredBenData.firstName;
    this.middleName = registeredBenData.middleName;
    this.lastName = registeredBenData.lastName;
    this.gender = registeredBenData.genderID;
    this.DOB = new Date(registeredBenData.dOB);
    this.age = (registeredBenData.actualAge !== undefined && registeredBenData.actualAge !== null) ? registeredBenData.actualAge : null;
    // this.age = registeredBenData.age ? registeredBenData.age.trim() : null;
    this.ageUnit =
      registeredBenData.ageUnits == "year"
        ? "years"
        : registeredBenData.ageUnits == "month"
        ? "months"
        : registeredBenData.ageUnits == "day"
        ? "days"
        : registeredBenData.ageUnits.toLowerCase();
    this.titleId = registeredBenData.titleId;
    this.emailID = registeredBenData.emailID;
    this.maritalStatusID = registeredBenData.maritalStatusID;
    if (registeredBenData && registeredBenData.benPhoneMaps[0]) {
      this.parentBenRegID = registeredBenData.benPhoneMaps[0].parentBenRegID;
      this.relationshipTypeID =
        registeredBenData.benPhoneMaps[0].benRelationshipID;
      this.benPhMapID = registeredBenData.benPhoneMaps[0].benPhMapID;
      let relation = "self";
      console.log(
        "populateRegistrationFormForUpdate: " + registeredBenData
      );
      if (registeredBenData.benPhoneMaps[0].benRelationshipType) {
        relation =
          registeredBenData.benPhoneMaps[0].benRelationshipType
            .benRelationshipType;
      }

      if (relation.toLowerCase() == "self") {
        this.personIsSelf = true;
      } else {
        this.personIsSelf = false;
      }
    }
    for (let i = 1; i < registeredBenData.benPhoneMaps.length; i++) {
      if (i == 1) {
        this.alternateNumber1 = registeredBenData.benPhoneMaps[i].phoneNo;
      }
      if (i == 2) {
        this.alternateNumber2 = registeredBenData.benPhoneMaps[i].phoneNo;
      }
      if (i == 3) {
        this.alternateNumber3 = registeredBenData.benPhoneMaps[i].phoneNo;
      }
      if (i == 4) {
        this.alternateNumber4 = registeredBenData.benPhoneMaps[i].phoneNo;
      }
      if (i == 5) {
        this.alternateNumber5 = registeredBenData.benPhoneMaps[i].phoneNo;
      }
    }
    //	this.registerObj.i_bendemographics[0].healthCareWorkerID = this.healthCareWorkerID;
    this.educationQualification = registeredBenData.i_bendemographics
      ? registeredBenData.i_bendemographics.educationID
        ? registeredBenData.i_bendemographics.educationID.toString()
        : undefined
      : undefined;

    this.aadharNo = registeredBenData.govtIdentityNo
      ? registeredBenData.govtIdentityNo
      : registeredBenData.aadharNo;
    this.communityID = registeredBenData.i_bendemographics.communityID;
    // if(registeredBenData.i_bendemographics[0].healthCareWorkerID == null) {
    // 	alert("it has");

    // }
    // else {
    // 	alert("it has not");
    // }
    //	console.log("@@@@@@@@@@",registeredBenData);
    this.identityType = registeredBenData.govtIdentityTypeID;
    // if (registeredBenData.i_bendemographics.educationID)
    this.occupationId = registeredBenData.i_bendemographics.occupationID;
    this.stateID = registeredBenData.i_bendemographics.stateID;
    this.cityID = registeredBenData.i_bendemographics.districtID;
    this.getSubDistrict(this.cityID);
    this.subDistrict = registeredBenData.i_bendemographics.blockID;
    if (this.subDistrict) {
      this.getVillage(this.subDistrict);
    }
    this.village = registeredBenData.i_bendemographics.districtBranchID;
    this.fatherNameSpouseName = registeredBenData.fatherName;
    this.houseNumber = registeredBenData.i_bendemographics.addressLine1;
    this.taluks = registeredBenData.i_bendemographics.m_districtblock;
    //this.blocks = registeredBenData.i_bendemographics.m_districtbranchmapping;
    this.pincode = registeredBenData.i_bendemographics.pinCode;
    this.preferredLanguage =
      registeredBenData.i_bendemographics.preferredLangID;
    this.ageFlag = false;
    this.benOldObj = registeredBenData;
    //	this.getLatestValidPrescriptions();
    //	console.log(registeredBenData.i_bendemographics.educationID,this.educationQualification);

    //--------$$ creating dummy object, to differenciate between the new keys or change in keys while editong... Gursimran 27/2/18 $$--------

    this.dummyBenDetails = {};

    this.dummyBenDetails.firstName = this.firstName;
    this.dummyBenDetails.lastName = this.lastName;
    if (this.DOB) {
      this.dummyBenDetails.dOB = new Date(
        this.DOB - 1 * (this.DOB.getTimezoneOffset() * 60 * 1000)
      ).toJSON();
    } else {
      this.dummyBenDetails.dOB = undefined;
    }
    this.dummyBenDetails.ageUnits = this.ageUnit;
    this.dummyBenDetails.fatherName = this.fatherNameSpouseName;
    this.dummyBenDetails.spouseName = this.lastName;

    this.dummyBenDetails.govtIdentityNo = this.aadharNo;
    this.dummyBenDetails.govtIdentityTypeID = this.identityType;
    //this.dummyBenDetails.emergencyRegistration = this.isEmergency;
    this.dummyBenDetails.titleId = this.titleId;
    this.dummyBenDetails.maritalStatusID = this.maritalStatusID;
    this.dummyBenDetails.genderID = this.gender;
    this.dummyBenDetails.i_bendemographics = {};
    this.dummyBenDetails.i_bendemographics.educationID =
      this.educationQualification;
    this.dummyBenDetails.i_bendemographics.occupationID = this.occupationId;
    if (this.healthCareWorkerID != undefined) {
      this.dummyBenDetails.i_bendemographics.healthCareWorkerID =
        this.healthCareWorkerID;
    }
    this.dummyBenDetails.i_bendemographics.communityID = this.communityID;
    this.dummyBenDetails.i_bendemographics.districtID = this.cityID;
    this.dummyBenDetails.i_bendemographics.stateID = this.stateID;
    this.dummyBenDetails.i_bendemographics.pinCode = this.pincode;
    this.dummyBenDetails.i_bendemographics.blockID = this.subDistrict;
    this.dummyBenDetails.i_bendemographics.districtBranchID = this.village;
    this.dummyBenDetails.i_bendemographics.addressLine1 = this.houseNumber;

    this.dummyBenDetails.benPhoneMaps = [{}];
    //this.dummyBenDetails.benPhoneMaps[0].parentBenRegID = this.parentBenRegID;
    this.dummyBenDetails.benPhoneMaps[0].phoneNo = this.phoneNo;
    this.dummyBenDetails.benPhoneMaps[0].phoneTypeID = this.phoneTypeID;
    this.dummyBenDetails.benPhoneMaps[0].benRelationshipID =
      this.relationshipTypeID;
    this.dummyBenDetails.benPhoneMaps[0].createdBy = this.agentData.userName;
    if (this.alternateNumber1) {
      let Obj = {};
      Obj["parentBenRegID"] = this.parentBenRegID;
      Obj["benRelationshipID"] = this.relationshipTypeID;
      Obj["phoneNo"] = this.alternateNumber1;
      //	Obj['createdBy'] = this.commonData.uname;
      Obj["deleted"] = false;
      Obj["createdBy"] = this.agentData.userName;
      this.dummyBenDetails.benPhoneMaps.push(Obj);
    }
    if (this.alternateNumber2) {
      let Obj = {};
      Obj["parentBenRegID"] = this.parentBenRegID;
      Obj["benRelationshipID"] = this.relationshipTypeID;
      Obj["phoneNo"] = this.alternateNumber2;
      //	Obj['createdBy'] = this.commonData.uname;
      Obj["deleted"] = false;
      Obj["createdBy"] = this.agentData.userName;
      this.dummyBenDetails.benPhoneMaps.push(Obj);
    }
    if (this.alternateNumber3) {
      let Obj = {};
      Obj["parentBenRegID"] = this.parentBenRegID;
      Obj["benRelationshipID"] = this.relationshipTypeID;
      Obj["phoneNo"] = this.alternateNumber3;
      //	Obj['createdBy'] = this.commonData.uname;
      Obj["deleted"] = false;
      Obj["createdBy"] = this.agentData.userName;
      this.dummyBenDetails.benPhoneMaps.push(Obj);
    }
    if (this.alternateNumber4) {
      let Obj = {};
      Obj["parentBenRegID"] = this.parentBenRegID;
      Obj["benRelationshipID"] = this.relationshipTypeID;
      Obj["phoneNo"] = this.alternateNumber4;
      //	Obj['createdBy'] = this.commonData.uname;
      Obj["deleted"] = false;
      Obj["createdBy"] = this.agentData.userName;
      this.dummyBenDetails.benPhoneMaps.push(Obj);
    }
    if (this.alternateNumber5) {
      let Obj = {};
      Obj["parentBenRegID"] = this.parentBenRegID;
      Obj["benRelationshipID"] = this.relationshipTypeID;
      Obj["phoneNo"] = this.alternateNumber5;
      //	Obj['createdBy'] = this.commonData.uname;
      Obj["deleted"] = false;
      Obj["createdBy"] = this.agentData.userName;
      this.dummyBenDetails.benPhoneMaps.push(Obj);
    }
    //	console.log(JSON.stringify(this.dummyBenDetails));
    // let tempObj = {};
    // for(var i = 0; i< this.dummyBenDetails.benPhoneMaps.length; i++){
    // 	tempObj[i] = Object.assign({}, this.dummyBenDetails.benPhoneMaps[i]);
    // }
    // console.log(tempObj);
    //	delete this.dummyBenDetails['benPhoneMaps'];
    this.dummyBenDetails = JSON.stringify(this.dummyBenDetails);
    this.dummyBenDetails = JSON.parse(this.dummyBenDetails);
    // Above is done to delete the undefined keys, since it is to be used to compare with new object

    //--------$$ end $$ ----------
  }

  updatedObj: any = {};

  updateBeneficiary() {
    let identityData = {
      govtIdentityNo: this.aadharNo,
      govtIdentityTypeID: this.identityType,
    };
    this.updatedObj = {};
    this.updatedObj.beneficiaryRegID = this.beneficiaryRegID;
    this.updatedObj.firstName = this.firstName;
    //	this.updatedObj.middleName = this.middleName;
    this.updatedObj.lastName = this.lastName ? this.lastName : null; //this is done so that flag is updated as it might to made undefined from string
    // debugger
    if (this.DOB) {
      this.updatedObj.dOB = new Date(
        this.DOB - 1 * (this.DOB.getTimezoneOffset() * 60 * 1000)
      ).toJSON();
    } else {
      this.updatedObj.dOB = undefined;
    }
    this.updatedObj.ageUnits = this.ageUnit;
    this.updatedObj.fatherName = this.fatherNameSpouseName
      ? this.fatherNameSpouseName
      : null;
    this.updatedObj.spouseName = this.lastName ? this.lastName : null;
    // if (this.identityType == 1) {
    // 	this.updatedObj.aadharNo = this.aadharNo;
    // }
    // else {
    // 	this.updatedObj.govtIdentityNo = this.aadharNo;
    // }

    this.updatedObj.beneficiaryIdentities = [];
    this.updatedObj.beneficiaryIdentities.push(identityData);

    // this.updatedObj.govtIdentityNo = this.aadharNo ? this.aadharNo : null;
    // this.updatedObj.govtIdentityTypeID = this.identityType;
    //	this.updatedObj.emailID = this.emailID;
    // this.updatedObj.govtIdentityNo = null;
    // this.updatedObj.govtIdentityTypeID = null;

    this.updatedObj.titleId = this.titleId;
    this.updatedObj.statusID = this.statusID;
    // this.updatedObj.govtIdentityTypeID = this.govtIdentityTypeID;
    this.updatedObj.createdBy = this.agentData.userName;
    this.updatedObj.registeredServiceID = this.registeredServiceID;
    this.updatedObj.maritalStatusID = this.maritalStatusID;
    this.updatedObj.genderID = this.gender;
    this.updatedObj.vanID = this.getCommonData.current_serviceID;

    this.updatedObj.i_bendemographics = {};
    if (this.healthCareWorkerID != undefined) {
      this.updatedObj.i_bendemographics.healthCareWorkerID =
        this.healthCareWorkerID;
    }
    this.updatedObj.i_bendemographics.educationID = this.educationQualification;
    this.updatedObj.i_bendemographics.beneficiaryRegID = this.beneficiaryRegID;
    this.updatedObj.i_bendemographics.healthCareWorkerID =
      this.healthCareWorkerID;
    this.updatedObj.i_bendemographics.incomeStatusID = this.incomeStatusID;
    this.updatedObj.i_bendemographics.communityID = this.communityID;
    this.updatedObj.i_bendemographics.preferredLangID = this.preferredLangID;
    this.updatedObj.i_bendemographics.districtID = this.cityID;
    this.updatedObj.i_bendemographics.stateID = this.stateID;
    this.updatedObj.i_bendemographics.pinCode = this.pincode
      ? this.pincode
      : null;
    this.updatedObj.i_bendemographics.createdBy = this.agentData.userName;
    this.updatedObj.i_bendemographics.blockID = this.subDistrict;
    this.updatedObj.i_bendemographics.districtBranchID = this.village;
    this.updatedObj.i_bendemographics.addressLine1 = this.houseNumber
      ? this.houseNumber
      : null;

    this.updatedObj.benPhoneMaps = this.benOldObj.benPhoneMaps;
    this.updatedObj.benPhoneMaps[0].benRelationshipID = this.relationshipTypeID;
    this.updatedObj.benPhoneMaps[0].createdBy = this.agentData.userName;

    this.updatedObj.changeInSelfDetails = true;
    this.updatedObj.changeInIdentities = true;
    this.updatedObj.changeInOtherDetails = true;
    this.updatedObj.changeInAddress = true;
    this.updatedObj.changeInContacts = true;
    this.updatedObj.changeInFamilyDetails = true;

    let phones = this.updatedObj.benPhoneMaps.length;

    for (let j = 1; j < 6; j++) {
      if (this.updatedObj.benPhoneMaps[j]) {
        this.updatedObj.benPhoneMaps[j].createdBy = this.agentData.userName;
        this.updatedObj.benPhoneMaps[j].parentBenRegID = this.parentBenRegID;
        this.updatedObj.benPhoneMaps[j].benificiaryRegID =
          this.updatedObj.beneficiaryRegID;
        this.updatedObj.benPhoneMaps[j].benRelationshipID =
          this.relationshipTypeID;

        if (j === 1) {
          this.updatedObj.benPhoneMaps[j].phoneNo = this.alternateNumber1;
        }
        if (j === 2) {
          this.updatedObj.benPhoneMaps[j].phoneNo = this.alternateNumber2;
        }
        if (j === 3) {
          this.updatedObj.benPhoneMaps[j].phoneNo = this.alternateNumber3;
        }
        if (j === 4) {
          this.updatedObj.benPhoneMaps[j].phoneNo = this.alternateNumber4;
        }
        if (j === 5) {
          this.updatedObj.benPhoneMaps[j].phoneNo = this.alternateNumber5;
        }
        if (this.updatedObj.benPhoneMaps[j].createdBy) {
          this.updatedObj.benPhoneMaps[j].modifiedBy = this.agentData.userName;
        } else {
          this.updatedObj.benPhoneMaps[j].createdBy = this.agentData.userName;
          this.updatedObj.benPhoneMaps[j].deleted = false;
        }
      } else {
        const obj = {};
        obj["parentBenRegID"] = this.parentBenRegID;
        obj["benificiaryRegID"] = this.updatedObj.beneficiaryRegID;
        obj["benRelationshipID"] = this.relationshipTypeID;
        if (j === 1) {
          obj["phoneNo"] = this.alternateNumber1;
        }
        if (j === 2) {
          obj["phoneNo"] = this.alternateNumber2;
        }
        if (j === 3) {
          obj["phoneNo"] = this.alternateNumber3;
        }
        if (j === 4) {
          obj["phoneNo"] = this.alternateNumber4;
        }
        if (j === 5) {
          obj["phoneNo"] = this.alternateNumber5;
        }
        obj["modifiedBy"] = this.agentData.userName;
        obj["createdBy"] = this.agentData.userName;
        obj["deleted"] = false;
        this.updatedObj.benPhoneMaps.push(obj);
      }
    }

    this.diffUpdateBenData();
  }

  diffUpdateBenData() {
    //	console.log("DUMMY " + JSON.stringify(this.dummyBenDetails));

    this.updatedObj = JSON.stringify(this.updatedObj);
    this.updatedObj = JSON.parse(this.updatedObj);
    //	console.log("UPDATE" + JSON.stringify(this.updatedObj));

    let newUpdatedObj = {};
    newUpdatedObj = deepDiff(this.dummyBenDetails, this.updatedObj, true);
    //console.log(newUpdatedObj);

    let keys = [];
    keys = this.getKeys(newUpdatedObj);
    //	console.log(keys);

    if (
      keys.includes("titleId") ||
      keys.includes("firstName") ||
      keys.includes("lastName") ||
      keys.includes("dOB") ||
      keys.includes("genderID") ||
      keys.includes("maritalStatusID") ||
      keys.includes("fatherName") ||
      keys.includes("healthCareWorkerID")
    ) {
      newUpdatedObj["changeInSelfDetails"] = true;
      newUpdatedObj["titleId"] = this.titleId;
      newUpdatedObj["firstName"] = this.firstName;
      newUpdatedObj["lastName"] = this.lastName ? this.lastName : null;
      newUpdatedObj["dOB"] = new Date(
        this.DOB - 1 * (this.DOB.getTimezoneOffset() * 60 * 1000)
      ).toJSON();
      newUpdatedObj["genderID"] = this.gender;
      newUpdatedObj["fatherName"] = this.fatherNameSpouseName
        ? this.fatherNameSpouseName
        : null;
      newUpdatedObj["spouseName"] = this.lastName ? this.lastName : null;
      newUpdatedObj["maritalStatusID"] = this.maritalStatusID;
      if (this.healthCareWorkerID != undefined) {
        newUpdatedObj["i_bendemographics"]["healthCareWorkerID"] =
          this.healthCareWorkerID;
      }
    } else {
      newUpdatedObj["changeInSelfDetails"] = false;
    }

    if (
      keys.includes("govtIdentityNo") ||
      keys.includes("govtIdentityTypeID")
    ) {
      newUpdatedObj["changeInIdentities"] = true;
      newUpdatedObj["govtIdentityNo"] = this.aadharNo ? this.aadharNo : null;
      newUpdatedObj["govtIdentityTypeID"] = this.identityType;
    } else {
      newUpdatedObj["changeInIdentities"] = false;
    }

    if (keys.includes("educationID") || keys.includes("communityID")) {
      newUpdatedObj["changeInOtherDetails"] = true;
      newUpdatedObj["i_bendemographics"]["educationID"] =
        this.educationQualification;
      newUpdatedObj["i_bendemographics"]["incomeStatusID"] =
        this.incomeStatusID;
    } else {
      newUpdatedObj["changeInOtherDetails"] = false;
    }

    if (
      keys.includes("stateID") ||
      keys.includes("districtID") ||
      keys.includes("blockID") ||
      keys.includes("districtBranchID") ||
      keys.includes("addressLine1") ||
      keys.includes("pinCode")
    ) {
      newUpdatedObj["changeInAddress"] = true;
      newUpdatedObj["i_bendemographics"]["districtID"] = this.cityID;
      newUpdatedObj["i_bendemographics"]["stateID"] = this.stateID;
      newUpdatedObj["i_bendemographics"]["pinCode"] = this.pincode
        ? this.pincode
        : null;
      newUpdatedObj["i_bendemographics"]["blockID"] = this.subDistrict;
      newUpdatedObj["i_bendemographics"]["districtBranchID"] = this.village;
      newUpdatedObj["i_bendemographics"]["addressLine1"] = this.houseNumber
        ? this.houseNumber
        : null;
    } else {
      newUpdatedObj["changeInAddress"] = false;
    }
    newUpdatedObj["changeInContacts"] = true;
    newUpdatedObj["changeInFamilyDetails"] = true;

    //	console.log("NEW " + JSON.stringify(newUpdatedObj));

    // debugger;

    this._util.updateBeneficiaryData(JSON.stringify(this.updatedObj)).subscribe(
      (response) => {
        this.updateSuccessHandeler(response);
        this.getCommonData.districtID = response.i_bendemographics.districtID;
        this.getCommonData.blockID=response.i_bendemographics.m_districtblock.blockID;
      },
      (err) => {
        this.alertMessage.alert(err.status, "error");
      }
    );
  }

  getKeys(obj) {
    let all = {};
    function get(obj) {
      var keys = Object.keys(obj);
      for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        all[key] = true;
        var value = obj[key];
        if (value instanceof Object) {
          get(value);
        }
      }
    }
    get(obj);
    return Object.keys(all);
  }
  updateSuccessHandeler(response) {
    if (response.i_bendemographics.healthCareWorkerID) {
      this.getCommonData.healthcareTypeID =
        response.i_bendemographics.healthCareWorkerID;
    } else {
      this.getCommonData.healthcareTypeID = undefined;
    }

    this.retrieveRegHistoryByPhoneNo(this.callerNumber);
    // this.alertMessage.alert(this.successfully_updated, 'success');
    if (this.hasHAOPrivilege) {
      this.alertMessage
        .confirm(
          "Confirm Alert",
          this.currentLanguageSet
            .beneficiaryDetailsModifiedSuccessfullyYouWantToProceedHao
        )
        .subscribe((response) => {
          if (response) {
            this.navigateToHAO();
          } else {
            this.closurePage.emit();
          }
        });
    } else {
      this.alertMessage.alert(
        this.currentLanguageSet.beneficiaryDetailsModifiedSuccessfully,
        "success"
      );
      this.registerService.checkForDemographicDetails(false);
    }
    this.benUpdationResponse = response;
    this.regHistoryList = "";
    this.regHistoryList = [response];
    let obj = { beneficiaryRegID: response.beneficiaryRegID };
    this.onBenRegDataSelect.emit(obj);
    this.showForm = false;
    //this.showTableFlag = true;
    jQuery("#registerForm").trigger("reset");
    this.personIsSelf = false;
    this.updateBeneficiry = false;
    this.nexButtonEvent.emit(false); //can be removed in future if provider services are no longer in use, also has to remove from its parent html & its function in ts....gursimran 2/10/18
    var idx = jQuery(".carousel-inner div.active").index();
    jQuery("#myCarousel").carousel(idx + 1);
    jQuery("#three").parent().find("a").removeClass("active-tab");
    jQuery("#three").find("a").addClass("active-tab");
    this.closurePage.emit(); //added now 10/2/18 since provider services page is removed...Gursimran
  }

  // getLatestValidPrescriptions() {
  // 	let data = "{'beneficiaryRegID':'" + this.beneficiaryRegID + "'}";
  // 	this.prescriptionService.getlatestValidPescription(data).subscribe(response => this.LatestValidPrescriptions = this.successHandeler(response))
  // }

  resendPrescription(mobileNumber) {
    this.saveAlternateNumber(this.beneficiaryRegID, mobileNumber);
  }

  successHandeler(response) {
    //			console.log('the response is', response);
    return response;
  }
  /** Purpose: callback function after registering a beneficiary */
  regSuccessHandeler(response) {
    this.getCommonData.benRegID = response.beneficiaryRegID;
    this.getHealthIdDetails(response.beneficiaryRegID);
    // this.getCommonData.beneficiary_gender_name = response.beneficiaryRegID;

    if (response.i_bendemographics.healthCareWorkerID) {
      this.getCommonData.healthcareTypeID =
        response.i_bendemographics.healthCareWorkerID;
    } else {
      this.getCommonData.healthcareTypeID = undefined;
    }
    var generatedId =
      this.currentLanguageSet.beneficiaryRegisteredSuccessfullyRegistartionID +
      "\n" +
      response.beneficiaryID;

      // observable to enable the proceedtohao button after success response if it is not a emergency case 
      this.registerService.getIsEmergency(false);

    //	console.log("Registration success");
    let dialogReff = this.dialog.open(RegisteredBeneficiaryModal104, {
      // height: '280px',
      width: "420px",
      disableClose: true,
      data: {
        Title: "Success",
        generatedId: generatedId,
      },
    });
    // Diamond Khanna, 7 June,2018 //"Added to update beneficiary in call, only after registration"
    let addBenCallID = Object.assign({}, response, {
      benCallID: this.getCommonData.benDataInRO.benCallID,
    });
    this.updateBenInCall(addBenCallID);
    // ends**
    this.updateCallerBeneficiaryID(
      response.beneficiaryRegID,
      this.getCommonData.benDataInRO.benCallID
    );
    this.onBenRegDataSelect.emit(response);

    dialogReff.afterClosed().subscribe((result) => {
      this.altPhNumber = result;

      //	this.closurePage.emit(); //added now 10/2/18 since provider services page is removed...Gursimran
      jQuery("#registerForm").trigger("reset");
      this.showForm = false;
      this.quesVisibilityFlag = true;
      //		jQuery('#cancelLink').attr('disabled', false);
      this.personIsSelf = false;
      this.isEmergency = false;
      this.nonEmergency = true;
      this.registerService.getIsEmergency(false);

      var idx = jQuery(".carousel-inner div.active").index();
      jQuery("#myCarousel").carousel(idx + 1);
      jQuery("#three").parent().find("a").removeClass("active-tab");
      jQuery("#three").find("a").addClass("active-tab");
      // jQuery("#two").parent().find("a").removeClass('active-tab');
      // jQuery("#two").find("a").addClass("active-tab");

      if (
        this.altPhNumber == undefined &&
        this.altPhNumber != "" &&
        this.altPhNumber != "close"
      ) {
        console.log("Registered number will be used"); // Registered number will be used

        // ** code to send SMS **
        this.sendSMS(response.beneficiaryRegID);
      } else if (
        this.altPhNumber != undefined &&
        this.altPhNumber != "" &&
        this.altPhNumber != "close"
      ) {
        this.saveAlternateNumber(generatedId, this.altPhNumber);
        console.log(this.altPhNumber);
        this.sendSMS(response.beneficiaryRegID, this.altPhNumber);
      } else {
        this.messageAlertHAO();
      }
    });
    this.retrieveRegHistoryByPhoneNo(this.callerNumber);

    return response;
  }

  updateBenInCall(data) {
    data.isCalledEarlier = this.hasCalledEarlierFlag;
    if (data.beneficiaryRegID == null)
      this.alertMessage.alert(
        this.currentLanguageSet
          .beneficiaryregidIsNullPleaseContactAdministrator,
        "error"
      );
    else {
      this._util.updatebeneficiaryincall(data).subscribe(
        (response) => {
          if (response.statusCode != undefined && response.statusCode == 200) {
            //	console.log(response, 'success while updating ben in call');
          }
          //	console.log(response, 'success while updating ben in call');
        },
        (err) => {
          console.log(err.errorMessage, "Error while updating ben in call");
        }
      );
    }
  }

  navigateToHAO() {
    console.log("navigateToHAO called");
    this.getCommonData.current_role = "HAO";
    this.roleChanged.emit("HAO");
    this.getCommonData.roleChanged.next("HAO");
  }

  checkHAOPrivilege() {
    for (let i = 0; i < this.privleges.length; i++) {
      if (this.privleges[i].serviceName == "104") {
        for (let j = 0; j < this.privleges[i].roles.length; j++) {
          for (
            let k = 0;
            k < this.privleges[i].roles[j].serviceRoleScreenMappings.length;
            k++
          ) {
            if (
              this.privleges[i].roles[j].serviceRoleScreenMappings[k].screen
                .screenName == "Health_Advice"
            ) {
              //	consoole.log('Agent has HAO privilege');
              this.hasHAOPrivilege = true;
            }
          }
        }
      }
    }
  }

  genderErrFlag: any = false;
  //	genderFlag: any = true;
  genderchange(value) {
    if (value == "") {
      this.genderErrFlag = true;
      //		this.genderFlag = true;
    } else {
      this.genderErrFlag = false;
      //			this.genderFlag = false;
    }
  }
  ageFlag: any = true;
  ageInput(value) {
    if (this.is_a_healthcare_worker == "Yes") {
      if (value == undefined || value == "") {
        this.ageFlag = true;
      } else if (value >= 16 && value <= 120) {
        this.ageFlag = false;
      } else {
        this.ageFlag = true;
      }
    }
    if (this.is_a_healthcare_worker == "No") {
      if (value == undefined || value == "") {
        this.ageFlag = true;
      } else if (value >= 1 && value <= 120) {
        this.ageFlag = false;
      } else {
        this.ageFlag = true;
      }
    }
  }
  // stateFlag: any = true;
  //stateErrFlag: any = false;

  stateSelect(value) {
    let res = this._locationService
      .getDistricts(value)
      .subscribe((response) => this.SetDistricts(response));
    // if (this.nonEmergency) {
    // 	if (value == '' || value == undefined) {
    // 		this.stateErrFlag = true;
    // 		// this.stateFlag = true;
    // 	}
    // 	else {
    // 		this.stateErrFlag = false;
    // 		// this.stateFlag = false;
    // 	}
    // }
    // else {
    // 	// this.stateFlag = true;
    // }
  }
  SetDistricts(response: any) {
    this.districts = response;
  }

  // to Calculate the age on the basis of date of birth
  //dobFlag = true;
  //dobFlag = true;
  // populateAge(datee) {
  // 	const date = new Date(datee);

  // 	let age = this.today.getFullYear() - date.getFullYear();
  // 	const month = this.today.getMonth() - date.getMonth();
  // 	if (month < 0 || (month === 0 && this.today.getDate() < date.getDate())) {
  // 		age--;
  // 	}

  // 	if (isNaN(age)) {
  // 		age = 0;
  // 	}
  // 	return age;
  // }
  calculateAge(datee) {
    if (datee) {
      const dateDiff = Date.now() - datee.getTime();
      const age = new Date(dateDiff);
      const yob = Math.abs(age.getFullYear() - 1970);
      const mob = Math.abs(age.getMonth());
      const dob = Math.abs(age.getDate() - 1);
      if (yob > 0) {
        this.age = yob;
        this.ageUnit = "years";
      } else if (mob > 0) {
        this.age = mob;
        this.ageUnit = "months";
      } else if (dob > 0) {
        this.age = dob;
        this.ageUnit = "days";
      }
      if (datee.setHours(0, 0, 0, 0) == this.today.setHours(0, 0, 0, 0)) {
        this.age = 1;
        this.ageUnit = "days";
      }
      this.ageFlag = false;
    } else {
      this.age = null;
    }
  }
  // calculate date of birth on the basis of age

  calculateDOB() {
    let valueEntered = this.age;
    if (valueEntered) {
      if (valueEntered > this.ageLimit && this.ageUnit == "years") {
        this.alertMessage.alert(
          this.currentLanguageSet.ageCanOnlyBeSetBetweenTodayTo +
            " " +
            this.ageLimit +
            " " +
            this.currentLanguageSet.years,
          "info"
        );
        this.age = null;
      } else {
        this.DOB = moment().subtract(this.ageUnit, valueEntered).toDate();
      }
    }
  }
  titleSelected(value) {
    if (value == 3 || value == 8) {
      this.gender = 1;
    } else if (value == 4 || value == 5) {
      this.gender = 2;
    } else {
      this.gender = "";
    }
  }

  idMaxValue: any;
  patternID: any;
  idErrorText: string;
  // tempIDtype: any = "";
  validateID(idType: any) {
    // if(idType.identityType == 'Aadhar') {
    // 	this.tempIDtype = 'Aadhar';
    // }
    // console.log(this.tempIDtype);
    // this.aadharNo = "";
    this.registrationForm.controls["aadharNo"].setValue(null);
    this.validateIDonDoCheck(idType);
  }

  validateIDonDoCheck(idType: any) {
    switch (idType) {
      case 1: {
        this.idMaxValue = "12";
        this.patternID = /^\d{4}\d{4}\d{4}$/;
        this.idErrorText = this.currentLanguageSet.enterValidAadharNumber;
        break;
      }
      case 2: {
        this.idMaxValue = "15";
        this.patternID = /^([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*$/;
        this.idErrorText =
          this.currentLanguageSet.enterValidVoterIdAlphanumericMinLetters;
        break;
      }
      case 3: {
        this.idMaxValue = "15";
        this.patternID = /^([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*$/;
        this.idErrorText =
          this.currentLanguageSet.enterValidDrivingLicenceAlphanumeric;
        break;
      }
      case 4: {
        this.idMaxValue = "10";
        this.patternID = /^([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*$/;
        this.idErrorText =
          this.currentLanguageSet.enterValidPanAlphanumericMinLetters;
        break;
      }
      case 5: {
        this.idMaxValue = "15";
        this.patternID = /^([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*$/;
        this.idErrorText =
          this.currentLanguageSet.enterValidPassportNoAlphanumeric;
        break;
      }
      case 6: {
        this.idMaxValue = "15";
        this.patternID = /^([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*$/;
        this.idErrorText =
          this.currentLanguageSet.enterValidRationNoExAlphanumeric;
        break;
      }
      default:
        this.idMaxValue = "14";
        this.patternID = /^\d{4}\s\d{4}\s\d{4}$/;
        this.idErrorText = this.currentLanguageSet.enterValidAadharEx;
        break;
    }
  }
  /*JA354063 -- QuickSearch on BenID, ABHA Address, ABHA Number */
  viewALL: any = true;
  retriveById(searchTerm?: string) {
    this.viewALL = false;
    const searchObject = {
      beneficiaryID: null,
      HealthID: null,
      HealthIDNumber: null,
    };
    if (this.validateSearchItem(searchTerm, searchObject)) {
      let res = this._util
        .retrieveRegHistory(searchObject)
        .subscribe((response) => {
          if (response !== undefined && response !== null) {
            this.handlesuccess(response);
          }
        });
    }
  }
  validateSearchItem(searchTerm, searchObject) {
    if (
      searchTerm === undefined ||
      searchTerm === null ||
      searchTerm.trim() == "" ||
      searchTerm.trim().length <= 0
    ) {
      this.beneficiaryResults = [];
      this.alertMessage.alert("Please enter a valid input", "info");
      return false;
    } else {
      if (searchTerm.trim().length >= 8 && searchTerm.trim().length <= 32) {
        if (searchTerm.trim().length === 12) {
          return this.validateBenID(searchTerm.trim(), searchObject);
        } else if (
          searchTerm.trim().length === 14 ||
          searchTerm.trim().length === 17
        ) {
          return this.checkValidHealthIDNumber(searchTerm, searchObject);
        } else {
          return this.validateHealthIDPattern(searchTerm.trim(), searchObject);
        }
      } else {
        this.beneficiaryResults = [];
        this.alertMessage.alert("Please enter a valid input", "info");
        return false;
      }
    }
  }
  validateBenID(searchTerm, searchObject) {
    const phoneNoPattern = /\d{12}$/;
    let verifyPhoneNoPattern = phoneNoPattern.test(searchTerm);
    if (verifyPhoneNoPattern) {
      searchObject["beneficiaryID"] = searchTerm;
      return true;
    } else {
      return this.validateHealthIDPattern(searchTerm, searchObject);
    }
  }
  checkValidHealthIDNumber(searchTerm, searchObject) {
    const healthidval = searchTerm.trim();
    if (searchTerm.trim().length === 14) {
      const healthIDNumberPatternWithoutHypen = /\d{14}$/;
      return this.validateHealthIDNumberPattern(
        healthIDNumberPatternWithoutHypen,
        healthidval,
        searchObject
      );
    } else if (healthidval.length === 17) {
      const healthIDNumberPatternWithHypen =
        /^(\d{2})-(\d{4})-(\d{4})-(\d{4})*$/;
      return this.validateHealthIDNumberPattern(
        healthIDNumberPatternWithHypen,
        healthidval,
        searchObject
      );
    } else {
      return this.validateHealthIDPattern(searchTerm, searchObject);
    }
  }
  validateHealthIDNumberPattern(pattern, healthidval, searchObject) {
    let checkPattern = pattern.test(healthidval);
    if (checkPattern) {
      searchObject["HealthIDNumber"] =
        healthidval.length === 14
          ? healthidval.substring(0, 2) +
            "-" +
            healthidval.substring(2, 6) +
            "-" +
            healthidval.substring(6, 10) +
            "-" +
            healthidval.substring(10, healthidval.length)
          : healthidval;
      return true;
    } else {
      return this.validateHealthIDPattern(healthidval, searchObject);
    }
  }

  validateHealthIDPattern(healthidval, searchObject) {
    const healthIDPattern = /^([a-zA-Z0-9])+(\.[a-zA-Z0-9]+)?@([a-zA-Z]{3})$/;
    let checkPattern = healthIDPattern.test(healthidval);
    if (checkPattern) {
      searchObject["HealthID"] = healthidval;
      return true;
    } else {
      this.beneficiaryResults = [];
      this.alertMessage.alert("Please enter a valid input", "info");
      return false;
    }
  }
/*Ends */
  revertFullTable() {
    this.registrationNo = "";
    this.viewALL = true;
    this.retrieveRegHistoryByPhoneNo(this.callerNumber);
  }

  /* 3 July,2018
	Author:Diamond Khanna
	Purpose: SMS sending */
  sendSMS(generated_ben_id, alternate_Phone_No?) {
    let sms_template_id = "";
    let smsTypeID = "";
    let currentServiceID = this.getCommonData.current_serviceID;

    this._smsService.getSMStypes(currentServiceID).subscribe(
      (response) => {
        if (response != undefined) {
          if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
              if (
                response[i].smsType.toLowerCase() ===
                "Registration SMS".toLowerCase()
              ) {
                smsTypeID = response[i].smsTypeID;
                break;
              }
            }
          }
        }

        if (smsTypeID != "") {
          this._smsService
            .getSMStemplates(
              this.getCommonData.current_service.serviceID,
              smsTypeID
            )
            .subscribe(
              (res) => {
                if (res != undefined) {
                  if (res.length > 0) {
                    for (let j = 0; j < res.length; j++) {
                      if (res[j].deleted === false) {
                        sms_template_id = res[j].smsTemplateID;
                        break;
                      }
                    }
                  }

                  if (smsTypeID != "") {
                    let reqObj = {
                      alternateNo: alternate_Phone_No,
                      beneficiaryRegID: generated_ben_id,
                      createdBy: this.agentData.userName,
                      is1097: false,
                      providerServiceMapID:
                        this.getCommonData.current_service.serviceID,
                      smsTemplateID: sms_template_id,
                      smsTemplateTypeID: smsTypeID,
                      // "userID": 0
                    };
                    let reqArr = [];
                    reqArr.push(reqObj);

                    this._smsService.sendSMS(reqArr).subscribe(
                      (response) => {
                        //	console.log(response, 'SMS Sent');
                        if (response) {
                          setTimeout(() => this.messageAlertHAO(), 1);
                          this.alertMessage.alert(
                            this.currentLanguageSet.smsSent,
                            "success"
                          );
                        }
                      },
                      (err) => {
                        this.messageAlertHAO();
                        console.log(err, "SMS not sent Error");
                      }
                    );
                  }
                }
              },
              (err) => {
                this.messageAlertHAO();
                console.log(err, "Error in fetching sms templates");
              }
            );
        }
      },
      (err) => {
        console.log(err, "error while fetching sms types");
      }
    );
  }

  messageAlertHAO() {
    if (this.hasHAOPrivilege) {
      this.alertMessage
        .confirm(
          "Confirm Alert",
          this.currentLanguageSet.doYouWantToProceedToHao
        )
        .subscribe((res) => {
          if (res) {
            this.navigateToHAO();
          } else {
            this.closurePage.emit();
          }
        });
    }
  }

  onAgeUnitEntered() {
    if (this.age != null) {
      this.calculateDOB();
    }
  }
}
// Registered Beneficiary Modal window component

@Component({
  selector: "beneficiary-modal",
  templateUrl: "./beneficiary-registered-104_Modal.html",
})
export class RegisteredBeneficiaryModal104 {
  altNum: any = false;
  mobileNumber: any;
  validNumber: any = false;
  bbi: any; // send to bloodbank flag in inbound
  bbo: any; // send to bloodbank flag in outbound
  current_campaign: any;
  currentLanguageSet: any;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialog: MdDialog,
    public dialogReff: MdDialogRef<RegisteredBeneficiaryModal104>,
    public getCommonData: dataService,
    public HttpServices: HttpServices
  ) {
    this.current_campaign = this.getCommonData.current_campaign;
  }

  ngOnInit() {
    this.assignSelectedLanguage();
  }

  ngDoCheck() {
    this.assignSelectedLanguage();
  }

  assignSelectedLanguage() {
    const getLanguageJson = new SetLanguageComponent(this.HttpServices);
    getLanguageJson.setLanguage();
    this.currentLanguageSet = getLanguageJson.currentLanguageObject;
  }

  requestedHospitals: any = this.data.mobileNumbers;
  mobileNum(value) {
    if (value.length == 10) {
      this.validNumber = true;
    } else {
      this.validNumber = false;
    }
  }
}

// Beneficiary ABHA Details Modal window component

@Component({
  selector: "beneficiary-abha-modal",
  templateUrl: "./beneficiary-abha-details.html",
})
export class BeneficiaryABHADetailsModal {
  benAbhaDetails: any = [];

  currentLanguageSet: any;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogReff: MdDialogRef<BeneficiaryABHADetailsModal>,
    public HttpServices: HttpServices
  ) {}

  ngOnInit() {
    this.benAbhaDetails = this.data.abhaDetails;
    this.currentLanguageSetValue();
  }

  currentLanguageSetValue() {
    const getLanguageJson = new SetLanguageComponent(this.HttpServices);
    getLanguageJson.setLanguage();
    this.currentLanguageSet = getLanguageJson.currentLanguageObject;
  }

  ngDoCheck() {
    this.currentLanguageSetValue();
  }
}

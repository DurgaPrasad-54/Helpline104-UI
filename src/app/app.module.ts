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


import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { MaterialModule } from './material.module';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MdDatepickerModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdSelectModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdChipsModule, MdSnackBarModule } from '@angular/material';
import { InterceptedHttp } from './http.interceptor'
import { ConfirmationDialogsService } from './services/dialog/confirmation.service'
import { httpFactory } from './http.factory';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/common/loader.service';
import { AppComponent } from './app.component';
// login components
import { loginContentClass } from './login/login.component';
import { ResetComponent } from './resetPassword/resetPassword.component';
import { SetSecurityQuestionsComponent } from './set-security-questions/set-security-questions.component';
import { MyPasswordDirective } from './directives/password/myPassword.directive';
import { MyMobileNumberDirective, StrengthDirective } from './directives/MobileNumber/myMobileNumber.directive';
import { MyEmailDirective } from './directives/email/myEmail.directive';
import { NameDirective, NameSpaceDirective, AlphanumericDirective } from './directives/name/myName.directive';
import { myAddress } from './directives/address/myAddress.directive';
// dashboard components
import { dashboardContentClass } from './dashboard/dashboard.component';
import { DashboardRowHeaderComponent } from './dashboard-row-header/dashboardRowHeader.component';
import { DashboardNavigationComponent } from './dashboard-navigation/dashboardNavigation.component';
import { DashboardUserIdComponent } from './dashboard-user-id/dashboardUserId.component';
import { ActivityThisWeekComponent } from './activity-this-week/activity-this-week.component';
import { AlertsNotificationComponent } from './alerts-notifications/alerts-notifications.component';
import { DailyTasksComponent } from './daily-tasks/daily-tasks.component';
import { NewsInformationsComponent } from './news-informations/news-informations.component';
import { RatingComponent } from './rating/rating.component';
import { CallStatisticsComponent } from './call-statistics/call-statistics.component';
import { ListnerService } from './services/common/listner.service';
import { OutboundListnerService } from './services/common/outboundlistner.service';

// multi role screen component
import { MultiRoleScreenComponent } from './multi-role-screen/multi-role-screen.component';
import { ServiceRoleSelectionComponent } from './service-role-selection/service-role-selection.component';

// innerpage components
import { InnerpageComponent } from './innerpage/innerpage.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { NotificationsDialogComponent } from './notifications-dialog/notifications-dialog.component';
import { EditNotificationsComponent } from './edit-notifications/edit-notifications.component';

import { CommonDialogComponent } from './common-dialog/common-dialog.component'

// cdss components
import { InsertComplaintComponent } from './insert-complaint/insert-complaint.component';
import { AlgoComponentComponent } from './algo-component/algo-component.component';



// admin components

// services
import { loginService } from './services/loginService/login.service';
import { dataService } from './services/dataService/data.service';
import { DashboardHttpServices } from './http-service/http-service.service';
import { HttpServices } from './services/http-services/http_services.service';
import { SearchService } from './services/searchBeneficiaryService/search.service';
import { CoCategoryService } from './services/coService/co_category_subcategory.service';
import { CoReferralService } from './services/coService/co_referral.service';
import { FeedbackTypes } from './services/common/feedbacktypes.service';
import { LocationService } from './services/common/location.service';
import { UserBeneficiaryData } from './services/common/userbeneficiarydata.service';
import { CoFeedbackService } from './services/coService/co_feedback.service';
import { SioService } from './services/sioService/sio.service';
import { EpidemicServices } from './services/sioService/epidemicServices.service';
import { CDSSService } from './services/cdssService/cdss.service';
import { OrganDonationServices } from './services/sioService/organDonationServices.service';
import { BloodOnCallServices } from './services/sioService/bloodOnCallServices.service';
import { FoodSafetyServices } from './services/sioService/foodSafetyService.service';
import { CallerService } from './services/common/caller.service';
import { CzentrixServices } from './services/czentrix/czentrix.service';
import { PrescriptionService } from './services/prescriptionServices/prescription.service';
import { ConfigService } from './services/config/config.service';
import { CallServices } from './services/callservices/callservice.service';
import { OutboundSearchRecordService } from './services/outboundServices/outbound-search-records.service';
import { OutboundReAllocationService } from './services/outboundServices/outbound-call-reallocation.service';
import { OutboundCallAllocationService } from './services/outboundServices/outbound-call-allocation.service';
import { OutboundWorklistService } from './services/outboundServices/outbound-work-list.service';
import { AvailableServices } from './services/common/104-services';
import { SupervisorCallTypeReportService } from './services/supervisorServices/supervisor-calltype-reports-service.service';
import { DiseaseScreeningService } from './services/screening/diseaseScreening.service';
import { SurveyorReportsService } from './services/surveyorServices/surveyor.reports.service';
import { UtilityService } from './services/common/utility.service';
import { SnomedService } from './services/snomedService/snomed-service.service';
import { SessionService } from './services/common/session.service';
import { SocketService } from './services/socketService/socket.service';
import { ForceLogoutService } from './services/supervisorServices/forceLogoutService.service';
import { SmartsearchService } from './services/common/smartsearch-service.service';
import { FeedbackService } from './services/supervisorServices/Feedbackservice.service';
import { SetPasswordComponent } from './set-password/set-password.component';
import { Helpline_104_Component } from './104/104.component';
import { Sio_104_Component } from './104-sio/104-sio.component';
import { Co_104_Component } from './104-co/104-co.component';
import { Mo_104_Component } from './104-mo/104-mo.component';
import { Pd_104_Component } from './104-pd/104-pd.component';
import { Hao_104_Component } from './104-hao/104-hao.component';
import { Ro_104_Component } from './104-ro/104-ro.component';
import { Supervisor_104_Component } from './104-supervisor/104-supervisor.component';
import { surveyor_104_Component } from './104-surveyor/104-surveyor.component';
import { BeneficiaryABHADetailsModal, BeneficiaryRegistration104Component } from './beneficiary-registration-104/beneficiary-registration-104.component';
import { RegisteredBeneficiaryModal104 } from './beneficiary-registration-104/beneficiary-registration-104.component';
import { CaseSheetComponent } from './case-sheet/case-sheet.component';
import { CaseSheetHistory } from './case-sheet/case-sheet.component';
import { CaseSheetCompModal } from './case-sheet/case-sheet.component';
import { prescriptionComponent } from './prescription/prescription.component';
import { SioServicesComponent } from './sio-services/sio-services.component';
import { SioGrievienceServiceComponent } from './sio-grievience-service/sio-grievience-service.component';
import { FeedbackResponseModel } from './sio-grievience-service/sio-grievience-service.component';
import { SioBloodOnCallServiceComponent } from './sio-blood-on-call-service/sio-blood-on-call-service.component';
import { SioBloodOnCallModel } from './sio-blood-on-call-service/sio-blood-on-call-service.component';
import { DiabeticScreeningModel } from './diabetic-screening-component/diabetic-screening-component';
import { SioEpidemicOutbreakServiceComponent } from './sio-epidemic-outbreak-service/sio-epidemic-outbreak-service.component';
import { SioFoodSafetyServiceComponent } from './sio-food-safety-service/sio-food-safety-service.component';
import { SioFoodSafetyModal } from './sio-food-safety-service/sio-food-safety-service.component';
import { SioOrganDonationServiceComponent } from './sio-organ-donation-service/sio-organ-donation-service.component';
import { SioOrganDonationModal } from './sio-organ-donation-service/sio-organ-donation-service.component'
import { SioInformationServiceComponent } from './sio-information-service/sio-information-service.component';
import { CDICallModel } from './surveyor-calltype-reports/surveyor-calltype-reports.component';
import { SioSchemeServiceComponent } from './sio-scheme-service/sio-scheme-service.component';
import { grievanceComponent } from './supervisor-grievance/grievance.component';
import { AlernateEmailModelComponent } from './alernate-email-model/alernate-email-model.component'
import { DirectoryServicesComponent } from './directory-services/directory-services.component';
import { DirectoryServicesModal } from './directory-services/directory-services.component';
import { SchemeService } from './services/sioService/sio-scheme.service';
import { CaseSheetService } from './services/caseSheetService/caseSheet.service';
import { OtherHelplineService } from './services/caseSheetService/other-helpline.service';
//import { SymptomCheckerComponent } from './cdss/cdss.component';
import { DialogOverviewExampleDialog } from './case-sheet/case-sheet.component';
import { SioServicesHistoryComponent } from './sio-services-history/sio-services-history.component';
import { SupervisorReportsComponent } from './supervisor-reports/supervisor-reports.component';
import { SupervisorCalltypeReportsComponent } from './supervisor-calltype-reports/supervisor-calltype-reports.component';
import { SupervisorCallQualityReportComponent } from './supervisor-call-quality-report/supervisor-call-quality-report.component';
import { SupervisorDistrictWiseCallVolumeReportComponent } from './supervisor-district-wise-call-volume-report/supervisor-district-wise-call-volume-report.component';
import { SupervisorUnblockUserReportComponent } from './supervisor-unblock-user-report/supervisor-unblock-user-report.component';
import { SupervisorComplaintDetailReportComponent } from './supervisor-complaint-detail-report/supervisor-complaint-detail-report.component';
import { BloodOnCallDetailedReportComponent } from './blood-on-call-detailed-report/blood-on-call-detailed-report.component';
import { MedicalAdviseReportComponent } from './medical-advise-report/medical-advise-report.component';
import { MentalHealthReportComponent } from './mental-health-report/mental-health-report.component';
import { SupervisorConfigurationsComponent } from './supervisor-configurations/supervisor-configurations.component';
import { AgentStatusComponent } from './agent-status/agent-status.component';
import { BlockUnblockNumberComponent } from './block-unblock-number/block-unblock-number.component';
import { DialBeneficiaryComponent } from './dial-beneficiary/dial-beneficiary.component';
import { QualityAuditComponent } from './quality-audit/quality-audit.component';
import { CaseSheetSummaryDialogComponent } from './quality-audit/quality-audit.component';
import { SupervisorNotificationsComponent } from './supervisor-notifications/supervisor-notifications.component';
import { ClosureComponent } from './closure/closure.component';
import { OutboundSearchRecordsComponent } from './outbound-search-records/outbound-search-records.component';
import { OutboundAllocateRecordsComponent } from './outbound-allocate-records/outbound-allocate-records.component';
import { SurveyorCalltypeReportsComponent } from './surveyor-calltype-reports/surveyor-calltype-reports.component';
import { SupervisorSchemeComponent } from './supervisor-upload-schemes/supervisor-uploadSchemes.component';
import { SearchFilterPipePipe } from './custom-pipe/search-filter-pipe.pipe';
import { Md2Module } from 'md2';
import { OutbondWorklistComponent } from './outbond-worklist/outbond-worklist.component';
import { OutboundWorklistModal } from './outbond-worklist/outbond-worklist.component';
import { AgentOutbondcallComponent } from './agent-outbondcall/agent-outbondcall.component';
import { ServicesComponent } from './104Services/104-services.component';
import { DiabeticScreeningComponent } from './diabetic-screening-component/diabetic-screening-component';
import { BPScreeningComponent } from './bp-screening-component/bp-screening-component';
import { SioOutboundProviderComponent } from './sio-outbound-provider/sio-outbound-provider.component';
import { KnowledgeManagementComponent } from './knowledge-management/knowledge-management.component';
import { UploadServiceService } from './services/upload-services/upload-service.service';
import { NotificationService } from './services/notificationService/notification-service';
import { TrainingResourcesComponent } from './training-resources/training-resources.component';
import { ReallocateCallsComponent } from './reallocate-calls/reallocate-calls.component';
import { AuthGuard } from './services/authGuardService/auth-guard.services';
import { AuthGuard2 } from './services/authGuardService/auth-guard2.services';
import { SecurityFactory } from './http.security.factory';
import { AuthService } from './services/authentication/auth.service';
import { SaveFormsGuard } from './services/authGuardService/auth-guard.services';
import { CaseSheetRecentPrescription } from './case-sheet/case-sheet.component';
import { SupervisorEmergencyContactsComponent } from './supervisor-emergency-contacts/supervisor-emergency-contacts.component';
import { SupervisorTrainingResourcesComponent } from './supervisor-training-resources/supervisor-training-resources.component';
import { SupervisorAlertsNotificationsComponent } from './supervisor-alerts-notifications/supervisor-alerts-notifications.component';
import { SupervisorLocationCommunicationComponent } from './supervisor-location-communication/supervisor-location-communication.component';
import { SupervisorBloodUrlComponent } from './supervisor-blood-url/supervisor-blood-url.component';
import { SecurityInterceptedHttp } from './http.securityinterceptor';
import { SessionComponent } from './session/session.component';
import { OrderByPipe } from './order-by.pipe';
import { UtcDatePipe } from './utc-date.pipe';
import { ToasterModule } from 'angular2-toaster';
import { DashboardReportsComponent } from './dashboard-reports/dashboard-reports.component';
import { AlertsNotificationsDialogComponent } from './alerts-notifications/alerts-notifications.component';
import { ForceLogoutComponent } from './force-logout/force-logout.component';
import { CallTypeReportService } from './services/callTypeReports/callTypeReport.service';
import { EmergencyContactsViewModalComponent } from './emergency-contacts-view-modal/emergency-contacts-view-modal.component';
/*export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
} */

import { AgentForceLogoutComponent } from './agent-force-logout/agent-force-logout.component';
import { QualityAuditService } from './services/supervisorServices/quality-audit-service.service';
import { ReportService } from './services/report-services/report.service';
import { SmsTemplateComponent } from './sms-template/sms-template.component';
import { SmsTemplateService } from './services/supervisorServices/sms-template-service.service';
import { CasesheetHistoryMctsComponent } from './casesheet-history-mcts/casesheet-history-mcts.component';
import { CasesheetHistoryMmuComponent } from './casesheet-history-mmu/casesheet-history-mmu.component';
import { CallQComponent } from './casesheet-history-mcts/casesheet-history-mcts.component';
import { CancerCaseSheetComponent } from './casesheet-history-mmu/cancer-case-sheet/cancer-case-sheet.component';
import { CancerDoctorDiagnosisCaseSheetComponent } from './casesheet-history-mmu/cancer-case-sheet/cancer-doctor-diagnosis-case-sheet/cancer-doctor-diagnosis-case-sheet.component';
import { CancerExaminationCaseSheetComponent } from './casesheet-history-mmu/cancer-case-sheet/cancer-examination-case-sheet/cancer-examination-case-sheet.component';
import { CancerHistoryCaseSheetComponent } from './casesheet-history-mmu/cancer-case-sheet/cancer-history-case-sheet/cancer-history-case-sheet.component';
import { ImageToCanvasComponent } from './casesheet-history-mmu/cancer-case-sheet/image-to-canvas/image-to-canvas.component';
import { GeneralCaseSheetComponent } from './casesheet-history-mmu/general-case-sheet/general-case-sheet.component';
import { AncCaseSheetComponent } from './casesheet-history-mmu/general-case-sheet/anc-case-sheet/anc-case-sheet.component';
import { DoctorDiagnosisCaseSheetComponent } from './casesheet-history-mmu/general-case-sheet/doctor-diagnosis-case-sheet/doctor-diagnosis-case-sheet.component';
import { ExaminationCaseSheetComponent } from './casesheet-history-mmu/general-case-sheet/examination-case-sheet/examination-case-sheet.component';
import { HistoryCaseSheetComponent } from './casesheet-history-mmu/general-case-sheet/history-case-sheet/history-case-sheet.component';
import { PncCaseSheetComponent } from './casesheet-history-mmu/general-case-sheet/pnc-case-sheet/pnc-case-sheet.component';
import { ViewVersionDetailsComponent } from './view-version-details/view-version-details.component';
import { ChangeLogModalComponent } from './change-log-modal/change-log-modal.component';
import { SupervisorQualityReportComponent } from './supervisor-quality-report/supervisor-quality-report.component';
import { SupervisorDiseasesSummaryComponent } from './supervisor-diseases-summary/supervisor-diseases-summary.component';
import { SupervisorDiseaseSummaryService } from './services/supervisorServices/supervisor-disease-summary-service';
import { ViewDiseaseSummaryContentsComponent } from './view-disease-summary-contents/view-disease-summary-contents.component';
import { SupervisorCallSummaryReportComponent } from './supervisor-call-summary-report/supervisor-call-summary-report.component';
import { ViewDiseaseSummaryDetailsComponent } from './view-disease-summary-details/view-disease-summary-details.component';
import { CaseSheetCovidModalComponent } from './case-sheet-covid-modal/case-sheet-covid-modal.component';
import { Covid19Component } from './covid-19/covid-19.component';
import { CovidserviceService } from './services/covidService/covidservice.service';
import { HaoImrMmrInformationComponent } from './hao-imr-mmr-information/hao-imr-mmr-information.component';

import { BalVivahComponent } from './bal-vivah/bal-vivah.component';
import { BalVivahServiceService } from './services/sioService/bal-vivah-service.service';
import { SetLanguageComponent } from './set-language.component';
import { StringValidator } from './directives/stringValidator.directive';
import { TextareaDirective } from './directives/textarea/textarea.directive';
import { InputFieldValidatorDirective } from './directives/inputField/inputField.directive';
import { SmsTemplateValidatorDirective } from './directives/smsTemplate/smsTemplateValidator.directive';
import { AnswerValidatorDirective } from './directives/answer/answerValidator.directive';
import { SearchIdValidatorDirective } from './directives/searchId/searchIdValidator.directive';
import { BloodBankUrlValidatorDirective } from './directives/bloodBank/bloodBankUrlValidator.directive';
import { UsernameValidatorDirective } from './directives/username/usernameValidator.directive';
import { ClosureRemarksDirective } from './directives/closureRemarks/closureRemarks.directive';
import { MyMobileNumberDirectiveWithCopyPaste } from './directives/MobileNumber/myMobileNumberWithCopypaste.directive';
import { TextareaDirectiveWithCopyPaste } from './directives/textarea/textareawithcopypaste.directive';
import { IdValidatorDirective } from './directives/textarea/idValidator.directive';
import { AppNameDirectiveWithCopyPaste } from './directives/name/appNamewithCopyPaste.directive';
import { DiseaseSummaryEnableCopyPaste } from './directives/textarea/diseaseSummaryEnableCopyPaste';
import { PresentChiefComplaintDirective } from './directives/present-cheif-complaint/presentChiefComplaint.directive';
import { SmsTemplateValidatorDirectiveWithCopyPaste } from './directives/smsTemplate/smsTemplateValidatorWithCopypaste.directive';
import { RegisterService } from './services/register-services/register-service';
import { CounsellorHistory, Counsellor_104_Component } from './104-counsellor/104-counsellor.component';
import { ConsentFormComponent } from './104-consent/consent-form.component';
import { CheifComplaintSnomedSearchComponent } from './cheif-complaint-snomed-search/cheif-complaint-snomed-search.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { sessionStorageService } from './services/sessionStorageService/session-storage.service';
import { CaptchaService } from './services/captcha-service/captcha.service';
import { CaptchaComponent } from './captcha/captcha.component';
import { FeedbackPublicPageComponent } from './platform-feedback/pages/feedback-public-page/feedback-public-page-component';
import { FeedbackModule } from './platform-feedback/feedback.module';

@NgModule({
  declarations: [
    AppComponent, dashboardContentClass, loginContentClass, SearchFilterPipePipe,
    ResetComponent, MyPasswordDirective, InnerpageComponent, MultiRoleScreenComponent,
    DashboardRowHeaderComponent, DashboardNavigationComponent, CDICallModel, NameSpaceDirective, myAddress, AlphanumericDirective,
    DashboardUserIdComponent, ActivityThisWeekComponent, FeedbackResponseModel,
    AlertsNotificationComponent, DailyTasksComponent, NewsInformationsComponent, StrengthDirective,
    RatingComponent, CallStatisticsComponent, NameDirective, MyMobileNumberDirective,MyMobileNumberDirectiveWithCopyPaste, MyEmailDirective, AlernateEmailModelComponent,
    SetSecurityQuestionsComponent, SetPasswordComponent, ServiceRoleSelectionComponent,
    Helpline_104_Component, Sio_104_Component, Co_104_Component, Mo_104_Component, Pd_104_Component, SurveyorCalltypeReportsComponent,
    Hao_104_Component, Ro_104_Component, BeneficiaryRegistration104Component, CaseSheetComponent, prescriptionComponent,
    SioServicesComponent, SioGrievienceServiceComponent, SioBloodOnCallServiceComponent, DiabeticScreeningModel,
    SioEpidemicOutbreakServiceComponent, SioFoodSafetyServiceComponent, RegisteredBeneficiaryModal104, DirectoryServicesComponent,
    SioOrganDonationServiceComponent, SioInformationServiceComponent, grievanceComponent, SioSchemeServiceComponent, CaseSheetRecentPrescription,
    DialogOverviewExampleDialog, Supervisor_104_Component, surveyor_104_Component, SioFoodSafetyModal, CaseSheetHistory, CancerHistoryCaseSheetComponent,
    SioServicesHistoryComponent, SupervisorReportsComponent, SioBloodOnCallModel, CaseSheetCompModal, ImageToCanvasComponent,
    SupervisorConfigurationsComponent, AgentStatusComponent, BlockUnblockNumberComponent, SioOrganDonationModal, DirectoryServicesModal,
    DialBeneficiaryComponent, QualityAuditComponent, SupervisorNotificationsComponent, ClosureComponent, OutboundSearchRecordsComponent,
    OutboundAllocateRecordsComponent, OutbondWorklistComponent, AgentOutbondcallComponent, AncCaseSheetComponent, DoctorDiagnosisCaseSheetComponent,
    ServicesComponent, SupervisorCalltypeReportsComponent, SupervisorCallQualityReportComponent, SupervisorDistrictWiseCallVolumeReportComponent, SupervisorUnblockUserReportComponent,
    BloodOnCallDetailedReportComponent, SupervisorComplaintDetailReportComponent, MedicalAdviseReportComponent, MentalHealthReportComponent,
    SioOutboundProviderComponent, DiabeticScreeningComponent, BPScreeningComponent,
    KnowledgeManagementComponent, MessageDialogComponent, NotificationsDialogComponent, EditNotificationsComponent, CancerExaminationCaseSheetComponent,
    SupervisorAlertsNotificationsComponent, InsertComplaintComponent, AlgoComponentComponent, CommonDialogComponent, PncCaseSheetComponent,
    LoaderComponent, SupervisorSchemeComponent, TrainingResourcesComponent, ReallocateCallsComponent, SupervisorEmergencyContactsComponent,
    SupervisorTrainingResourcesComponent, SupervisorLocationCommunicationComponent, SupervisorBloodUrlComponent, ExaminationCaseSheetComponent,
    SessionComponent, OrderByPipe, UtcDatePipe, DashboardReportsComponent, CallQComponent, CancerCaseSheetComponent, HistoryCaseSheetComponent, OutboundWorklistModal,
    AlertsNotificationsDialogComponent, ForceLogoutComponent, CaseSheetSummaryDialogComponent, GeneralCaseSheetComponent, CancerDoctorDiagnosisCaseSheetComponent,
    EmergencyContactsViewModalComponent, AgentForceLogoutComponent, SmsTemplateComponent, CasesheetHistoryMctsComponent, CasesheetHistoryMmuComponent, ViewVersionDetailsComponent, ChangeLogModalComponent,
    SupervisorQualityReportComponent,
    SupervisorDiseasesSummaryComponent,
    ViewDiseaseSummaryContentsComponent,
    SupervisorQualityReportComponent, SupervisorCallSummaryReportComponent, ViewDiseaseSummaryDetailsComponent, CaseSheetCovidModalComponent, HaoImrMmrInformationComponent,BalVivahComponent,Covid19Component,
    SetLanguageComponent,BeneficiaryABHADetailsModal,StringValidator,TextareaDirective,TextareaDirectiveWithCopyPaste,InputFieldValidatorDirective,SearchIdValidatorDirective,SmsTemplateValidatorDirective,AnswerValidatorDirective,UsernameValidatorDirective,BloodBankUrlValidatorDirective,SmsTemplateValidatorDirectiveWithCopyPaste,
    ClosureRemarksDirective, IdValidatorDirective, AppNameDirectiveWithCopyPaste, DiseaseSummaryEnableCopyPaste, PresentChiefComplaintDirective, Counsellor_104_Component, ConsentFormComponent, CounsellorHistory, CheifComplaintSnomedSearchComponent,ScheduleAppointmentComponent, CaptchaComponent],
  imports: [
    // TranslateModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MdDatepickerModule,
    MdInputModule,
    MdNativeDateModule,
    Ng2SmartTableModule,
    BrowserAnimationsModule,
    MdSelectModule,
    MdButtonModule,
    MdChipsModule,
    Md2Module,
    MdSnackBarModule,
    ToasterModule,
    FeedbackModule,
    //AlertModule,
    RouterModule.forRoot([
      {
        path: 'resetPassword',
        component: ResetComponent
      },
      {
        path: '',
        component: loginContentClass
      },
      // {
      //   path: 'InnerpageComponent',
      //   component: InnerpageComponent

      // },
      // {
      //   path: 'InnerpageComponent/:mobileNumber/:callerID',
      //   component: InnerpageComponent,
      //   canActivate: [AuthGuard2],


      // },

      {
        path: 'setQuestions',
        component: SetSecurityQuestionsComponent
      },
      {
        path: 'outboundcall',
        component: AgentOutbondcallComponent,
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'dashboard',
      //   component: dashboardContentClass

      // },
      {
        path: 'MultiRoleScreenComponent',
        component: MultiRoleScreenComponent,
        //canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: ServiceRoleSelectionComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'dashboard',
            component: dashboardContentClass,
            canActivate: [AuthGuard]
          },
          {
            path: 'InnerpageComponent',
            component: InnerpageComponent,
            canActivate: [AuthGuard]

          },
          {
            path: 'RedirectToInnerpageComponent',
            component: InnerpageComponent,
            canActivate: [AuthGuard2],
          },
          {
            path: 'InnerpageComp',
            component: InnerpageComponent,
            canActivate: [AuthGuard2],
          },
          {
            path: 'OutboundWorkList',
            component: OutbondWorklistComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'Closure',
            component: ClosureComponent,
            canActivate: [AuthGuard2]
          },
          // {
          //   path: 'Appointment',
          //   component: ScheduleAppointmentComponent,
          //   canActivate: [AuthGuard2]
          // },
        ]
      },
      {
        path: 'setPassword',
        component: SetPasswordComponent
      },
      {
        path: '',
        redirectTo: '/loginContentClass',
        pathMatch: 'full'
      },
      {
        path: 'DiabeticScreeningComponent',
        component: DiabeticScreeningComponent,
        canActivate: [AuthGuard],
        // DiseaseScreeningComponent
      },
      {
        path: 'bpScreeningComponent',
        component: BPScreeningComponent,
        canActivate: [AuthGuard],
        // DiseaseScreeningComponent
      },
      {
        path: 'insert',
        component: InsertComplaintComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'counsellingCasesheet',
        component: Co_104_Component,
        canActivate: [AuthGuard],
      },
      {
        path: 'closureScreen',
        component: ClosureComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'feedback',
        component:FeedbackPublicPageComponent
      },
      
    ]),
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [loginService, dataService, DashboardHttpServices, HttpServices, SearchService, CoReferralService, SchemeService, CallServices,
    CoCategoryService, FeedbackTypes, LocationService, UserBeneficiaryData, CoFeedbackService,
    CzentrixServices, PrescriptionService, CaseSheetService, OtherHelplineService,
    SioService, EpidemicServices, CDSSService, OrganDonationServices, BloodOnCallServices, CallerService, FoodSafetyServices, ConfigService,sessionStorageService,
    SioService, EpidemicServices, CDSSService, OrganDonationServices, BloodOnCallServices, CallerService, FoodSafetyServices, ConfigService,
    DiseaseScreeningService, OutboundSearchRecordService, OutboundCallAllocationService, OutboundReAllocationService,
    OutboundWorklistService, AvailableServices, SupervisorCallTypeReportService, FeedbackService,
    UploadServiceService, AuthGuard, AuthGuard2, SaveFormsGuard, CallTypeReportService,
    NotificationService, SurveyorReportsService, ListnerService, AuthService,
    OutboundListnerService, UtilityService, SnomedService, ConfirmationDialogsService,
    LoaderService, SessionService, SocketService, ForceLogoutService, SmartsearchService,
    QualityAuditService, ReportService, SmsTemplateService, SupervisorDiseaseSummaryService,BalVivahServiceService,CovidserviceService,RegisterService,
    
    {

      provide: InterceptedHttp,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, LoaderService, Router, AuthService, ConfirmationDialogsService, SocketService]
    },
    {
      provide: SecurityInterceptedHttp,
      useFactory: SecurityFactory,
      deps: [XHRBackend, RequestOptions, Router, AuthService, ConfirmationDialogsService, SocketService]
    },
    CaptchaService
  ],


  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog,
    CaseSheetCovidModalComponent,
    prescriptionComponent,
    RegisteredBeneficiaryModal104,
    DirectoryServicesModal,
    FeedbackResponseModel,
    CommonDialogComponent,
    CaseSheetRecentPrescription,
    SioFoodSafetyModal,
    SioBloodOnCallModel,
    SioOrganDonationModal,
    CaseSheetCompModal,
    DiabeticScreeningModel,
    AlernateEmailModelComponent,
    MessageDialogComponent,
    NotificationsDialogComponent,
    EditNotificationsComponent, OutboundWorklistModal,
    CDICallModel, EmergencyContactsViewModalComponent, GeneralCaseSheetComponent,
    AlertsNotificationsDialogComponent, CallQComponent, CancerCaseSheetComponent,
    AgentForceLogoutComponent, CaseSheetSummaryDialogComponent, ViewVersionDetailsComponent,
    ChangeLogModalComponent, ViewDiseaseSummaryContentsComponent, ViewDiseaseSummaryDetailsComponent,
    BeneficiaryABHADetailsModal,Co_104_Component,ConsentFormComponent, CheifComplaintSnomedSearchComponent,ScheduleAppointmentComponent],

  // exports: [
  //   MaterialModule]

})
export class AppModule { }

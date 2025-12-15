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



import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdSelectModule } from '@angular/material';
import { MdSnackBar } from '@angular/material';
// services
import { CoCategoryService } from '../services/coService/co_category_subcategory.service';
import { dataService } from '../services/dataService/data.service';
import { UploadServiceService } from '../services/upload-services/upload-service.service';
import { ConfirmationDialogsService } from './../services/dialog/confirmation.service';
import {​​​​​​​​ HttpServices }​​​​​​​​ from"../services/http-services/http_services.service";
import { SetLanguageComponent } from 'app/set-language.component';
@Component({
  selector: 'app-knowledge-management',
  templateUrl: './knowledge-management.component.html',
  styleUrls: ['./knowledge-management.component.css']
})
export class KnowledgeManagementComponent implements OnInit {
  @ViewChild('myInput') myInputVariable: any;
  public categories:Array<any> = [];
  public subCategories:Array<any> = [];
  public services:Array<any> = [];
  public subcategoryOBJ;
  
  public file: File;
  knowledgeForm: FormGroup;
  maxFileSize = 5;
  valid_file_extensions = ['msg', 'pdf', 'png', 'jpeg', 'jpg', 'doc', 'docx', 'xlsx', 'xls', 'csv', 'txt'];
  invalid_file_flag: boolean = false;
  BloodRequestMode: boolean = false;

  // declaring variables
  public categoryID;
  public subCategoryID;
  public fileContent;
  public providerServiceMapID;
  public userID;
  public fileName;
  public fileExtension;
  public createdBy;
  public fileControl
  currentLanguageSet: any;
  fileList: FileList;
  error1: boolean = false;
  error2: boolean = false;
  invalidFileNameFlag:boolean = false;
  constructor(private fb: FormBuilder, private _coCategoryService: CoCategoryService,
    private _dataService: dataService, private _uploadService: UploadServiceService,
    private message: ConfirmationDialogsService,public HttpServices: HttpServices) {
    this.createForm();
  }

  // Create form intialization and object in ngOnInit
  ngOnInit() {
    this.assignSelectedLanguage();
    this.providerServiceMapID = this._dataService.current_service.serviceID;
    this.userID = this._dataService.uid;
    this.createdBy = this._dataService.Userdata.userName;
    this.getService();
  }
  ngDoCheck() {
    this.assignSelectedLanguage();
  }

  // form creation using reactive form form builder
  createForm() {
    this.knowledgeForm = this.fb.group({
      service: [''],
      category: [''], // <--- the FormControl called "name"
      subCategory: [''],
      fileInput: ['']
    });
  }
  getService() {
    // let serviceId= this.providerServiceMapID
    this._coCategoryService.getTypes(this.providerServiceMapID)
      .subscribe((response) => {
        this.services = response;
        // this.services = response.filter(function (item) {
        //   return item.subServiceName.trim().toLowerCase() === 'information service'
        //     || item.subServiceName.trim().toLowerCase() === 'counselling service'
        // });
      }, (err) => {
        console.log('Error in Knowledge Managemant Catyegory');
        // error catch here
      });
  }
  // getting list of category
  getCategory(obj: any) {
    this.subcategoryOBJ={};
    
    this._coCategoryService.getCategoriesByID(obj.subServiceID,this.providerServiceMapID)
      .subscribe((response) => {
        this.categories = response;
        if(this.categories.length == 0) {
          this.message.alert(this.currentLanguageSet.noCategoryFound);
        }
      }, (err) => {
        console.log('Error in Knowledge Managemant Catyegory');
        // error catch here
      });
  }

// "This piece of code can be used if we want to hide Cat-SubCat on Blood Request Subservice"

/*   checkServiceName(obj: any) {
    if (obj.subServiceName.toUpperCase() === 'Blood Request'.toUpperCase()) {
      this.BloodRequestMode = true;
    this.knowledgeForm.removeControl('category');
      this.knowledgeForm.removeControl('subCategory');
    }
    else {
      this.BloodRequestMode = false;
      const control: FormControl = new FormControl('category');
      const subcontrol: FormControl = new FormControl('subCategory');
      this.knowledgeForm.addControl('category', control);
      this.knowledgeForm.addControl('subCategory', subcontrol);
      this.knowledgeForm.patchValue(
        {
          category: undefined,
          subCategory: undefined
        }
      );
    }
  } */
  // getting list of subcategory by categoryId
  getSubCategory(categoryID: any) {
    this.subcategoryOBJ={};
    
    this._coCategoryService.getSubCategories(categoryID)
      .subscribe((response) => {
        this.subCategories = response;
      }, (err) => {
        console.log('Error in Knowledge Managemant Catyegory');
        // error catch here
      });
  }

  getSubcategoryObject(subCategoryID) {
    let subcategoryArr = this.subCategories.filter(function (item) {
      return item.subCategoryID === subCategoryID;
    });

   
    if (subcategoryArr.length > 0) {
      this.subcategoryOBJ = subcategoryArr[0];
    }

  }


  // submit event to submit the form
  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    const documentUploadObj = {};
    const documentUploadArray = [];
    if (valid && !(this.BloodRequestMode)) {
      documentUploadObj['fileName'] = value.fileInput;
      documentUploadObj['fileExtension'] = '.' + value.fileInput.split('.')[1];
      documentUploadObj['providerServiceMapID'] = this.providerServiceMapID;
      documentUploadObj['userID'] = this.userID;
      if(this.fileContent !== undefined && this.fileContent !== null && this.fileContent.length > 0){
      documentUploadObj['fileContent'] = this.fileContent.split(',')[1];
      }
      documentUploadObj['createdBy'] = this.createdBy;
      documentUploadObj['categoryID'] = value.category;
      documentUploadObj['subCategoryID'] = value.subCategory;
      documentUploadArray.push(documentUploadObj);
      this.uploadFile(documentUploadArray);
    }
    if (valid && this.BloodRequestMode) {
      const obj = {};
      obj['fileName'] = value.fileInput;
      obj['fileExtension'] = '.' + value.fileInput.split('.')[1];
      obj['providerServiceMapID'] = this.providerServiceMapID;
      obj['userID'] = this.userID;
      obj['fileContent'] = this.fileContent.split(',')[1];
      obj['createdBy'] = this.createdBy;
    }
  }
  // file change event
  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): any {
    this.file = undefined;
    this.fileList = inputValue.files;
    if (this.fileList.length == 0) {
      this.error1 = true;
      this.error2 = false;
      this.invalid_file_flag = false;
      this.invalidFileNameFlag=false;
    }
    else {
    this.file = inputValue.files[0];
    if (this.file) {

    let fileNameExtension = this.file.name.split(".");
    let fileName = fileNameExtension[0];
    if (fileName !== undefined && fileName !== null && fileName !== "") {
      var isvalid = this.checkExtension(this.file);
      console.log(isvalid, 'VALID OR NOT');
      if (isvalid) {
        if ((this.fileList[0].size / 1000 / 1000) > this.maxFileSize) {
          this.error2 = true;
          this.error1 = false;
          this.invalid_file_flag = false;
          this.invalidFileNameFlag=false;
        }
        else {
          this.error1 = false;
          this.error2 = false;
          this.invalid_file_flag = false;
          this.invalidFileNameFlag=false;
        this.knowledgeForm.controls['fileInput'].setValue(this.file.name);
        const myReader: FileReader = new FileReader();
        // binding event to access the local variable
        myReader.onloadend = this.onLoadFileCallback.bind(this)
        myReader.readAsDataURL(this.file);
        this.invalid_file_flag = false;
      }

    } else {
      this.invalid_file_flag = true;
      this.error1 = false;
      this.error2 = false;
      this.invalidFileNameFlag=false;
      this.knowledgeForm.controls['fileInput'].setValue('');
    }

  }
  else{
    this.invalidFileNameFlag=true;
     this.error1 = false;
     this.error2 = false;
     this.invalid_file_flag = false;
  }
  // this.message.alert(this.currentLanguageSet.invalidFileName, 'error');
    }
    else {
      this.knowledgeForm.controls['fileInput'].setValue('');
      this.invalid_file_flag = false;
    }
  }

}
  onLoadFileCallback = (event) => {
    this.fileContent = event.currentTarget.result;

  }

  checkExtension(file) {
    var count = 0;
    console.log("FILE DETAILS", file);
    if (file) {
      var array_after_split = file.name.split(".");
      if(array_after_split.length == 2) {
      var file_extension = array_after_split[array_after_split.length - 1];
      for (let i = 0; i < this.valid_file_extensions.length; i++) {
        if (file_extension.toUpperCase() === this.valid_file_extensions[i].toUpperCase()) {
          count = count + 1;
        }
      }

    if (count > 0) {
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}
  else {
    return true;
  }
}



  // Calling service Method to call the services
  uploadFile(uploadObj: any) {
    this._uploadService.uploadDocument(uploadObj).subscribe((response) => {
      console.log('KM configuration ', response);
      this.message.alert(this.currentLanguageSet.uploadedSuccessfully, 'success');
      this.file = undefined;
      this.invalidFileNameFlag=false;
      this.error1 = false;
      this.error2 = false;
      this.invalid_file_flag = false;
      this.myInputVariable.nativeElement.value = '';
      this.knowledgeForm.reset(this.knowledgeForm.value);
    }, (err) => {
      // this.message.alert(JSON.parse(err._body).errorMessage, 'error');
      this.message.alert(this.currentLanguageSet.failedToUploadFile, 'error');
      this.myInputVariable.nativeElement.value = '';
    })
  }
  assignSelectedLanguage() {
    const getLanguageJson = new SetLanguageComponent(this.HttpServices);
    getLanguageJson.setLanguage();
    this.currentLanguageSet = getLanguageJson.currentLanguageObject;
  }

  getFileURL(fileUID: string): string {
  // Construct URL using the fileUID
  const baseURL = 'https://guest:guest@uatamrit.piramalswasthya.org:8084/OpenKM/Download?uuid=';
  return baseURL + fileUID;
}
}

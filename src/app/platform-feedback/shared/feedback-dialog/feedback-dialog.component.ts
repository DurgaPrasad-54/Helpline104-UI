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
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import {
  FeedbackService,
  ServiceLine,
  CategoryDto,
} from "../../services/feedback.service";
import "rxjs/add/operator/finally";
import { sessionStorageService } from "app/services/sessionStorageService/session-storage.service";
import { HttpServices } from "app/services/http-services/http_services.service";
import { SetLanguageComponent } from "app/set-language.component";

// ---- Custom validators to replace Validators.min/max (not present on this Angular version)
function minValue(min: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const v = control && control.value;
    if (v === null || v === undefined || v === "") return null; // handle required separately
    const num = Number(v);
    return isNaN(num) || num < min ? { min: { required: min, actual: v } } : null;
  };
}
function maxValue(max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const v = control && control.value;
    if (v === null || v === undefined || v === "") return null;
    const num = Number(v);
    return isNaN(num) || num > max ? { max: { required: max, actual: v } } : null;
  };
}

@Component({
  selector: "app-feedback-dialog",
  templateUrl: "./feedback-dialog.component.html",
  styleUrls: ["./feedback-dialog.component.css"],
})
export class FeedbackDialogComponent implements OnInit {
  @Input() serviceLine: ServiceLine = "TM";
  @Input() defaultCategorySlug?: string;

  stars = [1, 2, 3, 4, 5];
  starLabels = ["Terrible", "Bad", "Okay", "Good", "Great"];
  categories: CategoryDto[] = [];
  submitting = false;
  error?: string;
  successId?: string;

  isLoggedIn = false;
  storedUserId?: string;

  // showCategory controls whether dropdown is shown (true if categories loaded)
  showCategory = true;

  form = this.fb.group({
    rating: [0, [minValue(1), maxValue(5)]], // replaced Validators.min/max
    categorySlug: ["", Validators.required],
    comment: ["", Validators.maxLength(2000)],
    isAnonymous: [true], // default adjusted in ngOnInit
  });

  current_language_set: any;

  constructor(
    private fb: FormBuilder,
    private api: FeedbackService,
    private sessionStorage: sessionStorageService,
    public httpService: HttpServices
  ) {}

  ngOnInit() {
    this.assignSelectedLanguage();

    // sessionStorage check (no optional chaining)
    try {
      const uid = this.sessionStorage.getItem("userID");
      this.storedUserId = uid ? uid : undefined;
      this.isLoggedIn = !!this.storedUserId;
    } catch (e) {
      this.isLoggedIn = false;
      this.storedUserId = undefined;
    }

    // default anonymity: true in both cases (tweak if your UX wants otherwise)
    this.form.controls["isAnonymous"].setValue(true);

    // load categories
    this.api.listCategories(this.serviceLine).subscribe({
      next: (list: CategoryDto[]) => {
        const arr = (list || []);
        // keep item if active is undefined OR true
        this.categories = arr.filter(function(c: any) {
          return c && (c.active === undefined || c.active === true);
        });

        this.showCategory = this.categories.length > 0;

        // compute default category safely (no ?. / ??)
        let def = "";
        if (this.defaultCategorySlug) {
          def = this.defaultCategorySlug;
        } else if (this.categories.length > 0 && this.categories[0] && this.categories[0].slug) {
          def = this.categories[0].slug;
        }

        if (def) {
          this.form.controls["categorySlug"].setValue(def);
        }
      },
      error: () => (this.error = "Could not load categories."),
    });
  }

  assignSelectedLanguage() {
    const getLanguageJson = new SetLanguageComponent(this.httpService);
    getLanguageJson.setLanguage();
    this.current_language_set = getLanguageJson.currentLanguageObject;
  }

  setRating(n: number) {
    this.form.controls["rating"].setValue(n);
  }

  toggleAnonymous(event: Event) {
    const input = event.target as HTMLInputElement;
    this.form.controls["isAnonymous"].setValue(!!(input && input.checked));
  }

  formInvalidForNow(): boolean {
    return this.form.invalid;
  }

  submit() {
    this.error = undefined;
    this.successId = undefined;

    if (this.formInvalidForNow()) {
      this.error = "Pick a rating and a category.";
      return;
    }

    // build payload (no optional chaining)
    const formValue: any = this.form.value || {};
    const payload: any = {
      rating: formValue.rating,
      categorySlug: formValue.categorySlug,
      comment: formValue.comment ? formValue.comment : undefined,
      isAnonymous: !!formValue.isAnonymous,
      serviceLine: this.serviceLine,
    };

    if (!payload.isAnonymous && this.isLoggedIn && this.storedUserId) {
      const parsed = parseInt(this.storedUserId as string, 10);
      payload.userId = isNaN(parsed) ? this.storedUserId : parsed;
    }

    this.submitting = true;
    this.api
      .submitFeedback(payload)
      .finally(() => (this.submitting = false))
      .subscribe({
        next: (res: any) => {
          this.successId = (res && res.id) ? res.id : "submitted";
          // reset form but keep anonymity default true
          let nextSlug = "";
          if (this.categories.length > 0 && this.categories[0] && this.categories[0].slug) {
            nextSlug = this.categories[0].slug;
          }
          this.form.reset({
            rating: 0,
            categorySlug: nextSlug,
            comment: "",
            isAnonymous: true,
          });
        },
        error: (e: any) => {
          if (e && e.status === 429) {
            this.error = "Too many attempts. Try later.";
          } else if (e && e.error && e.error.error) {
            this.error = e.error.error;
          } else {
            this.error = "Submission failed.";
          }
        },
      });
  }
}


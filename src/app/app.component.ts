import { Component, OnDestroy } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PackageService } from "../service/package.service";
import { NpmPackage } from "../model/npm-package";
import { CommonModule } from "@angular/common";
import { PackageCardComponent } from "./package-card/package-card.component";
import { MatInputModule } from "@angular/material/input";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { catchError, debounceTime, filter, of, Subject, switchMap, takeUntil } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, PackageCardComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  //Импортируем динамические изображение подсказки снизу текстбокса, когда оно не требуется в Angular Material
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: "dynamic" } }],
})
export class AppComponent implements OnDestroy {
  npmPackages: NpmPackage[] = [];
  selectedPackages: NpmPackage[] = [];
  minWidth: string = "100%";

  constructor(
    private packageSerivce: PackageService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      searchQuery: new FormControl(),
    });
  }

  private $destroyed = new Subject<void>();

  ngOnDestroy(): void {
    this.$destroyed.next();
    this.$destroyed.complete();
  }

  title = "package-cards";

  filterForm: FormGroup;

  refresh() {
    this.filterForm.reset();
    this.loadData();
  }

  loadData() {
    this.packageSerivce.getAll().subscribe({
      next: (result: NpmPackage[]) => {
        this.npmPackages = result;
        this.selectedPackages = result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.loadData();

    this.filterForm
      .get("searchQuery")
      ?.valueChanges.pipe(debounceTime(300), takeUntil(this.$destroyed))
      .subscribe((searchQuery: any) => {
        if (searchQuery == "") this.selectedPackages = this.npmPackages;
        else {
          this.selectedPackages = this.npmPackages.filter((pkg) => pkg.id.toLowerCase().includes(searchQuery.toLowerCase()));
          console.log(this.selectedPackages);
        }
      });
  }
}

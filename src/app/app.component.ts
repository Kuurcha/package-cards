import { Component, OnDestroy } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PackageService } from "../service/package.service";
import { NpmPackage } from "../model/npm-package";
import { CommonModule } from "@angular/common";
import { PackageCardComponent } from "./package-card/package-card.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { catchError, debounceTime, filter, of, Subject, switchMap, takeUntil } from "rxjs";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, PackageCardComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnDestroy {
  npmPackages: NpmPackage[] = [];
  selectedPackages: NpmPackage[] = [];

  constructor(private packageSerivce: PackageService) {}

  private $destroyed = new Subject<void>();

  ngOnDestroy(): void {
    this.$destroyed.next();
    this.$destroyed.complete();
  }

  filter = new FormControl("");

  ngOnInit(): void {
    this.packageSerivce.getAll().subscribe({
      next: (result: NpmPackage[]) => {
        this.npmPackages = result;
        this.selectedPackages = result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    this.filter.valueChanges.pipe(debounceTime(300), takeUntil(this.$destroyed)).subscribe((searchQuery: any) => {
      if (searchQuery == "") this.selectedPackages = this.npmPackages;
      else {
        this.selectedPackages = this.npmPackages.filter((pkg) => pkg.id.toLowerCase().includes(searchQuery.toLowerCase()));
        console.log(this.selectedPackages);
      }
    });
  }
  title = "package-cards";
}

import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PackageService } from "../service/package.service";
import { NpmPackage } from "../model/npm-package";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { PackageCardComponent } from "./package-card/package-card.component";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule, PackageCardComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  npmPackages: NpmPackage[] = [];
  constructor(private packageSerivce: PackageService) {}

  ngOnInit(): void {
    this.packageSerivce.getAll().subscribe({
      next: (result: NpmPackage[]) => {
        this.npmPackages = result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  title = "package-cards";
}

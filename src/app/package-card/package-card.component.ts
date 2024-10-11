import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardContainerComponent } from "../card-container/card-container.component";
import { NpmPackage } from "../../model/npm-package";

@Component({
  selector: "app-package-card",
  standalone: true,
  imports: [CommonModule, CardContainerComponent],
  templateUrl: "./package-card.component.html",
  styleUrl: "./package-card.component.scss",
})
export class PackageCardComponent {
  @Input() width: string = "70vh";
  @Input() height: string = "200px";

  @Input() npmPackages: NpmPackage[] = [];
}

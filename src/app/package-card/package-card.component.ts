import { Component, HostListener, Input, output } from "@angular/core";
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
  @Input() height: string = "300px";
  @Input() npmPackages: NpmPackage[] = [];
  @Input() depedencyPackageNames: string[] = [];

  hoveredName = output<string>();

  isPresentInDepedencyPackageArray(packageName: string): boolean {
    return this.depedencyPackageNames.includes(packageName);
  }

  onCardHover(packageName: string) {
    this.hoveredName.emit(packageName);
  }
}

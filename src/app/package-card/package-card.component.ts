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
  @Input() rows: number = 2;
  @Input() cols: number = 3;

  @Input() containerWidth: string = '70vh'; 
  @Input() containerHeight: string = '200px'; 

  itemWidth: number = 0;
  itemHeight: number = 0;
  calculateItemSize() {

      this.itemWidth = Math.floor(this.containerWidth / this.cols);
      this.itemHeight = Math.floor(this.containerHeight / this.rows);
  }

}

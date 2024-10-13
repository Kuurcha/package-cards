import { CommonModule } from "@angular/common";
import { Component, Input, output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "app-card-container",
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: "./card-container.component.html",
  styleUrl: "./card-container.component.scss",
})
export class CardContainerComponent {
  @Input({ required: true }) title!: string;
  @Input() weeklyDownloads: number | undefined;
  @Input() dependencyCount: number | undefined;
  @Input() isDependency: boolean = false;

  hoveredName = output<string>();

  onMouseEnter() {
    this.setNewName(this.title);
  }

  onMouseLeave() {
    this.setNewName("");
  }

  setNewName(packageName: string) {
    this.hoveredName.emit(packageName);
  }

  getPackagePrefix(packageName: string) {
    return packageName.substring(packageName.indexOf("@"), packageName.lastIndexOf("/") + 1);
  }

  getPackageName(packageName: string) {
    return packageName.substring(packageName.lastIndexOf("/") + 1, packageName.length);
  }

  roundOffTo(num: number, factor: number = 1) {
    const quotient = num / factor;
    const res = Math.round(quotient);
    return res;
  }

  formatDownloadCount(): string {
    if (!this.weeklyDownloads) return "0";
    if (this.weeklyDownloads < 1000) return this.weeklyDownloads?.toString();
    if (this.weeklyDownloads < 1000000) return this.roundOffTo(this.weeklyDownloads, 1000).toString() + "K";
    return this.roundOffTo(this.weeklyDownloads, 1000000).toString() + "M";
  }
}

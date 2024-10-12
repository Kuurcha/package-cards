import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-card-container",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: "./card-container.component.html",
  styleUrl: "./card-container.component.scss",
})
export class CardContainerComponent {
  @Input({ required: true }) title!: string;
  @Input() weeklyDownloads: number | undefined;
  @Input() dependencyCount: number | undefined;

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

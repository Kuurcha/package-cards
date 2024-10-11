import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-card-container",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./card-container.component.html",
  styleUrl: "./card-container.component.scss",
})
export class CardContainerComponent {
  @Input({ required: true }) title!: string;
  @Input() weeklyDownloads: number | undefined;
  @Input() dependencyCount: number | undefined;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mohz-website-ui';

  constructor(private wowService: NgwWowService) {
    // this.wowService.init();
  }

}

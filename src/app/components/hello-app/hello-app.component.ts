import { Component } from '@angular/core';

import { PageService } from '../../services/page/page.service';

@Component({
  selector: 'play-app',
  template: require('./hello-app.template.html')
})
export class HelloAppComponent {
  constructor(private page: PageService) {}
}

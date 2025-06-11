import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private authService: AuthenticationService) {}

  response: any;
  public parmissionMatched(allowedPermission: any): boolean {
    let isMatch = false;

    const userPermissions: any = this.authService.getPermissions();
    if (userPermissions != null && userPermissions) {
      for (var j = 0; j < userPermissions.length; j++) {
        // console.log(userPermissions[j]);
        for (var x = 0; x < allowedPermission.length; x++) {
          if (userPermissions[j].name == allowedPermission[x]) {
            isMatch = true;
            //console.log(allowedPermission[x]);
            break;
          }
        }
        if (isMatch) break;
      }
    }
    return isMatch;
  }
}

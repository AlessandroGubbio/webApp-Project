import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginService } from './login.service';
import { Role, UserDto } from 'src/app/dto/user.dto';

export const roleGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);
  const roles = [] as string[]
  const idUser = JSON.parse(localStorage.getItem('loggedUser')).idUser;

  try {
    const data = await loginService.checkAdmin(idUser).toPromise();
    data.forEach((element) => {
      console.log(element.name);
      roles.push(element.name);
    });
  } catch (error) {
    console.error('Error checking user roles:', error);

    router.navigate(['/login']);
    return false;
  }

  return roles.includes('ROLE_ADMIN');
};

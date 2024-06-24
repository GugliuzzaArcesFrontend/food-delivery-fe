import{CanActivateFn,Router}from'@angular/router';
import{AuthService}from'../services/auth.service';
import{inject}from'@angular/core';
import{User}from'../interfaces/user';
export const adminLoggedGuard:CanActivateFn=():boolean=>{
    const authService=inject(AuthService);
    const router=inject(Router);
    let authedUser!:User;
    authService.authedUser$.subscribe(user=>authedUser=user!=null?JSON.parse(user):null);
    if(!authedUser){
        router.navigate(['login']);return false
    }
    else {
        if(authedUser.role=='admin')
            return true;
        else{
            router.navigate(['login']);
            return false;
        }
    }
};
export const authGuard:CanActivateFn=():boolean=>{
    const authService=inject(AuthService);
    const router=inject(Router);
    let token!:string|null;authService.token$.subscribe(token$=>token=token$);
    if(token)
        return true;
    else {
        router.navigate(['login']);
        return false
    }
}
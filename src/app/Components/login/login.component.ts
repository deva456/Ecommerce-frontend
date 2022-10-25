import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { WebApiService } from 'src/app/web-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm!: FormGroup;
constructor(private Loginapi:WebApiService,private route:Router,private fb: FormBuilder){}
  ngOnInit(): void {
    
    if(localStorage.getItem('token')!=null){
      this.route.navigateByUrl('/');
      
    }
  }
  formModel = new FormGroup({

    UserName: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required])
  });

  SaveData() {
    // this.toastr.success('success login','done');
    this.Loginapi.LoginPost(this.formModel.value).subscribe(
      (res: any) => {

        localStorage.setItem('token',res.token);
        
        this.route.navigateByUrl('/');
        window.location.reload();
        console.log(res);
        if (res.succeeded) {
          this.formModel.reset();
          window.location.reload();
          console.log('Login successful.');
        }
        else {
          console.log("error occured");
        }
      }
      // err=>{
      //   if(err.status==400)
      //   this.toastr.error('Incorrect UserName or Password.','Authentication failed');
      //   else
      //   console.log(err);
      // }
    );
  }
}

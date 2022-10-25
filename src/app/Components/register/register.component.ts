import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegister } from 'src/app/Interface/IRegister';
import { WebApiService } from 'src/app/web-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userProfile!: IRegister;
  myForm!: FormGroup;
constructor(private Registerapi:WebApiService,private route:Router,private fb: FormBuilder){}
  ngOnInit(): void {
    
    this.formModel.reset();
  }
  formModel = new FormGroup({

    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    UserName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    PhoneNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    dob: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
   
    // ConfirmPassword:new FormControl('',[ Validators.required])
  });

  SaveData() {
    // debugger
   
    this.Registerapi.RegisterPost(this.formModel.value).subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.route.navigateByUrl('/login');
          console.log('New user created!', 'Registration successful.');
        }
        else {
          console.log("error occured");
          
        }
      }
    );
  }

}

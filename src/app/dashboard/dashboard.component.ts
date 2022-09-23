import { Component, OnInit } from '@angular/core';
import { CrudHttpService } from '../crud-http.service';
import{FormBuilder,FormGroup} from'@angular/forms';
import { EmployeeModel } from './employeeDashboard-Model';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  formValue!:FormGroup;
  empModel:EmployeeModel=new EmployeeModel();
  employeeData!:any;

  empList:any = [];
showModel: any;
showPassModel:any;

  constructor(private crudHttpService: CrudHttpService,private formBuilder:FormBuilder){}


  ngOnInit(): void {
    this.getAllEmployeeDetails();
    this.formValue=this.formBuilder.group({
      id:[''],
      firstname:[''],
      lastname:[''],
      email:['']
    })    
  }

  postEmployeeDetails(){
    this.empModel.id=this.formValue.value.id;
    this.empModel.first_name=this.formValue.value.firstname;
    this.empModel.last_name=this.formValue.value.lastname;
    this.empModel.email=this.formValue.value.email;

    this.crudHttpService.postEmployee(this.empModel).subscribe(res=>{
      console.log(res);
      alert("Employee Added successfully");
      this.formValue.reset();
      let ref=document.getElementById('cancel')
      ref?.click();
      this.getAllEmployeeDetails();
    },
    err=>{
      alert("Something Went Wrong")
    })

  }

  getAllEmployeeDetails(){
    this.crudHttpService.getEmployee().subscribe(res=>
      {
        this.formValue.reset();
        this.employeeData=res;
      })
  }

  deleteEmployee(row:any){
    this.crudHttpService.deleteEmployee(row.id).subscribe(res=>{
      this.getAllEmployeeDetails();
    })

  }

  onEdit(row:any){
    this.empModel.id=row.id;
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['firstname'].setValue(row.first_name);
    this.formValue.controls['lastname'].setValue(row.last_name);
    this.formValue.controls['email'].setValue(row.email);

  }
  updateEmployeeDetails(){
    this.empModel.id=this.formValue.value.id;
    this.empModel.first_name=this.formValue.value.firstname;
    this.empModel.last_name=this.formValue.value.lastname;
    this.empModel.email=this.formValue.value.email;     
    this.crudHttpService.updateEmployee(this.empModel,this.empModel.id).subscribe(res=>{
      this.formValue.reset();
      let ref=document.getElementById('cancel')
      ref?.click();
      this.getAllEmployeeDetails();
    })  
    
  }
  changePass(){
    alert("Password Updated Successfully");
  }

}

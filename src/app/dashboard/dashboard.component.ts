import { Component, OnInit } from '@angular/core';
import { CrudHttpService } from '../crud-http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  empList:any = [];

  constructor(private crudHttpService: CrudHttpService){}

  ngOnInit(): void {
    this.listEmployees();
  }

  //to display all records
  listEmployees(){
    this.crudHttpService.list().subscribe((response)=>{
      this.empList = response;
    },(error=>{

    }));
  }

  //create new record
  createTodo(){
    let todo = {
      id: new Date().getTime(),
      title:`Some Todo` 
    }
    this.crudHttpService.create(todo).subscribe((response)=>{
      this.listEmployees();
    },(error=>{

    }));
  }

  //modify record
  editTodo(todo: any){
    let data = {
      id: new Date().getTime(),
      title:`modify` 
    }
    this.crudHttpService.update(todo.id,data).subscribe((response)=>{
      this.listEmployees();
    },(error=>{

    }));
  }

  //delete a record
  deleteTodo(id: any){
    this.crudHttpService.delete(id).subscribe((response)=>{
      this.listEmployees();
    },(error=>{
    }));
  }

}

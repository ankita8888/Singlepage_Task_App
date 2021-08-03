import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {TaskService} from '../../services/task.service'
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task'; 

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  task: Task;
  // text: string;
  // day: string;
  // reminder: boolean = false;
  _id: number;
  routeSub: Subscription;
  newTask: Task;
  @Output() OnUpdate : EventEmitter<Task> = new EventEmitter()

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.params['id']
    this.taskService.getTask(this._id).subscribe(task1 =>{
      this.task = task1
    },(error) => console.log(error));
  }

  onUpdation(){
    this.OnUpdate.emit(this.newTask);
  }

  onSubmit(){
    if(this.task.text =='' || this.task.day ==''){
      alert('Please Enter Task and Day!');
      return;
    }

    this.newTask = {
      _id: this._id,
      text: this.task.text,
      day: this.task.day,
      reminder: this.task.reminder
    }  

    this.taskService.updateTask(this._id, this.newTask).subscribe(data =>{
      console.log(data);
      this.gotoTasks(); 
    },(error) => console.log(error));     
    
    this.task.text = '';
    this.task.day = '';
    this.task.reminder = false;
  }

  gotoTasks(){
    this.router.navigate(['/']);
  }
}

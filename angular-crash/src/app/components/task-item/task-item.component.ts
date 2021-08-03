import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task'; 
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  @Output() onDeleteTask : EventEmitter<Task> = new EventEmitter()
  @Output() onToggleReminder : EventEmitter<Task> = new EventEmitter()
  faTimes = faTimes; 
  faPencilAlt = faPencilAlt;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  OnDelete(task){
    this.onDeleteTask.emit(task) 
  }

  onToggle(task){
    this.onToggleReminder.emit(task)
  }

  UpdateTask(task){
    this.router.navigate(["update-task", task._id]);
  }

}

import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent {
  contributors = [
    { name: 'Sandeep', url: 'https://github.com/Sandeepmopidevi/' },
    { name: 'Kavya', url: 'https://github.com/kavyasri1662' },
    { name: 'Praisy', url: 'https://github.com/Praisy-Sera1' },
    { name: 'Vishal', url: 'https://github.com/srivishal123478' },
    { name: 'Ramya', url: 'https://github.com/Ramya-8688' },
    { name: 'Nandini', url: 'https://github.com/Nandu1304' }
  ];
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class PackagesComponent {
  packages = [
    {
      name: 'Basic Package',
      description: 'Perfect for a quiet and simple dining experience.',
      price: '₹50',
    },
    {
      name: 'Family Package',
      description: 'Enjoy a wonderful meal with your family.',
      price: '₹120',
    },
    {
      name: 'Premium Package',
      description: 'A luxurious dining experience with premium services.',
      price: '₹200',
    },
  ];
}
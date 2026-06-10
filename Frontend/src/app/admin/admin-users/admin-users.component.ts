import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { User, UserDTO } from '../../models/user.model';
import Swal from 'sweetalert2'; // <-- Import SweetAlert2

@Component({
  standalone: false,
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  newUser: UserDTO = {
    name: '',
    email: '',
    password: 'Test@123',
    role: '',
    contactNumber: ''
  };
  editMode: boolean = false;
  selectedUserId: number = 0;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error loading users', error);
        this.toastr.error('Failed to load users. Please try again.', 'Error');
      }
    });
  }

  createUser() {
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.newUser = { name: '', email: '', password: '', role: '', contactNumber: '' };
        this.toastr.success('User created successfully!', 'Success');
      },
      error: (error) => {
        console.error('Error creating user', error);
        this.toastr.error('Failed to create user. Please try again.', 'Error');
      }
    });
  }

  startEdit(user: User) {
    this.editMode = true;
    this.selectedUserId = user.userId;
    this.newUser = {
      name: user.name,
      email: user.email,
      password: 'Test@123',
      role: user.role,
      contactNumber: user.contactNumber
    };
  }

  updateUser() {
    this.userService.updateUser(this.selectedUserId, this.newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.editMode = false;
        this.newUser = { name: '', email: '', password: '', role: '', contactNumber: '' };
        this.toastr.success('User updated successfully!', 'Success');
      },
      error: (error) => {
        console.error('Error updating user', error);
        this.toastr.error('Failed to update user. Please try again.', 'Error');
      }
    });
  }

  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete user!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            this.loadUsers();
            this.toastr.success('User has been deleted successfully!', 'Success');
          },
          error: (error) => {
            console.error('Error deleting user', error);
            this.toastr.error('Failed to delete user. Please try again.', 'Error');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.info('Deletion cancelled.', 'Info');
      }
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.newUser = { name: '', email: '', password: 'Test@123', role: '', contactNumber: '' };
    this.toastr.info('Edit mode cancelled.', 'Info');
  }
}

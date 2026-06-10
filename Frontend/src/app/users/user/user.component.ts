import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User, UpdateUserNameContactDto, UserDTO } from '../../models/user.model';

@Component({
  standalone: false,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: User | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  // Profile update fields
  isEditingProfile: boolean = false;
  updateName: string = '';
  updateContact: string = '';
  updateSuccess: boolean = false;
  updateError: string | null = null;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchCurrentUserDetails();
  }

  /**
   * Fetch the details of the currently logged-in user.
   */
  fetchCurrentUserDetails(): void {
    this.isLoading = true;
    this.authService.getUserIdByEmail().subscribe({
      next: (userId) => {
        this.userService.getUserById(userId).subscribe({
          next: (user) => {
            this.currentUser = user;
            this.updateName = user.name;
            this.updateContact = user.contactNumber;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error fetching user details:', err);
            this.errorMessage = 'Failed to load user details.';
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error fetching user ID by email:', err);
        this.errorMessage = 'Failed to identify the current user. Please log in again.';
        this.isLoading = false;
      }
    });
  }

  enableEditProfile(): void {
    this.isEditingProfile = true;
    this.updateSuccess = false;
    this.updateError = null;
    if (this.currentUser) {
      this.updateName = this.currentUser.name;
      this.updateContact = this.currentUser.contactNumber;
    }
  }

  cancelEditProfile(): void {
    this.isEditingProfile = false;
    this.updateError = null;
    if (this.currentUser) {
      this.updateName = this.currentUser.name;
      this.updateContact = this.currentUser.contactNumber;
    }
  }

  saveProfile(): void {
    if (!this.updateName.trim() || !this.updateContact.trim()) {
      this.updateError = 'Name and Contact Number are required.';
      return;
    }

    const updateDto: UpdateUserNameContactDto = {
      name: this.updateName,
      contactNumber: this.updateContact
    };

    this.userService.updateUserProfile(updateDto).subscribe({
      next: (updatedUser) => {
        this.updateSuccess = true;
        this.isEditingProfile = false;
        // Refresh the current user view
        if (this.currentUser) {
          this.currentUser.name = updatedUser.name;
          this.currentUser.contactNumber = updatedUser.contactNumber;
        }
        this.updateError = null;
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        this.updateError = 'Failed to update profile. Please try again.';
      }
    });
  }
}
package com.capg.dto;

import com.capg.entity.UserData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDataDTO {

    private int userId;
    @NotBlank(message = "Username cannot be blank")
    private String username;
    @NotBlank(message = "Phone number cannot be blank")
    private String phoneNo;
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Invalid email", regexp = "^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")
    private String email;
    @NotBlank(message = "Password cannot be blank")
    @Size(min = 4, message = "Password should be at least 4 characters")
    private String userPassword;

    public UserDataDTO(UserData userData) {
        this.userId = userData.getUserId();
        this.username = userData.getUsername();
        this.phoneNo = userData.getPhoneNo();
        this.email = userData.getEmail();
        this.userPassword = userData.getUserPassword();
    }
}

package com.capg.entity;

import com.capg.dto.UserDataDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "UserData")
public class UserData {

    @Transient
    public static final String SEQUENCE_NAME = "user_sequence";

    @Id
    private int userId;
    private String username;
    private String phoneNo;
    private String email;
    private String userPassword;

    public UserData(UserDataDTO userDataDTO) {
        this.userId = userDataDTO.getUserId();
        this.username = userDataDTO.getUsername();
        this.phoneNo = userDataDTO.getPhoneNo();
        this.email = userDataDTO.getEmail();
        this.userPassword = userDataDTO.getUserPassword();
    }
}

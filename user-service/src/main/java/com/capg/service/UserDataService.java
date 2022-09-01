package com.capg.service;

import com.capg.dto.UserDataDTO;

import java.util.List;

public interface UserDataService {

    List<UserDataDTO> getUserData();
    UserDataDTO getUser(Integer id);
    UserDataDTO newUser(UserDataDTO userDataDTO);
    UserDataDTO updateUser(Integer id, UserDataDTO userDataDTO);
    void deleteUser(Integer id);
    void deleteAll();
}

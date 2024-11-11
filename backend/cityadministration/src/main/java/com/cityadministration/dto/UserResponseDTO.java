package com.cityadministration.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO implements Serializable {

    private Long id;

    private String username;

    private String email;

    private byte[] avatar;

    private String role;
}

package com.richard.sparcpaydemo.models;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Person {

    @Id
    private String id;

    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private Gender gender;

    public enum Gender {
        MALE, FEMALE
    } 

}

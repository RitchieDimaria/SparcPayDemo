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

    public Boolean verifyPerson(){
        int flen = firstName.length();
        int llen = lastName.length();

        for (int i = 0; i < flen; i++) {
            if ((Character.isLetter(firstName.charAt(i)) == false ^ firstName.charAt(i) == ' ')) {
                return false;
            }
        }
        for (int i = 0; i < llen; i++) {
            if ((Character.isLetter(lastName.charAt(i)) == false) ^ lastName.charAt(i) == ' ') {
                return false;
            }
        }
        if(this.firstName == null 
        || this.lastName == null 
        || this.dateOfBirth == null 
        || this.gender == null){
            return false;
        }
        else {

            return true;
        }
    }

}

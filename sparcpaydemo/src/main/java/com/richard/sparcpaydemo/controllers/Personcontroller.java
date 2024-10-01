
package com.richard.sparcpaydemo.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.richard.sparcpaydemo.models.Person;
import com.richard.sparcpaydemo.services.Personservice;

@RestController
@CrossOrigin
public class Personcontroller {

    @Autowired
    Personservice service;

    @PostMapping("/insertPerson")
    public void insertPerson(@RequestBody Person p) {
        service.insert(p);
    }

    @GetMapping("/findPerson")
    public List<Person> findPersons(
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) LocalDate dateOfBirth,
            @RequestParam(required = false) String gender) {

        return service.findAllPersons(firstName,lastName,dateOfBirth,gender);
    }

    @DeleteMapping("/deletePerson/{id}")
    public void deletePerson(@PathVariable String id){
        System.out.println(id);
        service.delete(id);
    }

    @PutMapping("/updatePerson")
    public Person updatePerson(@RequestBody Person p){
        System.out.println(p);
        return service.updatePerson(p.getId(), p);
    }
}

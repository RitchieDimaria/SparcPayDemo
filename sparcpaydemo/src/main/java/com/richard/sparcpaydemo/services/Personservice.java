package com.richard.sparcpaydemo.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.richard.sparcpaydemo.models.Person;

@Service
public class Personservice {
    private final MongoTemplate mt;

    public Personservice(MongoTemplate mt) {
        this.mt =mt;
    }

    public void insert(Person p) {
        mt.insert(p,"Persons");
    }

    public void delete(String id){
        Query query = new Query(Criteria.where("_id").is(id));
        mt.remove(query, Person.class, "Persons");
    }

    public List<Person> findAllPersons(String firstName,String lastName,LocalDate dateOfBirth,String gender) {
        
        Query query = new Query();
    
    if (firstName != null && !firstName.isEmpty()) {
        query.addCriteria(Criteria.where("firstName").regex(firstName, "i"));
    }
    
    if (lastName != null && !lastName.isEmpty()) {
        query.addCriteria(Criteria.where("lastName").regex(lastName, "i"));
    }
    
    if (dateOfBirth != null) {
        query.addCriteria(Criteria.where("dateOfBirth").is(dateOfBirth));
    }
    
    if (gender != null && !gender.isEmpty()) {
        query.addCriteria(Criteria.where("gender").is(gender));
    }

        return mt.find(query,Person.class,"Persons");
    }

    public Person updatePerson(String id, Person updatedPerson) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update()
            .set("firstName", updatedPerson.getFirstName())
            .set("lastName", updatedPerson.getLastName())
            .set("dateOfBirth", updatedPerson.getDateOfBirth())
            .set("gender", updatedPerson.getGender());
        
        mt.updateFirst(query, update, Person.class, "Persons");
        
        return mt.findById(id, Person.class, "Persons");
    }
}

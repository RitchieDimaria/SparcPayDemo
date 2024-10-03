package com.richard.sparcpaydemo.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.richard.sparcpaydemo.models.Page;
import com.richard.sparcpaydemo.models.Person;

@Service
public class Personservice {
    private final MongoTemplate mt;

    public Personservice(MongoTemplate mt) {
        this.mt =mt;
    }

    public void insert(Person p) {

        try{

            mt.insert(p,"Persons");

        }catch(Exception e){

            System.err.println("Error saving user" + e.getMessage() );
            throw new RuntimeException("Failed to process user", e);

        }
    }

    public void delete(String id){
        
        try {
            Query query = new Query(Criteria.where("_id").is(id));
            mt.remove(query, Person.class, "Persons");
            
        } catch (Exception e) {
            System.err.println("Error deleting user" + e.getMessage() );
            throw new RuntimeException("Failed to process user", e);
        }
    }

    public Page findAllPersons(String firstName,String lastName,LocalDate dateOfBirth,String gender, int size,int page) {
        
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

        long total = mt.count(query, Person.class,"Persons");
        List<Person> people = null;

        query.skip((long) (page - 1) * size);
        query.limit(size);
        int totalPages = (int) Math.ceil((double) total / size);
        try {

            people = mt.find(query,Person.class,"Persons");
            
        } catch (Exception e) {
            System.err.println("Error deleting user" + e.getMessage() );
            throw new RuntimeException("Failed to process user", e);
        }

        return new Page(people,page,(int)total,totalPages);
    }

    public Person updatePerson(String id, Person updatedPerson) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update()
            .set("firstName", updatedPerson.getFirstName())
            .set("lastName", updatedPerson.getLastName())
            .set("dateOfBirth", updatedPerson.getDateOfBirth())
            .set("gender", updatedPerson.getGender());
        
        try {
            mt.updateFirst(query, update, Person.class, "Persons");
        } catch (Exception e) {
            System.err.println("Error deleting user" + e.getMessage() );
            throw new RuntimeException("Failed to process user", e);
        }
        
        return mt.findById(id, Person.class, "Persons");
    }
}

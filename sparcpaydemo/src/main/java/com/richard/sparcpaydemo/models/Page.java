package com.richard.sparcpaydemo.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Page {

    private List<Person> persons;
    private int currPage;
    private int totalEntries;
    private int totalPages;
    
}

package com.spring.study.exception;

public class AlreadyEntity extends Exception {
    public AlreadyEntity(String entityName) {
        super(entityName);
    }
}

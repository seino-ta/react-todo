package com.ys.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ys.todo.entity.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Integer> {}

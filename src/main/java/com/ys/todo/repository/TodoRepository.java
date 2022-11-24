package com.ys.todo.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.ys.todo.entity.Todo;

@Repository
public interface TodoRepository extends PagingAndSortingRepository<Todo, Integer> {}

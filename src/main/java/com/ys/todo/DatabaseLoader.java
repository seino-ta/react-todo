package com.ys.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final TodoRepository repository;

	@Autowired
	public DatabaseLoader(TodoRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.repository.save(new Todo("Test Todo", "Overview", "Content", 1));
		this.repository.save(new Todo("Test Todo 2", "Overview 2", "Content 2", 1));
		this.repository.save(new Todo("Test Todo 3", "Overview 3", "Content 3", 1));
	}
}
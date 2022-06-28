package com.ys.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ys.todo.entity.Todo;
import com.ys.todo.repository.TodoRepository;

@Service
@Transactional
public class TodoService {

	@Autowired
	TodoRepository todoRepository;

	/**
	 * レコードを全件取得する。
	 * 
	 * @return
	 */
	public List<Todo> findAll() {
		return todoRepository.findAll();
	}
}

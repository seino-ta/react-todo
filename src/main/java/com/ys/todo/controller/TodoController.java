package com.ys.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ys.todo.entity.Todo;
import com.ys.todo.service.TodoService;

@Controller
public class TodoController {
	@Autowired
	TodoService todoService;

	@RequestMapping(value = "/")
	public String index(Model model) {
		List<Todo> todoList = todoService.findAll();
		model.addAttribute("todoList", todoList);
		return "index";
	}

}

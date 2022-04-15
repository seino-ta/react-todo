package com.ys.todo;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Todo {

	private @Id @GeneratedValue Long id;
	private String name;
	private String overview;
	private String content;
	private int status;

	private Todo() {
	}

	public Todo(String name, String overview, String content, int status) {
		this.name = name;
		this.overview = overview;
		this.content = content;
		this.status = status;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		Todo todo = (Todo) o;
		return Objects.equals(id, todo.id) && Objects.equals(name, todo.name) && Objects.equals(overview, todo.overview)
				&& Objects.equals(content, todo.content) && Objects.equals(status, todo.status);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, name, overview, content, status);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOverview() {
		return overview;
	}

	public void setOverview(String overview) {
		this.overview = overview;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Employee{" + "id=" + id + ", name='" + name + '\'' + ", overview='" + overview + '\'' + ", content='"
				+ content + '\'' + ", status='" + status + '\'' + '}';
	}
}

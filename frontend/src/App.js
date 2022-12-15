'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

const follow = require('./follow'); // function to hop multiple links by "rel"

const root = '/api';

import './main.css';
import 'bulma/css/bulma.css';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { todos: [], attributes: [], pageSize: 2, links: {} };
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
	}

	loadFromServer(pageSize) {
		follow(client, root, [
			{ rel: 'todos', params: { size: pageSize } }]
		).then(todoCollection => {
			return client({
				method: 'GET',
				path: todoCollection.entity._links.profile.href,
				headers: { 'Accept': 'application/schema+json' }
			}).then(schema => {
				this.schema = schema.entity;
				return todoCollection;
			});
		}).done(todoCollection => {
			this.setState({
				todos: todoCollection.entity._embedded.todos,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: todoCollection.entity._links
			});
		});
	}


	onCreate(newTodo) {
		follow(client, root, ['todos']).then(todoCollection => {
			return client({
				method: 'POST',
				path: todoCollection.entity._links.self.href,
				entity: newTodo,
				headers: { 'Content-Type': 'application/json' }
			})
		}).then(() => {
			return follow(client, root, [
				{ rel: 'todos', params: { 'size': this.state.pageSize } }]);
		}).done(response => {
			if (typeof response.entity._links.last !== "undefined") {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		});
	}

	onDelete(todo) {
		client({ method: 'DELETE', path: todo._links.self.href }).done(() => {
			this.loadFromServer(this.state.pageSize);
		});
	}

	onNavigate(navUri) {
		client({ method: 'GET', path: navUri }).done(todoCollection => {
			this.setState({
				todos: todoCollection.entity._embedded.todos,
				attributes: this.state.attributes,
				pageSize: this.state.pageSize,
				links: todoCollection.entity._links
			});
		});
	}

	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
	}

	render() {
		return (
			<div>
				<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate} />
				<TodoList todos={this.state.todos}
					links={this.state.links}
					pageSize={this.state.pageSize}
					onNavigate={this.onNavigate}
					onDelete={this.onDelete}
					updatePageSize={this.updatePageSize} />
			</div>
		)
	}
}

class CreateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.myrefs = React.createRef();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const newTodo = {};
		this.props.attributes.forEach(attribute => {
			newTodo[attribute] = createTodoDialogRef[attribute].value.trim();
		});
		this.props.onCreate(newTodo);

		// clear out the dialog's inputs
		this.props.attributes.forEach(attribute => {
			createTodoDialogRef[attribute].value = '';
		});

		// Navigate away from the dialog to hide it.
		window.location = "#";
	}

	render() {
		this.createTodoDialogRef = React.createRef();
		const inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="field" />
			</p>
		);

		return (
			<div>
				<a href="#createTodo">Create</a>

				<div id="createTodo" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new todo</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Create</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}
class TodoList extends React.Component {

	constructor(props) {
		super(props);
		this.myrefs = React.createRef();
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		e.preventDefault();
		const pageSize = this.myrefs.current.value;
		if (/^[0-9]+$/.test(pageSize)) {// 数値
			this.props.updatePageSize(pageSize);
		} else if (pageSize === "") {// 数値入力前に空にすることを考慮しこの場合は処理をスキップする
			// Skip
		} else {// 文字等
			this.myrefs.current.value = this.props.pageSize;
		}
	}

	handleNavFirst(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.first.href);
	}

	handleNavPrev(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.prev.href);
	}

	handleNavNext(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.next.href);
	}

	handleNavLast(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.last.href);
	}

	render() {
		const todos = this.props.todos.map(todo =>
			<Todo key={todo._links.self.href} todo={todo} onDelete={this.props.onDelete}/>
		);

		const navLinks = [];
		if ("first" in this.props.links) {
			navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
		}
		if ("prev" in this.props.links) {
			navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
		}
		if ("next" in this.props.links) {
			navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
		}
		if ("last" in this.props.links) {
			navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
		}

		return (
			<div>
				<input ref={this.myrefs} defaultValue={this.props.pageSize} onInput={this.handleInput} />
				<div className="tile is-vertical">
					<div className="tile">
						<div className="tile is-parent">
							<article className="tile is-child notification is-info">
								<p className="title">Todos</p>
								<table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
									<tbody>
										<tr>
											<th>Name</th>
											<th>Overview</th>
											<th>Content</th>
											<th>Status</th>
										</tr>
										{todos}
									</tbody>
								</table>
								<div>
									{navLinks}
								</div>
							</article>
						</div>
					</div>
				</div>
				<footer className="footer">
					<div className="content has-text-centered">
						<p>
							<strong>TodoApp</strong>
						</p>
					</div>
				</footer>
			</div>
		)
	}
}

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.todo);
	}
	render() {
		return (
			<tr>
				<td>{this.props.todo.name}</td>
				<td>{this.props.todo.overview}</td>
				<td>{this.props.todo.content}</td>
				<td>{this.props.todo.status}</td>
				<td>
					<button onClick={this.handleDelete}>Delete</button>
				</td>
			</tr>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)

export default App;

'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

import './main.css';
import 'bulma/css/bulma.css';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {todos: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/todos'}).done(response => {
			this.setState({todos: response.entity._embedded.todos});
		});
	}

	render() {
		return (
			<TodoList todos={this.state.todos}/>
		)
	}
}

class TodoList extends React.Component{
	render() {
		const todos = this.props.todos.map(todo =>
			<Todo key={todo._links.self.href} todo={todo}/>
		);
		return (
			<div>
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

class Todo extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.todo.name}</td>
				<td>{this.props.todo.overview}</td>
				<td>{this.props.todo.content}</td>
				<td>{this.props.todo.status}</td>
			</tr>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)

export default App;

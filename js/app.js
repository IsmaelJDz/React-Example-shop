var Comida = React.createClass({
	getInitialState: function(){
			//return { like: false }
			return{
				like: Boolean(this.props.like) 
			} 
	},
	handleLike: function(){
		this.setState({
			like: !this.state.like
		})
	}, 
	render: function(){

		return (
			<div>
				<h1 className ="bg-success">{this.props.nombre}</h1>
				<p className="bg-info">
					Comida <i>{this.props.children}</i>
				</p>
				<p>
					<input
					onChange={this.handleLike}
					defaultChecked={this.state.like}
					type="checkbox" className="glyphicon glyphicon-heart glyphicon-heart-lg"/>
					<br />
					<br />
					Like: <b>{ String(this.state.like) }</b>
				</p>
			</div>
			);
	}
});

ReactDOM.render(<div className="centerBlock">
	<Comida nombre="Tacos" like>
		Mexicana
	</Comida> 
	<Comida nombre="Paella">
		Española
	</Comida>
	<Comida nombre="Ceviche" like>
		Colombiana
	</Comida>
	</div>
	, document.getElementById('container')
);
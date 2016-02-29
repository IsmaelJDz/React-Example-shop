var Comida = React.createClass({
	getInitialState: function(){
			return{
				like: Boolean(this.props.like) 
			} 
	},
	handleLike: function(){
		this.setState({
			like: !this.state.like
		})
	},
	remove: function(){
		this.props.onRemove(this.props.index);
	}, 
	render: function(){

		return (
			<div className="comida">
				<h1 className ="bg-success">{this.props.nombre}</h1>
				<p className="bg-info">
					Comida <i>{this.props.children}</i>
				</p>
				<div>
					<input type="checkbox" className="glyphicon glyphicon-heart heart"
					onChange={this.handleLike}
					defaultChecked={this.state.like}/>
					<br />
					<br />
					Like: <b>{ String(this.state.like) }</b>
				</div>
				<div>
					<div className ="glyphicon glyphicon-trash red" onClick = {this.remove}/>
				</div>
			</div>
			);
	}
});


var ListaComida = React.createClass({

	getInitialState : function(){
		return {
			comidas : [
				'Tacos',
				'Paella',
				'Ceviche',
				'Mole'
			]
		}
	},
	remove: function(i){
		var arr = this.state.comidas;
		arr.splice(i, 1);
		this.setState({comidas: arr});
	},
	eachItem: function(comida, i){
		return(
			<Comida key={i}
			index={i}
				nombre={comida}
				onRemove={this.remove}>
				{i+1}
			</Comida>
		)
	},
	handleKeyDown: function(e){
		if (e.charCode === 13)
		{
			this.add();
		}
	},
	add : function(comida){
		var nuevaComida = this.refs.nuevaComida.value;

		if (nuevaComida == "")
		{
			if (typeof comida == 'undefined')
			{
				nuevaComida = "Nueva comida"
			}
			else
			{
				nuevaComida = comida;
			}
		}

		var arr = this.state.comidas;
		arr.push(nuevaComida);
		this.setState({ comidas: arr })
		this.refs.nuevaComida.value = "";


	}, 
	render: function(){
		return (
			<div className='centerBlock'>
				<header className="centerBlock">
					<h1>Mis comidas favoritas</h1>
					<i>Total: {this.state.comidas.length}</i>
				</header>
					<div className="input-group">
						<input ref="nuevaComida" 
						
						onKeyPress={this.handleKeyDown} 

						type="text" className="form-control" placeholder="Agregar nueva comida ..."/>
						<span className="input-group-btn">
							<div className="btn btn-default btn-success" onClick={this.add.bind(null, "Nueva comida")}>
							+
							</div>
						</span>
					</div>
				<div>
					{this.state.comidas.map(this.eachItem)}
				</div>
			</div>
		)
	}
});



ReactDOM.render(<ListaComida/> , document.getElementById('container'));
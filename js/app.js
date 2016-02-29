var Comida = React.createClass({
	getInitialState: function(){
			return{
				like: Boolean(this.props.like),
				editing: false
			} 
	},
	handleLike: function(){
		this.setState({
			like: !this.state.like
		})
	},
	edit: function(){
		this.setState({editing: true})
	},
	save: function(){
		this.props.onChange(this.refs.nuevoNombre.value, this.props.index);
		this.setState({editing: false});
	},
	remove: function(){
		this.props.onRemove(this.props.index);
	},
	cancel: function(){
		this.setState({editing: false});
	},
	showEditingview: function(){
		return(

			<div className="comida">
				<input ref="nuevoNombre" type="text"		
				className="form-control" placeholder="Nuevo nombre ..." defaultValue={this.props.nombre}/>
				<div>
					<div className="glyphicon glyphicon-ok-circle blue" onClick={this.save} />
					<div className="glyphicon glyphicon-remove-circle red" onClick={this.cancel} />
				</div>
			</div>

		)
	},
	showFinalView: function(){
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
					<div className ="glyphicon glyphicon-pencil blue" onClick = {this.edit}/>
					<div className ="glyphicon glyphicon-trash red" onClick = {this.remove}/>
				</div>
			</div>
		);
	},  
	render: function(){

		if (this.state.editing){
			return this.showEditingview();
		}
		else
		{
			return this.showFinalView();
		}
		
	}
});


var ListaComida = React.createClass({

	getInitialState : function(){
		return {
			comidas : [
				'Tacos',
				'Paella',
				'Ceviche'
			]
		}
	},
	getDefaultProps: function(){
		return {
			framework: "React",
			tech: "JavaScript"
		}
	},
	componentDidMount: function(){
		$(this.refs.spinner).addClass("glyphicon-refresh-animate");
	},
	componentWillMount: function(){
		//alert("antes de cargar");

		var self = this;
		var pais;

		$.getJSON('https://restcountries.eu/rest/v1/all', function(json) {
			for(pais in json)
			{
				console.log(pais, json[pais].name);
				self.add(json[pais].name);
			}
			$(self.refs.spinner).removeClass('glyphicon-refresh-animate');
			$(self.refs.spinner).remove();

		});

	},
	add: function(comida){
		console.log(comida);
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
	update: function(nuevoNombre, i){
		var arr = this.state.comidas;
		arr[i] = nuevoNombre;
		this.setState({comidas: arr});
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
				onRemove={this.remove}
				onChange={this.update}>
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
	render: function(){
		return (
			<div className='centerBlock'>
				<header className="centerBlock">
					<h1>Mis comidas favoritas</h1>
					<i>Total: {this.state.comidas.length}</i>
					<br/>
					<span ref="spinner" className="glyphicon glyphicon-refresh"></span>
					<br/>
					<i>Hecho con {this.props.framework}, una libreria de {this.props.tech}</i>
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
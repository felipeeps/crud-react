import React, { Component } from 'react';

//Exportando minha classe com extends para Component
//A propriedade PROS guarda meu parametros
export default class InputCustomizado extends Component {
    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
            </div>
        );
    }
}





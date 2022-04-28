import React from 'react';
import Button from './button/Button.js';
import './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        const {activeButton, setActiveButton} = props;
        this.activeButton = activeButton;
        this.state = {activeButton};
        this.setActiveButton = setActiveButton;
    }

    setActiveButton(name) {
        this.setState({activeButton : name});
    }

    render() {
        return (
            <div className="header">
                <Button 
                    name = "calculator" 
                    title = "Калькулятор" 
                    isActive = {this.state.activeButton}
                    onClick = {name => this.setActiveButton(name)}
                >
                </Button>
                <Button
                    name="graph2D"
                    title="Графика 2D"
                    isActive = {this.state.activeButton}
                    onClick = {name => this.setActiveButton(name)}
                >
                </Button>
                <Button 
                    name="graph3D" 
                    title="Графика 3D" 
                    isActive = {this.state.activeButton}
                    onClick = {name => this.setActiveButton(name)}
                >
                </Button>
            </div>
        );
    }
}

export default Header
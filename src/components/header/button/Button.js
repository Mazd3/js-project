import React from 'react';
import './button.css';

class Button extends React.Component {
    constructor(props) {
        super(props);
        const { name, title, isActive, onClick } = props;
        this.name = name;
        this.title = title;
        this.isActive = isActive === name;
        this.onClick = onClick;
    }

    render() {
        return (
            <button
                className = { this.isActive ? 'button active' : 'button' }
                onClick = { () => this.onClick(this.name) }
            >
                { this.name }
            </button>
        );
    }
}

export default Button
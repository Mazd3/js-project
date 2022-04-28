import React from 'react';
import Panel from './Panel/Panel';

class UI extends React.Component {
    constructor(props){
        super(props);
        const { funcs, draw } = props;
        this.draw = draw;
        this.funcs = funcs;
        this.state = { showPanel : false };
    }

    togglePanel() {
        this.setState({ showPanel : !this.state.showPanel });
    }

    render() {
        return (
            <div>
                <button 
                    onClick={ () => this.togglePanel() }
                > Открыть меню </button>
                { this.state.showPanel &&
                <Panel
                    draw={ () => this.draw() }
                    funcs={ this.funcs }
                ></Panel> }
            </div>
        );
    }
}

export default UI
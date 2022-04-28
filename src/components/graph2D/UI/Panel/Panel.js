import React from 'react';
import FuncInput from './FuncInput/FuncInput';

class Panel extends React.Component {
    constructor(props){
        super(props);
        const { funcs, draw } = props;
        this.funcs = funcs;
        this.draw = draw;
    }

    addFunction() {
        this.funcs.push({
            f: () => null,
            color: '#A00',
            width: 2
        });
        this.setState({ funcsLength : this.funcs.length });
    }
    delFunc(id) {
        this.funcs.splice(id, 1);
        this.setState({ funcsLength : this.funcs.length });
    }

    render() {
        return(
            <div>
                <div>
                    {this.funcs.map((func, index) => {
                        return(
                            <FuncInput
                                draw={ () => this.draw() }
                                funcs={ this.funcs }
                                key={ index }
                                id={ index }
                                delFunc={ (id) => this.delFunc(id) }
                            ></FuncInput>
                        );
                    })}
                </div>
                <button
                    onClick={ () => this.addFunction() }
                > Добавить </button>
            </div>
        );
    }
}

export default Panel
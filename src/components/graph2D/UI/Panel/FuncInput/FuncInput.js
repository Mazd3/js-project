import React from 'react';

class FuncInput extends React.Component {
    constructor(props){
        super(props);
        const { funcs, draw, id, delFunc } = props;
        this.delFunc = delFunc;
        this.draw = draw;
        this.funcs = funcs;
        this.id = id;
    }

    setFunction(e) {
        try {
            let f;
            f = eval(`f=function(x) {return ${e.target.value}}`);
            this.funcs[this.id].f = f;
            this.draw();
        } catch(a) { }
    }

    setColor(e) {
        this.funcs[this.id].color = e.target.value;
        this.draw();
    }

    

    render() {
        return(
            <div
                onClick={ () => this.draw() }
            >
                <input 
                    placeholder="y=f(x)"
                    defaultValue={ this.funcs.f }
                    onChange={ (e) => this.setFunction(e) }
                ></input>
                <input // толщина
                        type='number'
                ></input>
                <input // цвет
                        onChange={ (e) => this.setColor(e)}
                        type='color'
                ></input>
                <input
                    onClick={ () => { this.funcs[this.id].drawDerivative = !this.funcs[this.id].drawDerivative} }
                    type='checkbox'
                >
                </input>
                <input // начало отрезка интеграла
                        type='number'
                        onChange={ (e) => this.funcs[this.id].startIntegral = e.target.value }
                ></input>
                <input // конец отрезка интеграла
                        type='number'
                        onChange={ (e) => this.funcs[this.id].endIntegral = e.target.value }
                ></input>
                <button  // удалить функцию
                    onClick={ () => this.delFunc(this.id) }
                >Delete</button>
            </div>
        );
    }
}

export default FuncInput
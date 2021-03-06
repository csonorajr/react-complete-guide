import React, {PureComponent} from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[Persons.js] Inside constructor', props);
    }

    componentWillMount() {
        console.log('[Persons.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Persons.js] Inside componentDidMount()');
    }

    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE Persons.js] Inside componentWillReceiveProps', nextProps);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[UPDATE Persons.js] Inside shouldComponentUpdate', nextProps, nextState);
    //     return nextProps.persons !== this.props.persons || 
    //     nextProps.changed !== this.props.changed || 
    //     nextProps.clicked !== this.props.clicked;
    //     // return true;
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js] Inside componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate() {
        console.log('[UPDATE Persons.js] Inside componentDidUpdate');
    }

    render() {
        console.log('[Persons.js] Inside render()');
        return this.props.persons.map((person, index) => {
        return <Person 
            name={person.name} 
            age={person.age}
            click={() => this.props.clicked(index)}
            key={person.id}
            changed={(event) => this.props.changed(event, person.id)} />  
        //Cuando se tiene argumentos en una función, se manda ejecutar con el () =>, si no tiene argumentos, se manda llamar sin el () =>
        });
    }
}

export default Persons;
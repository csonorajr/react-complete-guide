import React, { PureComponent } from 'react';
// import logo from './logo.svg';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';

import classes from './App.css';
import { throws } from 'assert';

class App extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[App.js] Inside constructor', props);
        this.state = {
            persons: [ //El ID de los elementos puede ser cualquier valor siempre y cuando se único.
                {id: '1', name: 'Carlos', age: 31},
                {id: '2', name: 'Antonio', age: 22},
                {id: '3', name: 'Monica', age: 31}
            ],
            otherState: 'Some other value',
            showPersons: false
        }
    }

    componentWillMount() {
        console.log('[App.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[App.js] Inside componentDidMount()');
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
    //     return nextState.persons !== this.state.persons || 
    //         nextState.showPersons !== this.state.showPersons;
    //     // return true;
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate() {
        console.log('[UPDATE App.js] Inside componentDidUpdate');
    }

    //This is modern way to set state (React 16)
    // state = {
    //     persons: [ //El ID de los elementos puede ser cualquier valor siempre y cuando se único.
    //         {id: '1', name: 'Carlos', age: 31},
    //         {id: '2', name: 'Antonio', age: 22},
    //         {id: '3', name: 'Monica', age: 31}
    //     ],
    //     otherState: 'Some other value',
    //     showPersons: false
    // } //Can only be build on components done like this, extending Component

    // switchNameHandler = (newName) => {
    //     //console.log('Was clicked!');
    //     // DON'T DO THIS: this.state.persons[0].name = 'Carlitos';
    //     this.setState({
    //         persons: [
    //             {name: newName, age: 31},
    //             {name: 'Toñito', age: 25},
    //             {name: 'Moni', age: 31}
    //         ]
    //     });
    // }

    nameChangeHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {...this.state.persons[personIndex]}; //Evitamos mutar el estado directamente y agregarmos los valores a un nuevo objeto copiándolos desde el original con el operador ...

        /** Este sería otra aproximación a la línea de arriba:
         * const person = Object.assign({}, this.state.persons[personIndex]);*/
        
        person.name = event.target.value; //I'm working with a copy of the current state object
        const persons = [...this.state.persons]; //I'm working with a copy of the current state
        persons[personIndex] = person; //I'm updating value on the copy of the state

        this.setState({ persons: persons }); //I'm updating real state with the modified copy value

        // This is the old way I had before doing the changes 
        // this.setState({
        //     persons: [
        //         {name: 'Carlitos', age: 31},
        //         {name: event.target.value, age: 25},
        //         {name: 'Moni', age: 31}
        //     ]
        // });
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    }

    deletePersonHandler = (personIndex) => {
        //const persons = this.state.persons.slice(); //A good practice is to create a copy of your array for manipulating it.
        /** Siempre debe actualizar el estado de manera inmutable para que, sin mutar el estado original, primero cree una copia, cámbiela y luego actualice el estado con el cambio de estado realizado.*/
        const persons = [...this.state.persons];//Modern version of line above.
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }

    render() {
        //IMPORTANTE: () => this.switchNameHandler('¡Carlitos!') esta sintaxis es conveniente pero puede ser ineficiente, mejor usar bind
        console.log('[App.js] Inside render()');
        let persons = null;

        if(this.state.showPersons) {
            persons = <Persons 
                        persons={this.state.persons} 
                        clicked={this.deletePersonHandler} 
                        changed={this.nameChangeHandler} />;
        }

        return ( 
            <WithClass classes ={classes.App}> 
                {/* Condition ? if true : if false //Esto es una expresión ternaria */}
                <button onClick={() => { this.setState({showPersons: true}) }}>Show Persons</button>
                <Cockpit
                    appTitle={this.props.appTitle}
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    clicked={this.togglePersonsHandler} />
                {persons}                
            </WithClass>
        );
    }
}

export default App;
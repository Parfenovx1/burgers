import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import MenuAdmin from './MenuAdmin';
import sampleBurgers from '../sample-burgers';
import Burger from './Burger';
import base from '../base';
import firebase from 'firebase/app'
import SignIn from './Auth/SignIn';


class App extends React.Component {

    static propTypes = {
        match: PropTypes.object
    }

    state = {
        burgers:{},
        order: {}
    }

    componentDidMount(){
        const {params} = this.props.match;

        const localStorageRef = localStorage.getItem(params.restaurantId);
        if(localStorageRef){
            this.setState({order: JSON.parse(localStorageRef)})
        }

        this.ref = base.syncState(`${params.restaurantId}/burgers`, {
            context: this,
            state: 'burgers'
        })
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    componentDidUpdate(){
        const {params} = this.props.match;
        localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
    }

    addBurger = burger => {
        //Делаем копию объекта state
        const burgers = {...this.state.burgers};
        //Добавить новый бургерв в переменную burgers
        burgers[`burger${Date.now()}`] = burger;
        //Записать наш новый объект burgers в state
        this.setState({burgers})
    }

    updateBurger = (key, updatedBurger) => {
        //Делаем копию объекта state
        const burgers = {...this.state.burgers};
        //Обновляем нужный burger
        burgers[key] = updatedBurger;
        //Записать наш новый объект burgers в state
        this.setState({burgers});
    }

    deleteBurger = key => {
        //Делаем копию объекта state
        const burgers = {...this.state.burgers};
        //Удаляем burger
        burgers[key] = null;
        //Записать наш новый объект burgers в state
        this.setState({burgers});
    }

    loadSampleBurgers = () =>{
        this.setState({burgers: sampleBurgers});
    }

    addToOrder = key => {
        //Делаем копию объекта state
        const order = {...this.state.order};
        //Добавить ключ к заказу со значением 1, либо обновить текущее значение 
        order[key] = order[key] + 1 || 1
        //Записать наш новый объект order в state
        this.setState({order})
    }

    deleteFromOrder = key => {
        //Делаем копию объекта state
        const order = {...this.state.order};
        //Удаляем burger
        delete order[key];
        //Записать наш новый объект order в state
        this.setState({order})
    }

    handleLogOut = async() => {
        await firebase.auth().signOut();
        window.location.reload();
    }

    render() {
        return (
            <SignIn>
                <div className="burger-paradise">
                    <div className="menu">
                        <Header title="Very Hot Burger"/>
                        <ul className="burgers">
                            {Object.keys(this.state.burgers).map(key => {
                                return <Burger key={key} index={key} addToOrder={this.addToOrder} details={this.state.burgers[key]}/>
                            })}
                        </ul>
                    </div>
                    <Order burgers={this.state.burgers} order={this.state.order} deleteFromOrder={this.deleteFromOrder}/>
                    <MenuAdmin 
                        burgers={this.state.burgers} 
                        addBurger={this.addBurger} 
                        loadSampleBurgers={this.loadSampleBurgers} 
                        updateBurger={this.updateBurger} 
                        deleteBurger={this.deleteBurger}
                        handleLogOut={this.handleLogOut}
                    />
                </div>
            </SignIn>
        )
    }
}

export default App;
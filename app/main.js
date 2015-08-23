import React from 'react';
import AddDestination from './components/add-destination';
import ListDestinations from './components/list-destinations';
import { addDestination, deleteDestination } from './actions';
import { househuntApp } from './reducers';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const store = createStore(househuntApp);
store.subscribe(() => console.log('store change', store.getState()));

class Househunt extends React.Component {
  addDestinationCallback(postcode) {
    this.props.dispatch(addDestination(postcode));
  }

  deleteDestinationCallback(uuid) {
    this.props.dispatch(deleteDestination(uuid));
  }

  render() {
    return (
      <div>
        <AddDestination
          addDestinationCallback={(postcode) => this.addDestinationCallback(postcode)}
        />

        <ListDestinations
          deleteDestinationCallback={(uuid) => this.deleteDestinationCallback(uuid)}
          destinations={this.props.destinations}
        />
      </div>
    );
  }
}

const ConnectedHousehunt = connect((state) => state)(Househunt);

React.render(
  <Provider store={store}>
    {() => <ConnectedHousehunt />}
  </Provider>,
  document.getElementById('app')
);


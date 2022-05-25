import { Component } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';


class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
    // console.log("constructor")
  }

  componentDidMount() {
    // console.log("componentDidMount")
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((user) => 
      this.setState(
        () => {
        return { monsters: user };
        }
      
    ));
  }

  onSearchChange = (event) => {
    console.log(event.target.value)
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    })
  }

  render() {
    // console.log("render")
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filterMonster = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <SearchBox 
          className='search-box'
          onChangeHandler={onSearchChange}
          placeholder='search monsters'
        />

        <CardList monsters={filterMonster} />
      </div>
    );
  }
}

export default App;

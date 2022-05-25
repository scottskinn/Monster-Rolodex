// import { Component } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';



const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filterMonsters, setFilterMonsters] = useState(monsters);

  console.log("render")

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((user) => setMonsters(user));
  
  }, []);

  useEffect(() => {
    const newFilterMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilterMonsters(newFilterMonsters);
  }, [ monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  

  return (
    <div className="App">
      <h1 className='app-title'>Monster Rolodex</h1>
        
      <SearchBox 
        className='monster-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters'
      />
      <CardList monsters={filterMonsters} />
    </div>
  )
}




// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       searchField: ''
//     };
//     // console.log("constructor")
//   }

  // componentDidMount() {
  //   // console.log("componentDidMount")
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response => response.json())
  //     .then((user) => 
  //     this.setState(
  //       () => {
  //       return { monsters: user };
  //       }
      
  //   ));
  // }

//   onSearchChange = (event) => {
//     console.log(event.target.value)
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     })
//   }

//   render() {
//     // console.log("render")
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filterMonster = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className='app-title'>
//           Monster Rolodex
//         </h1>
//         <SearchBox 
//           className='monster-search-box'
//           onChangeHandler={onSearchChange}
//           placeholder='search monsters'
//         />

//         <CardList monsters={filterMonster} />
//       </div>
//     );
//   }
// }

export default App;

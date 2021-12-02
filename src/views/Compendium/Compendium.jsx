import {useState, useEffect} from 'react';
import PokemonList from '../../components/PokemonList/PokemonList';
import {
  fetchFilteredPokemon,
  fetchPokemon,
  fetchSearchPokemon,
  fetchTypes,
} from '../../services/pokemon';
import './Compendium.css';
import Controls from '../../components/Controls/Controls';
import pokeball from '../../assets/pokeball.png';

export default function Compendium() {
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  

   //if (pokemons.count !== 0) {
    useEffect(() => {
       const getPokemon = async () => {
         const pokemonList = await fetchPokemon();
          setPokemons(pokemonList);
         setLoading(false);
       };
  getPokemon();
     },[] );
  

     useEffect(() => {
        async function getTypes() {
         const pokemonTypes = await fetchTypes();
         console.log(pokemonTypes);
         setTypes(pokemonTypes);
       }
       getTypes();
     }, []);

 
   useEffect(() => {
    async function getFilteredPokemon() {
      if (!selectedType) return;
      setLoading(true);

       if (selectedType !== 'all') {
        const filteredPokemon = await fetchFilteredPokemon(selectedType);
        console.log(filteredPokemon);
         setPokemons(filteredPokemon);
       } else {
         const pokemonList = await fetchPokemon();
         setPokemons(pokemonList);
       }
       setLoading(false);
       //setSort('');
     }

     getFilteredPokemon();
   }, [selectedType]);

   const filterChange = (value) => {
     setSelectedType(value);
   }
  const handleSubmit = async (event) => {
    setLoading(true);
    console.log('searchname', searchName);
    event.preventDefault();
    
    const searchResults = await fetchSearchPokemon(searchName);
    console.log(searchResults);
    setPokemons(searchResults);
    setLoading(false);
    setSearchName('');
    setSelectedType('');
      /*.then((searchedPokemons) => {
        this.setState({pokemons: searchedPokemons});
      })
      .catch((error) => {})
      .finally(() => {
          setLoading(false);
      setSearchName('');
        setSelectedType('');
      });*/
      
  };

  return (
    <div className='app'>
      <main>
        <div className='title'>
          <img src={pokeball} alt='pokeball' />
          <h1 className='titleText'>Alchemy Compendium</h1>
        </div>
        <Controls
          handleSubmit={handleSubmit}
          searchName={searchName}
          handleNameChange={setSearchName}
          types={types}
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          filterChange={filterChange}
        />
        {loading ? (
          <code>Search for the bugs in the code!</code>
        ) : (
          <PokemonList pokemons={pokemons} />
        )}
      </main>
    </div>
  );
}

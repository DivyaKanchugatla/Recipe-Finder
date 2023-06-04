import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [loading,setLoading]=useState(false)
  const [ingredientList,setIngredientList]=useState([])
  const inputRef = useRef(null);
  const API_KEY = "e81ccf85a7ed3653f0df2123c822104a";
  const API_ID = "10e66024";

  const search = () => {
    searchForRecipe(inputRef.current.value)
    inputRef.current.value=""
  }
  const searchForRecipe = (query) => {
    setLoading(true)
    const fetchData = async () => {
      try {
        let url = `https://api.edamam.com/search?q="${query}"&app_id=${API_ID}&app_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        setIngredientList(data.hits);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  }

  useEffect(() => {
    searchForRecipe("chicken")
   
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='InputWrapper'>
          <input placeholder="Search for recipe" ref={inputRef}/>
          <button onClick={search}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
          <div className='wrapper'>
            {ingredientList.map(({recipe})=>{
              const {label,image,ingredientLines} = recipe
              return (
                <div className='Ingredient' key={label}>
                   <span>{label}</span>
                   <img src={image} alt="foodImage"/>
                   <div className='Steps'>
                   {ingredientLines.map((step,index)=>{
                    return <p key={index}>{step}</p>
                   })}
                   </div>
                </div>
              )
            })}
          </div>
      </header>
    </div>
  );
}

export default App;

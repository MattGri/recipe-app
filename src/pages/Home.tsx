import React, { useState, useEffect } from 'react'
import { db } from '../firebase-config'
import {
  collection,
  getDocs,
  addDoc,
} from 'firebase/firestore';

const Home = () => {

  const [recipes, setRecipes] = useState<any>([]);


  useEffect(() => {
    document.title = 'Recipe app'
  }, [])


  useEffect(() => {
    getRecipes()
  }, []);

  const getRecipes = () => {
    const recipesCollection = collection(db, 'recipes');
    getDocs(recipesCollection).then(response => {
      const recipes = response.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }
      )
      setRecipes(recipes)
    })
      .catch(error => {
        console.log(error);
      }
      )
  }


  // const addName = () => {
  //   const recipesCollection = collection(db, 'recipes');
  //   addDoc(recipesCollection, {
  //     title: name,
  //   }).then(response => {
  //     console.log(response);
  //   }
  //   ).catch(error => {
  //     console.log(error);
  //   })
  // }


  return (
    <>
      <h1>My recipes</h1>
      {/* <button onClick={addName}>add recipe</button> */}


      <div>
        {recipes.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.desc}</p>



            <div>
              <h4>Ingredients</h4>
              <ul>
                {
                  recipe.ingredients.map(ingredient => (
                    <li key={ingredient.id}>{ingredient}</li>
                  ))
                }
              </ul>

              <h4>Steps</h4>
              <ul>
                {
                  recipe.steps.map(step => (
                    <li key={step.id}>{step}</li>
                  ))
                }
              </ul>

            </div>
          </div>
        ))}

      </div>

  

    </>
  )
}

export default Home
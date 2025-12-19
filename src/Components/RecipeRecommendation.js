import React, { useState } from 'react';

const RecipeRecommendation = () => {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRecipes = async () => {
        setLoading(true);
        setRecipes([]);
        try {
            const response = await fetch('http://localhost:5000/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredients: ingredients.split(',') })
            });

            const data = await response.json();
            setRecipes(data.recipes.split('\n'));
        } catch (error) {
            console.error('Error fetching recipes:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>AI Recipe Recommendations</h2>
            <input
                type="text"
                placeholder="Enter ingredients (comma-separated)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
            />
            <button onClick={fetchRecipes} disabled={loading}>
                {loading ? 'Loading...' : 'Get Recipes'}
            </button>

            <div className="recipe-list">
                {recipes.length > 0 && <h3>Recommended Recipes:</h3>}
                <ul>
                    {recipes.map((recipe, index) => (
                        <li key={index}>{recipe}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecipeRecommendation;

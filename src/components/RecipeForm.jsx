/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Typeahead, ClearButton } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { useNavigate } from 'react-router-dom';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { ingredientsDictionary, conflicts, dietaryOptions, utensilOptions  } from '../../src/components/Ingredients.js';


const RecipeForm = () => {
    const navigate = useNavigate(); 
    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: [{ name: '', quantity: '', unit: 'Gram', form: 'Fresh' }],
        steps: '',
        duration: 30,
        servings: 4,
        dietaryPreferences: [],
        calories: '',
        utensils: [],
        fat: '',
        likeCount:0,
        dislikeCount:0,
        carbohydrates: '',
        protein: '',
        image: null,
        finalIngredientList: ''
    });

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ingredientForms] = useState([
        'Fresh', 'Dried', 'Frozen', 'Canned', 'Powdered', 'Chopped', 'Whole'
    ]);
    const [quantityUnits] = useState([
        'Gram', 'Milliliter', 'Ounce', 'Tablespoon', 'Teaspoon', 'Cup'
    ]);






    const handleUtensilChange = (event) => {
        setRecipe((prev) => ({
            ...prev,
            utensils: event.target.value,
        }));
    };
    

    // Simulated async search to demonstrate loading
    const handleSearch = (query) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    // Handle input changes for general fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Generate final ingredient list
    const generateFinalIngredientList = () => {
        const finalList = recipe.ingredients
            .map(ingredient => `${ingredient.quantity} ${ingredient.unit} ${ingredient.form} ${ingredient.name}`)
            .join(', ');
        setRecipe((prev) => ({
            ...prev,
            finalIngredientList: finalList,
        }));
    };

    // Update the final ingredient list when ingredients change
    useEffect(() => {
        generateFinalIngredientList();
    }, [recipe.ingredients]);

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setRecipe((prev) => ({
                ...prev,
                image: file,
            }));
        }
    };

    const formatDuration = (minutes) => {
        if (minutes < 60) {
          return `${minutes} min`;
        }
        
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        
        if (remainingMinutes === 0) {
          return `${hours} hr`;
        }
        
        return `${hours} hr ${remainingMinutes} min`;
      };

    // Handle dietary preferences
    const handleDietaryChange = (event) => {
        const { name, checked } = event.target;
        let newDietaryPreferences = [...recipe.dietaryPreferences];
    
        if (checked) {
            // Conflict logic
            if (conflicts[name]) {
                conflicts[name].forEach((conflictingPreference) => {
                    newDietaryPreferences = newDietaryPreferences.filter(
                        (preference) => preference !== conflictingPreference
                    );
                });
            }
            newDietaryPreferences.push(name);
        } else {
            newDietaryPreferences = newDietaryPreferences.filter((preference) => preference !== name);
        }
    
        setRecipe((prev) => ({
            ...prev,
            dietaryPreferences: newDietaryPreferences,
        }));
    };


//  Steps handling

    const [steps, setSteps] = useState(['']); // Initialize steps as an array

// Update step in the array and update the concatenated string with a separator and "Step X:" before each step
const handleStepChange = (index, event) => {
    const newSteps = [...steps];
    newSteps[index] = event.target.value;
    setSteps(newSteps);

    // Define a separator character
    const separator = '|';  // You can change this to any special character of your choice

    // Create a string with "Step X:" before each step and join them with the separator
    const stepsWithLabels = newSteps.map((step, idx) => `Step ${idx + 1}: ${step}`).join(` ${separator} `);

    // Update the recipe state with the new concatenated steps
    setRecipe(prevRecipe => ({
        ...prevRecipe,
        steps: stepsWithLabels  // The steps now include the "Step X:" label and separator
    }));
};


    // Add an empty step
    const handleAddStep = () => {
        setSteps([...steps, '']);
    };

    // Remove a step
    const handleRemoveStep = (index) => {
        const newSteps = steps.filter((_, i) => i !== index);
        setSteps(newSteps);
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            steps: newSteps.join('\n') // Update the concatenated steps string
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        const username = localStorage.getItem('username');
        console.log(username)
        formData.append('name', recipe.name);
        formData.append('ingredients', JSON.stringify(recipe.ingredients));
        formData.append('username', username);
        formData.append('steps', recipe.steps);
        formData.append('duration', recipe.duration);
        formData.append('servings', recipe.servings);
        formData.append('dietaryPreferences', recipe.dietaryPreferences.join(', '));
        formData.append('calories', recipe.calories);
        formData.append('fat', recipe.fat);
        formData.append('carbohydrates', recipe.carbohydrates);
        formData.append('protein', recipe.protein);
        
        if (recipe.image) {
            formData.append('image', recipe.image);
        }

        formData.append('finalIngredientList', recipe.finalIngredientList);

        try {
            const response = await fetch('https://cgas.onrender.com/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Recipe uploaded successfully!');
                // Reset form
                setRecipe({
                    name: '',
                    ingredients: [{ name: '', quantity: '', unit: 'Gram', form: 'Fresh' }],
                    steps: '',
                    duration: 30,
                    servings: 4,
                    dietaryPreferences: [],
                    calories: '',
                    fat: '',
                    carbohydrates: '',
                    protein: '',
                    image: null,
                    finalIngredientList: '',
                });
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            console.error('Upload error:', error);
        }
        window.location.reload();
        alert("Recipe uploaded successfully!")
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '12px' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Upload Recipe</h2>
            {message && <p style={{ color: message.includes('Error') ? 'red' : 'green', textAlign: 'center' }}>{message}</p>}
            
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Recipe Name */}
                <TextField
                    label="Recipe Name"
                    name="name"
                    value={recipe.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                    size="small"
                    style={{ marginBottom: '20px' }}
                />

                {/* Ingredients Section */}
                <div style={{ marginBottom: '20px' }}>
                    <h3>Ingredients</h3>
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
                            {/* Ingredient Typeahead */}
                            <Typeahead
                                id={`ingredients-typeahead-${index}`}
                                labelKey="name"
                                options={ingredientsDictionary}
                                placeholder="Choose ingredients..."
                                onChange={(selected) => {
                                    const newIngredients = [...recipe.ingredients];
                                    newIngredients[index].name = selected[0]?.name || '';
                                    setRecipe(prev => ({
                                        ...prev,
                                        ingredients: newIngredients,
                                    }));
                                }}
                                onSearch={handleSearch}
                                selected={ingredient.name ? [{ name: ingredient.name }] : []}
                                renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
                                    <div style={{ position: 'relative', flex: 1, marginRight: '10px' }}>
                                        <input
                                            {...inputProps}
                                            ref={(input) => {
                                                inputRef(input);
                                                referenceElementRef(input);
                                            }}
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                backgroundColor: '#ffffff', // White background
                                                color: '#000000' // Black text color
                                                
                                            }}
                                        />
                                        {isLoading && (
                                            <Spinner 
                                                animation="border" 
                                                size="sm" 
                                                style={{ 
                                                    position: 'absolute', 
                                                    right: '10px', 
                                                    top: '50%', 
                                                    transform: 'translateY(-50%)' 
                                                }} 
                                            />
                                        )}
                                    </div>
                                )}
                            >
                            </Typeahead>

                            {/* Quantity Input */}
                            <TextField
                                label="Quantity"
                                value={ingredient.quantity}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    // Check if input value is not negative
                                    if (inputValue === '' || Number(inputValue) >= 0) {
                                        const newIngredients = [...recipe.ingredients];
                                        newIngredients[index].quantity = inputValue;
                                        setRecipe(prev => ({
                                            ...prev,
                                            ingredients: newIngredients,
                                        }));
                                    }
                                }}
                                
                                name="quantity"
                                required
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                type="number"
                                size="small"
                                style={{ marginRight: '10px', flex: 1 }}
                            />

                            {/* Unit Select */}
                            <FormControl style={{ flex: 1, marginRight: '10px' }}>
                                <InputLabel>Unit</InputLabel>
                                <Select
                                    value={ingredient.unit}
                                    onChange={(e) => {
                                        const newIngredients = [...recipe.ingredients];
                                        newIngredients[index].unit = e.target.value;
                                        setRecipe(prev => ({
                                            ...prev,
                                            ingredients: newIngredients,
                                        }));
                                    }}
                                    name="unit"
                                    label="Unit"
                                    size="small"
                                >
                                    {quantityUnits.map((unit) => (
                                        <MenuItem key={unit} value={unit}>
                                            {unit}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Form Select */}
                            <FormControl style={{ flex: 1 }}>
                                <InputLabel>Form</InputLabel>
                                <Select
                                    value={ingredient.form}
                                    onChange={(e) => {
                                        const newIngredients = [...recipe.ingredients];
                                        newIngredients[index].form = e.target.value;
                                        setRecipe(prev => ({
                                            ...prev,
                                            ingredients: newIngredients,
                                        }));
                                    }}
                                    name="form"
                                    label="Form"
                                    size="small"
                                >
                                    {ingredientForms.map((form) => (
                                        <MenuItem key={form} value={form}>
                                            {form}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Remove Ingredient Button */}
                            {index > 0 && (
                                <IconButton 
                                    color="secondary" 
                                    onClick={() => {
                                        const newIngredients = [...recipe.ingredients];
                                        newIngredients.splice(index, 1);
                                        setRecipe(prev => ({
                                            ...prev,
                                            ingredients: newIngredients,
                                        }));
                                    }}
                                    style={{ marginLeft: '10px' }}
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </div>
                    ))}

                    {/* Add Ingredient Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setRecipe(prev => ({
                                ...prev,
                                ingredients: [
                                    ...prev.ingredients,
                                    { name: '', quantity: '', unit: 'Gram', form: 'Fresh' }
                                ]
                            }));
                        }}
                        style={{ marginTop: '10px' }}
                    >
                        + Add Ingredient
                    </Button>
                </div>

                {/* Display Final Ingredient List */}
                <div style={{ marginBottom: '20px' }}>
                    <h3>Final Ingredient List</h3>
                    <TextField
                        label="Final Ingredient List"
                        value={recipe.finalIngredientList}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={4}
                        disabled
                    />
                </div>


                <FormControl fullWidth style={{ marginBottom: '20px' }}>
                    <InputLabel>Utensils</InputLabel>
                    <Select
                        multiple
                        value={recipe.utensils}
                        onChange={handleUtensilChange}
                        label="Utensils"
                        MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 200,  // Set a fixed height for the dropdown
                                overflow: 'auto', // Enable scrolling if content overflows
                              },
                            },
                          }}
                    >
                        {utensilOptions.map((utensil) => (
                            <MenuItem key={utensil} value={utensil}>
                                {utensil}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Dietary Preferences Section */}
                <div style={{ marginBottom: '20px' }}>
                    <h3>Dietary Preference</h3>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>Dietary Preference</InputLabel>
                        <Select
                            value={recipe.dietaryPreferences.length > 0 ? recipe.dietaryPreferences[0] : ''}
                            onChange={(e) => {
                                const selectedPreference = e.target.value;
                                setRecipe(prev => ({
                                    ...prev,
                                    dietaryPreferences: [selectedPreference]
                                }));
                            }}
                            label="Dietary Preference"
                        >
                            {dietaryOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                {/* Nutrients Section */}
                <div style={{ marginBottom: '20px' }}>
                    <h3>Nutritional Information</h3>
                    <TextField
                        label="Calories (Max allowed: 3000 cal)"
                        name="calories"
                        value={recipe.calories}
                        onChange={(e) => {
                            const value = Math.max(0, Math.min(3000,parseFloat(e.target.value)));
                            setRecipe(prev => ({...prev, calories: value}));
                        }}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="number"
                        size="small"
                        inputProps={{ min: 0, max:3000 }}
                    />
                    <TextField
                        label="Fat (Max allowed: 200g)"
                        name="fat"
                        value={recipe.fat}
                        onChange={(e) => {
                            const value = Math.max(0, Math.min(200,parseFloat(e.target.value)));
                            setRecipe(prev => ({...prev, fat: value}));
                        }}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="number"
                        size="small"
                        inputProps={{ min: 0, step: 0.1, max: 200 }}
                    />
                    <TextField
                        label="Carbohydrates (Max allowed: 300g)"
                        name="carbohydrates"
                        value={recipe.carbohydrates}
                        onChange={(e) => {
                            const value = Math.max(0, Math.min(300,parseFloat(e.target.value)));
                            setRecipe(prev => ({...prev, carbohydrates: value}));
                        }}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="number"
                        size="small"
                        inputProps={{ min: 0, step: 0.1, max: 300 }}
                        
                    />
                    <TextField
                        label="Protein (Max allowed: 200g)"
                        name="protein"
                        value={recipe.protein}
                        onChange={(e) => {
                            const value = Math.max(0, Math.min(200,parseFloat(e.target.value)));
                            setRecipe(prev => ({...prev, protein: value}));
                        }}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="number"
                        size="small"
                        inputProps={{ min: 0, step: 0.1, max: 200 }}
                        
                    />
                </div>
                {/* Recipe Steps */}
                <div style={{ marginBottom: '30px' }}>
                    <h3>Steps To Prepare Recipe</h3>
                    {steps.map((step, index) => (
                        <Box key={index} mb={2} display="flex" alignItems="center">
                            <TextField
                                label={`Step ${index + 1}`}
                                name={`step-${index}`}
                                value={step}
                                onChange={(e) => handleStepChange(index, e)}
                                required
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={2}
                                style={{ marginRight: '10px' }}
                            />
                            <IconButton
                                color="error"
                                onClick={() => handleRemoveStep(index)}
                                style={{ alignSelf: 'flex-start' }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Button variant="outlined" onClick={handleAddStep} style={{ marginTop: '10px' }}>
                        Add Step
                    </Button>
                </div>

                

                {/* Recipe Duration */}
                <Typography gutterBottom>Preparation Time: {formatDuration(recipe.duration)}</Typography>
                <Slider
                    value={recipe.duration}
                    onChange={(_, newValue) => setRecipe((prev) => ({ ...prev, duration: newValue }))}
                    aria-labelledby="duration-slider"
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => formatDuration(value)}
                    step={5}
                    min={0}
                    max={360}
                />

                {/* Recipe Servings */}
                <TextField
                        label="Servings (Max allowed: 10)"
                        name="Servings"
                        value={recipe.servings}
                        onChange={(e) => {
                            const value = Math.max(0, Math.min(10,parseFloat(e.target.value)));
                            setRecipe(prev => ({...prev, servings: value}));
                        }}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="number"
                        size="small"
                        inputProps={{ min: 0, step: 0.1, max: 10 }}
                        
                    />

                <div style={{ marginBottom: '30px' }}>
                    {/* Recipe Image Upload Section */}
                    <h3>Upload Recipe Image</h3>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        style={{ marginBottom: '20px', display: 'block' }}
                    />
                </div>

                {/* Submit Button */}
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Submit Recipe
                </Button>
            </form>
        </div>
    );
};

export default RecipeForm;
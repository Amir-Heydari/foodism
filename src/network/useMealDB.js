import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Categories } from '../slices/dataSlice'
import { setActiveCategory } from '../slices/toolsSlice'

function useMealDB() {
    // Hooks
    const dispatch = useDispatch()

    // Functions
    const getCategory = () => {
        return new Promise((resolve, reject) => {
            axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
                .then(response => {
                    dispatch(Categories(response.data))
                    dispatch(setActiveCategory(response.data.categories[0].strCategory))
                })
                .then(resolve())
                .catch(error => reject(error))
        })
    }

    const getRecepiesByCategory = (category) => {
        return new Promise((resolve, reject) => {
            axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => reject(error))
        })
    }

    const getRecipeDetail = (mealId) => {
        return new Promise((resolve, reject) => {
            axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        })
    }

    return { getCategory, getRecepiesByCategory, getRecipeDetail }
}

export default useMealDB

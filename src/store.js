import { createStore, applyMiddleware, compose } from 'redux'
// Nos permite utilizar funciones asincronas entre otras ventajas
import thunk from 'redux-thunk'

// Siempre que se crea un store es necesario un reducer
import reducer from './reducers'

// Creamos el store con el reducer combinado
const store = createStore(
    reducer,
    compose(applyMiddleware(thunk), 
    // Codigo para utilizar redux developer tools
        typeof window === 'object' && 
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'  
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
)

export default store
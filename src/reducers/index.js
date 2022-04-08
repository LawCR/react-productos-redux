// función para combinar todos los reducer (ya que solo se puede tener uno)
import {combineReducers} from 'redux'
import alertaReducer from './alertaReducer'
import productosReducer from './productosReducer'



export default combineReducers({
    productos: productosReducer,
    alerta: alertaReducer
})
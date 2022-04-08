import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import { AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_ERROR, AGREGAR_PRODUCTO_EXITO, COMENZAR_DESCARGA_PRODUCTOS, COMENZAR_EDICION_PRODUCTO, DESCARGA_PRODUCTO_ERROR, DESCARGA_PRODUCTO_EXITO, OBTENER_PRODUCTO_EDITAR, OBTENER_PRODUCTO_ELIMINAR, PRODUCTO_EDITADO_ERROR, PRODUCTO_EDITADO_EXITO, PRODUCTO_ELIMINADO_ERROR, PRODUCTO_ELIMINADO_EXITO } from "../types";


//Funcionnes que se va a utilizar en la vista - desde aqui se hace las consultas a bd

//Crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async(dispatch) => {
        dispatch(agregarProducto())
        try {
            // Insertar en la API
            await clienteAxios.post('/productos', producto)
            
            // Si todo sale bien, actualizar el state
            dispatch( agregarProductoExito(producto))

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            // Si hay un error
            dispatch(agregarProductoError(true))

            //Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta denuevo'
            })
        }
    }
}

// Lo cambia el state loading a true
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

// Agrega el producto y cambia el loading a false
const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// Si hubo un error cambia el state de error a true y loading a false
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


// Función que descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos())
        try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch(descargaProductosExitosa(respuesta.data))
        } catch (error) {
            dispatch(descargarProductosError())
        }
    }
} 

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = (productos) => ({
    type: DESCARGA_PRODUCTO_EXITO,
    payload: productos
})

const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTO_ERROR,
    payload: true
})

// Selecciona y elimina el producto
export function borrarProductoAction(id){
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))
        
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado',
                'El producto se eliminó correctamente.',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError())
        }
    }
}

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

// Colocar producto en edición
export function obtenerProductoEditarAction(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditar(producto))
    }
}

const obtenerProductoEditar = (producto) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un registro en la api y state
export function editarProductoAction(producto) {
    return async(dispatch) => {
        dispatch(editarProducto())
        try {
            clienteAxios.put(`productos/${producto.id}`, producto)
            
            dispatch( editarProductoExito(producto))
        } catch (error) {
            console.log(error);
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
    payload: true
})

const editarProductoExito = (producto) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})
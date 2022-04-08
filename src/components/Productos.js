import React, { useEffect } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { obtenerProductosAction } from '../actions/productoActions'
import Producto from './Producto'



const Productos = () => {

    const dispatch = useDispatch()

    // Effect para llamar a la api desde su action
    useEffect(() => {
        // Consultar la api
        const cargarProductos = () => dispatch(obtenerProductosAction())
        cargarProductos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Obtener el state
    const {productos, error, loading} = useSelector( state => state.productos)

    return (
        <>
            <h2 className="text-center my-5">Listyado de Productos</h2>
            {
                error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null
            }
            {
                loading ? <p className="text-center">Cargando...</p> : null
            }
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.length === 0 
                        ? 'No hay productos'
                        : (productos.map(producto => (
                            <Producto 
                                key={producto.id}
                                producto={producto}
                            />
                        )))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Productos

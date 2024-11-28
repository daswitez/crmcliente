import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// GraphQL mutation
const CREAR_CUENTA = gql`
  mutation NuevoUsuario($input: inputUsuario) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellido
      email
      creado
    }
  }
`;

const NuevaCuenta = () => {
    const [mensaje, setMensaje] = useState(null); // State for displaying error or success messages
    const [nuevoUsuario] = useMutation(CREAR_CUENTA); // Mutation for creating a new user
    const router = useRouter(); // For routing

    // Formik for form validation and submission
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es requerido'),
            apellido: Yup.string().required('El apellido es requerido'),
            email: Yup.string()
                .email('El email no es válido')
                .required('El email es requerido'),
            password: Yup.string()
                .min(6, 'El password debe tener al menos 6 caracteres')
                .required('El password es requerido'),
        }),
        onSubmit: async (datos) => {
            const { nombre, apellido, email, password } = datos;
            try {
                const { data } = await nuevoUsuario({
                    variables: {
                        input: { nombre, apellido, email, password },
                    },
                });
                setMensaje(`Cuenta creada exitosamente para ${data.nuevoUsuario.nombre}`);
                setTimeout(() => {
                    setMensaje(null);
                    router.push('/login'); // Redirect after successful creation
                }, 3000);
            } catch (error) {
                console.error('Error:', error);
                setMensaje(error.message);
                setTimeout(() => setMensaje(null), 3000); // Clear message after 3 seconds
            }
        },
    });

    return (
        <Layout>
            <h1 className="text-center text-2xl text-black font-light">
                Crear Nueva Cuenta
            </h1>
            {mensaje && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                    <p>{mensaje}</p>
                </div>
            )}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form
                        className="bg-white rounded-lg shadow-lg px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div>
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="nombre"
                            >
                                Nombre
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className="my-2 bg-red-100 text-red-700 border-l-4 border-red-500 p-4">
                                    <p>{formik.errors.nombre}</p>
                                </div>
                            ) : null}

                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="apellido"
                            >
                                Apellido
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="apellido"
                                type="text"
                                name="apellido"
                                placeholder="Apellido"
                                value={formik.values.apellido}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.apellido && formik.errors.apellido ? (
                                <div className="my-2 bg-red-100 text-red-700 border-l-4 border-red-500 p-4">
                                    <p>{formik.errors.apellido}</p>
                                </div>
                            ) : null}

                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email Usuario"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 text-red-700 border-l-4 border-red-500 p-4">
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null}

                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password Usuario"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 text-red-700 border-l-4 border-red-500 p-4">
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null}

                            <input
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
                                value="Crear Cuenta"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default NuevaCuenta;

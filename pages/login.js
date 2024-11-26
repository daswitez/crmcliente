import React from 'react';
import Layout from '../components/Layout';

const Login = () => {

    return ( 

        <>
            <Layout>
                <h1 className="text-center text-2xl text-white font-light">Login</h1>
                <div className={"flex justify-center mt-5"}>
                    <div className={"w-full max-w-sm"}>
                        <form className={"bg-white rounded-lg shadow-lg px-8 pt-6 pb-8 mb-4"}>
                            <div>
                                <label className={"block text-gray-700 font-bold mb-2"} htmlFor="email">
                                    Email:
                                </label>
                                <input
                                    className={"shadow appearance-none border border-gray-300 mb-4 rounded-md w-full px-8 py-2 leading-tight focus:outline-none focus:shadow-outline"}
                                    id="email"
                                    type="email"
                                    placeholder="Email Usuario"
                                />
                                <label className={"block text-gray-700 font-bold mb-2"} htmlFor="password">
                                    Password:
                                </label>
                                <input
                                    className={"shadow appearance-none border border-gray-300 mb-4 rounded-md w-full px-8 py-2 leading-tight focus:outline-none focus:shadow-outline"}
                                    id="password"
                                    type="password"
                                    placeholder="password Usuario"
                                />
                                <input
                                    type="submit"
                                    className={"bg-gray-800 w-full mt-5 p-2 text-white rounded-md uppercase hover:cursor-pointer hover:bg-gray-900"}
                                    value="Iniciar sesion"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Login;
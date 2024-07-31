const Unauthorized = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <img src="/nueva_esperanza/img/error.png" alt="Error" className="mx-auto mb-4 w-1/3 h-auto" />
                <h1 className="text-3xl font-bold text-red-500 mb-4">Acceso no autorizado</h1>
            </div>
        </div>
    );
};

export default Unauthorized;

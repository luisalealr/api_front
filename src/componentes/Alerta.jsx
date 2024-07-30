const Alerta = () => {
    return<>
    <hr className="border-[#1e1e1e63]"/>
    <div className="flex flex-row bg-[#f2c84c2c]">
        <div className="h-auto w-2 bg-[#F2C94C] mr-2"></div>
        <div className="flex flex-row justify-center items-center py-4">
            <div className="bg-[#F2C94C] p-4 h-12 w-12 rounded-full flex justify-center items-center">
                <span className="text-3xl text-white font-bold">!</span>
            </div>
            <div className="flex flex-col p-2 w-[80%]">
                <span className="font-semibold text-md text-[#2F3032]">¡ALERTA!</span>
                <span className="text-sm text-[#2F3032]">Hay productos en stock mínimo.</span>
            </div>
        </div>
    </div>
    </>
}

export default Alerta;
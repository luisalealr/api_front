import { Link } from "react-router-dom";
import {FiHome} from "react-icons/fi";
import {FiArchive} from "react-icons/fi";
import {AiOutlineDollarCircle} from "react-icons/ai";
import {HiMiniArrowPathRoundedSquare} from "react-icons/hi2";

export default function SideBar(){
    return<>
        <div className="flex flex-col bg-[#D9D9D9] w-[16rem] h-[100vh]">
            <div className="flex flex-row h-[70px] w-full justify-center items-center my-3">
                <img className="bg-white h-14 w-14 rounded-full mr-2" src="" alt="" />
                <div className="flex flex-col">
                    <h5>Drogería</h5>
                    <h5>La Nueva Esperanza</h5>
                </div>
            </div>
            <hr />
            <ul className="list-none py-[1rem] px-[2rem]">
                <li className="mb-[1rem]">
                    <Link className="flex flex-row items-center" to=""><FiHome className="mr-2"/> Inicio</Link>
                </li>
                <li className="mb-[1rem] flex flex-row">
                    <Link className="flex flex-row items-center" to=""><AiOutlineDollarCircle className="mr-2"/>Ventas</Link>
                </li>
                <li className="mb-[1rem] flex flex-col">
                    <div className="flex flex-row">
                        <Link className="flex flex-row items-center" to=""><FiArchive className="mr-2"/>Inventario</Link>
                    </div>
                    <ul className="py-[1rem] px-[2rem]">
                            <li className="mb-[1rem] flex flex-row">
                            <Link className="flex flex-row items-center" to="">Categorías</Link>
                        </li >
                            <li className="mb-[1rem] flex flex-row">
                            <Link className="flex flex-row items-center" to="">Proveedores</Link>
                        </li>
                            <li className="mb-[1rem] flex flex-row">
                            <Link className="flex flex-row items-center" to="">Productos</Link>
                        </li>
                    </ul>
                </li>
            </ul>
            <hr />
            <div className="flex flex-row h-[70px] w-full justify-center items-center my-3">
                <img className="bg-white h-14 w-14 rounded-full mr-2" src="" alt="" />
                <div className="flex flex-col">
                    <h5>Administrador</h5>
                    <HiMiniArrowPathRoundedSquare className=""/>
                </div>
            </div>
        </div>
    </>
}
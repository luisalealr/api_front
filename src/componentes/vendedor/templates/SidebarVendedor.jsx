import { Link } from "react-router-dom";
import {FaRegEdit} from "react-icons/fa";
import {TbReceiptDollar} from "react-icons/tb";
import {HiMiniArrowPathRoundedSquare} from "react-icons/hi2";
import {LiaUserAltSolid} from "react-icons/lia";
 
export default function SideBarVendedor(){
    return<>
        <div className="flex flex-col bg-[#D9D9D9] w-[16rem] h-screen">
            <div className="flex flex-row h-[70px] max-w-fit mx-3 items-center my-3">
                <img className="bg-white h-14 w-14 rounded-full mr-2" src="/public/img/logo.png" alt="" />
                <div className="flex flex-col">
                    <h5 className="font-semibold">Drogería</h5>
                    <h5 className="font-semibold">La Nueva Esperanza</h5>
                </div>
            </div>
            <hr className="mb-1 border-[#1e1e1e63]" />
            <div className="flex-1 overflow-y-auto">
                <ul className="list-none py-[1rem] px-[2rem]">
                    <li className="mb-[10px] p-2 rounded-md hover:bg-[#8DB600] transition-colors duration-300">
                        <Link className="flex flex-row items-center" to=""><FaRegEdit className="mr-4 text-xl"/>Registrar venta</Link>
                    </li>
                    <li className="mb-[10px] p-2 rounded-md hover:bg-[#8DB600] transition-colors duration-300">
                        <Link className="flex flex-row items-center" to=""><TbReceiptDollar className="mr-4 text-xl"/>Ventas</Link>
                    </li>
                </ul>
            </div>
            <hr className="mb-4 border-[#1e1e1e63]" />
            <div className="flex flex-row h-[70px] max-w-fit mx-3 items-center mb-3 ">
                <div className="bg-white h-14 w-14 rounded-full mr-2 flex justify-center items-center">
                    <LiaUserAltSolid className="text-6xl"/>
                </div>
                <div className="flex flex-col">
                    <h5 className="font-semibold">Vendedor</h5>
                    <Link to=""><HiMiniArrowPathRoundedSquare className="text-2xl"/></Link>
                </div>
            </div>
        </div>
    </>
}
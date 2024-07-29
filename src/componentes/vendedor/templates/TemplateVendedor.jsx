import SideBarVendedor from "./SidebarVendedor";

// eslint-disable-next-line react/prop-types
const TemplateVendedor = ({children}) => {
    return(
        <>
            <div className="flex flex-row h-screen overflow-hidden">
                <SideBarVendedor/> 
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
        </>
                
    );
};

export default TemplateVendedor;
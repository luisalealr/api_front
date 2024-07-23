import SideBarVendedor from "./SidebarVendedor";

// eslint-disable-next-line react/prop-types
const TemplateVendedor = ({children}) => {
    return(
        <>
        <div className="flex flex-row h-full">
            <div className="flex">
                <SideBarVendedor/>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
        </>
                
    );
};

export default TemplateVendedor;
import SideBar from "./Sidebar";

// eslint-disable-next-line react/prop-types
const TemplateAdmin = ({children}) => {
    return(
        <>
        <div className="flex flex-row h-full">
            <div className="flex">
                <SideBar/>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
        </>
                
    );
};

export default TemplateAdmin;
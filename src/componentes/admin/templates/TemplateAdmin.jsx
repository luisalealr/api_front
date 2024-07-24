import SideBar from "./Sidebar";

// eslint-disable-next-line react/prop-types
const TemplateAdmin = ({ children }) => {
    return (
        <>
            <div className="flex flex-row h-screen overflow-hidden">
                <SideBar/>
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
        </>

    );
};

export default TemplateAdmin;
import SideBar from "./Sidebar";

// eslint-disable-next-line react/prop-types
const TemplateAdmin = ({ children }) => {
    return (
        <>
            <div className="h-full">
                <div className="flex">
                    <SideBar />
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </div>
        </>

    );
};

export default TemplateAdmin;
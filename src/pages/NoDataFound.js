import React from "react";

const NoDataFound = () => {
    return (
        <div style={{ justifyContent: "center", backgroundColor: "#212529", paddingBlockEnd: "5%", height: "100%", width: "100%", position: "fixed" }}>
            <h1 style={{ marginTop: "15%", marginLeft: "30%", color: "white" }}>OOPS!! No Blogs Available as of Now.</h1>
            <h4 >
                <i style={{ marginTop: "15%", marginLeft: "35%", color: "white" }}>
                    Click on Add Blog button to add new Blogs......
                </i>
            </h4>
        </div>
    );
};

export default NoDataFound;

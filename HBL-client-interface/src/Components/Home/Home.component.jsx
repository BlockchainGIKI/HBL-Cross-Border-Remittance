import React from "react";
import { Fragment } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
    NavigationContainer,
    NavLinks,
    NavLink,
    LogoContainer,
} from "./Home.styles";
import DynamicTable from "../DynamicTable/DynamicTable.component";
import MultipleButtons from "../MultipleButtons/MultipleButtons.component";

const Home = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const Id = params.get('Id');
    console.log("Home", Id)
    return (
        <div>
            <Fragment>
                <NavigationContainer>
                    <LogoContainer>
                        <h3>HBL Internet Banking</h3>
                    </LogoContainer>
                    <NavLinks>
                        <NavLink to="/">
                            SIGN OUT
                        </NavLink>
                    </NavLinks>
                </NavigationContainer>
                <DynamicTable tableValue="AccountDetailTable" forPrint="User detail" Account={Id}></DynamicTable>
                <MultipleButtons></MultipleButtons><br /> <br />
                <Outlet />
            </Fragment>
        </div>
    )
}

export default Home;

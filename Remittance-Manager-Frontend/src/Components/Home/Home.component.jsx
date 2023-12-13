import React from "react";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import {
    NavigationContainer,
    NavLinks,
    NavLink,
    LogoContainer,
} from "./Home.styles";
// import { ReactComponent as Logo } from "../../assets/Hbl-logo.svg";
import ManagerDetail from "../ManagerDetail/ManagerDetail.component";
import MultipleButtons from "../MultipleButtons/MultipleButtons.component";

const Home = () => {

    return (
        <div>
            <Fragment>
                <NavigationContainer>
                    <LogoContainer to="/">
                        <h4>HBL Internet Banking</h4>
                    </LogoContainer>
                    <NavLinks>
                        <NavLink as="span">
                            SIGN OUT
                        </NavLink>
                    </NavLinks>
                </NavigationContainer>
                <ManagerDetail></ManagerDetail>
                <MultipleButtons></MultipleButtons><br /> <br />
                <Outlet />
            </Fragment>
        </div>
    )
}

export default Home;

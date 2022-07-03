import React from "react";
// Styles
import { GridBox, FlexBox } from "../styles/styles";
// Redux
import { useSelector } from "react-redux";

import AdminProductCard from "./AdminProductCard";

const AdminBody = () => {
  
    const { products } = useSelector(state => state.products)

    return (<>
        <FlexBox sx={{mt: 2}}>
        <GridBox>
            {products && products.map(p => (
                <AdminProductCard p={p} key={p._id}/>

            ))}
        </GridBox>
        </FlexBox>
    </>);
};

export default AdminBody;

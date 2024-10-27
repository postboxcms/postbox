import React from "react";
import { Card, CardContent } from "@mui/material";

const Form = (props) => {
    const { children, width } = props;
    
    return (
        <Card sx={{ width: width, marginBottom: 2 }}>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}

export default Form;
import React from "react";
import { Card, CardContent } from "@mui/material";

const Panel = (props) => {
    const { children, width } = props;
    
    return (
        <Card {...props} sx={{ width: width || '100%', marginBottom: 2 }}>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}

export default Panel;
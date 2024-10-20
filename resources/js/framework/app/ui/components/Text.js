import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Text = (props) => {
    return (
        <Card sx={{ width: '100%' }}>
            <CardContent>
                <Typography variant="h5">{props.title}</Typography>
            </CardContent>
        </Card>
    )
}

export default Text;
import React from "react";
import IconButton from "@ui/elements/IconButton";
import { useNavigation } from "@app/hooks/navigation";

export const ActionButtons = (props) => {
    const { entity, module } = props;
    const redirect = useNavigation();
    const navigateToEditPage = () => {
        redirect(`/${module}/edit?eid=${entity?.row?.uuid}`);
    }

    return (
        <div>
            <IconButton onClick={navigateToEditPage} name="fa-pen-to-square" />
            <IconButton name="fa-trash" />
        </div>
    );
};

export default ActionButtons;
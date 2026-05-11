import React from "react";
import IconButton from "@ui/components/elements/IconButton";
import { useNavigation, useModal } from "@app/hooks";
import Dialog from "@ui/components/Dialog";
import DeleteEntity from "./DeleteEntity";

export const ActionButtons = (props) => {
    const { entity, module, refresh } = props;
    const redirect = useNavigation();
    const modal = useModal();
    const navigateToEditPage = () => {
        redirect(`/${module}/edit?eid=${entity?.row?.uuid}`);
    };
    const deleteEntity = () => {
        modal.handleOpen(
            <DeleteEntity
                data={{
                    entity: entity,
                    module: module,
                }}
                onClose={() => {
                    modal.handleClose();
                    refresh();
                }}
            />
        );
    };

    return (
        <>
            <div>
                <IconButton
                    onClick={navigateToEditPage}
                    name="fa-pen-to-square"
                />
                <IconButton onClick={deleteEntity} name="fa-trash" />
            </div>
            <div>
                <Dialog {...modal} />
            </div>
        </>
    );
};

export default ActionButtons;

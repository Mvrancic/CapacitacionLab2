import React from 'react';
import { Checkbox, IconButton, ListItem, ListItemText } from '@mui/material';
import {Delete} from '@mui/icons-material';

interface ItemProps {
    text: string;
    done: boolean;
    onToggle: () => void;
    onDelete: () => void;
}

const Item: React.FC<ItemProps> = ({ text, done, onToggle, onDelete }) => {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={onDelete}>
                    <Delete />
                </IconButton>
            }
        >
            <Checkbox checked={done} onChange={onToggle} />
            <ListItemText primary={text} />
        </ListItem>
    );
};

export default Item;
import React, { useState } from 'react';
import { IconButton, Checkbox, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

interface ItemProps {
    text: string;
    done: boolean;
    onToggle: () => void;
    onDelete: () => void;
    onEdit: (newText: string) => void;
}

const Item: React.FC<ItemProps> = ({ text, done, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(text);

    const handleEditClick = () => {
        if (isEditing && newText !== text) {
            onEdit(newText);
        }
        setIsEditing(!isEditing);
    };

    return (
        <div>
            <Checkbox checked={done} onChange={onToggle} />
            {isEditing ? (
                <TextField
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    variant="outlined"
                    size="small"
                />
            ) : (
                <span style={{ textDecoration: done ? 'line-through' : 'none' }}>{text}</span>
            )}
            <IconButton onClick={handleEditClick}>
                {isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
            <IconButton onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};

export default Item;

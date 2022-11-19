
import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { palette } from '@mui/system';
import '../App.css';

interface Person {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: number;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        timezone: {
            offset: string;
            description: string;
        
        };
    };
    email: string;
    login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
    };
    dob: {
        date: string;
        age: number;
    };
    registered: {
        date: string;
        age: number;
    };
    phone: string;
    cell: string;
    id: {
        name: string;
        value: string;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
  
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    }),
}));


export const PersonList: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [expanded, setExpanded] = React.useState(false);

const handleExpandClick = () => {
    setExpanded(!expanded);
};

    useEffect(() => {
        axios.get(`https://randomuser.me/api/?results=10`)
        .then(res => {
            console.log(res.data);
            setPersons(res.data.results);
        })
    }, []);

    return (
        // foreach person show a material-ui card - 3 cards per row
        
        <div className="person-list">
            <h2 className="heading">User List</h2>
            {persons.map(person => (
                <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    image={person.picture.large}
                    alt="Person's Picture"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    {person.name.first} {person.name.last}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more">
                    <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    <Typography>Gender: {person.gender}</Typography>
                    <Typography>Username: {person.email}</Typography>
                    <Typography>Phone: {person.phone}</Typography>
                    <Typography>Cell: {person.cell}</Typography>
                    <Typography>Address: {person.location.street.number} {person.location.street.name}, {person.location.city}, {person.location.state}, {person.location.country}</Typography>
                    <Typography>Birthday and Age: {person.dob.date}, {person.dob.age}</Typography>
                    <Typography>Registeration Date: {person.registered.date}</Typography>
                    <Typography>Nationality: {person.nat}</Typography>
                    </CardContent>
                </Collapse>
                </Card>
            ))}
        </div>
    )
}

export default PersonList;





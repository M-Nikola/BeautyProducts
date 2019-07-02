import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIconsIconsIcon from 'react-native-vector-icons/MaterialIcons';

import { fontSize, colors } from '../../../../utils/constants';

// TODO remove necessary fonts later

// Icon component based on font name
// pass name, size, color to define icon
// with FeatherIcon as default

const Icon = (props) => {
    const {name, size = fontSize.big, color = colors.darkGray, font} = props;
    
    switch (font) {
        case 'AntDesign':
            return <AntDesignIcon size={size} color={color} name={name}/>;
        case 'Entypo':
            return <EntypoIcon size={size} color={color} name={name}/>;
        case 'EvilIcons':
            return <EvilIconsIcon size={size} color={color} name={name}/>;
        case 'FontAwesome':
            return <FontAwesomeIcon size={size} color={color} name={name}/>;            
        case 'FontAwesome5':
            return <FontAwesome5Icon size={size} color={color} name={name}/>;     
        case 'Foundation':
            return <FoundationIcon size={size} color={color} name={name}/>;
        case 'Ionicons':
            return <IoniconsIcon size={size} color={color} name={name}/>;      
        case 'MaterialCommunityIcons':
            return <MaterialCommunityIconsIcon size={size} color={color} name={name}/>;
        case 'MaterialIcons':
            return <MaterialIconsIconsIcon size={size} color={color} name={name}/>;
        default: 
            return <FeatherIcon size={size} color={color} name={name}/>;;
    }
}

export default Icon;
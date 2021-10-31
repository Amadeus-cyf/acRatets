import React, { memo } from 'react';
import { Label, Image, Header } from 'semantic-ui-react';
import './index.css';

type BangumiBriefType = {
    anime_id: string,
    image_url: string,
    title: string,
    width?: string,
}

const imageStyle = {
    width: '170px',
    height: '230px',
    margin:  '0 auto',
}

const titleStyle = {
    margin: '5px',
    textAlign: 'center',
}

const bangumiLabel = (props : BangumiBriefType) : JSX.Element => {
    const { title, image_url, width } = props;

    const labelStyle = {
        width: width,
        height: 'auto',
        minWidth: '200px',
        background: 'rgba(255, 255, 255, 0)',
        margin: 0,
    }
    
    const titleBrief = title.length > 30 ? (title.substring(0, 30) + '...') : title;
    
    return (
        <Label style = { labelStyle }>
            <Image className = 'hoverPartStyle' style = { imageStyle } src = {image_url} rounded/>
            <Header size='small' className = 'hoverPartStyle' style = { titleStyle }> {titleBrief} </Header>
        </Label>
    )
}

export default memo(bangumiLabel);

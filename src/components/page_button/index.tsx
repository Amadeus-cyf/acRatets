import React, { memo } from 'react';
import { Button } from 'semantic-ui-react';

type PropsType = {
    pageNum : number, 
    isFocus: boolean
    onPageClicked : (pageNum : number) => void,
}

const pageButton = (props : PropsType) : JSX.Element => {
    const { pageNum, onPageClicked } = props;
    
    const clickListener = () : void => {
        onPageClicked(pageNum);
    }

    return props.isFocus? (
        <Button style = {{ marginLeft: '5pt', marginRight: '5pt', marginTop: '3pt'}}
            color = 'blue' compact onClick = { clickListener } size = 'medium' content = { pageNum }/>
    ) :  (
        <Button style = {{ marginLeft: '5pt', marginRight: '5pt', marginTop: '3pt'}}
            inverted color = 'blue' compact onClick = { clickListener } size = 'medium' content = { pageNum }/>
    )
}

export default memo(pageButton, (prevProps : PropsType, props : PropsType) : boolean => {
    return prevProps.pageNum === props.pageNum && prevProps.isFocus === props.isFocus;
});

import { memo } from 'react';
import { Button } from 'semantic-ui-react';

type PropsType = {
    pageNum : number, 
    onPageClicked : (pageNum : number) => void,
}

const pageButton = (props : PropsType) : JSX.Element => {
    const { pageNum, onPageClicked } = props;
    
    const clickListener = () : void => {
        onPageClicked(pageNum);
    }

    return (
        <Button style = {{ marginLeft: '5pt', marginRight: '5pt', marginTop: '3pt'}}
        color = 'blue' onClick = { clickListener } size = 'small'> { pageNum } </Button>
    )
}

export default memo(pageButton, (prevProps : PropsType, props : PropsType) : boolean => {
    return prevProps.pageNum === props.pageNum;
});

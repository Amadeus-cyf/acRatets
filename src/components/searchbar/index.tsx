import { memo } from 'react';
import { Input } from 'semantic-ui-react';
import { deepCompare } from '../../utils/deepCompare';

const searchbar = (props : any) : JSX.Element => {
    const { searchbarStyle } = props;

    return (
        <Input style = {searchbarStyle} icon = 'search' placeholder='输入你想要搜索的内容吧'/>
    )
}

export default memo(searchbar, (prevProps, props) => {
    return deepCompare(prevProps.searchbarStyle, props.searchbarStyle);
});

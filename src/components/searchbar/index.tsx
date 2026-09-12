import { memo } from "react";
import { Input } from "semantic-ui-react";
import { deepEqual } from "../../utils/deepEqual";

const Searchbar = (props: any): JSX.Element => {
    const { searchbarStyle } = props;

    return (
        <Input
            style={searchbarStyle}
            icon="search"
            placeholder="输入你想要搜索的内容吧"
        />
    );
};

export default memo(Searchbar, (prevProps, props) => {
    return deepEqual(prevProps.searchbarStyle, props.searchbarStyle);
});

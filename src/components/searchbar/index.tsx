import React, { memo } from "react";
import { Input } from "@/components/ui";

interface SearchbarProps {
    searchbarStyle?: React.CSSProperties;
}

const Searchbar = (props: SearchbarProps): React.ReactElement => {
    const { searchbarStyle } = props;

    return (
        <Input
            style={searchbarStyle}
            icon="search"
            placeholder="输入你想要搜索的内容吧"
        />
    );
};

export default memo(Searchbar);

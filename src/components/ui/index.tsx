import React, { memo } from "react";
import {
    Avatar,
    Box,
    Button as MuiButton,
    Card as MuiCard,
    CardContent as MuiCardContent,
    Divider as MuiDivider,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";

type ButtonProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "color" | "content"
> & {
    color?: string;
    compact?: boolean;
    content?: React.ReactNode;
    inverted?: boolean;
    size?: "medium" | "big";
};

export const Button = memo(
    ({
        color,
        compact,
        content,
        inverted,
        size,
        children,
        style,
        ...props
    }: ButtonProps) => (
        <MuiButton
            color={color === "blue" ? "primary" : "inherit"}
            size={size === "big" ? "large" : "medium"}
            variant={
                inverted ? "outlined" : color === "blue" ? "contained" : "text"
            }
            style={{ minWidth: compact ? 0 : undefined, ...style }}
            {...props}
        >
            {content ?? children}
        </MuiButton>
    )
);

type LabelProps = Omit<React.HTMLAttributes<HTMLDivElement>, "style"> & {
    content?: React.ReactNode;
    style?: React.CSSProperties;
};

export const Label = memo(({ content, children, ...props }: LabelProps) => (
    <Box {...props}>{content ?? children}</Box>
));

type ImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "style"> & {
    avatar?: boolean;
    rounded?: boolean;
    style?: React.CSSProperties;
};

export const Image = memo(
    ({ avatar, rounded, alt = "", style, ...props }: ImageProps) =>
        avatar ? (
            <Avatar alt={alt} src={props.src} style={style} />
        ) : (
            <img
                alt={alt}
                style={{ borderRadius: rounded ? 5 : undefined, ...style }}
                {...props}
            />
        )
);

type HeaderProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, "style"> & {
    content?: React.ReactNode;
    size?: "small" | "medium" | "large";
    style?: React.CSSProperties;
};

export const Header = memo(
    ({ content, size = "medium", children, ...props }: HeaderProps) => (
        <Typography
            component={size === "large" ? "h2" : size === "small" ? "h4" : "h3"}
            variant={
                size === "large" ? "h5" : size === "small" ? "subtitle1" : "h6"
            }
            {...props}
        >
            {content ?? children}
        </Typography>
    )
);

export const Divider = memo((props: React.HTMLAttributes<HTMLHRElement>) => (
    <MuiDivider {...props} />
));

type MenuProps = Omit<React.HTMLAttributes<HTMLElement>, "style"> & {
    secondary?: boolean;
    style?: React.CSSProperties;
};
type MenuItemProps = Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "color" | "onClick" | "style"
> & {
    active?: boolean;
    name?: string;
    style?: React.CSSProperties;
    onClick?: (
        event: React.MouseEvent<HTMLButtonElement>,
        data: { name?: string }
    ) => void;
};

const MenuItem = memo(
    ({ active, name, onClick, children, style, ...props }: MenuItemProps) => (
        <MuiButton
            type="button"
            variant="text"
            aria-current={active ? "page" : undefined}
            onClick={(event) => onClick?.(event, { name })}
            style={{ fontWeight: active ? 700 : undefined, ...style }}
            {...props}
        >
            {children ?? name}
        </MuiButton>
    )
);

const MenuRoot = memo(
    ({ secondary: _secondary, children, style, ...props }: MenuProps) => (
        <nav
            style={{ display: "flex", alignItems: "center", ...style }}
            {...props}
        >
            {children}
        </nav>
    )
);

export const Menu = Object.assign(MenuRoot, { Item: MenuItem });

type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "color" | "size" | "style"
> & {
    icon?: string;
    size?: "medium" | "big";
    style?: React.CSSProperties;
};

export const Input = memo(
    ({ icon, size, style, className, ...props }: InputProps) => (
        <TextField
            className={className}
            size={size === "big" ? "medium" : "small"}
            style={style}
            slotProps={{
                input: icon
                    ? {
                          endAdornment: (
                              <InputAdornment position="end">
                                  <SearchIcon aria-hidden="true" />
                              </InputAdornment>
                          ),
                      }
                    : undefined,
            }}
            {...props}
        />
    )
);

const FormField = ({ children }: React.PropsWithChildren) => (
    <Stack spacing={1}>{children}</Stack>
);
type FormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, "style"> & {
    style?: React.CSSProperties;
};
const FormRoot = (props: FormProps) => <form {...props} />;
export const Form = Object.assign(FormRoot, { Field: FormField, Input });

const CardContent = ({
    children,
}: React.PropsWithChildren<{ extra?: boolean }>) => (
    <MuiCardContent>{children}</MuiCardContent>
);
const CardRoot = (
    props: Omit<React.HTMLAttributes<HTMLDivElement>, "style"> & {
        style?: React.CSSProperties;
    }
) => <MuiCard {...props} />;
export const Card = Object.assign(CardRoot, { Content: CardContent });

export const Icon = memo(
    ({
        name,
        ...props
    }: React.HTMLAttributes<HTMLSpanElement> & { name: string }) => (
        <span {...props}>
            {name === "heart" ? (
                <FavoriteIcon fontSize="small" aria-hidden="true" />
            ) : (
                <PersonOutlineIcon fontSize="small" aria-hidden="true" />
            )}
        </span>
    )
);

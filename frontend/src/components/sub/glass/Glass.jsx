import { GlassStyles } from "./GlassStyles";

const Glass = ({ children, className, muted }) => {
    return (
        <GlassStyles className={className} muted={muted}>
            {children}
        </GlassStyles>
    );
};

export default Glass;

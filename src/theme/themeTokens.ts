import { MappingAlgorithm } from "antd";
import { OverrideToken } from "antd/es/theme/interface";

type ComponentsConfig = {
    [key in keyof OverrideToken]?: OverrideToken[key] & {
        algorithm?: boolean | MappingAlgorithm | MappingAlgorithm[];
    };
};

const themeTokens: ComponentsConfig  = {
    Form: {
        itemMarginBottom: 8
    }
};
export default themeTokens;
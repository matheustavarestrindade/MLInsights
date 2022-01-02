import colors from "colors";
import LogPattern from "./LogPatternInterface";
const ENABLE_DETAILS = false;
colors.enable();

export default {
    info(data: LogPattern) {
        const message = parseParams(data.params, colors.yellow);
        console.log("[INFO]".cyan, data.message.white, message);
        if (ENABLE_DETAILS) {
            const details = detailDebug();
            console.log(details);
        }
    },
    subInfo(data: LogPattern) {
        const message = parseParams(data.params, colors.yellow);
        console.log("   >".cyan, data.message.white, message);
        if (ENABLE_DETAILS) {
            const details = detailDebug();
            console.log(details);
        }
    },
    error(data: LogPattern) {
        const message = parseParams(data.params, colors.red);
        console.log("[ERROR]".red, data.message.white, message);
        if (ENABLE_DETAILS) {
            const details = detailDebug();
            console.log(details);
        }
    },
    subError(data: LogPattern) {
        const message = parseParams(data.params, colors.red);
        console.log("   >".red, data.message.white, message);
        if (ENABLE_DETAILS) {
            const details = detailDebug();
            console.log(details);
        }
    },
    warning(data: LogPattern) {
        const message = parseParams(data.params, colors.yellow);
        console.log("[WARN]".yellow, data.message.white, message);
        if (ENABLE_DETAILS) {
            const details = detailDebug();
            console.log(details);
        }
    },
    subWarning(data: LogPattern) {
        const message = parseParams(data.params, colors.yellow);
        console.log("   >".yellow, data.message.white, message);
        if (ENABLE_DETAILS) {
            const details = detailDebug();
            console.log(details);
        }
    },
    test(data: LogPattern) {
        const message = parseParams(data.params, colors.yellow);
        console.log("[TESTING]".magenta, data.message.white, message);
        if (ENABLE_DETAILS) {
            const details = detailDebug();
            console.log(details);
        }
    },
    subTest(data: LogPattern) {
        const message = parseParams(data.params, colors.yellow);
        console.log("   >".magenta, data.message.white, message);
        if (ENABLE_DETAILS) {
            const details = detailDebug();
            console.log(details);
        }
    },
};

const detailDebug = (): String => {
    const logLineDetails = new Error().stack.split("at ")[3].trim();
    const parts = logLineDetails.split("(");
    const className = parts[0];
    const secondPart = parts[1].split(")")[0];
    const message = "DEBUG".bgRed + " " + className.yellow + "(".white + secondPart.gray + ")".white;
    return message;
};

const parseParams = (highlightParams: any, color: colors.Color): String => {
    let paramsStr = "";
    if (highlightParams instanceof Array) {
        for (const param of highlightParams) {
            if (param instanceof String) {
                paramsStr += color.call(color, param) + " ";
                continue;
            }
            paramsStr += color.call(color, new String(param)) + " ";
        }
    } else if (highlightParams instanceof String || typeof highlightParams === "string") {
        paramsStr += color.call(color, highlightParams);
    } else {
        paramsStr += color.call(color, new String(highlightParams));
    }

    return paramsStr;
};

export const darken = (color, percentage) => {
    // Helper to clamp values between 0 and 255
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    // Convert HEX to RGB
    const hexToRgb = (hex) => {
        let r = 0,
            g = 0,
            b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        return { r, g, b };
    };

    // Convert RGB string to object
    const parseRgb = (rgb) => {
        const values = rgb.match(/\d+/g).map(Number);
        return { r: values[0], g: values[1], b: values[2] };
    };

    // Convert HSL string to object
    const parseHsl = (hsl) => {
        const values = hsl.match(/[\d.]+/g).map(Number);
        return { h: values[0], s: values[1] / 100, l: values[2] / 100 };
    };

    // Darken an RGB color
    const darkenRgb = ({ r, g, b }, percentage) => ({
        r: clamp(r * (1 - percentage / 100), 0, 255),
        g: clamp(g * (1 - percentage / 100), 0, 255),
        b: clamp(b * (1 - percentage / 100), 0, 255),
    });

    // Darken an HSL color
    const darkenHsl = ({ h, s, l }, percentage) => ({
        h,
        s,
        l: clamp(l * (1 - percentage / 100), 0, 1),
    });

    // Convert RGB to CSS string
    const rgbToCss = ({ r, g, b }) =>
        `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

    // Convert HSL to CSS string
    const hslToCss = ({ h, s, l }) =>
        `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

    // Determine color format and process accordingly
    if (color.startsWith("#")) {
        const rgb = hexToRgb(color);
        return rgbToCss(darkenRgb(rgb, percentage));
    } else if (color.startsWith("rgb")) {
        const rgb = parseRgb(color);
        return rgbToCss(darkenRgb(rgb, percentage));
    } else if (color.startsWith("hsl")) {
        const hsl = parseHsl(color);
        return hslToCss(darkenHsl(hsl, percentage));
    } else {
        throw new Error("Unsupported color format. Use HEX, RGB, or HSL.");
    }
};

export const lighten = (color, percentage) => {
    // Helper to clamp values between 0 and 255
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    // Convert HEX to RGB
    const hexToRgb = (hex) => {
        let r = 0,
            g = 0,
            b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex.slice(1, 3), 16);
            g = parseInt(hex.slice(3, 5), 16);
            b = parseInt(hex.slice(5, 7), 16);
        }
        return { r, g, b };
    };

    // Convert RGB string to object
    const parseRgb = (rgb) => {
        const values = rgb.match(/\d+/g).map(Number);
        return { r: values[0], g: values[1], b: values[2] };
    };

    // Convert HSL string to object
    const parseHsl = (hsl) => {
        const values = hsl.match(/[\d.]+/g).map(Number);
        return { h: values[0], s: values[1] / 100, l: values[2] / 100 };
    };

    // Lighten an RGB color
    const lightenRgb = ({ r, g, b }, percentage) => ({
        r: clamp(r + (255 - r) * (percentage / 100), 0, 255),
        g: clamp(g + (255 - g) * (percentage / 100), 0, 255),
        b: clamp(b + (255 - b) * (percentage / 100), 0, 255),
    });

    // Lighten an HSL color
    const lightenHsl = ({ h, s, l }, percentage) => ({
        h,
        s,
        l: clamp(l + (1 - l) * (percentage / 100), 0, 1),
    });

    // Convert RGB to CSS string
    const rgbToCss = ({ r, g, b }) =>
        `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

    // Convert HSL to CSS string
    const hslToCss = ({ h, s, l }) =>
        `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

    // Determine color format and process accordingly
    if (color.startsWith("#")) {
        const rgb = hexToRgb(color);
        return rgbToCss(lightenRgb(rgb, percentage));
    } else if (color.startsWith("rgb")) {
        const rgb = parseRgb(color);
        return rgbToCss(lightenRgb(rgb, percentage));
    } else if (color.startsWith("hsl")) {
        const hsl = parseHsl(color);
        return hslToCss(lightenHsl(hsl, percentage));
    } else {
        throw new Error("Unsupported color format. Use HEX, RGB, or HSL.");
    }
};

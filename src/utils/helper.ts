// Helper function to convert hex to RGBA
export const hexToRGBA = (hex: string, alpha: any) => {
  // Check if the hex code is valid
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
    throw new Error("Invalid hex color format");
  }

  // Remove the hash (#) from the hex code
  hex = hex.slice(1);

  // If the hex is 3 characters, convert it to 6 characters
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Extract the red, green, and blue values
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Return the RGBA string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

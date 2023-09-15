const copyToClipboard = async (
  text: string,
  trimFunction?: (text: string) => string
) => {
  trimFunction ? (text = trimFunction(text)) : (text = text);
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

export default copyToClipboard;

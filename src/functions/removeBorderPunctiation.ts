const removeBorderPunctiation = (text: string): string => {
  if (/^[.,!?]/.test(text)) {
    text = text.slice(1);
  }
  if (/[.,!?]$/.test(text)) {
    text = text.slice(0, -1);
  }
  return text;
};

export default removeBorderPunctiation;

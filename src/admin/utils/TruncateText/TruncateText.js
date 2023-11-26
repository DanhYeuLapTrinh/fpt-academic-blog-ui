export default function truncateText(text, limit) {
  text = text.replace(/,|;/g, ", ");

  const words = text.split(" ");

  if (words.length > limit) {
    return `${words.slice(0, limit).join(" ")} ...`;
  }

  return text;
}

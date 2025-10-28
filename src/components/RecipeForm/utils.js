export const generateFinalIngredientList = (ingredients) =>
  ingredients
    .map(
      (i) => `${i.quantity} ${i.unit} ${i.form} ${i.name}`
    )
    .join(", ");

export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins ? `${hours} hr ${mins} min` : `${hours} hr`;
};

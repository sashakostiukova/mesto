function createCard(data) {
  const cardElement = new Card(data, '.place-template', handleCardClick);
  return cardElement.generateCard();
}

export const renderPlaceCard = (data) => {
  const placeCard = createCard(data);
  placesContainer.append(placeCard);
}

initialCards.forEach(renderPlaceCard);
import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleClickDelete) {
    super(popupSelector);
    this._confirmDeletionButton = this._popup.querySelector('.popup__confirm-deletion-button');
    this.handleClickDelete = handleClickDelete;
  }

  open(card) {
    super.open();
    this.card = card;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmDeletionButton.addEventListener('click', () => {

      this.handleClickDelete(this.card);
    })
  }
}
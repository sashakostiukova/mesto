import Popup from "./Popup";
import { popupImgViewPic, popupImgViewCaption } from "../utils/constants";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

// вставляем в попап картинку с src изображения и 
// подписью к картинке.
  open(link, name) {
    popupImgViewPic.src = link;
    popupImgViewPic.alt = name;
    popupImgViewCaption.textContent = name;

    super.open();
  }
}
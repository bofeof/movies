import './ShowMoreButton.css';

export default function ShowMoreButton({onClickMoreButton}) {
  return (
    <div className="show-more">
      <button type="button" className="show-more__button" onClick={onClickMoreButton}>
        Ещё
      </button>
    </div>
  );
}

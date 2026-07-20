import { useState } from "react";
import './ReviewSection.css';

// StarRating: componente riutilizzabile per l'input a stelle
function StarRating({ value, onChange }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`star-btn ${n <= value ? "star-btn--active" : ""}`}
          onClick={() => onChange(n)}
        >
          ★
        </button>
      ))}
    </div>
  );
}

// ReviewSection: gestisce le recensioni di un prodotto, tutto in memoria locale (nessun backend)
export default function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editError, setEditError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (text.trim().length < 10) {
      setError("La recensione deve contenere almeno 10 caratteri.");
      return;
    }

    const nuovaRecensione = {
      id: Date.now(),
      productId,
      text,
      rating,
      autore: "Utente",
    };

    setReviews([nuovaRecensione, ...reviews]);
    setText("");
    setRating(5);
  }

  function startEdit(review) {
    setEditingId(review.id);
    setEditText(review.text);
    setEditRating(review.rating);
    setEditError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditError("");
  }

  function handleUpdate(e, reviewId) {
    e.preventDefault();
    setEditError("");

    if (editText.trim().length < 10) {
      setEditError("La recensione deve contenere almeno 10 caratteri.");
      return;
    }

    setReviews(
      reviews.map((r) =>
        r.id === reviewId ? { ...r, text: editText, rating: editRating } : r
      )
    );
    setEditingId(null);
  }

  function handleDelete(reviewId) {
    if (!window.confirm("Sei sicuro di voler eliminare questa recensione?")) return;
    setReviews(reviews.filter((r) => r.id !== reviewId));
  }

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <section className="product-detail__section mt-4">
      <h2>
        Recensioni ({reviews.length})
        {avgRating && (
          <span className="review-average__detail ms-2">
            — Media: {"★".repeat(Math.round(avgRating))} {avgRating}/5
          </span>
        )}
      </h2>

      <form onSubmit={handleSubmit} className="review-form">
        {error && <p className="form-error text-danger">{error}</p>}
        <div className="form-group mb-2">
          <label htmlFor="review-text">La tua recensione</label>
          <textarea
            id="review-text"
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            minLength={10}
            rows={3}
          />
        </div>
        <div className="form-group mb-2">
          <label>Voto</label>
          <StarRating value={rating} onChange={setRating} />
        </div>
        <button type="submit" className="btn btn-primary review-form__submit">
          Invia recensione
        </button>
      </form>

      <div className="reviews-list mt-4">
        {reviews.map((r) => {
          if (editingId === r.id) {
            return (
              <div key={r.id} className="review border-bottom py-3">
                <form onSubmit={(e) => handleUpdate(e, r.id)} className="review-form">
                  {editError && <p className="form-error text-danger">{editError}</p>}
                  <div className="form-group mb-2">
                    <label>Modifica recensione</label>
                    <textarea
                      className="form-control"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      required
                      minLength={10}
                      rows={3}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label>Voto</label>
                    <StarRating value={editRating} onChange={setEditRating} />
                  </div>
                  <div className="review__actions">
                    <button type="submit" className="btn btn-primary btn-sm me-2">Salva</button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={cancelEdit}>Annulla</button>
                  </div>
                </form>
              </div>
            );
          }

          return (
            <div key={r.id} className="review border-bottom py-3">
              <div className="review__header d-flex justify-content-between">
                <strong>{r.autore}</strong>
                <span className="review__rating">
                  {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                </span>
              </div>
              <p className="review__text">{r.text}</p>
              <div className="review__actions">
                <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => startEdit(r)}>
                  ✏️ Modifica
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(r.id)}>
                  🗑️ Elimina
                </button>
              </div>
            </div>
          );
        })}
        {reviews.length === 0 && (
          <p className="review-empty">Nessuna recensione</p>
        )}
      </div>
    </section>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import './Payment.css';

export default function Payment() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [nomeCarta, setNomeCarta] = useState("");
  const [numeroCarta, setNumeroCarta] = useState("");
  const [scadenza, setScadenza] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const totale = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantita,
    0
  );

  function formatNumeroCarta(value) {
    const cleaned = value.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  }

  function formatScadenza(value) {
    const cleaned = value.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const numeroPulito = numeroCarta.replace(/\s/g, "");

    if (numeroPulito.length !== 16) {
      setError("Il numero della carta deve avere 16 cifre.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(scadenza)) {
      setError("Inserisci la scadenza nel formato MM/AA.");
      return;
    }
    if (cvv.length !== 3) {
      setError("Il CVV deve avere 3 cifre.");
      return;
    }
    if (!nomeCarta.trim()) {
      setError("Inserisci il nome intestatario della carta.");
      return;
    }

    clearCart();
    setSuccess(true);
    setTimeout(() => navigate("/"), 2000);
  }

  if (cartItems.length === 0 && !success) {
    return (
      <div className="payment-container">
        <p>Il carrello è vuoto, non c'è nulla da pagare.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="payment-container">
        <div className="payment-success">
          <h2>✅ Pagamento completato!</h2>
          <p>Grazie per il tuo ordine. Verrai reindirizzato alla home.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h1>Pagamento</h1>

        <div className="payment-summary">
          <span>Totale da pagare</span>
          <strong>€{totale.toFixed(2)}</strong>
        </div>

        {error && <p className="payment-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nomeCarta">Intestatario carta</label>
            <input
              id="nomeCarta"
              type="text"
              placeholder="Mario Rossi"
              value={nomeCarta}
              onChange={(e) => setNomeCarta(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="numeroCarta">Numero carta</label>
            <input
              id="numeroCarta"
              type="text"
              placeholder="0000 0000 0000 0000"
              value={numeroCarta}
              onChange={(e) => setNumeroCarta(formatNumeroCarta(e.target.value))}
              required
            />
          </div>

          <div className="payment-row">
            <div className="form-group">
              <label htmlFor="scadenza">Scadenza</label>
              <input
                id="scadenza"
                type="text"
                placeholder="MM/AA"
                value={scadenza}
                onChange={(e) => setScadenza(formatScadenza(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                type="text"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-pay">
            Paga €{totale.toFixed(2)}
          </button>
        </form>
      </div>
    </div>
  );
}
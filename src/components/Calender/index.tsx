import { useEffect } from "react";
import styles from "./styles.module.scss";

export const Calendar = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.confirmationMessage}>
        <h2>Obrigado pelo contato!</h2>
        <p>Agende agora sua consulta no calendário abaixo.</p>
      </div>
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/fmello-85/45min"
        style={{
          minWidth: "320px",
          height: "700px",
        }}
      />
    </div>
  );
};

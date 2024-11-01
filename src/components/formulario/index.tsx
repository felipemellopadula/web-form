import styles from "./ContactForm.module.scss";
import videoBg from "../../assets/ani02-3.mp4";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  recipient: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    recipient: "",
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className={styles.container}>
      <div className={styles.maincontainer}>
        <div className={styles.leftSide}>
          <div className={styles.content}>
            <h1>Descubra como podemos ajudar o seu negócio.</h1>
            <video src={videoBg} autoPlay muted loop playsInline></video>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.contactFormContainer}>
            <h1 className={styles.title}>Chega mais, vamos conversar?</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="text"
                name="celular"
                placeholder="Celular"
                value={formData.subject}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="text"
                name="empresa"
                placeholder="Empresa"
                value={formData.subject}
                onChange={handleChange}
                className={styles.input}
              />
              <textarea
                name="mensagem"
                placeholder="Mensagem"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
              />
              <button type="submit" className={styles.submitButton}>
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

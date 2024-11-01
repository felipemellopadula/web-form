import styles from "./ContactForm.module.scss";
import videoBg from "../../assets/ani02-3.mp4";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  nome: string;
  email: string;
  celular: string;
  empresa: string;
  mensagem: string;
}

export const Contact = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    celular: "",
    empresa: "",
    mensagem: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Validação específica para o campo de celular
    if (name === "celular") {
      // Remove tudo que não for número
      const numbersOnly = value.replace(/\D/g, "");

      // Formata o número de telefone (XX) XXXXX-XXXX
      let formattedNumber = "";
      if (numbersOnly.length <= 11) {
        formattedNumber = numbersOnly.replace(
          /(\d{2})(\d{5})(\d{4})/,
          "($1) $2-$3"
        );
      }

      setFormData({ ...formData, [name]: formattedNumber });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      await fetch("https://formsubmit.co/felipe@unitycomunicacao.com", {
        method: "POST",
        body: formData,
      });

      navigate("/calendar");
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    } finally {
      setIsSubmitting(false);
    }
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
            <h1 className={styles.title}>Vamos conversar?</h1>
            <form
              onSubmit={handleSubmit}
              className={styles.form}
              action="https://formsubmit.co/felipe@unitycomunicacao.com"
              method="POST"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input
                type="hidden"
                name="_next"
                value="https://www.unitycomunicacao.com"
              />
              <input
                type="hidden"
                name="_subject"
                value="Nova Mensagem de Contato - Unity Comunicação"
              />

              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
                className={styles.input}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
              <input
                type="tel"
                name="celular"
                placeholder="Celular (XX) XXXXX-XXXX"
                value={formData.celular}
                onChange={handleChange}
                className={styles.input}
                maxLength={15}
                pattern="\(\d{2}\)\s\d{5}-\d{4}"
                required
              />
              <input
                type="text"
                name="empresa"
                placeholder="Empresa"
                value={formData.empresa}
                onChange={handleChange}
                className={styles.input}
                required
              />
              <textarea
                name="mensagem"
                placeholder="Mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                className={styles.textarea}
                required
              />
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

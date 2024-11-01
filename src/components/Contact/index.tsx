// Contact.tsx
import { useState } from "react";
import styles from "./ContactForm.module.scss";
import emailjs from "@emailjs/browser";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import logoUnity from "../../assets/Logo_Unity.png";
import videoForm from "../../assets/ani02-3.mp4";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  mensagem: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  telefone?: string;
  empresa?: string;
  mensagem?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    mensagem: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const navigate = useNavigate();

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = "Telefone é obrigatório";
    }

    if (!formData.empresa.trim()) {
      newErrors.empresa = "Empresa é obrigatória";
    }

    if (!formData.mensagem.trim()) {
      newErrors.mensagem = "Mensagem é obrigatória";
    }

    return newErrors;
  };

  const isFormValid = () => {
    const currentErrors = validateForm();
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched(true);

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);

      try {
        const templateParams = {
          to_name: "Unity Comunicação",
          from_name: formData.nome,
          nome: formData.nome,
          email: formData.email,
          celular: formData.telefone,
          empresa: formData.empresa,
          mensagem: formData.mensagem,
        };

        await emailjs.send(
          "service_d01tocr",
          "template_3ku2c5w",
          templateParams,
          "I6CDkyIieBMlS_ptU"
        );

        setFormData({
          nome: "",
          email: "",
          telefone: "",
          empresa: "",
          mensagem: "",
        });
        setFormTouched(false);

        navigate("/calender");
      } catch (error) {
        console.error("Erro ao enviar formulário:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormTouched(true);

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className={styles.container}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className={styles.maincontainer}>
        <div className={styles.leftSide}>
          <div className={styles.content}>
            <h1>Vamos começar um projeto juntos?</h1>
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/path-to-poster-image.jpg"
            >
              <source src={videoForm} type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.contactFormContainer}>
            <h2 className={styles.title}>Entre em Contato</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.nome ? styles.error : ""
                  }`}
                />
                {errors.nome && (
                  <span className={styles.errorMessage}>{errors.nome}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.email ? styles.error : ""
                  }`}
                />
                {errors.email && (
                  <span className={styles.errorMessage}>{errors.email}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="tel"
                  name="telefone"
                  placeholder="Telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.telefone ? styles.error : ""
                  }`}
                />
                {errors.telefone && (
                  <span className={styles.errorMessage}>{errors.telefone}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="empresa"
                  placeholder="Empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.empresa ? styles.error : ""
                  }`}
                />
                {errors.empresa && (
                  <span className={styles.errorMessage}>{errors.empresa}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  name="mensagem"
                  placeholder="Mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  className={`${styles.textarea} ${
                    errors.mensagem ? styles.error : ""
                  }`}
                />
                {errors.mensagem && (
                  <span className={styles.errorMessage}>{errors.mensagem}</span>
                )}
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting || (formTouched && !isFormValid())}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
                {isSubmitting && <div className={styles.loadingSpinner} />}
              </button>
            </form>

            <div className={styles.copyright}>
              <div className={styles.logoContainer}>
                <a
                  href="https://www.unitycomunicacao.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={logoUnity}
                    alt="Unity Comunicação Logo"
                    className={styles.logo}
                  />
                </a>
              </div>
              <p>
                © Copyright 2025 Unity Comunicação. Todos os direitos
                reservados.
              </p>
              <div className={styles.socialIcons}>
                <a
                  href="https://www.instagram.com/__unitycom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100054564694262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <FaFacebookF />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

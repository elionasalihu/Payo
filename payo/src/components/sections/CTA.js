import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import "../styles/global/CTA.css";

function CtaBanner({
  eyebrow = "READY WHEN YOU ARE",
  title = (
    <>
      Make money between
      <br />
      friends <em>less complicated.</em>
    </>
  ),
  buttonText = "Get started with Payo",
  buttonHref = "/register",
}) {
  return (
    <section className="payo-cta">
      <div className="payo-cta-inner">
        <div className="payo-cta-content">
          <span className="payo-cta-kicker">{eyebrow}</span>

          <h2>{title}</h2>
        </div>

        <motion.a
          href={buttonHref}
          className="payo-cta-button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {buttonText}
          <ArrowRight size={16} strokeWidth={2} />
        </motion.a>
      </div>
    </section>
  );
}

export default CtaBanner;
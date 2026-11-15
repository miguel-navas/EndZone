import { useState } from "react";
import { Link } from "react-router-dom";
export function Hero({ imageSrc }: { imageSrc?: string }) {
  const [failedSource, setFailedSource] = useState<string>();
  return (
    <section className="hero" aria-labelledby="hero-title">
      {imageSrc && failedSource !== imageSrc && (
        <img
          className="hero-image"
          src={imageSrc}
          alt=""
          onError={() => setFailedSource(imageSrc)}
        />
      )}
      <div className="hero-copy">
        <p className="eyebrow">O JOGO COMEÇA AQUI</p>
        <h2 id="hero-title">
          A central do
          <br />
          futebol americano
        </h2>
        <p>
          Um lugar para explorar o esporte, conhecer suas histórias e acompanhar
          cada novo capítulo.
        </p>
        <Link className="button" to="/temporada">
          Explorar temporada <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="field-art" aria-hidden="true">
        <span>END</span>
        <span>ZONE</span>
      </div>
    </section>
  );
}

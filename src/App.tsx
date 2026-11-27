import { useState } from "react";
import { CartDrawer } from "./components/CartDrawer";
import {
  categories,
  formatPrice,
  imagePath,
  products,
  whatsapp,
} from "./data/catalog";
import styles from "./App.module.css";

const currentYear = new Date().getFullYear();

function App() {
  const [category, setCategory] =
    useState<(typeof categories)[number]>("Todos");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const count = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );

  function changeQuantity(id: string, change: number) {
    setCart((current) => {
      const quantity = Math.max(0, (current[id] || 0) + change);
      const next = { ...current };
      if (quantity === 0) delete next[id];
      else next[id] = quantity;
      return next;
    });
  }

  return (
    <>
      <div className={styles["announcement"]}>
        Hecho con cariño en Cartago <span>♥</span> Desde 2017
      </div>
      <header className={styles["site-header"]}>
        <div className={styles["header-inner"] + " " + styles["wrap"]}>
          <a
            className={styles["brand"]}
            href="#inicio"
            aria-label="Las Delicias de Mamá Chilito, inicio"
          >
            <img src={imagePath("logonormal.png")} alt="" />
          </a>
          <button
            className={styles["menu-toggle"]}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            ☰
          </button>
          <nav
            className={
              menuOpen
                ? `${styles.navigation} ${styles.open}`
                : styles.navigation
            }
            aria-label="Navegación principal"
          >
            <a href="#productos" onClick={() => setMenuOpen(false)}>
              Nuestros productos
            </a>
            <a href="#historia" onClick={() => setMenuOpen(false)}>
              Nuestra historia
            </a>
            <a href="#contacto" onClick={() => setMenuOpen(false)}>
              Contacto
            </a>
          </nav>
          <button
            className={styles["header-order"]}
            onClick={() => setCartOpen(true)}
          >
            Mi pedido <b>{count}</b>
          </button>
        </div>
      </header>

      <main>
        <section className={styles["hero-section"]} id="inicio">
          <div
            className={styles["hero-photo"]}
            style={{ backgroundImage: `url("${imagePath("back3.jpg")}")` }}
            aria-hidden="true"
          />
          <div className={styles["hero-overlay"]} />
          <div className={styles["hero-content"] + " " + styles["wrap"]}>
            <div className={styles["eyebrow"] + " " + styles["hero-eyebrow"]}>
              <span /> PANADERÍA Y REPOSTERÍA CASERA
            </div>
            <h1>
              Bienvenidos a las delicias <em>de Mamá Chilito</em>
            </h1>
            <p>
              Pan, queques y postres hechos con cariño para compartir los
              momentos más ricos.
            </p>
            <div className={styles["hero-actions"]}>
              <a
                className={styles["button"] + " " + styles["button-light"]}
                href="#productos"
              >
                Ver nuestras delicias <span>→</span>
              </a>
              <a
                className={styles["hero-link"]}
                href={`${whatsapp}?text=${encodeURIComponent("¡Hola! Me gustaría consultar sobre sus productos.")}`}
                target="_blank"
                rel="noreferrer"
              >
                Hablar por WhatsApp <span>↗</span>
              </a>
            </div>
          </div>
          <div className={styles["hero-bottom"] + " " + styles["wrap"]}>
            <span>Una delicia para cada momento</span>
            <span>↓</span>
          </div>
        </section>

        <section className={styles["intro-strip"]}>
          <div className={styles["wrap"] + " " + styles["intro-inner"]}>
            <div>
              <span className={styles["strip-icon"]}>♡</span>
              <p>
                <strong>Hecho con cariño</strong>
                <small>Como en casa, siempre</small>
              </p>
            </div>
            <div>
              <span className={styles["strip-icon"]}>✳</span>
              <p>
                <strong>Tradición familiar</strong>
                <small>Horneando desde 2017</small>
              </p>
            </div>
            <div>
              <span className={styles["strip-icon"]}>⌁</span>
              <p>
                <strong>Estamos en Cartago</strong>
                <small>Consulta por tu entrega</small>
              </p>
            </div>
          </div>
        </section>

        <section className={styles["section-pad"]} id="productos">
          <div className={styles["wrap"]}>
            <div className={styles["section-top"]}>
              <div>
                <div className={styles["eyebrow"]}>
                  <span /> DIRECTO DE NUESTRA COCINA
                </div>
                <h2>
                  Nuestras <em>delicias</em>
                </h2>
              </div>
              <p>
                Para un antojo, una celebración o simplemente porque sí.
                Encuentra tu próxima delicia favorita.
              </p>
            </div>
            <div className={styles["filter-row"]}>
              <div
                className={styles["filters"]}
                aria-label="Filtrar productos por categoría"
              >
                {categories.map((item) => (
                  <button
                    key={item}
                    className={category === item ? styles.active : undefined}
                    onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <span className={styles["product-count"]}>
                {category === "Todos"
                  ? products.length
                  : products.filter((p) => p.category === category).length}{" "}
                DELICIAS PARA TI
              </span>
            </div>
            <div className={styles["product-grid"]}>
              {products
                .filter(
                  (product) =>
                    category === "Todos" || product.category === category,
                )
                .map((product, index) => (
                  <article className={styles["product-card"]} key={product.id}>
                    <div className={styles["product-image"]}>
                      <img
                        src={imagePath(product.image)}
                        alt={product.name}
                        loading="lazy"
                      />
                      <span className={styles["product-tag"]}>
                        {index === 0 && category === "Todos"
                          ? "UN CLÁSICO"
                          : product.category.toUpperCase()}
                      </span>
                      <button
                        aria-label={`Agregar ${product.name} al pedido`}
                        onClick={() => changeQuantity(product.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className={styles["product-info"]}>
                      <div>
                        <span className={styles["product-category"]}>
                          {product.category}
                        </span>
                        <h3>{product.name}</h3>
                      </div>
                      <strong>{formatPrice(product.price)}</strong>
                    </div>
                    <button
                      className={styles["add-link"]}
                      onClick={() => changeQuantity(product.id, 1)}
                    >
                      {cart[product.id]
                        ? `Agregado (${cart[product.id]})`
                        : "Agregar al pedido"}{" "}
                      <span>↗</span>
                    </button>
                  </article>
                ))}
            </div>
            <p className={styles["price-note"]}>
              Precios de referencia del catálogo original. Consulta
              disponibilidad y precio actualizado por WhatsApp.
            </p>
          </div>
        </section>

        <section className={styles["story-section"]} id="historia">
          <div className={styles["wrap"] + " " + styles["story-grid"]}>
            <div className={styles["story-image"]}>
              <img
                src={imagePath("mammachilio2017.jpg")}
                alt="Yorleny González junto a la imagen de Las Delicias de Mamá Chilito"
                loading="lazy"
              />
              <div className={styles["story-image-label"]}>
                DESDE 2017
                <br />
                <strong>Con mucho cariño ♥</strong>
              </div>
            </div>
            <div className={styles["story-copy"]}>
              <div className={styles["eyebrow"]}>
                <span /> NUESTRA HISTORIA
              </div>
              <h2>
                Una historia de <em>familia y sabor</em>
              </h2>
              <p>
                Detrás de cada delicia está Yorleny y el sueño de compartir el
                sabor de casa. Desde 2017, nuestra pequeña empresa en Cartago
                prepara pan y postres con dedicación para llevar momentos
                especiales a tu mesa.
              </p>
              <p>
                Porque creemos que las mejores recetas no solo alimentan:
                también crean recuerdos.
              </p>
              <div className={styles["signature"]}>
                Con cariño, <strong>Mamá Chilito</strong> <span>♡</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles["order-section"]} id="contacto">
          <div className={styles["wrap"] + " " + styles["order-inner"]}>
            <div>
              <div
                className={styles["eyebrow"] + " " + styles["light-eyebrow"]}
              >
                <span /> ESTAMOS PARA AYUDARTE
              </div>
              <h2>¿Se te antojó algo?</h2>
              <p>Escríbenos y con gusto te ayudamos a preparar tu pedido.</p>
              <a
                className={styles["button"] + " " + styles["button-light"]}
                href={`${whatsapp}?text=${encodeURIComponent("¡Hola! Me gustaría consultar sobre sus productos.")}`}
                target="_blank"
                rel="noreferrer"
              >
                Hablar por WhatsApp <span>↗</span>
              </a>
            </div>
            <div className={styles["order-decoration"]} aria-hidden="true">
              ♥
              <small>
                HECHO EN CASA
                <br />
                PARA COMPARTIR
              </small>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className={styles["wrap"] + " " + styles["footer-inner"]}>
          <div>
            <a className={styles["footer-brand"]} href="#inicio">
              Mamá Chilito<span>.</span>
            </a>
            <p>Un pedacito de casa en cada delicia.</p>
          </div>
          <div className={styles["footer-links"]}>
            <a href="#productos">Productos</a>
            <a href="#historia">Nuestra historia</a>
            <a
              href="https://www.instagram.com/lasdeliciasdemamachilito/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram ↗
            </a>
            <a
              href="https://www.facebook.com/Las-Delicias-de-Mama-Chilito-101210931859158/photos/?ref=page_internal"
              target="_blank"
              rel="noreferrer"
            >
              Facebook ↗
            </a>
            <a href="mailto:lasdeliciasdemamachilito@gmail.com">Correo ↗</a>
          </div>
        </div>
        <div className={styles["wrap"] + " " + styles["footer-bottom"]}>
          <span>© {currentYear} LAS DELICIAS DE MAMÁ CHILITO</span>
          <span>HECHO CON CARIÑO EN CARTAGO, CR ♡</span>
        </div>
      </footer>

      {cartOpen && (
        <CartDrawer
          cart={cart}
          products={products}
          onChangeQuantity={changeQuantity}
          onClose={() => setCartOpen(false)}
        />
      )}
    </>
  );
}

export default App;

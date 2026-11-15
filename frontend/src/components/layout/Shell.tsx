import {
  type ReactNode,
  type MouseEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { NavLink, useLocation } from "react-router-dom";
import { destinations } from "../../app/destinations";
function Navigation({
  onNavigate,
}: {
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <nav aria-label="Navegação principal">
      <ul>
        {destinations.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end
              onClick={onNavigate}
              aria-label={item.label}
              title={item.label}
            >
              <span className="nav-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export function Shell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const lastFocused = useRef<Element | null>(null);
  useLayoutEffect(() => {
    dialog.current?.close();
    setOpen(false);
    document.querySelector<HTMLElement>("main h1")?.focus();
  }, [location]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  function dismiss(restoreFocus = true) {
    dialog.current?.close();
    setOpen(false);
    if (restoreFocus) trigger.current?.focus();
  }
  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    dismiss(false);
    // Native dialog restores its invoking control; navigation owns focus instead.
    requestAnimationFrame(() =>
      document.querySelector<HTMLElement>("main h1")?.focus(),
    );
  }
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    function rememberFocus() {
      lastFocused.current = document.activeElement;
    }
    function resize() {
      // The browser can blur a control as its media query hides it, before change fires.
      const active =
        document.activeElement === document.body
          ? lastFocused.current
          : document.activeElement;
      const needsFocus =
        dialog.current?.open ||
        (media.matches && active === trigger.current) ||
        (!media.matches && sidebar.current?.contains(active));
      if (dialog.current?.open) dialog.current.close();
      setOpen(false);
      if (needsFocus)
        (media.matches ? toggle.current : trigger.current)?.focus();
    }
    document.addEventListener("focusin", rememberFocus);
    media.addEventListener("change", resize);
    return () => {
      media.removeEventListener("change", resize);
      document.removeEventListener("focusin", rememberFocus);
    };
  }, []);
  return (
    <div className={`shell ${collapsed ? "is-collapsed" : ""}`}>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.querySelector<HTMLElement>("main h1")?.focus();
        }}
      >
        Pular para o conteúdo
      </a>
      <header className="header">
        <div className="header-start">
          <button
            ref={trigger}
            className="menu-trigger icon-button"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              dialog.current?.showModal();
              setOpen(true);
            }}
          >
            <span aria-hidden="true">☰</span>
          </button>
          <NavLink to="/" className="brand" aria-label="END ZONE — Início">
            END<span>ZONE</span>
            <span className="brand-line" aria-hidden="true" />
          </NavLink>
        </div>
        <div className="search-unavailable" aria-disabled="true">
          <span aria-hidden="true">⌕</span>
          <span>Busca em preparação</span>
        </div>
      </header>
      <aside className="sidebar" ref={sidebar}>
        <div className="sidebar-top">
          <span className="nav-label eyebrow">NAVEGAÇÃO</span>
          <button
            ref={toggle}
            className="icon-button sidebar-toggle"
            aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
            aria-expanded={!collapsed}
            aria-controls="desktop-navigation"
            onClick={() => setCollapsed(!collapsed)}
          >
            <span aria-hidden="true">{collapsed ? "»" : "«"}</span>
          </button>
        </div>
        <div id="desktop-navigation">
          <Navigation />
        </div>
        <div className="sidebar-caption nav-label">
          O futebol americano
          <br />
          mais perto de você.
        </div>
      </aside>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Menu principal"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls =
            event.currentTarget.querySelectorAll<HTMLElement>(
              "button, a[href]",
            );
          const first = controls[0],
            last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
        onCancel={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClose={() => setOpen(false)}
      >
        <div className="drawer-heading">
          <span className="brand">
            END<span>ZONE</span>
          </span>
          <button
            className="icon-button"
            aria-label="Fechar menu"
            onClick={() => dismiss()}
            autoFocus
          >
            ×
          </button>
        </div>
        <Navigation onNavigate={navigate} />
      </dialog>
      <div className="workspace">
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <footer>
          <span className="footer-brand">END ZONE</span>
          <span>Seu ponto de encontro com o futebol americano.</span>
          <span>Uma nova jogada começa aqui.</span>
        </footer>
      </div>
    </div>
  );
}

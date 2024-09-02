/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
        generalSans: ["GeneralSans"],
      },
      borderRadius: {
        base: "4px",
      },

      colors: {
        nf: {
          white: "var(--color-basic-white)",
          black: "var(--color-basic-black)",
          element: {
            // "The most prominent and readable color for Text and Icons. Use this as the default for text elements that are interactable."
            highEmphasis: "var(--color-neutral90)",
            // "Medium prominence color for text and icons. Used for header, category names etc. Use to distinguish an element when that element doesnt need to be viewed or verified frequently. (Information that the user will internalize over time)",
            mediumEmphasis: "var(--color-neutral-variant75)",
            // "Used for the same as Medium Emphasis Text. Use to distinguish text and icons as different/less important than Medium or when a very clear contrast is needed against High-Emphasis.",
            lowEmphasis: "var(--color-neutral-variant55)",
            // "The least prominent color. Used for text, surfaces and icons that are deactivated. Does not fulfill contrast requirements so only use specifically for elements that are inactive."
            deactivated: "var(--color-neutral-variant30)",
            // "The inverse element color for inverse surfaces. Used for text and icons on bright surfaces"
            inverse: "var(--color-neutral4)",
            // "The basic outline color for line elements.
            outline: "var(--color-neutral-variant60)",
            // "The variant outline color for line elements.
            outlineVariant: "var(--color-neutral-variant30)",
          },
          // Colorscheme for textboxes and other containers.
          container: {
            surface: "var(--color-alias-secondary30)",
            text: "var(--color-alias-secondary90)",
            lowEmphasis: "var(--color-alias-secondary60)",
            deactivatedSurface: "var(--color-alias-secondary17)",
            deactivatedText: "var(--color-alias-secondary40)",
          },
          // Colorscheme for surface elements.
          surfaces: {
            // Default surface color
            default: {
              background: "var(--color-neutral4)",
              hover: "var(--color-neutral10)",
              select: "var(--color-neutral12)",
              hoverSelect: "var(--color-neutral17)",
            },
            // Card surface color, used when more distinguishment is needed than dividers but not as much as a full popup.
            card: {
              background: "var(--color-neutral6)",
              hover: "var(--color-neutral12)",
              select: "var(--color-neutral17)",
              hoverSelect: "var(--color-neutral22)",
            },
            // Popup window and dropdown surface color.
            popup: {
              background: "var(--color-neutral17)",
              hover: "var(--color-neutral22)",
              hoverVariant: "var(--color-neutral24)",
            },
            chip: "var(--color-neutral12)",
            topBar: "var(--color-neutral6)",
            sideBar: "var(--color-neutral10)",
            sidebarContainer: "var(--color-neutral17)",
            key: "var(--color-neutral4)",
          },
          saturated: {
            engagedFreeText: "var(--color-alias-primary80)",
            engagedSurface: "var(--color-alias-primary80)",
            engagedElement: "var(--color-alias-primary80)",
            engagedText: "var(--color-neutral6)",
            engagedVariantText: "var(--color-alias-primary20)",
            ctaSurface: "var(--color-alias-primary40)",
            ctaText: "var(--color-alias-primary90)",
            ctaOutline: "var(--color-alias-primary20)",
            warningSurface: "var(--color-error30)",
            warningText: "var(--color-error90)",
            warningFreeText: "var(--color-error60)",
            highlightSurface: "var(--color-alias-secondary35)",
          },
          func: {
            lighter5: "rgb(255 255 255 / 0.05)",
            lighter10: "rgb(255 255 255 / 0.1)",
            lighter15: "rgb(255 255 255 / 0.15)",
            colorHover: "var(--color-func-colorhover)",
          },
        },
        naya: {
          primary: "var(--color-primary)",
          secondary: "var(--color-secondary)",
          contrast: "var(--color-contrast)",
          main: "var(--color-main)",
          gradient: {
            main: {
              light: "var(--color-gradient-main-light)",
              dark: "var(--color-gradient-main-dark)",
            },
          },
          fill: {
            light: "var(--color-fill-light)",
            dark: "var(--color-fill-dark)",
          },
          accent: {
            light: "var(--color-accent-light)",
            dark: "var(--color-accent-dark)",
          },
          basic: {
            white: "var(--color-basic-white)",
            black: "var(--color-basic-black)",
            red: "var(--color-basic-red)",
          },
          highlight: {
            0.05: "rgb(255 255 255 / 0.05)",
            0.1: "rgb(255 255 255 / 0.1)",
            0.15: "rgb(255 255 255 / 0.15)",
            0.3: "rgb(255 255 255 / 0.3)",
            0.6: "rgb(255 255 255 / 0.6)",
          },
          tooltip: {
            dark: "var(--color-tooltip-dark)",
          },
        },
      },
      boxShadow: {
        /**
         * @description
         * @D82: Low Shadow is a visual effect that gives the illusion of depth. It is intended for UI elements that need to slightly stand out such as buttons or cards.
         *
         * @see
         * {@link https://www.notion.so/arc-enterprises/D82-Low-Shadow-54ea576622f54419acc67a20fd63a5ac} for the design documentation.
         *
         * @example
         * <div className="shadow-low">example</div>
         */
        low: "0px 0px 4px rgba(0, 0, 0, 0.25), 0px 4px 8px rgba(0, 0, 0, 0.25)",
        /**
         * @description
         * @D85: Glow is a visual effect that highlights UI elements. It is intended for UI elements that can be hovered over such as @K21: Keys or @K29: Actions.
         *
         * @see
         * {@link https://www.notion.so/arc-enterprises/D85-Glow-440d8c81c64f469eb48eda04c6c4bd39} for the design documentation.
         *
         * @example
         * <div className="shadow-glow">example</div>
         */
        glow: "0px 0px 8px 2px rgba(255, 255, 255, .25)",
        glowSM: "0px 0px 8px 2px rgba(255, 255, 255, .5)",
        glowMD: "0px 0px 8px 2px rgba(255, 255, 255, .75)",
        glowLG: "0px 0px 8px 2px rgba(255, 255, 255, 1)",
      },
    },
    dropShadow: {
      glow: ["0px 0px 8px rgba(255, 255, 255, 0.25)"],
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        /**
         * @name
         * Description Text Style
         * @see
         * {@link https://www.notion.so/arc-enterprises/Description-Text-Style-a88cd4564c454b2fb92e353df0bd4dbe?pvs=4}
         */
        ".naya-text-desc": {
          "@apply font-inter": {},
          fontWeight: 400,
          fontSize: "0.75rem",
        },
        /**
         * @name
         * Description Text Style
         * @see
         * {@link https://www.notion.so/arc-enterprises/Description-Text-Style-a88cd4564c454b2fb92e353df0bd4dbe?pvs=4}
         */
        ".naya-text-desc-bold": {
          "@apply font-inter": {},
          fontWeight: 600,
          fontSize: "0.75rem",
        },
        /**
         * @name
         * BUTTON Text Style
         * @see
         * {@link https://www.notion.so/arc-enterprises/BUTTON-Text-Style-0168d788bb6d43a7bf5b0ac914c8321d?pvs=4}
         */
        ".naya-text-btn": {
          "@apply font-inter": {},
          fontWeight: 500,
          fontSize: "0.875rem",
          textTransform: "uppercase",
        },
        /**
         * @name
         * Basic Text Style
         * @see
         * {@link https://www.notion.so/arc-enterprises/Basic-Text-Style-e4bc089881134ba98e3c35cdb96835ef?pvs=4}
         */
        ".naya-text-base": {
          "@apply font-inter": {},
          fontWeight: 400,
          fontSize: "1rem",
          letterSpacing: "-0.025em",
        },
        /**
         * @name
         * Basic Bold Text Style
         * @see
         * {@link https://www.notion.so/arc-enterprises/Basic-Bold-Text-Style-dbcbef59113d46229a47cd630b66d32d?pvs=4}
         */
        ".naya-text-base-bold": {
          "@apply font-inter": {},
          fontWeight: 600,
          fontSize: "1rem",
          letterSpacing: "-0.025em",
        },
        /**
         * @name
         * Medium Text Style
         * @see
         * {@link https://www.notion.so/arc-enterprises/Medium-Text-Style-756757cf091d413eb354b0d9268028d6?pvs=4}
         */
        ".naya-text-med": {
          "@apply font-generalSans": {},
          fontWeight: 400,
          fontSize: "1.5rem",
          letterSpacing: "-0.025em",
        },
        /**
         * @name
         * Medium Bold Text Style
         * @see
         * {@link https://www.notion.so/arc-enterprises/Medium-Bold-Text-Style-17340602706f4a5f98a9c4485978875d?pvs=4}
         */
        ".naya-text-med-bold": {
          "@apply font-generalSans": {},
          fontWeight: 600,
          fontSize: "1.5rem",
          letterSpacing: "-0.025em",
        },
        /**
         * @name
         * Large Text Style
         * @see
         * {@link https://www.notion.so/arc-enterprises/Large-Text-Style-5618ee74560b4edcb17d590edc84fb67?pvs=4}
         */
        ".naya-text-lg": {
          "@apply font-generalSans": {},
          fontWeight: 400,
          fontSize: "2.125rem",
          letterSpacing: "-0.025em",
        },
        /**
         * @name
         * Large Bold Text Style
         * @see
         * {@link https://www.notion.so/arc-enterprises/Large-Bold-Text-Style-6c82ed6121c241248e3b3ea6a01a4ba7?pvs=4}
         */
        ".naya-text-lg-semi-bold": {
          "@apply font-generalSans": {},
          fontWeight: 600,
          fontSize: "2.125rem",
          letterSpacing: "-0.025em",
        },
        /**
         * @name
         * Hero Text Style
         * @see
         * {@link https://www.notion.so/arc-enterprises/Hero-Text-Style-eb37897ab52a448b869a128327414178?pvs=4}
         */
        ".naya-text-hero": {
          "@apply font-generalSans": {},
          fontWeight: 300,
          fontSize: "4rem",
          letterSpacing: "-0.025em",
        },
        /**
         * @name
         * Action Tiny Text Style
         * @see
         * {@link https://www.notion.so/arc-enterprises/Action-Tiny-Text-Style-f71c17d3a3654f45aea53e3efedb7594?pvs=4}
         */
        ".naya-text-action-ti": {
          "@apply font-generalSans": {},
          fontWeight: 500,
          fontSize: "0.594rem",
          letterSpacing: "0rem",
        },
        /**
         * @name
         * Action Small Text Style
         * @see
         * {@link https://www.notion.so/arc-enterprises/Action-Small-Text-Style-908a7d4ca9fb4f759559365aab5266bb?pvs=4}
         */
        ".naya-text-action-sm": {
          "@apply font-inter": {},
          fontWeight: 400,
          fontSize: "0.625rem",
          letterSpacing: "0rem",
        },
        /**
         * @name
         * Action Medium Text Style
         * @see
         * {@link https://www.notion.so/arc-enterprises/Action-Medium-Text-Style-b8ee0d67bfd748f19a1349b38109740d?pvs=4}
         */
        ".naya-text-action-med": {
          "@apply font-generalSans": {},
          fontWeight: 400,
          fontSize: "1rem",
          letterSpacing: "-0.025em",
          lineHeight: "90%",
        },
        /**
         * @name
         * Action Large Text Style
         * @see
         * {@link https://www.notion.so/arc-enterprises/Action-Large-Text-Style-f68e58dfb8974f36b9f59f22286c8eea?pvs=4}
         */
        ".naya-text-action-lg": {
          "@apply font-generalSans": {},
          fontWeight: 400,
          fontSize: "1.375rem",
          letterSpacing: "-0.025em",
        },
      });
    },
  ],
};

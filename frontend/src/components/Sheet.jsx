import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../styles/Sheet.css";

const SheetContext = React.createContext({
  open: false,
  onOpenChange: () => {},
});

export const Sheet = ({ children, open, onOpenChange }) => {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
};

export const SheetTrigger = ({ children, asChild }) => {
  const { onOpenChange } = React.useContext(SheetContext);

  if (asChild) {
    return React.cloneElement(children, {
      onClick: (e) => {
        e.preventDefault();
        onOpenChange(true);
        if (children.props.onClick) {
          children.props.onClick(e);
        }
      },
    });
  }

  return (
    <button className="sheet-trigger" onClick={() => onOpenChange(true)}>
      {children}
    </button>
  );
};

export const SheetContent = ({ children }) => {
  const { open, onOpenChange } = React.useContext(SheetContext);
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  return (
    <div className={`sheet-overlay ${open ? "sheet-open" : ""}`} onClick={handleOverlayClick}>
      <div className={`sheet-container ${open ? "sheet-open" : ""}`}>
        <div className="sheet-content">
          <button
            onClick={() => onOpenChange(false)}
            className="sheet-close-button"
          >
            <X />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export const SheetHeader = ({ children }) => {
  return <div className="sheet-header">{children}</div>;
};

export const SheetTitle = ({ children }) => {
  return <h2 className="sheet-title">{children}</h2>;
};

export const SheetDescription = ({ children }) => {
  return <p className="sheet-description">{children}</p>;
};
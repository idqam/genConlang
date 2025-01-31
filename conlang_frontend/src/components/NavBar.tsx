"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export interface NavItem {
  id: string;
  label: string;
}

interface NavBarProps {
  items: NavItem[];
  activeId: string;
  onChange: (id: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ items, activeId, onChange }) => {
  return (
    <nav className="bg-gray-100 px-4 py-2 shadow-md flex space-x-4">
      {items.map((item) => (
        <Button
          key={item.id}
          variant={activeId === item.id ? "default" : "outline"}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
};

export default NavBar;

/* eslint-disable @typescript-eslint/no-unused-vars */
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
    <nav className="bg-gray-100 px-4 py-2 shadow-md flex space-x-4 justify-center">
      {items.map((item) => (
        <Button
          key={item.id}
          className="text-sm font-semibold text-black bg-white hover:bg-red-300"
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
};

export default NavBar;
